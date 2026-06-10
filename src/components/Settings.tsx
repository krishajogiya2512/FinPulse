// Settings page — fully functional with modals, toasts, and global theme
import React, { useState, useCallback } from 'react';
import {
  Home,
  Settings as SettingsIcon,
  User,
  Phone,
  Sun,
  Moon,
  Bell,
  Globe,
  Eye,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Shield,
} from 'lucide-react';
import finpulseLogo from '../assets/finpulse_logo.png';

/* ─── Types ────────────────────────────────────────────────── */
type ModalType =
  | 'profile'
  | 'studentUses'
  | 'language'
  | 'privacy'
  | 'helpCenter'
  | 'aboutFinPulse'
  | 'logoutConfirm'
  | null;

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

/* ─── Reusable modal overlay ───────────────────────────────── */
const ModalOverlay: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
  onClose,
  children,
}) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center"
    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
    onClick={onClose}
  >
    <div
      className="w-full max-w-sm mx-4 rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: '#112233',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

/* ─── Toast notification ───────────────────────────────────── */
const Toast: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => (
  <div
    className="fixed bottom-8 left-1/2 z-[200] px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300"
    style={{
      transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(30px)',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      background: 'rgba(0,200,200,0.15)',
      border: '1px solid rgba(0,200,200,0.3)',
      color: '#00c8c8',
      backdropFilter: 'blur(12px)',
    }}
  >
    {message}
  </div>
);

/* ─── Shared styles ────────────────────────────────────────── */
const cardStyle: React.CSSProperties = {
  background: 'rgba(17,34,51,0.9)',
  border: '1px solid rgba(255,255,255,0.07)',
};

const iconWrapStyle: React.CSSProperties = {
  background: 'rgba(0,200,200,0.12)',
  border: '1px solid rgba(0,200,200,0.25)',
};


