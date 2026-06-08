import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundGlow } from './components/BackgroundGlow';
import { StartupSequence } from './components/StartupSequence';
import { LoginPortal } from './components/LoginPortal';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [startupComplete, setStartupComplete] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="relative min-h-screen bg-navy-space text-slate-100 flex flex-col justify-start items-center overflow-x-hidden select-none">
      
      {/* Persistent Background blobs and particle canvas */}
      <BackgroundGlow />

      <AnimatePresence mode="wait">
        {!startupComplete ? (
          <motion.div
            key="startup"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <StartupSequence onComplete={() => setStartupComplete(true)} />
          </motion.div>

        ) : loggedIn ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="w-full min-h-screen z-10"
          >
            <Dashboard />
          </motion.div>

        ) : (
          <motion.div
            key="app-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen flex flex-col items-center justify-between z-10"
          >
            <LoginPortal onLoginSuccess={() => setLoggedIn(true)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
