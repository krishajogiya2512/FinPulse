import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import finpulseLogo from '../assets/finpulse_logo.png';


interface StartupSequenceProps {
  onComplete: () => void;
}

export const StartupSequence: React.FC<StartupSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'brand' | 'progress' | 'transition'>('logo');
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');

  // Phase transitions
  useEffect(() => {
    if (phase === 'logo') {
      const timer = setTimeout(() => setPhase('brand'), 1500);
      return () => clearTimeout(timer);
    }
    if (phase === 'brand') {
      const timer = setTimeout(() => setPhase('progress'), 1600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Progress Bar updates
  useEffect(() => {
    if (phase !== 'progress') return;

    const duration = 2800; // 2.8 seconds for loading progress
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      // Loading messages based on progress
      if (currentProgress < 30) {
        setLoadingMessage('Initializing core modules...');
      } else if (currentProgress < 60) {
        setLoadingMessage('Fetching secure financial data...');
      } else if (currentProgress < 85) {
        setLoadingMessage('Optimizing interface details...');
      } else if (currentProgress < 100) {
        setLoadingMessage('Preparing dashboard...');
      } else {
        setLoadingMessage('Ready');
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Pause briefly at 100% for impact, then transition
        setTimeout(() => {
          setPhase('transition');
          // Wait for transition animation to finish before notifying parent
          setTimeout(() => {
            onComplete();
          }, 1000);
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-space select-none overflow-hidden">
      
      {/* Cinematic Blur overlay active only during transition */}
      <AnimatePresence>
        {phase === 'transition' && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-space/30 pointer-events-none z-20"
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center z-10 w-full max-w-sm px-6">
        
        {/* LOGO CONTAINER AND REVEAL */}
        <motion.div
          layout
          initial={{ scale: 0.3, rotateY: 90, opacity: 0 }}
          animate={
            phase === 'transition' 
              ? { scale: 0.85, y: -220, rotateY: 0, opacity: 1 } // Slides up
              : { scale: 1.0, rotateY: 0, opacity: 1 } // Reveals in center
          }
          transition={{
            scale: { type: 'spring', stiffness: 100, damping: 14 },
            rotateY: { duration: 1.2, ease: 'easeOut' },
            y: { type: 'spring', stiffness: 70, damping: 15 },
            opacity: { duration: 0.5 }
          }}
          className="relative mb-6"
        >
          <div className="relative w-16 h-16 bg-cyan-brand rounded-2xl flex items-center justify-center cursor-default p-2">
            <img src={finpulseLogo} alt="FinPulse" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* BRAND INTRODUCTION */}
        <AnimatePresence>
          {phase !== 'transition' && (
            <div className="flex flex-col items-center text-center">
              
              {/* Brand Title */}
              {(phase === 'brand' || phase === 'progress') && (
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-3xl font-extrabold text-white tracking-wide"
                >
                  FinPulse
                </motion.h1>
              )}

              {/* Subtitle / Tagline */}
              {(phase === 'brand' || phase === 'progress') && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                  className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-2"
                >
                  Smart Finance, Better Decisions
                </motion.p>
              )}

              {/* Loading dots / status text */}
              {phase === 'brand' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-1.5 mt-8 items-center"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-brand/80 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand/60 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-brand/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </motion.div>
              )}

              {/* PROGRESS BAR & COUNTER */}
              {phase === 'progress' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4 }}
                  className="w-64 mt-10 space-y-3"
                >
                  {/* Progress numeric percent and text message */}
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-slate-400 font-medium transition-all duration-300">{loadingMessage}</span>
                    <span className="text-cyan-brand font-bold">{progress}%</span>
                  </div>

                  {/* Progress track */}
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    {/* Glowing progress fill */}
                    <motion.div 
                      className="h-full bg-cyan-brand shadow-lg glow-cyan rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
