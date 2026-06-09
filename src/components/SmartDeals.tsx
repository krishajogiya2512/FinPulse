import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Search,
  MapPin,
  TrendingDown,
  Tag,
  ArrowRight,
  Home,
  Plus,
  Settings,
  SlidersHorizontal,
  ExternalLink,
  X,
  Compass,
} from 'lucide-react';
import finpulseLogo from '../assets/finpulse_logo.png';

/* ─── Types ─────────────────────────────────────────────── */
interface Product {
  id: string;
  name: string;
  brand: string;
  rating: number;
  reviews: string;
  description: string;
  platform: 'Amazon' | 'BigBasket';
  deliveryTime: string;
  originalPrice: number;
  discountedPrice: number;
  saveAmount: number;
  discountPct: number;
  shopsCount: number;
  emoji: string;
  category: 'Food' | 'Stationery';
  tags: string[];
}

interface ShopOffer {
  shop: string;
  price: number;
  delivery: string;
  url: string;
}

interface SmartDealsProps {
  onNavigateToHome?: () => void;
  onNavigateToComparison?: () => void;
  onNavigateToSettings?: () => void;
}



/* ─── Static Product Data ────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: 'boat-earphones',
    name: 'boAt Bassheads 100 Earphones',
    brand: 'boAt',
    rating: 4.3,
    reviews: '34,521',
    description: 'In-ear wired earphones with mic, HD sound',
    platform: 'Amazon',
    deliveryTime: '1-2 days',
    originalPrice: 999,
    discountedPrice: 399,
    saveAmount: 600,
    discountPct: 60,
    shopsCount: 3,
    emoji: '🎧',
    category: 'Stationery',
    tags: ['Trending', 'Popular'],
  },
  {
    id: 'let-us-c',
    name: 'Let Us C by Yashavant...',
    brand: 'BPB Publications',
    rating: 4.7,
    reviews: '12,453',
    description: 'Best book to learn C programming',
    platform: 'Amazon',
    deliveryTime: '2-3 days',
    originalPrice: 550,
    discountedPrice: 365,
    saveAmount: 185,
    discountPct: 34,
    shopsCount: 3,
    emoji: '📚',
    category: 'Stationery',
    tags: ['Trending', 'Popular'],
  },
  {
    id: 'sandisk-pendrive',
    name: 'SanDisk USB 3.0 Pendrive (32GB)',
    brand: 'SanDisk',
    rating: 4.6,
    reviews: '12,453',
    description: 'Ultra fast transfer speed, compact design',
    platform: 'Amazon',
    deliveryTime: '1-2 days',
    originalPrice: 599,
    discountedPrice: 399,
    saveAmount: 200,
    discountPct: 33,
    shopsCount: 4,
    emoji: '💾',
    category: 'Stationery',
    tags: ['Trending', 'Popular'],
  },
  {
    id: 'eng-maths',
    name: 'Engineering Mathematics by...',
    brand: 'Khanna Publishers',
    rating: 4.6,
    reviews: '8,934',
    description: 'Complete guide for engineering students',
    platform: 'Amazon',
    deliveryTime: '2-3 days',
    originalPrice: 695,
    discountedPrice: 475,
    saveAmount: 220,
    discountPct: 32,
    shopsCount: 4,
    emoji: '📘',
    category: 'Stationery',
    tags: ['Trending', 'Popular'],
  },
  {
    id: 'lays-chips',
    name: "Lay's Chips Family Pack...",
    brand: 'Lays',
    rating: 4.4,
    reviews: '3,214',
    description: 'Classic salted, crispy and delicious',
    platform: 'Amazon',
    deliveryTime: '1-2 days',
    originalPrice: 140,
    discountedPrice: 105,
    saveAmount: 35,
    discountPct: 25,
    shopsCount: 4,
    emoji: '🍿',
    category: 'Food',
    tags: ['Trending', 'Popular'],
  },
  {
    id: 'oreo-cookies',
    name: 'Oreo Chocolate Cookies (300g)',
    brand: 'Oreo',
    rating: 4.6,
    reviews: '5,621',
    description: 'Twist, lick, dunk - classic cookies',
    platform: 'BigBasket',
    deliveryTime: 'Same Day',
    originalPrice: 100,
    discountedPrice: 75,
    saveAmount: 25,
    discountPct: 25,
    shopsCount: 4,
    emoji: '🍪',
    category: 'Food',
    tags: ['Trending', 'Popular'],
  },
  {
    id: 'casio-calculator',
    name: 'Casio FX-991EX Scientific...',
    brand: 'Casio',
    rating: 4.8,
    reviews: '5,621',
    description: '552 functions, approved for exams',
    platform: 'Amazon',
    deliveryTime: '1-2 days',
    originalPrice: 1695,
    discountedPrice: 1299,
    saveAmount: 396,
    discountPct: 23,
    shopsCount: 4,
    emoji: '🧮',
    category: 'Stationery',
    tags: ['Trending', 'Popular'],
  },
  {
    id: 'red-bull',
    name: 'Red Bull Energy Drink (250ml x 6)',
    brand: 'Red Bull',
    rating: 4.5,
    reviews: '3,421',
    description: 'Wings when you need them most',
    platform: 'Amazon',
    deliveryTime: '1-2 days',
    originalPrice: 750,
    discountedPrice: 595,
    saveAmount: 155,
    discountPct: 21,
    shopsCount: 4,
    emoji: '⚡',
    category: 'Food',
    tags: ['Trending', 'Popular'],
  },
];

/* ─── Mock Comparison Shop Offers ───────────────────────── */
const SHOP_OFFERS: Record<string, ShopOffer[]> = {
  'boat-earphones': [
    { shop: 'Amazon', price: 399, delivery: '1-2 days', url: 'https://www.amazon.in' },
    { shop: 'Flipkart', price: 449, delivery: '2-3 days', url: 'https://www.flipkart.com' },
    { shop: 'Reliance Digital', price: 499, delivery: '3-4 days', url: 'https://www.reliancedigital.in' },
  ],
  'let-us-c': [
    { shop: 'Amazon', price: 365, delivery: '2-3 days', url: 'https://www.amazon.in' },
    { shop: 'Flipkart', price: 395, delivery: '3-5 days', url: 'https://www.flipkart.com' },
    { shop: 'BPB Online', price: 420, delivery: '4-6 days', url: 'https://bpbonline.com' },
  ],
  'sandisk-pendrive': [
    { shop: 'Amazon', price: 399, delivery: '1-2 days', url: 'https://www.amazon.in' },
    { shop: 'Flipkart', price: 419, delivery: '2-3 days', url: 'https://www.flipkart.com' },
    { shop: 'Croma', price: 449, delivery: 'Same Day', url: 'https://www.croma.com' },
    { shop: 'Reliance Digital', price: 479, delivery: '2-4 days', url: 'https://www.reliancedigital.in' },
  ],
  'eng-maths': [
    { shop: 'Amazon', price: 475, delivery: '2-3 days', url: 'https://www.amazon.in' },
    { shop: 'Flipkart', price: 499, delivery: '3-5 days', url: 'https://www.flipkart.com' },
    { shop: 'Pragati Book Store', price: 520, delivery: '4-7 days', url: 'https://www.pragatibook.com' },
    { shop: 'Khanna Publishers', price: 550, delivery: '5-8 days', url: 'http://khannapublishers.in' },
  ],
  'lays-chips': [
    { shop: 'Amazon', price: 105, delivery: '1-2 days', url: 'https://www.amazon.in' },
    { shop: 'BigBasket', price: 110, delivery: 'Same Day', url: 'https://www.bigbasket.com' },
    { shop: 'Blinkit', price: 115, delivery: '10 mins', url: 'https://blinkit.com' },
    { shop: 'Flipkart Grocery', price: 108, delivery: 'Next Day', url: 'https://www.flipkart.com' },
  ],
  'oreo-cookies': [
    { shop: 'BigBasket', price: 75, delivery: 'Same Day', url: 'https://www.bigbasket.com' },
    { shop: 'Blinkit', price: 80, delivery: '10 mins', url: 'https://blinkit.com' },
    { shop: 'Zepto', price: 80, delivery: '8 mins', url: 'https://www.zeptonow.com' },
    { shop: 'Amazon Pantry', price: 78, delivery: '1-2 days', url: 'https://www.amazon.in' },
  ],
  'casio-calculator': [
    { shop: 'Amazon', price: 1299, delivery: '1-2 days', url: 'https://www.amazon.in' },
    { shop: 'Flipkart', price: 1349, delivery: '2-3 days', url: 'https://www.flipkart.com' },
    { shop: 'Croma', price: 1399, delivery: 'Same Day', url: 'https://www.croma.com' },
    { shop: 'Casio India', price: 1450, delivery: '3-5 days', url: 'https://www.casioindiabyte.com' },
  ],
  'red-bull': [
    { shop: 'Amazon', price: 595, delivery: '1-2 days', url: 'https://www.amazon.in' },
    { shop: 'BigBasket', price: 620, delivery: 'Same Day', url: 'https://www.bigbasket.com' },
    { shop: 'Blinkit', price: 650, delivery: '12 mins', url: 'https://blinkit.com' },
    { shop: 'Zepto', price: 645, delivery: '10 mins', url: 'https://www.zeptonow.com' },
  ],
};

