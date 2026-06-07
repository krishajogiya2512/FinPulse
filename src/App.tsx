import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundGlow } from './components/BackgroundGlow';
import { StartupSequence } from './components/StartupSequence';
import { LoginPortal } from './components/LoginPortal';

const App: React.FC = () => {
  const [startupComplete, setStartupComplete] = useState(false);

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
        ) : (
          <motion.div
            key="app-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen flex flex-col items-center justify-between z-10"
          >
            <LoginPortal />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
