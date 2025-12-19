import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Play,
  CircleCheck,
  Clock,
  Star,
  ArrowLeft,
  FileText,
  Users,
} from 'lucide-react';
import { useApp, Course, Module } from '../../context/AppContext';
import { QuizComponent } from '../shared/QuizComponent';

export const Learning: React.FC = () => {
  const { courses, modules, updateModuleProgress, updateCourseProgress } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filteredCourses = courses.filter((course) => {
    if (filter === 'in-progress') {
      return course.progress && course.progress > 0 && course.progress < 100;
    }
    if (filter === 'completed') {
      return course.isCompleted;
    }
    return true;
  });

  const handleModuleComplete = (moduleId: string, courseId: string) => {
    updateModuleProgress(moduleId, true);
    updateCourseProgress(courseId);
    setShowQuiz(true);
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setSelectedModule(null);
  };

  if (showQuiz && selectedModule) {
    return (
      <QuizComponent
        moduleId={selectedModule.id}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  if (selectedModule) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedModule(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#DC1F2E] transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Course
        </button>

        {/* Video Player Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl overflow-hidden shadow-sm"
        >
          {/* Video Placeholder */}
          <div className="relative bg-black aspect-video flex items-center justify-center">
            <Play size={64} className="text-white opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Play size={64} className="mx-auto mb-4 opacity-80" />
                <p className="text-lg">Video Player</p>
                <p className="text-sm opacity-70 mt-2">Duration: {selectedModule.duration}</p>
              </div>
            </div>
          </div>

          {/* Module Info */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedModule.title}</h2>
            <p className="text-gray-600 mb-4">{selectedModule.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {selectedModule.duration}
              </span>
            </div>

            {/* Mark Complete Button */}
            {!selectedModule.isCompleted && (
              <button
                onClick={() => handleModuleComplete(selectedModule.id, selectedModule.courseId)}
                className="w-full sm:w-auto bg-[#DC1F2E] text-white px-6 py-3 rounded-lg hover:bg-[#b81826] transition-colors flex items-center justify-center gap-2"
              >
                <CircleCheck size={20} />
                Mark as Complete & Take Quiz
              </button>
            )}

            {selectedModule.isCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <CircleCheck size={20} />
                <span>Module Completed</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Module Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Module Content</h3>
          <div className="prose max-w-none text-gray-700">
            <p>
              This module covers essential topics that will help you master the subject. The video
              above provides comprehensive coverage of:
            </p>
            <ul>
              <li>Key concepts and fundamentals</li>
              <li>Practical applications and examples</li>
              <li>Best practices and tips</li>
              <li>Common challenges and solutions</li>
            </ul>
            <p>
              After completing the video, make sure to take the quiz to test your understanding and
              earn points toward your certification.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (selectedCourse) {
    const courseModules = modules.filter((m) => m.courseId === selectedCourse.id);
    const completedCount = courseModules.filter((m) => m.isCompleted).length;

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#DC1F2E] transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Courses
        </button>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedCourse.title}</h1>
              <p className="text-gray-600 mb-6">{selectedCourse.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {selectedCourse.duration}
                </span>
                <span className="flex items-center gap-1">
                  <FileText size={16} />
                  {selectedCourse.modules} modules
                </span>
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {selectedCourse.enrolled} enrolled
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  {selectedCourse.rating}
                </span>
              </div>
            </div>

            <div>
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{selectedCourse.progress || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#DC1F2E] h-2 rounded-full transition-all"
                    style={{ width: `${selectedCourse.progress || 0}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {completedCount} of {courseModules.length} modules completed
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Modules</h3>
          <div className="space-y-3">
            {courseModules.map((module, index) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  module.isCompleted
                    ? 'border-green-200 bg-green-50 hover:border-green-300'
                    : 'border-gray-200 hover:border-[#DC1F2E] hover:shadow-md'
                }`}
              >
                <div className="flex-shrink-0">
                  {module.isCompleted ? (
                    <CircleCheck size={24} className="text-green-600" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 truncate">{module.title}</h4>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  {module.duration}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Learning</h1>
          <p className="text-gray-600 mt-1">Explore and complete courses to advance your skills</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {(['all', 'in-progress', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm capitalize transition-colors ${
                filter === f
                  ? 'bg-white text-[#DC1F2E] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {f === 'in-progress' ? 'In Progress' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCourse(course)}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:border-[#DC1F2E]"
          >
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              {course.isCompleted && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <CircleCheck size={16} />
                  Completed
                </div>
              )}
              {course.progress && course.progress > 0 && course.progress < 100 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-[#FFC600] h-1.5 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="text-xs text-[#DC1F2E] font-semibold mb-2">{course.category}</div>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {course.modules} modules
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No courses found in this category</p>
        </div>
      )}
    </div>
  );
};