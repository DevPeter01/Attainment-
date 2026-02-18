import ExcelJS from 'exceljs';
import { AppError } from '../middleware/errorHandler.js';
import {
  extractCIAData,
  extractAssessmentData,
  extractRedAttainmentData
} from '../utils/dataExtractor.js';
import { calculateCOAttainment } from '../utils/calculations.js';
import { createCOWorkbook } from '../utils/workbookGenerator.js';

/**
 * Process uploaded Excel file with timing + safety
 * @param {Buffer} fileBuffer
 */
export const processExcelFile = async (fileBuffer) => {
  console.time('EXCEL_PROCESS_TOTAL');

  if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
    throw new AppError('Invalid file buffer', 400);
  }

  if (fileBuffer.length === 0) {
    throw new AppError('Empty file uploaded', 400);
  }

  let workbook;

  try {
    console.time('EXCEL_LOAD');
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    console.timeEnd('EXCEL_LOAD');
  } catch (error) {
    console.timeEnd('EXCEL_LOAD');
    throw new AppError(
      'Invalid or corrupted Excel file. Please upload a valid .xlsx file.',
      422
    );
  }

  console.time('SHEET_DETECTION');

  // Log Node and ExcelJS versions for production debugging
  console.log(`📦 Node version: ${process.version}`);
  console.log(`📦 ExcelJS version: ${ExcelJS?.version || 'unknown'}`);
  console.log(`📊 Total sheets in workbook: ${workbook.worksheets.length}`);

  let ciaSheet = null;
  let assessmentSheet = null;
  let exitSheet = null;
  let semesterSheet = null;

  workbook.eachSheet((worksheet, sheetId) => {
    const normalizedName = worksheet.name
      .normalize('NFKD')
      .replace(/[^a-zA-Z]/g, '')
      .toLowerCase();

    console.log(`   Sheet ${sheetId}: "${worksheet.name}" → normalized: "${normalizedName}"`);

    if (normalizedName === 'cia') {
      ciaSheet = worksheet;
      console.log(`✅ Found CIA sheet: "${worksheet.name}" (ID: ${sheetId})`);
    } else if (normalizedName === 'assessment') {
      assessmentSheet = worksheet;
      console.log(`✅ Found Assessment sheet: "${worksheet.name}" (ID: ${sheetId})`);
    } else if (normalizedName.includes('exit')) {
      exitSheet = worksheet;
      console.log(`✅ Found EXIT sheet: "${worksheet.name}" (ID: ${sheetId})`);
    } else if (normalizedName.includes('semester')) {
      semesterSheet = worksheet;
      console.log(`✅ Found SEMESTER sheet: "${worksheet.name}" (ID: ${sheetId})`);
    }
  });

  console.timeEnd('SHEET_DETECTION');

  if (!ciaSheet) {
    throw new AppError('CIA sheet not detected', 422);
  }

  if (!assessmentSheet) {
    throw new AppError('Assessment sheet not detected', 422);
  }

  console.time('DATA_EXTRACTION');

  let cia, assessment;

  try {
    cia = extractCIAData(ciaSheet);
    assessment = extractAssessmentData(assessmentSheet);
  } catch (error) {
    console.timeEnd('DATA_EXTRACTION');
    throw error instanceof AppError
      ? error
      : new AppError(`Data extraction failed: ${error.message}`, 422);
  }

  console.timeEnd('DATA_EXTRACTION');

  if (!cia.students?.length) {
    throw new AppError('No student data found in CIA sheet', 422);
  }

  if (!assessment.students?.length) {
    throw new AppError('No student data found in Assessment sheet', 422);
  }

  console.time('CO_CALCULATION');

  const redMaxMap = {};
  const detectedCOs = new Set([
    ...Object.keys(cia.coMaxMarks),
    ...Object.keys(assessment.coMaxMarks)
  ]);

  detectedCOs.forEach((id) => {
    redMaxMap[id] = {
      cia: cia.coMaxMarks[id] || 0,
      assessment: assessment.coMaxMarks[id] || 0
    };
  });

  if (!redMaxMap[1] || (!redMaxMap[1].cia && !redMaxMap[1].assessment)) {
    throw new AppError(
      'Red max marks missing for CO1 in CIA or Assessment sheet',
      422
    );
  }

  let students;

  try {
    students = calculateCOAttainment(
      cia.students,
      assessment.students,
      redMaxMap
    );
  } catch (error) {
    console.timeEnd('CO_CALCULATION');
    throw new AppError(
      `Failed to calculate CO attainment: ${error.message}`,
      500
    );
  }

  console.timeEnd('CO_CALCULATION');

  console.time('WORKBOOK_GENERATION');

  const courseCode =
    safeGetCellValue(ciaSheet, 'C5') ||
    safeGetCellValue(ciaSheet, 'B5') ||
    '20CS';

  const courseName =
    safeGetCellValue(ciaSheet, 'C6') ||
    safeGetCellValue(ciaSheet, 'B6') ||
    'Course Name';

  const exitData = extractRedAttainmentData(exitSheet);
  const semesterData = extractRedAttainmentData(semesterSheet);

  let generatedWorkbook;

  try {
    generatedWorkbook = createCOWorkbook({
      students,
      metadata: { courseCode, courseName },
      ciaMaxMarks: cia.coMaxMarks,
      assessmentMaxMarks: assessment.coMaxMarks,
      exitData,
      semesterData
    });
  } catch (error) {
    console.timeEnd('WORKBOOK_GENERATION');
    throw new AppError(`Workbook generation failed: ${error.message}`, 500);
  }

  console.timeEnd('WORKBOOK_GENERATION');

  console.timeEnd('EXCEL_PROCESS_TOTAL');

  return {
    workbook: generatedWorkbook,
    data: {
      students,
      metadata: { courseCode, courseName },
      redMaxMap,
      classAttainment: calculateClassAttainment(students)
    }
  };
};

/* ---------- helpers ---------- */

const safeGetCellValue = (sheet, address) => {
  try {
    const cell = sheet.getCell(address);
    if (!cell) return null;
    const actual = cell.isMerged ? cell.master || cell : cell;
    return actual.result ?? actual.value ?? null;
  } catch {
    return null;
  }
};

const calculateClassAttainment = (students) => {
  const levels = { level0: 0, level1: 0, level2: 0, level3: 0 };
  students.forEach((s) => {
    levels[`level${s.level || 0}`]++;
  });
  return levels;
};
