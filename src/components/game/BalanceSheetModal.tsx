import React from 'react';
import { GameState } from '../../types/game';
import { formatINR } from '../../utils/formatters';
import { PieChart, TrendingUp, DollarSign, FileText, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface BalanceSheetModalProps {
  state: GameState;
  financials: {
    netWorth: number;
    totalAssets: number;
    totalLiabilities: number;
    stockValue: number;
    mfValue: number;
    goldValue: number;
    realEstateValue: number;
    luxuryCurrentValue: number;
    totalDebt: number;
    dailyRentalIncome: number;
    totalPassiveIncomePerDay: number;
    totalDailyExpenses: number;
    dailyLuxuryDrain: number;
    dailyEmiTotal: number;
    staffSalaryPerDay: number;
  };
}

export const BalanceSheetModal: React.FC<BalanceSheetModalProps> = ({
  state,
  financials,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const history = state.dailyFinancialHistory || [];

  return (
    <div id="balance_sheet_view" className={`space-y-4 ${isDark ? 'text-white' : 'text-stone-900'}`}>
      
      {/* 1. Net Worth Master Card */}
      <div
        className={`rounded-3xl p-5 border shadow-xl transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-white via-amber-50/60 to-white border-amber-200/80 shadow-stone-900/5'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? 'कुल शुद्ध संपत्ति (Total Net Worth)' : 'Total Net Worth'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-300 font-mono">
              {formatINR(financials.netWorth)}
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
              {isHi ? 'एसेट्स (दौलत) में से सभी बैंक कर्ज़ घटाने के बाद' : 'Total Assets minus Total Bank Debt'}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="text-right">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">{isHi ? 'कुल एसेट्स' : 'Total Assets'}</span>
              <span className="text-base font-black font-mono text-emerald-600 dark:text-emerald-300">{formatINR(financials.totalAssets)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-rose-500 dark:text-rose-400 font-bold block">{isHi ? 'कुल कर्ज़ (Debt)' : 'Total Debt'}</span>
              <span className="text-base font-black font-mono text-rose-500 dark:text-rose-400">{formatINR(financials.totalDebt)}</span>
            </div>
          </div>
        </div>

        {/* 30-Day Net Worth Trend Chart */}
        {history.length > 2 && (
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-amber-200/60'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? '30-दिवसीय नेटवर्थ चार्ट' : '30-Day Net Worth Trend'}
            </span>
            <div className={`h-16 w-full rounded-xl p-1.5 border ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-stone-50 border-stone-200'}`}>
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                {(() => {
                  const values = history.map((h) => h.netWorth);
                  const min = Math.min(...values);
                  const max = Math.max(...values);
                  const range = Math.max(1, max - min);
                  const points = values
                    .map((val, idx) => {
                      const x = (idx / (values.length - 1)) * 100;
                      const y = 36 - ((val - min) / range) * 32;
                      return `${x},${y}`;
                    })
                    .join(' ');

                  return (
                    <polyline
                      fill="none"
                      stroke={isDark ? '#fbbf24' : '#d97706'}
                      strokeWidth="2.5"
                      points={points}
                    />
                  );
                })()}
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 2. Balance Sheet: Assets vs Liabilities Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Column: Assets */}
        <div className={`rounded-3xl p-5 border shadow-lg transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/80 shadow-stone-900/5'
        }`}>
          <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <h3>{isHi ? 'एसेट्स (संपत्ति जो जेब में पैसा डालती है)' : 'Assets (Cash Inflow)'}</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '1. नकद रोकड़ (Cash)' : '1. Liquid Cash'}</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-300">{formatINR(state.cash)}</span>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '2. शेयर मार्केट (Stocks)' : '2. Stock Equities'}</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-300">{formatINR(financials.stockValue)}</span>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '3. म्युचुअल फंड (MF SIP)' : '3. Mutual Funds'}</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-300">{formatINR(financials.mfValue)}</span>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '4. 24K शुद्ध सोना (Gold)' : '4. Physical Gold'}</span>
              <span className="font-mono font-bold text-yellow-600 dark:text-yellow-300">{formatINR(financials.goldValue)}</span>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '5. रेंटल रियल एस्टेट (Real Estate)' : '5. Real Estate'}</span>
              <span className="font-mono font-bold text-teal-600 dark:text-teal-300">{formatINR(financials.realEstateValue)}</span>
            </div>

            <div className={`flex justify-between p-3 rounded-xl border font-bold text-sm ${
              isDark ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200 shadow-xs'
            }`}>
              <span className="text-emerald-800 dark:text-emerald-200">{isHi ? 'कुल एसेट्स:' : 'Total Assets:'}</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-300">{formatINR(financials.totalAssets)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Liabilities & Debt */}
        <div className={`rounded-3xl p-5 border shadow-lg transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/80 shadow-stone-900/5'
        }`}>
          <div className="flex items-center gap-2 mb-3 text-rose-500 dark:text-rose-400 font-bold text-sm">
            <ArrowDownRight className="w-4 h-4" />
            <h3>{isHi ? 'लायबिलिटी (कर्ज़ व खर्च कराने वाली चीजें)' : 'Liabilities & Dues'}</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '1. बैंक लोन बकाया (Loan Principal)' : '1. Bank Loan Debt'}</span>
              <span className="font-mono font-bold text-rose-500 dark:text-rose-400">{formatINR(financials.totalDebt)}</span>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '2. लग्जरी आइटम वर्तमान वैल्यू' : '2. Luxury Items Value'}</span>
              <span className={`font-mono font-bold ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>{formatINR(financials.luxuryCurrentValue)}</span>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '3. रोज़ाना लग्जरी मेंटेनेंस' : '3. Daily Luxury Drain'}</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">-{formatINR(financials.dailyLuxuryDrain)}/day</span>
            </div>
            <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
              <span className={isDark ? 'text-slate-300' : 'text-stone-700'}>{isHi ? '4. दैनिक बैंक ईएमआई' : '4. Daily Bank EMI'}</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">-{formatINR(financials.dailyEmiTotal)}/day</span>
            </div>

            <div className={`flex justify-between p-3 rounded-xl border font-bold text-sm ${
              isDark ? 'bg-rose-950/40 border-rose-500/30' : 'bg-rose-50 border-rose-200 shadow-xs'
            }`}>
              <span className="text-rose-800 dark:text-rose-200">{isHi ? 'कुल कर्ज़:' : 'Total Debt:'}</span>
              <span className="font-mono text-rose-700 dark:text-rose-300">{formatINR(financials.totalDebt)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
