import React, { useState } from 'react';
import { Search, Calendar, User } from 'lucide-react';
import { Player } from '../types';

// --- SQUAD DATA (FEB 2026) ---
// I have removed the broken URLs. You can add valid ones later if you find a stable source.
const PLAYERS: Player[] = [
  // GOALKEEPERS
  {
    id: '1', name: 'Robert Sánchez', number: 1, position: 'GK',
    image: '', // Image removed to trigger the "Kit Number" fallback
    nationality: 'Spain', age: 28, height: '1.97m', foot: 'Right', joined: '2023', contractExpiry: '2030', marketValue: '€15m',
    stats: { appearances: 36, minutesPlayed: 3240, goals: 0, assists: 0, cleanSheets: 12, rating: 7.0 }, status: 'Available'
  },
  {
    id: '12', name: 'Filip Jørgensen', number: 12, position: 'GK',
    image: '',
    nationality: 'Denmark', age: 23, height: '1.90m', foot: 'Right', joined: '2024', contractExpiry: '2031', marketValue: '€17m',
    stats: { appearances: 5, minutesPlayed: 450, goals: 0, assists: 0, cleanSheets: 1, rating: 6.8 }, status: 'Available'
  },
  {
    id: '44', name: 'Gabriel Slonina', number: 44, position: 'GK',
    image: '',
    nationality: 'USA', age: 21, height: '1.93m', foot: 'Right', joined: '2022', contractExpiry: '2028', marketValue: '€10m',
    stats: { appearances: 0, minutesPlayed: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 }, status: 'Available'
  },

  // DEFENDERS
  {
    id: '24', name: 'Reece James', number: 24, position: 'DEF',
    image: '',
    nationality: 'England', age: 26, height: '1.79m', foot: 'Right', joined: '2018', contractExpiry: '2028', marketValue: '€52m',
    stats: { appearances: 25, minutesPlayed: 2000, goals: 2, assists: 6, cleanSheets: 8, rating: 7.6 }, status: 'Available'
  },
  {
    id: '6', name: 'Levi Colwill', number: 6, position: 'DEF',
    image: '',
    nationality: 'England', age: 22, height: '1.87m', foot: 'Left', joined: '2021', contractExpiry: '2029', marketValue: '€37m',
    stats: { appearances: 29, minutesPlayed: 2500, goals: 1, assists: 2, cleanSheets: 10, rating: 7.4 }, status: 'Available'
  },
  {
    id: '21', name: 'Jorrel Hato', number: 21, position: 'DEF',
    image: '',
    nationality: 'Netherlands', age: 19, height: '1.82m', foot: 'Left', joined: '2025', contractExpiry: '2031', marketValue: '€50m',
    stats: { appearances: 10, minutesPlayed: 800, goals: 1, assists: 2, cleanSheets: 3, rating: 7.2 }, status: 'Available'
  },
  {
    id: '29', name: 'Wesley Fofana', number: 29, position: 'DEF',
    image: '',
    nationality: 'France', age: 25, height: '1.90m', foot: 'Right', joined: '2022', contractExpiry: '2029', marketValue: '€49m',
    stats: { appearances: 16, minutesPlayed: 1400, goals: 0, assists: 3, cleanSheets: 5, rating: 7.1 }, status: 'Available'
  },
  {
    id: '3', name: 'Marc Cucurella', number: 3, position: 'DEF',
    image: '',
    nationality: 'Spain', age: 27, height: '1.72m', foot: 'Left', joined: '2022', contractExpiry: '2028', marketValue: '€21m',
    stats: { appearances: 30, minutesPlayed: 2600, goals: 1, assists: 5, cleanSheets: 9, rating: 7.0 }, status: 'Available'
  },
  {
    id: '27', name: 'Malo Gusto', number: 27, position: 'DEF',
    image: '',
    nationality: 'France', age: 22, height: '1.79m', foot: 'Right', joined: '2023', contractExpiry: '2030', marketValue: '€41m',
    stats: { appearances: 24, minutesPlayed: 1900, goals: 2, assists: 2, cleanSheets: 6, rating: 7.1 }, status: 'Available'
  },
  {
    id: '4', name: 'Tosin Adarabioyo', number: 4, position: 'DEF',
    image: '',
    nationality: 'England', age: 28, height: '1.96m', foot: 'Right', joined: '2024', contractExpiry: '2028', marketValue: '€24m',
    stats: { appearances: 13, minutesPlayed: 1000, goals: 1, assists: 0, cleanSheets: 4, rating: 6.9 }, status: 'Available'
  },
  {
    id: '5', name: 'Benoit Badiashile', number: 5, position: 'DEF',
    image: '',
    nationality: 'France', age: 24, height: '1.94m', foot: 'Left', joined: '2023', contractExpiry: '2030', marketValue: '€23m',
    stats: { appearances: 11, minutesPlayed: 900, goals: 1, assists: 0, cleanSheets: 3, rating: 6.8 }, status: 'Available'
  },
  {
    id: '23', name: 'Trevoh Chalobah', number: 23, position: 'DEF',
    image: '',
    nationality: 'England', age: 26, height: '1.90m', foot: 'Right', joined: '2018', contractExpiry: '2028', marketValue: '€26m',
    stats: { appearances: 29, minutesPlayed: 2400, goals: 3, assists: 3, cleanSheets: 8, rating: 7.2 }, status: 'Available'
  },
  {
    id: '34', name: 'Josh Acheampong', number: 34, position: 'DEF',
    image: '',
    nationality: 'England', age: 19, height: '1.80m', foot: 'Right', joined: '2024', contractExpiry: '2027', marketValue: '€5m',
    stats: { appearances: 11, minutesPlayed: 600, goals: 1, assists: 1, cleanSheets: 2, rating: 6.9 }, status: 'Available'
  },
  {
    id: '30', name: 'Aaron Anselmino', number: 30, position: 'DEF',
    image: '',
    nationality: 'Argentina', age: 19, height: '1.88m', foot: 'Right', joined: '2025', contractExpiry: '2030', marketValue: '€12m',
    stats: { appearances: 3, minutesPlayed: 150, goals: 0, assists: 0, cleanSheets: 1, rating: 6.5 }, status: 'Available'
  },

  // MIDFIELDERS
  {
    id: '25', name: 'Moisés Caicedo', number: 25, position: 'MID',
    image: '',
    nationality: 'Ecuador', age: 24, height: '1.78m', foot: 'Right', joined: '2023', contractExpiry: '2031', marketValue: '€93m',
    stats: { appearances: 29, minutesPlayed: 2500, goals: 5, assists: 8, cleanSheets: 0, rating: 7.9 }, status: 'Available'
  },
  {
    id: '8', name: 'Enzo Fernández', number: 8, position: 'MID',
    image: '',
    nationality: 'Argentina', age: 24, height: '1.78m', foot: 'Right', joined: '2023', contractExpiry: '2032', marketValue: '€79m',
    stats: { appearances: 33, minutesPlayed: 2800, goals: 5, assists: 8, cleanSheets: 0, rating: 7.8 }, status: 'Available'
  },
  {
    id: '10', name: 'Cole Palmer', number: 10, position: 'MID',
    image: '',
    nationality: 'England', age: 23, height: '1.89m', foot: 'Left', joined: '2023', contractExpiry: '2033', marketValue: '€115m',
    stats: { appearances: 16, minutesPlayed: 1400, goals: 18, assists: 12, cleanSheets: 0, rating: 8.6 }, status: 'Available'
  },
  {
    id: '45', name: 'Roméo Lavia', number: 45, position: 'MID',
    image: '',
    nationality: 'Belgium', age: 22, height: '1.81m', foot: 'Right', joined: '2023', contractExpiry: '2030', marketValue: '€34m',
    stats: { appearances: 6, minutesPlayed: 400, goals: 0, assists: 0, cleanSheets: 0, rating: 6.8 }, status: 'Injured'
  },
  {
    id: '17', name: 'Andrey Santos', number: 17, position: 'MID',
    image: '',
    nationality: 'Brazil', age: 21, height: '1.76m', foot: 'Right', joined: '2023', contractExpiry: '2030', marketValue: '€14m',
    stats: { appearances: 13, minutesPlayed: 800, goals: 1, assists: 1, cleanSheets: 0, rating: 7.0 }, status: 'Available'
  },
  {
    id: '14', name: 'Dario Essugo', number: 14, position: 'MID',
    image: '',
    nationality: 'Portugal', age: 21, height: '1.78m', foot: 'Right', joined: '2025', contractExpiry: '2033', marketValue: '€18m',
    stats: { appearances: 3, minutesPlayed: 150, goals: 0, assists: 0, cleanSheets: 0, rating: 6.5 }, status: 'Available'
  },

  // FORWARDS
  {
    id: '7', name: 'Pedro Neto', number: 7, position: 'FWD',
    image: '',
    nationality: 'Portugal', age: 25, height: '1.73m', foot: 'Left', joined: '2024', contractExpiry: '2031', marketValue: '€31m',
    stats: { appearances: 32, minutesPlayed: 2600, goals: 7, assists: 16, cleanSheets: 0, rating: 7.6 }, status: 'Available'
  },
  {
    id: '9', name: 'Liam Delap', number: 9, position: 'FWD',
    image: '',
    nationality: 'England', age: 23, height: '1.86m', foot: 'Right', joined: '2025', contractExpiry: '2030', marketValue: '€42m',
    stats: { appearances: 14, minutesPlayed: 1000, goals: 4, assists: 3, cleanSheets: 0, rating: 7.3 }, status: 'Available'
  },
  {
    id: '20', name: 'João Pedro', number: 20, position: 'FWD',
    image: '',
    nationality: 'Brazil', age: 24, height: '1.82m', foot: 'Right', joined: '2025', contractExpiry: '2030', marketValue: '€24m',
    stats: { appearances: 28, minutesPlayed: 1800, goals: 11, assists: 14, cleanSheets: 0, rating: 7.5 }, status: 'Available'
  },
  {
    id: '11', name: 'Jamie Gittens', number: 11, position: 'FWD',
    image: '',
    nationality: 'England', age: 20, height: '1.75m', foot: 'Right', joined: '2025', contractExpiry: '2030', marketValue: '€34m',
    stats: { appearances: 14, minutesPlayed: 900, goals: 4, assists: 1, cleanSheets: 0, rating: 7.1 }, status: 'Available'
  },
  {
    id: '41', name: 'Estêvão Willian', number: 41, position: 'FWD',
    image: '',
    nationality: 'Brazil', age: 18, height: '1.76m', foot: 'Left', joined: '2025', contractExpiry: '2032', marketValue: '€50m',
    stats: { appearances: 24, minutesPlayed: 1600, goals: 6, assists: 6, cleanSheets: 0, rating: 7.2 }, status: 'Available'
  },
  {
    id: '49', name: 'Alejandro Garnacho', number: 49, position: 'FWD',
    image: '',
    nationality: 'Argentina', age: 21, height: '1.80m', foot: 'Right', joined: '2025', contractExpiry: '2030', marketValue: '€45m',
    stats: { appearances: 20, minutesPlayed: 1500, goals: 4, assists: 6, cleanSheets: 0, rating: 7.0 }, status: 'Available'
  },
  {
    id: '15', name: 'Nicolas Jackson', number: 15, position: 'FWD',
    image: '',
    nationality: 'Senegal', age: 24, height: '1.86m', foot: 'Right', joined: '2023', contractExpiry: '2033', marketValue: '€55m',
    stats: { appearances: 28, minutesPlayed: 2200, goals: 14, assists: 5, cleanSheets: 0, rating: 7.3 }, status: 'Available'
  },
  {
    id: '38', name: 'Marc Guiu', number: 38, position: 'FWD',
    image: '',
    nationality: 'Spain', age: 19, height: '1.87m', foot: 'Right', joined: '2024', contractExpiry: '2031', marketValue: '€10m',
    stats: { appearances: 10, minutesPlayed: 400, goals: 2, assists: 1, cleanSheets: 0, rating: 6.7 }, status: 'Available'
  },
  {
    id: '19', name: 'Mamadou Sarr', number: 19, position: 'FWD',
    image: '',
    nationality: 'France', age: 19, height: '1.93m', foot: 'Right', joined: '2025', contractExpiry: '2033', marketValue: '€7.5m',
    stats: { appearances: 2, minutesPlayed: 80, goals: 0, assists: 0, cleanSheets: 0, rating: 6.2 }, status: 'Available'
  }
];

