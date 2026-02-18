/**
 * Trigger file download in browser
 * @param {Blob} blob - File blob
 * @param {string} filename - Download filename
 */
export const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate Excel file
 * @param {File} file - File to validate
 * @returns {Object} - Validation result
 */
export const validateExcelFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ];

    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.xlsx')) {
        return { valid: false, error: 'Only Excel files (.xlsx) are allowed' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size must be less than 10MB' };
    }

    return { valid: true };
};
