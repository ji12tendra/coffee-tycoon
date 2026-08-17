import React, { useState } from 'react';
import { GameState, ShopLevelId, GameTab } from '../../types/game';
import { SHOP_LEVELS, STAFF_MEMBERS, BUSINESS_UPGRADES } from '../../data/gameData';
import { formatINR } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  Coffee,
  Package,
  Users,
  Sparkles,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Star,
  Zap,
  Wrench,
  Sparkle,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  ArrowRight,
  Layers,
  Award,
} from 'lucide-react';

interface CoffeeShopViewProps {
  state: GameState;
  onServeManually: () => void;
  onServeCustomOrder?: (earnings: number, tip: number, customerName: string) => void;
  onBuyInventory: (item: 'beans' | 'milk' | 'cups' | 'sugar', batches?: number) => void;
  onUpgradeLevel: (levelId: ShopLevelId) => void;
  onSetCupPrice: (price: number) => void;
  onGoToTab: (tab: GameTab) => void;
  onBuyUpgrade?: (upgradeId: string) => void;
  onPerformDeepCleaning?: () => void;
  onServiceEspressoMachine?: () => void;
}

export const CoffeeShopView: React.FC<CoffeeShopViewProps> = ({
  state,
  onServeManually,
  onServeCustomOrder,
  onBuyInventory,
  onUpgradeLevel,
  onSetCupPrice,
  onGoToTab,
  onBuyUpgrade,
  onPerformDeepCleaning,
  onServiceEspressoMachine,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const currentLvl = SHOP_LEVELS.find((l) => l.id === state.shopLevel) || SHOP_LEVELS[0];
  const nextLvl = SHOP_LEVELS.find((l) => l.id === state.shopLevel + 1);

  const [activeDeckTab, setActiveDeckTab] = useState<'inventory' | 'upgrades' | 'expansion'>('inventory');
  const [tapEffect, setTapEffect] = useState<{ id: number; text: string; xOffset: number }[]>([]);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [tempPrice, setTempPrice] = useState(state.cupPrice);
  const [upgradeCategory, setUpgradeCategory] = useState<'all' | 'equipment' | 'decor' | 'tech'>('all');
  const [vipServedMessage, setVipServedMessage] = useState<string | null>(null);

  const handleServe = () => {
    const success = onServeManually();
    if (success) {
      const id = Date.now() + Math.random();
      const xOffset = (Math.random() - 0.5) * 60;
      setTapEffect((prev) => [...prev.slice(-4), { id, text: `+₹${state.cupPrice}`, xOffset }]);
      setTimeout(() => {
        setTapEffect((prev) => prev.filter((item) => item.id !== id));
      }, 850);
    }
  };

  const handleServeVIP = (orderName: string, reward: number, tip: number) => {
    if (state.beansStock >= 20 && state.milkStock >= 60 && state.cupsStock >= 1) {
      sound.playChaChing();
      if (onServeCustomOrder) {
        onServeCustomOrder(reward, tip, orderName);
      } else {
        onServeManually();
      }
      setVipServedMessage(isHi ? `🎉 ${orderName} सर्व किया! +₹${reward + tip}` : `🎉 Served ${orderName}! +₹${reward + tip}`);
      setTimeout(() => setVipServedMessage(null), 2500);
    } else {
      sound.playBuzzer();
    }
  };

  const handleRestockAll = () => {
    let anyBought = false;
    if (state.beansStock < 1500) {
      onBuyInventory('beans', 2);
      anyBought = true;
    }
    if (state.milkStock < 5000) {
      onBuyInventory('milk', 2);
      anyBought = true;
    }
    if (state.cupsStock < 100) {
      onBuyInventory('cups', 2);
      anyBought = true;
    }
    if (state.sugarStock < 1500) {
      onBuyInventory('sugar', 1);
      anyBought = true;
    }
    if (!anyBought) {
      onBuyInventory('beans', 1);
      onBuyInventory('milk', 1);
      onBuyInventory('cups', 1);
    }
  };

  let totalAutoServes = 0;
  let activeStaffCount = 0;
  Object.entries(state.hiredStaff).forEach(([staffId, countRaw]) => {
    const count = Number(countRaw) || 0;
    const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
    if (staff) {
      totalAutoServes += staff.autoServesPerSec * count;
      activeStaffCount += count;
    }
  });

  const maxCupsByBeans = Math.floor(state.beansStock / 15);
  const maxCupsByMilk = Math.floor(state.milkStock / 50);
  const maxCupsAvailable = Math.max(0, Math.min(maxCupsByBeans, maxCupsByMilk, state.cupsStock));

  // Time of Day metadata
  const periodMeta = {
    morning_rush: {
      icon: <Sunrise className="w-3.5 h-3.5 text-amber-500" />,
      labelEn: 'Morning Rush',
      labelHi: 'सुबह की भीड़',
      demand: '2.2x Rush',
      badgeColor: isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-100/90 text-amber-900 border-amber-300',
    },
    afternoon_work: {
      icon: <Sun className="w-3.5 h-3.5 text-yellow-500" />,
      labelEn: 'Afternoon Work',
      labelHi: 'दोपहर का समय',
      demand: '0.9x Chill',
      badgeColor: isDark ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30' : 'bg-yellow-100 text-yellow-900 border-yellow-300',
    },
    evening_peak: {
      icon: <Sunset className="w-3.5 h-3.5 text-orange-500" />,
      labelEn: 'Evening Peak',
      labelHi: 'शाम का पीक',
      demand: '2.4x Peak',
      badgeColor: isDark ? 'bg-orange-500/15 text-orange-300 border-orange-500/30' : 'bg-orange-100 text-orange-900 border-orange-300',
    },
    night_chill: {
      icon: <Moon className="w-3.5 h-3.5 text-indigo-500" />,
      labelEn: 'Night Chill',
      labelHi: 'रात का माहौल',
      demand: '0.7x Casuals',
      badgeColor: isDark ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' : 'bg-indigo-100 text-indigo-900 border-indigo-300',
    },
  }[state.timeOfDayPeriod];

  // Customers currently waiting in line
  const customerQueue = [
    { name: 'Aarav', role: isHi ? 'इंजीनियर' : 'Techie', avatar: '👨‍💻', order: 'Filter Kaapi', reward: Math.round(state.cupPrice * 1.5), tip: 20 },
    { name: 'Priya', role: isHi ? 'छात्रा' : 'Student', avatar: '👩‍🎓', order: 'Caramel Latte', reward: Math.round(state.cupPrice * 1.8), tip: 35 },
    { name: 'Sharma Ji', role: isHi ? 'मैनेजर' : 'Bank Mgr', avatar: '👴', order: 'Double Shot', reward: Math.round(state.cupPrice * 2.0), tip: 50 },
    { name: 'Riya', role: isHi ? 'डिजाइनर' : 'Designer', avatar: '👩‍🎨', order: 'Cappuccino', reward: Math.round(state.cupPrice * 1.6), tip: 25 },
  ];

  return (
    <div id="coffee_shop_view_container" className="space-y-3.5">
      
      {/* 1. Master Artisan Coffee Counter & Brew Station */}
      <div
        className={`rounded-3xl border p-4 sm:p-5 shadow-sm transition-all relative overflow-hidden ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-white'
            : 'bg-white border-amber-900/10 text-stone-900 shadow-stone-900/5'
        }`}
      >
        {/* Top Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-stone-200 dark:border-slate-800">
          
          {/* Rush Hour & Google Rating */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${periodMeta.badgeColor}`}>
              {periodMeta.icon}
              <span>{isHi ? periodMeta.labelHi : periodMeta.labelEn}</span>
              <span className="font-mono text-[11px] font-black opacity-80">({periodMeta.demand})</span>
            </span>

            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
              isDark ? 'bg-amber-500/15 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-mono font-black">{state.googleRating.toFixed(1)}</span>
              <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>({state.recentReviews.length})</span>
            </div>
          </div>

          {/* Quick Maintenance Indicators */}
          <div className="flex items-center gap-2">
            {/* Hygiene Quick Pill */}
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs font-bold ${
              state.cleanlinessScore < 60
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400 animate-pulse'
                : isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}>
              <span className="text-[10px] text-stone-500 dark:text-slate-400">{isHi ? 'सफाई' : 'Clean'}:</span>
              <span className="font-mono font-black">{Math.round(state.cleanlinessScore)}%</span>
              <button
                onClick={onPerformDeepCleaning}
                disabled={state.cleanlinessScore >= 98 || state.cash < 350}
                className="p-1 rounded hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 cursor-pointer disabled:opacity-30"
                title="Deep Clean (₹350)"
              >
                <Sparkle className="w-3 h-3" />
              </button>
            </div>

            {/* Machine Quick Pill */}
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs font-bold ${
              state.machineHealthScore < 60
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400 animate-pulse'
                : isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}>
              <span className="text-[10px] text-stone-500 dark:text-slate-400">{isHi ? 'मशीन' : 'Machine'}:</span>
              <span className="font-mono font-black">{Math.round(state.machineHealthScore)}%</span>
              <button
                onClick={onServiceEspressoMachine}
                disabled={state.machineHealthScore >= 98 || state.cash < 850}
                className="p-1 rounded hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 cursor-pointer disabled:opacity-30"
                title="Service Machine (₹850)"
              >
                <Wrench className="w-3 h-3" />
              </button>
            </div>

            {/* Price Adjust Button */}
            <button
              onClick={() => {
                setTempPrice(state.cupPrice);
                setShowPriceModal(true);
                sound.playClick();
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-bold transition cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-300'
                  : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-mono">₹{state.cupPrice}</span>
            </button>
          </div>

        </div>

        {/* Interactive Center: Brew Counter + Live Customer Queue Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-4">
          
          {/* Left: Tactile Brew Center (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center py-2">
            
            {/* Animated Steam Plumes */}
            <div className="relative h-6 mb-1 flex items-center justify-center gap-2.5">
              <span className="w-1.5 h-5 bg-gradient-to-t from-amber-400/60 to-transparent rounded-full animate-steam-1" />
              <span className="w-1.5 h-6 bg-gradient-to-t from-amber-300/80 to-transparent rounded-full animate-steam-2" />
              <span className="w-1.5 h-5 bg-gradient-to-t from-amber-400/60 to-transparent rounded-full animate-steam-3" />
            </div>

            {/* Big Interactive Tap to Serve Button */}
            <div className="relative">
              {tapEffect.map((item) => (
                <div
                  key={item.id}
                  style={{ transform: `translateX(${item.xOffset}px)` }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-emerald-600 dark:text-emerald-400 font-black text-lg animate-float-cash pointer-events-none drop-shadow-md z-30 font-mono"
                >
                  {item.text}
                </div>
              ))}

              <button
                id="tap_serve_coffee_btn"
                onClick={handleServe}
                className="group relative flex flex-col items-center justify-center w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 text-white shadow-lg shadow-amber-900/20 active:scale-95 transition-all duration-150 border-4 border-amber-300/60 hover:border-amber-100 cursor-pointer select-none hover:shadow-xl"
              >
                <div className="relative">
                  <Coffee className="w-10 h-10 sm:w-11 sm:h-11 mb-0.5 group-hover:rotate-12 transition-transform drop-shadow" />
                  <Sparkles className="w-3.5 h-3.5 text-amber-200 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="font-black text-xs tracking-wide uppercase px-2 text-white drop-shadow">
                  {isHi ? 'कॉफ़ी बनाएं' : 'Brew & Serve'}
                </span>
                <span className="text-[11px] font-black text-amber-100 font-mono">
                  +₹{state.cupPrice}
                </span>
              </button>
            </div>

            {/* Live Automation / Staff Stats Ticker */}
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs">
              <span className={`px-2 py-0.5 rounded-lg border font-medium text-[11px] ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}>
                👥 {activeStaffCount} {isHi ? 'स्टाफ' : 'Staff'}
              </span>
              <span className={`px-2 py-0.5 rounded-lg border font-bold text-[11px] text-emerald-600 dark:text-emerald-300 font-mono ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
              }`}>
                ⚡ {totalAutoServes.toFixed(1)} {isHi ? 'कप/से' : 'cups/s'}
              </span>
              <span className={`px-2 py-0.5 rounded-lg border font-mono text-[11px] ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-stone-50 border-stone-200 text-stone-600'
              }`}>
                ☕ {state.totalCupsSold} {isHi ? 'बिके' : 'sold'}
              </span>
            </div>

          </div>

          {/* Right: Live Customer Queue & VIP Custom Orders (7 cols) */}
          <div className="lg:col-span-7 space-y-2.5">
            
            <div className="flex items-center justify-between">
              <span className={`text-xs font-black uppercase tracking-wide flex items-center gap-1.5 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                <span>👥 {isHi ? 'ग्राहक कतार (Customer Line)' : 'Live Customer Queue'}</span>
              </span>
              <span className={`text-[11px] font-medium font-mono ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {currentLvl.baseCustomerFlow} {isHi ? 'ग्राहक/दिन' : 'cust/day'}
              </span>
            </div>

            {/* Customer Queue Cards with 1-Click Serve Trigger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {customerQueue.map((c, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 transition ${
                    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-stone-50 border-stone-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-2xl flex-shrink-0">{c.avatar}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className={`text-xs font-black truncate ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
                          {c.name}
                        </span>
                        <span className={`text-[9px] px-1 py-0.2 rounded font-medium ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-stone-200 text-stone-600'}`}>
                          {c.role}
                        </span>
                      </div>
                      <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate">
                        {c.order} • +₹{c.tip} Tip
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleServeVIP(c.order, c.reward, c.tip)}
                    className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-[10px] transition shadow-sm cursor-pointer active:scale-95 flex-shrink-0"
                    title={`Serve ${c.order} (+₹${c.reward + c.tip})`}
                  >
                    +₹{c.reward + c.tip}
                  </button>
                </div>
              ))}
            </div>

            {vipServedMessage && (
              <div className="text-center text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 py-1 px-3 rounded-xl animate-fade-in">
                {vipServedMessage}
              </div>
            )}

            {/* Quick P&L & Staff Shortcut Strip */}
            <div className="pt-1 flex items-center justify-between text-xs">
              <button
                onClick={() => onGoToTab('operations')}
                className={`flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:underline cursor-pointer`}
              >
                <span>{isHi ? 'स्टाफ हायरिंग और P&L सेंटर देखें' : 'View Staff Hiring & Shop P&L'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {maxCupsAvailable} {isHi ? 'कप कॉफ़ी का स्टॉक बचा है' : 'cups stock ready'}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* 2. Unified Management Deck (Segmented Switcher) */}
      <div
        id="shop_management_deck"
        className={`rounded-3xl border p-4 sm:p-5 shadow-sm space-y-3.5 transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-white'
            : 'bg-white border-amber-900/10 text-stone-900 shadow-stone-900/5'
        }`}
      >
        
        {/* Segmented Tab Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-stone-200 dark:border-slate-800">
          
          <div className={`flex p-1 rounded-2xl border gap-1 text-xs ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-100 border-stone-200'
          }`}>
            <button
              onClick={() => setActiveDeckTab('inventory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black transition cursor-pointer text-xs ${
                activeDeckTab === 'inventory'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>{isHi ? 'इन्वेंटरी स्टॉक' : 'Inventory Stock'}</span>
            </button>

            <button
              onClick={() => setActiveDeckTab('upgrades')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black transition cursor-pointer text-xs ${
                activeDeckTab === 'upgrades'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isHi ? 'दुकान उपकरण व मशीनें' : 'Equipment Upgrades'}</span>
            </button>

            <button
              onClick={() => setActiveDeckTab('expansion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black transition cursor-pointer text-xs ${
                activeDeckTab === 'expansion'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isHi ? 'बिजनेस विस्तार (Levels)' : 'Shop Expansion'}</span>
            </button>
          </div>

          {/* Action Helper on right */}
          {activeDeckTab === 'inventory' && (
            <button
              onClick={handleRestockAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black transition shadow-sm cursor-pointer active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isHi ? 'सभी रीस्टॉक करें' : 'Restock All'}</span>
            </button>
          )}

          {activeDeckTab === 'upgrades' && (
            <div className={`flex p-0.5 rounded-xl border gap-1 text-[11px] ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}>
              {(['all', 'equipment', 'decor', 'tech'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setUpgradeCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    upgradeCategory === cat
                      ? 'bg-amber-500 text-white shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat === 'all' ? (isHi ? 'सभी' : 'All') : cat === 'equipment' ? (isHi ? 'मशीनें' : 'Machines') : cat === 'decor' ? (isHi ? 'फर्नीचर' : 'Decor') : (isHi ? 'टेक' : 'Tech')}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Tab Content A: Inventory & Stock */}
        {activeDeckTab === 'inventory' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Coffee Beans */}
            <div className={`p-3 rounded-2xl border transition ${
              state.beansStock < 500
                ? 'bg-rose-50 border-rose-300 dark:bg-rose-950/30 dark:border-rose-500/40'
                : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>{isHi ? 'कॉफ़ी बीन्स' : 'Coffee Beans'}</span>
                <span className="text-lg">🫘</span>
              </div>
              <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-300 font-mono">
                {(state.beansStock / 1000).toFixed(2)} kg
              </div>
              <div className={`text-[10px] mb-2 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {isHi ? '15g / कप' : '15g / cup'}
              </div>
              <button
                onClick={() => onBuyInventory('beans', 1)}
                className={`w-full py-1.5 rounded-xl text-xs font-black border flex items-center justify-center gap-1 cursor-pointer transition ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700' : 'bg-white hover:bg-amber-50 text-amber-900 border-stone-300 shadow-sm'
                }`}
              >
                <Plus className="w-3 h-3" />
                <span>+1 kg (₹450)</span>
              </button>
            </div>

            {/* Fresh Milk */}
            <div className={`p-3 rounded-2xl border transition ${
              state.milkStock < 1000
                ? 'bg-rose-50 border-rose-300 dark:bg-rose-950/30 dark:border-rose-500/40'
                : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>{isHi ? 'ताज़ा दूध' : 'Fresh Milk'}</span>
                <span className="text-lg">🥛</span>
              </div>
              <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-300 font-mono">
                {(state.milkStock / 1000).toFixed(1)} L
              </div>
              <div className={`text-[10px] mb-2 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {isHi ? '50ml / कप' : '50ml / cup'}
              </div>
              <button
                onClick={() => onBuyInventory('milk', 1)}
                className={`w-full py-1.5 rounded-xl text-xs font-black border flex items-center justify-center gap-1 cursor-pointer transition ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-blue-300 border-slate-700' : 'bg-white hover:bg-blue-50 text-blue-900 border-stone-300 shadow-sm'
                }`}
              >
                <Plus className="w-3 h-3" />
                <span>+5 L (₹300)</span>
              </button>
            </div>

            {/* Paper Cups */}
            <div className={`p-3 rounded-2xl border transition ${
              state.cupsStock < 20
                ? 'bg-rose-50 border-rose-300 dark:bg-rose-950/30 dark:border-rose-500/40'
                : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>{isHi ? 'कप स्टॉक' : 'Paper Cups'}</span>
                <span className="text-lg">🥤</span>
              </div>
              <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-300 font-mono">
                {state.cupsStock} {isHi ? 'कप' : 'cups'}
              </div>
              <div className={`text-[10px] mb-2 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {isHi ? '1 कप / सर्विंग' : '1 unit / cup'}
              </div>
              <button
                onClick={() => onBuyInventory('cups', 1)}
                className={`w-full py-1.5 rounded-xl text-xs font-black border flex items-center justify-center gap-1 cursor-pointer transition ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border-slate-700' : 'bg-white hover:bg-emerald-50 text-emerald-900 border-stone-300 shadow-sm'
                }`}
              >
                <Plus className="w-3 h-3" />
                <span>+100 (₹150)</span>
              </button>
            </div>

            {/* Sugar & Syrup */}
            <div className={`p-3 rounded-2xl border transition ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>{isHi ? 'चीनी / सिरप' : 'Sugar / Syrup'}</span>
                <span className="text-lg">🍯</span>
              </div>
              <div className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-200 font-mono">
                {(state.sugarStock / 1000).toFixed(1)} kg
              </div>
              <div className={`text-[10px] mb-2 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {isHi ? '8g / कप' : '8g / cup'}
              </div>
              <button
                onClick={() => onBuyInventory('sugar', 1)}
                className={`w-full py-1.5 rounded-xl text-xs font-black border flex items-center justify-center gap-1 cursor-pointer transition ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-amber-200 border-slate-700' : 'bg-white hover:bg-amber-50 text-amber-900 border-stone-300 shadow-sm'
                }`}
              >
                <Plus className="w-3 h-3" />
                <span>+2 kg (₹100)</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Content B: Equipment & Upgrades */}
        {activeDeckTab === 'upgrades' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {BUSINESS_UPGRADES.filter((u) => upgradeCategory === 'all' || u.type === upgradeCategory).map((upgrade) => {
              const isOwned = !!state.purchasedUpgrades[upgrade.id];
              const isUnlocked = state.shopLevel >= upgrade.unlockedAtLevel;
              const canAfford = state.cash >= upgrade.cost && isUnlocked && !isOwned;

              return (
                <div
                  key={upgrade.id}
                  id={`shop_upgrade_${upgrade.id}`}
                  className={`p-3 rounded-2xl border transition flex flex-col justify-between ${
                    isOwned
                      ? isDark ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm' : 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                      : isUnlocked
                      ? isDark ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700' : 'bg-white border-stone-200 hover:border-amber-300 shadow-sm'
                      : isDark ? 'bg-slate-950/40 border-slate-900 opacity-50' : 'bg-stone-100/60 border-stone-200 opacity-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xl p-1.5 rounded-xl border ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-stone-100 border-stone-200'
                        }`}>
                          {upgrade.icon}
                        </span>
                        <div>
                          <h4 className={`text-xs font-black line-clamp-1 ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
                            {isHi ? upgrade.name.hi : upgrade.name.en}
                          </h4>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-black">
                            +{formatINR(upgrade.dailyCashflowBoost)}/{isHi ? 'दिन' : 'day'}
                          </span>
                        </div>
                      </div>

                      {isOwned && (
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border flex items-center gap-0.5 ${
                          isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                        }`}>
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>{isHi ? 'सक्रिय' : 'Active'}</span>
                        </span>
                      )}
                    </div>

                    <p className={`text-[10.5px] line-clamp-2 leading-tight ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                      {isHi ? upgrade.description.hi : upgrade.description.en}
                    </p>
                  </div>

                  <div className={`mt-2 pt-2 border-t flex items-center justify-between ${
                    isDark ? 'border-slate-800/80' : 'border-stone-200'
                  }`}>
                    <span className={`text-[11px] font-mono font-black ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                      {formatINR(upgrade.cost)}
                    </span>

                    {isOwned ? (
                      <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isHi ? 'स्थापित' : 'Installed'}</span>
                      </span>
                    ) : (
                      <button
                        id={`btn_shop_buy_upgrade_${upgrade.id}`}
                        disabled={!canAfford}
                        onClick={() => onBuyUpgrade && onBuyUpgrade(upgrade.id)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer shadow-sm active:scale-95'
                            : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {!isUnlocked
                          ? isHi ? `Lv.${upgrade.unlockedAtLevel} पर` : `Lv.${upgrade.unlockedAtLevel}`
                          : isHi ? '+ खरीदें' : '+ Buy'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content C: Shop Expansion & Levels */}
        {activeDeckTab === 'expansion' && (
          <div className="space-y-4">
            {nextLvl ? (
              <div className={`rounded-2xl p-4 border transition ${
                isDark
                  ? 'bg-slate-950/80 border-slate-800 text-white'
                  : 'bg-stone-50 border-stone-200 text-stone-900'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`text-3xl p-2 rounded-2xl border ${
                      isDark ? 'bg-amber-500/20 border-amber-500/40' : 'bg-amber-100 border-amber-300 shadow-sm'
                    }`}>
                      {nextLvl.imageIcon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">
                        {isHi ? 'अगला विस्तार' : 'Next Level'}
                      </span>
                      <h4 className={`text-base font-black ${isDark ? 'text-amber-200' : 'text-stone-900'}`}>
                        {isHi ? nextLvl.name.hi : nextLvl.name.en} (Level {nextLvl.id})
                      </h4>
                      <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                        {isHi ? nextLvl.description.hi : nextLvl.description.en}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'लागत' : 'Cost'}</div>
                      <div className="text-base font-black text-amber-600 dark:text-amber-300 font-mono">
                        {formatINR(nextLvl.costToUnlock)}
                      </div>
                    </div>

                    <button
                      onClick={() => onUpgradeLevel(nextLvl.id as ShopLevelId)}
                      disabled={state.cash < nextLvl.costToUnlock}
                      className={`px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition cursor-pointer ${
                        state.cash >= nextLvl.costToUnlock
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:scale-105 active:scale-95'
                          : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      <span>{isHi ? 'अपग्रेड करें' : 'Upgrade'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl p-4 text-center border ${
                isDark ? 'bg-slate-950/80 border-slate-800 text-white' : 'bg-stone-50 border-stone-200 text-stone-900'
              }`}>
                <span className="text-2xl mb-1 inline-block">👑</span>
                <h4 className="text-sm font-black text-amber-600 dark:text-amber-300">
                  {isHi ? 'ग्लोबल कॉफ़ी साम्राज्य (Level 10 Monopoly Achieved)!' : 'Global Coffee Monopoly (Level 10 Achieved)!'}
                </h4>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                  {isHi
                    ? 'आप सर्वोच्च शिखर पर पहुँच चुके हैं! अब अपनी विशाल दौलत से दुनिया भर में राज करें।'
                    : 'Maximum level 10 reached! You have achieved absolute generational wealth and global brand dominance.'}
                </p>
              </div>
            )}

            {/* 10-Level Visual Progression Roadmap */}
            <div className="space-y-2">
              <h4 className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                <Layers className="w-3.5 h-3.5" />
                <span>{isHi ? 'दुकान विस्तार रोडमैप (स्तर 1 से 10)' : 'Shop Expansion Roadmap (Levels 1 to 10)'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SHOP_LEVELS.map((lvl) => {
                  const isCurrent = lvl.id === state.shopLevel;
                  const isPassed = lvl.id < state.shopLevel;
                  const isNext = lvl.id === state.shopLevel + 1;
                  const isLocked = lvl.id > state.shopLevel + 1;

                  return (
                    <div
                      key={lvl.id}
                      className={`p-3 rounded-2xl border transition relative overflow-hidden flex items-start gap-3 ${
                        isCurrent
                          ? isDark ? 'bg-amber-950/30 border-amber-500/60 shadow-sm ring-1 ring-amber-500/30' : 'bg-amber-50 border-amber-400 shadow-sm ring-1 ring-amber-400/40'
                          : isPassed
                          ? isDark ? 'bg-slate-950/50 border-slate-800/80 opacity-70' : 'bg-white border-stone-200 opacity-80'
                          : isNext
                          ? isDark ? 'bg-slate-900 border-amber-500/30' : 'bg-white border-amber-200'
                          : isDark ? 'bg-slate-950/30 border-slate-900 opacity-45' : 'bg-stone-50 border-stone-200 opacity-50'
                      }`}
                    >
                      <div className={`text-2xl p-2 rounded-xl border shrink-0 ${
                        isCurrent
                          ? isDark ? 'bg-amber-500/20 border-amber-500/40' : 'bg-amber-100 border-amber-300'
                          : isDark ? 'bg-slate-900 border-slate-800' : 'bg-stone-100 border-stone-200'
                      }`}>
                        {lvl.imageIcon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                              isCurrent
                                ? 'bg-amber-500 text-white'
                                : isPassed
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                : isDark ? 'bg-slate-800 text-slate-400' : 'bg-stone-200 text-stone-600'
                            }`}>
                              Lv.{lvl.id}
                            </span>
                            <h5 className={`text-xs font-black truncate ${isCurrent ? (isDark ? 'text-amber-300' : 'text-amber-950') : (isDark ? 'text-slate-200' : 'text-stone-800')}`}>
                              {isHi ? lvl.name.hi : lvl.name.en}
                            </h5>
                          </div>

                          {isCurrent && (
                            <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider shrink-0">
                              {isHi ? 'वर्तमान' : 'Current'}
                            </span>
                          )}
                          {isPassed && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          )}
                        </div>

                        <p className={`text-[10.5px] line-clamp-1 mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                          {isHi ? lvl.tagline.hi : lvl.tagline.en}
                        </p>

                        <div className="flex items-center justify-between gap-2 mt-1.5 text-[10px] font-mono">
                          <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>
                            {lvl.id === 1 ? (isHi ? 'शुरुआती' : 'Starter') : formatINR(lvl.costToUnlock)}
                          </span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">
                            {isHi ? 'बेस रेट:' : 'Base:'} ₹{lvl.baseCupPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Price Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-sm w-full shadow-2xl transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <h3 className={`text-base font-black mb-1 ${isDark ? 'text-amber-200' : 'text-stone-900'}`}>
              {isHi ? 'कॉफ़ी कप रेट तय करें' : 'Set Coffee Cup Price'}
            </h3>
            <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
              {isHi
                ? 'ज्यादा रेट रखने से प्रति कप ज्यादा मुनाफा होता है, लेकिन बहुत महंगा करने से ग्राहक संतुष्टि पर असर पड़ता है।'
                : 'Higher price yields more profit per cup, but ensure your quality & upgrades match!'}
            </p>

            <div className={`text-center py-4 rounded-2xl border mb-4 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}>
              <span className={`text-xs block mb-1 font-bold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'नया रेट' : 'New Price'}</span>
              <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                ₹{tempPrice}
              </span>
            </div>

            <input
              type="range"
              min={20}
              max={currentLvl.baseCupPrice * 2.5}
              step={5}
              value={tempPrice}
              onChange={(e) => setTempPrice(Number(e.target.value))}
              className="w-full accent-amber-500 mb-5 cursor-pointer"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowPriceModal(false)}
                className={`flex-1 py-2.5 rounded-xl font-black text-xs cursor-pointer ${
                  isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isHi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  onSetCupPrice(tempPrice);
                  setShowPriceModal(false);
                  sound.playUpgrade();
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 text-white font-black text-xs hover:bg-amber-500 cursor-pointer shadow-md"
              >
                {isHi ? 'सेव करें' : 'Save Price'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
