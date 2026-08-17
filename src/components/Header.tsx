import React from 'react';
import { Gamepad2, Sparkles, Dices, Search, Globe, PlayCircle } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenQuiz: () => void;
  onOpenSpinner: () => void;
  onOpenMiniSims: () => void;
  activeView: 'catalog' | 'mini_sims' | 'quiz';
  onSelectView: (view: 'catalog' | 'mini_sims' | 'quiz') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  searchQuery,
  onSearchChange,
  onOpenQuiz,
  onOpenSpinner,
  onOpenMiniSims,
  activeView,
  onSelectView
}) => {
  const isHi = language === 'hi';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <button 
            id="brand-home-button"
            onClick={() => onSelectView('catalog')}
            className="flex items-center gap-3 text-left group transition"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300">
                  SimVerse
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isHi ? 'सिमुलेशन गाइड' : 'Sim Guide'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isHi ? 'बेहतरीन Simulation Games की सिफारिश' : 'Curated Simulation Game Recommendations'}
              </p>
            </div>
          </button>

          {/* Mobile Language Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-lang-toggle"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              {isHi ? 'EN' : 'हिन्दी'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:max-w-xs relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="game-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={isHi ? 'Truck, Farming, City ya Space game khojein...' : 'Search by title, genre, or vibe...'}
            className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-1.5 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            id="quiz-modal-button"
            onClick={onOpenQuiz}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition shadow-sm ${
              activeView === 'quiz'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHi ? 'Game Matcher Quiz' : 'Find My Game'}</span>
          </button>

          <button
            id="mini-sims-nav-button"
            onClick={onOpenMiniSims}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition shadow-sm ${
              activeView === 'mini_sims'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25 ring-2 ring-indigo-400'
                : 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>{isHi ? '🎮 Mini Sim Sandboxes' : '🎮 Playable Mini-Sims'}</span>
          </button>

          <button
            id="random-spinner-button"
            onClick={onOpenSpinner}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
          >
            <Dices className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? '🎲 Surprise Me' : '🎲 Random Pick'}</span>
          </button>

          {/* Desktop Language Switcher */}
          <button
            id="desktop-lang-toggle"
            onClick={onToggleLanguage}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition"
            title="Switch language between English and Hindi"
          >
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span>{isHi ? 'English' : 'हिन्दी'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
