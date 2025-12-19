import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Activity,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { users, courses } = useApp();

  const dseUsers = users.filter((u) => u.role === 'dse');
  const totalEnrollments = courses.reduce((acc, c) => acc + c.enrolled, 0);
  const avgCompletion = Math.round(
    courses.reduce((acc, c) => acc + (c.progress || 0), 0) / courses.length
  );

  const stats = [
    {
      label: 'Total DSE Users',
      value: dseUsers.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Active Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+3',
      trend: 'up',
    },
    {
      label: 'Total Enrollments',
      value: totalEnrollments,
      icon: TrendingUp,
      color: 'bg-[#DC1F2E]',
      change: '+28%',
      trend: 'up',
    },
    {
      label: 'Avg. Completion',
      value: `${avgCompletion}%`,
      icon: Award,
      color: 'bg-[#FFC600]',
      change: '+5%',
      trend: 'up',
    },
  ];

  const enrollmentData = [
    { month: 'Jan', enrollments: 45 },
    { month: 'Feb', enrollments: 52 },
    { month: 'Mar', enrollments: 48 },
    { month: 'Apr', enrollments: 65 },
    { month: 'May', enrollments: 78 },
    { month: 'Jun', enrollments: 85 },
  ];

  const courseData = courses.slice(0, 5).map((c) => ({
    name: c.title.substring(0, 20) + '...',
    enrolled: c.enrolled,
  }));

  const categoryData = [
    { name: 'Product Knowledge', value: 35, color: '#DC1F2E' },
    { name: 'Sales Skills', value: 30, color: '#FFC600' },
    { name: 'Technical', value: 20, color: '#FF6B00' },
    { name: 'Soft Skills', value: 15, color: '#00A5E3' },
  ];

  const activityData = [
    { time: '00:00', active: 12 },
    { time: '04:00', active: 8 },
    { time: '08:00', active: 45 },
    { time: '12:00', active: 68 },
    { time: '16:00', active: 52 },
    { time: '20:00', active: 28 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Monitor and manage your LMS platform performance
        </p>
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
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Enrollment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#DC1F2E"
                strokeWidth={3}
                dot={{ fill: '#DC1F2E', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Course Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Popular Courses & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Most Popular Courses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="name" type="category" width={150} stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="enrolled" fill="#FFC600" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">User Activity (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="active" fill="#DC1F2E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Recent User Activity</h3>
          <Activity size={20} className="text-gray-400" />
        </div>
        <div className="space-y-4">
          {[
            {
              user: 'Budi Santoso',
              action: 'completed',
              course: 'Product Knowledge: IM3 Ooredoo',
              time: '5 minutes ago',
            },
            {
              user: 'Siti Nurhaliza',
              action: 'enrolled in',
              course: 'Sales Technique & Communication',
              time: '12 minutes ago',
            },
            {
              user: 'Rizky Pratama',
              action: 'passed quiz',
              course: 'Customer Service Excellence',
              time: '1 hour ago',
            },
            {
              user: 'Dewi Lestari',
              action: 'started',
              course: 'Digital Services & Apps',
              time: '2 hours ago',
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`}
                alt={activity.user}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                  <span className="font-semibold">{activity.course}</span>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Clock size={14} />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
