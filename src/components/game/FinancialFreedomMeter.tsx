import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { formatINR, getFireStatus } from '../../utils/formatters';
import { TrendingUp, ShieldAlert, ChevronRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface FinancialFreedomMeterProps {
  state: GameState;
  passiveIncomePerDay: number;
  totalExpensesPerDay: number;
  dailyLuxuryDrain: number;
  dailyEmiTotal: number;
  onOpenAdvisor: () => void;
}

export const FinancialFreedomMeter: React.FC<FinancialFreedomMeterProps> = ({
  state,
  passiveIncomePerDay,
  totalExpensesPerDay,
  dailyLuxuryDrain,
  dailyEmiTotal,
  onOpenAdvisor,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const fire = getFireStatus(passiveIncomePerDay, totalExpensesPerDay);
  const firePercent = Math.min(100, Math.round(fire.firePercentage));
  const [expanded, setExpanded] = useState(false);

  // Check if liability drain is dangerously high (> 35% of total expenses)
  const isLiabilityDanger = dailyLuxuryDrain > 0 && dailyLuxuryDrain / Math.max(1, totalExpensesPerDay) > 0.35;

  return (
    <div
      id="financial_freedom_meter_card"
      className={`border rounded-2xl p-3 sm:p-3.5 shadow-sm mb-3.5 transition-all ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-white'
          : 'bg-white border-amber-900/10 text-stone-900 shadow-stone-900/5'
      }`}
    >
      {/* Primary Row: Title, FIRE % bar, & Quadrant Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Left: Indicator & Title */}
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-xl border flex-shrink-0 ${
            isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-xs sm:text-sm font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                {isHi ? 'FIRE आज़ादी स्कोर' : 'Financial Freedom Score'}
              </span>
              <span className={`font-mono text-xs font-black px-1.5 py-0.2 rounded-md ${
                firePercent >= 100
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
              }`}>
                {firePercent}% {firePercent >= 100 ? '🏆' : ''}
              </span>
              {fire.isFireAchieved && (
                <span className="bg-emerald-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  {isHi ? '100% आज़ाद!' : '100% FREE!'}
                </span>
              )}
            </div>
            <p className={`text-[11px] font-medium hidden sm:block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? 'पैसिव इनकम (रेंट+डिविडेंड) vs दैनिक खर्चे' : 'Passive Income vs Total Living Expenses'}
            </p>
          </div>
        </div>

        {/* Center/Right: Progress Bar & Quadrant + Quick Toggle */}
        <div className="flex items-center gap-3 flex-1 sm:max-w-md">
          {/* Visual Progress Track */}
          <div className={`flex-1 rounded-full h-2.5 sm:h-3 p-0.5 overflow-hidden border relative ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-100 border-stone-300'
          }`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                firePercent >= 100
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-green-400 shadow-sm'
                  : firePercent >= 50
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`}
              style={{ width: `${Math.max(5, firePercent)}%` }}
            />
          </div>

          {/* Quadrant Pill */}
          <div className={`flex-shrink-0 px-2 py-0.5 rounded-lg border text-[10px] font-bold ${
            isDark ? 'bg-indigo-950/50 border-indigo-500/30 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
          }`}>
            <span className="text-amber-600 dark:text-amber-300 font-black">
              {isHi ? fire.quadrantHi : fire.quadrant}
            </span>
          </div>

          {/* Expand Details Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`p-1 rounded-lg border transition cursor-pointer text-xs ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
            }`}
            title={expanded ? 'Hide Breakdown' : 'View Financial Breakdown'}
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Expandable Breakdown Drawer */}
      {expanded && (
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5 pt-2.5 border-t text-xs ${
          isDark ? 'border-slate-800' : 'border-stone-200'
        }`}>
          {/* 1. Passive Income */}
          <div className={`p-2 rounded-xl border ${
            isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-[10px] font-bold block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? 'दैनिक पैसिव आमदनी' : 'Daily Passive Income'}
            </span>
            <span className="text-xs sm:text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
              +{formatINR(passiveIncomePerDay)}/{isHi ? 'दिन' : 'day'}
            </span>
          </div>

          {/* 2. Total Living Expenses */}
          <div className={`p-2 rounded-xl border ${
            isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-[10px] font-bold block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? 'दैनिक कुल खर्चे' : 'Daily Expenses'}
            </span>
            <span className="text-xs sm:text-sm font-black font-mono text-rose-600 dark:text-rose-400">
              -{formatINR(totalExpensesPerDay)}/{isHi ? 'दिन' : 'day'}
            </span>
          </div>

          {/* 3. Luxury Drain */}
          <div className={`p-2 rounded-xl border ${
            dailyLuxuryDrain > 0
              ? isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-300'
              : isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-[10px] font-bold block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? 'लग्जरी मेंटेनेंस' : 'Luxury Liability Drain'}
            </span>
            <span className={`text-xs sm:text-sm font-black font-mono ${
              dailyLuxuryDrain > 0 ? 'text-amber-600 dark:text-amber-400' : isDark ? 'text-slate-500' : 'text-stone-400'
            }`}>
              -{formatINR(dailyLuxuryDrain)}/{isHi ? 'दिन' : 'day'}
            </span>
          </div>

          {/* 4. Active EMIs */}
          <div className={`p-2 rounded-xl border ${
            dailyEmiTotal > 0
              ? isDark ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-300'
              : isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className={`text-[10px] font-bold block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? 'बैंक लोन ईएमआई' : 'Active Bank EMIs'}
            </span>
            <span className={`text-xs sm:text-sm font-black font-mono ${
              dailyEmiTotal > 0 ? 'text-indigo-600 dark:text-indigo-300' : isDark ? 'text-slate-500' : 'text-stone-400'
            }`}>
              -{formatINR(dailyEmiTotal)}/{isHi ? 'दिन' : 'day'}
            </span>
          </div>
        </div>
      )}

      {/* Warning if Liabilities are high */}
      {isLiabilityDanger && (
        <div className={`mt-2 p-2 rounded-xl flex items-center justify-between text-xs border ${
          isDark ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span className="font-medium text-[11px]">
              {isHi
                ? 'चेतावनी: दिखावे के खर्चे 35%+ मुनाफा खा रहे हैं! इन्हें बेचकर एसेट्स बनाएं।'
                : 'Warning: Luxury maintenance is eating 35%+ of your cashflow! Cut liabilities.'}
            </span>
          </div>
          <button
            onClick={onOpenAdvisor}
            className="text-[11px] font-bold underline flex items-center text-amber-600 dark:text-amber-300 cursor-pointer ml-2 flex-shrink-0"
          >
            {isHi ? 'सलाह देखें' : 'Advisor'}
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

    </div>
  );
};
