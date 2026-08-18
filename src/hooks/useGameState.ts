import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameState,
  ActiveLoan,
  DailyEvent,
  InteractiveDailyEvent,
  FixedDeposit,
  Language,
  ShopLevelId,
  TimeOfDayPeriod,
  OwnedLuxury,
  OwnedStock,
  OwnedMutualFund,
  OwnedRealEstate,
  CustomerReview,
  BusinessPnLBreakdown,
  Achievement,
} from '../types/game';
import {
  SHOP_LEVELS,
  STAFF_MEMBERS,
  STAFF_TRAINING_PROGRAMS,
  BUSINESS_UPGRADES,
  LUXURY_ITEMS,
  STOCKS_DATA,
  MUTUAL_FUNDS_DATA,
  REAL_ESTATE_DATA,
  GOLD_BONDS_DATA,
  LOAN_PLANS,
  FINANCIAL_QUIZZES,
  DAILY_EVENTS,
  INTERACTIVE_DAILY_EVENTS,
  ACHIEVEMENTS_LIST,
  SECONDS_PER_GAME_DAY,
} from '../data/gameData';
import { sound } from '../utils/audio';

const STORAGE_KEY = 'coffee_tycoon_real_life_v3';

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev_1',
    customerName: 'Aarav Sharma',
    customerRole: { en: 'Software Engineer', hi: 'सॉफ्टवेयर इंजीनियर' },
    rating: 5,
    comment: {
      en: 'Incredible aroma and authentic filter coffee taste! Perfect kick for my morning coding sprint.',
      hi: 'लाजवाब स्वाद और असली फिल्टर कॉफ़ी की खुशबू! सुबह के काम के लिए बिल्कुल परफेक्ट।',
    },
    dateFormatted: 'Day 1',
    avatarIcon: '👨‍💻',
  },
  {
    id: 'rev_2',
    customerName: 'Neha Verma',
    customerRole: { en: 'College Student', hi: 'कॉलेज छात्रा' },
    rating: 4,
    comment: {
      en: 'Great coffee at reasonable rates. Friendly staff and fast service!',
      hi: 'किफायती दाम में बेहतरीन कॉफ़ी। स्टाफ का व्यवहार बहुत अच्छा है।',
    },
    dateFormatted: 'Day 1',
    avatarIcon: '👩‍🎓',
  },
];

