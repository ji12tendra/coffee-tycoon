import React, { useState } from 'react';
import { Building2, Coffee, Rocket, ArrowLeft, PlayCircle, Sparkles } from 'lucide-react';
import { MiniCitySim } from './MiniCitySim';
import { CoffeeShopSim } from './CoffeeShopSim';
import { RocketSim } from './RocketSim';
import { Language } from '../../types';

interface MiniSimHubProps {
  language: Language;
  onBackToCatalog: () => void;
}

export const MiniSimHub: React.FC<MiniSimHubProps> = ({ language, onBackToCatalog }) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'city' | 'coffee' | 'rocket'>('city');

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHi ? 'Catalog Par Wapas' : 'Back to Games'}</span>
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-indigo-400" />
              <span>{isHi ? 'Interactive Web Mini-Simulators' : 'Playable Browser Micro-Sims'}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {isHi ? 'Bina install kiye seedhe browser me simulation enjoy karein!' : 'Experience simulation mechanics directly in your browser!'}
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            id="tab-city-sim"
            onClick={() => setActiveTab('city')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'city'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{isHi ? 'City Builder' : 'City Builder'}</span>
          </button>

          <button
            id="tab-coffee-sim"
            onClick={() => setActiveTab('coffee')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'coffee'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>{isHi ? 'Coffee Tycoon' : 'Coffee Tycoon'}</span>
          </button>

          <button
            id="tab-rocket-sim"
            onClick={() => setActiveTab('rocket')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'rocket'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>{isHi ? 'Rocket Orbit' : 'Rocket Orbit'}</span>
          </button>
        </div>
      </div>

      {/* Render Active Mini Sim */}
      {activeTab === 'city' && <MiniCitySim language={language} />}
      {activeTab === 'coffee' && <CoffeeShopSim language={language} />}
      {activeTab === 'rocket' && <RocketSim language={language} />}

    </div>
  );
};
