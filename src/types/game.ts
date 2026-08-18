export type Language = 'hi' | 'en';

export type GameTab = 
  | 'shop' 
  | 'reinvest' 
  | 'investments' 
  | 'banking' 
  | 'balance_sheet' 
  | 'operations'
  | 'advisor' 
  | 'achievements';

export type ShopLevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type TimeOfDayPeriod = 'morning_rush' | 'afternoon_work' | 'evening_peak' | 'night_chill';

export interface ShopLevel {
  id: ShopLevelId;
  name: { en: string; hi: string };
  tagline: { en: string; hi: string };
  description: { en: string; hi: string };
  costToUnlock: number;
  minNetWorthRequired: number;
  baseCustomerFlow: number; // customers per day
  baseCupPrice: number;
  imageIcon: string;
  gradient: [string, string];
  perks: { en: string[]; hi: string[] };
  
  // Real-life recurring overhead expenses
  dailyRentCost: number; // Commercial shop rent per day
  dailyPowerCost: number; // Electricity, AC & lighting bill per day
  dailyWaterSanitationCost: number; // Water purifier RO & municipal sanitation
  packagingCostPerCup: number; // Branded cup, sleeve, stirrer, tissue
  dailyMachineAmcCost: number; // Espresso machine servicing & calibration AMC
  dailyComplianceCost: number; // FSSAI, Municipal trade license & GST compliance
}

export interface InventoryItem {
  id: 'beans' | 'milk' | 'cups' | 'sugar';
  name: { en: string; hi: string };
  unit: string;
  costPerBatch: number;
  unitsPerBatch: number;
  icon: string;
}

export interface StaffMember {
  id: string;
  name: { en: string; hi: string };
  role: 'barista' | 'cashier' | 'cleaner' | 'manager' | 'rider' | 'head_chef' | 'supervisor';
  hiringCost: number;
  dailySalary: number;
  autoServesPerSec: number;
  happinessBoost: number;
  description: { en: string; hi: string };
  unlockedAtLevel: number;
  icon: string;
  specialSkill: { en: string; hi: string };
}

export interface StaffTrainingProgram {
  id: string;
  name: { en: string; hi: string };
  cost: number;
  category: 'hygiene' | 'hospitality' | 'brewing' | 'management';
  description: { en: string; hi: string };
  perkDescription: { en: string; hi: string };
  icon: string;
}

export interface BusinessUpgrade {
  id: string;
  name: { en: string; hi: string };
  cost: number;
  dailyCashflowBoost: number; // positive cashflow
  qualityBoost: number; // increases cup price tolerance
  speedBoost: number; // faster serving
  description: { en: string; hi: string };
  type: 'equipment' | 'decor' | 'marketing' | 'tech';
  unlockedAtLevel: number;
  icon: string;
  energySavingPercentage?: number; // cuts electricity bill
  wastageReductionPercentage?: number; // cuts milk/bean spoilage
}

export interface LuxuryItem {
  id: string;
  name: { en: string; hi: string };
  category: 'vehicle' | 'gadget' | 'lifestyle' | 'residence';
  purchaseCost: number;
  dailyMaintenanceCost: number; // recurring liability drain
  depreciationRatePerDay: number; // e.g. 0.001
  statusPoints: number;
  financialLesson: { en: string; hi: string };
  icon: string;
  imageBg: string;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: 'Tech' | 'FMCG' | 'Energy' | 'Finance' | 'Coffee Retail';
  currentPrice: number;
  basePrice: number;
  volatility: number; // 0.01 to 0.08
  dividendYield: number; // annual yield % e.g. 0.03
  priceHistory: number[]; // last 20 prices
  description: { en: string; hi: string };
}

export interface MutualFund {
  id: string;
  name: { en: string; hi: string };
  type: 'Index Fund (Large Cap)' | 'Flexi Cap Fund' | 'Small Cap Growth Fund';
  riskLevel: 'Low' | 'Moderate' | 'High';
  expectedAnnualReturn: number; // e.g. 0.12 = 12%
  nav: number; // Net Asset Value
  minSipAmount: number;
  description: { en: string; hi: string };
}

