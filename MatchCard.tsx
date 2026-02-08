import React, { useState } from 'react';
import { Match, MatchEvent } from './types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, compact = false }) => {
  const [expanded, setExpanded] = useState(false);
  const isFinished = match.status === 'Finished';
  const isWin = isFinished && (match.score?.chelsea || 0) > (match.score?.opponent || 0);
  const isDraw = isFinished && (match.score?.chelsea === match.score?.opponent);
  
  const resultColor = isWin ? 'bg-green-500' : isDraw ? 'bg-gray-400' : 'bg-red-500';
  const hasEvents = match.events && match.events.length > 0;

  return (
    <div className={`
      relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md
      ${compact ? 'p-4' : 'p-6'}
    `}>
      {/* Status Badge */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {match.competition}
        </span>
        <span className={`
          rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide
          ${match.status === 'Live' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
        `}>
          {match.status}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {/* Chelsea Side */}
        <div className="flex flex-col items-center gap-2 w-1/3">
           {/* Simple Placeholder Logo for Chelsea */}
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-chelsea-blue text-white flex items-center justify-center font-bold text-xs border-2 border-chelsea-gold shadow-sm">
             CFC
           </div>
           <span className={`text-center font-bold text-gray-900 dark:text-white ${compact ? 'text-xs' : 'text-sm'}`}>Chelsea</span>
        </div>

        {/* Score / Time */}
        <div className="flex flex-col items-center justify-center w-1/3">
          {isFinished ? (
             <div className="flex items-center gap-3">
               <span className={`text-2xl font-bold ${isWin ? 'text-chelsea-blue dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                 {match.score?.chelsea}
               </span>
               <span className="text-gray-300">-</span>
               <span className="text-2xl font-bold text-gray-900 dark:text-white">
                 {match.score?.opponent}
               </span>
             </div>
          ) : (
            <div className="text-center">
              <span className="block text-xl font-bold text-gray-900 dark:text-white">
                {new Date(match.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(match.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          )}
          {isFinished && (
            <div className={`mt-1 h-1 w-8 rounded-full ${resultColor}`}></div>
          )}
        </div>

        {/* Opponent Side */}
        <div className="flex flex-col items-center gap-2 w-1/3">
           <img src={match.opponentLogo} alt={match.opponent} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-100 dark:border-gray-600" />
           <span className={`text-center font-bold text-gray-900 dark:text-white ${compact ? 'text-xs' : 'text-sm'}`}>{match.opponent}</span>
        </div>
      </div>
      
      {!compact && match.venue && (
         <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 text-center text-xs text-gray-400 uppercase tracking-widest">
            {match.venue === 'Home' ? 'Stamford Bridge' : 'Away Fixture'}
         </div>
      )}

      {/* Events / Timeline Toggle */}
      {!compact && hasEvents && (
        <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-2">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-center gap-1 text-xs font-medium text-gray-400 hover:text-chelsea-blue dark:hover:text-blue-400 transition-colors"
          >
            {expanded ? 'Hide Match Events' : 'Show Match Events'}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          
          {expanded && (
            <div className="mt-3 space-y-2">
              {match.events!.sort((a, b) => a.minute - b.minute).map((event, idx) => (
                <div key={idx} className={`flex items-center gap-3 text-sm ${event.isChelsea ? 'flex-row' : 'flex-row-reverse'}`}>
                   <span className="font-mono text-xs text-gray-400 w-8 text-center">{event.minute}'</span>
                   <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${event.isChelsea ? 'bg-blue-50 dark:bg-blue-900/30 text-chelsea-blue dark:text-blue-300' : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                      <span className="font-semibold">{event.player}</span>
                      <span className="text-[10px] uppercase opacity-70 border border-current px-1 rounded">{event.type}</span>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};