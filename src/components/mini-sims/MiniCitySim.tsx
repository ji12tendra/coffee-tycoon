import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Home, 
  Store, 
  Factory, 
  Zap, 
  Trees, 
  Hammer, 
  Play, 
  Pause, 
  RotateCcw, 
  DollarSign, 
  Users, 
  Smile, 
  Activity,
  AlertCircle
} from 'lucide-react';
import { Language } from '../../types';

interface MiniCitySimProps {
  language: Language;
}

type TileType = 'empty' | 'road' | 'residential' | 'commercial' | 'industrial' | 'power' | 'park';

interface Tile {
  id: number;
  type: TileType;
  level: number;
  hasPower: boolean;
}

const GRID_SIZE = 8;
const INITIAL_CASH = 1500;

const TOOL_COSTS: Record<TileType, number> = {
  empty: 10, // bulldozing cost
  road: 20,
  residential: 60,
  commercial: 100,
  industrial: 120,
  power: 250,
  park: 50,
};

export const MiniCitySim: React.FC<MiniCitySimProps> = ({ language }) => {
  const isHi = language === 'hi';

  const [grid, setGrid] = useState<Tile[]>(() => 
    Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
      id: i,
      type: 'empty',
      level: 1,
      hasPower: false
    }))
  );

  const [selectedTool, setSelectedTool] = useState<TileType>('residential');
  const [cash, setCash] = useState(INITIAL_CASH);
  const [population, setPopulation] = useState(0);
  const [happiness, setHappiness] = useState(85);
  const [day, setDay] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [recentLog, setRecentLog] = useState<string>(
    isHi ? 'Shehar ka shubh aarambh! Sadkein aur ghar banayein.' : 'Welcome, Mayor! Lay down roads and zoning to grow.'
  );

  // Simulation tick effect
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setGrid((prevGrid) => {
        // Calculate power map
        const powerIndices = prevGrid
          .map((t, idx) => (t.type === 'power' ? idx : -1))
          .filter((idx) => idx !== -1);

        const newGrid = prevGrid.map((tile, idx) => {
          const row = Math.floor(idx / GRID_SIZE);
          const col = idx % GRID_SIZE;

          // Check if within 2 tiles distance from any power plant
          const isPowered = powerIndices.some((pIdx) => {
            const pRow = Math.floor(pIdx / GRID_SIZE);
            const pCol = pIdx % GRID_SIZE;
            return Math.abs(pRow - row) <= 2 && Math.abs(pCol - col) <= 2;
          });

          return { ...tile, hasPower: isPowered };
        });

        // Calculate stats
        let totalPop = 0;
        let totalTax = 0;
        let parkCount = 0;
        let indCount = 0;

        newGrid.forEach((tile) => {
          if (tile.type === 'residential') {
            const popGain = tile.hasPower ? 12 : 3;
            totalPop += popGain;
            totalTax += tile.hasPower ? 4 : 1;
          } else if (tile.type === 'commercial') {
            totalTax += tile.hasPower ? 9 : 2;
          } else if (tile.type === 'industrial') {
            totalTax += tile.hasPower ? 14 : 4;
            indCount++;
          } else if (tile.type === 'park') {
            parkCount++;
          }
        });

        // Maintenance costs
        const maintenance = 8;
        const netCashFlow = totalTax - maintenance;

        setCash((c) => Math.max(0, c + netCashFlow));
        setPopulation(totalPop);
        
        // Happiness formula
        let happy = 70 + parkCount * 4 - indCount * 2;
        if (totalPop > 50 && powerIndices.length === 0) happy -= 30;
        setHappiness(Math.min(100, Math.max(20, happy)));

        return newGrid;
      });

      setDay((d) => d + 1);
    }, 1500);

    return () => clearInterval(timer);
  }, [isRunning, isHi]);

  const handleTileClick = (index: number) => {
    const cost = TOOL_COSTS[selectedTool];
    if (cash < cost) {
      setRecentLog(isHi ? 'Paison ki kami hai! Tax aane ka intezar karein.' : 'Not enough funds! Wait for daily taxes.');
      return;
    }

    setCash((c) => c - cost);
    setGrid((prev) => {
      const next = [...prev];
      next[index] = {
        id: index,
        type: selectedTool,
        level: 1,
        hasPower: false
      };
      return next;
    });

    if (selectedTool === 'road') {
      setRecentLog(isHi ? 'Nayi sadak ban gayi!' : 'Road built!');
    } else if (selectedTool === 'power') {
      setRecentLog(isHi ? 'Power Plant chalu! Aas-paas bijli aayi.' : 'Power Plant installed! Area energized.');
    } else if (selectedTool === 'park') {
      setRecentLog(isHi ? 'Park banaya! Citizens khush hue.' : 'Park placed! Citizens feel happier.');
    }
  };

  const handleResetCity = () => {
    setGrid(
      Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
        id: i,
        type: 'empty',
        level: 1,
        hasPower: false
      }))
    );
    setCash(INITIAL_CASH);
    setPopulation(0);
    setHappiness(85);
    setDay(1);
    setRecentLog(isHi ? 'Shehar reset ho gaya.' : 'City reset successfully.');
  };

  const getTileVisual = (tile: Tile) => {
    switch (tile.type) {
      case 'road':
        return (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center border-dashed border-slate-600">
            <span className="text-[10px] text-slate-400 font-bold">🛣️</span>
          </div>
        );
      case 'residential':
        return (
          <div className={`w-full h-full ${tile.hasPower ? 'bg-emerald-700' : 'bg-emerald-950'} flex flex-col items-center justify-center text-white transition-colors`}>
            <span className="text-xs">🏡</span>
            <span className="text-[8px] opacity-80">{tile.hasPower ? '⚡' : '❌'}</span>
          </div>
        );
      case 'commercial':
        return (
          <div className={`w-full h-full ${tile.hasPower ? 'bg-sky-700' : 'bg-sky-950'} flex flex-col items-center justify-center text-white transition-colors`}>
            <span className="text-xs">🏬</span>
            <span className="text-[8px] opacity-80">{tile.hasPower ? '⚡' : '❌'}</span>
          </div>
        );
      case 'industrial':
        return (
          <div className={`w-full h-full ${tile.hasPower ? 'bg-amber-700' : 'bg-amber-950'} flex flex-col items-center justify-center text-white transition-colors`}>
            <span className="text-xs">🏭</span>
            <span className="text-[8px] opacity-80">{tile.hasPower ? '⚡' : '❌'}</span>
          </div>
        );
      case 'power':
        return (
          <div className="w-full h-full bg-orange-600 flex flex-col items-center justify-center text-white animate-pulse">
            <span className="text-xs">⚡</span>
            <span className="text-[7px] font-bold">PWR</span>
          </div>
        );
      case 'park':
        return (
          <div className="w-full h-full bg-teal-600 flex items-center justify-center text-white">
            <span className="text-xs">🌳</span>
          </div>
        );
      case 'empty':
      default:
        return (
          <div className="w-full h-full bg-slate-900/60 hover:bg-slate-800 flex items-center justify-center border border-slate-800/40 text-slate-700 text-[10px]">
            +
          </div>
        );
    }
  };

  const tools: { type: TileType; labelEn: string; labelHi: string; icon: string; cost: number; color: string }[] = [
    { type: 'residential', labelEn: 'Residential', labelHi: 'Ghar (Residential)', icon: '🏡', cost: 60, color: 'text-emerald-400' },
    { type: 'commercial', labelEn: 'Commercial', labelHi: 'Dukaan (Commercial)', icon: '🏬', cost: 100, color: 'text-sky-400' },
    { type: 'industrial', labelEn: 'Industrial', labelHi: 'Factory (Industrial)', icon: '🏭', cost: 120, color: 'text-amber-400' },
    { type: 'road', labelEn: 'Road', labelHi: 'Sadak (Road)', icon: '🛣️', cost: 20, color: 'text-slate-300' },
    { type: 'power', labelEn: 'Power Plant', labelHi: 'Power Grid', icon: '⚡', cost: 250, color: 'text-orange-400' },
    { type: 'park', labelEn: 'City Park', labelHi: 'Bageecha (Park)', icon: '🌳', cost: 50, color: 'text-teal-400' },
    { type: 'empty', labelEn: 'Bulldoze', labelHi: 'Todna (Bulldoze)', icon: '🔨', cost: 10, color: 'text-rose-400' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 text-white space-y-6">
      
      {/* City Header Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
              <span>{isHi ? 'Pocket City Simulator' : 'Pocket Metropolis Sim'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Day {day}
              </span>
            </h3>
            <p className="text-xs text-slate-400">{recentLog}</p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 leading-none">{isHi ? 'Khazana' : 'Treasury'}</div>
              <div className="text-xs font-bold text-emerald-300 font-mono">${cash}</div>
            </div>
          </div>

          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-sky-400" />
            <div>
              <div className="text-[10px] text-slate-400 leading-none">{isHi ? 'Aabadi' : 'Population'}</div>
              <div className="text-xs font-bold text-sky-300 font-mono">{population}</div>
            </div>
          </div>

          <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 leading-none">{isHi ? 'Khushi' : 'Happiness'}</div>
              <div className="text-xs font-bold text-amber-300 font-mono">{happiness}%</div>
            </div>
          </div>

          {/* Pause / Resume & Reset */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded-xl border transition ${
                isRunning ? 'bg-slate-800 text-amber-400 border-slate-700' : 'bg-emerald-600 text-white border-emerald-500'
              }`}
              title={isRunning ? 'Pause Simulation' : 'Resume Simulation'}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleResetCity}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Reset City"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sandbox Area: Tool Selector + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tool Palette (Left side) */}
        <div className="lg:col-span-4 space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
            {isHi ? 'Zoning & Tools Chunein:' : 'Zoning & Construction Tools:'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {tools.map((t) => (
              <button
                key={t.type}
                onClick={() => setSelectedTool(t.type)}
                className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                  selectedTool === t.type
                    ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{t.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{isHi ? t.labelHi : t.labelEn}</div>
                    <div className="text-[10px] text-slate-400 font-mono">${t.cost}</div>
                  </div>
                </div>
                {selectedTool === t.type && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                )}
              </button>
            ))}
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-[11px] text-slate-400 space-y-1 mt-3">
            <p className="font-semibold text-slate-300 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-teal-400" />
              {isHi ? 'Mayor ke liye Tips:' : 'Mayor Pro-Tips:'}
            </p>
            <p>{isHi ? '• Power plant 2 blocks tak bijli deta hai.' : '• Power plant covers a 2-tile radius.'}</p>
            <p>{isHi ? '• Factories se pradushan badhta hai, park banayein.' : '• Factories generate tax but lower happiness; build parks.'}</p>
          </div>
        </div>

        {/* Interactive 8x8 Grid Canvas */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6">
          <div 
            className="grid grid-cols-8 gap-1.5 w-full max-w-[420px] aspect-square bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-2xl"
          >
            {grid.map((tile, idx) => (
              <button
                key={idx}
                id={`grid-cell-${idx}`}
                onClick={() => handleTileClick(idx)}
                className="w-full h-full rounded-lg overflow-hidden transition-all duration-150 transform hover:scale-105 active:scale-95 shadow-sm"
              >
                {getTileVisual(tile)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 mt-4 flex-wrap justify-center font-medium">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {isHi ? 'Ghar (Residential)' : 'Residential'}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500"></span> {isHi ? 'Bazaar (Commercial)' : 'Commercial'}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> {isHi ? 'Factory (Industrial)' : 'Industrial'}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> {isHi ? 'Bijli (Power)' : 'Power'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
