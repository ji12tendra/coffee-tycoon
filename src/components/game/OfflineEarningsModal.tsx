import React, { useState } from 'react';
import { formatINR } from '../../utils/formatters';
import { Coffee, TrendingUp, Sparkles, Check, Play, Zap } from 'lucide-react';
import { AdRewardModal } from './AdRewardModal';
import { sound } from '../../utils/audio';

interface OfflineEarningsModalProps {
  data: {
    hoursAway: number;
    cupsServed: number;
    cashEarned: number;
    passiveEarned: number;
    expensesPaid: number;
    netCashChange: number;
  };
  isHi: boolean;
  isDark?: boolean;
  onClose: () => void;
  onClaimMultiplier?: (multiplier: number) => void;
}

export const OfflineEarningsModal: React.FC<OfflineEarningsModalProps> = ({
  data,
  isHi,
  isDark = false,
  onClose,
  onClaimMultiplier,
}) => {
  const [showAdModal, setShowAdModal] = useState(false);
  const tripleEarnings = Math.max(0, data.netCashChange * 3);

  const handleClaimTriple = () => {
    if (onClaimMultiplier) {
      onClaimMultiplier(3);
    }
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
        <div
          className={`border-2 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 text-center transition-colors ${
            isDark
              ? 'bg-slate-900 border-amber-500/40 text-white'
              : 'bg-white border-amber-500/60 text-stone-900 shadow-amber-950/10'
          }`}
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 flex items-center justify-center text-3xl animate-bounce">
            ☕
          </div>

          <div>
            <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-amber-200' : 'text-stone-900'}`}>
              {isHi ? 'वापसी पर स्वागत है, बॉस!' : 'Welcome Back, Boss!'}
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
              {isHi
                ? `आपके जाने के बाद भी आपके स्टाफ और रेंटल प्रॉपर्टीज ने कमाई जारी रखी!`
                : `Your automated baristas and rental properties were working while you were away!`}
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border space-y-2 text-xs ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex justify-between">
              <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>
                {isHi ? 'बेचे गए कॉफ़ी कप:' : 'Cups Brewed & Sold:'}
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-300">{data.cupsServed} cups</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>
                {isHi ? 'कॉफ़ी बिक्री कमाई:' : 'Coffee Revenue:'}
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                +{formatINR(data.cashEarned)}
              </span>
            </div>
            {data.passiveEarned > 0 && (
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>
                  {isHi ? 'रियल एस्टेट किराया:' : 'Real Estate Rent:'}
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-300">
                  +{formatINR(data.passiveEarned)}
                </span>
              </div>
            )}
            {data.expensesPaid > 0 && (
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-stone-500'}>
                  {isHi ? 'लग्जरी मेंटेनेंस:' : 'Luxury Maintenance:'}
                </span>
                <span className="font-mono font-bold text-rose-500 dark:text-rose-400">
                  -{formatINR(data.expensesPaid)}
                </span>
              </div>
            )}

            <div
              className={`pt-2 border-t flex justify-between font-bold text-sm ${
                isDark ? 'border-slate-800' : 'border-stone-200'
              }`}
            >
              <span className={isDark ? 'text-slate-200' : 'text-stone-800'}>
                {isHi ? 'सामान्य शुद्ध कमाई:' : 'Base Earnings:'}
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-300 text-base font-black">
                +{formatINR(data.netCashChange)}
              </span>
            </div>
          </div>

          {/* High-Converting 3x Reward Video Option */}
          <button
            onClick={() => setShowAdModal(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transform active:scale-95 border border-yellow-300/40 animate-pulse"
          >
            <Zap className="w-5 h-5 fill-slate-950" />
            <span>
              {isHi
                ? `📺 1 एड देखें & 3X ( ${formatINR(tripleEarnings)} ) पाएं!`
                : `📺 Watch Ad & Claim 3X ( ${formatINR(tripleEarnings)} )!`}
            </span>
          </button>

          {/* Standard 1x Claim Button */}
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white bg-slate-800/60' : 'text-stone-500 hover:text-stone-800 bg-stone-100'
            }`}
          >
            {isHi ? `नहीं, केवल सामान्य +${formatINR(data.netCashChange)} लें` : `No thanks, just claim +${formatINR(data.netCashChange)}`}
          </button>
        </div>
      </div>

      {/* Video Ad Modal */}
      <AdRewardModal
        isOpen={showAdModal}
        onClose={() => setShowAdModal(false)}
        onRewardGranted={handleClaimTriple}
        isDark={isDark}
        title={{
          en: 'Triple Your Offline Cafe Earnings',
          hi: 'अपनी अनुपस्थिति की कमाई 3 गुना (3X) करें',
        }}
        rewardDescription={{
          en: `Get +${formatINR(tripleEarnings)} instant cash directly credited to business account!`,
          hi: `तुरंत +${formatINR(tripleEarnings)} नकद खाते में जमा होगा!`,
        }}
      />
    </>
  );
};

