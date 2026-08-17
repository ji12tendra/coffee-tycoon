import React, { useState } from 'react';
import { GameState } from '../../types/game';
import {
  STOCKS_DATA,
  MUTUAL_FUNDS_DATA,
  REAL_ESTATE_DATA,
  GOLD_BONDS_DATA,
} from '../../data/gameData';
import { formatINR, formatPercent } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  TrendingUp,
  Building2,
  Coins,
  LineChart,
  Plus,
  Minus,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface InvestmentHubProps {
  state: GameState;
  onBuyStock: (stockId: string, quantity: number) => void;
  onSellStock: (stockId: string, quantity: number) => void;
  onToggleSip: (fundId: string, sipAmount: number) => void;
  onInvestLumpSumMf: (fundId: string, amount: number) => void;
  onBuyGold: (grams: number) => void;
  onSellGold: (grams: number) => void;
  onBuyRealEstate: (propId: string) => void;
}

export const InvestmentHub: React.FC<InvestmentHubProps> = ({
  state,
  onBuyStock,
  onSellStock,
  onToggleSip,
  onInvestLumpSumMf,
  onBuyGold,
  onSellGold,
  onBuyRealEstate,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const [tab, setTab] = useState<'stocks' | 'mutual_funds' | 'real_estate' | 'gold'>('stocks');

  // Stock trade modal state
  const [tradeModalStock, setTradeModalStock] = useState<{ id: string; action: 'buy' | 'sell' } | null>(null);
  const [tradeQty, setTradeQty] = useState<number>(10);

  // MF Lump Sum modal
  const [mfLumpSumModal, setMfLumpSumModal] = useState<string | null>(null);
  const [mfAmount, setMfAmount] = useState<number>(5000);

  // Gold trade state
  const [goldGramsInput, setGoldGramsInput] = useState<number>(10);

  // Calculate Total Portfolio Value
  let stockPortfolioValue = 0;
  let stockInvestedValue = 0;
  Object.entries(state.stocksOwned).forEach(([stockId, item]) => {
    const data = item as { quantity?: number; avgBuyPrice?: number } | undefined;
    if (!data) return;
    const curPrice = state.stockPrices[stockId] || 100;
    stockPortfolioValue += (data.quantity || 0) * curPrice;
    stockInvestedValue += (data.quantity || 0) * (data.avgBuyPrice || 0);
  });

  let mfPortfolioValue = 0;
  let mfInvestedValue = 0;
  Object.entries(state.mutualFundsOwned).forEach(([fundId, item]) => {
    const data = item as { units?: number; totalInvested?: number } | undefined;
    if (!data) return;
    const nav = state.mutualFundNavs[fundId] || 100;
    mfPortfolioValue += (data.units || 0) * nav;
    mfInvestedValue += data.totalInvested || 0;
  });

  const goldPortfolioValue = state.goldGramsOwned * state.goldPricePerGram;

  let realEstatePortfolioValue = 0;
  let totalDailyRent = 0;
  Object.entries(state.realEstateOwned).forEach(([propId, item]) => {
    const data = item as { currentMarketValue?: number; count?: number } | undefined;
    if (!data) return;
    realEstatePortfolioValue += (data.currentMarketValue || 0) * (data.count || 0);
    const prop = REAL_ESTATE_DATA.find((p) => p.id === propId);
    if (prop) totalDailyRent += prop.dailyRentalIncome * (data.count || 0);
  });

  const totalInvestments = stockPortfolioValue + mfPortfolioValue + goldPortfolioValue + realEstatePortfolioValue;

  return (
    <div id="investment_hub_container" className={`space-y-4 transition-colors ${isDark ? 'text-white' : 'text-stone-900'}`}>
      
      {/* Portfolio Overview Summary Card */}
      <div className={`border rounded-3xl p-5 shadow-sm transition-colors ${
        isDark
          ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800 shadow-xl'
          : 'bg-gradient-to-r from-white via-indigo-50/40 to-white border-stone-200 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className={`text-[10px] uppercase font-black tracking-wider ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>
              {isHi ? 'कुल निवेश पोर्टफोलियो (Wealth Portfolio)' : 'Total Investment Portfolio'}
            </span>
            <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
              {formatINR(totalInvestments)}
            </div>
            <div className={`text-xs mt-0.5 font-medium ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
              {isHi
                ? `शेयर + म्युचुअल फंड + सोना + रियल एस्टेट (पैसिव रेंट: +${formatINR(totalDailyRent)}/दिन)`
                : `Stocks + Mutual Funds + Gold + Real Estate (Passive Rent: +${formatINR(totalDailyRent)}/day)`}
            </div>
          </div>

          {/* Sub-Tabs Pills */}
          <div className={`flex flex-wrap items-center gap-1 p-1.5 rounded-2xl border text-xs font-bold ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-stone-100 border-stone-200'
          }`}>
            <button
              onClick={() => { setTab('stocks'); sound.playClick(); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                tab === 'stocks'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isHi ? 'शेयर बाज़ार' : 'Stocks'}</span>
            </button>
            <button
              onClick={() => { setTab('mutual_funds'); sound.playClick(); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                tab === 'mutual_funds'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>{isHi ? 'म्युचुअल फंड (SIP)' : 'Mutual Funds'}</span>
            </button>
            <button
              onClick={() => { setTab('real_estate'); sound.playClick(); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                tab === 'real_estate'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isHi ? 'रियल एस्टेट' : 'Real Estate'}</span>
            </button>
            <button
              onClick={() => { setTab('gold'); sound.playClick(); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                tab === 'gold'
                  ? 'bg-yellow-500 text-stone-950 font-black shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>{isHi ? 'गोल्ड एवं बॉन्ड' : 'Gold & Bonds'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Share Market (Stocks) Tab */}
      {tab === 'stocks' && (
        <div className="space-y-3">
          
          <div className={`flex items-center justify-between text-xs px-1 font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            <span>{isHi ? 'भारतीय शेयर बाज़ार (Live BSE/NSE Simulation)' : 'Stock Market (NSE/BSE Listed)'}</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">{isHi ? 'हर नए दिन भाव में उतार-चढ़ाव' : 'Prices fluctuate daily'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STOCKS_DATA.map((stock) => {
              const currentPrice = state.stockPrices[stock.id] || stock.currentPrice;
              const owned = state.stocksOwned[stock.id] || { quantity: 0, avgBuyPrice: 0 };
              const history = state.stockHistories[stock.id] || stock.priceHistory;
              const prevPrice = history[history.length - 2] || stock.basePrice;
              const dayChangePct = (currentPrice - prevPrice) / prevPrice;

              return (
                <div key={stock.id} className={`border rounded-3xl p-4 transition-all shadow-sm ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-black text-sm ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>{stock.symbol}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                          isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-stone-100 text-stone-700 border-stone-200'
                        }`}>
                          {stock.sector}
                        </span>
                      </div>
                      <h4 className={`font-black text-xs mt-0.5 ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>{stock.name}</h4>
                    </div>

                    <div className="text-right">
                      <div className={`text-base font-black font-mono ${isDark ? 'text-white' : 'text-stone-900'}`}>₹{currentPrice}</div>
                      <div className={`text-[11px] font-black font-mono ${dayChangePct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {formatPercent(dayChangePct)}
                      </div>
                    </div>
                  </div>

                  <p className={`text-[11px] font-medium mb-3 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    {isHi ? stock.description.hi : stock.description.en}
                  </p>

                  {/* Sparkline Visual SVG */}
                  <div className={`h-10 w-full rounded-xl p-1 border mb-3 flex items-center justify-center ${
                    isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                      {(() => {
                        const min = Math.min(...history);
                        const max = Math.max(...history);
                        const range = Math.max(1, max - min);
                        const points = history
                          .map((val, idx) => {
                            const x = (idx / (history.length - 1)) * 100;
                            const y = 22 - ((val - min) / range) * 18;
                            return `${x},${y}`;
                          })
                          .join(' ');
                        return (
                          <polyline
                            fill="none"
                            stroke={dayChangePct >= 0 ? '#10b981' : '#f43f5e'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={points}
                          />
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Holding Status & Buy/Sell Action Buttons */}
                  <div className={`flex items-center justify-between pt-2.5 border-t text-xs ${
                    isDark ? 'border-slate-800' : 'border-stone-100'
                  }`}>
                    <div>
                      {owned.quantity > 0 ? (
                        <div className="text-[11px]">
                          <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>{isHi ? 'होल्डिंग: ' : 'Holdings: '}</span>
                          <span className="font-black text-emerald-600 dark:text-emerald-400 font-mono">{owned.quantity} Qty</span>
                          <span className={`text-[10px] ml-1 font-medium ${isDark ? 'text-slate-500' : 'text-stone-400'}`}>
                            (@₹{Math.round(owned.avgBuyPrice)})
                          </span>
                        </div>
                      ) : (
                        <span className={`text-[11px] font-medium ${isDark ? 'text-slate-500' : 'text-stone-400'}`}>
                          {isHi ? 'कोई शेयर नहीं' : 'No holdings'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setTradeModalStock({ id: stock.id, action: 'buy' });
                          setTradeQty(10);
                          sound.playClick();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm transition cursor-pointer active:scale-95"
                      >
                        {isHi ? 'खरीदें' : 'Buy'}
                      </button>

                      {owned.quantity > 0 && (
                        <button
                          onClick={() => {
                            setTradeModalStock({ id: stock.id, action: 'sell' });
                            setTradeQty(owned.quantity);
                            sound.playClick();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-sm transition cursor-pointer active:scale-95"
                        >
                          {isHi ? 'बेचें' : 'Sell'}
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

      {/* 2. Mutual Funds & SIP Tab */}
      {tab === 'mutual_funds' && (
        <div className="space-y-3">
          
          <div className={`flex items-center justify-between text-xs px-1 font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            <span>{isHi ? 'म्युचुअल फंड एसआईपी (कंपाउंडिंग की ताकत)' : 'Mutual Funds & Automated SIP'}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{isHi ? 'दैनिक एसआईपी से ऑटो-वेल्थ' : 'Compounding wealth'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MUTUAL_FUNDS_DATA.map((fund) => {
              const currentNav = state.mutualFundNavs[fund.id] || fund.nav;
              const owned = state.mutualFundsOwned[fund.id] || { units: 0, totalInvested: 0, isSipActive: false, dailySipAmount: 500 };
              const currentVal = owned.units * currentNav;

              return (
                <div key={fund.id} className={`border rounded-3xl p-4 flex flex-col justify-between shadow-sm transition ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
                }`}>
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className={`text-xs font-black ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>{fund.type}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                        fund.riskLevel === 'Low'
                          ? isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : fund.riskLevel === 'Moderate'
                          ? isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-200'
                          : isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-800 border-rose-200'
                      }`}>
                        {fund.riskLevel} Risk
                      </span>
                    </div>

                    <h4 className={`font-black text-sm mb-1 ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                      {isHi ? fund.name.hi : fund.name.en}
                    </h4>
                    
                    <p className={`text-[11px] font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                      {isHi ? fund.description.hi : fund.description.en}
                    </p>

                    <div className={`p-3 rounded-2xl border mb-3 space-y-1.5 text-xs ${
                      isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-stone-50 border-stone-200'
                    }`}>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>NAV:</span>
                        <span className={`font-mono font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>₹{currentNav}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>{isHi ? 'अनुमानित रिटर्न:' : 'Exp Return:'}</span>
                        <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">~{(fund.expectedAnnualReturn * 100).toFixed(0)}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>{isHi ? 'कुल निवेश:' : 'Total Value:'}</span>
                        <span className="font-mono font-black text-amber-600 dark:text-amber-300">{formatINR(currentVal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Automated SIP Toggle & Lump Sum */}
                  <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-stone-100'}`}>
                    <button
                      onClick={() => {
                        onToggleSip(fund.id, 500);
                        sound.playUpgrade();
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        owned.isSipActive
                          ? isDark
                            ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {owned.isSipActive
                          ? (isHi ? 'ऑटो SIP सक्रिय (₹500/दिन)' : 'SIP Active (₹500/day)')
                          : (isHi ? 'दैनिक SIP शुरू करें (₹500/दिन)' : 'Start Daily SIP (₹500/day)')}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setMfLumpSumModal(fund.id);
                        setMfAmount(5000);
                        sound.playClick();
                      }}
                      className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isHi ? 'एकमुश्त निवेश (Lump Sum)' : 'Invest Lump Sum'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 3. Real Estate Tab */}
      {tab === 'real_estate' && (
        <div className="space-y-3">
          
          <div className={`flex items-center justify-between text-xs px-1 font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            <span>{isHi ? 'किराये की कमर्शियल एवं आवासीय प्रॉपर्टी (Passive Cashflow)' : 'Real Estate Rental Properties'}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{isHi ? 'हर सुबह तय किराया बैंक में' : 'Guaranteed Daily Rent'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {REAL_ESTATE_DATA.map((prop) => {
              const owned = state.realEstateOwned[prop.id] || { count: 0, currentMarketValue: prop.cost };

              return (
                <div key={prop.id} className={`border rounded-3xl p-4 flex flex-col justify-between shadow-sm transition ${
                  owned.count > 0
                    ? isDark
                      ? 'border-emerald-500/40 bg-emerald-950/10'
                      : 'border-emerald-300 bg-emerald-50/40'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-stone-200'
                }`}>
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className={`text-3xl p-2 rounded-2xl border ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-100 border-stone-200'
                      }`}>{prop.icon}</span>
                      {owned.count > 0 && (
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                          isDark
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}>
                          {owned.count} {isHi ? 'प्रॉपर्टी मालिक' : 'Owned'}
                        </span>
                      )}
                    </div>

                    <h4 className={`font-black text-sm mb-0.5 ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                      {isHi ? prop.name.hi : prop.name.en}
                    </h4>
                    <span className={`text-[10px] font-medium block mb-2 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{prop.location}</span>

                    <p className={`text-[11px] font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                      {isHi ? prop.description.hi : prop.description.en}
                    </p>

                    <div className={`p-3 rounded-2xl border mb-3 space-y-1.5 text-xs ${
                      isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-stone-50 border-stone-200'
                    }`}>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>{isHi ? 'मार्केट वैल्यू:' : 'Market Value:'}</span>
                        <span className={`font-mono font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>{formatINR(owned.currentMarketValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>{isHi ? 'दैनिक पैसिव किराया:' : 'Daily Passive Rent:'}</span>
                        <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">+{formatINR(prop.dailyRentalIncome)}/day</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onBuyRealEstate(prop.id)}
                    disabled={state.cash < prop.cost}
                    className={`w-full py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      state.cash >= prop.cost
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm active:scale-95'
                        : isDark
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{isHi ? `खरीदें (${formatINR(prop.cost)})` : `Buy Property (${formatINR(prop.cost)})`}</span>
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 4. Gold & Sovereign Gold Bonds Tab */}
      {tab === 'gold' && (
        <div className="space-y-3">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 24K Physical Gold */}
            <div className={`border rounded-3xl p-5 shadow-sm space-y-3 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`text-3xl p-2 rounded-2xl border ${
                    isDark ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-amber-100 border-amber-200'
                  }`}>🪙</span>
                  <div>
                    <h4 className={`font-black text-sm ${isDark ? 'text-yellow-300' : 'text-amber-800'}`}>
                      {isHi ? '24K शुद्ध सोना (Physical Gold)' : '24K Physical Gold Bars'}
                    </h4>
                    <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      {isHi ? 'महंगाई से बचाव का सबसे सुरक्षित साधन' : 'Hedge against currency inflation'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-black font-mono text-amber-600 dark:text-yellow-400">₹{state.goldPricePerGram}/g</div>
                  <div className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'लाइव भाव' : 'Live Rate'}</div>
                </div>
              </div>

              <div className={`p-3 rounded-2xl border flex justify-between items-center text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-amber-50/60 border-amber-200'
              }`}>
                <span className={isDark ? 'text-slate-400' : 'text-stone-600'}>{isHi ? 'आपके पास कुल सोना:' : 'Gold Holdings:'}</span>
                <span className="font-mono font-black text-amber-600 dark:text-yellow-300 text-sm">
                  {state.goldGramsOwned} g ({formatINR(state.goldGramsOwned * state.goldPricePerGram)})
                </span>
              </div>

              {/* Buy / Sell Grams Form */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>{isHi ? 'ग्राम संख्या:' : 'Grams:'}</span>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={goldGramsInput}
                    onChange={(e) => setGoldGramsInput(Math.max(1, Number(e.target.value)))}
                    className={`w-24 rounded-xl px-2.5 py-1.5 text-center font-mono font-black text-sm border ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                    }`}
                  />
                  <span className={`text-xs font-mono font-black ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    = {formatINR(goldGramsInput * state.goldPricePerGram)}
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => onBuyGold(goldGramsInput)}
                    disabled={state.cash < goldGramsInput * state.goldPricePerGram}
                    className={`flex-1 py-2 rounded-xl font-black text-xs transition cursor-pointer shadow-sm ${
                      state.cash >= goldGramsInput * state.goldPricePerGram
                        ? 'bg-yellow-500 hover:bg-yellow-400 text-stone-950'
                        : isDark ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {isHi ? 'सोना खरीदें' : 'Buy Gold'}
                  </button>

                  <button
                    onClick={() => onSellGold(goldGramsInput)}
                    disabled={state.goldGramsOwned < goldGramsInput}
                    className={`flex-1 py-2 rounded-xl font-black text-xs transition cursor-pointer ${
                      state.goldGramsOwned >= goldGramsInput
                        ? isDark
                          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-300 border border-yellow-500/40'
                          : 'bg-stone-100 hover:bg-stone-200 text-amber-800 border border-amber-300'
                        : isDark ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {isHi ? 'सोना बेचें' : 'Sell Gold'}
                  </button>
                </div>
              </div>

            </div>

            {/* Sovereign Gold Bonds (SGB) */}
            <div className={`border rounded-3xl p-5 shadow-sm flex flex-col justify-between ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
            }`}>
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className={`text-3xl p-2 rounded-2xl border ${
                    isDark ? 'bg-indigo-500/20 border-indigo-500/30' : 'bg-indigo-100 border-indigo-200'
                  }`}>📜</span>
                  <div>
                    <h4 className={`font-black text-sm ${isDark ? 'text-indigo-300' : 'text-indigo-800'}`}>
                      {isHi ? 'आरबीआई सॉवरेन गोल्ड बॉन्ड (SGB)' : 'RBI Sovereign Gold Bond'}
                    </h4>
                    <span className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      {isHi ? '2.5% अतिरिक्त सालाना ब्याज + सोने की बढ़त' : '2.5% Annual Interest + Gold Gains'}
                    </span>
                  </div>
                </div>

                <p className={`text-xs font-medium mb-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                  {isHi
                    ? 'भारत सरकार द्वारा जारी। सोने के दाम बढ़ने का पूरा फायदा मिलता है और साथ ही सालाना 2.5% ब्याज सीधे आपके खाते में जुड़ता है।'
                    : '100% Sovereign Guarantee with 2.5% fixed annual interest credited to your account.'}
                </p>
              </div>

              <div className={`p-3 rounded-2xl border text-xs flex justify-between items-center ${
                isDark ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
              }`}>
                <span className={`font-bold ${isDark ? 'text-indigo-200' : 'text-indigo-900'}`}>{isHi ? 'वार्षिक गारंटीड ब्याज:' : 'Annual Interest:'}</span>
                <span className="font-black font-mono text-emerald-600 dark:text-emerald-400 text-sm">2.5% p.a.</span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Trade Modal for Buying / Selling Stocks */}
      {tradeModalStock && (() => {
        const stock = STOCKS_DATA.find((s) => s.id === tradeModalStock.id);
        if (!stock) return null;
        const currentPrice = state.stockPrices[stock.id] || stock.currentPrice;
        const owned = state.stocksOwned[stock.id] || { quantity: 0, avgBuyPrice: 0 };
        const total = tradeQty * currentPrice;

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`border rounded-3xl p-6 max-w-sm w-full shadow-2xl transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <h3 className={`text-base font-black mb-0.5 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                {tradeModalStock.action === 'buy' ? (isHi ? 'शेयर खरीदें' : 'Buy Stocks') : (isHi ? 'शेयर बेचें' : 'Sell Stocks')}
              </h3>
              <p className={`text-xs font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{stock.name} ({stock.symbol})</p>

              <div className={`p-3 rounded-2xl border mb-3 space-y-1 text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
              }`}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>{isHi ? 'वर्तमान भाव:' : 'Current Price:'}</span>
                  <span className={`font-mono font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>₹{currentPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>{isHi ? 'आपके पास शेयर:' : 'Holdings:'}</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">{owned.quantity} Qty</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>{isHi ? 'मात्रा (Shares Quantity):' : 'Quantity:'}</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTradeQty((prev) => Math.max(1, prev - 10))}
                    className={`p-2 rounded-xl font-bold cursor-pointer transition ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200'
                    }`}
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={tradeQty}
                    onChange={(e) => setTradeQty(Math.max(1, Number(e.target.value)))}
                    className={`flex-1 border rounded-xl py-2 text-center font-mono font-black text-base ${
                      isDark ? 'bg-slate-950 border-slate-700 text-amber-300' : 'bg-stone-50 border-stone-300 text-amber-700'
                    }`}
                  />
                  <button
                    onClick={() => setTradeQty((prev) => prev + 10)}
                    className={`p-2 rounded-xl font-bold cursor-pointer transition ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200'
                    }`}
                  >
                    +10
                  </button>
                </div>
              </div>

              <div className={`text-center py-2.5 rounded-2xl border mb-4 text-xs font-mono ${
                isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-amber-50 border-amber-200'
              }`}>
                <span className={isDark ? 'text-slate-400' : 'text-stone-600'}>{isHi ? 'कुल राशि: ' : 'Total Amount: '}</span>
                <span className="text-base font-black text-amber-600 dark:text-amber-400">{formatINR(total)}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setTradeModalStock(null)}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs cursor-pointer transition ${
                    isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    if (tradeModalStock.action === 'buy') {
                      onBuyStock(stock.id, tradeQty);
                    } else {
                      onSellStock(stock.id, tradeQty);
                    }
                    setTradeModalStock(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs text-white shadow-sm cursor-pointer transition ${
                    tradeModalStock.action === 'buy' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'
                  }`}
                >
                  {tradeModalStock.action === 'buy' ? (isHi ? 'पुष्टि करें (Buy)' : 'Confirm Buy') : (isHi ? 'पुष्टि करें (Sell)' : 'Confirm Sell')}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MF Lump Sum Modal */}
      {mfLumpSumModal && (() => {
        const fund = MUTUAL_FUNDS_DATA.find((m) => m.id === mfLumpSumModal);
        if (!fund) return null;

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`border rounded-3xl p-6 max-w-sm w-full shadow-2xl transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-stone-200 text-stone-900'
            }`}>
              <h3 className={`text-base font-black mb-0.5 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                {isHi ? 'म्युचुअल फंड एकमुश्त निवेश' : 'Mutual Fund Lump Sum'}
              </h3>
              <p className={`text-xs font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{fund.name.en}</p>

              <div className="space-y-2 mb-4">
                <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>{isHi ? 'राशि दर्ज करें (₹):' : 'Amount to Invest (₹):'}</label>
                <input
                  type="number"
                  min={1000}
                  step={1000}
                  value={mfAmount}
                  onChange={(e) => setMfAmount(Math.max(1000, Number(e.target.value)))}
                  className={`w-full border rounded-xl py-2.5 px-3 text-center font-mono font-black text-lg ${
                    isDark ? 'bg-slate-950 border-slate-700 text-emerald-300' : 'bg-stone-50 border-stone-300 text-emerald-700'
                  }`}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setMfLumpSumModal(null)}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs cursor-pointer transition ${
                    isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {isHi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  onClick={() => {
                    onInvestLumpSumMf(fund.id, mfAmount);
                    setMfLumpSumModal(null);
                  }}
                  disabled={state.cash < mfAmount}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs text-white cursor-pointer transition ${
                    state.cash >= mfAmount ? 'bg-indigo-600 hover:bg-indigo-500 shadow-sm' : isDark ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {isHi ? 'निवेश करें' : 'Invest Now'}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
