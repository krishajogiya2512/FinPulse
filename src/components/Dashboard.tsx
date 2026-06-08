import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Plus,
  Sparkles,
  Pencil,
  Home,
  Settings,
  Tag,
  ChevronRight,
  X,
} from 'lucide-react';
import finpulseLogo from '../assets/finpulse_logo.png';

/* ─── Types ─────────────────────────────────────────────── */
interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}

type NavTab = 'home' | 'deals' | 'settings';

/* ─── Category colours ──────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  Food:          '#00c8c8',
  Transport:     '#a78bfa',
  Entertainment: '#22c55e',
  Shopping:      '#f59e0b',
  Other:         '#6366f1',
};

/* ─── Static Data ────────────────────────────────────────── */
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, title: 'Lunch at canteen', category: 'Food',          amount: 250, date: '10 Nov' },
  { id: 2, title: 'Metro ride',       category: 'Transport',     amount: 50,  date: '10 Nov' },
  { id: 3, title: 'Movie ticket',     category: 'Entertainment', amount: 120, date: '9 Nov'  },
];

const BUDGET_TOTAL = 5000;

/* ─── Donut helpers (pure SVG) ───────────────────────────── */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polarToCartesian(cx, cy, r, startDeg);
  const e = polarToCartesian(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

interface DonutProps {
  segments: { label: string; pct: number; color: string }[];
  totalSpent: number;
}

const DonutChart: React.FC<DonutProps> = ({ segments, totalSpent }) => {
  const CX = 60, CY = 60, R = 50, STROKE = 18;
  let angle = 0;
  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1e3a4a" strokeWidth={STROKE} />
      {segments.map((seg) => {
        if (seg.pct <= 0) return null;
        const sweep = (seg.pct / 100) * 360;
        const gap   = Math.min(1, sweep * 0.05);
        const path  = arcPath(CX, CY, R, angle, angle + sweep - gap);
        angle += sweep;
        return (
          <path
            key={seg.label}
            d={path}
            fill="none"
            stroke={seg.color}
            strokeWidth={STROKE}
            strokeLinecap="butt"
          />
        );
      })}
      {/* Centre label */}
      <text x={CX} y={CY - 6}  textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
        ₹{totalSpent.toLocaleString()}
      </text>
      <text x={CX} y={CY + 8}  textAnchor="middle" fontSize="7.5" fill="#94a3b8">spent</text>
    </svg>
  );
};

/* ─── Date helper ────────────────────────────────────────── */
function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function formatDateShort(iso: string) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

interface DashboardProps {
  onNavigateToDeals?: () => void;
}

