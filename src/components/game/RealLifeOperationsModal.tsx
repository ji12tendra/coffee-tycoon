import React, { useState } from 'react';
import { GameState, BusinessPnLBreakdown } from '../../types/game';
import {
  STAFF_MEMBERS,
  STAFF_TRAINING_PROGRAMS,
  SHOP_LEVELS,
  BUSINESS_UPGRADES,
} from '../../data/gameData';
import { formatINR } from '../../utils/formatters';
import {
  DollarSign,
  FileText,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Wrench,
  Sparkle,
  Truck,
  Building,
  Receipt,
  PieChart,
} from 'lucide-react';

interface RealLifeOperationsModalProps {
  state: GameState;
  pnl: BusinessPnLBreakdown;
  onHireStaff: (staffId: string) => void;
  onFireStaff: (staffId: string) => void;
  onBuyUpgrade?: (upgradeId: string) => void;
  onPerformDeepCleaning: () => void;
  onServiceEspressoMachine: () => void;
  onDistributeFestivalBonus: () => void;
  onToggleStaffHealthInsurance: () => void;
  onToggleOnlineDelivery: () => void;
  onPurchaseStaffTraining: (trainingId: string) => void;
}

export const RealLifeOperationsModal: React.FC<RealLifeOperationsModalProps> = ({
  state,
  pnl,
  onHireStaff,
  onFireStaff,
  onBuyUpgrade,
  onPerformDeepCleaning,
  onServiceEspressoMachine,
  onDistributeFestivalBonus,
  onToggleStaffHealthInsurance,
  onToggleOnlineDelivery,
  onPurchaseStaffTraining,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const [activeSubTab, setActiveSubTab] = useState<'pnl' | 'equipment' | 'hr_staff' | 'training' | 'maintenance'>('pnl');
  const [upgradeFilter, setUpgradeFilter] = useState<'all' | 'equipment' | 'decor' | 'tech'>('all');

  const curLevel = SHOP_LEVELS.find((l) => l.id === state.shopLevel) || SHOP_LEVELS[0];

  return (
    <div id="operations_hub_view" className="space-y-4">
      
      {/* 1. Sub-Tab Switcher */}
      <div className={`flex flex-wrap p-1.5 rounded-2xl border gap-1 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-stone-100 border-stone-200 shadow-sm'
      }`}>
        <button
          id="tab_ops_pnl"
          onClick={() => setActiveSubTab('pnl')}
          className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'pnl'
              ? 'bg-amber-500 text-stone-950 shadow-md font-black'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isHi ? 'P&L हिसाब' : 'P&L Statement'}</span>
        </button>

        <button
          id="tab_ops_equipment"
          onClick={() => setActiveSubTab('equipment')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'equipment'
              ? 'bg-amber-500 text-stone-950 shadow-md font-black'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isHi ? '⚙️ मशीनें व दुकान' : '⚙️ Machines & Decor'}</span>
        </button>

        <button
          id="tab_ops_hr"
          onClick={() => setActiveSubTab('hr_staff')}
          className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'hr_staff'
              ? 'bg-amber-500 text-stone-950 shadow-md font-black'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{isHi ? 'स्टाफ एवं HR' : 'Staff & HR'}</span>
        </button>

        <button
          id="tab_ops_training"
          onClick={() => setActiveSubTab('training')}
          className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'training'
              ? 'bg-amber-500 text-stone-950 shadow-md font-black'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{isHi ? 'ट्रेनिंग' : 'Training'}</span>
        </button>

        <button
          id="tab_ops_maint"
          onClick={() => setActiveSubTab('maintenance')}
          className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'maintenance'
              ? 'bg-amber-500 text-stone-950 shadow-md font-black'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>{isHi ? 'रखरखाव' : 'Maintenance'}</span>
        </button>
      </div>

      {/* SUB-TAB 1: REAL-LIFE P&L STATEMENT */}
      {activeSubTab === 'pnl' && (
        <div className="space-y-4">
          {/* Top Summary Card */}
          <div className={`border rounded-3xl p-5 shadow-sm transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border-slate-800 text-white shadow-xl'
              : 'bg-gradient-to-r from-white via-emerald-50/50 to-white border-stone-200 text-stone-900'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className={`text-[10px] uppercase font-bold tracking-wider block ${
                  isDark ? 'text-slate-400' : 'text-stone-500'
                }`}>
                  {isHi ? 'दैनिक शुद्ध मुनाफा (Daily Net Profit)' : 'Daily Net Profit (After All Overheads)'}
                </span>
                <div
                  className={`text-2xl sm:text-3xl font-black font-mono ${
                    pnl.netDailyProfit >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {pnl.netDailyProfit >= 0 ? '+' : ''}
                  {formatINR(pnl.netDailyProfit)} / {isHi ? 'दिन' : 'day'}
                </div>
                <p className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                  {isHi ? 'ऑपरेटिंग प्रॉफिट मार्जिन:' : 'Operating Margin:'}{' '}
                  <span className="font-black text-amber-600 dark:text-amber-300 font-mono">{pnl.profitMarginPercent}%</span>
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className={`p-3 rounded-2xl border text-right ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-stone-50 border-stone-200'
                }`}>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    {isHi ? 'कुल दैनिक राजस्व' : 'Daily Revenue'}
                  </span>
                  <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-300">
                    +{formatINR(pnl.totalDailyRevenue)}
                  </span>
                </div>
                <div className={`p-3 rounded-2xl border text-right ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-stone-50 border-stone-200'
                }`}>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold block">
                    {isHi ? 'कुल दैनिक खर्चे' : 'Daily Expenses'}
                  </span>
                  <span className="text-base font-black font-mono text-rose-600 dark:text-rose-400">
                    -{formatINR(pnl.totalDailyExpenses)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized P&L Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revenue Column */}
            <div className={`border rounded-3xl p-4 sm:p-5 shadow-sm space-y-3 ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <div className={`flex items-center gap-2 border-b pb-2.5 ${
                isDark ? 'border-slate-800' : 'border-stone-100'
              }`}>
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {isHi ? '1. कुल कमाई (Revenue Inflow)' : '1. Total Revenue Inflow'}
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className={`flex justify-between items-center py-1 border-b ${
                  isDark ? 'border-slate-800/60 text-slate-300' : 'border-stone-100 text-stone-700 font-medium'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <span>☕</span> {isHi ? 'दुकान की इन-स्टोर बिक्री' : 'In-Store Counter Sales'}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-300">+{formatINR(pnl.inStoreSales)}</span>
                </div>

                <div className={`flex justify-between items-center py-1 border-b ${
                  isDark ? 'border-slate-800/60 text-slate-300' : 'border-stone-100 text-stone-700 font-medium'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <span>🛵</span> {isHi ? 'स्वीगी / ज़ोमैटो ऑनलाइन डिलीवरी' : 'Swiggy / Zomato Orders'}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-300">+{formatINR(pnl.onlineDeliverySales)}</span>
                </div>

                <div className={`flex justify-between items-center py-1 border-b ${
                  isDark ? 'border-slate-800/60 text-slate-300' : 'border-stone-100 text-stone-700 font-medium'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <span>🏢</span> {isHi ? 'कमर्शियल रियल एस्टेट किराया' : 'Real Estate Rental Income'}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-300">+{formatINR(pnl.passiveRentalIncome)}</span>
                </div>

                <div className={`flex justify-between items-center py-1 border-b ${
                  isDark ? 'border-slate-800/60 text-slate-300' : 'border-stone-100 text-stone-700 font-medium'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <span>📈</span> {isHi ? 'शेयर बाज़ार डिविडेंड' : 'Stock Dividends'}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-300">+{formatINR(pnl.stockDividends)}</span>
                </div>

                <div className={`flex justify-between items-center py-1 ${
                  isDark ? 'text-slate-300' : 'text-stone-700 font-medium'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <span>🏦</span> {isHi ? 'इमरजेंसी रिज़र्व फंड ब्याज' : 'Emergency Fund Interest (5% p.a.)'}
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-300">+{formatINR(pnl.fdBondInterest)}</span>
                </div>
              </div>
            </div>

            {/* Expenses Column */}
            <div className={`border rounded-3xl p-4 sm:p-5 shadow-sm space-y-3 ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <div className={`flex items-center gap-2 border-b pb-2.5 ${
                isDark ? 'border-slate-800' : 'border-stone-100'
              }`}>
                <Receipt className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {isHi ? '2. परिचालन खर्चे (Real Overheads)' : '2. Operating Expenses Breakdown'}
                </h4>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span>{isHi ? 'दुकान का किराया (Commercial Rent)' : 'Shop Commercial Rent'}</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.rentCost)}</span>
                </div>

                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span className="flex items-center gap-1">
                    <span>{isHi ? 'बिजली व एसी बिल (Electricity/Power)' : 'Commercial Power & AC'}</span>
                    {state.purchasedUpgrades['solar_rooftop_5kw'] && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-black">
                        Solar -55%
                      </span>
                    )}
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.electricityPowerCost)}</span>
                </div>

                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span>{isHi ? 'आरओ वाटर व स्वच्छता (Water & Sanitation)' : 'Water Purifier & RO'}</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.waterSanitationCost)}</span>
                </div>

                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span>{isHi ? 'डिस्पोजेबल कप व पैकेजिंग (Packaging)' : 'Packaging & Sleeves'}</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.packagingDisposablesCost)}</span>
                </div>

                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span>{isHi ? 'एस्प्रेसो मशीन सर्विसिंग AMC (Machine AMC)' : 'Espresso Machine AMC'}</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.machineAmcCost)}</span>
                </div>

                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span>{isHi ? 'दूध व बीन्स बर्बादी/खराबी (Spoilage Wastage)' : 'Daily Dairy & Bean Spoilage'}</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.dailySpoilageWastageCost)}</span>
                </div>

                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span>{isHi ? 'स्टाफ वेतन (Staff Salaries)' : 'Staff Total Salaries'}</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.staffSalaries)}</span>
                </div>

                {state.hasStaffHealthInsurance && (
                  <div className={`flex justify-between items-center py-0.5 border-b ${
                    isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                  }`}>
                    <span>{isHi ? 'कर्मचारी स्वास्थ्य बीमा (ESIC/Insurance)' : 'Employee Health Insurance'}</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.staffBenefitsInsurance)}</span>
                  </div>
                )}

                {state.isOnlineDeliveryActive && (
                  <div className={`flex justify-between items-center py-0.5 border-b ${
                    isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                  }`}>
                    <span>{isHi ? 'डिलीवरी कमीशन (Swiggy/Zomato 20%)' : 'Platform 20% Commission'}</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.onlinePlatformCommission)}</span>
                  </div>
                )}

                <div className={`flex justify-between items-center py-0.5 border-b ${
                  isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                }`}>
                  <span>{isHi ? 'रेस्टोरेंट 5% GST टैक्स (GST Tax)' : '5% Restaurant GST Tax'}</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.gstTax)}</span>
                </div>

                {pnl.advanceIncomeTax > 0 && (
                  <div className={`flex justify-between items-center py-0.5 border-b ${
                    isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                  }`}>
                    <span>{isHi ? 'अग्रिम आयकर (Advance Income Tax)' : 'Advance Income Tax'}</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.advanceIncomeTax)}</span>
                  </div>
                )}

                {pnl.loanEmis > 0 && (
                  <div className={`flex justify-between items-center py-0.5 border-b ${
                    isDark ? 'border-slate-800/50 text-slate-400' : 'border-stone-100 text-stone-600 font-medium'
                  }`}>
                    <span>{isHi ? 'बैंक लोन ईएमआई (Bank Loan EMIs)' : 'Bank Loan EMIs'}</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.loanEmis)}</span>
                  </div>
                )}

                {pnl.luxuryLiabilitiesDrain > 0 && (
                  <div className={`flex justify-between items-center py-0.5 ${
                    isDark ? 'text-slate-400' : 'text-stone-600 font-medium'
                  }`}>
                    <span>{isHi ? 'दिखावे की लक्ज़री मेंटेनेंस (Luxury Drain)' : 'Luxury Liability Drains'}</span>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400">-{formatINR(pnl.luxuryLiabilitiesDrain)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MACHINES, EQUIPMENT & SHOP DECOR EXPANSION */}
      {activeSubTab === 'equipment' && (
        <div className="space-y-4">
          {/* Header Card */}
          <div className={`border rounded-3xl p-5 shadow-sm transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-slate-800 text-white shadow-xl'
              : 'bg-gradient-to-r from-white via-amber-50/50 to-white border-stone-200 text-stone-900'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border text-2xl ${
                  isDark ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                }`}>
                  ⚙️
                </div>
                <div>
                  <h3 className={`text-sm sm:text-base font-black ${isDark ? 'text-amber-200' : 'text-stone-900'}`}>
                    {isHi ? 'मशीनें, उपकरण एवं दुकान विस्तार' : 'Machines, Commercial Equipment & Decor'}
                  </h3>
                  <p className={`text-xs mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    {isHi
                      ? 'उच्च क्षमता वाली एस्प्रेसो मशीनें, ग्राइंडर, सोलर पावर और आरामदायक फर्नीचर लगाकर दुकान का मुनाफा और स्पीड बढ़ाएं।'
                      : 'Reinvest business profits into high-efficiency espresso machines, grinders, solar panels, and luxury seating.'}
                  </p>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className={`flex p-1 rounded-xl border gap-1 text-xs ${
                isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-stone-100 border-stone-200'
              }`}>
                <button
                  onClick={() => setUpgradeFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer ${
                    upgradeFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {isHi ? 'सभी' : 'All'}
                </button>
                <button
                  onClick={() => setUpgradeFilter('equipment')}
                  className={`px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer ${
                    upgradeFilter === 'equipment'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  ☕ {isHi ? 'मशीनें' : 'Machines'}
                </button>
                <button
                  onClick={() => setUpgradeFilter('decor')}
                  className={`px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer ${
                    upgradeFilter === 'decor'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  🪑 {isHi ? 'फर्नीचर व सजावट' : 'Decor & Seating'}
                </button>
                <button
                  onClick={() => setUpgradeFilter('tech')}
                  className={`px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer ${
                    upgradeFilter === 'tech'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  ⚡ {isHi ? 'सोलर व टेक' : 'Tech & Solar'}
                </button>
              </div>
            </div>
          </div>

          {/* Upgrades Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BUSINESS_UPGRADES.filter((u) => upgradeFilter === 'all' || u.type === upgradeFilter).map((upgrade) => {
              const isOwned = !!state.purchasedUpgrades[upgrade.id];
              const isUnlocked = state.shopLevel >= upgrade.unlockedAtLevel;
              const canAfford = state.cash >= upgrade.cost && isUnlocked && !isOwned;

              return (
                <div
                  key={upgrade.id}
                  id={`upgrade_card_${upgrade.id}`}
                  className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${
                    isOwned
                      ? isDark ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm' : 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                      : isUnlocked
                      ? isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-stone-200 hover:border-amber-400 shadow-sm'
                      : isDark ? 'bg-slate-950/60 border-slate-900 opacity-60' : 'bg-stone-100/60 border-stone-200 opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-2xl p-1.5 rounded-2xl border ${
                          isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-100 border-stone-200'
                        }`}>
                          {upgrade.icon}
                        </span>
                        <div>
                          <h4 className={`text-xs font-black line-clamp-1 ${
                            isDark ? 'text-slate-100' : 'text-stone-900'
                          }`}>
                            {isHi ? upgrade.name.hi : upgrade.name.en}
                          </h4>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-black">
                            +{formatINR(upgrade.dailyCashflowBoost)} / {isHi ? 'दिन मुनाफा' : 'day cashflow'}
                          </span>
                        </div>
                      </div>

                      {isOwned && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                          isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isHi ? 'स्थापित' : 'Installed'}</span>
                        </span>
                      )}
                    </div>

                    <p className={`text-[11px] font-medium leading-tight ${
                      isDark ? 'text-slate-400' : 'text-stone-600'
                    }`}>
                      {isHi ? upgrade.description.hi : upgrade.description.en}
                    </p>

                    {/* Feature perks */}
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                      {upgrade.qualityBoost > 0 && (
                        <span className={`px-2 py-0.5 rounded-lg font-black border ${
                          isDark ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          ★ +{upgrade.qualityBoost} {isHi ? 'क्वालिटी' : 'Quality'}
                        </span>
                      )}
                      {upgrade.speedBoost > 1.0 && (
                        <span className={`px-2 py-0.5 rounded-lg font-black border ${
                          isDark ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                        }`}>
                          ⚡ {upgrade.speedBoost}x {isHi ? 'सर्विंग स्पीड' : 'Speed'}
                        </span>
                      )}
                      {upgrade.energySavingPercentage && (
                        <span className={`px-2 py-0.5 rounded-lg font-black border ${
                          isDark ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20' : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                        }`}>
                          ☀️ -{upgrade.energySavingPercentage}% {isHi ? 'बिजली बिल' : 'Power Bill'}
                        </span>
                      )}
                      {upgrade.wastageReductionPercentage && (
                        <span className={`px-2 py-0.5 rounded-lg font-black border ${
                          isDark ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          🧊 -{upgrade.wastageReductionPercentage}% {isHi ? 'दूध बर्बादी' : 'Wastage'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`mt-3 pt-2.5 border-t flex items-center justify-between ${
                    isDark ? 'border-slate-800/80' : 'border-stone-100'
                  }`}>
                    <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      {isHi ? 'कीमत:' : 'Price:'}{' '}
                      <span className={`font-black font-mono ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>{formatINR(upgrade.cost)}</span>
                    </span>

                    {isOwned ? (
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isHi ? 'सक्रिय संपत्ति' : 'Active Asset'}</span>
                      </span>
                    ) : (
                      <button
                        id={`btn_buy_upgrade_${upgrade.id}`}
                        disabled={!canAfford}
                        onClick={() => onBuyUpgrade && onBuyUpgrade(upgrade.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm active:scale-95'
                            : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                        }`}
                      >
                        {!isUnlocked
                          ? isHi ? `लेवल ${upgrade.unlockedAtLevel} पर खुलेगा` : `Unlock Lv ${upgrade.unlockedAtLevel}`
                          : isHi ? '+ खरीदें व लगाएं' : '+ Buy & Install'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: STAFF & HR MANAGEMENT */}
      {activeSubTab === 'hr_staff' && (
        <div className="space-y-4">
          {/* Team Morale & Welfare Bar */}
          <div className={`border rounded-3xl p-5 shadow-sm space-y-3 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className={`text-[10px] uppercase font-bold tracking-wider block ${
                  isDark ? 'text-slate-400' : 'text-stone-500'
                }`}>
                  {isHi ? 'टीम मनोबल स्कोर (Team Morale)' : 'Team Morale & Retention'}
                </span>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-300 font-mono">
                  {Math.round(state.staffMoraleScore)}%
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  id="btn_festival_bonus"
                  onClick={onDistributeFestivalBonus}
                  disabled={state.cash < 2500 && state.emergencyFundBalance < 2500 && (state.creditCardLimit - state.creditCardSpend) < 2500}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black rounded-xl text-xs shadow transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isHi ? 'दिवाली/त्योहार बोनस दें (-₹2,500)' : 'Distribute Festival Bonus (-₹2,500)'}</span>
                </button>

                <button
                  id="btn_toggle_insurance"
                  onClick={onToggleStaffHealthInsurance}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 cursor-pointer ${
                    state.hasStaffHealthInsurance
                      ? isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : isDark ? 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600' : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>
                    {state.hasStaffHealthInsurance
                      ? isHi ? 'कर्मचारी स्वास्थ्य बीमा सक्रिय (₹45/दिन)' : 'Health Insurance (ESIC Active)'
                      : isHi ? 'स्वास्थ्य बीमा लागू करें' : 'Provide Health Insurance'}
                  </span>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className={`w-full h-2.5 rounded-full overflow-hidden border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-200 border-stone-300'
            }`}>
              <div
                className={`h-full transition-all ${
                  state.staffMoraleScore > 75
                    ? 'bg-emerald-500'
                    : state.staffMoraleScore > 40
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${state.staffMoraleScore}%` }}
              />
            </div>
          </div>

          {/* Staff Roster Hiring & Firing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STAFF_MEMBERS.map((staff) => {
              const count = state.hiredStaff[staff.id] || 0;
              const isUnlocked = state.shopLevel >= staff.unlockedAtLevel;
              const canAfford = state.cash >= staff.hiringCost && isUnlocked;

              return (
                <div
                  key={staff.id}
                  id={`staff_card_${staff.id}`}
                  className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${
                    count > 0
                      ? isDark ? 'bg-slate-900/90 border-amber-500/30' : 'bg-white border-amber-300 shadow-sm'
                      : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-stone-50 border-stone-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-2xl p-1.5 rounded-2xl border ${
                          isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-100 border-stone-200'
                        }`}>
                          {staff.icon}
                        </span>
                        <div>
                          <h4 className={`text-xs font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                            {isHi ? staff.name.hi : staff.name.en}
                          </h4>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-black">
                            {formatINR(staff.dailySalary)} / {isHi ? 'दैनिक वेतन' : 'day salary'}
                          </span>
                        </div>
                      </div>

                      <span className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-full border ${
                        isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-stone-200 border-stone-300 text-stone-800'
                      }`}>
                        x{count}
                      </span>
                    </div>

                    <p className={`text-[11px] font-medium leading-tight ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                      {isHi ? staff.description.hi : staff.description.en}
                    </p>

                    <div className={`p-2 rounded-xl border text-[10px] font-black flex items-center gap-1.5 ${
                      isDark ? 'bg-slate-950/80 border-slate-800/80 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}>
                      <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>{isHi ? staff.specialSkill.hi : staff.specialSkill.en}</span>
                    </div>
                  </div>

                  <div className={`mt-3 pt-2 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isDark ? 'border-slate-800/80' : 'border-stone-100'
                  }`}>
                    <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      {isHi ? 'भर्ती फीस:' : 'Hiring fee:'}{' '}
                      <span className={`font-black ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>{formatINR(staff.hiringCost)}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Fire Staff Button (when count > 0) */}
                      {count > 0 && (
                        <button
                          id={`btn_fire_${staff.id}`}
                          onClick={() => onFireStaff(staff.id)}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-black bg-rose-100 dark:bg-rose-500/20 hover:bg-rose-200 dark:hover:bg-rose-500/30 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 transition cursor-pointer flex items-center gap-1"
                          title={isHi ? `हटाएं और ₹${staff.dailySalary}/दिन वेतन बचाएं` : `Fire and save ₹${staff.dailySalary}/day salary`}
                        >
                          <span>{isHi ? '− छंटनी / हटाएं' : '− Fire Staff'}</span>
                        </button>
                      )}

                      {/* Hire Staff Button */}
                      <button
                        id={`btn_hire_${staff.id}`}
                        disabled={!canAfford}
                        onClick={() => onHireStaff(staff.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-black shadow-sm'
                            : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                        }`}
                      >
                        {!isUnlocked
                          ? isHi ? `लेवल ${staff.unlockedAtLevel} पर खुलेगा` : `Unlock Lv ${staff.unlockedAtLevel}`
                          : isHi ? '+ भर्ती करें' : '+ Hire'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: STAFF TRAINING ACADEMY */}
      {activeSubTab === 'training' && (
        <div className="space-y-4">
          <div className={`border rounded-3xl p-5 shadow-sm transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-slate-800 text-white shadow-xl'
              : 'bg-gradient-to-r from-white via-indigo-50/50 to-white border-stone-200 text-stone-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl border ${
                isDark ? 'bg-indigo-500/20 border-indigo-500/30 text-amber-300' : 'bg-indigo-100 border-indigo-200 text-indigo-900'
              }`}>
                <Award className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <h3 className={`text-sm font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                  {isHi ? 'कर्मचारी कौशल विकास एवं प्रमाणन अकादमी' : 'Staff Skill & Certification Academy'}
                </h3>
                <p className={`text-xs mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                  {isHi
                    ? 'स्टाफ को ट्रेंड करने से दूध/कॉफ़ी की बर्बादी घटती है, रेटिंग बढ़ती है और प्रति कप ज्यादा मुनाफा मिलता है।'
                    : 'Training cuts raw spoilage, boosts customer price tolerance and unlocks 5-star ratings.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STAFF_TRAINING_PROGRAMS.map((prog) => {
              const isOwned = !!state.unlockedTrainings[prog.id];
              const canAfford = state.cash >= prog.cost && !isOwned;

              return (
                <div
                  key={prog.id}
                  id={`training_card_${prog.id}`}
                  className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${
                    isOwned
                      ? isDark ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                      : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl p-1.5 rounded-2xl border ${
                          isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-100 border-stone-200'
                        }`}>
                          {prog.icon}
                        </span>
                        <h4 className={`text-xs font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                          {isHi ? prog.name.hi : prog.name.en}
                        </h4>
                      </div>
                      {isOwned && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border flex items-center gap-1 ${
                          isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isHi ? 'प्रमाणित' : 'Certified'}</span>
                        </span>
                      )}
                    </div>

                    <p className={`text-[11px] font-medium leading-tight ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                      {isHi ? prog.description.hi : prog.description.en}
                    </p>

                    <div className={`p-2.5 rounded-2xl border text-[10px] font-black ${
                      isDark ? 'bg-slate-950/80 border-slate-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      ✨ {isHi ? prog.perkDescription.hi : prog.perkDescription.en}
                    </div>
                  </div>

                  <div className={`mt-3 pt-2 border-t flex items-center justify-between ${
                    isDark ? 'border-slate-800' : 'border-stone-100'
                  }`}>
                    <span className={`text-xs font-mono font-black ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
                      {isOwned ? (isHi ? 'लागू है' : 'Active') : formatINR(prog.cost)}
                    </span>

                    {!isOwned && (
                      <button
                        id={`btn_enroll_${prog.id}`}
                        disabled={!canAfford}
                        onClick={() => onPurchaseStaffTraining(prog.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm active:scale-95'
                            : 'bg-stone-200 text-stone-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed border border-stone-300 dark:border-slate-700'
                        }`}
                      >
                        {isHi ? 'ट्रेनिंग अनलॉक करें' : 'Enroll Staff'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MAINTENANCE & SANITATION */}
      {activeSubTab === 'maintenance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cleanliness Card */}
            <div className={`border rounded-3xl p-5 shadow-sm space-y-3 transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`text-2xl p-2 rounded-2xl border ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-100 border-stone-200'
                  }`}>🧼</span>
                  <div>
                    <h4 className={`text-xs font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                      {isHi ? 'दुकान की स्वच्छता (Cleanliness)' : 'Shop Hygiene Score'}
                    </h4>
                    <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                      {Math.round(state.cleanlinessScore)}%
                    </span>
                  </div>
                </div>
              </div>

              <p className={`text-[11px] font-medium leading-tight ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                {isHi
                  ? 'सफाई 50% से नीचे जाने पर ग्राहक भाग जाते हैं और FSSAI का चालान कट सकता है।'
                  : 'Low hygiene causes customer walkouts and FSSAI health violations.'}
              </p>

              <button
                id="btn_deep_clean"
                onClick={onPerformDeepCleaning}
                disabled={state.cleanlinessScore >= 98 || state.cash < 350}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <Sparkle className="w-3.5 h-3.5" />
                <span>{isHi ? 'डीप क्लीनिंग व सैनिटाइजेशन कराएं (-₹350)' : 'Perform Deep Cleaning (-₹350)'}</span>
              </button>
            </div>

            {/* Espresso Machine Health Card */}
            <div className={`border rounded-3xl p-5 shadow-sm space-y-3 transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`text-2xl p-2 rounded-2xl border ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-100 border-stone-200'
                  }`}>⚙️</span>
                  <div>
                    <h4 className={`text-xs font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                      {isHi ? 'एस्प्रेसो मशीन स्थिति (Machine Health)' : 'Espresso Machine Health'}
                    </h4>
                    <span className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">
                      {Math.round(state.machineHealthScore)}%
                    </span>
                  </div>
                </div>
              </div>

              <p className={`text-[11px] font-medium leading-tight ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                {isHi
                  ? 'मशीन में खराबी आने पर ब्रूइंग स्पीड 50% घट जाती है और स्वाद खराब होता है।'
                  : 'Degraded machine reduces brewing pressure and crema quality.'}
              </p>

              <button
                id="btn_service_machine"
                onClick={onServiceEspressoMachine}
                disabled={state.machineHealthScore >= 98 || state.cash < 850}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{isHi ? 'मशीन डीस्केलिंग व सर्विसिंग कराएं (-₹850)' : 'Service & Descale Machine (-₹850)'}</span>
              </button>
            </div>
          </div>

          {/* Delivery Toggle Card */}
          <div className={`border rounded-3xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-3 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`text-3xl p-2 rounded-2xl border ${
                isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200'
              }`}>
                🛵
              </span>
              <div>
                <h4 className={`text-xs font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                  {isHi ? 'स्वीगी / ज़ोमैटो ऑनलाइन ऑर्डर डिलीवरी' : 'Swiggy & Zomato Online Orders'}
                </h4>
                <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                  {isHi
                    ? '+35% एक्स्ट्रा ग्राहक ऑर्डर, 20% प्लेटफॉर्म कमीशन'
                    : '+35% extra customer volume with 20% platform commission fee.'}
                </p>
              </div>
            </div>

            <button
              id="btn_toggle_delivery_orders"
              onClick={onToggleOnlineDelivery}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                state.isOnlineDeliveryActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600' : 'bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200'
              }`}
            >
              {state.isOnlineDeliveryActive
                ? isHi ? '✅ डिलीवरी सक्रिय (Active)' : '✅ Delivery Active'
                : isHi ? 'डिलीवरी चालू करें' : 'Enable Delivery'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
