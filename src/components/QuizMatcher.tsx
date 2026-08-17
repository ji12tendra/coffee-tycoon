import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  Coffee, 
  Hammer, 
  Flame, 
  Gauge, 
  Laptop, 
  Monitor, 
  Cpu, 
  Gamepad2, 
  Zap, 
  Sliders, 
  Brain,
  Star,
  X
} from 'lucide-react';
import { QUIZ_QUESTIONS, SIMULATION_GAMES } from '../data/games';
import { Game, Language, SimCategory, Vibe, HardwareSpec } from '../types';

interface QuizMatcherProps {
  language: Language;
  onClose: () => void;
  onSelectGame: (game: Game) => void;
}

const getOptionIcon = (iconName: string) => {
  switch (iconName) {
    case 'Coffee': return <Coffee className="w-5 h-5 text-amber-400" />;
    case 'Hammer': return <Hammer className="w-5 h-5 text-indigo-400" />;
    case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
    case 'Gauge': return <Gauge className="w-5 h-5 text-emerald-400" />;
    case 'Laptop': return <Laptop className="w-5 h-5 text-teal-400" />;
    case 'Monitor': return <Monitor className="w-5 h-5 text-sky-400" />;
    case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
    case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-amber-400" />;
    case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
    case 'Sliders': return <Sliders className="w-5 h-5 text-teal-400" />;
    case 'Brain': return <Brain className="w-5 h-5 text-pink-400" />;
    default: return <Sparkles className="w-5 h-5 text-emerald-400" />;
  }
};

export const QuizMatcher: React.FC<QuizMatcherProps> = ({
  language,
  onClose,
  onSelectGame
}) => {
  const isHi = language === 'hi';
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<{ game: Game; score: number; matchReason: string }[] | null>(null);

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentStep] = optionIndex;
    setSelectedAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Compute score
      calculateMatchResults(nextAnswers);
    }
  };

  const calculateMatchResults = (answers: number[]) => {
    const scores = SIMULATION_GAMES.map((game) => {
      let score = 50; // base score
      let matchReasons: string[] = [];

      // Q1: Vibe & Category
      const q1Opt = QUIZ_QUESTIONS[0].options[answers[0]];
      if (q1Opt) {
        const catWeight = q1Opt.categoryWeights[game.category] || 0;
        score += catWeight * 12;
        const matchingVibes = game.vibe.filter((v) => q1Opt.vibeMatch.includes(v));
        if (matchingVibes.length > 0) {
          score += matchingVibes.length * 8;
        }
      }

      // Q2: Hardware
      const q2Opt = QUIZ_QUESTIONS[1].options[answers[1]];
      if (q2Opt && q2Opt.specMatch) {
        if (q2Opt.specMatch === game.hardwareSpec) {
          score += 15;
          matchReasons.push(isHi ? 'Aapke hardware ke liye perfectly optimized' : 'Perfect match for your hardware');
        } else if (q2Opt.specMatch === 'high' && game.hardwareSpec === 'low') {
          score += 10;
        } else if (q2Opt.specMatch === 'low' && game.hardwareSpec === 'high') {
          score -= 25; // penalty if user has low spec and game needs high
        }
      }

      // Q3: Difficulty
      const q3Opt = QUIZ_QUESTIONS[2].options[answers[2]];
      if (q3Opt) {
        if (answers[2] === 0 && game.difficulty === 'Casual') {
          score += 15;
        } else if (answers[2] === 1 && (game.difficulty === 'Moderate' || game.difficulty === 'Casual')) {
          score += 15;
        } else if (answers[2] === 2 && (game.difficulty === 'Deep/Complex' || game.difficulty === 'Challenging')) {
          score += 20;
        }
      }

      // Cap at 99%
      const finalScore = Math.min(99, Math.max(45, score));
      return {
        game,
        score: finalScore,
        matchReason: matchReasons[0] || (isHi ? 'Aapke gameplay preferences se match karta hai' : 'Matches your desired simulation vibe')
      };
    });

    scores.sort((a, b) => b.score - a.score);
    setResults(scores.slice(0, 3));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResults(null);
  };

  return (
    <div 
      id="quiz-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="quiz-modal-container"
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white p-6 sm:p-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {isHi ? 'AI Simulation Matcher' : 'Find Your Ideal Sim Game'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isHi ? 'Aapke Liye Sabse Sahi Game Kaunsa Hai?' : 'Which Simulation Game Fits You Best?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            {isHi ? 'Bas 3 aasan sawal aur payein tailored recommendation!' : 'Answer 3 quick questions to discover your personalized match.'}
          </p>
        </div>

        {/* Question Wizard */}
        {!results ? (
          <div>
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between gap-2 mb-6">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div 
                  key={q.id}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx <= currentStep ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            <div className="mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {isHi ? `Sawal ${currentStep + 1} of ${QUIZ_QUESTIONS.length}` : `Question ${currentStep + 1} of ${QUIZ_QUESTIONS.length}`}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-1">
                {isHi ? QUIZ_QUESTIONS[currentStep].questionHi : QUIZ_QUESTIONS[currentStep].questionEn}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 mt-4">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  id={`quiz-opt-${currentStep}-${optIdx}`}
                  onClick={() => handleSelectOption(optIdx)}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group hover:scale-[1.01] hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-emerald-500/40">
                    {getOptionIcon(opt.icon)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {isHi ? opt.textHi : opt.textEn}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Match Results View */
          <div className="space-y-4">
            <div className="text-center py-2">
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">
                {isHi ? 'Top Matched Recommendations 🎉' : 'Top Matched Recommendations 🎉'}
              </span>
            </div>

            <div className="space-y-3">
              {results.map((res, index) => (
                <div
                  key={res.game.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    index === 0
                      ? 'bg-emerald-950/30 border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                      : 'bg-slate-800/50 border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={res.game.imageBanner}
                      alt={res.game.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {res.game.title}
                        </h4>
                        {index === 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                            #1 BEST MATCH
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                        {isHi ? res.game.tagline.hi : res.game.tagline.en}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-400 font-medium">
                        <span>{res.score}% Match</span>
                        <span>•</span>
                        <span className="text-slate-400">{res.game.hardwareSpec.toUpperCase()} SPEC</span>
                      </div>
                    </div>
                  </div>

                  <button
                    id={`quiz-view-game-${res.game.id}`}
                    onClick={() => {
                      onClose();
                      onSelectGame(res.game);
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap transition shadow"
                  >
                    {isHi ? 'Khel ki Jankari Dekhein' : 'Explore Game'}
                  </button>
                </div>
              ))}
            </div>

            {/* Retake Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isHi ? 'Dobara Quiz Khele' : 'Retake Quiz'}</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
              >
                {isHi ? 'Catalog Par Jaayein' : 'View Full Catalog'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
