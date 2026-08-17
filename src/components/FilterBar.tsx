import React from 'react';
import { 
  Sparkles, 
  Truck, 
  Sprout, 
  Building2, 
  Cog, 
  Plane, 
  Store, 
  ShieldAlert, 
  Cpu, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { SimCategory, HardwareSpec, Vibe, Language } from '../types';
import { GENRE_TABS } from '../data/games';

interface FilterBarProps {
  language: Language;
  selectedCategory: SimCategory;
  onSelectCategory: (cat: SimCategory) => void;
  selectedSpec: HardwareSpec | 'all';
  onSelectSpec: (spec: HardwareSpec | 'all') => void;
  selectedVibe: Vibe | 'all';
  onSelectVibe: (vibe: Vibe | 'all') => void;
  sortBy: 'rating' | 'year' | 'difficulty';
  onSelectSort: (sort: 'rating' | 'year' | 'difficulty') => void;
  totalGamesCount: number;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Truck': return <Truck className="w-4 h-4" />;
    case 'Sprout': return <Sprout className="w-4 h-4" />;
    case 'Building2': return <Building2 className="w-4 h-4" />;
    case 'Cog': return <Cog className="w-4 h-4" />;
    case 'Plane': return <Plane className="w-4 h-4" />;
    case 'Store': return <Store className="w-4 h-4" />;
    case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
    default: return <Sparkles className="w-4 h-4" />;
  }
};

export const FilterBar: React.FC<FilterBarProps> = ({
  language,
  selectedCategory,
  onSelectCategory,
  selectedSpec,
  onSelectSpec,
  selectedVibe,
  onSelectVibe,
  sortBy,
  onSelectSort,
  totalGamesCount
}) => {
  const isHi = language === 'hi';

  const vibes: { id: Vibe | 'all'; labelEn: string; labelHi: string }[] = [
    { id: 'all', labelEn: 'All Vibes', labelHi: 'Sabhi Vibes' },
    { id: 'relaxing', labelEn: 'Chill / Relaxing', labelHi: 'Sukoon / Relaxing' },
    { id: 'creative', labelEn: 'Creative Building', labelHi: 'Creative Building' },
    { id: 'strategic', labelEn: 'Strategic & Tycoon', labelHi: 'Strategic & Tycoon' },
    { id: 'hardcore', labelEn: 'Hardcore Survival', labelHi: 'Hardcore Survival' },
    { id: 'realistic', labelEn: 'Real Physics & Flight', labelHi: 'Real Physics & Flight' },
  ];

  const specs: { id: HardwareSpec | 'all'; labelEn: string; labelHi: string }[] = [
    { id: 'all', labelEn: 'Any PC / Console', labelHi: 'Sabhi Devices' },
    { id: 'low', labelEn: 'Low-Spec / Laptop Friendly', labelHi: 'Halka PC / Laptop Friendly' },
    { id: 'mid', labelEn: 'Mid-Tier PC', labelHi: 'Mid-Tier Gaming PC' },
    { id: 'high', labelEn: 'High-End RTX GPU', labelHi: 'High-End RTX Graphics' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {GENRE_TABS.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              id={`cat-filter-${tab.id}`}
              onClick={() => onSelectCategory(tab.id as SimCategory)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold scale-[1.02]'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700/90 hover:text-white border border-slate-700/60'
              }`}
            >
              {getCategoryIcon(tab.icon)}
              <span>{isHi ? tab.labelHi : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Chips: Vibe, Hardware, Sort */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Vibe Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            {isHi ? 'Vibe:' : 'Vibe:'}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {vibes.map((v) => (
              <button
                key={v.id}
                id={`vibe-chip-${v.id}`}
                onClick={() => onSelectVibe(v.id)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  selectedVibe === v.id
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isHi ? v.labelHi : v.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Hardware & Sort Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap ml-auto">
          {/* Hardware Spec */}
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <select
              id="spec-select-filter"
              value={selectedSpec}
              onChange={(e) => onSelectSpec(e.target.value as HardwareSpec | 'all')}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {specs.map((s) => (
                <option key={s.id} value={s.id}>
                  {isHi ? s.labelHi : s.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">{isHi ? 'Sort:' : 'Sort:'}</span>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value as 'rating' | 'year' | 'difficulty')}
              className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="rating">{isHi ? 'Top Rated (Steam 95%+)' : 'Highest Rated'}</option>
              <option value="year">{isHi ? 'Latest Release' : 'Release Year'}</option>
              <option value="difficulty">{isHi ? 'Beginner Friendly' : 'Easy to Learn'}</option>
            </select>
          </div>

          {/* Result Count Badge */}
          <span className="text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[11px]">
            {totalGamesCount} {isHi ? 'Games' : 'Sims'}
          </span>
        </div>

      </div>
    </div>
  );
};
