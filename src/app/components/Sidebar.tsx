import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Award,
  Trophy,
  GraduationCap,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const { currentUser, setCurrentUser } = useApp();

  const getMenuItems = () => {
    switch (currentUser?.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'users', label: 'Manage Users', icon: Users },
          { id: 'courses', label: 'Courses', icon: BookOpen },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'trainer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'courses', label: 'My Courses', icon: BookOpen },
          { id: 'create', label: 'Create Module', icon: FileText },
          { id: 'assessments', label: 'Assessments', icon: Award },
          { id: 'students', label: 'Students', icon: Users },
        ];
      case 'dse':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'learning', label: 'My Learning', icon: BookOpen },
          { id: 'certificates', label: 'Certificates', icon: GraduationCap },
          { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
          { id: 'badges', label: 'My Badges', icon: Award },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    setCurrentUser(null);
    setIsMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#DC1F2E] to-[#FFC600] rounded-lg flex items-center justify-center">
            <GraduationCap className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-white font-bold">Indosat LMS</h2>
            <p className="text-gray-400 text-xs capitalize">{currentUser?.role} Portal</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt={currentUser?.name}
            className="w-12 h-12 rounded-full border-2 border-[#FFC600]"
          />
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{currentUser?.name}</p>
            <p className="text-gray-400 text-sm truncate">{currentUser?.email}</p>
            {currentUser?.role === 'dse' && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#FFC600] text-xs">Level {currentUser?.level}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-xs">{currentUser?.points} pts</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#DC1F2E] text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#DC1F2E] text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1a1a1a] h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isMobileOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25 }}
        className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-[#1a1a1a] z-40 flex flex-col"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
};