export interface RealEstateProperty {
  id: string;
  name: { en: string; hi: string };
  type: 'Residential 1BHK' | 'Commercial Cafe Outlet' | 'Luxury Penthouse' | 'Coorg Coffee Plantation';
  cost: number;
  dailyRentalIncome: number; // passive cashflow
  appreciationRateDaily: number; // property value growth
  location: string;
  icon: string;
  description: { en: string; hi: string };
}

export interface FixedDeposit {
  id: string;
  principal: number;
  interestRate: number; // e.g. 0.075 (7.5%)
  durationDays: number;
  daysRemaining: number;
  startDate: number;
}

export interface SovereignBond {
  id: string;
  name: { en: string; hi: string };
  costPerUnit: number;
  annualInterestRate: number; // 2.5% + gold price appreciation
  description: { en: string; hi: string };
}

export interface LoanPlan {
  id: string;
  title: { en: string; hi: string };
  maxAmount: number;
  interestRateAnnual: number; // e.g. 0.12 (12%)
  tenureDays: number; // e.g. 30 days = 30 game days
  minCibilRequired: number;
  description: { en: string; hi: string };
}

export interface ActiveLoan {
  id: string;
  loanPlanId: string;
  principalAmount: number;
  totalRepaymentWithInterest: number;
  remainingAmount: number;
  dailyEmi: number;
  daysRemaining: number;
  totalDays: number;
  interestRate: number;
}

export interface InteractiveEventChoice {
  id: string;
  label: { en: string; hi: string };
  description: { en: string; hi: string };
  costCash?: number;
  outcomeText: { en: string; hi: string };
  effect: (state: GameState) => Partial<GameState>;
}

export interface InteractiveDailyEvent {
  id: string;
  title: { en: string; hi: string };
  category: 'supply_chain' | 'marketing' | 'regulatory' | 'staff_hr' | 'macro';
  description: { en: string; hi: string };
  icon: string;
  choices: InteractiveEventChoice[];
}

export interface DailyEvent {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  impactType: 'sales_boost' | 'sales_drop' | 'stock_rally' | 'stock_crash' | 'cost_spike' | 'cash_gift';
  multiplier?: number;
  cashDelta?: number;
  icon: string;
  durationDays: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  customerRole: { en: string; hi: string };
  rating: number; // 1 to 5
  comment: { en: string; hi: string };
  dateFormatted: string;
  avatarIcon: string;
}

export interface QuizQuestion {
  id: string;
  question: { en: string; hi: string };
  options: { en: string; hi: string }[];
  correctIndex: number;
  explanation: { en: string; hi: string };
  rewardCash: number;
}

export type AchievementCategory = 'wealth' | 'debt' | 'real_estate' | 'business';

export interface AchievementProgress {
  current: number;
  target: number;
  unit?: string;
  formattedText?: string;
}

export interface Achievement {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  category: AchievementCategory;
  icon: string;
  rewardCash: number;
  rewardBadgeTitle?: { en: string; hi: string };
  isUnlocked?: boolean;
  unlockedAtDay?: number;
  requirement: (state: GameState, netWorth: number) => boolean;
  getProgress: (state: GameState, netWorth: number) => AchievementProgress;
}

export interface OwnedLuxury {
  count: number;
  currentEstimatedValue: number;
}

export interface OwnedStock {
  quantity: number;
  avgBuyPrice: number;
}

export interface OwnedMutualFund {
  units: number;
  totalInvested: number;
  isSipActive: boolean;
  dailySipAmount: number;
}

export interface OwnedRealEstate {
  count: number;
  currentMarketValue: number;
}

export interface BusinessPnLBreakdown {
  // Revenue
  inStoreSales: number;
  onlineDeliverySales: number;
  passiveRentalIncome: number;
  stockDividends: number;
  fdBondInterest: number;
  totalDailyRevenue: number;

