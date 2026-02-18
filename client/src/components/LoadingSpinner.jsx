import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Processing...' }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16"
        >
            {/* Spinner Container */}
            <div className="relative w-32 h-32 mb-8">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-blue-100"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Spinning Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />

                {/* Inner Pulsing Circle */}
                <motion.div
                    className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
                    }}
                >
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </motion.div>
            </div>

            {/* Loading Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{message}</h3>
                <p className="text-gray-600">This may take a few moments...</p>
            </motion.div>

            {/* Loading Steps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 space-y-3 w-full max-w-md"
            >
                {[
                    { text: 'Reading Excel file', delay: 0 },
                    { text: 'Extracting CIA data', delay: 0.5 },
                    { text: 'Extracting Assessment data', delay: 1 },
                    { text: 'Calculating CO attainment', delay: 1.5 },
                    { text: 'Generating report', delay: 2 },
                ].map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: step.delay }}
                        className="flex items-center gap-3 bg-white/50 backdrop-blur-xl rounded-xl p-3 border border-white/30"
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-blue-500"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: step.delay,
                            }}
                        />
                        <span className="text-sm text-gray-700">{step.text}</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default LoadingSpinner;
