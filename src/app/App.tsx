import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';

// DSE Components
import { DSEDashboard } from './components/dse/DSEDashboard';
import { Learning } from './components/dse/Learning';
import { Leaderboard } from './components/dse/Leaderboard';
import { Badges } from './components/dse/Badges';
import { Certificates } from './components/dse/Certificates';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';

// Trainer Components
import { TrainerDashboard } from './components/trainer/TrainerDashboard';

const MainApp: React.FC = () => {
  const { currentUser, showLanding, setShowLanding } = useApp();
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Show landing page first
  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!currentUser) {
    return <Login />;
  }

  const renderContent = () => {
    // DSE Views
    if (currentUser.role === 'dse') {
      switch (activeView) {
        case 'dashboard':
          return <DSEDashboard />;
        case 'learning':
          return <Learning />;
        case 'leaderboard':
          return <Leaderboard />;
        case 'badges':
          return <Badges />;
        case 'certificates':
          return <Certificates />;
        default:
          return <DSEDashboard />;
      }
    }

    // Admin Views
    if (currentUser.role === 'admin') {
      switch (activeView) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
              <p className="text-gray-600">User management interface coming soon...</p>
            </div>
          );
        case 'courses':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Management</h2>
              <p className="text-gray-600">Course management interface coming soon...</p>
            </div>
          );
        case 'analytics':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h2>
              <p className="text-gray-600">Advanced analytics interface coming soon...</p>
            </div>
          );
        case 'settings':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
              <p className="text-gray-600">Settings interface coming soon...</p>
            </div>
          );
        default:
          return <AdminDashboard />;
      }
    }

    // Trainer Views
    if (currentUser.role === 'trainer') {
      switch (activeView) {
        case 'dashboard':
          return <TrainerDashboard />;
        case 'courses':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">My Courses</h2>
              <p className="text-gray-600">Course management interface coming soon...</p>
            </div>
          );
        case 'create':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Module</h2>
              <p className="text-gray-600">Module creation interface coming soon...</p>
            </div>
          );
        case 'assessments':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessments</h2>
              <p className="text-gray-600">Assessment management interface coming soon...</p>
            </div>
          );
        case 'students':
          return (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Students</h2>
              <p className="text-gray-600">Student management interface coming soon...</p>
            </div>
          );
        default:
          return <TrainerDashboard />;
      }
    }

    return <DSEDashboard />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <main className="flex-1 overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;