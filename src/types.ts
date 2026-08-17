export type Language = 'hi' | 'en';

export type SimCategory = 
  | 'all'
  | 'city_building'
  | 'cozy_farming'
  | 'driving_vehicle'
  | 'flight_space'
  | 'business_tycoon'
  | 'realistic_job'
  | 'survival_colony';

export type Platform = 'pc' | 'steam_deck' | 'playstation' | 'xbox' | 'switch' | 'mobile';

export type HardwareSpec = 'low' | 'mid' | 'high';

export type Vibe = 'relaxing' | 'creative' | 'strategic' | 'hardcore' | 'physics_fun' | 'realistic';

export interface Game {
  id: string;
  title: string;
  category: SimCategory;
  categoryName: { en: string; hi: string };
  tagline: { en: string; hi: string };
  description: { en: string; hi: string };
  whyPlay: { en: string[]; hi: string[] };
  rating: number; // 0 to 5 (e.g. 4.9)
  steamRating: string; // "Overwhelmingly Positive" / "Very Positive"
  releaseYear: number;
  developer: string;
  publisher: string;
  platforms: Platform[];
  hardwareSpec: HardwareSpec;
  hardwareNote: { en: string; hi: string };
  vibe: Vibe[];
  difficulty: 'Casual' | 'Moderate' | 'Challenging' | 'Deep/Complex';
  difficultyHi: 'Aasan / Relaxing' | 'Normal' | 'Challenging' | 'Bahut Deep & Complex';
  timeSinkHours: string; // e.g. "100+ Hours"
  priceType: 'Paid' | 'Free' | 'Subscription / Game Pass';
  badge?: string;
  imageBanner: string;
  gradientColors: [string, string];
  iconName: string;
  keyFeatures: { en: string[]; hi: string[] };
  systemRequirementsMin: {
    os: string;
    processor: string;
    ram: string;
    graphics: string;
  };
  similarGames: string[];
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionHi: string;
  options: {
    textEn: string;
    textHi: string;
    icon: string;
    categoryWeights: Partial<Record<SimCategory, number>>;
    vibeMatch: Vibe[];
    specMatch?: HardwareSpec;
  }[];
}
