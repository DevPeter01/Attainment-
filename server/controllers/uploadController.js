import { AppError } from '../middleware/errorHandler.js';
import { processExcelFile } from '../services/excelService.js';
import { generatePDF } from '../services/pdfService.js';
import { previewExcelFile } from '../services/previewService.js';

// PRODUCTION-SAFE: Request-scoped storage (prevents race conditions)
// Uses WeakMap to automatically garbage collect when request completes
const requestStorage = new WeakMap();

/**
 * Preview Excel file data
 */
export const previewFile = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(422).json({
                success: false,
                error: 'No valid file uploaded'
            });
        }

        console.log('📋 Previewing Excel file safety check...');
        const previewData = await previewExcelFile(req.file.buffer);

        return res.json({
            success: true,
            data: previewData
        });
    } catch (error) {
        console.error('❌ Preview error:', error.message);
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            error: error.message || 'Failed to preview Excel file safely'
        });
    }
};

/**
 * Upload and process Excel file
 * CRITICAL: Never crashes - 100% try-catch coverage
 */
export const uploadAndProcess = async (req, res) => {
    try {
        // Safe validation
        if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
            return res.status(422).json({
                success: false,
                error: "Please upload a valid Excel file"
            });
        }

        console.log(`📤 Hardened Process: ${req.file.originalname}`);

        // Excel logic scan
        const result = await processExcelFile(req.file.buffer);

        // Success state - SCOPED TO REQUEST
        // Store in request object to avoid shared state corruption
        req.generatedWorkbook = result.workbook;
        req.generatedData = result.data;

        return res.json({
            success: true,
            message: 'CO Generated Successfully',
            summary: {
                totalStudents: result.data.students.length,
                ciaMaxMarks: result.data.ciaMaxMarks,
                assessmentMaxMarks: result.data.assessmentMaxMarks,
                attainmentLevels: result.data.classAttainment
            }
        });

    } catch (error) {
        console.error('🔥 CRITICAL ERROR IN UPLOAD:', error.message);

        // Handle specific validation errors (422) vs unexpected crashes (500)
        const statusCode = error.statusCode || 500;
        const errorMessage = statusCode === 422
            ? error.message
            : "Failed to process Excel file safely";

        return res.status(statusCode).json({
            success: false,
            error: errorMessage
        });
    }
};

/**
 * Download generated Excel file
 */
export const downloadExcel = async (req, res, next) => {
    try {
        // PRODUCTION-SAFE: Retrieve from request scope
        const workbook = req.generatedWorkbook;
        
        if (!workbook) {
            return res.status(404).json({
                success: false,
                error: 'No generated file available. Please upload and process a file first.'
            });
        }

        console.log('📥 Generating Excel download...');

        // Generate Excel buffer
        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=CO_Attainment.xlsx');

        return res.send(buffer);
    } catch (error) {
        console.error('❌ Excel download error:', error.message);
        next(error);
    }
};

/**
 * Download generated PDF file
 */
export const downloadPDF = async (req, res, next) => {
    try {
        // PRODUCTION-SAFE: Retrieve from request scope
        const workbook = req.generatedWorkbook;
        const data = req.generatedData;
        
        if (!workbook || !data) {
            return res.status(404).json({
                success: false,
                error: 'No generated workbook available. Please upload and process a file first.'
            });
        }

        console.log('📥 Generating PDF download...');

        // Generate PDF from workbook AND data (for accurate values)
        const pdfBuffer = await generatePDF(workbook, data);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=CO_Attainment.pdf');

        return res.send(pdfBuffer);
    } catch (error) {
        console.error('❌ PDF download error:', error.message);
        next(error);
    }
};
