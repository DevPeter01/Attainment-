import React from 'react';
import { motion } from 'framer-motion';

const DataPreview = ({ data, onConfirm, onCancel }) => {
    const { ciaData, assessmentData } = data;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Data Preview
                </h2>
                <p className="text-gray-600">
                    Review the extracted data before generating CO report
                </p>
            </div>

            {/* CIA Data Summary */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">CIA Sheet</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Students Found:</span>
                        <span className="ml-2 font-semibold text-blue-700">
                            {ciaData?.students?.length || 0}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-600">Max Marks (CO1):</span>
                        <span className="ml-2 font-semibold text-blue-700">
                            {ciaData?.coMaxMarks?.co1 || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* Assessment Data Summary */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Assessment Sheet</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">Students Found:</span>
                        <span className="ml-2 font-semibold text-green-700">
                            {assessmentData?.students?.length || 0}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-600">Max Marks (CO1):</span>
                        <span className="ml-2 font-semibold text-green-700">
                            {assessmentData?.coMaxMarks?.co1 || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sample Students */}
            {ciaData?.students?.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                        Sample Students (First 3)
                    </h3>
                    <div className="space-y-2">
                        {ciaData.students.slice(0, 3).map((student, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-3 rounded border border-gray-200 text-sm"
                            >
                                <div className="font-medium text-gray-800">
                                    {student.rollNo} - {student.name}
                                </div>
                                <div className="text-gray-600 mt-1">
                                    CO1: {student.marks?.co1} | CO2: {student.marks?.co2} | CO3: {student.marks?.co3} |
                                    CO4: {student.marks?.co4} | CO5: {student.marks?.co5}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="btn-primary"
                >
                    Confirm & Generate CO
                </button>
            </div>
        </motion.div>
    );
};

export default DataPreview;
