import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, User, Lock } from 'lucide-react';
import { useApp, UserRole } from '../context/AppContext';

export const Login: React.FC = () => {
  const { setCurrentUser, users } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    const user = users.find((u) => u.email === email && u.role === selectedRole);

    if (user) {
      setCurrentUser(user);
    } else {
      setError('Invalid credentials or role mismatch');
    }
  };

  const quickLogin = (role: UserRole) => {
    const user = users.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DC1F2E] via-[#FF6B00] to-[#FFC600] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-2xl p-6 inline-block mb-4 shadow-2xl">
            <h1 className="text-3xl font-bold text-[#DC1F2E]">Indosat LMS</h1>
            <p className="text-gray-600 mt-2">Learning Management System</p>
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-2xl mb-6 text-center text-gray-800">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 mb-2">Select Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(['admin', 'trainer', 'dse'] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-3 px-4 rounded-lg border-2 transition-all capitalize ${
                      selectedRole === role
                        ? 'border-[#DC1F2E] bg-[#DC1F2E] text-white'
                        : 'border-gray-200 hover:border-[#DC1F2E] text-gray-700'
                    }`}
                  >
                    {role === 'dse' ? 'DSE' : role}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#DC1F2E] focus:outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#DC1F2E] focus:outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#DC1F2E] text-white py-3 rounded-lg hover:bg-[#b81826] transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Login
            </button>
          </form>

          {/* Quick Login Demo */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">Quick Demo Login:</p>
            <div className="space-y-2">
              <button
                onClick={() => quickLogin('admin')}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                Login as Admin
              </button>
              <button
                onClick={() => quickLogin('trainer')}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                Login as Trainer
              </button>
              <button
                onClick={() => quickLogin('dse')}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                Login as DSE
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Demo: admin@indosat.com, ahmad@indosat.com, budi@indosat.com
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
