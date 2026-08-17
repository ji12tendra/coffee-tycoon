import React, { useState } from 'react';
import { InteractiveDailyEvent, GameState } from '../../types/game';
import { formatINR } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  X,
  CreditCard,
  Landmark,
  Wallet,
  CheckCircle2,
} from 'lucide-react';

interface InteractiveEventModalProps {
  event: InteractiveDailyEvent;
  state: GameState;
  onSelectChoice: (choiceId: string, paymentMethod?: 'cash' | 'credit_card' | 'emergency_fund') => void;
  onDismiss?: () => void;
}

export const InteractiveEventModal: React.FC<InteractiveEventModalProps> = ({
  event,
  state,
  onSelectChoice,
  onDismiss,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const [selectedPaymentForChoice, setSelectedPaymentForChoice] = useState<Record<string, 'cash' | 'credit_card' | 'emergency_fund'>>({});
  const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);

  const handleChoice = (choiceId: string) => {
    const choice = event.choices.find((c) => c.id === choiceId);
    const chosenPayment = selectedPaymentForChoice[choiceId];
    
    onSelectChoice(choiceId, chosenPayment);
    if (choice) {
      const text = isHi ? choice.outcomeText.hi : choice.outcomeText.en;
      setOutcomeMessage(text);
    }
  };

  const handleClose = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      onSelectChoice('dismiss');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        id="interactive_decision_modal"
        className={`w-full max-w-lg border-2 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto transition-colors ${
          isDark
            ? 'bg-slate-900 border-amber-500/60 text-white'
            : 'bg-white border-amber-500/70 text-stone-900 shadow-amber-950/10'
        }`}
      >
        {/* Header with Close X button */}
        <div className={`flex items-start justify-between gap-3 border-b pb-3 ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
          <div className="flex items-center gap-3">
            <div className="text-3xl p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex-shrink-0">
              {event.icon}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                {isHi ? 'व्यापारिक अवसर व निर्णय (Business Dilemma)' : 'Real-Life Business Dilemma'}
              </span>
              <h3 className={`text-base sm:text-lg font-black ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                {isHi ? event.title.hi : event.title.en}
              </h3>
            </div>
          </div>

          <button
            id="close_interactive_modal_btn"
            onClick={handleClose}
            className={`p-2 rounded-xl transition cursor-pointer border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border-stone-200'
            }`}
            title={isHi ? 'बंद करें' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario description */}
        <div className={`border rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
          isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-700'
        }`}>
          {isHi ? event.description.hi : event.description.en}
        </div>

        {/* Current Available Balances Quick Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border text-[11px] ${
          isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-700'
        }`}>
          <div className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isHi ? 'नकद:' : 'Cash:'}</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatINR(state.cash)}</span>
          </div>

          {state.emergencyFundBalance > 0 && (
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-blue-500" />
              <span>{isHi ? 'इमरजेंसी फंड:' : 'Reserve:'}</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{formatINR(state.emergencyFundBalance)}</span>
            </div>
          )}

          {(state.creditCardLimit - state.creditCardSpend) > 0 && (
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-purple-500" />
              <span>{isHi ? 'क्रेडिट कार्ड:' : 'Credit Card:'}</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{formatINR(state.creditCardLimit - state.creditCardSpend)}</span>
            </div>
          )}
        </div>

        {/* Choices */}
        <div className="space-y-3 pt-1">
          <span className={`text-[11px] font-bold uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            {isHi ? '👉 आपकी क्या रणनीति होगी? (Choose Action):' : '👉 Select Your Action Strategy:'}
          </span>

          {event.choices.map((choice) => {
            const cost = choice.costCash || 0;
            const hasEnoughCash = state.cash >= cost;
            const hasCreditLimit = (state.creditCardLimit - state.creditCardSpend) >= cost;
            const hasEmergency = state.emergencyFundBalance >= cost;
            const canAfford = cost === 0 || hasEnoughCash || hasCreditLimit || hasEmergency;

            const selectedPayment = selectedPaymentForChoice[choice.id] || (hasEnoughCash ? 'cash' : hasCreditLimit ? 'credit_card' : 'emergency_fund');

            return (
              <div
                key={choice.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  canAfford
                    ? isDark
                      ? 'bg-slate-800/80 hover:border-amber-400/80 border-slate-700/80'
                      : 'bg-stone-50 hover:border-amber-400 border-stone-200 shadow-xs'
                    : isDark
                    ? 'bg-slate-950/40 border-slate-800 opacity-60'
                    : 'bg-stone-100 border-stone-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                        {isHi ? choice.label.hi : choice.label.en}
                      </span>
                      {cost > 0 ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-300 font-bold border border-rose-500/30">
                          -{formatINR(cost)}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                          {isHi ? '₹0 मुफ्त / सुरक्षित' : '₹0 Free / Safe'}
                        </span>
                      )}
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                      {isHi ? choice.description.hi : choice.description.en}
                    </p>
                  </div>

                  {/* Action Execution Button */}
                  <button
                    id={`event_choice_${choice.id}`}
                    disabled={!canAfford}
                    onClick={() => handleChoice(choice.id)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition flex-shrink-0 cursor-pointer shadow-md ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black'
                        : isDark
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                    }`}
                  >
                    <span>{isHi ? 'यह फैसला लें' : 'Select This'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Alternative Payment Selectors if cost > 0 and cash is lower */}
                {cost > 0 && !hasEnoughCash && (hasCreditLimit || hasEmergency) && (
                  <div className={`mt-2 pt-2 border-t flex flex-wrap items-center gap-2 text-[10px] ${isDark ? 'border-slate-700/60' : 'border-stone-200'}`}>
                    <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'भुगतान स्रोत चुनें:' : 'Pay using:'}</span>
                    {hasCreditLimit && (
                      <button
                        onClick={() => setSelectedPaymentForChoice((p) => ({ ...p, [choice.id]: 'credit_card' }))}
                        className={`px-2 py-1 rounded-lg border font-bold flex items-center gap-1 transition cursor-pointer ${
                          selectedPayment === 'credit_card'
                            ? 'bg-purple-500/20 border-purple-400 text-purple-700 dark:text-purple-200'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                            : 'bg-white border-stone-300 text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>{isHi ? 'क्रेडिट कार्ड से' : 'Credit Card'}</span>
                      </button>
                    )}
                    {hasEmergency && (
                      <button
                        onClick={() => setSelectedPaymentForChoice((p) => ({ ...p, [choice.id]: 'emergency_fund' }))}
                        className={`px-2 py-1 rounded-lg border font-bold flex items-center gap-1 transition cursor-pointer ${
                          selectedPayment === 'emergency_fund'
                            ? 'bg-blue-500/20 border-blue-400 text-blue-700 dark:text-blue-200'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                            : 'bg-white border-stone-300 text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Landmark className="w-3 h-3" />
                        <span>{isHi ? 'इमरजेंसी फंड से' : 'Emergency Reserve'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Fallback Dismiss / Postpone Button */}
        <div className={`pt-2 flex items-center justify-between border-t ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
          <p className={`text-[10px] italic ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            {isHi
              ? '💡 हर फैसले का नकद और साख पर सीधा असर पड़ता है।'
              : '💡 Every entrepreneurial decision impacts your cash flow and brand reputation.'}
          </p>

          <button
            onClick={handleClose}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 border-stone-200'
            }`}
          >
            {isHi ? 'निर्णय टालें / बाद में देखें' : 'Postpone / Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};
