import React from 'react';
import { motion } from 'framer-motion';

const SuccessScreen = ({ onDownloadExcel, onDownloadPDF, onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-8"
        >
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                className="relative"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="absolute inset-0 bg-green-400/20 rounded-full blur-3xl"
                />
                <div className="relative w-28 h-28 mx-auto bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                        boxShadow: '0 20px 60px rgba(34, 197, 94, 0.4)',
                    }}
                >
                    <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                        className="w-14 h-14 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </motion.svg>
                </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    CO Generated Successfully!
                </h2>
                <p className="text-gray-600 text-lg">
                    Your CO attainment report is ready to download
                </p>
            </motion.div>

            {/* Download Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
            >
                {/* Excel Download */}
                <button
                    onClick={onDownloadExcel}
                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-5 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <div className="relative flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                        <span>Download Excel</span>
                    </div>
                </button>

                {/* PDF Download */}
                <button
                    onClick={onDownloadPDF}
                    className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-5 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <div className="relative flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>Download PDF</span>
                    </div>
                </button>
            </motion.div>

            {/* Process Another File */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <button
                    onClick={onReset}
                    className="text-blue-600 hover:text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 active:scale-95"
                >
                    Process Another File →
                </button>
            </motion.div>

            {/* Info Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            >
                <div className="bg-blue-50/50 backdrop-blur-xl rounded-2xl p-4 border border-blue-100">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Integer Values</p>
                    <p className="text-xs text-gray-600 mt-1">All CO scores are whole numbers</p>
                </div>

                <div className="bg-green-50/50 backdrop-blur-xl rounded-2xl p-4 border border-green-100">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">60-40 Weighted</p>
                    <p className="text-xs text-gray-600 mt-1">CIA 60% + Assessment 40%</p>
                </div>

                <div className="bg-purple-50/50 backdrop-blur-xl rounded-2xl p-4 border border-purple-100">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Exact Format</p>
                    <p className="text-xs text-gray-600 mt-1">Matches reference template</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SuccessScreen;
