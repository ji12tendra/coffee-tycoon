import React, { useState, useEffect } from 'react';
import { Play, Sparkles, X, CheckCircle, Volume2, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface AdRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardGranted: () => void;
  title: { en: string; hi: string };
  rewardDescription: { en: string; hi: string };
  sponsorName?: string;
  isDark?: boolean;
}

const SPONSORS = [
  {
    brand: 'Bharat Pay & SoundBox',
    tagline: 'Instant QR sound alerts for smart merchants',
    category: 'Fintech & Business',
    color: 'from-blue-600 to-indigo-700',
    icon: '💳',
  },
  {
    brand: 'Coorg Artisan Bean Roasters',
    tagline: 'Direct-from-farm single origin Arabica coffee beans',
    category: 'FMCG Supply Chain',
    color: 'from-amber-600 to-amber-800',
    icon: '☕',
  },
  {
    brand: 'Swiggy & Zomato Partner Pro',
    tagline: 'Grow your cafe delivery sales by 300% this festive season',
    category: 'Online Food Delivery',
    color: 'from-orange-500 to-red-600',
    icon: '🛵',
  },
  {
    brand: 'Tycoon Capital Business Loan',
    tagline: 'Zero collateral, 100% paperless fast credit line for SMEs',
    category: 'Commercial Banking',
    color: 'from-emerald-600 to-teal-800',
    icon: '🏦',
  },
];

export const AdRewardModal: React.FC<AdRewardModalProps> = ({
  isOpen,
  onClose,
  onRewardGranted,
  title,
  rewardDescription,
  isDark = false,
}) => {
  const [isPlayingAd, setIsPlayingAd] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sponsor] = useState(() => SPONSORS[Math.floor(Math.random() * SPONSORS.length)]);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsPlayingAd(false);
      setCountdown(5);
      setRewardClaimed(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: any;
    if (isPlayingAd && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (isPlayingAd && countdown === 0 && !rewardClaimed) {
      setRewardClaimed(true);
      sound.playChaChing();
    }
    return () => clearInterval(timer);
  }, [isPlayingAd, countdown, rewardClaimed]);

  if (!isOpen) return null;

  const handleStartAd = () => {
    sound.playClick();
    setIsPlayingAd(true);
  };

  const handleClaim = () => {
    sound.playUpgrade();
    onRewardGranted();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border transition-all ${
          isDark
            ? 'bg-slate-900 border-amber-500/40 text-slate-100'
            : 'bg-white border-amber-500/50 text-stone-900'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Sponsored Booster
            </span>
            <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Safe Rewarded Video
            </span>
          </div>
          {!isPlayingAd && (
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 text-center space-y-4">
          {!isPlayingAd ? (
            <>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 text-white animate-bounce">
                🎁
              </div>

              <div className="space-y-1.5">
                <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-amber-300' : 'text-stone-900'}`}>
                  {title.hi}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 py-1 px-3 rounded-full inline-block border border-emerald-500/30">
                  ⚡ {rewardDescription.hi}
                </p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-stone-500'} pt-1`}>
                  {title.en} • {rewardDescription.en}
                </p>
              </div>

              {/* Sponsor Preview Card */}
              <div
                className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl shrink-0">
                  {sponsor.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{sponsor.brand}</span>
                    <span className="text-[10px] text-amber-500 font-semibold uppercase">{sponsor.category}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-slate-400 truncate">{sponsor.tagline}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleStartAd}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-sm transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>5-सेकंड वीडियो स्पॉन्सर देखें (Watch & Get Boost)</span>
              </button>
            </>
          ) : (
            /* Video Simulation Player */
            <div className="space-y-4 py-2">
              <div
                className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${sponsor.color} p-4 sm:p-5 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 border border-white/20">
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" /> Ad Playing...
                  </span>
                  <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full font-mono font-bold text-amber-300 border border-white/20">
                    {countdown > 0 ? `Reward in ${countdown}s` : '✅ Reward Ready!'}
                  </span>
                </div>

                <div className="text-center my-auto space-y-1">
                  <div className="text-4xl">{sponsor.icon}</div>
                  <h4 className="text-lg sm:text-xl font-black drop-shadow-md">{sponsor.brand}</h4>
                  <p className="text-xs text-white/90 font-medium max-w-xs mx-auto drop-shadow">
                    {sponsor.tagline}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/20">
                  <div
                    className="bg-amber-400 h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>
              </div>

              {countdown > 0 ? (
                <p className="text-xs font-semibold text-stone-500 dark:text-slate-400">
                  वीडियो पूरा होते ही रिवॉर्ड अपने आप क्रेडिट हो जाएगा... ({countdown}s)
                </p>
              ) : (
                <button
                  onClick={handleClaim}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>इनाम प्राप्त करें (Claim Reward Now)</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
