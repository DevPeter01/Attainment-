import multer from 'multer';
import { AppError } from './errorHandler.js';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to accept only Excel files
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ];

    if (allowedMimes.includes(file.mimetype) || file.originalname.endsWith('.xlsx')) {
        cb(null, true);
    } else {
        cb(new AppError('Only Excel files (.xlsx) are allowed', 400), false);
    }
};

// Configure multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

export default upload;
