import ExcelJS from 'exceljs';
import { AppError } from '../middleware/errorHandler.js';
import { extractCIAData, extractAssessmentData } from '../utils/dataExtractor.js';

/**
 * Preview Excel file data without generating CO
 * @param {Buffer} fileBuffer - The uploaded Excel file buffer
 * @returns {Object} - Extracted data preview
 */
export const previewExcelFile = async (fileBuffer) => {
    try {
        // Load workbook from buffer
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(fileBuffer);

        // Find sheets by trimming names (handle trailing spaces)
        let ciaSheet = null;
        let assessmentSheet = null;

        workbook.eachSheet((worksheet) => {
            const sheetName = worksheet.name.trim().toLowerCase();
            if (sheetName === 'cia') {
                ciaSheet = worksheet;
            } else if (sheetName === 'assessment') {
                assessmentSheet = worksheet;
            }
        });

        if (!ciaSheet) {
            throw new AppError('Missing required sheet: CIA (check sheet name spelling)', 400);
        }
        if (!assessmentSheet) {
            throw new AppError('Missing required sheet: Assessment (check sheet name spelling)', 400);
        }

        // Extract data with Phase A-D enforcement
        const cia = extractCIAData(ciaSheet);
        const assessment = extractAssessmentData(assessmentSheet);

        // Build unified map for preview
        const redMaxMap = {};
        for (let i = 1; i <= 5; i++) {
            redMaxMap[i] = {
                cia: cia.coMaxMarks[i] || 0,
                assessment: assessment.coMaxMarks[i] || 0
            };
        }

        return {
            ciaData: {
                students: cia.students.slice(0, 3),
                totalStudents: cia.students.length,
                coMaxMarks: cia.coMaxMarks
            },
            assessmentData: {
                students: assessment.students.slice(0, 3),
                totalStudents: assessment.students.length,
                coMaxMarks: assessment.coMaxMarks
            }
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError(`Preview failed: ${error.message}`, 422);
    }
};
