import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12"
        >
          {/* About Section */}
          <div className="md:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mb-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CO Attainment<br/>Generator
                </h3>
              </div>
            </motion.div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Transform your academic assessment process with intelligent CO attainment reporting.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Trusted by Educators</span>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></span>
              Features
            </h4>
            <ul className="space-y-3 text-sm">
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 group">
                  <div className="w-8 h-8 bg-blue-500/10 group-hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  Excel Upload
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 group">
                  <div className="w-8 h-8 bg-green-500/10 group-hover:bg-green-500/20 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Excel Export
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 group">
                  <div className="w-8 h-8 bg-purple-500/10 group-hover:bg-purple-500/20 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  PDF Reports
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 group">
                  <div className="w-8 h-8 bg-orange-500/10 group-hover:bg-orange-500/20 rounded-lg flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Data Validation
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 group">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link to="/credits" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 group">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Credits
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 group">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Support
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 group">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              </motion.li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-pink-400 to-red-600 rounded-full"></span>
              Connect With Us
            </h4>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-lg backdrop-blur-sm"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs">support@example.com</span>
              </motion.div>
              
              <div className="flex gap-3">
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#" 
                  className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#" 
                  className="w-11 h-11 bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-sky-500/50 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#" 
                  className="w-11 h-11 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-gray-700/50 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider with Gradient */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm"
        >
          <div className="text-center md:text-left space-y-2">
            <p className="text-gray-300">
              © {currentYear} <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CO Attainment Generator</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 flex items-center justify-center md:justify-start gap-2">
              <span>Designed & Developed with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="text-red-500"
              >
                ❤️
              </motion.span>
              <span>by our team</span>
            </p>
          </div>

          <div className="flex gap-6 text-xs text-gray-400">
            <motion.a 
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              href="#" 
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              href="#" 
              className="hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              href="#" 
              className="hover:text-blue-400 transition-colors"
            >
              Cookie Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;