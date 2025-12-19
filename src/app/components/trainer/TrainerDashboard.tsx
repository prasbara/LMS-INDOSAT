import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Users,
  CircleCheck,
  TrendingUp,
  Plus,
  Video,
  FileText,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TrainerDashboard: React.FC = () => {
  const { courses, users } = useApp();

  const dseUsers = users.filter((u) => u.role === 'dse');
  const totalEnrollments = courses.reduce((acc, c) => acc + c.enrolled, 0);
  const avgRating =
    courses.reduce((acc, c) => acc + c.rating, 0) / courses.length;

  const stats = [
    {
      label: 'My Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Total Students',
      value: dseUsers.length,
      icon: Users,
      color: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Total Enrollments',
      value: totalEnrollments,
      icon: TrendingUp,
      color: 'bg-[#DC1F2E]',
      iconBg: 'bg-red-100',
      iconColor: 'text-[#DC1F2E]',
    },
    {
      label: 'Avg. Rating',
      value: avgRating.toFixed(1),
      icon: Award,
      color: 'bg-[#FFC600]',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
  ];

  const coursePerformance = courses.slice(0, 5).map((c) => ({
    name: c.title.substring(0, 20) + '...',
    enrolled: c.enrolled,
    completed: Math.round(c.enrolled * ((c.progress || 0) / 100)),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Trainer Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your courses and track student progress
          </p>
        </div>
        <button className="bg-[#DC1F2E] text-white px-6 py-3 rounded-lg hover:bg-[#b81826] transition-colors flex items-center gap-2 shadow-lg">
          <Plus size={20} />
          Create New Course
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.iconBg} p-3 rounded-lg`}>
                  <Icon className={stat.iconColor} size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Course Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Course Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={coursePerformance}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="enrolled" fill="#DC1F2E" radius={[8, 8, 0, 0]} name="Enrolled" />
            <Bar dataKey="completed" fill="#FFC600" radius={[8, 8, 0, 0]} name="Completed" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* My Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">My Courses</h3>
          <button className="text-[#DC1F2E] hover:underline text-sm">View All</button>
        </div>
        <div className="space-y-4">
          {courses.slice(0, 4).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#DC1F2E] transition-all cursor-pointer"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 mb-1 truncate">{course.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {course.enrolled} students
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {course.modules} modules
                  </span>
                  <span className="flex items-center gap-1">
                    ⭐ {course.rating}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileText size={20} className="text-gray-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <Video className="text-blue-600" size={24} />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Upload Video</h4>
          <p className="text-sm text-gray-600">Add new training videos to your courses</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
            <FileText className="text-green-600" size={24} />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Create Quiz</h4>
          <p className="text-sm text-gray-600">Design assessments for your modules</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left group">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <CircleCheck className="text-purple-600" size={24} />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Review Submissions</h4>
          <p className="text-sm text-gray-600">Grade and provide feedback</p>
        </button>
      </motion.div>

      {/* Recent Student Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Student Activity</h3>
        <div className="space-y-4">
          {dseUsers.slice(0, 5).map((user, index) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">Completed a quiz • {index + 1}h ago</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Score:</span>
                <span className="font-semibold text-green-600">{85 + index * 2}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};