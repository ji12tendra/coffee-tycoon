import React, { useState, useMemo } from 'react';
import { GameTab } from './types/game';
import { useGameState } from './hooks/useGameState';
import { GameHeader } from './components/game/GameHeader';
import { FinancialFreedomMeter } from './components/game/FinancialFreedomMeter';
import { CoffeeShopView } from './components/game/CoffeeShopView';
import { AssetVsLiabilityView } from './components/game/AssetVsLiabilityView';
import { InvestmentHub } from './components/game/InvestmentHub';
import { BankingAndLoans } from './components/game/BankingAndLoans';
import { BalanceSheetModal } from './components/game/BalanceSheetModal';
import { FinancialAdvisorModal } from './components/game/FinancialAdvisorModal';
import { DailyEventsBanner } from './components/game/DailyEventsBanner';
import { OfflineEarningsModal } from './components/game/OfflineEarningsModal';
import { SaveSettingsModal } from './components/game/SaveSettingsModal';
import { NavigationBottom } from './components/game/NavigationBottom';
import { RealLifeOperationsModal } from './components/game/RealLifeOperationsModal';
import { InteractiveEventModal } from './components/game/InteractiveEventModal';
import { AchievementsView } from './components/game/AchievementsView';
import { AchievementUnlockedToast } from './components/game/AchievementUnlockedToast';
import { ACHIEVEMENTS_LIST } from './data/gameData';

