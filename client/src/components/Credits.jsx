import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Credits = () => {
  const teamMembers = [
    {
      name: 'Mohan',
      role: 'Developer (Android App Developer - Flutter)',
      portfolio: '#',
      gradient: 'from-green-400 to-cyan-500',
      icon: (
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.523 15.341c-.538-.577-.858-1.349-.858-2.182 0-.833.32-1.605.858-2.182C18.724 9.577 19.5 8.183 19.5 6.5c0-1.683-.776-3.077-1.977-4.477C16.325.603 15.165 0 13.5 0c-1.665 0-2.825.603-4.023 2.023C8.276 3.423 7.5 4.817 7.5 6.5c0 1.683.776 3.077 1.977 4.477.538.577.858 1.349.858 2.182 0 .833-.32 1.605-.858 2.182C8.276 16.923 7.5 18.317 7.5 20c0 1.683.776 3.077 1.977 4.477C10.675 25.897 11.835 26.5 13.5 26.5c1.665 0 2.825-.603 4.023-2.023C18.724 23.077 19.5 21.683 19.5 20c0-1.683-.776-3.077-1.977-4.477zM13.5 23.5c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
      ),
    },
    {
      name: 'Rohith',
      role: 'Developer (Full Stack MERN)',
      portfolio: 'https://peterrfolio.netlify.app/',
      gradient: 'from-blue-500 to-purple-600',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      name: 'Sridhar',
      role: 'Developer (Full Stack - Python)',
      portfolio: 'https://sridhar-dev-portfolio.vercel.app/',
      gradient: 'from-yellow-400 to-orange-500',
      icon: (
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
        </svg>
      ),
    },
    {
      name: 'Hirthick',
      role: 'Developer (Machine Learning & Deep Learning (AI))',
      portfolio: 'https://portfolio-xi-blush-25.vercel.app/',
      gradient: 'from-pink-500 to-rose-600',
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
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
                  <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {member.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6">
                    Passionate about education and software development
                  </p>
                  {member.portfolio !== '#' ? (
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
                  ) : (
                    <span className="inline-flex items-center gap-2 text-gray-400 font-medium cursor-not-allowed">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Portfolio Coming Soon
                    </span>
                  )}
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