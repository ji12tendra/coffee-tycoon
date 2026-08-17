import React from 'react';
import { DailyEvent } from '../../types/game';
import { Sparkles, X } from 'lucide-react';

interface DailyEventsBannerProps {
  event: DailyEvent | null;
  isHi: boolean;
}

export const DailyEventsBanner: React.FC<DailyEventsBannerProps> = ({ event, isHi }) => {
  if (!event) return null;

  return (
    <div id="daily_event_banner" className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-lg mb-4 flex items-center justify-between gap-3 border border-amber-300/40 animate-pulse">
      <div className="flex items-center gap-2.5">
        <span className="text-2xl flex-shrink-0">{event.icon}</span>
        <div>
          <h4 className="font-black text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
            <span>{isHi ? event.title.hi : event.title.en}</span>
            <span className="bg-slate-950 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {event.durationDays} {isHi ? 'दिन शेष' : 'days left'}
            </span>
          </h4>
          <p className="text-[11px] font-medium text-slate-900 leading-tight">
            {isHi ? event.description.hi : event.description.en}
          </p>
        </div>
      </div>
    </div>
  );
};
