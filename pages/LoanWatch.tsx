import React from 'react';
import { MapPin, TrendingUp, Plane, Shield, Star } from 'lucide-react';

const LOAN_PLAYERS = [
  // Senior & First-Team Loans
  { 
    id: 1, 
    name: 'Kendry Páez', 
    position: 'AM', 
    club: 'River Plate', 
    league: 'Argentina Primera', 
    stats: { apps: 18, goals: 6, assists: 4, rating: 7.8 }, 
    status: 'senior',
    endDate: 'Dec 2026',
    recentUpdate: 'Assist vs Boca Juniors' 
  },
  { 
    id: 2, 
    name: 'Aarón Anselmino', 
    position: 'CB', 
    club: 'Strasbourg', 
    league: 'Ligue 1', 
    stats: { apps: 15, goals: 1, rating: 7.1 }, 
    status: 'senior',
    endDate: 'Jun 2026',
    recentUpdate: 'Clean sheet vs PSG' 
  },
  { 
    id: 3, 
    name: 'Axel Disasi', 
    position: 'CB', 
    club: 'West Ham United', 
    league: 'Premier League', 
    stats: { apps: 20, goals: 2, rating: 6.9 }, 
    status: 'senior',
    endDate: 'Jun 2026',
    recentUpdate: 'Won vs Arsenal' 
  },
  { 
    id: 4, 
    name: 'Tyrique George', 
    position: 'FWD', 
    club: 'Everton', 
    league: 'Premier League', 
    stats: { apps: 22, goals: 4, assists: 3, rating: 7.2 }, 
    status: 'senior',
    endDate: 'Jun 2026',
    recentUpdate: 'Goal vs Liverpool' 
  },
  { 
    id: 5, 
    name: 'David Datro Fofana', 
    position: 'ST', 
    club: 'Strasbourg', 
    league: 'Ligue 1', 
    stats: { apps: 25, goals: 7, rating: 7.3 }, 
    status: 'senior',
    endDate: 'Jun 2026',
    recentUpdate: 'Hat-trick vs Lens' 
  },
  // Academy Loans
  { 
    id: 6, 
    name: 'Ted Curd', 
    position: 'GK', 
    club: 'Boreham Wood', 
    league: 'National League', 
    stats: { apps: 28, cleanSheets: 9, rating: 7.4 }, 
    status: 'academy',
    endDate: 'Jun 2026',
    recentUpdate: '4 clean sheets in row' 
  },
  { 
    id: 7, 
    name: 'Dujuan Richards', 
    position: 'FWD', 
    club: 'Leicester City', 
    league: 'Championship', 
    stats: { apps: 19, goals: 5, rating: 7.0 }, 
    status: 'academy',
    endDate: 'Jun 2026',
    recentUpdate: 'Debut goal vs Coventry' 
  },
  { 
    id: 8, 
    name: 'Frankie Runham', 
    position: 'Winger', 
    club: 'Ipswich Town', 
    league: 'Premier League', 
    stats: { apps: 16, goals: 3, assists: 2, rating: 6.8 }, 
    status: 'academy',
    endDate: 'Jun 2026',
    recentUpdate: 'Assist vs Man Utd' 
  },
  { 
    id: 9, 
    name: 'Joseph Wheeler-Henry', 
    position: 'DEF', 
    club: 'Brentford', 
    league: 'Premier League', 
    stats: { apps: 14, rating: 6.9 }, 
    status: 'academy',
    endDate: 'Jun 2026',
    recentUpdate: 'Clean sheet vs Spurs' 
  },
];

export default function LoanWatch() {
  return (
    <div className="animate-fade-in space-y-8 pt-20 pb-12 px-4 max-w-7xl mx-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent flex items-center gap-4 mb-3">
            <Plane className="h-12 w-12 text-blue-500" /> 
            Loan Army Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl">
            9 Blues out on loan across 7 leagues • 25/26 Season
          </p>
        </div>
        <div className="text-right">
          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-bold">
            Updated Feb 2026
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {LOAN_PLAYERS.map((player) => (
          <div key={player.id} className={`group relative bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${player.status === 'senior' ? 'ring-2 ring-blue-200/50' : 'ring-2 ring-emerald-200/50'}`}>
            
            {/* League Header */}
            <div className="relative h-20 bg-gradient-to-r from-gray-900 to-gray-800">
              <div className={`absolute top-3 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm ${
                player.status === 'senior' ? 'bg-gradient-to-r from-blue-500 to-purple-600 border border-blue-300/50' : 'bg-gradient-to-r from-emerald-500 to-teal-600 border border-emerald-300/50'
              }`}>
                {player.league}
              </div>
              {/* Status badge */}
              <div className={`absolute top-3 left-4 px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm ${
                player.status === 'senior' ? 'bg-blue-500/90' : 'bg-emerald-500/90'
              }`}>
                {player.status === 'senior' ? 'SENIOR' : 'ACADEMY'}
              </div>
            </div>

            {/* Player Card */}
            <div className="p-6 relative">
              <div className="absolute -top-10 left-6 w-20 h-20 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white ring-4 ring-white/50">
                {player.name.charAt(0)}
              </div>
              
              <div className="pt-12">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{player.name}</h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">{player.position}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin size={16} className="text-blue-500" />
                  <span className="font-semibold">{player.club}</span>
                  <span className="text-gray-400">• Ends {player.endDate}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-r from-gray-50/50 to-blue-50/30 dark:from-gray-700/50 dark:to-gray-600/30 rounded-2xl backdrop-blur-sm">
                  <div className="text-center group-hover:scale-105 transition-transform">
                    <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">{player.stats.apps}</span>
                    <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Apps</span>
                  </div>
                  {player.stats.goals !== undefined && (
                    <div className="text-center group-hover:scale-105 transition-transform">
                      <span className="block text-2xl font-bold text-green-600 dark:text-green-400">{player.stats.goals}</span>
                      <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Gls</span>
                    </div>
                  )}
                  {player.stats.rating && (
                    <div className="text-center group-hover:scale-105 transition-transform">
                      <span className="block text-xl font-bold text-yellow-600 dark:text-yellow-400">{player.stats.rating}</span>
                      <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Rating</span>
                    </div>
                  )}
                </div>

                {/* Recent Update */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-2xl p-4 border border-emerald-100/50 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={14} className="animate-pulse" />
                    Latest Update
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{player.recentUpdate}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
