import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Pencil,
  Home,
  Plus,
  Tag,
  Settings,
  Bell,
} from 'lucide-react';
import finpulseLogo from '../assets/finpulse_logo.png';
import type { Transaction } from '../types';

interface SpendingSummaryProps {
  onBack?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToDeals?: () => void;
  onNavigateToSettings?: () => void;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: '#00c8c8',
  Entertainment: '#22c55e',
  Shopping: '#f59e0b',
  Transport: '#0ea5e9',
  Other: '#6366f1',
};

const CATEGORY_BUDGETS: Record<string, number> = {
  Food: 1500,
  Entertainment: 600,
  Shopping: 1000,
  Transport: 800,
  Other: 500,
};

const BUDGET_TOTAL = 5000;

export const SpendingSummary: React.FC<SpendingSummaryProps> = ({
  onBack,
  onNavigateToHome,
  onNavigateToDeals,
  onNavigateToSettings,
  transactions,
}) => {
  const [editingTxId, setEditingTxId] = useState<number | null>(null);

  /* Derive calculations */
  const totalSpent = useMemo(() => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  const budgetPct = useMemo(() => {
    return Math.min(100, Math.round((totalSpent / BUDGET_TOTAL) * 100));
  }, [totalSpent]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {
      Food: 0,
      Entertainment: 0,
      Shopping: 0,
      Transport: 0,
      Other: 0,
    };
    transactions.forEach((tx) => {
      const cat = tx.category in totals ? tx.category : 'Other';
      totals[cat] += tx.amount;
    });
    return totals;
  }, [transactions]);

  return (
    <div
      id="spending-summary-root"
      className="relative min-h-screen w-full flex"
      style={{ background: '#0d1f2d', fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
      <nav
        id="sidebar-nav"
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
        {/* Top cluster */}
        <div className="flex flex-col items-center gap-2">
          <button
            id="nav-home"
            onClick={onNavigateToHome}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200 text-[#64748b] hover:text-[#00c8c8]"
          >
            <Home size={20} />
            <span className="text-[10px] font-semibold">Home</span>
          </button>

          {/* Plus Button */}
          <button
            id="nav-add"
            onClick={onNavigateToHome}
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 my-1"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 20px rgba(59,130,246,0.5)',
            }}
          >
            <Plus size={20} color="#ffffff" strokeWidth={2.5} />
          </button>

          {/* Deals */}
          <button
            id="nav-deals"
            onClick={onNavigateToDeals}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200 text-[#64748b] hover:text-[#00c8c8]"
          >
            <Tag size={20} />
            <span className="text-[10px] font-semibold">Deals</span>
          </button>
        </div>

        {/* Settings */}
        <button
          id="nav-settings"
          onClick={() => onNavigateToSettings?.()}
          className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200 text-[#64748b] hover:text-[#00c8c8]"
        >
          <Settings size={20} />
          <span className="text-[10px] font-semibold">Settings</span>
        </button>
      </nav>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <div
        className="flex-1 flex flex-col items-center overflow-y-auto min-h-screen"
        style={{ marginLeft: 72 }}
      >
        <div className="w-full max-w-md mx-auto flex flex-col gap-4 px-4 pt-5 pb-10">
          
          {/* ─── HEADER ─── */}
          <div className="flex items-start justify-between mt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Go back"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-base font-extrabold text-white tracking-tight">
                  Spending Summary
                </h1>
                <p className="text-[11px] font-semibold text-[#00c8c8] mt-0.5">
                  November 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={finpulseLogo} alt="FinPulse" className="w-7 h-7 object-contain" />
              <span className="text-sm font-extrabold text-white tracking-wide">
                FinPulse
              </span>
            </div>
          </div>

          {/* ─── TOTAL SPENDING CARD ─── */}
          <div
            className="p-5 rounded-2xl bg-[#112233] border border-white/5 flex flex-col gap-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Spending
              </span>
              <button 
                onClick={() => alert("Expense editing coming soon!")}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
                aria-label="Edit spending"
              >
                <Pencil size={13} />
              </button>
            </div>
            
            <div className="text-4xl font-black text-white">
              ₹{totalSpent.toLocaleString()}
            </div>

            <div className="border-t border-white/5 pt-3 mt-1 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Budget Progress</span>
                <span className="font-extrabold text-[#00c8c8]">{budgetPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#00c8c8] transition-all duration-500"
                  style={{ width: `${budgetPct}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 font-bold mt-0.5">
                ₹{totalSpent.toLocaleString()} of ₹{BUDGET_TOTAL.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ─── SPENDING BY CATEGORY (CHART) ─── */}
          <div className="p-5 rounded-2xl bg-[#112233] border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Bell size={13} />
              <span>Spending by Category</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="flex gap-4 items-end justify-center py-4 bg-slate-950/20 rounded-xl border border-white/5 p-4 mt-1">
              <div className="flex flex-col justify-between h-[120px] text-[9px] text-slate-500 font-extrabold pr-2 border-r border-white/5 pb-4">
                <span>400</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>
              <div className="flex-1 flex justify-around items-end h-[120px]">
                {[
                  { label: 'Food', val: categoryTotals.Food, col: '#00c8c8' },
                  { label: 'Ent.', val: categoryTotals.Entertainment, col: '#22c55e' },
                  { label: 'Shop.', val: categoryTotals.Shopping, col: '#f59e0b' },
                  { label: 'Trans.', val: categoryTotals.Transport, col: '#0ea5e9' },
                ].map((item) => {
                  const percent = Math.min(100, (item.val / 450) * 100); // Scale relative to Food (450)
                  const heightVal = `${(percent / 100) * 90}px`;
                  return (
                    <div key={item.label} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1 py-0.5 rounded border border-white/10 absolute -translate-y-8 shadow-md">
                        ₹{item.val}
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: heightVal }}
                        transition={{ duration: 0.6 }}
                        className="w-7 rounded-t-md"
                        style={{
                          background: `linear-gradient(180deg, ${item.col}, ${item.col}40)`,
                          boxShadow: `0 0 10px ${item.col}10`,
                        }}
                      />
                      <span className="text-[9px] text-slate-400 font-bold">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── CATEGORY BREAKDOWN LIST ─── */}
          <div className="p-5 rounded-2xl bg-[#112233] border border-white/5 flex flex-col gap-3">
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Category Breakdown
            </h2>

            <div className="flex flex-col gap-4 mt-1">
              {[
                { name: 'Food', spent: categoryTotals.Food, budget: CATEGORY_BUDGETS.Food, col: '#00c8c8' },
                { name: 'Entertainment', spent: categoryTotals.Entertainment, budget: CATEGORY_BUDGETS.Entertainment, col: '#22c55e' },
                { name: 'Shopping', spent: categoryTotals.Shopping, budget: CATEGORY_BUDGETS.Shopping, col: '#f59e0b' },
                { name: 'Transport', spent: categoryTotals.Transport, budget: CATEGORY_BUDGETS.Transport, col: '#0ea5e9' },
              ].map((cat) => {
                const percent = Math.min(100, Math.round((cat.spent / cat.budget) * 100));
                return (
                  <div key={cat.name} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.col }} />
                        <span className="text-xs font-extrabold text-white">{cat.name}</span>
                      </div>
                      <div className="flex items-baseline gap-1 text-[10px] text-slate-400 font-bold">
                        <span className="text-white text-xs font-black">₹{cat.spent}</span>
                        <span>of ₹{cat.budget}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-950 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${percent}%`, background: cat.col }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 w-8 text-right">
                        {percent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── SMART INSIGHTS ─── */}
          <div className="p-5 rounded-2xl bg-[#112233] border border-white/5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span>💡</span>
              <span>Smart Insights</span>
            </div>
            
            <div className="flex flex-col gap-2.5 mt-1">
              {/* Insight 1 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  🎯
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider leading-none">
                    Shopping Tip
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-semibold leading-relaxed">
                    Use the Deals section to compare prices and save more on your purchases!
                  </p>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                  ✅
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider leading-none">
                    Great job!
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-semibold leading-relaxed">
                    You're under budget in some categories. Keep up the good work!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── ALL EXPENSES LIST ─── */}
          <div className="p-5 rounded-2xl bg-[#112233] border border-white/5 flex flex-col gap-3">
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              All Expenses
            </h2>

            <div className="flex flex-col gap-3 mt-1">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${CATEGORY_COLORS[tx.category] || '#6366f1'}18`,
                        border: `1px solid ${CATEGORY_COLORS[tx.category] || '#6366f1'}33`,
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: CATEGORY_COLORS[tx.category] || '#6366f1' }}
                      />
                    </div>

                    <div>
                      <div className="text-xs font-extrabold text-white leading-tight">
                        {tx.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                        {tx.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-white">₹{tx.amount}</div>
                      <div className="text-[9px] text-slate-500 font-semibold mt-0.5">
                        {tx.date}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setEditingTxId(editingTxId === tx.id ? null : tx.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg bg-white/5"
                      aria-label="Edit expense"
                    >
                      <Pencil size={11} className="text-slate-500 hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editingTxId !== null && (
              <div
                className="mt-3 px-3 py-2 rounded-xl text-[11px] text-slate-300 font-semibold"
                style={{ background: 'rgba(0,200,200,0.08)', border: '1px solid rgba(0,200,200,0.18)' }}
              >
                ✏️ Edit mode coming soon for expense ID: {editingTxId}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
