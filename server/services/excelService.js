import ExcelJS from 'exceljs';
import { AppError } from '../middleware/errorHandler.js';
import { extractCIAData, extractAssessmentData, extractRedAttainmentData } from '../utils/dataExtractor.js';
import { calculateCOAttainment } from '../utils/calculations.js';
import { createCOWorkbook } from '../utils/workbookGenerator.js';

/**
 * Process uploaded Excel file with comprehensive error handling
 * @param {Buffer} fileBuffer - Uploaded file buffer
 * @returns {Promise<Object>} - Processed workbook and data
 */
export const processExcelFile = async (fileBuffer) => {
    // Validate file buffer
    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
        throw new AppError('Invalid file buffer', 400);
    }

    if (fileBuffer.length === 0) {
        throw new AppError('Empty file uploaded', 400);
    }

    let workbook;

    // Safe Excel loading with error handling
    try {
        workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(fileBuffer);
    } catch (error) {
        console.error('❌ Excel loading failed:', error.message);
        throw new AppError('Invalid or corrupted Excel file. Please upload a valid .xlsx file.', 422);
    }

    // Find sheets with aggressive normalization (removes ALL spaces)
    let ciaSheet = null;
    let assessmentSheet = null;
    let exitSheet = null;
    let semesterSheet = null;

    workbook.eachSheet((worksheet) => {
        // Unicode normalization: remove ALL non-alphabetic characters
        const normalizedName = worksheet.name
            .normalize("NFKD")  // Unicode normalization
            .replace(/[^a-zA-Z]/g, '')  // Remove all non-alphabetic
            .toLowerCase();

        if (normalizedName === 'cia') {
            ciaSheet = worksheet;
            console.log(`✅ Found CIA sheet: "${worksheet.name}"`);
        } else if (normalizedName === 'assessment') {
            assessmentSheet = worksheet;
            console.log(`✅ Found Assessment sheet: "${worksheet.name}"`);
        } else if (normalizedName.includes('exit')) {
            exitSheet = worksheet;
            console.log(`✅ Found EXIT sheet: "${worksheet.name}"`);
        } else if (normalizedName.includes('semester')) {
            semesterSheet = worksheet;
            console.log(`✅ Found SEMESTER sheet: "${worksheet.name}"`);
        }
    });

    // Validate required sheets exist with specific error messages
    if (!ciaSheet) {
        console.error('❌ CIA sheet not detected after normalization');
        throw new AppError('CIA sheet not detected. Please ensure your Excel file contains a sheet named "CIA" (variations accepted).', 422);
    }

    if (!assessmentSheet) {
        console.error('❌ Assessment sheet not detected after normalization');
        throw new AppError('Assessment sheet not detected. Please ensure your Excel file contains a sheet named "Assessment".', 422);
    }

    // Extract data with error handling
    let cia, assessment;

    try {
        cia = extractCIAData(ciaSheet);
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('❌ CIA extraction failed:', error.message);
        throw new AppError(`Failed to extract CIA data: ${error.message}`, 422);
    }

    try {
        assessment = extractAssessmentData(assessmentSheet);
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('❌ Assessment extraction failed:', error.message);
        throw new AppError(`Failed to extract Assessment data: ${error.message}`, 422);
    }

    // Validate extracted data
    if (!cia.students || cia.students.length === 0) {
        throw new AppError('No student data found in CIA sheet', 422);
    }

    if (!assessment.students || assessment.students.length === 0) {
        throw new AppError('No student data found in Assessment sheet', 422);
    }

    // Build unified redMaxMap (Context-Bound)
    const redMaxMap = {};
    const detectedCOs = new Set([
        ...Object.keys(cia.coMaxMarks),
        ...Object.keys(assessment.coMaxMarks)
    ]);

    detectedCOs.forEach(id => {
        redMaxMap[id] = {
            cia: cia.coMaxMarks[id] || 0,
            assessment: assessment.coMaxMarks[id] || 0
        };
    });

    // MANDATORY: Validation Gate (Runtime crash prevention)
    // At minimum, CO1 must be present.
    if (!redMaxMap[1] || (!redMaxMap[1].cia && !redMaxMap[1].assessment)) {
        const missing = [];
        if (!redMaxMap[1]?.cia) missing.push("CIA");
        if (!redMaxMap[1]?.assessment) missing.push("Assessment");
        throw new AppError(`Red max marks missing for CO1 in ${missing.join(' and ')} sheet(s). Please ensure the max marks for CO1 are colored RED in the input Excel files.`, 422);
    }

    // Optional: Validate others if they were partially detected
    detectedCOs.forEach(id => {
        if (id === '1') return;
        if ((redMaxMap[id].cia && !redMaxMap[id].assessment) || (!redMaxMap[id].cia && redMaxMap[id].assessment)) {
            console.warn(`⚠️ Partial detection for CO${id}. Marks might be incomplete.`);
        }
    });

    // Calculate CO attainment
    let students;
    try {
        students = calculateCOAttainment(cia.students, assessment.students, redMaxMap);
    } catch (error) {
        if (error instanceof AppError) throw error;
        console.error('❌ CO calculation failed:', error.message);
        throw new AppError(`Failed to calculate CO attainment: ${error.message}`, 500);
    }

    // Extract metadata safely
    const courseCode = safeGetCellValue(ciaSheet, 'C5') || safeGetCellValue(ciaSheet, 'B5') || '20CS';
    const courseName = safeGetCellValue(ciaSheet, 'C6') || safeGetCellValue(ciaSheet, 'B6') || 'Course Name';
    const metadata = { courseCode, courseName };

    const exitData = extractRedAttainmentData(exitSheet);
    const semesterData = extractRedAttainmentData(semesterSheet);

    // Generate output workbook
    let generatedWorkbook;
    try {
        generatedWorkbook = createCOWorkbook({
            students,
            metadata,
            ciaMaxMarks: cia.coMaxMarks,
            assessmentMaxMarks: assessment.coMaxMarks,
            exitData,
            semesterData
        });
    } catch (error) {
        console.error('❌ Workbook generation failed:', error.message);
        throw new AppError(`Failed to generate CO workbook: ${error.message}`, 500);
    }

    console.log(`✅ Passed Validation Gate: ${students.length} students processed.`);

    return {
        workbook: generatedWorkbook,
        data: {
            students,
            metadata,
            redMaxMap,
            classAttainment: calculateClassAttainment(students)
        }
    };
};

/**
 * Safely get cell value with formula support
 * @param {Worksheet} sheet - Excel worksheet
 * @param {string} address - Cell address (e.g., 'A1')
 * @returns {any} - Cell value or null
 */
const safeGetCellValue = (sheet, address) => {
    try {
        const cell = sheet.getCell(address);
        if (!cell) return null;

        // Handle merged cells
        const actualCell = cell.isMerged ? (cell.master || cell) : cell;

        if (actualCell.type === ExcelJS.ValueType.Formula) {
            return actualCell.result ?? actualCell.value;
        }

        return actualCell.value;
    } catch (error) {
        return null;
    }
};

/**
 * Calculate class-level attainment
 * @param {Array} students - Student data
 * @returns {Object} - Class attainment levels
 */
const calculateClassAttainment = (students) => {
    const levels = { level0: 0, level1: 0, level2: 0, level3: 0 };

    students.forEach(student => {
        const level = student.level || 0;
        levels[`level${level}`] = (levels[`level${level}`] || 0) + 1;
    });

    return levels;
};
