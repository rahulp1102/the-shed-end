import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { PLAYERS } from '../constants'; // <--- Now imports from your new file
import { Player } from '../types';

export default function Squad() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');

  // Filter Logic
  const filteredPlayers = PLAYERS.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Position Mapping
    let matchesPosition = false;
    if (positionFilter === 'All') matchesPosition = true;
    else if (positionFilter === 'Goalkeeper') matchesPosition = player.position === 'GK';
    else if (positionFilter === 'Defender') matchesPosition = player.position === 'DEF';
    else if (positionFilter === 'Midfielder') matchesPosition = player.position === 'MID';
    else if (positionFilter === 'Forward') matchesPosition = player.position === 'FWD';

    return matchesSearch && matchesPosition;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* HEADER */}
         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
           <div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">First Team Squad</h1>
             <p className="text-gray-500 dark:text-gray-400">2025/26 Season • Men's Senior Team</p>
           </div>
           
           {/* SEARCH & FILTER */}
           <div className="flex gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <select 
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Positions</option>
                <option value="Goalkeeper">Goalkeepers</option>
                <option value="Defender">Defenders</option>
                <option value="Midfielder">Midfielders</option>
                <option value="Forward">Forwards</option>
              </select>

              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search player..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
           </div>
         </div>

         {/* GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300">
                 {/* Player Image */}
                 <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <span className="text-2xl font-bold text-white shadow-sm">{player.number}</span>
                    </div>
                 </div>
                 
                 <div className="p-4">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{player.name}</h3>
                   <div className="flex items-center gap-2 mb-4">
                     <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{player.position}</span>
                     <span className="text-gray-300">•</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400">{player.nationality}</span>
                   </div>
                   
                   {/* Key Stats Row */}
                   <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase">Apps</p>
                        <p className="font-bold text-gray-900 dark:text-white">{player.stats.appearances}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase">{player.position === 'GK' || player.position === 'DEF' ? 'Clean Sheets' : 'Goals'}</p>
                        <p className="font-bold text-gray-900 dark:text-white">{player.position === 'GK' || player.position === 'DEF' ? player.stats.cleanSheets : player.stats.goals}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase">Rating</p>
                        <p className="font-bold text-green-500">{player.stats.rating}</p>
                      </div>
                   </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}