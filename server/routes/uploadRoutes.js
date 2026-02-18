import express from 'express';
import upload from '../middleware/upload.js';
import {
    uploadAndProcess,
    downloadExcel,
    downloadPDF,
    previewFile
} from '../controllers/uploadController.js';

const router = express.Router();

// Preview Excel file data
router.post('/preview', upload.single('file'), previewFile);

// Upload and process Excel file
router.post('/upload', upload.single('file'), uploadAndProcess);

// Download generated Excel
router.get('/download/excel', downloadExcel);

// Download generated PDF
router.get('/download/pdf', downloadPDF);

export default router;