/* ─── Platform Card Configs ──────────────────────────────── */
const PLATFORMS = [
  {
    name: 'Amazon',
    subtitle: 'Fast delivery & deals',
    url: 'https://www.amazon.in',
    arrowColor: 'text-slate-400',
  },
  {
    name: 'Flipkart',
    subtitle: 'Best offers & discounts',
    url: 'https://www.flipkart.com',
    arrowColor: 'text-cyan-400',
  },
  {
    name: 'BigBasket',
    subtitle: 'Fresh groceries online',
    url: 'https://www.bigbasket.com',
    arrowColor: 'text-slate-400',
  },
  {
    name: 'Myntra',
    subtitle: 'Fashion & lifestyle',
    url: 'https://www.myntra.com',
    arrowColor: 'text-rose-400',
  },
];



export const SmartDeals: React.FC<SmartDealsProps> = ({ onNavigateToHome, onNavigateToComparison, onNavigateToSettings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Food' | 'Stationery'>('All');
  const [sortOption, setSortOption] = useState<'Best Match' | 'Discount %' | 'Price: Low to High' | 'Price: High to Low' | 'Rating'>('Best Match');
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  /* Compare modal state */
  const [compareProduct, setCompareProduct] = useState<Product | null>(null);

  /* Tab options */
  const tabs = [
    { id: 'All', label: 'All (30)', emoji: '🛍️' },
    { id: 'Food', label: 'Food (8)', emoji: '🍔' },
    { id: 'Stationery', label: 'Stationery (7)', emoji: '✏️' },
  ] as const;

  /* Filter and Sort logic */
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // 1. Category Filter
    if (activeTab === 'Food') {
      list = list.filter((p) => p.category === 'Food');
    } else if (activeTab === 'Stationery') {
      list = list.filter((p) => p.category === 'Stationery');
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    if (sortOption === 'Discount %') {
      list.sort((a, b) => b.discountPct - a.discountPct);
    } else if (sortOption === 'Price: Low to High') {
      list.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortOption === 'Price: High to Low') {
      list.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sortOption === 'Rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeTab, searchQuery, sortOption]);

  /* Entry animation keyframes styling helper */
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    }),
  };

  return (
    <div
      id="smart-deals-root"
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
          <div>
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(0,200,200,0.12)',
                  border: '1px solid rgba(0,200,200,0.25)',
                }}
              >
                <Sparkles size={18} color="#00c8c8" />
              </div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Smart Deals
              </h1>
            </div>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              Compare prices & save more
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src={finpulseLogo} alt="FinPulse" className="w-7 h-7 object-contain" />
            <span className="text-sm font-extrabold text-white tracking-wide">
              FinPulse
            </span>
          </div>
        </div>

        {/* ─── SEARCH BAR ─── */}
        <div className="relative w-full">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#112233] border border-white/[0.08] rounded-2xl py-3.5 pl-11 pr-10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* ─── CATEGORY FILTER TABS ─── */}
        <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none -mx-4 px-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 relative ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 shadow-[0_0_15px_rgba(0,200,200,0.12)]'
                    : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#00c8c8] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ─── RESULTS BAR & SORT ─── */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-slate-400 font-bold tracking-wide">
            {filteredProducts.length} products
          </span>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs font-bold text-slate-300 hover:bg-white/10 active:scale-95 transition-all"
            >
              <SlidersHorizontal size={12} className="text-slate-400" />
              <span>Sort: {sortOption}</span>
            </button>
            
            <AnimatePresence>
              {showSortMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowSortMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-1.5 w-44 rounded-xl bg-slate-900 border border-white/10 p-1.5 shadow-2xl z-50 overflow-hidden"
                  >
                    {(['Best Match', 'Discount %', 'Price: Low to High', 'Price: High to Low', 'Rating'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortOption(opt);
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          sortOption === opt
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── TRENDING BANNER CARD ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-blue-950/40 border border-[#00c8c8]/20 relative overflow-hidden shadow-lg shadow-cyan-950/10 flex items-center gap-3.5"
        >
          {/* Subtle glowing overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
          
          <div className="w-10 h-10 rounded-xl bg-[#00c8c8]/10 border border-[#00c8c8]/25 flex items-center justify-center text-xl flex-shrink-0">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-extrabold text-white tracking-wide">
                Trending Deals Today
              </h2>
              <span className="text-sm">🔥</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium leading-tight">
              Save up to 60% on electronics & more!
            </p>
          </div>
        </motion.div>

        {/* ─── PRODUCT CARDS LIST ─── */}
        <div className="flex flex-col gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                layout
                className={`rounded-2xl p-4 relative flex flex-col justify-between transition-all duration-200 ${
                  product.id === 'boat-earphones'
                    ? 'cursor-pointer hover:border-cyan-500/35 hover:bg-[#15283c] active:scale-[0.99]'
                    : ''
                }`}
                style={{
                  background: '#112233',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onClick={() => {
                  if (product.id === 'boat-earphones') {
                    onNavigateToComparison?.();
                  }
                }}
              >
                {/* Discount Badge - Absolute top right */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/10 text-[#00c8c8] border border-cyan-500/20 tracking-wider">
                    {product.discountPct}% OFF
                  </span>
                </div>

                {/* Upper row: Emoji, Name, Brand, Star rating */}
                <div className="flex gap-3 items-start pr-16">
                  {/* Left: dark rounded emoji square */}
                  <div className="w-12 h-12 rounded-xl bg-[#0d1f2d] border border-white/5 flex items-center justify-center text-2xl flex-shrink-0">
                    {product.emoji}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      {product.brand}
                    </p>
                    
                    {/* Star Rating & Review count */}
                    <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-slate-300">
                      <span className="text-amber-400">★</span>
                      <span>{product.rating}</span>
                      <span className="text-slate-500 font-normal">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Short description */}
                <p className="text-xs text-slate-400 mt-2.5 font-medium leading-relaxed">
                  {product.description}
                </p>

                {/* Platform info */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                    <MapPin size={11} className="text-[#00c8c8]" />
                    <span>{product.platform}</span>
                    <span className="text-slate-600">•</span>
                    <span>{product.deliveryTime}</span>
                  </div>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 tracking-wider">
                    In Stock
                  </span>
                </div>

                {/* Price, saving and compare action row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-slate-500 line-through font-bold">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-lg font-black text-[#00c8c8]">
                      ₹{product.discountedPrice}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCompareProduct(product);
                    }}
                    className="px-3.5 py-1.5 rounded-xl border border-cyan-500/30 text-[#00c8c8] text-xs font-bold hover:bg-cyan-500/10 active:scale-95 transition-all"
                  >
                    Compare
                  </button>
                </div>

                {/* Save amount, shops, tags bottom row */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-dashed border-white/5 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 text-emerald-400 font-extrabold">
                    <TrendingDown size={12} />
                    <span>Save ₹{product.saveAmount}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <Tag size={11} className="text-slate-500" />
                    <span>{product.shopsCount} shops available</span>
                  </div>
                </div>

                {/* Tags row */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center text-slate-500"
              >
                <Compass className="mx-auto mb-2 opacity-30 animate-pulse" size={32} />
                <p className="text-sm font-semibold">No products found</p>
                <p className="text-xs mt-1">Try resetting your filters or search query</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── POPULAR PLATFORMS GRID ─── */}
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="text-sm font-extrabold text-white tracking-wide uppercase">
            Shop on Popular Platforms
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between group min-h-[96px] relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-extrabold text-white group-hover:text-[#00c8c8] transition-colors">
                    {platform.name}
                  </span>
                  <ArrowRight
                    size={15}
                    className={`${platform.arrowColor} transition-transform group-hover:translate-x-1 duration-200`}
                  />
                </div>
                <span className="text-[11px] text-slate-400 font-semibold mt-2 leading-tight">
                  {platform.subtitle}
                </span>
                
                {/* Visual hover border glow */}
                <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/10 rounded-2xl pointer-events-none transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── COMPARE MODAL / DRAWER ─── */}
      <AnimatePresence>
        {compareProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCompareProduct(null)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-[#112233] border-t border-white/10 rounded-t-[28px] max-w-md mx-auto shadow-2xl overflow-hidden"
            >
              <div className="px-5 pt-4 pb-8 flex flex-col gap-4">
                {/* Drag handle */}
                <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-2 opacity-50" />
                
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{compareProduct.emoji}</span>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">
                        {compareProduct.name}
                      </h4>
                      <p className="text-xs text-[#00c8c8] font-bold">
                        Compare Store Prices
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCompareProduct(null)}
                    className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Offer lists */}
                <div className="flex flex-col gap-2.5 my-2">
                  {(SHOP_OFFERS[compareProduct.id] || []).map((offer, index) => {
                    const isCheapest = index === 0;
                    return (
                      <div
                        key={offer.shop}
                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          isCheapest
                            ? 'bg-cyan-500/5 border-cyan-500/25'
                            : 'bg-white/[0.02] border-white/5'
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-white">
                              {offer.shop}
                            </span>
                            {isCheapest && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Best Price
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1">
                            Delivery: {offer.delivery}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-black ${isCheapest ? 'text-[#00c8c8]' : 'text-white'}`}>
                            ₹{offer.price}
                          </span>
                          <a
                            href={offer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-[#00c8c8]/10 hover:text-[#00c8c8] text-slate-300 transition-all active:scale-95"
                          >
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Info Note */}
                <p className="text-[10px] text-slate-500 font-semibold text-center mt-1">
                  * Prices are refreshed automatically from platforms every 15 minutes.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
};
