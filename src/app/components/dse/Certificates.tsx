import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Download, Share2, Award, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Certificates: React.FC = () => {
  const { courses, currentUser } = useApp();

  const completedCourses = courses.filter((c) => c.isCompleted);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Certificates</h1>
          <p className="text-gray-600 mt-1">
            View and download your earned certificates
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
          <GraduationCap className="text-[#DC1F2E]" size={20} />
          <span className="text-gray-700">{completedCourses.length} Certificates</span>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#DC1F2E] to-[#FF6B00] rounded-xl p-6 text-white"
        >
          <Award size={32} className="mb-3" />
          <div className="text-3xl font-bold mb-1">{completedCourses.length}</div>
          <div className="text-white/90">Total Certificates</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <GraduationCap size={32} className="text-[#FFC600] mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {completedCourses.length * 20}
          </div>
          <div className="text-gray-600">Learning Hours</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <Calendar size={32} className="text-green-500 mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {new Date().getFullYear()}
          </div>
          <div className="text-gray-600">Active Year</div>
        </motion.div>
      </div>

      {/* Certificates List */}
      {completedCourses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Certificate Design */}
              <div className="relative bg-gradient-to-br from-[#DC1F2E] via-[#FF6B00] to-[#FFC600] p-8">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-4 left-4">
                    <GraduationCap size={80} />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Award size={80} />
                  </div>
                </div>

                <div className="relative text-center text-white">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
                    <GraduationCap size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Certificate of Completion</h3>
                  <div className="w-16 h-1 bg-white mx-auto mb-4"></div>
                  <p className="text-sm mb-2">This certifies that</p>
                  <h4 className="text-xl font-bold mb-2">{currentUser?.name}</h4>
                  <p className="text-sm mb-2">has successfully completed</p>
                  <h5 className="text-lg font-semibold">{course.title}</h5>
                </div>
              </div>

              {/* Certificate Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-800">Issue Date</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">Certificate ID</p>
                    <p>IND-{course.id.toUpperCase()}-{new Date().getFullYear()}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[#DC1F2E] text-white py-2 px-4 rounded-lg hover:bg-[#b81826] transition-colors flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-12 text-center shadow-sm"
        >
          <GraduationCap size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Certificates Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Complete courses to earn certificates and showcase your achievements
          </p>
          <button className="bg-[#DC1F2E] text-white px-6 py-3 rounded-lg hover:bg-[#b81826] transition-colors">
            Browse Courses
          </button>
        </motion.div>
      )}

      {/* Verification Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Award className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Certificate Verification</h3>
            <p className="text-sm text-gray-700">
              All certificates issued by Indosat LMS are digitally verified and can be shared
              on LinkedIn, social media, or your professional portfolio. Each certificate
              includes a unique ID for verification purposes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