export default function Squad() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');

  const filteredPlayers = PLAYERS.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    
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
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
               First Team Squad
             </h1>
             <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Feb 9, 2026 • Matchday 24</span>
             </div>
           </div>
           
           {/* SEARCH */}
           <div className="flex gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <select 
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
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
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                />
              </div>
           </div>
         </div>

         {/* GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300">
                 
                 {/* PLAYER IMAGE AREA - THE FIX */}
                 <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    
                    {/* 1. Try to show image if it exists */}
                    {player.image ? (
                        <img 
                          src={player.image} 
                          alt={player.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                              // If image fails, hide it so the fallback shows
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement?.classList.add('fallback-active');
                          }}
                        />
                    ) : (
                        // 2. FALLBACK: Styled Kit Number (When no image or error)
                        <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-blue-900">
                            <span className="text-6xl font-black text-white/20 select-none">{player.number}</span>
                            <User className="h-12 w-12 text-white/50 mb-2 absolute" />
                        </div>
                    )}

                    {/* Status Badge */}
                    {player.status !== 'Available' && (
                        <div className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-bold uppercase z-10 ${
                            player.status === 'Injured' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                        }`}>
                            {player.status}
                        </div>
                    )}
                    
                    {/* Kit Number (Corner) */}
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 z-10">
                      <span className="text-2xl font-bold text-white shadow-sm">{player.number}</span>
                    </div>
                 </div>
                 
                 {/* CARD CONTENT */}
                 <div className="p-4">
                   <div className="flex justify-between items-start mb-1">
                       <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{player.name}</h3>
                   </div>
                   
                   <div className="flex items-center gap-2 mb-4">
                     <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">{player.position}</span>
                     <span className="text-xs text-gray-500 dark:text-gray-400">{player.nationality}</span>
                     <span className="text-gray-300">•</span>
                     <span className="text-xs text-gray-500 dark:text-gray-400">{player.age} yrs</span>
                   </div>
                   
                   {/* STATS */}
                   <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-2">
                      <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Apps</p>
                        <p className="font-bold text-gray-900 dark:text-white">{player.stats.appearances}</p>
                      </div>
                      <div className="text-center border-l border-gray-200 dark:border-gray-700">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{['GK', 'DEF'].includes(player.position) ? 'Clean Sheets' : 'Goals'}</p>
                        <p className="font-bold text-gray-900 dark:text-white">{['GK', 'DEF'].includes(player.position) ? player.stats.cleanSheets : player.stats.goals}</p>
                      </div>
                      <div className="text-center border-l border-gray-200 dark:border-gray-700">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</p>
                        <p className={`font-bold ${player.stats.rating >= 7.5 ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                            {player.stats.rating}
                        </p>
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