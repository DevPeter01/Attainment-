import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { validateExcelFile, formatFileSize } from '../utils/fileUtils';

const FileUpload = ({ onFileSelect, selectedFile, isProcessing }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const validation = validateExcelFile(file);

                if (validation.valid) {
                    onFileSelect(file);
                } else {
                    alert(validation.error);
                }
            }
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        multiple: false,
        disabled: isProcessing,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                {...getRootProps()}
                className={`
          relative overflow-hidden
          border-2 border-dashed rounded-3xl p-12
          transition-all duration-300 cursor-pointer
          ${isDragActive
                        ? 'border-blue-500 bg-blue-50/50 scale-[1.02]'
                        : 'border-gray-300 bg-gray-50/30 hover:border-blue-400 hover:bg-blue-50/30'
                    }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input {...getInputProps()} />

                <div className="text-center">
                    <AnimatePresence mode="wait">
                        {selectedFile ? (
                            <motion.div
                                key="selected"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                className="space-y-4"
                            >
                                {/* Success Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                                    className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-500 rounded-3xl flex items-center justify-center shadow-lg"
                                    style={{
                                        boxShadow: '0 10px 40px rgba(34, 197, 94, 0.3)',
                                    }}
                                >
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </motion.div>

                                {/* File Info */}
                                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            {/* Excel Icon */}
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                                    <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                                </svg>
                                            </div>

                                            {/* File Details */}
                                            <div className="flex-1 min-w-0 text-left">
                                                <p className="font-semibold text-gray-800 truncate">
                                                    {selectedFile.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {formatFileSize(selectedFile.size)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onFileSelect(null);
                                            }}
                                            className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                                        >
                                            <svg
                                                className="w-5 h-5 text-red-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600">
                                    Click "Generate CO Attainment" to process
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="space-y-6"
                            >
                                {/* Upload Icon */}
                                <motion.div
                                    animate={{
                                        y: isDragActive ? -10 : 0,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg"
                                    style={{
                                        boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                                    }}
                                >
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                </motion.div>

                                {/* Text */}
                                <div>
                                    <p className="text-xl font-semibold text-gray-800 mb-2">
                                        {isDragActive ? 'Drop your file here' : 'Upload Excel File'}
                                    </p>
                                    <p className="text-gray-600">
                                        Drag and drop or click to browse
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Supports .xlsx files up to 10MB
                                    </p>
                                </div>

                                {/* Format Info */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm text-blue-700 font-medium">
                                        Required: CIA & Assessment sheets
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Drag Overlay */}
                <AnimatePresence>
                    {isDragActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                        >
                            <div className="text-blue-600 text-xl font-semibold">
                                Drop to upload
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default FileUpload;
