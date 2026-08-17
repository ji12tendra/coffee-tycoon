import React from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  Gamepad2, 
  Monitor, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Game, Language } from '../types';

interface GameDetailModalProps {
  game: Game | null;
  language: Language;
  onClose: () => void;
  onSelectSimilarGame: (gameTitle: string) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  language,
  onClose,
  onSelectSimilarGame
}) => {
  if (!game) return null;
  const isHi = language === 'hi';

  const getPlatformLabel = (p: string) => {
    switch (p) {
      case 'pc': return 'Windows PC';
      case 'steam_deck': return 'Steam Deck';
      case 'playstation': return 'PlayStation 4/5';
      case 'xbox': return 'Xbox Series X/S / One';
      case 'switch': return 'Nintendo Switch';
      case 'mobile': return 'Android & iOS';
      default: return p;
    }
  };

  return (
    <div 
      id="game-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="game-detail-modal-container"
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-t-3xl bg-slate-950">
          <img
            src={game.imageBanner}
            alt={game.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-black/30" />
          
          {/* Close button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 backdrop-blur-sm transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Meta Info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isHi ? game.categoryName.hi : game.categoryName.en}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {game.rating} / 5 ({game.steamRating})
              </span>
              <span className="text-xs text-slate-400">
                Released: {game.releaseYear} • {game.developer}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {game.title}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6">
          
          {/* Tagline / Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
              {isHi ? 'Khel Ka Parichay (Overview)' : 'Overview'}
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {isHi ? game.description.hi : game.description.en}
            </p>
          </div>

          {/* Why You Should Play / Khasiyat */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" />
              {isHi ? 'Is Game Ko Kyun Khele? (Why Play)' : 'Why You Should Play:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(isHi ? game.whyPlay.hi : game.whyPlay.en).map((point, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              {isHi ? 'Mukhya Features (Key Mechanics)' : 'Key Mechanics & Features'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(isHi ? game.keyFeatures.hi : game.keyFeatures.en).map((feat, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700/80">
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Platforms & Hardware Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Supported Platforms */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4">
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Gamepad2 className="w-4 h-4 text-teal-400" />
                {isHi ? 'Platforms & Devices' : 'Supported Platforms'}
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {game.platforms.map((p) => (
                  <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-medium">
                    {getPlatformLabel(p)}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {isHi ? game.hardwareNote.hi : game.hardwareNote.en}
              </p>
            </div>

            {/* Minimum System Requirements */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4">
              <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Cpu className="w-4 h-4 text-indigo-400" />
                {isHi ? 'Minimum PC Requirements' : 'Minimum System Requirements'}
              </h5>
              <div className="space-y-1 text-xs text-slate-300">
                <div><span className="text-slate-500">OS:</span> {game.systemRequirementsMin.os}</div>
                <div><span className="text-slate-500">CPU:</span> {game.systemRequirementsMin.processor}</div>
                <div><span className="text-slate-500">RAM:</span> {game.systemRequirementsMin.ram}</div>
                <div><span className="text-slate-500">GPU:</span> {game.systemRequirementsMin.graphics}</div>
              </div>
            </div>

          </div>

          {/* Similar Games Suggestions */}
          {game.similarGames && game.similarGames.length > 0 && (
            <div className="pt-2 border-t border-slate-800">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {isHi ? 'Agar Yeh Pasand Aaye Toh Inhe Bhi Dekhein:' : 'Similar Simulation Games You Might Like:'}
              </h5>
              <div className="flex flex-wrap gap-2">
                {game.similarGames.map((simTitle, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectSimilarGame(simTitle)}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 transition"
                  >
                    <span>{simTitle}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Close */}
          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition"
            >
              {isHi ? 'Band Karein' : 'Close Dossier'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
