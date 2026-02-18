import axios from 'axios';

// Environment variable for backend API URL
// For local dev: VITE_API_URL=http://localhost:5000
// For production: VITE_API_URL=https://your-backend.onrender.com
// REQUIRED: This must be set in .env or Netlify dashboard
// Note: All API routes are prefixed with /api in the code
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    throw new Error('VITE_API_URL environment variable is not set. Please configure it in .env file or Netlify dashboard.');
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Log API URL in development
if (import.meta.env.DEV) {
    console.log('🔗 API Base URL:', API_BASE_URL);
}

/**
 * Upload and process Excel file
 * @param {File} file - Excel file to upload
 * @returns {Promise} - API response
 */
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

/**
 * Download generated Excel file
 * @param {string} sessionId - Session ID from upload response
 * @returns {Promise<Blob>} - Excel file blob
 */
export const downloadExcel = async (sessionId) => {
    const response = await api.get('/api/download/excel', {
        params: { sessionId },
        responseType: 'blob',
    });

    return response.data;
};

/**
 * Download generated PDF file
 * @param {string} sessionId - Session ID from upload response
 * @returns {Promise<Blob>} - PDF file blob
 */
export const downloadPDF = async (sessionId) => {
    const response = await api.get('/api/download/pdf', {
        params: { sessionId },
        responseType: 'blob',
    });

    return response.data;
};

export default api;
