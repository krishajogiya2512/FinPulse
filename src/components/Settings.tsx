// Settings page matching Figma design
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings as SettingsIcon, User, Phone, Sun, Moon, Bell, Globe, Eye, HelpCircle, Info, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import finpulseLogo from '../assets/finpulse_logo.png';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack, onLogout }) => {
  const [themeDark, setThemeDark] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(true);

  // Simple class toggle on root element for theme
  useEffect(() => {
    const root = document.documentElement;
    if (!themeDark) {
      root.classList.add('light-mode');
    } else {
      root.classList.remove('light-mode');
    }
  }, [themeDark]);

  const handleBack = () => {
    onBack();
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden"
      style={{ background: '#0d1f2d', fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Left Sidebar - copy from Dashboard for consistency */}
      <nav
        className="fixed top-0 left-0 h-full flex flex-col items-center justify-between z-50"
        style={{
          width: 72,
          background: 'rgba(17,34,51,0.97)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <button
            id="nav-home"
            onClick={() => onBack()}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
            style={{ color: '#00c8c8' }}
          >
            <ArrowLeft size={20} fill="#00c8c8" />
            <span className="text-[10px] font-semibold">Home</span>
          </button>
          <button
            id="nav-settings"
            onClick={() => {}}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
            style={{ color: '#00c8c8' }}
          >
            <SettingsIcon size={20} fill="#00c8c8" />
            <span className="text-[10px] font-semibold">Settings</span>
          </button>
        </div>
        <div />
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: 72, width: '100%' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}
          >
            <ChevronLeft size={18} color="#00c8c8" />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-white">Settings</h1>
            <p className="text-sm text-gray-400">Customize your experience</p>
          </div>
          <img src={finpulseLogo} alt="FinPulse" className="w-7 h-7 object-contain" />
        </div>

        {/* Profile Card */}
        <button className="flex items-center justify-between w-full max-w-md mx-auto bg-[#112233] border border-gray-700 rounded-xl p-4 mb-6" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
              <User size={24} color="#00c8c8" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">krishajogiya51</span>
              <span className="text-gray-400 text-sm">krishajogiya51@gmail.com</span>
            </div>
          </div>
          <ChevronRight size={20} color="#64748b" />
        </button>

        {/* Sections */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* ACCOUNT */}
          <div className="text-xs uppercase tracking-wider text-gray-500">Account</div>
          <button className="flex items-center justify-between w-full p-3 bg-[#112233] rounded-xl" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
                <Phone size={18} color="#00c8c8" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold">Student Uses</span>
                <span className="text-gray-400 text-xs">Track student life</span>
              </div>
            </div>
            <ChevronRight size={20} color="#64748b" />
          </button>

          {/* PREFERENCES */}
          <div className="text-xs uppercase tracking-wider text-gray-500">Preferences</div>
          {/* Theme row */}
          <div className="flex items-center justify-between w-full p-3 bg-[#112233] rounded-xl" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
                {themeDark ? <Moon size={18} color="#00c8c8" /> : <Sun size={18} color="#00c8c8" />}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold">Theme</span>
                <span className="text-gray-400 text-xs">{themeDark ? 'Dark' : 'Light'}</span>
              </div>
            </div>
            <button onClick={() => setThemeDark(!themeDark)} className="w-10 h-5 flex items-center bg-gray-600 rounded-full p-0.5" style={{ background: themeDark ? '#014f4f' : '#00c8c8' }}>
              <div className="w-4 h-4 bg-white rounded-full" style={{ transform: themeDark ? 'translateX(0)' : 'translateX(20px)' }} />
            </button>
          </div>
          {/* Notifications row */}
          <div className="flex items-center justify-between w-full p-3 bg-[#112233] rounded-xl" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
                <Bell size={18} color="#00c8c8" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold">Notifications</span>
                <span className="text-gray-400 text-xs">{notificationsOn ? 'On' : 'Off'}</span>
              </div>
            </div>
            <button onClick={() => setNotificationsOn(!notificationsOn)} className="w-10 h-5 flex items-center bg-gray-600 rounded-full p-0.5" style={{ background: notificationsOn ? '#00c8c8' : '#014f4f' }}>
              <div className="w-4 h-4 bg-white rounded-full" style={{ transform: notificationsOn ? 'translateX(20px)' : 'translateX(0)' }} />
            </button>
          </div>
          {/* Language row */}
          <button className="flex items-center justify-between w-full p-3 bg-[#112233] rounded-xl" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
                <Globe size={18} color="#00c8c8" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold">Language</span>
                <span className="text-gray-400 text-xs">English</span>
              </div>
            </div>
            <ChevronRight size={20} color="#64748b" />
          </button>

          {/* SECURITY & PRIVACY */}
          <div className="text-xs uppercase tracking-wider text-gray-500">Security & Privacy</div>
          <button className="flex items-center justify-between w-full p-3 bg-[#112233] rounded-xl" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
                <Eye size={18} color="#00c8c8" />
              </div>
              <span className="text-white font-semibold">Privacy Settings</span>
            </div>
            <ChevronRight size={20} color="#64748b" />
          </button>

          {/* SUPPORT */}
          <div className="text-xs uppercase tracking-wider text-gray-500">Support</div>
          <button className="flex items-center justify-between w-full p-3 bg-[#112233] rounded-xl" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
                <HelpCircle size={18} color="#00c8c8" />
              </div>
              <span className="text-white font-semibold">Help Center</span>
            </div>
            <ChevronRight size={20} color="#64748b" />
          </button>
          <button className="flex items-center justify-between w-full p-3 bg-[#112233] rounded-xl" style={{ background: 'rgba(17,34,51,0.9)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}>
                <Info size={18} color="#00c8c8" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold">About FinPulse</span>
                <span className="text-gray-400 text-xs">v1.0.0</span>
              </div>
            </div>
            <ChevronRight size={20} color="#64748b" />
          </button>

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="flex items-center justify-center w-full max-w-md mx-auto py-3 rounded-full border border-pink-500 text-pink-400 font-semibold"
            style={{ background: 'rgba(25,0,0,0.2)' }}
          >
            <LogOut size={18} color="#ff4d6d" className="mr-2" />
            Logout
          </button>

          {/* Footer */}
          <div className="flex flex-col items-center mt-8 text-center text-gray-400">
            <img src={finpulseLogo} alt="FinPulse" className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium">FinPulse v1.0.0</span>
            <span className="text-xs">Smart Money, Smart Deals</span>
          </div>
        </div>
      </div>
    </div>
  );
};
