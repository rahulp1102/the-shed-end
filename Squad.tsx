import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Player } from '../types';

// --- DATA BUILT IN (No Imports Needed) ---
const PLAYERS: Player[] = [
  {
    "id": "1", "name": "Robert Sánchez", "number": 1, "position": "GK",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p242878.png",
    "nationality": "Spain", "age": 28, "height": "1.97m", "foot": "Right", "joined": "Aug 5, 2023",
    "contractExpiry": "Jun 30, 2030", "marketValue": "€15.00m",
    "stats": { "appearances": 36, "minutesPlayed": 3240, "goals": 0, "assists": 0, "cleanSheets": 12, "rating": 6.9 }, "status": "Available"
  },
  {
    "id": "3", "name": "Marc Cucurella", "number": 3, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p179268.png",
    "nationality": "Spain", "age": 27, "height": "1.72m", "foot": "Left", "joined": "Aug 5, 2022",
    "contractExpiry": "Jun 30, 2028", "marketValue": "€21.00m",
    "stats": { "appearances": 30, "minutesPlayed": 2400, "goals": 1, "assists": 5, "cleanSheets": 4, "rating": 7.1 }, "status": "Available"
  },
  {
    "id": "4", "name": "Tosin Adarabioyo", "number": 4, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p164506.png",
    "nationality": "England", "age": 28, "height": "1.97m", "foot": "Right", "joined": "Jul 1, 2024",
    "contractExpiry": "Jun 30, 2028", "marketValue": "€24.00m",
    "stats": { "appearances": 13, "minutesPlayed": 900, "goals": 1, "assists": 0, "cleanSheets": 2, "rating": 6.7 }, "status": "Available"
  },
  {
    "id": "5", "name": "Benoît Badiashile", "number": 5, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p242921.png",
    "nationality": "France", "age": 24, "height": "1.87m", "foot": "Left", "joined": "Jan 31, 2023",
    "contractExpiry": "Jun 30, 2028", "marketValue": "€23.00m",
    "stats": { "appearances": 11, "minutesPlayed": 800, "goals": 0, "assists": 0, "cleanSheets": 2, "rating": 6.6 }, "status": "Available"
  },
  {
    "id": "6", "name": "Levi Colwill", "number": 6, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p462529.png",
    "nationality": "England", "age": 22, "height": "1.87m", "foot": "Left", "joined": "Jul 1, 2022",
    "contractExpiry": "Jun 30, 2029", "marketValue": "€37.00m",
    "stats": { "appearances": 29, "minutesPlayed": 2400, "goals": 1, "assists": 2, "cleanSheets": 6, "rating": 7.0 }, "status": "Available"
  },
  {
    "id": "7", "name": "Pedro Neto", "number": 7, "position": "FWD",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p242760.png",
    "nationality": "Portugal", "age": 25, "height": "1.73m", "foot": "Right", "joined": "Aug 17, 2024",
    "contractExpiry": "Jun 30, 2031", "marketValue": "€31.00m",
    "stats": { "appearances": 32, "minutesPlayed": 2200, "goals": 7, "assists": 16, "cleanSheets": 0, "rating": 7.5 }, "status": "Available"
  },
  {
    "id": "8", "name": "Enzo Fernández", "number": 8, "position": "MID",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p448554.png",
    "nationality": "Argentina", "age": 24, "height": "1.78m", "foot": "Right", "joined": "Feb 1, 2023",
    "contractExpiry": "Jun 30, 2032", "marketValue": "€79.00m",
    "stats": { "appearances": 33, "minutesPlayed": 2700, "goals": 5, "assists": 8, "cleanSheets": 0, "rating": 7.3 }, "status": "Available"
  },
  {
    "id": "9", "name": "Liam Delap", "number": 9, "position": "FWD",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p448667.png",
    "nationality": "England", "age": 23, "height": "1.86m", "foot": "Right", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2031", "marketValue": "€42.00m",
    "stats": { "appearances": 14, "minutesPlayed": 800, "goals": 3, "assists": 1, "cleanSheets": 0, "rating": 6.8 }, "status": "Available"
  },
  {
    "id": "10", "name": "Cole Palmer", "number": 10, "position": "MID",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p244856.png",
    "nationality": "England", "age": 23, "height": "1.83m", "foot": "Right", "joined": "Sep 1, 2023",
    "contractExpiry": "Jun 30, 2030", "marketValue": "€115.00m",
    "stats": { "appearances": 36, "minutesPlayed": 2900, "goals": 18, "assists": 12, "cleanSheets": 0, "rating": 8.2 }, "status": "Available"
  },
  {
    "id": "11", "name": "Jamie Gittens", "number": 11, "position": "FWD",
    "image": "https://img.a.transfermarkt.technology/portrait/header/743386-1692089456.jpg?lm=1",
    "nationality": "England", "age": 20, "height": "1.82m", "foot": "Left", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2030", "marketValue": "€34.00m",
    "stats": { "appearances": 14, "minutesPlayed": 700, "goals": 1, "assists": 1, "cleanSheets": 0, "rating": 6.7 }, "status": "Available"
  },
  {
    "id": "12", "name": "Filip Jørgensen", "number": 12, "position": "GK",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p462944.png",
    "nationality": "Denmark", "age": 23, "height": "1.97m", "foot": "Right", "joined": "Aug 8, 2024",
    "contractExpiry": "Jun 30, 2032", "marketValue": "€17.00m",
    "stats": { "appearances": 5, "minutesPlayed": 450, "goals": 0, "assists": 0, "cleanSheets": 1, "rating": 6.8 }, "status": "Available"
  },
  {
    "id": "14", "name": "Dario Essugo", "number": 14, "position": "MID",
    "image": "https://img.a.transfermarkt.technology/portrait/header/666952-1698748689.jpg?lm=1",
    "nationality": "Portugal", "age": 21, "height": "1.85m", "foot": "Right", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2033", "marketValue": "€18.00m",
    "stats": { "appearances": 3, "minutesPlayed": 150, "goals": 0, "assists": 0, "cleanSheets": 0, "rating": 6.5 }, "status": "Available"
  },
  {
    "id": "17", "name": "Andrey Santos", "number": 17, "position": "MID",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p486556.png",
    "nationality": "Brazil", "age": 21, "height": "1.84m", "foot": "Right", "joined": "Jan 31, 2023",
    "contractExpiry": "Jun 30, 2028", "marketValue": "€14.00m",
    "stats": { "appearances": 13, "minutesPlayed": 600, "goals": 1, "assists": 1, "cleanSheets": 0, "rating": 6.6 }, "status": "Available"
  },
  {
    "id": "19", "name": "Mamadou Sarr", "number": 19, "position": "FWD",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    "nationality": "France", "age": 19, "height": "1.93m", "foot": "Right", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2033", "marketValue": "€7.50m",
    "stats": { "appearances": 2, "minutesPlayed": 80, "goals": 0, "assists": 0, "cleanSheets": 0, "rating": 6.2 }, "status": "Available"
  },
  {
    "id": "20", "name": "João Pedro", "number": 20, "position": "FWD",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p448498.png",
    "nationality": "Brazil", "age": 24, "height": "1.87m", "foot": "Right", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2030", "marketValue": "€24.00m",
    "stats": { "appearances": 28, "minutesPlayed": 1600, "goals": 11, "assists": 14, "cleanSheets": 0, "rating": 7.4 }, "status": "Available"
  },
  {
    "id": "21", "name": "Jorrel Hato", "number": 21, "position": "DEF",
    "image": "https://img.a.transfermarkt.technology/portrait/header/933483-1698748366.jpg?lm=1",
    "nationality": "Netherlands", "age": 19, "height": "1.84m", "foot": "Left", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2031", "marketValue": "€50.00m",
    "stats": { "appearances": 10, "minutesPlayed": 500, "goals": 1, "assists": 2, "cleanSheets": 1, "rating": 6.9 }, "status": "Available"
  },
  {
    "id": "23", "name": "Trevoh Chalobah", "number": 23, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p244855.png",
    "nationality": "England", "age": 26, "height": "1.86m", "foot": "Right", "joined": "Jul 1, 2017",
    "contractExpiry": "Jun 30, 2028", "marketValue": "€26.00m",
    "stats": { "appearances": 29, "minutesPlayed": 2100, "goals": 3, "assists": 3, "cleanSheets": 5, "rating": 6.9 }, "status": "Available"
  },
  {
    "id": "24", "name": "Reece James", "number": 24, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p225796.png",
    "nationality": "England", "age": 26, "height": "1.78m", "foot": "Right", "joined": "Jul 1, 2020",
    "contractExpiry": "Jun 30, 2028", "marketValue": "€52.00m",
    "stats": { "appearances": 25, "minutesPlayed": 1800, "goals": 2, "assists": 16, "cleanSheets": 5, "rating": 7.4 }, "status": "Available"
  },
  {
    "id": "25", "name": "Moisés Caicedo", "number": 25, "position": "MID",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p448201.png",
    "nationality": "Ecuador", "age": 24, "height": "1.78m", "foot": "Right", "joined": "Aug 14, 2023",
    "contractExpiry": "Jun 30, 2031", "marketValue": "€93.00m",
    "stats": { "appearances": 29, "minutesPlayed": 2400, "goals": 5, "assists": 8, "cleanSheets": 0, "rating": 7.2 }, "status": "Available"
  },
  {
    "id": "27", "name": "Malo Gusto", "number": 27, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p485806.png",
    "nationality": "France", "age": 22, "height": "1.87m", "foot": "Right", "joined": "Jan 31, 2024",
    "contractExpiry": "Jun 30, 2030", "marketValue": "€41.00m",
    "stats": { "appearances": 24, "minutesPlayed": 1900, "goals": 2, "assists": 2, "cleanSheets": 4, "rating": 7.0 }, "status": "Available"
  },
  {
    "id": "28", "name": "Teddy Sharman-Lowe", "number": 28, "position": "GK",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    "nationality": "England", "age": 19, "height": "1.94m", "foot": "Right", "joined": "Jul 1, 2022",
    "contractExpiry": "Jun 30, 2027",
    "marketValue": "€1.00m",
    "stats": { "appearances": 1, "minutesPlayed": 90, "goals": 0, "assists": 0, "cleanSheets": 0, "rating": 6.0 }, "status": "Available"
  },
  {
    "id": "29", "name": "Wesley Fofana", "number": 29, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p223911.png",
    "nationality": "France", "age": 25, "height": "1.90m", "foot": "Right", "joined": "Aug 31, 2022",
    "contractExpiry": "Jun 30, 2029", "marketValue": "€49.00m",
    "stats": { "appearances": 16, "minutesPlayed": 1200, "goals": 0, "assists": 3, "cleanSheets": 3, "rating": 7.0 }, "status": "Injured"
  },
  {
    "id": "30", "name": "Aaron Anselmino", "number": 30, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    "nationality": "Argentina", "age": 19, "height": "1.90m", "foot": "Right", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2032", "marketValue": "€12.00m",
    "stats": { "appearances": 3, "minutesPlayed": 150, "goals": 0, "assists": 0, "cleanSheets": 0, "rating": 6.4 }, "status": "Available"
  },
  {
    "id": "34", "name": "Josh Acheampong", "number": 34, "position": "DEF",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    "nationality": "England", "age": 19, "height": "1.78m", "foot": "Right", "joined": "Jul 1, 2024",
    "contractExpiry": "Jun 30, 2028", "marketValue": "€5.00m",
    "stats": { "appearances": 11, "minutesPlayed": 500, "goals": 1, "assists": 1, "cleanSheets": 1, "rating": 6.8 }, "status": "Available"
  },
  {
    "id": "38", "name": "Marc Guiu", "number": 38, "position": "FWD",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    "nationality": "Spain", "age": 19, "height": "1.87m", "foot": "Right", "joined": "Jul 1, 2024",
    "contractExpiry": "Jun 30, 2031", "marketValue": "€10.00m",
    "stats": { "appearances": 10, "minutesPlayed": 400, "goals": 2, "assists": 1, "cleanSheets": 0, "rating": 6.7 }, "status": "Available"
  },
  {
    "id": "41", "name": "Estêvão Willian", "number": 41, "position": "FWD",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png",
    "nationality": "Brazil", "age": 18, "height": "1.76m", "foot": "Right", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2032", "marketValue": "€50.00m",
    "stats": { "appearances": 24, "minutesPlayed": 1100, "goals": 6, "assists": 6, "cleanSheets": 0, "rating": 7.1 }, "status": "Available"
  },
  {
    "id": "44", "name": "Gabriel Slonina", "number": 44, "position": "GK",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p492932.png",
    "nationality": "USA", "age": 21, "height": "1.94m", "foot": "Right", "joined": "Aug 31, 2023",
    "contractExpiry": "Jun 30, 2031", "marketValue": "€8.00m",
    "stats": { "appearances": 0, "minutesPlayed": 0, "goals": 0, "assists": 0, "cleanSheets": 0, "rating": 0 }, "status": "Available"
  },
  {
    "id": "45", "name": "Roméo Lavia", "number": 45, "position": "MID",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p486551.png",
    "nationality": "Belgium", "age": 22, "height": "1.73m", "foot": "Right", "joined": "Aug 18, 2023",
    "contractExpiry": "Jun 30, 2029", "marketValue": "€34.00m",
    "stats": { "appearances": 6, "minutesPlayed": 300, "goals": 0, "assists": 0, "cleanSheets": 0, "rating": 6.5 }, "status": "Available"
  },
  {
    "id": "49", "name": "Alejandro Garnacho", "number": 49, "position": "FWD",
    "image": "https://resources.premierleague.com/premierleague/photos/players/250x250/p493105.png",
    "nationality": "Argentina", "age": 21, "height": "1.80m", "foot": "Right", "joined": "Summer 2025",
    "contractExpiry": "Jun 30, 2031", "marketValue": "€45.00m",
    "stats": { "appearances": 20, "minutesPlayed": 1400, "goals": 4, "assists": 6, "cleanSheets": 0, "rating": 7.0 }, "status": "Available"
  }
];

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