/* ─── Main Dashboard Component ───────────────────────────── */
export const Dashboard: React.FC<DashboardProps> = ({ onNavigateToDeals }) => {
  const [activeNav, setActiveNav]       = useState<NavTab>('home');
  const [editingId, setEditingId]       = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [showModal, setShowModal]       = useState(false);
  const [nextId, setNextId]             = useState(4);

  /* ── Form state ── */
  const [formAmount, setFormAmount]       = useState('');
  const [formCategory, setFormCategory]   = useState('Food');
  const [formDescription, setFormDescription] = useState('');
  const [formDate, setFormDate]           = useState(todayISO());

  /* ── Derived data ── */
  const totalSpent = useMemo(
    () => transactions.reduce((s, t) => s + t.amount, 0),
    [transactions],
  );

  const budgetPct = useMemo(
    () => Math.min(100, Math.round((totalSpent / BUDGET_TOTAL) * 100)),
    [totalSpent],
  );

  const segments = useMemo(() => {
    if (totalSpent === 0) return [];
    const grouped: Record<string, number> = {};
    transactions.forEach((t) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount;
    });
    return Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .map(([label, amt]) => ({
        label,
        pct: Math.round((amt / totalSpent) * 100),
        color: CATEGORY_COLORS[label] || '#6366f1',
      }));
  }, [transactions, totalSpent]);

  /* ── Handlers ── */
  const handleSaveExpense = () => {
    const amt = parseFloat(formAmount);
    if (!amt || amt <= 0 || !formDescription.trim()) return;
    const newTx: Transaction = {
      id: nextId,
      title: formDescription.trim(),
      category: formCategory,
      amount: Math.round(amt * 100) / 100,
      date: formatDateShort(formDate),
    };
    setTransactions((prev) => [newTx, ...prev]);
    setNextId((n) => n + 1);
    setFormAmount('');
    setFormCategory('Food');
    setFormDescription('');
    setFormDate(todayISO());
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setFormAmount('');
    setFormCategory('Food');
    setFormDescription('');
    setFormDate(todayISO());
    setShowModal(true);
  };

  /* ── Animation variants ── */
  const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' as const },
    }),
  };

  /* ─── Shared input style ── */
  const inputStyle: React.CSSProperties = {
    background: '#0d1f2d',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '12px 14px',
    color: '#e2e8f0',
    fontSize: 14,
    fontFamily: "'Outfit', sans-serif",
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  /* ====================================================================
   * RENDER
   * ==================================================================== */
  return (
    <div
      id="dashboard-root"
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
        {/* Top cluster: Home */}
        <div className="flex flex-col items-center gap-2">
          <button
            id="nav-home"
            onClick={() => setActiveNav('home')}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
            style={{ color: activeNav === 'home' ? '#00c8c8' : '#64748b' }}
          >
            <Home size={20} fill={activeNav === 'home' ? '#00c8c8' : 'none'} />
            <span className="text-[10px] font-semibold">Home</span>
          </button>

          {/* Centre + button */}
          <button
            id="nav-add"
            onClick={handleOpenModal}
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
            onClick={() => {
              setActiveNav('deals');
              onNavigateToDeals?.();
            }}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
            style={{ color: activeNav === 'deals' ? '#00c8c8' : '#64748b' }}
          >
            <Tag size={20} fill={activeNav === 'deals' ? '#00c8c8' : 'none'} />
            <span className="text-[10px] font-semibold">Deals</span>
          </button>
        </div>

        {/* Bottom: Settings */}
        <button
          id="nav-settings"
          onClick={() => setActiveNav('settings')}
          className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
          style={{ color: activeNav === 'settings' ? '#00c8c8' : '#64748b' }}
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
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}
              >
                <Wallet size={18} color="#00c8c8" />
              </div>
              <span className="text-sm font-semibold text-slate-300">Total Spending</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={finpulseLogo} alt="FinPulse" className="w-7 h-7 object-contain" />
              <span className="text-sm font-extrabold text-white tracking-wide">FinPulse</span>
            </div>
          </motion.div>

          {/* ─── AMOUNT HERO ─── */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-center py-3"
          >
            <div className="text-6xl font-black text-white tracking-tight">
              ₹{totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400 mt-1 font-medium">November 2025</div>
          </motion.div>

          {/* ─── MONTHLY BUDGET CARD ─── */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            id="monthly-budget-card"
            className="rounded-2xl p-5"
            style={{ background: '#112233', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-white">Monthly Budget</span>
              <span className="text-sm font-bold" style={{ color: '#00c8c8' }}>{budgetPct}%</span>
            </div>

            {/* Progress bar */}
            <div
              className="h-2 rounded-full overflow-hidden mb-3"
              style={{ background: '#1e3a4a' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #00c8c8, #00e5e5)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${budgetPct}%` }}
                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.4 }}
              />
            </div>

            <div className="text-xs text-slate-400 font-medium">
              ₹{totalSpent.toLocaleString()} of ₹{BUDGET_TOTAL.toLocaleString()} used
            </div>
          </motion.div>

          {/* ─── ACTION BUTTONS ─── */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="grid grid-cols-2 gap-3"
          >
            {/* Add Expense */}
            <button
              id="btn-add-expense"
              onClick={handleOpenModal}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #00c8c8, #00a0a0)',
                color: '#0d1f2d',
                boxShadow: '0 4px 20px rgba(0,200,200,0.30)',
              }}
            >
              <Plus size={16} strokeWidth={3} />
              Add Expense
            </button>

            {/* View Deals */}
            <button
              id="btn-view-deals"
              onClick={onNavigateToDeals}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: '#e2e8f0',
              }}
            >
              <Sparkles size={15} />
              View Deals
            </button>
          </motion.div>

          {/* ─── SPENDING BREAKDOWN CARD ─── */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            id="spending-breakdown-card"
            className="rounded-2xl p-5"
            style={{ background: '#112233', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="text-sm font-semibold text-white mb-4">Spending Breakdown</div>

            <div className="flex items-center gap-5">
              {/* Donut chart */}
              <div className="flex-shrink-0">
                <DonutChart segments={segments} totalSpent={totalSpent} />
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-2.5 flex-1">
                {segments.slice(0, 4).map((seg) => (
                  <div key={seg.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: seg.color }} />
                      <span className="text-xs text-slate-300 font-medium">{seg.label}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: seg.color }}>{seg.pct}%</span>
                  </div>
                ))}
                {segments.length > 4 && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#6366f1' }} />
                    <span className="text-xs text-slate-400 font-medium">+{segments.length - 4} more</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* ─── RECENT TRANSACTIONS CARD ─── */}
          <motion.div
            custom={5} variants={fadeUp} initial="hidden" animate="visible"
            id="recent-transactions-card"
            className="rounded-2xl p-5"
            style={{ background: '#112233', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-white">Recent Transactions</span>
              <button className="text-xs font-semibold" style={{ color: '#00c8c8' }}>See all</button>
            </div>

            <div className="flex flex-col gap-3">
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    {/* Category-coloured dot icon */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
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
                      <div className="text-sm font-semibold text-white leading-tight">{tx.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {tx.category} · {tx.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">₹{tx.amount}</span>
                    <button
                      id={`edit-tx-${tx.id}`}
                      onClick={() => setEditingId(editingId === tx.id ? null : tx.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                      aria-label={`Edit ${tx.title}`}
                    >
                      <Pencil size={13} color="#94a3b8" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Edit toast */}
            <AnimatePresence>
              {editingId !== null && (
                <motion.div
                  key="edit-toast"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="mt-3 px-3 py-2 rounded-xl text-xs text-slate-300 font-medium"
                  style={{ background: 'rgba(0,200,200,0.08)', border: '1px solid rgba(0,200,200,0.18)' }}
                >
                  ✏️ Edit mode coming soon for:{' '}
                  <span className="font-bold text-white">
                    {transactions.find((t) => t.id === editingId)?.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── FEATURED DEAL CARD ─── */}
          <motion.div
            custom={6} variants={fadeUp} initial="hidden" animate="visible"
            id="featured-deal-card"
            className="rounded-2xl p-5"
            style={{
              background: 'linear-gradient(135deg, #112233 60%, #0d2a2a)',
              border: '1px solid rgba(0,200,200,0.18)',
            }}
          >
            {/* Label row */}
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={13} color="#00c8c8" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00c8c8' }}>
                Featured Deal
              </span>
            </div>

            {/* Product name */}
            <div className="text-base font-bold text-white mb-0.5">Maggi Noodles Pack</div>
            <div className="text-xs text-slate-400 mb-4 font-medium">Save 17% at D-Mart</div>

            {/* Pricing row */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-slate-500 line-through font-medium">₹144</span>
              <span className="text-xl font-black text-white">₹120</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                Save ₹24
              </span>
            </div>

            {/* CTA */}
            <button
              id="btn-view-all-deals"
              onClick={onNavigateToDeals}
              className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.01] active:scale-95"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(0,200,200,0.4)',
                color: '#00c8c8',
              }}
            >
              View All Deals
              <ChevronRight size={15} />
            </button>
          </motion.div>

        </div>
      </div>

      {/* ═══════════════ ADD EXPENSE MODAL ═══════════════ */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-[100]"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            />

            {/* Modal */}
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="fixed inset-0 z-[101] flex items-center justify-center px-4"
            >
              <div
                id="add-expense-modal"
                className="w-full max-w-md rounded-2xl p-6 relative"
                style={{
                  background: '#112233',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  id="modal-close"
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                  aria-label="Close modal"
                >
                  <X size={18} color="#94a3b8" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,200,200,0.12)', border: '1px solid rgba(0,200,200,0.25)' }}
                  >
                    <Plus size={18} color="#00c8c8" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">Add Expense</div>
                    <div className="text-xs text-slate-400 font-medium">Track a new transaction</div>
                  </div>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4">
                  {/* Amount */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Amount</label>
                    <div className="relative">
                      <span
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold"
                        style={{ color: '#00c8c8' }}
                      >
                        ₹
                      </span>
                      <input
                        id="expense-amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={formAmount}
                        onChange={(e) => setFormAmount(e.target.value)}
                        style={{ ...inputStyle, paddingLeft: 32 }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,200,200,0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Category</label>
                    <select
                      id="expense-category"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,200,200,0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                    >
                      {['Food', 'Transport', 'Entertainment', 'Shopping', 'Other'].map((cat) => (
                        <option key={cat} value={cat} style={{ background: '#0d1f2d', color: '#e2e8f0' }}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Description</label>
                    <input
                      id="expense-description"
                      type="text"
                      placeholder="e.g. Coffee at Starbucks"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,200,200,0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Date</label>
                    <input
                      id="expense-date"
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      style={{ ...inputStyle, colorScheme: 'dark' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,200,200,0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  </div>

                  {/* Save button */}
                  <button
                    id="btn-save-expense"
                    onClick={handleSaveExpense}
                    disabled={!formAmount || parseFloat(formAmount) <= 0 || !formDescription.trim()}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-95 mt-1"
                    style={{
                      background:
                        !formAmount || parseFloat(formAmount) <= 0 || !formDescription.trim()
                          ? 'rgba(0,200,200,0.25)'
                          : 'linear-gradient(135deg, #00c8c8, #00a0a0)',
                      color:
                        !formAmount || parseFloat(formAmount) <= 0 || !formDescription.trim()
                          ? '#0d1f2d80'
                          : '#0d1f2d',
                      boxShadow:
                        !formAmount || parseFloat(formAmount) <= 0 || !formDescription.trim()
                          ? 'none'
                          : '0 4px 20px rgba(0,200,200,0.30)',
                      cursor:
                        !formAmount || parseFloat(formAmount) <= 0 || !formDescription.trim()
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                  >
                    Save Expense
                  </button>

                  {/* Cancel button */}
                  <button
                    id="btn-cancel-expense"
                    onClick={() => setShowModal(false)}
                    className="w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-95"
                    style={{
                      background: 'transparent',
                      border: '1.5px solid rgba(255,255,255,0.12)',
                      color: '#94a3b8',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
