import React from 'react';
import { 
  Star, 
  Clock, 
  Cpu, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Gamepad2,
  ChevronRight
} from 'lucide-react';
import { Game, Language } from '../types';

interface GameCardProps {
  game: Game;
  language: Language;
  onOpenDetail: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, language, onOpenDetail }) => {
  const isHi = language === 'hi';

  const getHardwareBadge = (spec: string) => {
    switch (spec) {
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <Cpu className="w-3 h-3" />
            {isHi ? 'Low-Spec / Laptop OK' : 'Budget Laptop OK'}
          </span>
        );
      case 'mid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Cpu className="w-3 h-3" />
            {isHi ? 'Mid-Range PC' : 'Mid Gaming PC'}
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <Cpu className="w-3 h-3" />
            {isHi ? 'High-End RTX GPU' : 'High-End RTX Required'}
          </span>
        );
      default:
        return null;
    }
  };

  const getDifficultyBadge = (difficulty: string, diffHi: string) => {
    return (
      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
        {isHi ? diffHi : difficulty}
      </span>
    );
  };

  return (
    <div 
      id={`game-card-${game.id}`}
      className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-950/20 hover:-translate-y-1"
    >
      {/* Top Banner Image with Gradient Overlay */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={game.imageBanner}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {game.badge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-md">
              <Sparkles className="w-3 h-3" />
              {game.badge}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {game.rating} / 5
          </span>
        </div>

        {/* Bottom Banner Title */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5">
          <span className="text-[11px] font-medium text-emerald-400 block mb-0.5">
            {isHi ? game.categoryName.hi : game.categoryName.en}
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight leading-snug drop-shadow-sm group-hover:text-emerald-300 transition-colors">
            {game.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        
        {/* Tagline / Hook */}
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {isHi ? game.tagline.hi : game.tagline.en}
        </p>

        {/* Why Play Highlights (Top 2 Points) */}
        <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/60 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {isHi ? 'Khaas Baatein (Highlights):' : 'Key Highlights:'}
          </div>
          <ul className="space-y-1">
            {(isHi ? game.whyPlay.hi : game.whyPlay.en).slice(0, 2).map((item, idx) => (
              <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-tight">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specs & Info Meta */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {getHardwareBadge(game.hardwareSpec)}
          {getDifficultyBadge(game.difficulty, game.difficultyHi)}
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-800">
            <Clock className="w-3 h-3 text-slate-400" />
            {game.timeSinkHours}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-400">
            <span className="font-semibold text-emerald-400">{game.steamRating.split(' ')[0]}</span>
            <span className="text-slate-500"> on Steam</span>
          </div>

          <button
            id={`view-details-btn-${game.id}`}
            onClick={() => onOpenDetail(game)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 transition-all duration-200"
          >
            <span>{isHi ? 'Poori Jankari' : 'Game Dossier'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
