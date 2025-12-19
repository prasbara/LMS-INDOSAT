import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Target,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DSEDashboard: React.FC = () => {
  const { currentUser, courses } = useApp();

  const stats = [
    {
      label: 'Courses In Progress',
      value: courses.filter((c) => c.progress && c.progress > 0 && c.progress < 100).length,
      icon: BookOpen,
      color: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Completed',
      value: courses.filter((c) => c.isCompleted).length,
      icon: Award,
      color: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Total Points',
      value: currentUser?.points || 0,
      icon: Zap,
      color: 'bg-yellow-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      label: 'Current Level',
      value: currentUser?.level || 1,
      icon: TrendingUp,
      color: 'bg-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  const activityData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 20 },
    { day: 'Sun', minutes: 40 },
  ];

  const inProgressCourses = courses.filter(
    (c) => c.progress && c.progress > 0 && c.progress < 100
  );

  const recommendedCourses = courses.filter((c) => !c.progress || c.progress === 0).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#DC1F2E] to-[#FF6B00] rounded-xl p-8 text-white"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl mb-2">Welcome back, {currentUser?.name}! 👋</h1>
            <p className="text-white/90">
              You're making great progress! Keep learning to reach the next level.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{currentUser?.level}</div>
            <div className="text-sm text-white/90">Current Level</div>
          </div>
        </div>
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Weekly Learning Activity</h3>
            <Clock size={20} className="text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="minutes" fill="#DC1F2E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-4">
            Total this week: {activityData.reduce((acc, d) => acc + d.minutes, 0)} minutes
          </p>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Learning Goals</h3>
            <Target size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Monthly Target</span>
                <span className="font-semibold text-gray-800">3/5 Courses</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#DC1F2E] h-2 rounded-full transition-all"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Points This Month</span>
                <span className="font-semibold text-gray-800">850/1000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#FFC600] h-2 rounded-full transition-all"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Quiz Success Rate</span>
                <span className="font-semibold text-gray-800">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Continue Learning</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgressCourses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#DC1F2E] transition-colors cursor-pointer"
              >
                <div className="flex gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 mb-1 truncate">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{course.duration}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-[#DC1F2E] h-1.5 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommended Courses */}
      {recommendedCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#DC1F2E] transition-colors cursor-pointer"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{course.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{course.duration}</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
