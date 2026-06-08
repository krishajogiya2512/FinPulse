import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, MapPin, Home, Plus, Tag, Settings } from 'lucide-react';
import finpulseLogo from '../assets/finpulse_logo.png';

interface PriceComparisonProps {
  onBack?: () => void;
  onNavigateToHome?: () => void;
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({ onBack, onNavigateToHome }) => {
  return (
    <div
      id="price-comparison-root"
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
            onClick={onNavigateToHome}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200 text-[#64748b] hover:text-[#00c8c8]"
          >
            <Home size={20} />
            <span className="text-[10px] font-semibold">Home</span>
          </button>

          {/* Centre + button */}
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
            onClick={onBack}
            className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all duration-200"
            style={{ color: '#00c8c8' }}
          >
            <Tag size={20} fill="#00c8c8" />
            <span className="text-[10px] font-semibold">Deals</span>
          </button>
        </div>

        {/* Bottom: Settings */}
        <button
          id="nav-settings"
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
                Price Comparison
              </h1>
              <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                Compare prices across stores
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

        {/* ─── BEST DEAL TOTAL CARD ─── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-5 rounded-2xl bg-[#112233] border border-white/5 flex flex-col gap-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <span className="text-sm">🏆</span>
              <span>Best Deal Total</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400">
              1 item
            </span>
          </div>
          
          <div className="text-4xl font-black text-white mt-1">
            ₹399
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl w-fit mt-1">
            <span className="text-sm">↘</span>
            <span>You'll save ₹600 by shopping smart!</span>
          </div>
        </motion.div>

        {/* ─── COMPARE PRICES SECTION ─── */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between mt-1">
            <h2 className="text-xs font-extrabold text-white tracking-wide uppercase">
              Compare Prices
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-[#00c8c8] border border-cyan-500/20 tracking-wider uppercase">
              1 product
            </span>
          </div>

          {/* Product card */}
          <div className="p-4 rounded-2xl bg-[#112233] border border-white/5 flex gap-3.5 items-start">
            <div className="w-12 h-12 rounded-xl bg-[#0d1f2d] border border-white/5 flex items-center justify-center text-2xl flex-shrink-0">
              🎧
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-extrabold text-white leading-tight">
                boAt Bassheads 100 Earphones
              </h3>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                boAt • Electronics
              </p>
              
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-300">
                  <span className="text-amber-400">★</span>
                  <span>4.3</span>
                  <span className="text-slate-500 font-normal">
                    (34,521)
                  </span>
                </div>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 tracking-wider">
                  Save up to ₹600
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">
            Available at 3 stores:
          </p>

          {/* Store Comparison Cards */}
          <div className="flex flex-col gap-3">
            {/* Amazon Card */}
            <motion.a
              href="https://www.amazon.in/boAt-Bassheads-100-Ear-Earphones/dp/B07HGGFGQ9"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-slate-900/40 border-2 border-emerald-500/40 relative flex flex-col gap-2 hover:bg-emerald-950/30 transition-all group"
            >
              {/* Best Price badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 tracking-wider uppercase">
                  ✦ Best Price
                </span>
                <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Store title & status */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span className="text-sm font-extrabold text-white">Amazon</span>
                <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                  Online
                </span>
              </div>

              {/* Specs & delivery */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-0.5">
                <div className="flex items-center gap-0.5">
                  <span className="text-amber-400">★</span>
                  <span className="font-bold">4.3</span>
                </div>
                <span className="text-slate-600">•</span>
                <span>1-2 days delivery</span>
              </div>

              {/* Pricing details */}
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs text-slate-500 line-through font-bold">₹999</span>
                <span className="text-[9px] font-extrabold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15">-60%</span>
                <span className="text-lg font-black text-emerald-400">₹399</span>
              </div>
            </motion.a>

            {/* Flipkart Card */}
            <motion.a
              href="https://www.flipkart.com/boat-bassheads-100-wired-headset/p/itm6e3fd5b624e2b"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 rounded-2xl bg-[#112233] border border-white/5 relative flex flex-col gap-2 hover:bg-white/[0.04] transition-all group"
            >
              {/* Arrow right */}
              <div className="absolute top-4 right-4">
                <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Store title & status */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                </div>
                <span className="text-sm font-extrabold text-white">Flipkart</span>
                <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                  Online
                </span>
              </div>

              {/* Specs & delivery */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-0.5">
                <div className="flex items-center gap-0.5">
                  <span className="text-amber-400">★</span>
                  <span className="font-bold">4.2</span>
                </div>
                <span className="text-slate-600">•</span>
                <span>2-3 days delivery</span>
              </div>

              {/* Pricing details */}
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs text-slate-500 line-through font-bold">₹999</span>
                <span className="text-[9px] font-extrabold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15">-57%</span>
                <span className="text-lg font-black text-white">₹425</span>
                <span className="text-[9px] font-extrabold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15 ml-auto">
                  +₹26 more
                </span>
              </div>
            </motion.a>

            {/* Croma Card */}
            <motion.a
              href="https://www.croma.com/boat-bassheads-100-in-ear-wired-earphones-with-mic-blue-/p/239578"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-2xl bg-[#112233] border border-white/5 relative flex flex-col gap-2 hover:bg-white/[0.04] transition-all group"
            >
              {/* Arrow right */}
              <div className="absolute top-4 right-4">
                <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Store title & status */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <MapPin size={10} />
                </div>
                <span className="text-sm font-extrabold text-white">Croma</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  2.0 km
                </span>
              </div>

              {/* Specs & delivery */}
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mt-0.5">
                <div className="flex items-center gap-0.5">
                  <span className="text-amber-400">★</span>
                  <span className="font-bold">4.1</span>
                </div>
                <span className="text-slate-600">•</span>
                <span>Available Today</span>
              </div>

              {/* Pricing details */}
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs text-slate-500 line-through font-bold">₹999</span>
                <span className="text-[9px] font-extrabold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15">-50%</span>
                <span className="text-lg font-black text-white">₹499</span>
                <span className="text-[9px] font-extrabold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/15 ml-auto">
                  +₹100 more
                </span>
              </div>
            </motion.a>
          </div>

          {/* Description Pill */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400 font-semibold mt-1">
            "In-ear wired earphones with mic, HD sound"
          </div>
        </div>

        {/* ─── SHOPPING SUMMARY CARD ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex flex-col gap-4 relative overflow-hidden shadow-xl shadow-emerald-950/20"
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h3 className="text-xs font-extrabold uppercase tracking-wider">
              Shopping Summary
            </h3>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/20 py-3.5">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wide">
                Total Items
              </span>
              <span className="text-xl font-black mt-0.5">1</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wide">
                Best Price Total
              </span>
              <span className="text-xl font-black mt-0.5">₹399</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wide">
              Total Savings
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-300">₹600</span>
              <span className="text-[10px] font-bold text-emerald-100">
                vs highest prices
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-1">
            <button
              onClick={() => alert('Opening Google Maps for Croma Store (2.0 km)...')}
              className="w-full py-3 rounded-xl border border-white/30 hover:bg-white/10 active:scale-[0.98] transition-all text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>📍</span>
              Get Directions to Best Shops
            </button>
            <button
              onClick={() => alert('Opening delivery details for Amazon & Flipkart...')}
              className="w-full py-3 rounded-xl border border-white/30 hover:bg-white/10 active:scale-[0.98] transition-all text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>📦</span>
              View Online Delivery Options
            </button>
          </div>
        </motion.div>

      </div>
      </div>
    </div>
  );
};
