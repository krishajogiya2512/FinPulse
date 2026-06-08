import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundGlow } from './components/BackgroundGlow';
import { StartupSequence } from './components/StartupSequence';
import { LoginPortal } from './components/LoginPortal';
import { Dashboard } from './components/Dashboard';
import { SmartDeals } from './components/SmartDeals';
import { PriceComparison } from './components/PriceComparison';

const App: React.FC = () => {
  const [startupComplete, setStartupComplete] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'deals' | 'comparison'>('dashboard');

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

        ) : !loggedIn ? (
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

        ) : currentScreen === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full min-h-screen z-10"
          >
            <Dashboard onNavigateToDeals={() => setCurrentScreen('deals')} />
          </motion.div>

        ) : currentScreen === 'deals' ? (
          <motion.div
            key="deals"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full min-h-screen z-10"
          >
            <SmartDeals 
              onNavigateToHome={() => setCurrentScreen('dashboard')} 
              onNavigateToComparison={() => setCurrentScreen('comparison')} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full min-h-screen z-10"
          >
            <PriceComparison 
              onBack={() => setCurrentScreen('deals')} 
              onNavigateToHome={() => setCurrentScreen('dashboard')} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;

