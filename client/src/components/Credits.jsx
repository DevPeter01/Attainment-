import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Credits = () => {
  const teamMembers = [
    {
      name: 'Mohan',
      role: 'Full Stack Developer & Project Lead',
      portfolio: '#', // Add your portfolio link
      avatar: '👨‍💼',
    },
    {
      name: 'Rohith',
      role: 'Frontend Developer',
      portfolio: '#', // Add your portfolio link
      avatar: '👨‍💻',
    },
    {
      name: 'Sridhar',
      role: 'Backend Developer',
      portfolio: '#', // Add your portfolio link
      avatar: '🧑‍💻',
    },
    {
      name: 'Hirthick',
      role: 'UI/UX Designer',
      portfolio: '#', // Add your portfolio link
      avatar: '🎨',
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
              className="text-blue-600 font-medium border-b-2 border-blue-600"
            >
              Team
            </Link>
            <a
              href="#"
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
          className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Credits
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet the talented team behind CO Attainment Generator
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Team Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6">
                    Passionate about education and software development
                  </p>
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group/link"
                  >
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Portfolio
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Our Team</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are a dedicated group of software developers and educators committed to creating tools that simplify academic processes. 
              Our mission is to empower educational institutions by providing reliable, efficient, and user-friendly solutions for course outcome management.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Credits;