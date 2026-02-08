import React from 'react';
import { LOAN_PLAYERS } from './constants';
import { PlayerAvatar } from './PlayerAvatar';
import { MapPin, TrendingUp } from 'lucide-react';

export default function LoanWatch() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4"><div><h1 className="text-3xl font-bold text-chelsea-dark dark:text-white">Loan Army Tracker</h1><p className="text-gray-500 dark:text-gray-400">Monitoring our Blues across Europe.</p></div></div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LOAN_PLAYERS.map((player) => (
          <div key={player.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative h-24 bg-gradient-to-r from-gray-800 to-gray-900"><div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">{player.league}</div></div>
            <div className="px-6 pb-6 relative">
               <div className="absolute -top-12 left-6 w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-800 overflow-hidden shadow-md bg-gray-200"><PlayerAvatar src={player.image} alt={player.name} className="w-full h-full object-cover" /></div>
               <div className="pt-14"><h3 className="text-xl font-bold text-gray-900 dark:text-white">{player.name}</h3><div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-1"><MapPin size={14} /><span>{player.club}</span></div></div>
               <div className="mt-6 grid grid-cols-3 gap-2 py-4 border-t border-gray-100 dark:border-gray-700"><div className="text-center"><span className="block text-xl font-bold text-chelsea-blue dark:text-white">{player.stats.apps}</span><span className="text-[10px] uppercase text-gray-400 font-bold">Apps</span></div><div className="text-center border-l border-gray-100 dark:border-gray-700"><span className="block text-xl font-bold text-chelsea-blue dark:text-white">{player.position === 'GK' ? 'CS' : player.stats.goals}</span><span className="text-[10px] uppercase text-gray-400 font-bold">{player.position === 'GK' ? 'Clean Sheets' : 'Goals'}</span></div><div className="text-center border-l border-gray-100 dark:border-gray-700"><span className="block text-xl font-bold text-green-600">{player.stats.rating}</span><span className="text-[10px] uppercase text-gray-400 font-bold">Rating</span></div></div>
               <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-sm text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700"><div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase text-gray-400"><TrendingUp size={12} /> Recent Update</div>{player.recentUpdate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}