import React, { useState, useMemo } from 'react';
import { GameState, Achievement, AchievementCategory } from '../../types/game';
import { ACHIEVEMENTS_LIST } from '../../data/gameData';
import { formatINR } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Coins,
  ShieldCheck,
  Building2,
  Coffee,
  TrendingUp,
  Gift,
  Flame,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface AchievementsViewProps {
  state: GameState;
  netWorth: number;
  onClaimReward: (achievementId: string) => boolean;
  onGoToTab?: (tab: any) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  state,
  netWorth,
  onClaimReward,
  onGoToTab,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'claimable' | 'unlocked' | 'locked'>('all');
  const [justClaimedId, setJustClaimedId] = useState<string | null>(null);

  // Compute status for all achievements
  const evaluatedAchievements = useMemo(() => {
    return ACHIEVEMENTS_LIST.map((ach) => {
      const isEligible = ach.requirement(state, netWorth);
      const isUnlockedInState = state.unlockedAchievementIds?.includes(ach.id) || isEligible;
      const isClaimed = state.claimedAchievementIds?.includes(ach.id) || false;
      const isClaimable = isUnlockedInState && !isClaimed;
      const progress = ach.getProgress(state, netWorth);
      const percent = Math.min(100, Math.max(0, Math.round((progress.current / progress.target) * 100)));

      return {
        ...ach,
        isUnlocked: isUnlockedInState,
        isClaimed,
        isClaimable,
        progress,
        percent,
      };
    });
  }, [state, netWorth]);

  // Filtered list
  const filteredAchievements = useMemo(() => {
    return evaluatedAchievements.filter((ach) => {
      if (selectedCategory !== 'all' && ach.category !== selectedCategory) {
        return false;
      }
      if (statusFilter === 'claimable' && !ach.isClaimable) return false;
      if (statusFilter === 'unlocked' && !ach.isClaimed) return false;
      if (statusFilter === 'locked' && (ach.isUnlocked || ach.isClaimed)) return false;

      return true;
    });
  }, [evaluatedAchievements, selectedCategory, statusFilter]);

  // Overall Statistics
  const totalCount = ACHIEVEMENTS_LIST.length;
  const unlockedCount = evaluatedAchievements.filter((a) => a.isUnlocked).length;
  const claimedCount = evaluatedAchievements.filter((a) => a.isClaimed).length;
  const claimableCount = evaluatedAchievements.filter((a) => a.isClaimable).length;

  const totalRewardsClaimed = evaluatedAchievements
    .filter((a) => a.isClaimed)
    .reduce((acc, a) => acc + a.rewardCash, 0);

  const totalRewardsWaiting = evaluatedAchievements
    .filter((a) => a.isClaimable)
    .reduce((acc, a) => acc + a.rewardCash, 0);

  const overallPercent = Math.round((unlockedCount / totalCount) * 100);

  // Derive Current Financial Title / Rank based on achievements
  const currentRank = useMemo(() => {
    if (evaluatedAchievements.find((a) => a.id === 'deca_crorepati')?.isUnlocked) {
      return {
        title: isHi ? 'अमर बिज़नेस लीजेंड (₹10 Cr+)' : 'Generational Legend (₹10 Cr+)',
        color: isDark ? 'text-amber-300' : 'text-amber-600',
      };
    }
    if (evaluatedAchievements.find((a) => a.id === 'coffee_crorepati')?.isUnlocked) {
      return {
        title: isHi ? 'कॉफ़ी करोड़पति टाइकून' : 'Coffee Crorepati Tycoon',
        color: isDark ? 'text-amber-400' : 'text-amber-700',
      };
    }
    if (evaluatedAchievements.find((a) => a.id === 'multi_millionaire')?.isUnlocked) {
      return {
        title: isHi ? 'फाइनेंशियल टाइटन' : 'Multi-Millionaire Titan',
        color: isDark ? 'text-purple-400' : 'text-purple-700',
      };
    }
    if (evaluatedAchievements.find((a) => a.id === 'first_millionaire')?.isUnlocked) {
      return {
        title: isHi ? 'सेल्फ-मेड मिलियनेयर' : 'Self-Made Millionaire',
        color: isDark ? 'text-emerald-400' : 'text-emerald-700',
      };
    }
    if (evaluatedAchievements.find((a) => a.id === 'first_lakhpati')?.isUnlocked) {
      return {
        title: isHi ? 'लखपति बरिस्ता' : 'Rising Lakhpati',
        color: isDark ? 'text-blue-400' : 'text-blue-700',
      };
    }
    return {
      title: isHi ? 'शुरुआती उद्यमी' : 'Rookie Entrepreneur',
      color: isDark ? 'text-slate-300' : 'text-stone-700',
    };
  }, [evaluatedAchievements, isHi, isDark]);

  const handleClaim = (id: string) => {
    setJustClaimedId(id);
    onClaimReward(id);
    setTimeout(() => {
      setJustClaimedId(null);
    }, 1500);
  };

  const handleClaimAll = () => {
    evaluatedAchievements.forEach((ach) => {
      if (ach.isClaimable) {
        onClaimReward(ach.id);
      }
    });
  };

  const categories = [
    { id: 'all', labelEn: 'All Milestones', labelHi: 'सभी माइलस्टोन्स', icon: <Trophy className="w-4 h-4" /> },
    { id: 'wealth', labelEn: '💰 Wealth & Millions', labelHi: '💰 संपत्ति व मिलियनेयर', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'debt', labelEn: '🛡️ Debt-Free & CIBIL', labelHi: '🛡️ कर्ज़-मुक्ति व CIBIL', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'real_estate', labelEn: '🏢 Real Estate & Assets', labelHi: '🏢 रियल एस्टेट मुग़ल', icon: <Building2 className="w-4 h-4" /> },
    { id: 'business', labelEn: '☕ Cafe Empire', labelHi: '☕ कैफ़े एम्पायर', icon: <Coffee className="w-4 h-4" /> },
  ];

  return (
    <div id="achievements_view" className={`space-y-4 sm:space-y-6 pb-6 ${isDark ? 'text-white' : 'text-stone-900'}`}>
      
      {/* 1. Hero Milestone Master Card */}
      <div
        className={`border rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border-amber-500/30'
            : 'bg-gradient-to-br from-white via-amber-50/70 to-amber-100/50 border-amber-200 shadow-amber-950/5'
        }`}
      >
        {/* Subtle Background Glow Accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Left: Rank & Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-3xl sm:text-4xl shadow-lg border border-amber-400/40 flex-shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {isHi ? 'वित्तीय उपलब्धियां एवं सम्मान' : 'Financial Milestones & Badges'}
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                <span>{isHi ? 'वर्तमान उपाधि:' : 'Prestige Title:'}</span>
                <span className={currentRank.color}>{currentRank.title}</span>
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                {isHi
                  ? `आपने ${totalCount} में से ${unlockedCount} वित्तीय लक्ष्य पूरे किए हैं।`
                  : `You have completed ${unlockedCount} of ${totalCount} financial milestones.`}
              </p>
            </div>
          </div>

          {/* Right: Quick Action Claim All */}
          {claimableCount > 0 && (
            <button
              id="claim_all_achievements_btn"
              onClick={handleClaimAll}
              className="w-full md:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 border border-emerald-300/40 flex items-center justify-center gap-2 transition transform active:scale-95 cursor-pointer animate-bounce"
            >
              <Gift className="w-4 h-4" />
              <span>
                {isHi
                  ? `सभी ${claimableCount} नकद इनाम क्लेम करें (${formatINR(totalRewardsWaiting)})`
                  : `Claim All ${claimableCount} Rewards (${formatINR(totalRewardsWaiting)})`}
              </span>
            </button>
          )}

        </div>

        {/* Master Progress Bar */}
        <div className={`mt-5 pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-amber-200/80'}`}>
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              {isHi ? 'कुल वित्तीय प्रगति' : 'Total Financial Mastery'}
            </span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{unlockedCount} / {totalCount} ({overallPercent}%)</span>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-amber-100 border-amber-300/60'}`}>
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-400 rounded-full transition-all duration-500 shadow-lg shadow-amber-500/30"
              style={{ width: `${overallPercent}%` }}
            />
          </div>

          {/* 3 Metric Pills */}
          <div className={`grid grid-cols-3 gap-2 mt-4 pt-3 border-t ${isDark ? 'border-slate-800/60' : 'border-amber-200/60'}`}>
            <div className={`rounded-xl p-2.5 border text-center ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white/80 border-stone-200 shadow-sm'}`}>
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'अनलॉक' : 'Unlocked'}</span>
              <span className={`text-base font-black font-mono ${isDark ? 'text-white' : 'text-stone-900'}`}>{unlockedCount} / {totalCount}</span>
            </div>
            <div className={`rounded-xl p-2.5 border text-center ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white/80 border-stone-200 shadow-sm'}`}>
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'इनाम कमाया' : 'Rewards Won'}</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">{formatINR(totalRewardsClaimed)}</span>
            </div>
            <div className={`rounded-xl p-2.5 border text-center ${isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-white/80 border-stone-200 shadow-sm'}`}>
              <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'क्लेम बाकी' : 'Unclaimed'}</span>
              <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono">{claimableCount}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Category & Filter Nav Bar */}
      <div className="space-y-3">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`ach_category_${cat.id}`}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id as any);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                    : isDark
                    ? 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800'
                    : 'bg-white text-stone-600 hover:text-stone-900 border-stone-200 shadow-xs'
                }`}
              >
                {cat.icon}
                <span>{isHi ? cat.labelHi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Status Filters */}
        <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
          <div className="flex items-center gap-1">
            <Filter className={`w-3.5 h-3.5 ${isDark ? 'text-slate-500' : 'text-stone-400'}`} />
            <span>{isHi ? 'फ़िल्टर:' : 'Filter:'}</span>
          </div>

          <div className={`flex items-center gap-1 p-1 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200 shadow-xs'}`}>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                statusFilter === 'all'
                  ? isDark
                    ? 'bg-slate-800 text-white'
                    : 'bg-stone-200 text-stone-900 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {isHi ? 'सभी' : 'All'}
            </button>
            <button
              onClick={() => setStatusFilter('claimable')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer ${
                statusFilter === 'claimable'
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-emerald-300'
                  : 'text-stone-500 hover:text-emerald-700'
              }`}
            >
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>{isHi ? 'क्लेम योग्य' : 'Claimable'}</span>
              {claimableCount > 0 && (
                <span className="w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {claimableCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setStatusFilter('unlocked')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                statusFilter === 'unlocked'
                  ? isDark
                    ? 'bg-slate-800 text-white'
                    : 'bg-stone-200 text-stone-900 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {isHi ? 'प्राप्त' : 'Completed'}
            </button>
            <button
              onClick={() => setStatusFilter('locked')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                statusFilter === 'locked'
                  ? isDark
                    ? 'bg-slate-800 text-white'
                    : 'bg-stone-200 text-stone-900 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {isHi ? 'प्रगति पर' : 'In Progress'}
            </button>
          </div>
        </div>

      </div>

      {/* 3. Achievements List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {filteredAchievements.map((ach) => {
          const isJustClaimed = justClaimedId === ach.id;

          let cardStyle = isDark
            ? 'bg-slate-900/90 border-slate-800/90 hover:border-slate-700'
            : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm';

          if (ach.isClaimable) {
            cardStyle = isDark
              ? 'bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
              : 'bg-gradient-to-br from-white via-emerald-50/60 to-white border-emerald-300 shadow-md shadow-emerald-900/5 ring-1 ring-emerald-400/40';
          } else if (ach.isClaimed) {
            cardStyle = isDark
              ? 'bg-slate-900/70 border-slate-800/60 opacity-90'
              : 'bg-stone-50/80 border-stone-200 opacity-95';
          }

          return (
            <div
              key={ach.id}
              id={`achievement_card_${ach.id}`}
              className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${cardStyle}`}
            >
              {/* Claimed stamp indicator */}
              {ach.isClaimed && (
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              )}

              <div>
                
                {/* Card Top: Icon, Title & Status */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md border flex-shrink-0 ${
                      ach.isUnlocked || ach.isClaimed
                        ? isDark
                          ? 'bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-amber-500/40 text-amber-300'
                          : 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 text-amber-800'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-500'
                        : 'bg-stone-100 border-stone-200 text-stone-400'
                    }`}
                  >
                    {ach.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className={`text-base font-bold tracking-tight truncate ${isDark ? 'text-white' : 'text-stone-900'}`}>
                        {isHi ? ach.title.hi : ach.title.en}
                      </h3>
                      {ach.isClaimed ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          {isHi ? 'पूर्ण' : 'Awarded'}
                        </span>
                      ) : ach.isClaimable ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 flex items-center gap-1 flex-shrink-0 animate-pulse">
                          <Sparkles className="w-3 h-3" />
                          {isHi ? 'इनाम तैयार' : 'Ready to Claim'}
                        </span>
                      ) : (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 flex-shrink-0 ${
                          isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-stone-100 text-stone-500 border-stone-200'
                        }`}>
                          <Lock className="w-3 h-3" />
                          {isHi ? 'लॉक्ड' : 'Locked'}
                        </span>
                      )}
                    </div>

                    <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                      {isHi ? ach.description.hi : ach.description.en}
                    </p>

                    {/* Badge Title Award */}
                    {ach.rewardBadgeTitle && (
                      <div className="mt-1.5 flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-300/90 font-medium">
                        <Award className="w-3 h-3 text-amber-500" />
                        <span>{isHi ? 'उपाधि:' : 'Prestige Badge:'} {isHi ? ach.rewardBadgeTitle.hi : ach.rewardBadgeTitle.en}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={`mt-4 rounded-xl p-2.5 border ${isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-stone-50 border-stone-200'}`}>
                  <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                    <span className={`truncate ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      {ach.progress.formattedText || `${ach.progress.current} / ${ach.progress.target}`}
                    </span>
                    <span className={`font-mono font-bold ${ach.percent === 100 ? 'text-emerald-600 dark:text-emerald-400' : isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                      {ach.percent}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-stone-200'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        ach.percent === 100
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600'
                      }`}
                      style={{ width: `${ach.percent}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Card Footer: Reward Info & Action Button */}
              <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
                
                {/* Reward Cash Badge */}
                <div className="flex items-center gap-1.5 text-xs">
                  <Coins className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-300 text-sm">
                    +{formatINR(ach.rewardCash)}
                  </span>
                  <span className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                    {isHi ? 'नकद बोनस' : 'Cash Bonus'}
                  </span>
                </div>

                {/* Action Button */}
                {ach.isClaimed ? (
                  <div className={`text-xs font-semibold flex items-center gap-1 py-1.5 px-3 rounded-xl border ${
                    isDark ? 'text-slate-400 bg-slate-800/50 border-slate-800' : 'text-stone-500 bg-stone-100 border-stone-200'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{isHi ? 'प्राप्त हुआ' : 'Claimed'}</span>
                  </div>
                ) : ach.isClaimable ? (
                  <button
                    id={`claim_btn_${ach.id}`}
                    onClick={() => handleClaim(ach.id)}
                    className={`px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 border border-emerald-300/40 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer ${
                      isJustClaimed ? 'scale-105 ring-2 ring-white' : ''
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{isHi ? `क्लेम ₹${ach.rewardCash.toLocaleString('en-IN')}` : `Claim ${formatINR(ach.rewardCash)}`}</span>
                  </button>
                ) : (
                  <div className={`text-[11px] font-medium flex items-center gap-1 py-1.5 px-2.5 rounded-xl border ${
                    isDark ? 'text-slate-400 bg-slate-950/60 border-slate-800/80' : 'text-stone-500 bg-stone-100 border-stone-200'
                  }`}>
                    <Lock className={`w-3 h-3 ${isDark ? 'text-slate-500' : 'text-stone-400'}`} />
                    <span>{isHi ? 'प्रगति पर है' : 'In Progress'}</span>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* Empty State if filter returns nothing */}
      {filteredAchievements.length === 0 && (
        <div className={`text-center py-12 rounded-2xl border p-6 space-y-3 ${
          isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          <Trophy className={`w-10 h-10 mx-auto ${isDark ? 'text-slate-600' : 'text-stone-300'}`} />
          <h4 className={`text-base font-bold ${isDark ? 'text-slate-300' : 'text-stone-800'}`}>
            {isHi ? 'कोई उपलब्धि नहीं मिली' : 'No Milestones Found in this Filter'}
          </h4>
          <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            {isHi
              ? 'कृपया फ़िल्टर बदलें या खेल में आगे बढ़कर नई वित्तीय उपलब्धियां हासिल करें।'
              : 'Try changing the category or status filter above to view your financial milestones.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setStatusFilter('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
              isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700' : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
            }`}
          >
            {isHi ? 'सभी माइलस्टोन्स देखें' : 'Show All Milestones'}
          </button>
        </div>
      )}

    </div>
  );
};
