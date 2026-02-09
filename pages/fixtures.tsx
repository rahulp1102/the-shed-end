import React, { useEffect, useState } from 'react';
import { fetchMatches } from '../services/api';
import { Match } from '../types';
import { Calendar, MapPin, Trophy } from 'lucide-react';

export default function Fixtures() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMatches();
      // Sort: Finished first (recent last), then Upcoming
      setMatches(data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex justify-center">
        <p className="text-gray-500 animate-pulse mt-10">Loading 2026 Schedule...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Fixtures & Results</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">February 2026 Schedule</p>

        <div className="space-y-4">
            {matches.map((match) => (
                <div key={match.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500 transition-colors">
                    <div className="flex flex-col items-center md:items-start min-w-[120px]">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase text-xs tracking-wider mb-1">
                            <Trophy className="h-3 w-3" /> {match.competition}
                        </div>
                        <span className="text-gray-900 dark:text-white font-bold text-lg">
                            {new Date(match.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {new Date(match.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-8">
                        <div className="text-center w-32">
                            <span className="block font-bold text-gray-900 dark:text-white text-lg">Chelsea</span>
                            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full mt-1 inline-block">{match.venue === 'Home' ? 'Home' : 'Away'}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            {match.status === 'Finished' ? (
                                <div className="text-3xl font-black text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg tracking-widest">
                                    {match.score.chelsea} - {match.score.opponent}
                                </div>
                            ) : (
                                <div className="text-xl font-bold text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg">VS</div>
                            )}
                        </div>
                        <div className="text-center w-32 flex flex-col items-center">
                            <img src={match.opponentLogo} alt={match.opponent} className="w-10 h-10 object-contain mb-2" />
                            <span className="font-bold text-gray-900 dark:text-white leading-tight">{match.opponent}</span>
                        </div>
                    </div>
                    <div className="hidden md:block"><MapPin className="h-5 w-5 text-gray-300" /></div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}