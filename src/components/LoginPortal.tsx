import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, TrendingUp, Eye, EyeOff, CheckCircle, AlertTriangle, ArrowRight, User, Mail, Lock } from 'lucide-react';
import finpulseLogo from '../assets/finpulse_logo.png';


interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export const LoginPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login/Signup form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleQuickDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;

    setEmail('');
    setPassword('');
    showToast('✦ Autofilling demo credentials...', 'info');

    const demoEmail = 'demo@finpulse.com';
    const demoPassword = 'Password123!';

    let currentEmail = '';
    let currentPassword = '';
    let emailIndex = 0;
    
    // Type email
    const emailInterval = setInterval(() => {
      if (emailIndex < demoEmail.length) {
        currentEmail += demoEmail[emailIndex];
        setEmail(currentEmail);
        emailIndex++;
      } else {
        clearInterval(emailInterval);
        
        // Type password
        let passIndex = 0;
        const passInterval = setInterval(() => {
          if (passIndex < demoPassword.length) {
            currentPassword += demoPassword[passIndex];
            setPassword(currentPassword);
            passIndex++;
          } else {
            clearInterval(passInterval);
            showToast('Demo credentials loaded! Press Login to enter.', 'success');
          }
        }, 50);
      }
    }, 35);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    if (activeTab === 'login') {
      if (!email || !password) {
        showToast('Please enter both email and password.', 'error');
        setLoading(false);
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setLoading(false);
        showToast('Successfully logged in! Launching dashboard...', 'success');
      }, 1800);
    } else {
      if (!name || !email || !password || !confirmPassword) {
        showToast('Please complete all 4 fields.', 'error');
        setLoading(false);
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        showToast('Password should be at least 6 characters.', 'error');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match.', 'error');
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setLoading(false);
        showToast('Account created! Switching to Login portal...', 'success');
        setTimeout(() => {
          setActiveTab('login');
          setPassword('');
          setConfirmPassword('');
        }, 1200);
      }, 1800);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please fill in your email address first.', 'error');
      return;
    }
    showToast(`Password recovery instructions sent to ${email}`, 'success');
  };

  // Card motion variants (Slide up and fade/scale)
  const containerVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring' as const, 
        stiffness: 70, 
        damping: 15,
        delay: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Floating mockup dashboard pill variants (Stripe visual polish)
  const floatLeftVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      y: [0, -10, 0],
      transition: { 
        opacity: { delay: 0.6, duration: 0.5 },
        x: { delay: 0.6, duration: 0.5 },
        scale: { delay: 0.6, duration: 0.5 },
        y: { 
          repeat: Infinity, 
          duration: 6, 
          ease: 'easeInOut' as const 
        } 
      }
    }
  };

  const floatRightVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      y: [0, 10, 0],
      transition: { 
        opacity: { delay: 0.8, duration: 0.5 },
        x: { delay: 0.8, duration: 0.5 },
        scale: { delay: 0.8, duration: 0.5 },
        y: { 
          repeat: Infinity, 
          duration: 5.5, 
          ease: 'easeInOut' as const 
        } 
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-between items-center min-h-screen px-4 py-8 md:p-12 relative z-10">
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl glass-panel ${
              toast.type === 'success' ? 'border-emerald-500/30 text-emerald-300' :
              toast.type === 'error' ? 'border-rose-500/30 text-rose-300' :
              'border-cyan-brand/30 text-cyan-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
            {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
            {toast.type === 'info' && <span className="w-4 h-4 rounded-full border-2 border-t-transparent border-cyan-brand animate-spin flex-shrink-0" />}
            <span className="text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder for alignment (matching startup sequence header) */}
      <div className="h-16 flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 select-none"
        >
          <div className="w-10 h-10 bg-cyan-brand rounded-xl flex items-center justify-center p-1">
            <img src={finpulseLogo} alt="FinPulse" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-xl tracking-wide text-white">FinPulse</span>
        </motion.div>
      </div>

      {/* Main card viewport */}
      <div className="relative w-full max-w-lg my-12 flex justify-center items-center">
        
        {/* Floating Fintech Graphic Left (Stripe style) */}
        <motion.div 
          variants={floatLeftVariants}
          initial="hidden"
          animate="visible"
          className="hidden xl:flex absolute -left-48 top-12 flex-col gap-2 p-4 rounded-2xl glass-card border border-white/10 w-44 shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold tracking-wider uppercase">
            <span>Spend Alert</span>
            <TrendingUp className="w-3 h-3 text-rose-400" />
          </div>
          <span className="text-xs font-semibold text-white">Coffee Shop</span>
          <span className="text-sm font-bold text-rose-400">-$48.20</span>
          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-rose-400 rounded-full w-[80%]" />
          </div>
        </motion.div>

        {/* Floating Fintech Graphic Right (Stripe style) */}
        <motion.div 
          variants={floatRightVariants}
          initial="hidden"
          animate="visible"
          className="hidden xl:flex absolute -right-48 bottom-12 flex-col gap-2.5 p-4 rounded-2xl glass-card border border-white/10 w-44 shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold tracking-wider uppercase">
            <span>Goal Reached</span>
            <Sparkles className="w-3 h-3 text-cyan-brand" />
          </div>
          <span className="text-xs font-semibold text-white">Summer Trip</span>
          <span className="text-sm font-bold text-cyan-brand">+$1,240.00</span>
          <div className="flex gap-1 items-center mt-1">
            <span className="text-[10px] text-slate-400">92% of target budget</span>
          </div>
        </motion.div>

        {/* Core Login/SignUp Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full bg-[#112233]/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top border illumination */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-brand/40 to-transparent" />
          
          <div className="text-center mb-8">
            <motion.h2 
              variants={itemVariants}
              className="text-2xl font-bold text-white tracking-wide"
            >
              {activeTab === 'login' ? 'Welcome to FinPulse' : 'Create Student Account'}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-sm text-slate-400 mt-2"
            >
              {activeTab === 'login' 
                ? 'Sign in to access your customized dashboard' 
                : 'Get started with smart student financial tools'}
            </motion.p>
          </div>

          {/* Switcher Tab (Pill Style) */}
          <motion.div 
            variants={itemVariants}
            className="relative flex bg-slate-950/65 p-1 rounded-full border border-slate-850 mb-8"
          >
            {/* Sliding highlights */}
            <div 
              className="absolute top-1 bottom-1 left-1 rounded-full bg-cyan-brand shadow-lg shadow-cyan-brand/20 transition-all duration-300 ease-out"
              style={{
                width: 'calc(50% - 4px)',
                transform: activeTab === 'login' ? 'translateX(0)' : 'translateX(100%)'
              }}
            />

            <button
              onClick={() => {
                setActiveTab('login');
                setToast(null);
              }}
              className={`w-1/2 py-2.5 text-sm font-semibold rounded-full z-10 transition-all duration-300 text-center cursor-pointer ${
                activeTab === 'login' ? 'text-navy-space' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Login
            </button>

            <button
              onClick={() => {
                setActiveTab('signup');
                setToast(null);
              }}
              className={`w-1/2 py-2.5 text-sm font-semibold rounded-full z-10 transition-all duration-300 text-center cursor-pointer ${
                activeTab === 'signup' ? 'text-navy-space' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign Up
            </button>
          </motion.div>

          {/* Dynamic Form fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'login' ? -15 : 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'login' ? 15 : -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Name field (Sign Up Only) */}
                {activeTab === 'signup' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-4">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Alex Johnson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-brand focus:ring-4 focus:ring-cyan-brand/10 text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-4">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder="alex@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-brand focus:ring-4 focus:ring-cyan-brand/10 text-sm"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Password
                    </label>
                    {activeTab === 'login' && (
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs text-cyan-brand hover:text-cyan-400 hover:underline transition-all cursor-pointer font-semibold"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-brand focus:ring-4 focus:ring-cyan-brand/10 text-sm"
                    />
                    
                    {/* Show/Hide Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field (Sign Up Only) */}
                {activeTab === 'signup' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-4">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-11 pr-5 py-3.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-brand focus:ring-4 focus:ring-cyan-brand/10 text-sm"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 mt-4 rounded-full bg-cyan-brand hover:bg-cyan-hover text-navy-space font-extrabold text-sm transition-all duration-300 shadow-lg shadow-cyan-brand/15 hover:shadow-cyan-brand/35 glow-hover flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 rounded-full border-2 border-t-transparent border-navy-space animate-spin" />
              ) : (
                <>
                  <span>{activeTab === 'login' ? 'Login' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Divider (Login Only) */}
            {activeTab === 'login' &&
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px bg-slate-800 flex-1"></div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">or</span>
                  <div className="h-px bg-slate-800 flex-1"></div>
                </div>

                {/* Quick Demo Login Button */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={handleQuickDemo}
                  className="w-full py-3 rounded-full border border-slate-700/60 hover:border-cyan-brand/40 text-slate-300 hover:text-cyan-brand font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer bg-slate-950/30 hover:bg-slate-950/70"
                >
                  ✦ Quick Demo Login
                </motion.button>
              </motion.div>
            }
          </form>
        </motion.div>
      </div>

      {/* Bottom feature cards row */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-5xl mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Track Spending */}
          <div className="bg-slate-950/45 backdrop-blur-md border border-slate-900 rounded-2xl p-6 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-350 hover:-translate-y-1.5 hover:border-cyan-brand/20 group">
            <div className="p-3 rounded-xl bg-cyan-brand/10 text-cyan-brand mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">Track Spending</h3>
            <p className="text-xs text-slate-450 mt-2 leading-relaxed">
              Log transactions dynamically and receive automated budgeting insights tailored for student accounts.
            </p>
          </div>

          {/* Card 2: Smart Deals */}
          <div className="bg-slate-950/45 backdrop-blur-md border border-slate-900 rounded-2xl p-6 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-350 hover:-translate-y-1.5 hover:border-cyan-brand/20 group">
            <div className="p-3 rounded-xl bg-cyan-brand/10 text-cyan-brand mb-4 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">Smart Deals</h3>
            <p className="text-xs text-slate-450 mt-2 leading-relaxed">
              Gain recommendations and exclusive deals that help optimize food, textbook, and tech subscriptions.
            </p>
          </div>

          {/* Card 3: Secure */}
          <div className="bg-slate-950/45 backdrop-blur-md border border-slate-900 rounded-2xl p-6 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-350 hover:-translate-y-1.5 hover:border-cyan-brand/20 group">
            <div className="p-3 rounded-xl bg-cyan-brand/10 text-cyan-brand mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">Secure Hashing</h3>
            <p className="text-xs text-slate-450 mt-2 leading-relaxed">
              Experience secure bank-grade details protecting balances and private transaction histories.
            </p>
          </div>

        </div>
      </motion.div>

      {/* Made with ❤ for Students Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
        className="w-full text-center mt-12 py-4 border-t border-slate-900/60 text-xs text-slate-500 font-bold flex items-center justify-center gap-1 select-none"
      >
        Made with <span className="text-rose-500 animate-pulse text-sm">❤</span> for Students
      </motion.footer>

    </div>
  );
};
