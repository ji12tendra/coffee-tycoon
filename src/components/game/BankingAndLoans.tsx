import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { LOAN_PLANS } from '../../data/gameData';
import { formatINR, formatPercent, getCibilTier } from '../../utils/formatters';
import { sound } from '../../utils/audio';
import {
  Landmark,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  PiggyBank,
  Receipt,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react';

interface BankingAndLoansProps {
  state: GameState;
  onTakeLoan: (loanPlanId: string, amount: number) => void;
  onRepayPrepayment: (loanId: string, amount: number) => void;
  onDepositEmergencyFund?: (amount: number) => void;
  onWithdrawEmergencyFund?: (amount: number) => void;
  onPayCreditCardBill?: (amount: number) => void;
}

export const BankingAndLoans: React.FC<BankingAndLoansProps> = ({
  state,
  onTakeLoan,
  onRepayPrepayment,
  onDepositEmergencyFund,
  onWithdrawEmergencyFund,
  onPayCreditCardBill,
}) => {
  const isHi = state.language === 'hi';
  const isDark = state.theme === 'dark';
  const cibil = getCibilTier(state.cibilScore);

  const [selectedPlanId, setSelectedPlanId] = useState<string>(LOAN_PLANS[0].id);
  const [loanAmount, setLoanAmount] = useState<number>(50000);

  const selectedPlan = LOAN_PLANS.find((p) => p.id === selectedPlanId) || LOAN_PLANS[0];

  const interest = loanAmount * (selectedPlan.interestRateAnnual * (selectedPlan.tenureDays / 365));
  const totalRepay = Math.round(loanAmount + interest);
  const estimatedDailyEmi = Math.round(totalRepay / selectedPlan.tenureDays);

  return (
    <div id="banking_loans_container" className={`space-y-4 ${isDark ? 'text-white' : 'text-stone-900'}`}>
      
      {/* 1. CIBIL Score & Financial Health */}
      <div
        className={`rounded-3xl p-5 border shadow-xl transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-white via-indigo-50/50 to-white border-indigo-100 shadow-indigo-950/5'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 text-2xl">
              💳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                  {isHi ? 'सिबिल क्रेडिट स्कोर (CIBIL Score)' : 'CIBIL Credit Score'}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${cibil.badgeBg}`}>
                  {isHi ? cibil.labelHi : cibil.labelEn}
                </span>
              </div>
              <div className={`text-2xl sm:text-3xl font-black font-mono ${cibil.colorClass}`}>
                {state.cibilScore} / 900
              </div>
            </div>
          </div>

          <div className={`text-xs max-w-sm ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
            <p>
              {isHi
                ? '💡 नियम: समय पर ईएमआई चुकाने से सिबिल स्कोर बढ़ता है (+2 अंक)। ईएमआई बाउंस होने पर 35 अंक कटते हैं और पेनाल्टी लगती है।'
                : '💡 Rule: Disciplined on-time EMI payments boost your CIBIL rating and unlock cheaper commercial loans.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Emergency Liquid Reserve Fund & Business Credit Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Emergency Fund */}
        <div
          className={`rounded-3xl p-5 border shadow-lg space-y-3 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/80 shadow-stone-900/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <PiggyBank className="w-5 h-5 text-emerald-500" />
              <div>
                <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                  {isHi ? 'इमरजेंसी लिक्विड रिज़र्व फंड' : 'Emergency Reserve Fund'}
                </h4>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  {isHi ? '5.0% वार्षिक ब्याज (दैनिक जुड़ता है)' : '5.0% Annual Compound Interest'}
                </span>
              </div>
            </div>
            <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-300">
              {formatINR(state.emergencyFundBalance)}
            </span>
          </div>

          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            {isHi
              ? 'मंदी या संकट के दिनों के लिए 6 महीने का खर्च रिज़र्व में रखें। जब चाहें जमा या निकाल सकते हैं।'
              : 'Keep 6 months of expenses safe for unexpected downturns or equipment breakdowns.'}
          </p>

          <div className="flex gap-2">
            <button
              id="btn_deposit_emergency"
              disabled={state.cash < 1000}
              onClick={() => onDepositEmergencyFund?.(1000)}
              className="flex-1 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 text-xs font-bold transition flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer"
            >
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>{isHi ? '+ ₹1,000 जमा करें' : '+ Deposit ₹1k'}</span>
            </button>

            <button
              id="btn_withdraw_emergency"
              disabled={state.emergencyFundBalance < 1000}
              onClick={() => onWithdrawEmergencyFund?.(1000)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer border ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{isHi ? '- ₹1,000 निकालें' : '- Withdraw ₹1k'}</span>
            </button>
          </div>
        </div>

        {/* Business Credit Card */}
        <div
          className={`rounded-3xl p-5 border shadow-lg space-y-3 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/80 shadow-stone-900/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-indigo-500" />
              <div>
                <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
                  {isHi ? 'कॉर्पोरेट बिज़नेस क्रेडिट कार्ड' : 'Corporate Credit Card'}
                </h4>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                  {isHi ? '30 दिन ब्याज मुक्त (36% ओवरड्यू APR)' : '30-Day Interest Free (36% APR Overdue)'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                {isHi ? 'बकाया खर्च:' : 'Outstanding:'}
              </div>
              <div className="text-sm font-black font-mono text-rose-500 dark:text-rose-400">
                {formatINR(state.creditCardSpend)} / {formatINR(state.creditCardLimit)}
              </div>
            </div>
          </div>

          <div className={`flex justify-between text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            <span>{isHi ? 'बिल भरने में बाकी:' : 'Days until due:'} {state.creditCardDaysUntilDue} {isHi ? 'दिन' : 'days'}</span>
            <span>{isHi ? 'उपलब्ध लिमिट:' : 'Available:'} {formatINR(state.creditCardLimit - state.creditCardSpend)}</span>
          </div>

          <button
            id="btn_pay_credit_card"
            disabled={state.creditCardSpend <= 0 || state.cash < state.creditCardSpend}
            onClick={() => onPayCreditCardBill?.(state.creditCardSpend)}
            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {isHi
                ? `पूरा क्रेडिट बिल भरें (${formatINR(state.creditCardSpend)})`
                : `Pay Full Credit Card Bill (${formatINR(state.creditCardSpend)})`}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Taxes & Regulatory Compliance Tracker */}
      <div
        className={`rounded-3xl p-5 border shadow-lg flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/80 shadow-stone-900/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Receipt className="w-6 h-6 text-amber-500" />
          <div>
            <h4 className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-stone-900'}`}>
              {isHi ? 'सरकारी टैक्स व कम्प्लायंस रिकॉर्ड (GST & Income Tax)' : 'Government Tax & GST Compliance Record'}
            </h4>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi
                ? 'नियमित 5% GST और एडवांस टैक्स भरने से दुकान की कानूनी मान्यता और साख बढ़ती है।'
                : '100% compliant business with timely 5% Restaurant GST & Advance Tax filings.'}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className={`p-2.5 rounded-xl border text-right ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
            <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'कुल GST जमा:' : 'Total GST Paid:'}</span>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-300">
              {formatINR(state.gstCollectedLifetime)}
            </span>
          </div>
          <div className={`p-2.5 rounded-xl border text-right ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
            <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'कुल इनकम टैक्स जमा:' : 'Income Tax Paid:'}</span>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-300">
              {formatINR(state.advanceTaxPaidLifetime)}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Active Loans & EMI Schedule */}
      <div
        className={`rounded-3xl p-5 border shadow-lg space-y-3 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/80 shadow-stone-900/5'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>
              {isHi ? 'सक्रिय बैंक लोन एवं ईएमआई' : 'Active Bank Loans & EMI Schedule'}
            </h3>
          </div>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
            {state.activeLoans.length} {isHi ? 'लोन सक्रिय' : 'active loans'}
          </span>
        </div>

        {state.activeLoans.length === 0 ? (
          <div
            className={`p-6 text-center rounded-2xl border text-xs ${
              isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-stone-50 border-stone-200 text-stone-600'
            }`}
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
            <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>
              {isHi ? 'बधाई! आपके ऊपर कोई बैंक कर्ज़ नहीं है (Debt Free)' : 'Congratulations! You are 100% Debt Free'}
            </p>
            <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
              {isHi ? 'बिजनेस विस्तार के लिए नीचे दिए गए प्लान्स से स्मार्ट लोन ले सकते हैं।' : 'You can take low-interest business loans below to expand faster.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {state.activeLoans.map((loan) => {
              const plan = LOAN_PLANS.find((p) => p.id === loan.loanPlanId);
              const progressPct = Math.round(((loan.totalRepaymentWithInterest - loan.remainingAmount) / loan.totalRepaymentWithInterest) * 100);

              return (
                <div
                  key={loan.id}
                  className={`p-4 rounded-2xl border space-y-2.5 ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className={`font-bold text-xs sm:text-sm ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
                        {plan ? (isHi ? plan.title.hi : plan.title.en) : 'Business Loan'}
                      </h4>
                      <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                        {loan.daysRemaining} {isHi ? 'दिन बाकी' : 'days left'} • {formatPercent(loan.interestRate)} p.a.
                      </span>
                    </div>

                    <div className="text-right">
                      <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'बकाया राशि:' : 'Remaining:'}</div>
                      <div className="text-sm font-black text-rose-500 dark:text-rose-400 font-mono">
                        {formatINR(loan.remainingAmount)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className={`flex justify-between text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      <span>{isHi ? 'चुकाया:' : 'Paid:'} {progressPct}%</span>
                      <span className="text-amber-600 dark:text-amber-300 font-bold">EMI: {formatINR(loan.dailyEmi)}/day</span>
                    </div>
                    <div className={`w-full rounded-full h-2 overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-stone-200'}`}>
                      <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>

                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => onRepayPrepayment(loan.id, loan.remainingAmount)}
                      disabled={state.cash < loan.remainingAmount}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        state.cash >= loan.remainingAmount
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                          : isDark
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                      }`}
                    >
                      {isHi ? `एकमुश्त पूरा चुकाएं (${formatINR(loan.remainingAmount)})` : `Full Prepay (${formatINR(loan.remainingAmount)})`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Available Bank Loan Schemes */}
      <div
        className={`rounded-3xl p-5 border shadow-lg space-y-3 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/80 shadow-stone-900/5'
        }`}
      >
        <div className="flex items-center gap-2">
          <Landmark className="w-4 h-4 text-indigo-500" />
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>
            {isHi ? 'नए बैंक लोन प्रस्ताव (स्मार्ट बिजनेस लेवरेज)' : 'Available Business Loan Schemes'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {LOAN_PLANS.map((plan) => {
            const isEligible = state.cibilScore >= plan.minCibilRequired;
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => {
                  if (isEligible) {
                    setSelectedPlanId(plan.id);
                    setLoanAmount(Math.min(loanAmount, plan.maxAmount));
                    sound.playClick();
                  }
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                  isSelected
                    ? isDark
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg ring-1 ring-indigo-500/30'
                      : 'bg-indigo-50/70 border-indigo-400 shadow-md ring-1 ring-indigo-400/40'
                    : isEligible
                    ? isDark
                      ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                    : isDark
                    ? 'bg-slate-950/30 border-slate-800 opacity-50 cursor-not-allowed'
                    : 'bg-stone-100 border-stone-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold text-xs ${isDark ? 'text-slate-200' : 'text-stone-900'}`}>
                    {isHi ? plan.title.hi : plan.title.en}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {(plan.interestRateAnnual * 100).toFixed(1)}% p.a.
                  </span>
                </div>

                <p className={`text-[10px] mb-2 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                  {isHi ? plan.description.hi : plan.description.en}
                </p>

                <div className={`text-[10px] flex justify-between font-mono ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                  <span>{isHi ? 'अधिकतम:' : 'Max:'} {formatINR(plan.maxAmount, true)}</span>
                  <span>CIBIL {plan.minCibilRequired}+</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loan Amount Slider & Disburse Action */}
        <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-stone-50 border-stone-200'}`}>
          <div className="flex justify-between items-center text-xs">
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
              {isHi ? 'लोन राशि चुनें:' : 'Select Loan Amount:'}
            </span>
            <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono">
              {formatINR(loanAmount)}
            </span>
          </div>

          <input
            type="range"
            min={10000}
            max={selectedPlan.maxAmount}
            step={10000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />

          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1 border-t ${isDark ? 'border-slate-800' : 'border-stone-200'}`}>
            <div>
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'दैनिक ईएमआई:' : 'Daily EMI:'}</span>
              <span className="font-bold font-mono text-indigo-600 dark:text-indigo-300">~{formatINR(estimatedDailyEmi)}/day</span>
            </div>
            <div>
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'अवधि:' : 'Tenure:'}</span>
              <span className={`font-bold font-mono ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>{selectedPlan.tenureDays} {isHi ? 'दिन' : 'days'}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>{isHi ? 'कुल ब्याज:' : 'Total Interest:'}</span>
              <span className="font-bold font-mono text-rose-500 dark:text-rose-400">{formatINR(interest)}</span>
            </div>
          </div>

          <button
            onClick={() => onTakeLoan(selectedPlan.id, loanAmount)}
            disabled={state.cibilScore < selectedPlan.minCibilRequired}
            className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
              state.cibilScore >= selectedPlan.minCibilRequired
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg active:scale-95'
                : isDark
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isHi ? `तुरंत लोन प्राप्त करें (${formatINR(loanAmount)})` : `Disburse Loan (${formatINR(loanAmount)})`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