export default function App() {
  const [activeTab, setActiveTab] = useState<GameTab>('shop');
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const {
    state,
    computeFinancials,
    computeDetailedPnL,
    serveCoffeeManually,
    serveCustomCustomerOrder,
    buyInventory,
    upgradeShopLevel,
    setCupPrice,
    hireStaff,
    fireStaff,
    buyBusinessUpgrade,
    buyLuxury,
    sellLuxury,
    buyStock,
    sellStock,
    toggleMutualFundSip,
    investLumpSumMutualFund,
    buyGold,
    sellGold,
    buyRealEstate,
    takeLoan,
    repayLoanPrepayment,
    performDeepCleaning,
    serviceEspressoMachine,
    distributeFestivalBonus,
    toggleStaffHealthInsurance,
    toggleOnlineDelivery,
    purchaseStaffTraining,
    resolveInteractiveEventChoice,
    dismissInteractiveEvent,
    depositEmergencyFund,
    withdrawEmergencyFund,
    payCreditCardBill,
    answerQuiz,
    setLanguage,
    setSoundEnabled,
    setGameSpeed,
    togglePause,
    toggleTheme,
    resetGame,
    exportSave,
    importSave,
    offlineEarningsModal,
    closeOfflineModal,
    latestUnlockedAchievement,
    claimAchievementReward,
    dismissAchievementNotification,
    activateRushHourBoost,
    claimLuckyInvestorGrant,
    claimOfflineMultiplierReward,
  } = useGameState();

  const financials = computeFinancials();
  const pnl = computeDetailedPnL();
  const isHi = state.language === 'hi';

  // Compute number of unclaimed achievements for header and nav badges
  const unclaimedAchievementsCount = useMemo(() => {
    const claimedSet = new Set(state.claimedAchievementIds || []);
    const unlockedSet = new Set(state.unlockedAchievementIds || []);
    let count = 0;
    ACHIEVEMENTS_LIST.forEach((ach) => {
      const isEligible = unlockedSet.has(ach.id) || ach.requirement(state, financials.netWorth);
      if (isEligible && !claimedSet.has(ach.id)) {
        count++;
      }
    });
    return count;
  }, [state, financials.netWorth]);

  const isDark = state.theme === 'dark';

  return (
    <div
      id="coffee_tycoon_app"
      className={`min-h-screen flex flex-col font-sans pb-24 sm:pb-28 antialiased transition-colors duration-200 selection:bg-amber-500 selection:text-white w-full max-w-full overflow-x-hidden ${
        isDark ? 'bg-[#0c1017] text-slate-100' : 'bg-[#f7f5f0] text-stone-900'
      }`}
    >
      
      {/* 1. Master Sticky Header */}
      <GameHeader
        state={state}
        netWorth={financials.netWorth}
        unclaimedAchievementsCount={unclaimedAchievementsCount}
        onOpenAchievements={() => setActiveTab('achievements')}
        onToggleSound={() => setSoundEnabled(!state.soundEnabled)}
        onToggleLanguage={() => setLanguage(isHi ? 'en' : 'hi')}
        onTogglePause={togglePause}
        onSetSpeed={setGameSpeed}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenAdvisor={() => setShowAdvisorModal(true)}
        onToggleTheme={toggleTheme}
      />

      {/* 2. Main Game Viewport */}
      <main className="max-w-5xl mx-auto w-full px-2 sm:px-6 pt-2 sm:pt-4 flex-1 overflow-x-hidden">
        
        {/* Daily Random Event Banner (if active) */}
        <DailyEventsBanner event={state.activeEvent} isHi={isHi} />

        {/* Financial Freedom & FIRE Progress Meter */}
        <FinancialFreedomMeter
          state={state}
          passiveIncomePerDay={financials.totalPassiveIncomePerDay}
          totalExpensesPerDay={financials.totalDailyExpenses}
          dailyLuxuryDrain={financials.dailyLuxuryDrain}
          dailyEmiTotal={financials.dailyEmiTotal}
          onOpenAdvisor={() => setShowAdvisorModal(true)}
        />

        {/* Tab 1: Coffee Shop & Active Brew Operations */}
        {activeTab === 'shop' && (
          <CoffeeShopView
            state={state}
            onServeManually={serveCoffeeManually}
            onServeCustomOrder={serveCustomCustomerOrder}
            onBuyInventory={buyInventory}
            onUpgradeLevel={upgradeShopLevel}
            onSetCupPrice={setCupPrice}
            onGoToTab={setActiveTab}
            onBuyUpgrade={buyBusinessUpgrade}
            onPerformDeepCleaning={performDeepCleaning}
            onServiceEspressoMachine={serviceEspressoMachine}
            onActivateRushBoost={activateRushHourBoost}
            onClaimInvestorGrant={claimLuckyInvestorGrant}
          />
        )}

        {/* Tab 2: Real-Life Shop P&L, HR & Staff Training Center */}
        {activeTab === 'operations' && (
          <RealLifeOperationsModal
            state={state}
            pnl={pnl}
            onHireStaff={hireStaff}
            onFireStaff={fireStaff}
            onBuyUpgrade={buyBusinessUpgrade}
            onPerformDeepCleaning={performDeepCleaning}
            onServiceEspressoMachine={serviceEspressoMachine}
            onDistributeFestivalBonus={distributeFestivalBonus}
            onToggleStaffHealthInsurance={toggleStaffHealthInsurance}
            onToggleOnlineDelivery={toggleOnlineDelivery}
            onPurchaseStaffTraining={purchaseStaffTraining}
          />
        )}

        {/* Tab 3: Asset vs Liability (Core Financial Lesson) */}
        {activeTab === 'reinvest' && (
          <AssetVsLiabilityView
            state={state}
            onBuyUpgrade={buyBusinessUpgrade}
            onBuyLuxury={buyLuxury}
            onSellLuxury={sellLuxury}
            onHireStaff={hireStaff}
            onFireStaff={fireStaff}
          />
        )}

        {/* Tab 4: Complete Investments (Stocks, MFs, Real Estate, Gold) */}
        {activeTab === 'investments' && (
          <InvestmentHub
            state={state}
            onBuyStock={buyStock}
            onSellStock={sellStock}
            onToggleSip={toggleMutualFundSip}
            onInvestLumpSumMf={investLumpSumMutualFund}
            onBuyGold={buyGold}
            onSellGold={sellGold}
            onBuyRealEstate={buyRealEstate}
          />
        )}

        {/* Tab 5: Banking, Loans & Credit Management */}
        {activeTab === 'banking' && (
          <BankingAndLoans
            state={state}
            onTakeLoan={takeLoan}
            onRepayPrepayment={repayLoanPrepayment}
            onDepositEmergencyFund={depositEmergencyFund}
            onWithdrawEmergencyFund={withdrawEmergencyFund}
            onPayCreditCardBill={payCreditCardBill}
          />
        )}

        {/* Tab 6: Milestones & Financial Achievements Badges */}
        {activeTab === 'achievements' && (
          <AchievementsView
            state={state}
            netWorth={financials.netWorth}
            onClaimReward={claimAchievementReward}
            onGoToTab={setActiveTab}
          />
        )}

        {/* Tab 7: Balance Sheet & Profit & Loss Statement */}
        {activeTab === 'balance_sheet' && (
          <BalanceSheetModal
            state={state}
            financials={financials}
          />
        )}

      </main>

      {/* 3. Responsive Bottom Navigation */}
      <NavigationBottom
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isHi={isHi}
        activeLoanCount={state.activeLoans.length}
        unclaimedAchievementsCount={unclaimedAchievementsCount}
        theme={state.theme}
      />

      {/* 4. Interactive Real-Life Event Dilemma Modal (if triggered) */}
      {state.pendingInteractiveEvent && (
        <InteractiveEventModal
          event={state.pendingInteractiveEvent}
          state={state}
          onSelectChoice={resolveInteractiveEventChoice}
          onDismiss={dismissInteractiveEvent}
        />
      )}

      {/* 5. Financial Advisor AI & Quizzes Modal */}
      {showAdvisorModal && (
        <FinancialAdvisorModal
          state={state}
          onClose={() => setShowAdvisorModal(false)}
          onAnswerQuiz={answerQuiz}
        />
      )}

      {/* 6. Save Game & Settings Modal */}
      {showSettingsModal && (
        <SaveSettingsModal
          state={state}
          isHi={isHi}
          onClose={() => setShowSettingsModal(false)}
          onToggleSound={() => setSoundEnabled(!state.soundEnabled)}
          onToggleLanguage={() => setLanguage(isHi ? 'en' : 'hi')}
          onToggleTheme={toggleTheme}
          onResetGame={resetGame}
          onExportSave={exportSave}
          onImportSave={importSave}
        />
      )}

      {/* 7. Offline Idle Earnings Modal */}
      {offlineEarningsModal && (
        <OfflineEarningsModal
          data={offlineEarningsModal}
          isHi={isHi}
          isDark={isDark}
          onClose={closeOfflineModal}
          onClaimMultiplier={claimOfflineMultiplierReward}
        />
      )}

      {/* 8. Real-Time Achievement Unlocked Celebration Toast */}
      {latestUnlockedAchievement && (
        <AchievementUnlockedToast
          achievement={latestUnlockedAchievement}
          isHi={isHi}
          onClose={dismissAchievementNotification}
          onViewAchievements={() => {
            dismissAchievementNotification();
            setActiveTab('achievements');
          }}
          onClaim={() => claimAchievementReward(latestUnlockedAchievement.id)}
        />
      )}

    </div>
  );
}
