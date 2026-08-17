import React from 'react';
import { GameState } from '../../types/game';
import { SHOP_LEVELS } from '../../data/gameData';
import { formatINR, getCibilTier } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  Volume2,
  VolumeX,
  Languages,
  Play,
  Pause,
  Zap,
  Settings,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

interface GameHeaderProps {
  state: GameState;
  netWorth: number;
  unclaimedAchievementsCount?: number;
  onOpenAchievements?: () => void;
  onToggleSound: () => void;
  onToggleLanguage: () => void;
  onTogglePause: () => void;
  onSetSpeed: (speed: 1 | 2 | 5) => void;
  onOpenSettings: () => void;
  onOpenAdvisor: () => void;
  onToggleTheme?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  state,
  netWorth,
  onToggleSound,
  onToggleLanguage,
  onTogglePause,
  onSetSpeed,
  onOpenSettings,
  onOpenAdvisor,
  onToggleTheme,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const currentLvl = SHOP_LEVELS.find((l) => l.id === state.shopLevel) || SHOP_LEVELS[0];
  const cibil = getCibilTier(state.cibilScore);

  // Format time of day
  const hour = Math.floor(state.timeOfDay);
  const minutes = Math.floor((state.timeOfDay - hour) * 60);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const timeFormatted = `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;

  return (
    <header
      id="game_header"
      className={`backdrop-blur-md sticky top-0 z-40 px-3 py-2 sm:px-6 sm:py-2.5 shadow-sm border-b transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-white'
          : 'bg-[#fcfbf9]/95 border-amber-900/10 text-stone-900 shadow-stone-900/5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Level Brand & Day Counter */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex items-center justify-center text-xl sm:text-2xl shadow-sm border border-amber-400/40 flex-shrink-0">
            {currentLvl.imageIcon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`font-black text-sm sm:text-base tracking-tight truncate ${isDark ? 'text-amber-200' : 'text-stone-900'}`}>
                {isHi ? currentLvl.name.hi : currentLvl.name.en}
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Lv.{state.shopLevel}
              </span>
            </div>
            <div className="text-xs flex items-center gap-1.5 font-medium">
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                {isHi ? `दिन ${state.day}` : `Day ${state.day}`}
              </span>
              <span className="text-stone-300 dark:text-slate-600">•</span>
              <span className={`font-mono text-[11px] ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                {timeFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Cash & Net Worth Display */}
        <div
          className={`flex items-center gap-3 sm:gap-5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border ${
            isDark
              ? 'bg-slate-950/80 border-slate-800'
              : 'bg-white border-amber-900/10 shadow-sm'
          }`}
        >
          {/* Liquid Cash */}
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider text-emerald-600 dark:text-emerald-400">
              {isHi ? 'नकद (Cash)' : 'Cash'}
            </span>
            <span className="text-sm sm:text-lg font-black text-emerald-600 dark:text-emerald-300 font-mono tracking-tight">
              {formatINR(state.cash)}
            </span>
          </div>

          <div className={`h-6 w-px ${isDark ? 'bg-slate-800' : 'bg-stone-200'}`} />

          {/* Total Net Worth */}
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider text-amber-600 dark:text-amber-400">
              {isHi ? 'नेट वर्थ' : 'Net Worth'}
            </span>
            <span className="text-sm sm:text-lg font-black text-amber-700 dark:text-amber-300 font-mono tracking-tight">
              {formatINR(netWorth, true)}
            </span>
          </div>

          <div className={`h-6 w-px hidden md:block ${isDark ? 'bg-slate-800' : 'bg-stone-200'}`} />

          {/* CIBIL Score Badge */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 dark:text-slate-400">
              CIBIL
            </span>
            <div className="flex items-center gap-1">
              <span className={`text-xs sm:text-sm font-black font-mono ${cibil.colorClass}`}>
                {state.cibilScore}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md border ${cibil.badgeBg}`}>
                {isHi ? cibil.labelHi : cibil.labelEn}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Speed & Pause Toggle Pill */}
          <div className={`flex items-center rounded-xl p-0.5 border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-stone-100 border-stone-200 shadow-inner'}`}>
            <button
              id="pause_btn"
              onClick={() => {
                sound.playClick();
                onTogglePause();
              }}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                state.isPaused
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : isDark ? 'text-slate-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
              title={state.isPaused ? 'Resume Game' : 'Pause Game'}
            >
              {state.isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              id="speed_1x"
              onClick={() => {
                sound.playClick();
                onSetSpeed(1);
              }}
              className={`px-1.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                state.gameSpeed === 1 && !state.isPaused
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              1x
            </button>
            <button
              id="speed_2x"
              onClick={() => {
                sound.playClick();
                onSetSpeed(2);
              }}
              className={`px-1.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                state.gameSpeed === 2 && !state.isPaused
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              2x
            </button>
            <button
              id="speed_5x"
              onClick={() => {
                sound.playClick();
                onSetSpeed(5);
              }}
              className={`px-1.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-0.5 transition cursor-pointer ${
                state.gameSpeed === 5 && !state.isPaused
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Zap className="w-3 h-3" />
              5x
            </button>
          </div>

          {/* AI Advisor Button */}
          <button
            id="advisor_header_btn"
            onClick={() => {
              sound.playClick();
              onOpenAdvisor();
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              isDark
                ? 'bg-indigo-600/25 hover:bg-indigo-600/40 border-indigo-500/40 text-indigo-200'
                : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900 shadow-sm'
            }`}
            title="Financial Advisor AI & Quizzes"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span className="hidden sm:inline">{isHi ? 'चाणक्य' : 'Advisor'}</span>
          </button>

          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              id="theme_toggle_btn"
              onClick={() => {
                sound.playClick();
                onToggleTheme();
              }}
              className={`p-1.5 sm:p-2 rounded-xl border transition cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                  : 'bg-white hover:bg-stone-50 text-amber-800 border-stone-200 shadow-sm'
              }`}
              title={isDark ? 'Switch to Lite Theme' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Sound Toggle */}
          <button
            id="sound_toggle_btn"
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className={`p-1.5 sm:p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-sm'
            }`}
            title={state.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {state.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Language Toggle */}
          <button
            id="lang_toggle_btn"
            onClick={() => {
              sound.playClick();
              onToggleLanguage();
            }}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 shadow-sm'
            }`}
            title="Toggle Hindi / English"
          >
            <Languages className="w-3.5 h-3.5 text-amber-500" />
            <span>{isHi ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Settings */}
          <button
            id="settings_modal_btn"
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className={`p-1.5 sm:p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-sm'
            }`}
            title="Save Game & Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
};
