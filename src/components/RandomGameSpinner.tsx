import React, { useState } from 'react';
import { Dices, Sparkles, X, ChevronRight, RotateCcw } from 'lucide-react';
import { SIMULATION_GAMES } from '../data/games';
import { Game, Language } from '../types';

interface RandomGameSpinnerProps {
  language: Language;
  onClose: () => void;
  onSelectGame: (game: Game) => void;
}

export const RandomGameSpinner: React.FC<RandomGameSpinnerProps> = ({
  language,
  onClose,
  onSelectGame
}) => {
  const isHi = language === 'hi';
  const [spinning, setSpinning] = useState(false);
  const [pickedGame, setPickedGame] = useState<Game | null>(null);

  const handleSpin = () => {
    setSpinning(true);
    setPickedGame(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * SIMULATION_GAMES.length);
      setPickedGame(SIMULATION_GAMES[randomIdx]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 100);
  };

  return (
    <div 
      id="random-spinner-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="random-spinner-container"
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative text-white p-6 text-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 text-amber-400">
          <Dices className={`w-6 h-6 ${spinning ? 'animate-spin' : ''}`} />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          {isHi ? '🎲 Kismat Ka Pahiya (Surprise Me)' : '🎲 Simulation Roulette'}
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          {isHi 
            ? 'Decide nahi kar pa rahe? Pahiya ghumayein aur kismat ko chunne dein!' 
            : "Can't decide what to play next? Let fate pick your next simulation addiction!"}
        </p>

        {/* Display Picked Game */}
        {pickedGame ? (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 transition-all">
            <img
              src={pickedGame.imageBanner}
              alt={pickedGame.title}
              referrerPolicy="no-referrer"
              className="w-full h-36 object-cover rounded-xl mb-3 border border-slate-800"
            />
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-0.5">
              {isHi ? pickedGame.categoryName.hi : pickedGame.categoryName.en}
            </span>
            <h4 className="text-lg font-bold text-white mb-1">
              {pickedGame.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2 mb-3">
              {isHi ? pickedGame.tagline.hi : pickedGame.tagline.en}
            </p>

            <button
              onClick={() => {
                onClose();
                onSelectGame(pickedGame);
              }}
              className="w-full py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>{isHi ? 'Yeh Khel Dekhein' : 'Explore This Game'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-slate-950/50 border border-dashed border-slate-800 rounded-2xl p-8 mb-6 text-slate-500 text-xs">
            {isHi ? 'Neeche button dabakar shuru karein' : 'Click the button below to spin'}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleSpin}
          disabled={spinning}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Dices className="w-4 h-4" />
          <span>{spinning ? (isHi ? 'Ghoom raha hai...' : 'Spinning...') : (isHi ? 'Pahiya Ghumayein (Spin)' : 'Spin For Game')}</span>
        </button>
      </div>
    </div>
  );
};