  // Real-Life Operating Expenses
  rentCost: number;
  electricityPowerCost: number;
  waterSanitationCost: number;
  machineAmcCost: number;
  packagingDisposablesCost: number;
  dailySpoilageWastageCost: number;
  staffSalaries: number;
  staffBenefitsInsurance: number;
  onlinePlatformCommission: number;
  gstTax: number;
  advanceIncomeTax: number;
  loanEmis: number;
  luxuryLiabilitiesDrain: number;
  totalDailyExpenses: number;

  // Bottom line
  netDailyProfit: number;
  profitMarginPercent: number;
}

export interface GameState {
  day: number;
  timeOfDaySeconds: number; // 0 to SECONDS_PER_GAME_DAY
  timeOfDayPeriod: TimeOfDayPeriod;
  isPaused: boolean;
  gameSpeed: 1 | 2 | 5;
  language: Language;
  soundEnabled: boolean;
  theme?: 'light' | 'dark';

  // Player Financials
  cash: number;
  cibilScore: number; // 300 to 900
  totalCupsSold: number;
  lifetimeRevenue: number;

  // Coffee Shop Core
  shopLevel: ShopLevelId;
  cupPrice: number;
  
  // Real-Life Operations Metrics
  cleanlinessScore: number; // 0 to 100
  machineHealthScore: number; // 0 to 100
  staffMoraleScore: number; // 0 to 100
  googleRating: number; // 1.0 to 5.0
  recentReviews: CustomerReview[];

  // Real-Life Delivery & Supply
  isOnlineDeliveryActive: boolean; // Swiggy/Zomato orders
  hasStaffHealthInsurance: boolean; // ESIC & Health cover
  unlockedTrainings: Record<string, boolean>; // trainingId -> boolean

  // Emergency Fund & Credit Card
  emergencyFundBalance: number;
  creditCardSpend: number;
  creditCardLimit: number;
  creditCardDaysUntilDue: number;

  // Tax Tracking
  gstCollectedLifetime: number;
  advanceTaxPaidLifetime: number;
  
  // Inventory
  beansStock: number; // grams
  milkStock: number; // ml
  cupsStock: number; // units
  sugarStock: number; // grams
  dailySpoilageBeans: number; // g lost today
  dailySpoilageMilk: number; // ml lost today

  // Active Staff (staffId -> quantity)
  hiredStaff: Record<string, number>;

  // Purchased Upgrades (upgradeId -> boolean)
  purchasedUpgrades: Record<string, boolean>;

  // Purchased Luxuries (luxuryId -> count/currentVal)
  purchasedLuxuries: Record<string, OwnedLuxury>;

  // Investments
  stocksOwned: Record<string, OwnedStock>;
  stockPrices: Record<string, number>;
  stockHistories: Record<string, number[]>;

  mutualFundsOwned: Record<string, OwnedMutualFund>;
  mutualFundNavs: Record<string, number>;

  goldGramsOwned: number;
  goldPricePerGram: number; // ~₹7,600/g
  goldPriceHistory: number[];

  fixedDeposits: FixedDeposit[];
  bondsOwned: Record<string, number>; // bondId -> units

  realEstateOwned: Record<string, OwnedRealEstate>;

  // Debt & Loans
  activeLoans: ActiveLoan[];
  missedEmiCount: number;

  // History & Statistics
  dailyFinancialHistory: {
    day: number;
    netWorth: number;
    cash: number;
    passiveIncome: number;
    expenses: number;
    profit: number;
  }[];

  // Active Events & Quizzes
  activeEvent: DailyEvent | null;
  pendingInteractiveEvent: InteractiveDailyEvent | null;
  completedQuizIds: string[];
  unlockedAchievementIds: string[];
  claimedAchievementIds: string[];

  // Last active timestamp for offline earnings
  lastSavedTimestamp: number;

  // Smart Ad & Earning Multipliers (Reward Boosts)
  activeRushBoostSecondsRemaining: number; // 2x rush hour boost
  isAdMobEnabled: boolean; // simulated / live ad SDK toggle
  totalAdsWatched: number; // ad impression count
  luckyInvestorCashPool: number; // dynamically scaling investor cash grant
}
