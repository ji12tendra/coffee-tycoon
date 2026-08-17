import React from 'react';
import { Achievement } from '../../types/game';
import { formatINR } from '../../utils/formatters';
import { Trophy, Sparkles, X, Gift, ArrowRight } from 'lucide-react';

interface AchievementUnlockedToastProps {
  achievement: Achievement;
  isHi: boolean;
  onClose: () => void;
  onViewAchievements: () => void;
  onClaim?: () => void;
}

export const AchievementUnlockedToast: React.FC<AchievementUnlockedToastProps> = ({
  achievement,
  isHi,
  onClose,
  onViewAchievements,
  onClaim,
}) => {
  return (
    <div
      id={`achievement_unlocked_toast_${achievement.id}`}
      className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-400 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-amber-500/30 text-white animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-xl"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Milestone Icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-2xl sm:text-3xl shadow-lg border border-amber-300 flex-shrink-0 animate-bounce">
          {achievement.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHi ? 'नया वित्तीय माइलस्टोन अनलॉक! 🎉' : 'Milestone Unlocked! 🎉'}</span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white tracking-tight truncate mt-0.5">
            {isHi ? achievement.title.hi : achievement.title.en}
          </h3>

          <p className="text-xs text-slate-300 mt-1 line-clamp-2">
            {isHi ? achievement.description.hi : achievement.description.en}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {onClaim && (
              <button
                onClick={onClaim}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md border border-emerald-300/50 flex items-center gap-1 cursor-pointer transition active:scale-95"
              >
                <Gift className="w-3.5 h-3.5" />
                <span>{isHi ? `नकद इनाम लें (+${formatINR(achievement.rewardCash)})` : `Claim Reward (+${formatINR(achievement.rewardCash)})`}</span>
              </button>
            )}

            <button
              onClick={onViewAchievements}
              className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1 cursor-pointer transition"
            >
              <span>{isHi ? 'सभी उपलब्धियां देखें' : 'View All Milestones'}</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
