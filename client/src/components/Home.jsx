import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import SuccessScreen from './SuccessScreen';
import FileFormatGuide from './FileFormatGuide';
import Footer from './Footer';
import { uploadFile, downloadExcel, downloadPDF } from '../services/api';
import { downloadFile } from '../utils/fileUtils';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleGenerateCO = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await uploadFile(selectedFile);

      if (response.success) {
        toast.success(response.message || 'CO Generated Successfully!');
        setIsSuccess(true);
      } else {
        toast.error(response.error || 'Failed to generate CO');
      }
    } catch (error) {
      console.error('Upload error:', error);

      // Better error handling
      if (error.response?.status === 422) {
        const errorMsg = error.response?.data?.error || 'File validation failed';
        toast.error(errorMsg);
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Failed to process file. Please check the file format and ensure it has CIA and Assessment sheets with student data.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      toast.loading('Preparing Excel file...');
      const blob = await downloadExcel();
      downloadFile(blob, 'CO_Attainment.xlsx');
      toast.dismiss();
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to download Excel file');
      console.error('Download error:', error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      toast.loading('Generating PDF...');
      const blob = await downloadPDF();
      downloadFile(blob, 'CO_Attainment.pdf');
      toast.dismiss();
      toast.success('PDF file downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to download PDF file');
      console.error('Download error:', error);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsSuccess(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            color: '#1d1d1f',
            borderRadius: '16px',
            padding: '16px 24px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#34c759',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff3b30',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CO Attainment
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/credits"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Team
            </Link>
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Generate CO Attainment
                  </span>
                  <span className="block text-gray-900 mt-2">with Ease</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Automate your Course Outcome attainment calculations. Upload your CIA and Assessment data, and instantly get comprehensive reports in Excel and PDF formats.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
                    className="ios-button bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 font-semibold text-lg hover:shadow-lg transition-all"
                  >
                    Get Started
                  </button>
                  <Link
                    to="/credits"
                    className="ios-button bg-white text-blue-600 px-8 py-4 font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    Meet the Team
                  </Link>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                    <div className="space-y-4">
                      <div className="h-3 bg-white/30 rounded w-3/4"></div>
                      <div className="h-3 bg-white/30 rounded w-full"></div>
                      <div className="h-3 bg-white/30 rounded w-5/6"></div>
                    </div>
                    <div className="mt-8 space-y-3">
                      <div className="h-2 bg-white/40 rounded w-1/2"></div>
                      <div className="h-2 bg-white/40 rounded w-3/4"></div>
                      <div className="h-2 bg-white/40 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Upload Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          id="upload-section"
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Upload Your Data
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Easily upload your CIA and Assessment Excel files and watch as we generate comprehensive CO attainment reports
              </p>
            </div>

            {/* Content Area */}
            {isSuccess ? (
              <SuccessScreen
                onDownloadExcel={handleDownloadExcel}
                onDownloadPDF={handleDownloadPDF}
                onReset={handleReset}
              />
            ) : isProcessing ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner message="Processing your Excel file..." />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Upload Card */}
                <div className="lg:col-span-2">
                  <div className="glass-card ios-blur ios-shadow-lg p-8 rounded-3xl">
                    <FileUpload
                      onFileSelect={handleFileSelect}
                      selectedFile={selectedFile}
                      isProcessing={isProcessing}
                    />

                    {selectedFile && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-center"
                      >
                        <button
                          onClick={handleGenerateCO}
                          disabled={isProcessing}
                          className="ios-button bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all w-full"
                        >
                          <span className="relative z-10">Generate CO Attainment</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Info Panel */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card ios-blur p-6 rounded-2xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Required Sheets</h4>
                        <p className="text-sm text-gray-600">CIA and Assessment</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card ios-blur p-6 rounded-2xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Supported Formats</h4>
                        <p className="text-sm text-gray-600">.xlsx files up to 10MB</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card ios-blur p-6 rounded-2xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Export Formats</h4>
                        <p className="text-sm text-gray-600">Excel (.xlsx) & PDF</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* File Format Guide */}
                  <div className="mt-8">
                    <FileFormatGuide />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage CO attainment calculations efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Upload</h3>
                <p className="text-gray-600">Simply drag and drop your Excel files or click to browse your system</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Validation</h3>
                <p className="text-gray-600">Automatic data validation ensures your files are properly formatted</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Multiple Exports</h3>
                <p className="text-gray-600">Download your results in Excel or PDF format instantly</p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};



export default Home;