import React from 'react';
import { Star, TrendingUp, ArrowRight, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ACADEMY_PLAYERS = [
  { 
    id: 1, 
    name: 'Josh Acheampong', 
    age: 19, 
    position: 'RB', 
    image: '', 
    highlight: 'First-team ready', 
    status: 'first-team',
    stats: '11 Apps / 1 G'
  },
  { 
    id: 2, 
    name: 'Shumaira Mheuka', 
    age: 17, 
    position: 'FWD', 
    image: '', 
    highlight: 'Top U18 scorer', 
    status: 'u18',
    stats: '12 G / 4 A'
  },
  { 
    id: 3, 
    name: 'Tyrique George', 
    age: 20, 
    position: 'LW', 
    image: '', 
    highlight: '15 first-team apps', 
    status: 'first-team',
    stats: '15 Apps / 3 G'
  },
  { 
    id: 4, 
    name: 'Kiano Dyer', 
    age: 19, 
    position: 'MID', 
    image: '', 
    highlight: 'Playmaker', 
    status: 'u21',
    stats: '98% Pass Comp'
  },
  { 
    id: 5, 
    name: 'Ishe Samuels-Smith', 
    age: 19, 
    position: 'LB', 
    image: '', 
    highlight: 'Captain', 
    status: 'u21-swansea',
    stats: '8 Clean Sheets',
    loanClub: 'Swansea City (Championship)'
  },
  { 
    id: 6, 
    name: 'Leo Castledine', 
    age: 19, 
    position: 'MID', 
    image: '', 
    highlight: 'Permanent transfer', 
    status: 'u19-loan',
    stats: '5 G / 3 A',
    loanClub: 'Middlesbrough (League 1)'
  },
];

const RECENT_RESULTS = [
  { home: 'Chelsea U21', score: '3-2', away: 'Man City U21', win: true, date: 'Feb 3' },
  { home: 'Chelsea U21', score: '1-1', away: 'Arsenal U21', win: false, date: 'Jan 27' },
  { home: 'Leeds U21', score: '0-2', away: 'Chelsea U21', win: true, date: 'Jan 20' },
  { home: 'Chelsea U18', score: '4-1', away: 'Benfica U19', win: true, date: 'Jan 15' },
];

export default function Academy() {
  return (
    <div className="space-y-8 animate-fade-in pt-20 pb-12 px-4 max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50">
      {/* HEADER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 to-blue-800 overflow-hidden p-10 text-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-xl shadow-lg border border-white/30">
            <GraduationCap className="h-10 w-10 text-yellow-300" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3">
              Cobham Academy
            </h1>
            <p className="text-xl text-blue-100 font-medium max-w-2xl">25/26 Season: First-team breakthroughs & loan developments</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* ONES TO WATCH */}
        <section className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ones to Watch (25/26)</h2>
          </div>
          
          <div className="space-y-4">
            {ACADEMY_PLAYERS.map(player => (
              <div key={player.id} className="group relative bg-gradient-to-r from-gray-50/50 to-blue-50/30 dark:from-gray-700/50 dark:to-gray-600/30 p-6 rounded-2xl border border-transparent hover:border-blue-400/50 hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Status indicator - Updated colors for Swansea loan */}
                <div className={`absolute top-4 right-4 w-3 h-3 rounded-full shadow-sm border-2 border-white ${
                  player.status === 'first-team' ? 'bg-green-400' : 
                  player.status.includes('swansea') ? 'bg-purple-400' : 
                  player.status.includes('loan') ? 'bg-orange-400' : 'bg-blue-400'
                }`} />
                
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg ring-2 ring-white/50 ${
                      player.status === 'first-team' ? 'bg-green-400/20 text-green-700' : 
                      player.status.includes('swansea') ? 'bg-purple-400/20 text-purple-700' :
                      'bg-blue-400/20 text-blue-700'
                    }`}>
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{player.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{player.age} yrs • {player.position}</p>
                      {player.loanClub && (
                        <p className="flex items-center gap-1 text-xs font-medium mt-1 ${
                          player.status.includes('swansea') ? 'text-purple-600' : 'text-orange-600'
                        }">
                          <MapPin className="h-3 w-3" />
                          {player.loanClub}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold uppercase rounded-lg shadow-md group-hover:scale-105 transition-transform">
                      {player.highlight}
                    </span>
                    <div className="font-mono text-sm font-bold text-gray-700 dark:text-gray-300 mt-2">{player.stats}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECENT RESULTS */}
        <section className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Results</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">U21s, U18s & Loans • Last 5 matches</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {RECENT_RESULTS.map((match, idx) => (
              <ResultRow key={idx} {...match} />
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <Link 
              to="/academy/fixtures" 
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
            >
              View All Fixtures
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

const ResultRow = ({ home, score, away, win, date }: { 
  home: string; 
  score: string; 
  away: string; 
  win?: boolean; 
  date: string;
}) => (
  <div className={`group flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 ${
    win ? 'bg-green-50/50 dark:bg-green-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
  }`}>
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[100px]">{home}</span>
      <span className={`font-bold text-lg px-3 py-1.5 rounded-xl shadow-sm text-sm font-mono ${
        win 
          ? 'bg-green-400/90 text-white shadow-green-500/25' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
      }`}>
        {score}
      </span>
    </div>
    <div className="text-right">
      <span className="font-semibold text-gray-700 dark:text-gray-300 block text-sm">{away}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
    </div>
  </div>
);
