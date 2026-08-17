import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { FINANCIAL_QUIZZES } from '../../data/gameData';
import { formatINR } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  Sparkles,
  Award,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  TrendingUp,
  X,
  Lightbulb,
} from 'lucide-react';

interface FinancialAdvisorModalProps {
  state: GameState;
  onClose: () => void;
  onAnswerQuiz: (quizId: string, optionIndex: number) => boolean;
}

export const FinancialAdvisorModal: React.FC<FinancialAdvisorModalProps> = ({
  state,
  onClose,
  onAnswerQuiz,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const [selectedQuizId, setSelectedQuizId] = useState<string>(FINANCIAL_QUIZZES[0].id);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const activeQuiz = FINANCIAL_QUIZZES.find((q) => q.id === selectedQuizId) || FINANCIAL_QUIZZES[0];
  const isCompleted = state.completedQuizIds.includes(activeQuiz.id);

  const handleOptionSubmit = (idx: number) => {
    setSelectedOption(idx);
    const success = onAnswerQuiz(activeQuiz.id, idx);
    setQuizResult({
      isCorrect: success,
      explanation: isHi ? activeQuiz.explanation.hi : activeQuiz.explanation.en,
    });
  };

  // Generate Dynamic Portfolio Advice
  const adviceList: { icon: string; title: string; desc: string; type: 'warn' | 'good' | 'info' }[] = [];

  if (state.activeLoans.length > 0) {
    const totalDebt = state.activeLoans.reduce((acc, l) => acc + l.remainingAmount, 0);
    if (totalDebt > state.cash * 2) {
      adviceList.push({
        icon: '⚠️',
        title: isHi ? 'कर्ज़ का दबाव ज्यादा है' : 'High Debt to Cash Ratio',
        desc: isHi
          ? 'आपके पास नकद राशि की तुलना में बैंक कर्ज़ ज्यादा है। गैर-जरूरी खर्चे रोकें और समय पर ईएमआई भरें।'
          : 'Your bank debt is significantly higher than your liquid cash reserves. Focus on steady EMI payoffs.',
        type: 'warn',
      });
    }
  }

  const luxuryKeys = Object.keys(state.purchasedLuxuries);
  if (luxuryKeys.length > 0) {
    adviceList.push({
      icon: '🏎️',
      title: isHi ? 'लग्जरी मेंटेनेंस पर नज़र रखें' : 'Luxury Drain Active',
      desc: isHi
        ? 'आपने लग्जरी गाड़ियां/घड़ी खरीदी हैं जो रोज़ मेंटेनेंस खर्च कराती हैं। इन्हें तभी रखें जब पैसिव इनकम इन खर्चों से दोगुनी हो जाए।'
        : 'Ensure your passive rental and dividend income easily covers all luxury upkeep costs.',
      type: 'info',
    });
  }

  const realEstateKeys = Object.keys(state.realEstateOwned).filter((k) => state.realEstateOwned[k].count > 0);
  if (realEstateKeys.length > 0) {
    adviceList.push({
      icon: '🏢',
      title: isHi ? 'शानदार! रियल एस्टेट से पैसिव इनकम' : 'Great Real Estate Strategy',
      desc: isHi
        ? 'किराये की प्रॉपर्टी आपको सोते हुए भी पैसा कमा कर दे रही है। यह फाइनेंशियल फ्रीडम का सबसे पक्का रास्ता है।'
        : 'Your rental properties are producing reliable automated cash flow every single day.',
      type: 'good',
    });
  } else {
    adviceList.push({
      icon: '🎯',
      title: isHi ? 'पहला रियल एस्टेट लक्ष्य बनाएं' : 'Target Real Estate Ownership',
      desc: isHi
        ? 'कॉफ़ी के मुनाफे को इकट्ठा करके अपनी पहली 1BHK रेंटल प्रॉपर्टी या दुकान खरीदें ताकि पैसिव किराया शुरू हो।'
        : 'Accumulate cash reserves to acquire your first cash-flowing commercial outlet or studio.',
      type: 'info',
    });
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className={`border rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl my-auto space-y-5 transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-amber-950/10'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 text-indigo-500 rounded-xl border border-indigo-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-black ${isDark ? 'text-amber-200' : 'text-stone-900'}`}>
                {isHi ? 'चाणक्य वित्तीय सलाहकार एवं क्विज़' : 'Financial Advisor & Wisdom Hub'}
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {isHi ? 'पैसे का सही उपयोग सीखें और क्विज़ खेलकर नकद इनाम जीतें' : 'Master money management & earn cash rewards from quizzes'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition cursor-pointer border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border-stone-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisor Live Insights */}
        <div className="space-y-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{isHi ? 'आपके पोर्टफोलियो पर चाणक्य की सलाह:' : 'Live Portfolio Health Insights:'}</span>
          </h3>

          <div className="grid gap-2">
            {adviceList.map((adv, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                  adv.type === 'warn'
                    ? isDark
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                    : adv.type === 'good'
                    ? isDark
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                <span className="text-lg flex-shrink-0">{adv.icon}</span>
                <div>
                  <h4 className={`font-bold ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>{adv.title}</h4>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial IQ Quizzes Section */}
        <div className={`rounded-2xl p-4 border space-y-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-300 font-bold text-xs sm:text-sm">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{isHi ? 'वित्तीय बुद्धिमत्ता क्विज़ (Financial IQ Quizzes)' : 'Financial IQ Quizzes'}</span>
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              {isHi ? 'सही उत्तर पर तुरंत नकद इनाम!' : 'Instant Cash Rewards!'}
            </span>
          </div>

          {/* Quiz Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {FINANCIAL_QUIZZES.map((q, idx) => {
              const done = state.completedQuizIds.includes(q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuizId(q.id);
                    setSelectedOption(null);
                    setQuizResult(null);
                    sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                    selectedQuizId === q.id
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : done
                      ? isDark
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                      : 'bg-white text-stone-600 hover:text-stone-900 border-stone-200'
                  }`}
                >
                  <span>{isHi ? `प्रश्न ${idx + 1}` : `Quiz ${idx + 1}`}</span>
                  {done && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                </button>
              );
            })}
          </div>

          {/* Active Question Box */}
          <div className="pt-2">
            <div className="flex justify-between items-start mb-2">
              <h4 className={`font-bold text-xs sm:text-sm ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                {isHi ? activeQuiz.question.hi : activeQuiz.question.en}
              </h4>
              <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                +{formatINR(activeQuiz.rewardCash)}
              </span>
            </div>

            {/* Options */}
            <div className="grid gap-2 mb-3">
              {activeQuiz.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === activeQuiz.correctIndex;

                let btnStyle = isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  : 'bg-white border-stone-200 hover:border-stone-300 text-stone-800';

                if (isCompleted) {
                  btnStyle = isCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-bold'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                    : isDark
                    ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                    : 'bg-stone-100 border-stone-200 text-stone-400 opacity-60';
                } else if (isSelected) {
                  btnStyle = isCorrect
                    ? isDark
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold'
                      : 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                    : isDark
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-800';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (!isCompleted) handleOptionSubmit(optIdx);
                    }}
                    disabled={isCompleted}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition flex items-start gap-2 cursor-pointer ${btnStyle}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{isHi ? opt.hi : opt.en}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Feedback */}
            {(quizResult || isCompleted) && (
              <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-200' : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}>
                <span className="font-bold text-amber-600 dark:text-amber-300 block">
                  💡 {isHi ? 'वित्तीय सबक (Financial Lesson):' : 'Financial Lesson:'}
                </span>
                <p>{isHi ? activeQuiz.explanation.hi : activeQuiz.explanation.en}</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
