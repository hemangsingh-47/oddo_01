import React, { useState } from 'react';
import OperationalAnalytics from './components/OperationalAnalytics';
import DriverManagement from './components/DriverManagement';
import { Activity, LayoutDashboard, PieChart, FileText, Settings, Bell, Users } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Decorative Blob */}
      <div className="absolute top-0 left-0 w-full h-96 bg-primary-100/30 rounded-full blur-3xl -z-10 transform -translate-y-1/2 rounded-[100%]"></div>

      {/* Top Navigation Bar */}
      <header className="glass-panel sticky top-0 z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo & Nav */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3 pr-6 border-r border-gray-200/50 h-10">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20 transform transition hover:scale-105">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="font-extrabold text-2xl text-gray-900 tracking-tight">FleetFlow</span>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-4 h-full">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center px-3 pt-1 border-b-2 gap-2 text-sm font-medium ${activeTab === 'dashboard'
                    ? 'border-primary-500 text-primary-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`inline-flex items-center px-3 pt-1 border-b-2 gap-2 text-sm font-medium ${activeTab === 'analytics'
                    ? 'border-primary-500 text-primary-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  <PieChart className="w-4 h-4" /> Operational Analytics
                </button>
                <button
                  onClick={() => setActiveTab('drivers')}
                  className={`inline-flex items-center px-3 pt-1 border-b-2 gap-2 text-sm font-medium ${activeTab === 'drivers'
                    ? 'border-primary-500 text-primary-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  <Users className="w-4 h-4" /> Drivers
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`inline-flex items-center px-3 pt-1 border-b-2 gap-2 text-sm font-medium ${activeTab === 'reports'
                    ? 'border-primary-500 text-primary-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                >
                  <FileText className="w-4 h-4" /> Reports
                </button>
              </nav>
            </div>
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-500 transition-colors p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-500 transition-colors p-2 rounded-full hover:bg-gray-100 hidden sm:block">
                <Settings className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 leading-none">Finance Admin</p>
                  <p className="text-xs text-gray-500 mt-1">HQ Operations</p>
                </div>
                <img className="h-9 w-9 rounded-full border border-gray-200 shadow-sm" src="https://ui-avatars.com/api/?name=Finance+Admin&background=f2e8e5&color=3f2c27" alt="Admin" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'analytics' ? (
          <OperationalAnalytics onNavigateToDrivers={() => setActiveTab('drivers')} />
        ) : activeTab === 'drivers' ? (
          <DriverManagement />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center glass-panel rounded-3xl border border-gray-200/50 p-12">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <LayoutDashboard className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Module Under Construction</h3>
            <p className="text-base text-gray-500 max-w-md mb-8">
              The {activeTab} module is currently being built. Please navigate to Operational Analytics to view the comprehensive reports.
            </p>
            <button
              onClick={() => setActiveTab('analytics')}
              className="btn-premium px-8 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2"
            >
              <PieChart className="w-4 h-4" /> Go to Analytics
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