/* ─── Main Component ──────────────────────────────────────── */
export const Settings: React.FC<SettingsProps> = ({
  onBack,
  onLogout,
  isDarkMode,
  setIsDarkMode,
}) => {
  /* local state */
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [profileName, setProfileName] = useState('krishajogiya51');
  const [profileEmail, setProfileEmail] = useState('krishajogiya51@gmail.com');
  const [draftName, setDraftName] = useState(profileName);
  const [draftEmail, setDraftEmail] = useState(profileEmail);
  const [language, setLanguage] = useState('English');
  const [biometricOn, setBiometricOn] = useState(false);

  /* toast */
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  }, []);

  /* handlers */
  const openModal = (m: ModalType) => setActiveModal(m);
  const closeModal = () => setActiveModal(null);

  const handleProfileSave = () => {
    setProfileName(draftName);
    setProfileEmail(draftEmail);
    closeModal();
    showToast('Profile updated successfully');
  };

  const handleProfileOpen = () => {
    setDraftName(profileName);
    setDraftEmail(profileEmail);
    openModal('profile');
  };

  const handleNotificationToggle = () => {
    const newVal = !notificationsOn;
    setNotificationsOn(newVal);
    if (!newVal) showToast('Notifications disabled');
  };

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    closeModal();
    showToast(`Language changed to ${lang}`);
  };

  const handleLogoutConfirm = () => {
    closeModal();
    onLogout();
  };

  /* ─── Toggle switch sub-component ────────────────────────── */
  const ToggleSwitch: React.FC<{ on: boolean; onToggle: () => void }> = ({ on, onToggle }) => (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
      style={{ background: on ? '#00c8c8' : '#1e3a4f' }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300"
        style={{ transform: on ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  );

  /* ─── Shared row component ───────────────────────────────── */
  const SettingRow: React.FC<{
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    trailing?: React.ReactNode;
  }> = ({ icon, title, subtitle, onClick, trailing }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-3.5 rounded-xl transition-all duration-200 hover:brightness-110"
      style={cardStyle}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={iconWrapStyle}
        >
          {icon}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-semibold text-sm">{title}</span>
          {subtitle && <span className="text-gray-400 text-xs">{subtitle}</span>}
        </div>
      </div>
      {trailing ?? <ChevronRight size={18} color="#64748b" />}
    </button>
  );

  return (
    <div
      id="settings-root"
      className="relative min-h-screen w-full flex flex-col overflow-x-hidden"
      style={{ background: '#0d1f2d', fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Left Sidebar ─────────────────────────────────────── */}
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
            onClick={onBack}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
            style={{ color: '#64748b' }}
          >
            <Home size={20} />
            <span className="text-[10px] font-semibold">Home</span>
          </button>
          <button
            id="nav-settings"
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
            style={{ color: '#00c8c8' }}
          >
            <SettingsIcon size={20} />
            <span className="text-[10px] font-semibold">Settings</span>
          </button>
        </div>
        <div />
      </nav>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col w-full" style={{ paddingLeft: 72 }}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 w-full max-w-md mx-auto">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-white">Settings</h1>
            <p className="text-sm text-gray-400">Customize your experience</p>
          </div>
          <img src={finpulseLogo} alt="FinPulse" className="w-7 h-7 object-contain ml-auto" />
        </div>

        {/* Profile Card */}
        <button
          onClick={handleProfileOpen}
          className="flex items-center justify-between w-full max-w-md mx-auto rounded-xl p-4 mb-6 transition-all duration-200 hover:brightness-110"
          style={cardStyle}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={iconWrapStyle}
            >
              <User size={24} color="#00c8c8" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">{profileName}</span>
              <span className="text-gray-400 text-sm">{profileEmail}</span>
            </div>
          </div>
          <ChevronRight size={20} color="#64748b" />
        </button>

        {/* ── Sections ───────────────────────────────────────── */}
        <div className="w-full max-w-md mx-auto space-y-4 px-4 pb-12">
          {/* ACCOUNT */}
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Account</div>
          <SettingRow
            icon={<Phone size={18} color="#00c8c8" />}
            title="Student Uses"
            subtitle="Track student life"
            onClick={() => openModal('studentUses')}
          />

          {/* PREFERENCES */}
          <div className="text-xs uppercase tracking-wider text-gray-500 mt-6 mb-1">Preferences</div>

          {/* Theme row */}
          <SettingRow
            icon={isDarkMode ? <Moon size={18} color="#00c8c8" /> : <Sun size={18} color="#00c8c8" />}
            title="Theme"
            subtitle={isDarkMode ? 'Dark' : 'Light'}
            onClick={() => setIsDarkMode(!isDarkMode)}
            trailing={<ToggleSwitch on={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />}
          />

          {/* Notifications row */}
          <SettingRow
            icon={<Bell size={18} color="#00c8c8" />}
            title="Notifications"
            subtitle={notificationsOn ? 'On' : 'Off'}
            onClick={handleNotificationToggle}
            trailing={<ToggleSwitch on={notificationsOn} onToggle={handleNotificationToggle} />}
          />

          {/* Language row */}
          <SettingRow
            icon={<Globe size={18} color="#00c8c8" />}
            title="Language"
            subtitle={language}
            onClick={() => openModal('language')}
          />

          {/* SECURITY & PRIVACY */}
          <div className="text-xs uppercase tracking-wider text-gray-500 mt-6 mb-1">
            Security &amp; Privacy
          </div>
          <SettingRow
            icon={<Eye size={18} color="#00c8c8" />}
            title="Privacy Settings"
            subtitle="Manage your privacy"
            onClick={() => openModal('privacy')}
          />

          {/* SUPPORT */}
          <div className="text-xs uppercase tracking-wider text-gray-500 mt-6 mb-1">Support</div>
          <SettingRow
            icon={<HelpCircle size={18} color="#00c8c8" />}
            title="Help Center"
            subtitle="Get support"
            onClick={() => openModal('helpCenter')}
          />
          <SettingRow
            icon={<Info size={18} color="#00c8c8" />}
            title="About FinPulse"
            subtitle="v1.0.0"
            onClick={() => openModal('aboutFinPulse')}
          />

          {/* Logout */}
          <button
            onClick={() => openModal('logoutConfirm')}
            className="flex items-center justify-center gap-2 w-full py-3.5 mt-4 rounded-full font-semibold transition-all duration-200 hover:brightness-125"
            style={{
              background: 'rgba(255,77,109,0.08)',
              border: '1px solid rgba(255,77,109,0.35)',
              color: '#ff4d6d',
            }}
          >
            <LogOut size={18} />
            Logout
          </button>

          {/* Footer */}
          <div className="flex flex-col items-center mt-8 text-center text-gray-500 pb-4">
            <img src={finpulseLogo} alt="FinPulse" className="w-5 h-5 mb-1 opacity-60" />
            <span className="text-sm font-medium">FinPulse v1.0.0</span>
            <span className="text-xs">Smart Money, Smart Deals</span>
          </div>
        </div>
      </div>

      {/* ═══════════════ MODALS ═══════════════════════════════ */}

      {/* ── Profile Modal ──────────────────────────────────── */}
      {activeModal === 'profile' && (
        <ModalOverlay onClose={closeModal}>
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-2"
              style={iconWrapStyle}
            >
              <User size={28} color="#00c8c8" />
            </div>
            <h2 className="text-lg font-bold text-white">Profile Settings</h2>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 font-medium">Name</span>
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-white text-sm outline-none transition-all focus:ring-1 focus:ring-cyan-400"
                style={{ background: '#0d1f2d', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 font-medium">Email</span>
              <input
                type="email"
                value={draftEmail}
                onChange={(e) => setDraftEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-white text-sm outline-none transition-all focus:ring-1 focus:ring-cyan-400"
                style={{ background: '#0d1f2d', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </label>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-gray-300 transition-all hover:brightness-125"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleProfileSave}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #ff4d6d, #c9184a)' }}
            >
              Save
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* ── Student Uses Modal ─────────────────────────────── */}
      {activeModal === 'studentUses' && (
        <ModalOverlay onClose={closeModal}>
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
              style={iconWrapStyle}
            >
              <Phone size={28} color="#00c8c8" />
            </div>
            <h2 className="text-lg font-bold text-white">Student Mode</h2>
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              Student mode is active — tracking student lifestyle expenses
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-300 transition-all hover:brightness-125"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Close
          </button>
        </ModalOverlay>
      )}

      {/* ── Language Modal ─────────────────────────────────── */}
      {activeModal === 'language' && (
        <ModalOverlay onClose={closeModal}>
          <div className="flex flex-col items-center gap-1 mb-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
              style={iconWrapStyle}
            >
              <Globe size={28} color="#00c8c8" />
            </div>
            <h2 className="text-lg font-bold text-white">Select Language</h2>
          </div>
          <div className="flex flex-col gap-2">
            {['English', 'Hindi', 'Gujarati'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:brightness-125"
                style={{
                  background:
                    language === lang ? 'rgba(0,200,200,0.15)' : 'rgba(255,255,255,0.04)',
                  border:
                    language === lang
                      ? '1px solid rgba(0,200,200,0.4)'
                      : '1px solid rgba(255,255,255,0.08)',
                  color: language === lang ? '#00c8c8' : '#94a3b8',
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </ModalOverlay>
      )}

      {/* ── Privacy Settings Modal ─────────────────────────── */}
      {activeModal === 'privacy' && (
        <ModalOverlay onClose={closeModal}>
          <div className="flex flex-col items-center gap-1 mb-1">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
              style={iconWrapStyle}
            >
              <Eye size={28} color="#00c8c8" />
            </div>
            <h2 className="text-lg font-bold text-white">Privacy Settings</h2>
            <p className="text-sm text-gray-400 text-center">
              Manage your privacy and security preferences
            </p>
          </div>

          {/* Biometric Lock row */}
          <div
            className="flex items-center justify-between p-3.5 rounded-xl"
            style={cardStyle}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={iconWrapStyle}
              >
                <Shield size={18} color="#00c8c8" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-white font-semibold text-sm">Biometric Lock</span>
                <span className="text-gray-400 text-xs">
                  {biometricOn ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <ToggleSwitch on={biometricOn} onToggle={() => setBiometricOn(!biometricOn)} />
          </div>

          <button
            onClick={closeModal}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-300 transition-all hover:brightness-125 mt-1"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Close
          </button>
        </ModalOverlay>
      )}

      {/* ── Help Center Modal ──────────────────────────────── */}
      {activeModal === 'helpCenter' && (
        <ModalOverlay onClose={closeModal}>
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
              style={iconWrapStyle}
            >
              <HelpCircle size={28} color="#00c8c8" />
            </div>
            <h2 className="text-lg font-bold text-white">Help Center</h2>
            <p className="text-sm text-gray-400 text-center leading-relaxed">
              Need help? Contact us at{' '}
              <span className="text-cyan-400 font-medium">support@finpulse.com</span>
            </p>
          </div>
          <button
            onClick={closeModal}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-300 transition-all hover:brightness-125"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Close
          </button>
        </ModalOverlay>
      )}

      {/* ── About FinPulse Modal ───────────────────────────── */}
      {activeModal === 'aboutFinPulse' && (
        <ModalOverlay onClose={closeModal}>
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
              style={iconWrapStyle}
            >
              <Info size={28} color="#00c8c8" />
            </div>
            <h2 className="text-lg font-bold text-white">About FinPulse</h2>
            <span className="text-sm text-gray-300">FinPulse v1.0.0</span>
            <span className="text-xs text-gray-500 mt-1">Smart Money, Smart Deals</span>
          </div>
          <button
            onClick={closeModal}
            className="w-full py-2.5 rounded-xl font-semibold text-sm text-gray-300 transition-all hover:brightness-125 mt-1"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Close
          </button>
        </ModalOverlay>
      )}

      {/* ── Logout Confirm Modal ───────────────────────────── */}
      {activeModal === 'logoutConfirm' && (
        <ModalOverlay onClose={closeModal}>
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
              style={{ background: 'rgba(255,77,109,0.12)', border: '1px solid rgba(255,77,109,0.25)' }}
            >
              <LogOut size={28} color="#ff4d6d" />
            </div>
            <h2 className="text-lg font-bold text-white">Logout</h2>
            <p className="text-sm text-gray-400 text-center">
              Are you sure you want to logout?
            </p>
          </div>
          <div className="flex gap-3 mt-1">
            <button
              onClick={closeModal}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-gray-300 transition-all hover:brightness-125"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleLogoutConfirm}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #ff4d6d, #c9184a)' }}
            >
              Logout
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* ── Toast ──────────────────────────────────────────── */}
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
};