const INITIAL_GAME_STATE: GameState = {
  cash: 18000, // Starting seed capital
  day: 1,
  timeOfDaySeconds: 0,
  timeOfDayPeriod: 'morning_rush',
  gameSpeed: 1,
  isPaused: false,

  shopLevel: 1,
  cupPrice: 35,
  beansStock: 1500, // 1500g = ~100 cups
  milkStock: 5000,  // 5000ml = ~100 cups
  cupsStock: 100,
  sugarStock: 800,
  dailySpoilageBeans: 0,
  dailySpoilageMilk: 0,

  totalCupsSold: 0,
  lifetimeRevenue: 0,

  // Real-life Operations Metrics
  cleanlinessScore: 95,
  machineHealthScore: 98,
  staffMoraleScore: 88,
  googleRating: 4.6,
  recentReviews: INITIAL_REVIEWS,

  // Operations & Delivery
  isOnlineDeliveryActive: false,
  hasStaffHealthInsurance: false,
  unlockedTrainings: {},

  // Emergency Fund & Credit Card
  emergencyFundBalance: 0,
  creditCardSpend: 0,
  creditCardLimit: 50000,
  creditCardDaysUntilDue: 30,

  // Taxes
  gstCollectedLifetime: 0,
  advanceTaxPaidLifetime: 0,

  // Assets & Staff
  hiredStaff: {},
  purchasedUpgrades: {},
  purchasedLuxuries: {},

  // Stock Market
  stockPrices: {
    brewtech: 420,
    bharat_fmcg: 2450,
    solaria_energy: 780,
    urban_realties: 310,
    coorg_plantations: 1250,
  },
  stockHistories: {
    brewtech: [380, 395, 410, 405, 420],
    bharat_fmcg: [2380, 2400, 2415, 2430, 2450],
    solaria_energy: [710, 740, 730, 765, 780],
    urban_realties: [298, 302, 305, 308, 310],
    coorg_plantations: [1180, 1210, 1195, 1230, 1250],
  },
  stocksOwned: {},

  // Mutual Funds
  mutualFundNavs: {
    nifty50_index: 145.5,
    flexicap_growth: 88.2,
    smallcap_rocket: 52.8,
  },
  mutualFundsOwned: {},

  // Gold & Real Estate
  goldPricePerGram: 7600,
  goldPriceHistory: [7450, 7490, 7520, 7560, 7600],
  goldGramsOwned: 0,
  bondsOwned: {},

  realEstateOwned: {},
  fixedDeposits: [],

  // CIBIL & Loans
  cibilScore: 720,
  activeLoans: [],
  missedEmiCount: 0,

  // History & Progress
  completedQuizIds: [],
  unlockedAchievementIds: [],
  claimedAchievementIds: [],
  dailyFinancialHistory: [
    {
      day: 1,
      netWorth: 18000,
      cash: 18000,
      passiveIncome: 0,
      expenses: 125, // Initial overhead
      profit: 0,
    },
  ],

  activeEvent: null,
  pendingInteractiveEvent: null,
  lastSavedTimestamp: Date.now(),
  language: 'hi',
  soundEnabled: true,
  theme: 'light',

  // Smart Ad & Earning Multipliers
  activeRushBoostSecondsRemaining: 0,
  isAdMobEnabled: true,
  totalAdsWatched: 0,
  luckyInvestorCashPool: 25000,
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_GAME_STATE,
          ...parsed,
          stockPrices: { ...INITIAL_GAME_STATE.stockPrices, ...(parsed.stockPrices || {}) },
          mutualFundNavs: { ...INITIAL_GAME_STATE.mutualFundNavs, ...(parsed.mutualFundNavs || {}) },
        };
      }
    } catch {
      // safe fallback
    }
    return INITIAL_GAME_STATE;
  });

  const [offlineEarningsModal, setOfflineEarningsModal] = useState<{
    hoursAway: number;
    cupsServed: number;
    cashEarned: number;
    passiveEarned: number;
    expensesPaid: number;
    netCashChange: number;
  } | null>(null);

  const [latestUnlockedAchievement, setLatestUnlockedAchievement] = useState<Achievement | null>(null);

  const stateRef = useRef(state);
  stateRef.current = state;

  // Calculate Offline Idle Earnings on Mount
  useEffect(() => {
    const lastTimestamp = state.lastSavedTimestamp;
    const now = Date.now();
    const diffSec = (now - lastTimestamp) / 1000;

    if (diffSec > 60) {
      const offlineHours = +(diffSec / 3600).toFixed(1);
      const offlineSeconds = Math.min(diffSec, 86400); // capped at 24 hours
      const offlineDays = offlineSeconds / SECONDS_PER_GAME_DAY;

      // Staff auto-serving
      let autoServesPerSec = 0;
      Object.entries(state.hiredStaff).forEach(([staffId, countRaw]) => {
        const count = Number(countRaw) || 0;
        const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
        if (staff) {
          autoServesPerSec += staff.autoServesPerSec * count;
        }
      });

      const potentialCups = Math.floor(autoServesPerSec * offlineSeconds * 0.45);
      const maxByBeans = Math.floor(state.beansStock / 15);
      const maxByMilk = Math.floor(state.milkStock / 50);
      const maxByCups = state.cupsStock;

      const actualCups = Math.max(0, Math.min(potentialCups, maxByBeans, maxByMilk, maxByCups));
      const coffeeRevenue = actualCups * state.cupPrice;

      // Real estate rent offline
      let passiveRent = 0;
      Object.entries(state.realEstateOwned).forEach(([propId, data]: [string, OwnedRealEstate | undefined]) => {
        if (!data) return;
        const prop = REAL_ESTATE_DATA.find((p) => p.id === propId);
        if (prop && (data.count || 0) > 0) {
          passiveRent += prop.dailyRentalIncome * (data.count || 0) * offlineDays;
        }
      });

      // Luxury maintenance offline
      let luxuryDrain = 0;
      Object.entries(state.purchasedLuxuries).forEach(([luxId, data]: [string, OwnedLuxury | undefined]) => {
        if (!data) return;
        const lux = LUXURY_ITEMS.find((l) => l.id === luxId);
        if (lux && (data.count || 0) > 0) {
          luxuryDrain += lux.dailyMaintenanceCost * (data.count || 0) * offlineDays;
        }
      });

      // Shop daily overheads offline
      const currentLevel = SHOP_LEVELS.find((l) => l.id === state.shopLevel) || SHOP_LEVELS[0];
      const baseOverheads =
        (currentLevel.dailyRentCost +
          currentLevel.dailyPowerCost +
          currentLevel.dailyWaterSanitationCost +
          currentLevel.dailyMachineAmcCost +
          currentLevel.dailyComplianceCost) *
        offlineDays;

      const netCashChange = Math.round(coffeeRevenue + passiveRent - (luxuryDrain + baseOverheads));

      if (actualCups > 0 || passiveRent > 0) {
        setState((prev) => ({
          ...prev,
          cash: Math.max(0, prev.cash + netCashChange),
          beansStock: Math.max(0, prev.beansStock - actualCups * 15),
          milkStock: Math.max(0, prev.milkStock - actualCups * 50),
          cupsStock: Math.max(0, prev.cupsStock - actualCups),
          sugarStock: Math.max(0, prev.sugarStock - actualCups * 8),
          totalCupsSold: prev.totalCupsSold + actualCups,
          lifetimeRevenue: prev.lifetimeRevenue + coffeeRevenue,
          lastSavedTimestamp: now,
        }));

        setOfflineEarningsModal({
          hoursAway: offlineHours,
          cupsServed: actualCups,
          cashEarned: Math.round(coffeeRevenue),
          passiveEarned: Math.round(passiveRent),
          expensesPaid: Math.round(luxuryDrain + baseOverheads),
          netCashChange,
        });
      }
    }
  }, []);

  // Save to LocalStorage periodically
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...stateRef.current, lastSavedTimestamp: Date.now() })
        );
      } catch {
        // quota guard
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sound enable hook
  useEffect(() => {
    sound.setEnabled(state.soundEnabled);
  }, [state.soundEnabled]);

  // Master Game Loop Tick (Every 500ms)
  useEffect(() => {
    const interval = setInterval(() => {
      const s = stateRef.current;
      if (s.isPaused) return;

      const speed = s.gameSpeed;
      const stepSeconds = 0.5 * speed;
      const newTimeOfDay = s.timeOfDaySeconds + stepSeconds;
      const isNewDay = newTimeOfDay >= SECONDS_PER_GAME_DAY;
      const finalTime = isNewDay ? newTimeOfDay % SECONDS_PER_GAME_DAY : newTimeOfDay;
      const currentDay = isNewDay ? s.day + 1 : s.day;

      // Determine Time of Day Period
      let period: TimeOfDayPeriod = 'morning_rush';
      let peakDemandMultiplier = 2.0;

      if (finalTime >= 0 && finalTime < 6) {
        period = 'morning_rush'; // 07:00 - 11:00 AM
        peakDemandMultiplier = 2.2;
      } else if (finalTime >= 6 && finalTime < 12) {
        period = 'afternoon_work'; // 11:00 AM - 04:00 PM
        peakDemandMultiplier = 0.9;
      } else if (finalTime >= 12 && finalTime < 18) {
        period = 'evening_peak'; // 04:00 PM - 08:30 PM
        peakDemandMultiplier = 2.4;
      } else {
        period = 'night_chill'; // 08:30 PM - 11:00 PM
        peakDemandMultiplier = 0.7;
      }

      // Staff Auto-Serves calculation
      let staffAutoServes = 0;
      let hasCleaner = false;
      let hasSupervisor = false;

      Object.entries(s.hiredStaff).forEach(([staffId, countRaw]) => {
        const count = Number(countRaw) || 0;
        const staff = STAFF_MEMBERS.find((sm) => sm.id === staffId);
        if (staff) {
          staffAutoServes += staff.autoServesPerSec * count;
          if (staff.role === 'cleaner' && count > 0) hasCleaner = true;
          if (staff.role === 'supervisor' && count > 0) hasSupervisor = true;
        }
      });

      // Morale multiplier on serving speed (Morale 100 = 1.1x speed, Morale 50 = 0.8x)
      const moraleSpeedFactor = 0.6 + (s.staffMoraleScore / 100) * 0.5;

      // Online delivery boost (+35% extra orders if active)
      const deliveryBoost = s.isOnlineDeliveryActive ? 1.35 : 1.0;

      // Passive Daily Events impact
      let eventSalesMultiplier = 1;
      if (s.activeEvent && s.activeEvent.impactType === 'sales_boost') {
        eventSalesMultiplier = s.activeEvent.multiplier || 1.5;
      }

      // Business Upgrades speed boost
      let upgradeSpeedMultiplier = 1;
      Object.keys(s.purchasedUpgrades).forEach((upId) => {
        const up = BUSINESS_UPGRADES.find((u) => u.id === upId);
        if (up && up.speedBoost) {
          upgradeSpeedMultiplier *= up.speedBoost;
        }
      });

      // Staff Training speed boost
      if (s.unlockedTrainings['pos_cloud_management']) {
        upgradeSpeedMultiplier *= 1.25;
      }

      // Active 2x Rewarded Rush Hour Boost
      const isRushBoostActive = (s.activeRushBoostSecondsRemaining || 0) > 0;
      const rushBoostMultiplier = isRushBoostActive ? 2.0 : 1.0;

      const totalServesRate =
        staffAutoServes *
        moraleSpeedFactor *
        peakDemandMultiplier *
        deliveryBoost *
        eventSalesMultiplier *
        upgradeSpeedMultiplier *
        rushBoostMultiplier;

      const servesThisTick = Math.min(16, totalServesRate * 0.5 * speed);

      // Ingredients consumption
      const beansRequired = servesThisTick * 15;
      const milkRequired = servesThisTick * 50;
      const cupsRequired = servesThisTick;
      const sugarRequired = servesThisTick * 8;

      const canServe =
        s.beansStock >= beansRequired &&
        s.milkStock >= milkRequired &&
        s.cupsStock >= cupsRequired;

      let actualServes = 0;
      let inStoreRevenueEarned = 0;
      let onlineDeliveryRevenueEarned = 0;

      if (canServe && servesThisTick > 0) {
        actualServes = servesThisTick;
        const inStoreProportion = s.isOnlineDeliveryActive ? 0.75 : 1.0;
        const effectiveCupPrice = s.cupPrice * (isRushBoostActive ? 1.5 : 1.0); // Extra price tolerance during rush
        inStoreRevenueEarned = actualServes * inStoreProportion * effectiveCupPrice;
        onlineDeliveryRevenueEarned = actualServes * (1 - inStoreProportion) * effectiveCupPrice;
      }

      const nextRushSecondsRemaining = Math.max(0, (s.activeRushBoostSecondsRemaining || 0) - stepSeconds);

      const totalGrossRevenueThisTick = inStoreRevenueEarned + onlineDeliveryRevenueEarned;

      // Operations Wear & Tear
      const cleanDrop = actualServes > 0 ? (hasCleaner ? 0.02 : 0.08) : 0;
      const machineDrop = actualServes > 0 ? 0.04 : 0;
      const moraleNaturalDecay = hasSupervisor ? 0.005 : 0.02;

      const updatedCleanliness = Math.max(20, s.cleanlinessScore - cleanDrop);
      const updatedMachineHealth = Math.max(20, s.machineHealthScore - machineDrop);
      const updatedMorale = Math.max(30, s.staffMoraleScore - moraleNaturalDecay);

      // Mutual fund daily automated SIP
      let sipDeduction = 0;
      const updatedMutualFunds: Record<string, OwnedMutualFund> = { ...s.mutualFundsOwned };

      Object.entries(updatedMutualFunds).forEach(([fundId, data]) => {
        if (data && data.isSipActive && data.dailySipAmount > 0 && isNewDay) {
          if (s.cash >= data.dailySipAmount) {
            sipDeduction += data.dailySipAmount;
            const currentNav = s.mutualFundNavs[fundId] || 100;
            const newUnits = data.dailySipAmount / currentNav;
            updatedMutualFunds[fundId] = {
              ...data,
              units: (data.units || 0) + newUnits,
              totalInvested: (data.totalInvested || 0) + data.dailySipAmount,
            };
          }
        }
      });

      // Day End Processing (Overheads, Rent, Power, Spoilage, Taxes, EMIs, Salaries)
      let dailyPassiveIncome = 0;
      let dailyOperatingCosts = 0;
      let dailyLiabilityExpenses = 0;
      let dailyEmiDeductions = 0;
      let updatedCibil = s.cibilScore;
      let updatedActiveLoans: ActiveLoan[] = s.activeLoans;
      let missedEmis = s.missedEmiCount;

      let dailySpoiledBeansGrams = 0;
      let dailySpoiledMilkMl = 0;
      let gstTaxDeduction = 0;
      let advanceIncomeTaxDeduction = 0;

      if (isNewDay) {
        const curLevel = SHOP_LEVELS.find((l) => l.id === s.shopLevel) || SHOP_LEVELS[0];

        // 1. Real-Life Shop Overheads
        // Energy saving check (Solar Rooftop 5kW gives 55% power reduction)
        const hasSolar = s.purchasedUpgrades['solar_rooftop_5kw'];
        const actualPowerBill = curLevel.dailyPowerCost * (hasSolar ? 0.45 : 1.0);

        // Packaging cost for total cups served today
        const packagingOverhead = s.totalCupsSold > 0 ? (s.totalCupsSold % 100) * curLevel.packagingCostPerCup : 50;

        dailyOperatingCosts +=
          curLevel.dailyRentCost +
          actualPowerBill +
          curLevel.dailyWaterSanitationCost +
          packagingOverhead +
          curLevel.dailyMachineAmcCost +
          curLevel.dailyComplianceCost;

        // 2. Real-Life Perishable Spoilage (Dairy milk & roasted beans)
        // Spoilage reduced by Commercial Chiller (70%) and Hygiene Training (65%)
        let spoilageRate = 0.06; // 6% base daily spoilage of raw stock
        if (s.purchasedUpgrades['commercial_deep_freezer']) spoilageRate *= 0.3;
        if (s.unlockedTrainings['hygiene_zerowaste_cert']) spoilageRate *= 0.35;

        dailySpoiledBeansGrams = Math.round(s.beansStock * spoilageRate);
        dailySpoiledMilkMl = Math.round(s.milkStock * spoilageRate);

        // 3. Staff Salaries & ESIC/Health Benefits
        let totalStaffDailySalaries = 0;
        let totalStaffCount = 0;

        Object.entries(s.hiredStaff).forEach(([staffId, countRaw]) => {
          const count = Number(countRaw) || 0;
          const staff = STAFF_MEMBERS.find((sm) => sm.id === staffId);
          if (staff) {
            totalStaffDailySalaries += staff.dailySalary * count;
            totalStaffCount += count;
          }
        });

        dailyOperatingCosts += totalStaffDailySalaries;

        // Employee Benefits (₹45/day per staff if health insurance active)
        if (s.hasStaffHealthInsurance && totalStaffCount > 0) {
          dailyOperatingCosts += totalStaffCount * 45;
        }

        // 4. Online Delivery Aggregator Commission (20% Swiggy/Zomato commission)
        if (s.isOnlineDeliveryActive && onlineDeliveryRevenueEarned > 0) {
          dailyOperatingCosts += onlineDeliveryRevenueEarned * 0.2;
        }

        // 5. Government Taxes (5% Restaurant GST on Gross Sales)
        gstTaxDeduction = Math.round(totalGrossRevenueThisTick * 0.05);
        dailyOperatingCosts += gstTaxDeduction;

        // Advance Income Tax (10% on daily operating profit)
        const dailyGrossProfit = totalGrossRevenueThisTick - dailyOperatingCosts;
        if (dailyGrossProfit > 2000) {
          advanceIncomeTaxDeduction = Math.round(dailyGrossProfit * 0.1);
          dailyOperatingCosts += advanceIncomeTaxDeduction;
        }

        // 6. Real Estate Passive Rental Income
        Object.entries(s.realEstateOwned).forEach(([propId, data]: [string, OwnedRealEstate | undefined]) => {
          if (!data) return;
          const prop = REAL_ESTATE_DATA.find((p) => p.id === propId);
          if (prop && (data.count || 0) > 0) {
            dailyPassiveIncome += prop.dailyRentalIncome * (data.count || 0);
          }
        });

        // 7. Business Upgrades Passive Cashflow
        Object.keys(s.purchasedUpgrades).forEach((upId) => {
          const up = BUSINESS_UPGRADES.find((u) => u.id === upId);
          if (up) {
            dailyPassiveIncome += up.dailyCashflowBoost;
          }
        });

        // 8. Emergency Reserve Fund Interest (5% annual interest compounded daily)
        if (s.emergencyFundBalance > 0) {
          const dailyInterest = (s.emergencyFundBalance * 0.05) / 365;
          dailyPassiveIncome += dailyInterest;
        }

        // 9. Stock Dividends
        Object.entries(s.stocksOwned).forEach(([stockId, data]: [string, OwnedStock | undefined]) => {
          if (!data) return;
          const stock = STOCKS_DATA.find((st) => st.id === stockId);
          if (stock && (data.quantity || 0) > 0) {
            const divPerDay =
              ((data.quantity || 0) * (s.stockPrices[stockId] || stock.currentPrice) * stock.dividendYield) / 365;
            dailyPassiveIncome += divPerDay;
          }
        });

        // 10. Sovereign Gold Bonds Interest
        Object.entries(s.bondsOwned).forEach(([bondId, unitsRaw]) => {
          const units = Number(unitsRaw) || 0;
          const bond = GOLD_BONDS_DATA.find((b) => b.id === bondId);
          if (bond && units > 0) {
            dailyPassiveIncome += (units * bond.costPerUnit * bond.annualInterestRate) / 365;
          }
        });

        // 11. Fixed Deposit Maturities
        const remainingFDs: FixedDeposit[] = [];
        s.fixedDeposits.forEach((fd) => {
          if (fd.daysRemaining <= 1) {
            const totalMaturity = fd.principal * Math.pow(1 + fd.interestRate / 365, fd.durationDays);
            dailyPassiveIncome += totalMaturity;
            sound.playFanfare();
          } else {
            remainingFDs.push({ ...fd, daysRemaining: fd.daysRemaining - 1 });
          }
        });

        // 12. Luxury Traps (Liabilities) Drain
        Object.entries(s.purchasedLuxuries).forEach(([luxId, data]: [string, OwnedLuxury | undefined]) => {
          if (!data) return;
          const lux = LUXURY_ITEMS.find((l) => l.id === luxId);
          if (lux && (data.count || 0) > 0) {
            dailyLiabilityExpenses += lux.dailyMaintenanceCost * (data.count || 0);
          }
        });

        // 13. Loan EMIs & CIBIL Score updates
        const nextLoans: ActiveLoan[] = [];
        s.activeLoans.forEach((loan) => {
          if (loan.remainingAmount <= 0 || loan.daysRemaining <= 0) {
            updatedCibil = Math.min(900, updatedCibil + 15);
            sound.playFanfare();
          } else {
            const emiToPay = Math.min(loan.remainingAmount, loan.dailyEmi);
            if (s.cash >= emiToPay) {
              dailyEmiDeductions += emiToPay;
              updatedCibil = Math.min(900, updatedCibil + 2);
              nextLoans.push({
                ...loan,
                remainingAmount: Math.max(0, loan.remainingAmount - emiToPay),
                daysRemaining: loan.daysRemaining - 1,
              });
            } else {
              missedEmis += 1;
              updatedCibil = Math.max(300, updatedCibil - 35);
              sound.playBuzzer();
              nextLoans.push({
                ...loan,
                remainingAmount: loan.remainingAmount * 1.025, // 2.5% penal interest
                daysRemaining: loan.daysRemaining,
              });
            }
          }
        });
        updatedActiveLoans = nextLoans;

        // Credit Card APR interest if overdue (36% APR = ~0.1% daily)
        let updatedCreditDueDays = s.creditCardDaysUntilDue - 1;
        let updatedCreditSpend = s.creditCardSpend;

        if (updatedCreditDueDays <= 0 && updatedCreditSpend > 0) {
          updatedCreditSpend = Math.round(updatedCreditSpend * 1.03); // 3% monthly late fee
          updatedCreditDueDays = 30;
          updatedCibil = Math.max(300, updatedCibil - 20);
        }

        // Calculate Google Rating based on cleanliness, machine health, and training
        let calculatedRating = 4.2;
        if (updatedCleanliness > 90) calculatedRating += 0.3;
        if (updatedCleanliness < 50) calculatedRating -= 0.6;
        if (updatedMachineHealth > 90) calculatedRating += 0.2;
        if (updatedMorale > 85) calculatedRating += 0.2;
        if (s.unlockedTrainings['hospitality_softskills']) calculatedRating += 0.2;
        if (s.unlockedTrainings['specialty_brewing_masterclass']) calculatedRating += 0.2;

        const finalGoogleRating = +(Math.min(5.0, Math.max(2.5, calculatedRating))).toFixed(1);

        // Generate customer review occasionally
        let nextReviews = s.recentReviews;
        if (Math.random() < 0.35) {
          const reviewNames = ['Rajesh K.', 'Pooja Nair', 'Siddharth M.', 'Ananya Sen', 'Vikramaditya', 'Deepak R.'];
          const reviewRoles = [
            { en: 'Cafe Regular', hi: 'नियमित ग्राहक' },
            { en: 'Food Enthusiast', hi: 'फ़ूड लवर' },
            { en: 'Corporate Manager', hi: 'कॉर्पोरेट मैनेजर' },
            { en: 'Coffee Connoisseur', hi: 'कॉफ़ी विशेषज्ञ' },
          ];
          const comments = [
            {
              en: 'Superb micro-foam latte! The cafe ambiance and prompt hygiene are commendable.',
              hi: 'शानदार लाते कॉफ़ी! दुकान की सफाई और माहौल दोनों बहुत अच्छे हैं।',
            },
            {
              en: 'Quickest UPI billing and warm greetings. My daily go-to breakfast spot.',
              hi: 'फास्ट बिलिंग और खुशमिजाज स्टाफ। रोज़ सुबह नाश्ते का बेस्ट ठिकाना।',
            },
            {
              en: 'Smooth espresso with balanced acidity. Truly high quality specialty coffee.',
              hi: 'क्रीमी एस्प्रेसो और परफेक्ट स्वाद। शहर की सबसे बेहतरीन कॉफ़ी।',
            },
          ];

          const pickIdx = Math.floor(Math.random() * comments.length);
          const newReview: CustomerReview = {
            id: `rev_${Date.now()}`,
            customerName: reviewNames[Math.floor(Math.random() * reviewNames.length)],
            customerRole: reviewRoles[Math.floor(Math.random() * reviewRoles.length)],
            rating: finalGoogleRating >= 4.5 ? 5 : 4,
            comment: comments[pickIdx],
            dateFormatted: `Day ${currentDay}`,
            avatarIcon: ['☕', '🌟', '👨‍💼', '👩‍💼', '🥐'][Math.floor(Math.random() * 5)],
          };
          nextReviews = [newReview, ...s.recentReviews.slice(0, 9)];
        }

        // Random Interactive Event Trigger
        let nextInteractiveEvent: InteractiveDailyEvent | null = s.pendingInteractiveEvent;
        if (!nextInteractiveEvent && Math.random() < 0.25 && currentDay > 2) {
          nextInteractiveEvent =
            INTERACTIVE_DAILY_EVENTS[Math.floor(Math.random() * INTERACTIVE_DAILY_EVENTS.length)];
          sound.playCoin();
        }

        // Passive event check
        let nextPassiveEvent: DailyEvent | null = s.activeEvent;
        if (nextPassiveEvent) {
          if (nextPassiveEvent.durationDays <= 1) {
            nextPassiveEvent = null;
          } else {
            nextPassiveEvent = { ...nextPassiveEvent, durationDays: nextPassiveEvent.durationDays - 1 };
          }
        } else if (Math.random() < 0.15) {
          const pick = DAILY_EVENTS[Math.floor(Math.random() * DAILY_EVENTS.length)];
          nextPassiveEvent = { ...pick };
          if (pick.impactType === 'cash_gift' && pick.cashDelta) {
            dailyPassiveIncome += pick.cashDelta;
            sound.playCoin();
          }
        }

        // Stock Market updates
        const updatedStockPrices: Record<string, number> = { ...s.stockPrices };
        const updatedStockHistories: Record<string, number[]> = { ...s.stockHistories };

        STOCKS_DATA.forEach((stock) => {
          const current = updatedStockPrices[stock.id] || stock.currentPrice;
          const randomFactor = (Math.random() - 0.48) * stock.volatility * 2;
          let marketTrend = 1 + randomFactor;

          if (s.activeEvent && s.activeEvent.impactType === 'stock_rally') {
            marketTrend *= 1.04;
          }

          const newPrice = Math.max(10, Math.round(current * marketTrend));
          updatedStockPrices[stock.id] = newPrice;
          const hist = updatedStockHistories[stock.id] || [stock.basePrice];
          updatedStockHistories[stock.id] = [...hist.slice(-19), newPrice];
        });

        // Mutual Fund NAVs
        const updatedNavs: Record<string, number> = { ...s.mutualFundNavs };
        MUTUAL_FUNDS_DATA.forEach((fund) => {
          const curNav = updatedNavs[fund.id] || fund.nav;
          const dailyRate = Math.pow(1 + fund.expectedAnnualReturn, 1 / 365) - 1;
          const noise = (Math.random() - 0.48) * 0.005;
          updatedNavs[fund.id] = +(curNav * (1 + dailyRate + noise)).toFixed(2);
        });

        // Gold Drift
        const goldDrift = (Math.random() - 0.47) * 0.006;
        const newGoldPrice = Math.round(s.goldPricePerGram * (1 + goldDrift));
        const updatedGoldHistory = [...s.goldPriceHistory.slice(-19), newGoldPrice];

        // Real estate appreciation
        const updatedRealEstate: Record<string, OwnedRealEstate> = { ...s.realEstateOwned };
        Object.entries(updatedRealEstate).forEach(([propId, data]) => {
          if (!data) return;
          const prop = REAL_ESTATE_DATA.find((p) => p.id === propId);
          if (prop && data.count > 0) {
            updatedRealEstate[propId] = {
              count: data.count,
              currentMarketValue: Math.round(data.currentMarketValue * (1 + prop.appreciationRateDaily)),
            };
          }
        });

        // Luxury depreciation
        const updatedLuxuries: Record<string, OwnedLuxury> = { ...s.purchasedLuxuries };
        Object.entries(updatedLuxuries).forEach(([luxId, data]) => {
          if (!data) return;
          const lux = LUXURY_ITEMS.find((l) => l.id === luxId);
          if (lux && data.count > 0) {
            updatedLuxuries[luxId] = {
              count: data.count,
              currentEstimatedValue: Math.max(
                data.currentEstimatedValue * 0.2,
                Math.round(data.currentEstimatedValue * (1 - lux.depreciationRatePerDay))
              ),
            };
          }
        });

        // Net worth calculation for 30-day tracking
        let totalInvestmentsVal = 0;
        Object.entries(s.stocksOwned).forEach(([stockId, data]: [string, OwnedStock | undefined]) => {
          if (data) totalInvestmentsVal += (data.quantity || 0) * (updatedStockPrices[stockId] || 100);
        });
        Object.entries(updatedMutualFunds).forEach(([fundId, data]: [string, OwnedMutualFund | undefined]) => {
          if (data) totalInvestmentsVal += (data.units || 0) * (updatedNavs[fundId] || 100);
        });
        totalInvestmentsVal += s.goldGramsOwned * newGoldPrice;
        totalInvestmentsVal += s.emergencyFundBalance;

        let totalRealEstateVal = 0;
        Object.values(updatedRealEstate).forEach((data: OwnedRealEstate | undefined) => {
          if (data) totalRealEstateVal += (data.currentMarketValue || 0) * (data.count || 0);
        });

        let totalDebt = updatedCreditSpend;
        updatedActiveLoans.forEach((loan) => {
          totalDebt += loan.remainingAmount;
        });

        const netWorthNow = Math.round(s.cash + totalInvestmentsVal + totalRealEstateVal - totalDebt);

        const newHistoryItem = {
          day: currentDay,
          netWorth: netWorthNow,
          cash: Math.round(s.cash),
          passiveIncome: Math.round(dailyPassiveIncome),
          expenses: Math.round(dailyOperatingCosts + dailyLiabilityExpenses + dailyEmiDeductions),
          profit: Math.round(
            totalGrossRevenueThisTick +
              dailyPassiveIncome -
              (dailyOperatingCosts + dailyLiabilityExpenses + dailyEmiDeductions)
          ),
        };

        const nextFinancialHistory = [...s.dailyFinancialHistory.slice(-29), newHistoryItem];

        setState((prev) => ({
          ...prev,
          day: currentDay,
          timeOfDaySeconds: finalTime,
          timeOfDayPeriod: period,
          cash: Math.max(
            0,
            prev.cash +
              totalGrossRevenueThisTick +
              dailyPassiveIncome -
              (dailyOperatingCosts + dailyLiabilityExpenses + dailyEmiDeductions + sipDeduction)
          ),
          beansStock: Math.max(0, prev.beansStock - actualServes * 15 - dailySpoiledBeansGrams),
          milkStock: Math.max(0, prev.milkStock - actualServes * 50 - dailySpoiledMilkMl),
          cupsStock: Math.max(0, prev.cupsStock - actualServes),
          sugarStock: Math.max(0, prev.sugarStock - actualServes * 8),
          dailySpoilageBeans: dailySpoiledBeansGrams,
          dailySpoilageMilk: dailySpoiledMilkMl,
          totalCupsSold: prev.totalCupsSold + actualServes,
          lifetimeRevenue: prev.lifetimeRevenue + totalGrossRevenueThisTick,
          gstCollectedLifetime: prev.gstCollectedLifetime + gstTaxDeduction,
          advanceTaxPaidLifetime: prev.advanceTaxPaidLifetime + advanceIncomeTaxDeduction,
          cleanlinessScore: updatedCleanliness,
          machineHealthScore: updatedMachineHealth,
          staffMoraleScore: updatedMorale,
          googleRating: finalGoogleRating,
          recentReviews: nextReviews,
          pendingInteractiveEvent: nextInteractiveEvent,
          activeEvent: nextPassiveEvent,
          cibilScore: updatedCibil,
          missedEmiCount: missedEmis,
          activeLoans: updatedActiveLoans,
          creditCardSpend: updatedCreditSpend,
          creditCardDaysUntilDue: updatedCreditDueDays,
          stockPrices: updatedStockPrices,
          stockHistories: updatedStockHistories,
          mutualFundNavs: updatedNavs,
          mutualFundsOwned: updatedMutualFunds,
          goldPricePerGram: newGoldPrice,
          goldPriceHistory: updatedGoldHistory,
          realEstateOwned: updatedRealEstate,
          purchasedLuxuries: updatedLuxuries,
          dailyFinancialHistory: nextFinancialHistory,
          activeRushBoostSecondsRemaining: nextRushSecondsRemaining,
        }));
      } else {
        // Intraday standard tick
        setState((prev) => ({
          ...prev,
          timeOfDaySeconds: finalTime,
          timeOfDayPeriod: period,
          cash: prev.cash + totalGrossRevenueThisTick,
          beansStock: Math.max(0, prev.beansStock - actualServes * 15),
          milkStock: Math.max(0, prev.milkStock - actualServes * 50),
          cupsStock: Math.max(0, prev.cupsStock - actualServes),
          sugarStock: Math.max(0, prev.sugarStock - actualServes * 8),
          totalCupsSold: prev.totalCupsSold + actualServes,
          lifetimeRevenue: prev.lifetimeRevenue + totalGrossRevenueThisTick,
          cleanlinessScore: updatedCleanliness,
          machineHealthScore: updatedMachineHealth,
          staffMoraleScore: updatedMorale,
          activeRushBoostSecondsRemaining: nextRushSecondsRemaining,
        }));
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Real-Life Operations Actions
  const performDeepCleaning = useCallback(() => {
    const s = stateRef.current;
    const cost = 350;
    if (s.cash < cost) {
      sound.playBuzzer();
      return false;
    }
    sound.playServe();
    setState((prev) => ({
      ...prev,
      cash: prev.cash - cost,
      cleanlinessScore: 100,
    }));
    return true;
  }, []);

  const serviceEspressoMachine = useCallback(() => {
    const s = stateRef.current;
    const cost = 850;
    if (s.cash < cost) {
      sound.playBuzzer();
      return false;
    }
    sound.playUpgrade();
    setState((prev) => ({
      ...prev,
      cash: prev.cash - cost,
      machineHealthScore: 100,
    }));
    return true;
  }, []);

  const distributeFestivalBonus = useCallback(() => {
    const s = stateRef.current;
    const cost = 2500;
    if (s.cash < cost) {
      if (s.emergencyFundBalance >= cost) {
        sound.playFanfare();
        setState((prev) => ({
          ...prev,
          emergencyFundBalance: prev.emergencyFundBalance - cost,
          staffMoraleScore: 100,
        }));
        return true;
      }
      if (s.creditCardLimit - s.creditCardSpend >= cost) {
        sound.playFanfare();
        setState((prev) => ({
          ...prev,
          creditCardSpend: prev.creditCardSpend + cost,
          staffMoraleScore: 100,
        }));
        return true;
      }
      sound.playBuzzer();
      return false;
    }
    sound.playFanfare();
    setState((prev) => ({
      ...prev,
      cash: prev.cash - cost,
      staffMoraleScore: 100,
    }));
    return true;
  }, []);

  const toggleStaffHealthInsurance = useCallback(() => {
    sound.playUpgrade();
    setState((prev) => ({
      ...prev,
      hasStaffHealthInsurance: !prev.hasStaffHealthInsurance,
      staffMoraleScore: !prev.hasStaffHealthInsurance ? Math.min(100, prev.staffMoraleScore + 20) : prev.staffMoraleScore,
    }));
  }, []);

  const toggleOnlineDelivery = useCallback(() => {
    sound.playCoin();
    setState((prev) => ({
      ...prev,
      isOnlineDeliveryActive: !prev.isOnlineDeliveryActive,
    }));
  }, []);

  const purchaseStaffTraining = useCallback((trainingId: string) => {
    const training = STAFF_TRAINING_PROGRAMS.find((t) => t.id === trainingId);
    if (!training) return false;

    const s = stateRef.current;
    if (s.cash < training.cost || s.unlockedTrainings[trainingId]) {
      sound.playBuzzer();
      return false;
    }

    sound.playUpgrade();

    setState((prev) => ({
      ...prev,
      cash: prev.cash - training.cost,
      unlockedTrainings: {
        ...prev.unlockedTrainings,
        [trainingId]: true,
      },
      staffMoraleScore: Math.min(100, prev.staffMoraleScore + 15),
      cleanlinessScore: trainingId === 'hygiene_zerowaste_cert' ? 100 : prev.cleanlinessScore,
      googleRating: Math.min(5.0, prev.googleRating + 0.2),
    }));

    return true;
  }, []);

  const resolveInteractiveEventChoice = useCallback((choiceId: string, paymentMethod?: 'cash' | 'credit_card' | 'emergency_fund') => {
    const s = stateRef.current;
    if (!s.pendingInteractiveEvent) return;

    if (choiceId === 'dismiss') {
      sound.playClick();
      setState((prev) => ({
        ...prev,
        pendingInteractiveEvent: null,
      }));
      return true;
    }

    const choice = s.pendingInteractiveEvent.choices.find((c) => c.id === choiceId);
    if (!choice) {
      setState((prev) => ({
        ...prev,
        pendingInteractiveEvent: null,
      }));
      return true;
    }

    const cost = choice.costCash || 0;

    // Handle payment method if cash is short
    if (cost > 0 && s.cash < cost) {
      if (paymentMethod === 'credit_card' || (!paymentMethod && (s.creditCardLimit - s.creditCardSpend) >= cost)) {
        sound.playBuy();
        const updates = choice.effect({ ...s, cash: s.cash + cost });
        setState((prev) => ({
          ...prev,
          ...updates,
          creditCardSpend: prev.creditCardSpend + cost,
          pendingInteractiveEvent: null,
        }));
        return true;
      } else if (paymentMethod === 'emergency_fund' || (!paymentMethod && s.emergencyFundBalance >= cost)) {
        sound.playCoin();
        const updates = choice.effect({ ...s, cash: s.cash + cost });
        setState((prev) => ({
          ...prev,
          ...updates,
          emergencyFundBalance: Math.max(0, prev.emergencyFundBalance - cost),
          pendingInteractiveEvent: null,
        }));
        return true;
      } else {
        sound.playBuzzer();
        return false;
      }
    }

    sound.playFanfare();

    const updates = choice.effect(s);
    setState((prev) => ({
      ...prev,
      ...updates,
      pendingInteractiveEvent: null,
    }));

    return true;
  }, []);

  const dismissInteractiveEvent = useCallback(() => {
    sound.playClick();
    setState((prev) => ({
      ...prev,
      pendingInteractiveEvent: null,
    }));
  }, []);

  // Emergency Fund Deposits & Withdrawals
  const depositEmergencyFund = useCallback((amount: number) => {
    const s = stateRef.current;
    if (s.cash < amount || amount <= 0) {
      sound.playBuzzer();
      return false;
    }
    sound.playBuy();
    setState((prev) => ({
      ...prev,
      cash: prev.cash - amount,
      emergencyFundBalance: prev.emergencyFundBalance + amount,
    }));
    return true;
  }, []);

  const withdrawEmergencyFund = useCallback((amount: number) => {
    const s = stateRef.current;
    if (s.emergencyFundBalance < amount || amount <= 0) {
      sound.playBuzzer();
      return false;
    }
    sound.playCoin();
    setState((prev) => ({
      ...prev,
      cash: prev.cash + amount,
      emergencyFundBalance: prev.emergencyFundBalance - amount,
    }));
    return true;
  }, []);

  // Credit Card Repayment
  const payCreditCardBill = useCallback((amount: number) => {
    const s = stateRef.current;
    if (s.cash < amount || amount <= 0) {
      sound.playBuzzer();
      return false;
    }
    sound.playCoin();
    setState((prev) => ({
      ...prev,
      cash: prev.cash - amount,
      creditCardSpend: Math.max(0, prev.creditCardSpend - amount),
      cibilScore: Math.min(900, prev.cibilScore + 5),
    }));
    return true;
  }, []);

  // Manual Coffee Brew
  const serveCoffeeManually = useCallback(() => {
    const s = stateRef.current;
    if (s.beansStock < 15 || s.milkStock < 50 || s.cupsStock < 1) {
      sound.playBuzzer();
      return false;
    }

    let qualityScore = 100;
    Object.keys(s.purchasedUpgrades).forEach((upId) => {
      const up = BUSINESS_UPGRADES.find((u) => u.id === upId);
      if (up) qualityScore += up.qualityBoost * 10;
    });

    const tipBonus = Math.floor(Math.random() * (qualityScore / 25));
    const totalEarned = s.cupPrice + tipBonus;

    sound.playServe();
    sound.playCoin();

    setState((prev) => ({
      ...prev,
      cash: prev.cash + totalEarned,
      beansStock: Math.max(0, prev.beansStock - 15),
      milkStock: Math.max(0, prev.milkStock - 50),
      cupsStock: Math.max(0, prev.cupsStock - 1),
      sugarStock: Math.max(0, prev.sugarStock - 8),
      totalCupsSold: prev.totalCupsSold + 1,
      lifetimeRevenue: prev.lifetimeRevenue + totalEarned,
    }));

    return true;
  }, []);

  // Serve a specific live customer with custom tip and bonus rating
  const serveCustomCustomerOrder = useCallback((totalEarnings: number, tip: number, customerName: string) => {
    const s = stateRef.current;
    if (s.beansStock < 15 || s.milkStock < 50 || s.cupsStock < 1) {
      sound.playBuzzer();
      return false;
    }

    setState((prev) => ({
      ...prev,
      cash: prev.cash + totalEarnings,
      beansStock: Math.max(0, prev.beansStock - 15),
      milkStock: Math.max(0, prev.milkStock - 50),
      cupsStock: Math.max(0, prev.cupsStock - 1),
      sugarStock: Math.max(0, prev.sugarStock - 8),
      totalCupsSold: prev.totalCupsSold + 1,
      lifetimeRevenue: prev.lifetimeRevenue + totalEarnings,
      googleRating: Math.min(5.0, prev.googleRating + 0.02),
    }));

    return true;
  }, []);

  // Buy Inventory
  const buyInventory = useCallback((itemType: 'beans' | 'milk' | 'cups' | 'sugar', quantity: number) => {
    let costPerUnit = 0;
    let unitsAmount = 0;

    switch (itemType) {
      case 'beans':
        costPerUnit = 450; // ₹450 for 1kg (1000g)
        unitsAmount = 1000 * quantity;
        break;
      case 'milk':
        costPerUnit = 300; // ₹300 for 5L (5000ml)
        unitsAmount = 5000 * quantity;
        break;
      case 'cups':
        costPerUnit = 150; // ₹150 for 100 cups
        unitsAmount = 100 * quantity;
        break;
      case 'sugar':
        costPerUnit = 100; // ₹100 for 2kg (2000g)
        unitsAmount = 2000 * quantity;
        break;
    }

    const totalCost = costPerUnit * quantity;
    if (stateRef.current.cash < totalCost) {
      sound.playBuzzer();
      return false;
    }

    sound.playBuy();

    setState((prev) => ({
      ...prev,
      cash: prev.cash - totalCost,
      beansStock: itemType === 'beans' ? prev.beansStock + unitsAmount : prev.beansStock,
      milkStock: itemType === 'milk' ? prev.milkStock + unitsAmount : prev.milkStock,
      cupsStock: itemType === 'cups' ? prev.cupsStock + unitsAmount : prev.cupsStock,
      sugarStock: itemType === 'sugar' ? prev.sugarStock + unitsAmount : prev.sugarStock,
    }));

    return true;
  }, []);

  // Progression & Staff & Upgrades
  const upgradeShopLevel = useCallback((targetLevel: number) => {
    const levelData = SHOP_LEVELS.find((l) => l.id === targetLevel);
    if (!levelData) return false;

    const s = stateRef.current;
    if (s.cash < levelData.costToUnlock) {
      sound.playBuzzer();
      return false;
    }

    sound.playLevelUp();

    setState((prev) => ({
      ...prev,
      cash: prev.cash - levelData.costToUnlock,
      shopLevel: targetLevel as ShopLevelId,
      cupPrice: Math.max(prev.cupPrice, levelData.baseCupPrice),
    }));

    return true;
  }, []);

  const setCupPrice = useCallback((price: number) => {
    setState((prev) => ({ ...prev, cupPrice: Math.max(10, Math.min(5000, price)) }));
  }, []);

  const hireStaff = useCallback((staffId: string) => {
    const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
    if (!staff) return false;

    const s = stateRef.current;
    if (s.cash < staff.hiringCost || s.shopLevel < staff.unlockedAtLevel) {
      sound.playBuzzer();
      return false;
    }

    sound.playUpgrade();

    setState((prev) => ({
      ...prev,
      cash: prev.cash - staff.hiringCost,
      hiredStaff: {
        ...prev.hiredStaff,
        [staffId]: (prev.hiredStaff[staffId] || 0) + 1,
      },
      staffMoraleScore: Math.min(100, prev.staffMoraleScore + 5),
    }));

    return true;
  }, []);

  const fireStaff = useCallback((staffId: string) => {
    const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
    if (!staff) return false;

    const s = stateRef.current;
    const currentCount = s.hiredStaff[staffId] || 0;
    if (currentCount <= 0) {
      sound.playBuzzer();
      return false;
    }

    sound.playClick();

    setState((prev) => {
      const nextCount = (prev.hiredStaff[staffId] || 0) - 1;
      const nextHired = { ...prev.hiredStaff };
      if (nextCount <= 0) {
        delete nextHired[staffId];
      } else {
        nextHired[staffId] = nextCount;
      }
      return {
        ...prev,
        hiredStaff: nextHired,
        staffMoraleScore: Math.max(20, prev.staffMoraleScore - 2),
      };
    });

    return true;
  }, []);

  const buyBusinessUpgrade = useCallback((upgradeId: string) => {
    const upgrade = BUSINESS_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return false;

    const s = stateRef.current;
    if (s.cash < upgrade.cost || s.shopLevel < upgrade.unlockedAtLevel || s.purchasedUpgrades[upgradeId]) {
      sound.playBuzzer();
      return false;
    }

    sound.playUpgrade();

    setState((prev) => ({
      ...prev,
      cash: prev.cash - upgrade.cost,
      purchasedUpgrades: {
        ...prev.purchasedUpgrades,
        [upgradeId]: true,
      },
    }));

    return true;
  }, []);

  const buyLuxury = useCallback((luxuryId: string) => {
    const lux = LUXURY_ITEMS.find((l) => l.id === luxuryId);
    if (!lux) return false;

    const s = stateRef.current;
    if (s.cash < lux.purchaseCost) {
      sound.playBuzzer();
      return false;
    }

    sound.playBuy();

    setState((prev) => {
      const existing = prev.purchasedLuxuries[luxuryId] || {
        count: 0,
        currentEstimatedValue: 0,
      };
      return {
        ...prev,
        cash: prev.cash - lux.purchaseCost,
        purchasedLuxuries: {
          ...prev.purchasedLuxuries,
          [luxuryId]: {
            count: existing.count + 1,
            currentEstimatedValue: existing.currentEstimatedValue + lux.purchaseCost,
          },
        },
      };
    });

    return true;
  }, []);

  const sellLuxury = useCallback((luxuryId: string) => {
    const s = stateRef.current;
    const existing = s.purchasedLuxuries[luxuryId];
    if (!existing || existing.count <= 0) return false;

    const resaleValue = Math.round(existing.currentEstimatedValue / existing.count);
    sound.playCoin();

    setState((prev) => {
      const cur = prev.purchasedLuxuries[luxuryId];
      if (!cur || cur.count <= 1) {
        const next = { ...prev.purchasedLuxuries };
        delete next[luxuryId];
        return {
          ...prev,
          cash: prev.cash + resaleValue,
          purchasedLuxuries: next,
        };
      }
      return {
        ...prev,
        cash: prev.cash + resaleValue,
        purchasedLuxuries: {
          ...prev.purchasedLuxuries,
          [luxuryId]: {
            count: cur.count - 1,
            currentEstimatedValue: Math.max(0, cur.currentEstimatedValue - resaleValue),
          },
        },
      };
    });

    return true;
  }, []);

  // Stock Market & Investments
  const buyStock = useCallback((stockId: string, quantity: number) => {
    const stock = STOCKS_DATA.find((s) => s.id === stockId);
    if (!stock || quantity <= 0) return false;

    const s = stateRef.current;
    const curPrice = s.stockPrices[stockId] || stock.currentPrice;
    const totalCost = curPrice * quantity;

    if (s.cash < totalCost) {
      sound.playBuzzer();
      return false;
    }

    sound.playBuy();

    setState((prev) => {
      const owned = prev.stocksOwned[stockId] || { quantity: 0, avgBuyPrice: 0 };
      const newQty = owned.quantity + quantity;
      const newAvg = (owned.quantity * owned.avgBuyPrice + totalCost) / newQty;

      return {
        ...prev,
        cash: prev.cash - totalCost,
        stocksOwned: {
          ...prev.stocksOwned,
          [stockId]: {
            quantity: newQty,
            avgBuyPrice: Math.round(newAvg),
          },
        },
      };
    });

    return true;
  }, []);

  const sellStock = useCallback((stockId: string, quantity: number) => {
    const s = stateRef.current;
    const owned = s.stocksOwned[stockId];
    if (!owned || owned.quantity < quantity || quantity <= 0) {
      sound.playBuzzer();
      return false;
    }

    const curPrice = s.stockPrices[stockId] || 100;
    const totalProceeds = curPrice * quantity;
    sound.playCoin();

    setState((prev) => {
      const cur = prev.stocksOwned[stockId];
      if (!cur) return prev;
      const remainingQty = cur.quantity - quantity;

      if (remainingQty <= 0) {
        const next = { ...prev.stocksOwned };
        delete next[stockId];
        return {
          ...prev,
          cash: prev.cash + totalProceeds,
          stocksOwned: next,
        };
      }

      return {
        ...prev,
        cash: prev.cash + totalProceeds,
        stocksOwned: {
          ...prev.stocksOwned,
          [stockId]: {
            quantity: remainingQty,
            avgBuyPrice: cur.avgBuyPrice,
          },
        },
      };
    });

    return true;
  }, []);

  const toggleMutualFundSip = useCallback((fundId: string, sipAmount: number) => {
    setState((prev) => {
      const cur = prev.mutualFundsOwned[fundId] || {
        units: 0,
        totalInvested: 0,
        isSipActive: false,
        dailySipAmount: sipAmount,
      };

      return {
        ...prev,
        mutualFundsOwned: {
          ...prev.mutualFundsOwned,
          [fundId]: {
            ...cur,
            isSipActive: !cur.isSipActive,
            dailySipAmount: sipAmount,
          },
        },
      };
    });
  }, []);

  const investLumpSumMutualFund = useCallback((fundId: string, amount: number) => {
    const s = stateRef.current;
    if (s.cash < amount || amount <= 0) {
      sound.playBuzzer();
      return false;
    }

    const currentNav = s.mutualFundNavs[fundId] || 100;
    const unitsBought = amount / currentNav;
    sound.playBuy();

    setState((prev) => {
      const cur = prev.mutualFundsOwned[fundId] || {
        units: 0,
        totalInvested: 0,
        isSipActive: false,
        dailySipAmount: 500,
      };

      return {
        ...prev,
        cash: prev.cash - amount,
        mutualFundsOwned: {
          ...prev.mutualFundsOwned,
          [fundId]: {
            ...cur,
            units: cur.units + unitsBought,
            totalInvested: cur.totalInvested + amount,
          },
        },
      };
    });

    return true;
  }, []);

  const buyRealEstate = useCallback((propertyId: string) => {
    const prop = REAL_ESTATE_DATA.find((p) => p.id === propertyId);
    if (!prop) return false;

    const s = stateRef.current;
    if (s.cash < prop.cost) {
      sound.playBuzzer();
      return false;
    }

    sound.playFanfare();

    setState((prev) => {
      const cur = prev.realEstateOwned[propertyId] || {
        count: 0,
        currentMarketValue: prop.cost,
      };

      return {
        ...prev,
        cash: prev.cash - prop.cost,
        realEstateOwned: {
          ...prev.realEstateOwned,
          [propertyId]: {
            count: cur.count + 1,
            currentMarketValue: cur.currentMarketValue || prop.cost,
          },
        },
      };
    });

    return true;
  }, []);

  const buyGold = useCallback((grams: number) => {
    const s = stateRef.current;
    const totalCost = grams * s.goldPricePerGram;
    if (s.cash < totalCost || grams <= 0) {
      sound.playBuzzer();
      return false;
    }

    sound.playBuy();

    setState((prev) => ({
      ...prev,
      cash: prev.cash - totalCost,
      goldGramsOwned: prev.goldGramsOwned + grams,
    }));

    return true;
  }, []);

  const sellGold = useCallback((grams: number) => {
    const s = stateRef.current;
    if (s.goldGramsOwned < grams || grams <= 0) {
      sound.playBuzzer();
      return false;
    }

    const proceeds = grams * s.goldPricePerGram;
    sound.playCoin();

    setState((prev) => ({
      ...prev,
      cash: prev.cash + proceeds,
      goldGramsOwned: prev.goldGramsOwned - grams,
    }));

    return true;
  }, []);

  const takeLoan = useCallback((loanPlanId: string, amount: number) => {
    const plan = LOAN_PLANS.find((p) => p.id === loanPlanId);
    if (!plan) return false;

    const s = stateRef.current;
    if (s.cibilScore < plan.minCibilRequired || amount > plan.maxAmount) {
      sound.playBuzzer();
      return false;
    }

    const interest = amount * (plan.interestRateAnnual * (plan.tenureDays / 365));
    const totalRepay = Math.round(amount + interest);
    const dailyEmi = Math.round(totalRepay / plan.tenureDays);

    const newLoan: ActiveLoan = {
      id: `loan_${Date.now()}`,
      loanPlanId,
      principalAmount: amount,
      remainingAmount: totalRepay,
      interestRate: plan.interestRateAnnual,
      dailyEmi,
      daysRemaining: plan.tenureDays,
      totalDays: plan.tenureDays,
      totalRepaymentWithInterest: totalRepay,
    };

    sound.playFanfare();

    setState((prev) => ({
      ...prev,
      cash: prev.cash + amount,
      activeLoans: [...prev.activeLoans, newLoan],
    }));

    return true;
  }, []);

  const repayLoanPrepayment = useCallback((loanId: string, amount: number) => {
    const s = stateRef.current;
    if (s.cash < amount || amount <= 0) {
      sound.playBuzzer();
      return false;
    }

    sound.playCoin();

    setState((prev) => {
      const updatedLoans: ActiveLoan[] = [];
      let cibilBonus = 0;

      prev.activeLoans.forEach((loan) => {
        if (loan.id === loanId) {
          const rem = loan.remainingAmount - amount;
          if (rem <= 0) {
            cibilBonus += 15;
          } else {
            updatedLoans.push({
              ...loan,
              remainingAmount: rem,
            });
          }
        } else {
          updatedLoans.push(loan);
        }
      });

      return {
        ...prev,
        cash: prev.cash - amount,
        cibilScore: Math.min(900, prev.cibilScore + cibilBonus),
        activeLoans: updatedLoans,
      };
    });

    return true;
  }, []);

  const answerQuiz = useCallback((quizId: string, optionIndex: number) => {
    const quiz = FINANCIAL_QUIZZES.find((q) => q.id === quizId);
    if (!quiz) return false;

    const isCorrect = optionIndex === quiz.correctIndex;
    if (isCorrect) {
      sound.playFanfare();
      setState((prev) => ({
        ...prev,
        cash: prev.cash + quiz.rewardCash,
        completedQuizIds: [...new Set([...prev.completedQuizIds, quizId])],
      }));
      return true;
    } else {
      sound.playBuzzer();
      return false;
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setState((prev) => ({ ...prev, language: lang }));
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setState((prev) => ({ ...prev, soundEnabled: enabled }));
  }, []);

  const setGameSpeed = useCallback((speed: 1 | 2 | 5) => {
    setState((prev) => ({ ...prev, gameSpeed: speed }));
  }, []);

  const togglePause = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(INITIAL_GAME_STATE);
  }, []);

  const exportSave = useCallback(() => {
    return JSON.stringify(stateRef.current);
  }, []);

  const importSave = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed.cash === 'number') {
        setState(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
    } catch {
      // safe fallback
    }
    return false;
  }, []);

  // Compute Full Detailed Real-Life P&L Statement
  const computeDetailedPnL = useCallback((): BusinessPnLBreakdown => {
    const curLevel = SHOP_LEVELS.find((l) => l.id === state.shopLevel) || SHOP_LEVELS[0];
    const hasSolar = state.purchasedUpgrades['solar_rooftop_5kw'];
    const actualPower = curLevel.dailyPowerCost * (hasSolar ? 0.45 : 1.0);

    // Revenue
    const dailyEstCups = curLevel.baseCustomerFlow;
    const inStoreSales = state.isOnlineDeliveryActive
      ? dailyEstCups * 0.75 * state.cupPrice
      : dailyEstCups * state.cupPrice;
    const onlineDeliverySales = state.isOnlineDeliveryActive
      ? dailyEstCups * 0.35 * state.cupPrice
      : 0;

    let passiveRentalIncome = 0;
    Object.entries(state.realEstateOwned).forEach(([propId, data]: [string, OwnedRealEstate | undefined]) => {
      if (!data) return;
      const prop = REAL_ESTATE_DATA.find((p) => p.id === propId);
      if (prop && (data.count || 0) > 0) {
        passiveRentalIncome += prop.dailyRentalIncome * (data.count || 0);
      }
    });

    let stockDividends = 0;
    Object.entries(state.stocksOwned).forEach(([stockId, data]: [string, OwnedStock | undefined]) => {
      if (!data) return;
      const stock = STOCKS_DATA.find((st) => st.id === stockId);
      if (stock && (data.quantity || 0) > 0) {
        stockDividends +=
          ((data.quantity || 0) * (state.stockPrices[stockId] || stock.currentPrice) * stock.dividendYield) / 365;
      }
    });

    const fdBondInterest = (state.emergencyFundBalance * 0.05) / 365;
    const totalDailyRevenue =
      inStoreSales + onlineDeliverySales + passiveRentalIncome + stockDividends + fdBondInterest;

    // Expenses
    const rentCost = curLevel.dailyRentCost;
    const electricityPowerCost = actualPower;
    const waterSanitationCost = curLevel.dailyWaterSanitationCost;
    const machineAmcCost = curLevel.dailyMachineAmcCost;
    const packagingDisposablesCost = dailyEstCups * curLevel.packagingCostPerCup;
    const dailySpoilageWastageCost = Math.round(
      (state.beansStock * 0.05 * 0.45) + (state.milkStock * 0.05 * 0.06)
    );

    let staffSalaries = 0;
    let staffCount = 0;
    Object.entries(state.hiredStaff).forEach(([staffId, countRaw]) => {
      const count = Number(countRaw) || 0;
      const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
      if (staff) {
        staffSalaries += staff.dailySalary * count;
        staffCount += count;
      }
    });

    const staffBenefitsInsurance = state.hasStaffHealthInsurance ? staffCount * 45 : 0;
    const onlinePlatformCommission = state.isOnlineDeliveryActive ? onlineDeliverySales * 0.2 : 0;
    const gstTax = Math.round((inStoreSales + onlineDeliverySales) * 0.05);

    const grossProfitEst = totalDailyRevenue - (rentCost + electricityPowerCost + waterSanitationCost + staffSalaries);
    const advanceIncomeTax = grossProfitEst > 2000 ? Math.round(grossProfitEst * 0.1) : 0;

    let loanEmis = 0;
    state.activeLoans.forEach((loan) => {
      loanEmis += loan.dailyEmi;
    });

    let luxuryLiabilitiesDrain = 0;
    Object.entries(state.purchasedLuxuries).forEach(([luxId, data]: [string, OwnedLuxury | undefined]) => {
      if (!data) return;
      const lux = LUXURY_ITEMS.find((l) => l.id === luxId);
      if (lux && (data.count || 0) > 0) {
        luxuryLiabilitiesDrain += lux.dailyMaintenanceCost * (data.count || 0);
      }
    });

    const totalDailyExpenses =
      rentCost +
      electricityPowerCost +
      waterSanitationCost +
      machineAmcCost +
      packagingDisposablesCost +
      dailySpoilageWastageCost +
      staffSalaries +
      staffBenefitsInsurance +
      onlinePlatformCommission +
      gstTax +
      advanceIncomeTax +
      loanEmis +
      luxuryLiabilitiesDrain;

    const netDailyProfit = Math.round(totalDailyRevenue - totalDailyExpenses);
    const profitMarginPercent =
      totalDailyRevenue > 0 ? +((netDailyProfit / totalDailyRevenue) * 100).toFixed(1) : 0;

    return {
      inStoreSales: Math.round(inStoreSales),
      onlineDeliverySales: Math.round(onlineDeliverySales),
      passiveRentalIncome: Math.round(passiveRentalIncome),
      stockDividends: Math.round(stockDividends),
      fdBondInterest: Math.round(fdBondInterest),
      totalDailyRevenue: Math.round(totalDailyRevenue),

      rentCost: Math.round(rentCost),
      electricityPowerCost: Math.round(electricityPowerCost),
      waterSanitationCost: Math.round(waterSanitationCost),
      machineAmcCost: Math.round(machineAmcCost),
      packagingDisposablesCost: Math.round(packagingDisposablesCost),
      dailySpoilageWastageCost: Math.round(dailySpoilageWastageCost),
      staffSalaries: Math.round(staffSalaries),
      staffBenefitsInsurance: Math.round(staffBenefitsInsurance),
      onlinePlatformCommission: Math.round(onlinePlatformCommission),
      gstTax: Math.round(gstTax),
      advanceIncomeTax: Math.round(advanceIncomeTax),
      loanEmis: Math.round(loanEmis),
      luxuryLiabilitiesDrain: Math.round(luxuryLiabilitiesDrain),
      totalDailyExpenses: Math.round(totalDailyExpenses),

      netDailyProfit,
      profitMarginPercent,
    };
  }, [state]);

  // Compute Current Total Net Worth
  const computeFinancials = useCallback(() => {
    let stockValue = 0;
    Object.entries(state.stocksOwned).forEach(([stockId, data]: [string, OwnedStock | undefined]) => {
      if (data) stockValue += (data.quantity || 0) * (state.stockPrices[stockId] || 100);
    });

    let mfValue = 0;
    Object.entries(state.mutualFundsOwned).forEach(([fundId, data]: [string, OwnedMutualFund | undefined]) => {
      if (data) mfValue += (data.units || 0) * (state.mutualFundNavs[fundId] || 100);
    });

    const goldValue = state.goldGramsOwned * state.goldPricePerGram;

    let realEstateValue = 0;
    let dailyRentalIncome = 0;
    Object.entries(state.realEstateOwned).forEach(([propId, data]: [string, OwnedRealEstate | undefined]) => {
      if (!data) return;
      realEstateValue += (data.currentMarketValue || 0) * (data.count || 0);
      const prop = REAL_ESTATE_DATA.find((p) => p.id === propId);
      if (prop) dailyRentalIncome += prop.dailyRentalIncome * (data.count || 0);
    });

    let luxuryCurrentValue = 0;
    let dailyLuxuryDrain = 0;
    Object.entries(state.purchasedLuxuries).forEach(([luxId, data]: [string, OwnedLuxury | undefined]) => {
      if (!data) return;
      luxuryCurrentValue += data.currentEstimatedValue || 0;
      const lux = LUXURY_ITEMS.find((l) => l.id === luxId);
      if (lux) dailyLuxuryDrain += lux.dailyMaintenanceCost * (data.count || 0);
    });

    let totalDebt = state.creditCardSpend;
    let dailyEmiTotal = 0;
    state.activeLoans.forEach((loan) => {
      totalDebt += loan.remainingAmount;
      dailyEmiTotal += loan.dailyEmi;
    });

    let staffSalaryPerDay = 0;
    Object.entries(state.hiredStaff).forEach(([staffId, countRaw]) => {
      const count = Number(countRaw) || 0;
      const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
      if (staff) staffSalaryPerDay += staff.dailySalary * count;
    });

    let upgradeCashflowPerDay = 0;
    Object.keys(state.purchasedUpgrades).forEach((upId) => {
      const up = BUSINESS_UPGRADES.find((u) => u.id === upId);
      if (up) upgradeCashflowPerDay += up.dailyCashflowBoost;
    });

    const franchiseRoyaltyPerDay = state.shopLevel === 5 ? 45000 : 0;
    const emergencyInterest = (state.emergencyFundBalance * 0.05) / 365;

    const totalPassiveIncomePerDay =
      dailyRentalIncome + upgradeCashflowPerDay + franchiseRoyaltyPerDay + emergencyInterest;
    const totalDailyExpenses = staffSalaryPerDay + dailyLuxuryDrain + dailyEmiTotal;

    const totalAssets =
      state.cash + state.emergencyFundBalance + stockValue + mfValue + goldValue + realEstateValue;
    const netWorth = totalAssets - totalDebt;

    return {
      netWorth,
      totalAssets,
      totalLiabilities: totalDebt + luxuryCurrentValue,
      stockValue,
      mfValue,
      goldValue,
      realEstateValue,
      luxuryCurrentValue,
      totalDebt,
      dailyRentalIncome,
      totalPassiveIncomePerDay,
      totalDailyExpenses,
      dailyLuxuryDrain,
      dailyEmiTotal,
      staffSalaryPerDay,
    };
  }, [state]);

  const closeOfflineModal = useCallback(() => {
    setOfflineEarningsModal(null);
  }, []);

  const claimAchievementReward = useCallback((achievementId: string) => {
    const s = stateRef.current;
    const ach = ACHIEVEMENTS_LIST.find((a) => a.id === achievementId);
    if (!ach) return false;

    const claimed = s.claimedAchievementIds || [];
    if (claimed.includes(achievementId)) return false;

    sound.playFanfare();
    sound.playCoin();

    setState((prev) => ({
      ...prev,
      cash: prev.cash + ach.rewardCash,
      unlockedAchievementIds: Array.from(new Set([...(prev.unlockedAchievementIds || []), achievementId])),
      claimedAchievementIds: Array.from(new Set([...claimed, achievementId])),
    }));

    setLatestUnlockedAchievement((prev) => (prev?.id === achievementId ? null : prev));
    return true;
  }, []);

  const dismissAchievementNotification = useCallback(() => {
    setLatestUnlockedAchievement(null);
  }, []);

  // Monitor achievements unlock in real-time
  useEffect(() => {
    const fin = computeFinancials();
    const alreadyUnlocked = new Set(state.unlockedAchievementIds || []);
    let newUnlockFound: Achievement | null = null;
    const nextUnlockedList = [...alreadyUnlocked];

    ACHIEVEMENTS_LIST.forEach((ach) => {
      if (!alreadyUnlocked.has(ach.id)) {
        if (ach.requirement(state, fin.netWorth)) {
          nextUnlockedList.push(ach.id);
          if (!newUnlockFound) {
            newUnlockFound = ach;
          }
        }
      }
    });

    if (nextUnlockedList.length > alreadyUnlocked.size) {
      setState((prev) => ({
        ...prev,
        unlockedAchievementIds: nextUnlockedList,
      }));

      if (newUnlockFound) {
        sound.playFanfare();
        setLatestUnlockedAchievement(newUnlockFound);
      }
    }
  }, [
    state.cash,
    state.totalCupsSold,
    state.cibilScore,
    state.shopLevel,
    state.googleRating,
    state.cleanlinessScore,
    state.emergencyFundBalance,
    state.realEstateOwned,
    state.activeLoans,
    state.creditCardSpend,
    state.gstCollectedLifetime,
    state.advanceTaxPaidLifetime,
    computeFinancials,
  ]);

  return {
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
    setTheme,
    toggleTheme,
    resetGame,
    exportSave,
    importSave,
    offlineEarningsModal,
    closeOfflineModal,
    latestUnlockedAchievement,
    claimAchievementReward,
    dismissAchievementNotification,

    // Smart Ad Reward Actions
    activateRushHourBoost: (durationSeconds = 180) => {
      sound.playFanfare();
      sound.playChaChing();
      setState((prev) => ({
        ...prev,
        activeRushBoostSecondsRemaining: (prev.activeRushBoostSecondsRemaining || 0) + durationSeconds,
        totalAdsWatched: (prev.totalAdsWatched || 0) + 1,
      }));
    },
    claimLuckyInvestorGrant: (grantAmount: number) => {
      sound.playFanfare();
      sound.playChaChing();
      setState((prev) => ({
        ...prev,
        cash: prev.cash + grantAmount,
        totalAdsWatched: (prev.totalAdsWatched || 0) + 1,
        luckyInvestorCashPool: Math.round(grantAmount * 1.35), // Scales up as player grows!
      }));
    },
    claimOfflineMultiplierReward: (multiplier: number) => {
      sound.playFanfare();
      sound.playChaChing();
      setState((prev) => {
        if (!offlineEarningsModal) return prev;
        const extraCash = Math.max(0, offlineEarningsModal.netCashChange * (multiplier - 1));
        return {
          ...prev,
          cash: prev.cash + extraCash,
          totalAdsWatched: (prev.totalAdsWatched || 0) + 1,
        };
      });
    },
  };
};
