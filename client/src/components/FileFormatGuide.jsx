import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FileFormatGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200 rounded-2xl transition-all"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold text-gray-800">View Excel File Format Requirements</span>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              {/* Required Sheets */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Required Sheet Names
                </h4>
                <div className="space-y-2 ml-8">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-300">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>CIA</strong> - Contains Continuous Internal Assessment data</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-300">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Assessment</strong> - Contains Assessment/Exam data</span>
                  </div>
                </div>
              </div>

              {/* CIA Sheet Structure */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  CIA Sheet Structure
                </h4>
                <div className="ml-8 bg-white rounded-lg p-4 overflow-x-auto border border-gray-300">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-50 border-b">
                        <th className="p-2 text-left font-semibold text-gray-700">Column</th>
                        <th className="p-2 text-left font-semibold text-gray-700">Content</th>
                        <th className="p-2 text-left font-semibold text-gray-700">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2 text-gray-600">A</td>
                        <td className="p-2 text-gray-600">Roll Number</td>
                        <td className="p-2 text-blue-600">2211K0347</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-600">B</td>
                        <td className="p-2 text-gray-600">Student Name</td>
                        <td className="p-2 text-blue-600">John Doe</td>
                      </tr>
                      <tr className="bg-yellow-50">
                        <td className="p-2 text-gray-600">C onwards</td>
                        <td className="p-2 text-gray-600">CO1, CO2, CO3, CO4, CO5</td>
                        <td className="p-2 text-blue-600">Marks obtained</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Assessment Sheet Structure */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Assessment Sheet Structure
                </h4>
                <div className="ml-8 bg-white rounded-lg p-4 overflow-x-auto border border-gray-300">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-50 border-b">
                        <th className="p-2 text-left font-semibold text-gray-700">Section</th>
                        <th className="p-2 text-left font-semibold text-gray-700">Content</th>
                        <th className="p-2 text-left font-semibold text-gray-700">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-2 text-gray-600">Header</td>
                        <td className="p-2 text-gray-600">Component 3</td>
                        <td className="p-2 text-blue-600">Row must contain "Component 3" or "COMP3"</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-600">Data</td>
                        <td className="p-2 text-gray-600">Roll Number, Name, CO1-CO5 marks</td>
                        <td className="p-2 text-blue-600">Same format as CIA sheet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Important Notes */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  Important Notes
                </h4>
                <div className="ml-8 space-y-2">
                  <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Column headers must have CO1, CO2, CO3, CO4, CO5 labels</span>
                  </div>
                  <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">All marks should be numeric values</span>
                  </div>
                  <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">File must be in .xlsx format (MS Excel 2007 or later)</span>
                  </div>
                  <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Ensure student data exists in both CIA and Assessment sheets</span>
                  </div>
                </div>
              </div>

              {/* Example Visual */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
                  File Size & Limits
                </h4>
                <div className="ml-8 space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Maximum file size:</strong> 10 MB</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Supported formats:</strong> .xlsx (Excel 2007+)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileFormatGuide;