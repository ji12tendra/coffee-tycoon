import React, { useState } from 'react';
import { 
  Coffee, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Sun, 
  CloudRain, 
  Sparkles, 
  Plus, 
  Minus, 
  RotateCcw,
  CheckCircle,
  Award
} from 'lucide-react';
import { Language } from '../../types';

interface CoffeeShopSimProps {
  language: Language;
}

export const CoffeeShopSim: React.FC<CoffeeShopSimProps> = ({ language }) => {
  const isHi = language === 'hi';

  const [day, setDay] = useState(1);
  const [cash, setCash] = useState(250);
  const [beansStock, setBeansStock] = useState(30); // in cups capacity
  const [milkStock, setMilkStock] = useState(30);
  const [pricePerCup, setPricePerCup] = useState(3.50);
  const [staffCount, setStaffCount] = useState(1);
  const [machineTier, setMachineTier] = useState(1); // 1 = Basic, 2 = Italian Dual Boiler, 3 = Specialty Custom

  // Weather & daily outcomes
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'cold'>('sunny');
  const [lastDayReport, setLastDayReport] = useState<{
    cupsSold: number;
    revenue: number;
    costs: number;
    profit: number;
    customerFeedback: string;
  } | null>(null);

  // Buy Inventory
  const buyBeans = () => {
    if (cash < 20) return;
    setCash((c) => c - 20);
    setBeansStock((b) => b + 25);
  };

  const buyMilk = () => {
    if (cash < 15) return;
    setCash((c) => c - 15);
    setMilkStock((m) => m + 25);
  };

  const hireStaff = () => {
    if (cash < 50 || staffCount >= 4) return;
    setCash((c) => c - 50);
    setStaffCount((s) => s + 1);
  };

  const upgradeMachine = () => {
    const cost = machineTier === 1 ? 120 : 300;
    if (cash < cost || machineTier >= 3) return;
    setCash((c) => c - cost);
    setMachineTier((m) => m + 1);
  };

  // Run a Day of Business
  const runDay = () => {
    // Determine potential customers based on weather & machine tier
    let baseCustomers = 35 + machineTier * 10;
    if (weather === 'rainy') baseCustomers = Math.floor(baseCustomers * 1.4);
    if (weather === 'cold') baseCustomers = Math.floor(baseCustomers * 1.2);

    // Price elasticity: ideal price is $3.50 - $4.50
    let demandFactor = 1.0;
    if (pricePerCup <= 2.50) demandFactor = 1.35;
    else if (pricePerCup <= 3.50) demandFactor = 1.15;
    else if (pricePerCup <= 4.50) demandFactor = 1.0;
    else if (pricePerCup <= 6.00) demandFactor = 0.70;
    else demandFactor = 0.40;

    let customerDemand = Math.floor(baseCustomers * demandFactor);
    let staffCapacity = staffCount * 25; // each staff can serve 25 customers max

    let cupsCanMake = Math.min(beansStock, milkStock, staffCapacity, customerDemand);
    let cupsSold = cupsCanMake;

    let revenue = cupsSold * pricePerCup;
    let staffWages = staffCount * 12;
    let costs = staffWages;
    let profit = revenue - costs;

    // Deduct stock
    setBeansStock((b) => Math.max(0, b - cupsSold));
    setMilkStock((m) => Math.max(0, m - cupsSold));
    setCash((c) => c + profit);

    // Feedback
    let feedback = '';
    if (cupsSold < customerDemand && (beansStock < customerDemand || milkStock < customerDemand)) {
      feedback = isHi ? 'Stock khatam ho gaya! Bahut se customers bina coffee ke wapas gaye.' : 'Ran out of stock! Customers left empty-handed.';
    } else if (cupsSold < customerDemand && staffCapacity < customerDemand) {
      feedback = isHi ? 'Bheed zyada thi! Barista slow the, aur staff hire karein.' : 'Long queue! Staff was overwhelmed, hire more baristas.';
    } else if (pricePerCup > 5.50) {
      feedback = isHi ? 'Customers bole coffee thodi mehengi hai.' : 'Customers felt the price was a bit steep.';
    } else {
      feedback = isHi ? 'Shandar din! Customers coffee se behad khush the.' : 'Fantastic day! Customers loved the fresh aroma and quick service.';
    }

    setLastDayReport({
      cupsSold,
      revenue,
      costs,
      profit,
      customerFeedback: feedback
    });

    // Next day weather roll
    const weathers: ('sunny' | 'rainy' | 'cold')[] = ['sunny', 'sunny', 'rainy', 'cold'];
    const nextW = weathers[Math.floor(Math.random() * weathers.length)];
    setWeather(nextW);
    setDay((d) => d + 1);
  };

  const handleReset = () => {
    setDay(1);
    setCash(250);
    setBeansStock(30);
    setMilkStock(30);
    setPricePerCup(3.50);
    setStaffCount(1);
    setMachineTier(1);
    setLastDayReport(null);
    setWeather('sunny');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <span>{isHi ? 'Coffee House Tycoon' : 'Espresso Tycoon Sim'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                Day {day}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isHi ? 'Apni coffee shop chalayein aur munafa kamayein!' : 'Manage supply, staff, recipe prices, and master the cafe rush.'}
            </p>
          </div>
        </div>

        {/* Live Treasury */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 leading-none">{isHi ? 'Balance' : 'Cash'}</div>
              <div className="text-xs font-bold text-emerald-300 font-mono">${cash.toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
            {weather === 'sunny' && <Sun className="w-4 h-4 text-amber-400" />}
            {weather === 'rainy' && <CloudRain className="w-4 h-4 text-sky-400" />}
            {weather === 'cold' && <Sparkles className="w-4 h-4 text-indigo-400" />}
            <div>
              <div className="text-[10px] text-slate-400 leading-none">{isHi ? 'Mausam' : 'Weather'}</div>
              <div className="text-xs font-bold text-slate-200 capitalize">{weather}</div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Inventory & Supply */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>{isHi ? '1. Stock & Saman' : '1. Raw Ingredients'}</span>
            <span className="text-emerald-400 font-mono text-[11px]">Stock</span>
          </h4>

          {/* Coffee Beans */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">☕ {isHi ? 'Coffee Beans' : 'Espresso Beans'}</div>
              <div className="text-[11px] text-slate-400">{beansStock} cups in stock</div>
            </div>
            <button
              onClick={buyBeans}
              disabled={cash < 20}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-semibold border border-emerald-500/30 transition disabled:opacity-40"
            >
              +25 ($20)
            </button>
          </div>

          {/* Fresh Milk */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">🥛 {isHi ? 'Taaza Doodh' : 'Organic Milk'}</div>
              <div className="text-[11px] text-slate-400">{milkStock} cups in stock</div>
            </div>
            <button
              onClick={buyMilk}
              disabled={cash < 15}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-semibold border border-emerald-500/30 transition disabled:opacity-40"
            >
              +25 ($15)
            </button>
          </div>
        </div>

        {/* Card 2: Pricing & Upgrades */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>{isHi ? '2. Rate & Staff' : '2. Price & Upgrades'}</span>
            <span className="text-amber-400 font-mono text-[11px]">Pricing</span>
          </h4>

          {/* Price per Cup */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">{isHi ? 'Coffee Cup Rate:' : 'Price Per Cup:'}</span>
              <span className="font-bold text-emerald-400 font-mono text-sm">${pricePerCup.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPricePerCup((p) => Math.max(1.50, Number((p - 0.50).toFixed(2))))}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="range"
                min="1.50"
                max="8.00"
                step="0.25"
                value={pricePerCup}
                onChange={(e) => setPricePerCup(parseFloat(e.target.value))}
                className="flex-1 accent-emerald-500"
              />
              <button
                onClick={() => setPricePerCup((p) => Math.min(8.00, Number((p + 0.50).toFixed(2))))}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Staff Hire */}
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">👨‍🍳 {isHi ? 'Barista Staff' : 'Baristas'} ({staffCount})</div>
              <div className="text-[10px] text-slate-400">{staffCount * 25} cups/day max</div>
            </div>
            <button
              onClick={hireStaff}
              disabled={cash < 50 || staffCount >= 4}
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 disabled:opacity-40"
            >
              Hire ($50)
            </button>
          </div>

          {/* Machine Upgrade */}
          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">⚙️ {isHi ? 'Espresso Machine' : 'Machine'} (Tier {machineTier})</div>
              <div className="text-[10px] text-slate-400">{machineTier === 3 ? 'Maxed' : `Upgrade: $${machineTier === 1 ? 120 : 300}`}</div>
            </div>
            {machineTier < 3 && (
              <button
                onClick={upgradeMachine}
                disabled={cash < (machineTier === 1 ? 120 : 300)}
                className="px-2 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 text-xs font-medium border border-indigo-500/40 disabled:opacity-40"
              >
                Upgrade
              </button>
            )}
          </div>
        </div>

        {/* Card 3: Daily Business Execution */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {isHi ? '3. Dukaan Kholein' : '3. Open Shop For Day'}
            </h4>

            {lastDayReport ? (
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <div className="text-slate-400 font-semibold">{isHi ? 'Pichle Din Ka Report:' : 'Last Day Report:'}</div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isHi ? 'Biki hui Coffee:' : 'Cups Sold:'}</span>
                  <span className="text-white font-bold">{lastDayReport.cupsSold} cups</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isHi ? 'Kamayi (Revenue):' : 'Revenue:'}</span>
                  <span className="text-emerald-400 font-bold">${lastDayReport.revenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isHi ? 'Kharcha (Staff wages):' : 'Wages:'}</span>
                  <span className="text-rose-400 font-bold">-${lastDayReport.costs.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-300 font-bold">{isHi ? 'Net Profit:' : 'Net Profit:'}</span>
                  <span className={`font-mono font-bold ${lastDayReport.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ${lastDayReport.profit.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-amber-300 italic pt-1">
                  "{lastDayReport.customerFeedback}"
                </p>
              </div>
            ) : (
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 text-xs text-slate-500 text-center">
                {isHi ? 'Pehle stock check karein fir "Open Cafe" dabayein!' : 'Ensure stock is ready, then hit "Open Cafe" to simulate the day!'}
              </div>
            )}
          </div>

          <button
            id="run-day-button"
            onClick={runDay}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
          >
            <Coffee className="w-4 h-4" />
            <span>{isHi ? `Day ${day} Shuru Karein (Open Cafe)` : `Open Cafe for Day ${day}`}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
