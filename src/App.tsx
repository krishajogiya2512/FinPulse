import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundGlow } from './components/BackgroundGlow';
import { StartupSequence } from './components/StartupSequence';
import { LoginPortal } from './components/LoginPortal';
import { Dashboard } from './components/Dashboard';
import { SmartDeals } from './components/SmartDeals';
import { PriceComparison } from './components/PriceComparison';
import { SpendingSummary } from './components/SpendingSummary';
import { Settings } from './components/Settings';
import type { Transaction } from './types';

/* ─── Seed data ─────────────────────────────────────────── */
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, title: 'Grocery Shopping', category: 'Food',          amount: 450, date: '8 Jun' },
  { id: 2, title: 'Uber Ride',        category: 'Transport',     amount: 120, date: '7 Jun' },
  { id: 3, title: 'Netflix',          category: 'Entertainment', amount: 150, date: '5 Jun' },
];

type Screen = 'dashboard' | 'deals' | 'comparison' | 'spending-summary' | 'settings';

const App: React.FC = () => {
  const [startupComplete,  setStartupComplete]  = useState(false);
  const [loggedIn,         setLoggedIn]          = useState(false);
  const [currentScreen,    setCurrentScreen]     = useState<Screen>('dashboard');
  const [transactions,     setTransactions]      = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [nextId,           setNextId]            = useState(INITIAL_TRANSACTIONS.length + 1);

  return (
    <div className="relative min-h-screen bg-navy-space text-slate-100 flex flex-col justify-start items-center overflow-x-hidden select-none">

      {/* Persistent background blobs + particle canvas */}
      <BackgroundGlow />

      <AnimatePresence mode="wait">
        {/* ── Startup sequence ───────────────────────────────── */}
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

        /* ── Login ──────────────────────────────────────────── */
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

        /* ── Dashboard ──────────────────────────────────────── */
        ) : currentScreen === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full min-h-screen z-10"
          >
            <Dashboard
              transactions={transactions}
              setTransactions={setTransactions}
              nextId={nextId}
              setNextId={setNextId}
              onNavigateToDeals={() => setCurrentScreen('deals')}
              onNavigateToSpendingSummary={() => setCurrentScreen('spending-summary')}
              onNavigateToSettings={() => setCurrentScreen('settings')}
            />
          </motion.div>

        /* ── Smart Deals ────────────────────────────────────── */
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
              onNavigateToSettings={() => setCurrentScreen('settings')}
            />
          </motion.div>

        /* ── Price Comparison ───────────────────────────────── */
        ) : currentScreen === 'comparison' ? (
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

        /* ── Spending Summary ───────────────────────────────── */
        ) : currentScreen === 'spending-summary' ? (
          <motion.div
            key="spending-summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full min-h-screen z-10"
          >
            <SpendingSummary
              transactions={transactions}
              setTransactions={setTransactions}
              onBack={() => setCurrentScreen('dashboard')}
              onNavigateToHome={() => setCurrentScreen('dashboard')}
              onNavigateToDeals={() => setCurrentScreen('deals')}
              onNavigateToSettings={() => setCurrentScreen('settings')}
            />
          </motion.div>

        /* ── Settings ──────────────────────────────────────── */
        ) : currentScreen === 'settings' ? (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full min-h-screen z-10"
          >
            <Settings
              onBack={() => setCurrentScreen('dashboard')}
              onLogout={() => { setLoggedIn(false); setCurrentScreen('dashboard'); }}
            />
          </motion.div>

        ) : null }
      </AnimatePresence>

    </div>
  );
};

export default App;
