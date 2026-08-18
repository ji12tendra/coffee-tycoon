import React from 'react';
import { GameTab } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Coffee,
  Scale,
  TrendingUp,
  Landmark,
  FileSpreadsheet,
  Users,
  Trophy,
} from 'lucide-react';

interface NavigationBottomProps {
  activeTab: GameTab;
  onSelectTab: (tab: GameTab) => void;
  isHi: boolean;
  activeLoanCount: number;
  unclaimedAchievementsCount?: number;
  theme?: 'light' | 'dark';
}

export const NavigationBottom: React.FC<NavigationBottomProps> = ({
  activeTab,
  onSelectTab,
  isHi,
  activeLoanCount,
  unclaimedAchievementsCount = 0,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';
  const tabs: { id: GameTab; labelEn: string; labelHi: string; icon: React.ReactNode; badge?: number; badgeColor?: string }[] = [
    {
      id: 'shop',
      labelEn: 'Cafe',
      labelHi: 'कैफ़े',
      icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'operations',
      labelEn: 'P&L',
      labelHi: 'P&L/स्टाफ',
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'reinvest',
      labelEn: 'Assets',
      labelHi: 'एसेट्स',
      icon: <Scale className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'investments',
      labelEn: 'Invest',
      labelHi: 'इन्वेस्ट',
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
    {
      id: 'banking',
      labelEn: 'Banking',
      labelHi: 'बैंक/लोन',
      icon: <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: activeLoanCount > 0 ? activeLoanCount : undefined,
      badgeColor: 'bg-indigo-500',
    },
    {
      id: 'achievements',
      labelEn: 'Badges',
      labelHi: 'अवॉर्ड्स',
      icon: <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />,
      badge: unclaimedAchievementsCount > 0 ? unclaimedAchievementsCount : undefined,
      badgeColor: 'bg-amber-500 animate-pulse',
    },
    {
      id: 'balance_sheet',
      labelEn: 'Balance',
      labelHi: 'बैलेंस शीट',
      icon: <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />,
    },
  ];

  return (
    <nav
      id="game_nav_bottom"
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t px-1 sm:px-3 pt-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] transition-colors shadow-lg w-full max-w-full overflow-hidden ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-white'
          : 'bg-[#fcfbf9]/95 border-amber-900/10 text-stone-900 shadow-stone-900/10'
      }`}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-0.5 sm:gap-1 w-full overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav_tab_${tab.id}`}
              onClick={() => {
                sound.playClick();
                onSelectTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 sm:py-1.5 px-0.5 sm:px-1 rounded-xl transition-all select-none flex-1 min-w-0 max-w-[75px] sm:max-w-[100px] cursor-pointer ${
                isActive
                  ? isDark
                    ? 'text-amber-400 font-black bg-amber-500/15 shadow-sm'
                    : 'text-amber-800 font-black bg-amber-500/15 shadow-sm border border-amber-300/60'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 font-semibold'
                  : 'text-stone-500 hover:text-stone-900 font-semibold hover:bg-stone-100/70'
              }`}
            >
              {/* Top Active Indicator */}
              {isActive && (
                <span className="absolute -top-1 w-5 sm:w-8 h-0.5 sm:h-1 bg-amber-500 rounded-full shadow-amber-500/50 shadow-sm" />
              )}

              <div className="relative mb-0.5 flex-shrink-0">
                {tab.icon}
                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-2 ${
                      tab.badgeColor || 'bg-indigo-500'
                    } text-white text-[7.5px] sm:text-[9px] font-mono font-black w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center border ${
                      isDark ? 'border-slate-900' : 'border-white shadow-sm'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[7.5px] sm:text-[10px] leading-none text-center truncate max-w-full tracking-tighter">
                {isHi ? tab.labelHi : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
