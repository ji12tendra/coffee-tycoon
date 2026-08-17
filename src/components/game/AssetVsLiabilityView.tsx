import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { BUSINESS_UPGRADES, LUXURY_ITEMS, STAFF_MEMBERS } from '../../data/gameData';
import { formatINR } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Info,
  ShieldAlert,
  Flame,
} from 'lucide-react';

interface AssetVsLiabilityViewProps {
  state: GameState;
  onBuyUpgrade: (upgradeId: string) => void;
  onBuyLuxury: (luxuryId: string) => void;
  onSellLuxury: (luxuryId: string) => void;
  onHireStaff: (staffId: string) => void;
  onFireStaff?: (staffId: string) => void;
}

export const AssetVsLiabilityView: React.FC<AssetVsLiabilityViewProps> = ({
  state,
  onBuyUpgrade,
  onBuyLuxury,
  onSellLuxury,
  onHireStaff,
  onFireStaff,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'assets' | 'liabilities' | 'staff'>('all');

  return (
    <div id="asset_liability_container" className="space-y-5">
      
      {/* Educational Banner Header */}
      <div className={`border rounded-3xl p-4 sm:p-5 shadow-sm transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-rose-950/60 border-slate-800 text-white shadow-lg'
          : 'bg-gradient-to-r from-emerald-50/80 via-white to-rose-50/80 border-stone-200 text-stone-900'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className={`text-base sm:text-lg font-black flex items-center gap-2 ${
              isDark ? 'text-amber-200' : 'text-stone-900'
            }`}>
              <span>{isHi ? 'एसेट (Asset) बनाम लायबिलिटी (Liability) का खेल' : 'The Asset vs Liability Lesson'}</span>
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 max-w-3xl font-medium ${
              isDark ? 'text-slate-300' : 'text-stone-600'
            }`}>
              {isHi
                ? 'कॉफ़ी बेचकर कमाए मुनाफे को सही जगह लगाएं: बिज़नेस और मशीनों में लगाएंगे तो रोज़ की कमाई बढ़ेगी (एसेट); दिखावे और लग्जरी पर उड़ाएंगे तो रोज़ मेंटेनेंस का नुकसान होगा (लायबिलिटी)!'
                : 'Choose wisely: Re-invest in Business Assets to grow daily cashflow, or fall into Luxury Traps that drain your cash every day in maintenance & depreciation!'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-stone-100 border-stone-200'
          }`}>
            <button
              onClick={() => setActiveSubTab('all')}
              className={`px-3 py-1.5 rounded-lg font-black transition cursor-pointer ${
                activeSubTab === 'all'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isHi ? 'सभी' : 'All'}
            </button>
            <button
              onClick={() => setActiveSubTab('assets')}
              className={`px-3 py-1.5 rounded-lg font-black transition cursor-pointer ${
                activeSubTab === 'assets'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isHi ? '🟢 एसेट्स (Re-invest)' : '🟢 Assets'}
            </button>
            <button
              onClick={() => setActiveSubTab('liabilities')}
              className={`px-3 py-1.5 rounded-lg font-black transition cursor-pointer ${
                activeSubTab === 'liabilities'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isHi ? '🔴 लायबिलिटी (लग्जरी)' : '🔴 Liabilities'}
            </button>
            <button
              onClick={() => setActiveSubTab('staff')}
              className={`px-3 py-1.5 rounded-lg font-black transition cursor-pointer ${
                activeSubTab === 'staff'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isHi ? '👥 स्टाफ' : '👥 Staff'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Assets vs Liabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Column 1: Assets & Business Upgrades */}
        {(activeSubTab === 'all' || activeSubTab === 'assets') && (
          <div className="space-y-3">
            
            <div className={`flex items-center justify-between px-4 py-2.5 rounded-2xl border transition ${
              isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isHi ? '🟢 एसेट्स: बिज़नेस अपग्रेड्स (कमाई बढ़ाने वाले)' : '🟢 Business Upgrades (Assets)'}</span>
              </div>
              <span className="text-[10px] font-bold font-mono">
                {isHi ? '+ रोज़ाना नकदी मुनाफा' : '+ Daily Passive Cashflow'}
              </span>
            </div>

            <div className="grid gap-2.5">
              {BUSINESS_UPGRADES.map((upgrade) => {
                const isBought = !!state.purchasedUpgrades[upgrade.id];
                const isLocked = state.shopLevel < upgrade.unlockedAtLevel;

                return (
                  <div
                    key={upgrade.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isBought
                        ? isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                        : isLocked
                        ? isDark ? 'bg-slate-900/50 border-slate-800 opacity-60' : 'bg-stone-100/60 border-stone-200 opacity-60'
                        : isDark ? 'bg-slate-900 border-slate-800 hover:border-emerald-500/40' : 'bg-white border-stone-200 hover:border-emerald-400 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className={`text-2xl p-2 rounded-xl border flex-shrink-0 ${
                          isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-100 border-stone-200'
                        }`}>
                          {upgrade.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className={`font-black text-xs sm:text-sm ${
                              isDark ? 'text-slate-100' : 'text-stone-900'
                            }`}>
                              {isHi ? upgrade.name.hi : upgrade.name.en}
                            </h4>
                            {isBought && (
                              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border flex items-center gap-0.5 ${
                                isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              }`}>
                                <CheckCircle className="w-2.5 h-2.5" />
                                <span>{isHi ? 'सक्रिय' : 'Active'}</span>
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] mt-0.5 font-medium ${
                            isDark ? 'text-slate-400' : 'text-stone-600'
                          }`}>
                            {isHi ? upgrade.description.hi : upgrade.description.en}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                            <span className="text-emerald-600 dark:text-emerald-400 font-black font-mono">
                              +{formatINR(upgrade.dailyCashflowBoost)}/{isHi ? 'दिन' : 'day'}
                            </span>
                            <span className="text-stone-400 dark:text-slate-500">•</span>
                            <span className="text-amber-700 dark:text-amber-300 font-bold">
                              {isHi ? `क्वालिटी: +${upgrade.qualityBoost}` : `Quality: +${upgrade.qualityBoost}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Buy Button */}
                      <div>
                        {isBought ? (
                          <div className={`text-xs font-black px-3 py-1.5 rounded-xl border ${
                            isDark ? 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30' : 'text-emerald-800 bg-emerald-100 border-emerald-300'
                          }`}>
                            {isHi ? 'खरीद लिया' : 'Owned'}
                          </div>
                        ) : isLocked ? (
                          <div className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${
                            isDark ? 'text-slate-500 bg-slate-950 border-slate-800' : 'text-stone-400 bg-stone-100 border-stone-200'
                          }`}>
                            Lv.{upgrade.unlockedAtLevel} {isHi ? 'पर खुलेगा' : 'Req'}
                          </div>
                        ) : (
                          <button
                            onClick={() => onBuyUpgrade(upgrade.id)}
                            disabled={state.cash < upgrade.cost}
                            className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition cursor-pointer ${
                              state.cash >= upgrade.cost
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm active:scale-95'
                                : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                            }`}
                          >
                            <span>{formatINR(upgrade.cost)}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Column 2: Luxury Traps (Liabilities) */}
        {(activeSubTab === 'all' || activeSubTab === 'liabilities') && (
          <div className="space-y-3">
            
            <div className={`flex items-center justify-between px-4 py-2.5 rounded-2xl border transition ${
              isDark ? 'bg-rose-950/30 border-rose-500/30 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>{isHi ? '🔴 लायबिलिटी: लग्जरी दिखावे के जाल' : '🔴 Luxury Traps (Liabilities)'}</span>
              </div>
              <span className="text-[10px] font-bold font-mono">
                {isHi ? '- रोज़ाना मेंटेनेंस खर्च' : '- Daily Maintenance Drain'}
              </span>
            </div>

            <div className="grid gap-2.5">
              {LUXURY_ITEMS.map((lux) => {
                const ownedData = state.purchasedLuxuries[lux.id];
                const count = ownedData ? ownedData.count : 0;
                const resaleValue = ownedData && count > 0 ? Math.round(ownedData.currentEstimatedValue / count) : 0;

                return (
                  <div
                    key={lux.id}
                    className={`p-3.5 rounded-2xl border transition ${
                      count > 0
                        ? isDark ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50/60 border-rose-300 shadow-sm'
                        : isDark ? 'bg-slate-900 border-slate-800 hover:border-rose-500/30' : 'bg-white border-stone-200 hover:border-rose-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className={`text-2xl p-2 rounded-xl border flex-shrink-0 ${
                          isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-100 border-stone-200'
                        }`}>
                          {lux.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className={`font-black text-xs sm:text-sm ${
                              isDark ? 'text-slate-100' : 'text-stone-900'
                            }`}>
                              {isHi ? lux.name.hi : lux.name.en}
                            </h4>
                            {count > 0 && (
                              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${
                                isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-rose-100 text-rose-800 border-rose-300'
                              }`}>
                                {count} {isHi ? 'गाड़ी/आइटम' : 'Owned'}
                              </span>
                            )}
                          </div>
                          
                          {/* Financial Warning & Lesson */}
                          <div className={`mt-1 p-2 rounded-xl border text-[11px] flex items-start gap-1.5 ${
                            isDark ? 'bg-slate-950/70 border-slate-800/80 text-amber-200' : 'bg-amber-50/80 border-amber-200 text-amber-900'
                          }`}>
                            <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>{isHi ? lux.financialLesson.hi : lux.financialLesson.en}</span>
                          </div>

                          <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                            <span className="text-rose-600 dark:text-rose-400 font-black font-mono">
                              -{formatINR(lux.dailyMaintenanceCost)}/{isHi ? 'दिन नुकसान' : 'day drain'}
                            </span>
                            <span className="text-stone-400 dark:text-slate-500">•</span>
                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">
                              +{lux.statusPoints} {isHi ? 'दिखावा अंक' : 'Status pts'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Buy / Sell Buttons */}
                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          onClick={() => onBuyLuxury(lux.id)}
                          disabled={state.cash < lux.purchaseCost}
                          className={`px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer ${
                            state.cash >= lux.purchaseCost
                              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm active:scale-95'
                              : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                          }`}
                        >
                          <span>{formatINR(lux.purchaseCost)}</span>
                        </button>

                        {count > 0 && (
                          <button
                            onClick={() => onSellLuxury(lux.id)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-black border flex items-center gap-1 cursor-pointer transition ${
                              isDark ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700' : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                            }`}
                            title="Sell luxury item to recover cash and stop daily maintenance"
                          >
                            <Minus className="w-2.5 h-2.5" />
                            <span>{isHi ? `बेचें (~${formatINR(resaleValue)})` : `Sell (~${formatINR(resaleValue)})`}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

      {/* Staff Management Section */}
      {(activeSubTab === 'all' || activeSubTab === 'staff') && (
        <div className={`border rounded-3xl p-4 sm:p-5 shadow-sm transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl border ${
                isDark ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-100 text-indigo-800 border-indigo-200'
              }`}>
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-sm font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                  {isHi ? 'स्टाफ हायरिंग एवं ऑटोमेशन' : 'Staff Hiring & Automation'}
                </h3>
                <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                  {isHi
                    ? 'कुशल बरिस्ता और कैशियर रखें ताकि आप सो रहे हों तब भी कॉफ़ी बिकती रहे'
                    : 'Hire staff to automate serving and generate 24/7 cashflow'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STAFF_MEMBERS.map((staff) => {
              const count = state.hiredStaff[staff.id] || 0;
              const isLocked = state.shopLevel < staff.unlockedAtLevel;

              return (
                <div
                  key={staff.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    count > 0
                      ? isDark ? 'bg-indigo-950/20 border-indigo-500/40' : 'bg-indigo-50/70 border-indigo-300 shadow-sm'
                      : isLocked
                      ? isDark ? 'bg-slate-950/40 border-slate-800 opacity-50' : 'bg-stone-100/60 border-stone-200 opacity-50'
                      : isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-stone-50 border-stone-200 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-black text-xs ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
                      {isHi ? staff.name.hi : staff.name.en}
                    </span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${
                      isDark ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-indigo-100 text-indigo-800 border-indigo-200'
                    }`}>
                      x{count}
                    </span>
                  </div>
                  <p className={`text-[10.5px] mb-2 min-h-[32px] font-medium leading-tight ${
                    isDark ? 'text-slate-400' : 'text-stone-600'
                  }`}>
                    {isHi ? staff.description.hi : staff.description.en}
                  </p>
                  <div className="text-[11px] space-y-0.5 mb-2.5 font-mono">
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                      ⚡ +{staff.autoServesPerSec} {isHi ? 'कप/सेकंड' : 'cups/sec'}
                    </div>
                    <div className="text-rose-600 dark:text-rose-400 font-bold">
                      -{formatINR(staff.dailySalary)}/{isHi ? 'दिन सैलरी' : 'day salary'}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {count > 0 && onFireStaff && (
                      <button
                        onClick={() => onFireStaff(staff.id)}
                        className="py-1.5 px-2.5 rounded-xl text-xs font-black bg-rose-100 dark:bg-rose-500/20 hover:bg-rose-200 dark:hover:bg-rose-500/30 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 transition flex items-center justify-center gap-1 cursor-pointer"
                        title={isHi ? `हटाएं और ₹${staff.dailySalary}/दिन बचाएं` : `Fire staff & save ₹${staff.dailySalary}/day`}
                      >
                        <Minus className="w-3 h-3" />
                        <span>{isHi ? 'हटाएं' : 'Fire'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => onHireStaff(staff.id)}
                      disabled={isLocked || state.cash < staff.hiringCost}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 cursor-pointer ${
                        isLocked
                          ? 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                          : state.cash >= staff.hiringCost
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                          : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                      }`}
                    >
                      <Plus className="w-3 h-3" />
                      <span>
                        {isLocked
                          ? `Lv.${staff.unlockedAtLevel}`
                          : `${isHi ? 'भर्ती' : 'Hire'} (${formatINR(staff.hiringCost)})`}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
