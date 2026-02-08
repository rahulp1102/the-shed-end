
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLAYERS } from '../constants';
import { Player } from '../types';
import { LayoutGrid, List, ChevronRight, Info, Search } from 'lucide-react';
import { PlayerAvatar } from '../components/PlayerAvatar';

// Components for Card View
const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  const isInjured = player.status === 'Injured';

  return (
    <Link 
      to={`/squad/${player.id}`} 
      className="block group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 dark:bg-gray-700">
        <PlayerAvatar 
          src={player.image} 
          alt={player.name} 
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${isInjured ? 'grayscale-[0.5]' : ''}`}
          size={512}
        />
        <div className="absolute top-0 right-0 p-3 z-10">
          <span className="text-4xl font-black text-gray-200 dark:text-gray-600 drop-shadow-md font-sans transition-colors duration-300 group-hover:text-chelsea-blue dark:group-hover:text-chelsea-gold opacity-80 group-hover:opacity-100">
            {player.number}
          </span>
        </div>
        
        {player.status !== 'Available' && (
          <div className="absolute bottom-0 left-0 w-full bg-red-500/90 py-1 text-center text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm z-10">
             {player.status}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
           <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{player.position}</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-chelsea-blue dark:group-hover:text-chelsea-gold transition-colors">{player.name}</h3>
           </div>
           <div className="flex flex-col items-end">
             <span className="text-xs text-gray-400">{player.nationality}</span>
           </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
           <span className="text-gray-500 dark:text-gray-400">Market Value:</span>
           <span className="font-bold text-chelsea-dark dark:text-white">{player.marketValue}</span>
        </div>
      </div>
    </Link>
  );
};

export default function Squad() {
  const [filter, setFilter] = useState<'All' | 'GK' | 'DEF' | 'MID' | 'FWD'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = PLAYERS.filter(p => {
    const matchesPos = filter === 'All' || p.position === filter;
    const matchesName = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPos && matchesName;
  });

  // Calculate Summary Stats based on filtered players
  const totalValueNum = filteredPlayers.reduce((acc, p) => {
    // Basic mock parser: "€55.00m" -> 55.00
    const val = parseFloat(p.marketValue.replace('€', '').replace('m', ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  
  const avgAge = filteredPlayers.length > 0 
    ? (filteredPlayers.reduce((acc, p) => acc + p.age, 0) / filteredPlayers.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
        <div className="w-full md:w-auto">
           <h1 className="text-3xl font-bold text-chelsea-dark dark:text-white">First Team Squad</h1>
           <p className="text-gray-500 dark:text-gray-400">Detailed squad overview, market values, and contract data.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
           {/* Search Input */}
           <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="Search players..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-chelsea-blue dark:text-white"
             />
           </div>

           <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm shrink-0">
             <button 
               onClick={() => setViewMode('grid')}
               className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-chelsea-blue text-white shadow' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
             >
               <LayoutGrid size={18} />
             </button>
             <button 
               onClick={() => setViewMode('list')}
               className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-chelsea-blue text-white shadow' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
             >
               <List size={18} />
             </button>
           </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
         <div className="text-center md:text-left border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
            <span className="block text-xs text-gray-500 uppercase tracking-wider">Squad Size</span>
            <span className="text-2xl font-bold text-chelsea-blue dark:text-white">{filteredPlayers.length}</span>
         </div>
         <div className="text-center md:text-left border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
            <span className="block text-xs text-gray-500 uppercase tracking-wider">Average Age</span>
            <span className="text-2xl font-bold text-chelsea-blue dark:text-white">{avgAge}</span>
         </div>
         <div className="text-center md:text-left border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
            <span className="block text-xs text-gray-500 uppercase tracking-wider">Foreigners</span>
            <span className="text-2xl font-bold text-chelsea-blue dark:text-white">{filteredPlayers.filter(p => p.nationality !== 'England').length}</span>
         </div>
         <div className="text-center md:text-left">
            <span className="block text-xs text-gray-500 uppercase tracking-wider">Total Value</span>
            <span className="text-2xl font-bold text-green-600">€{totalValueNum.toFixed(2)}m</span>
         </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
          {['All', 'GK', 'DEF', 'MID', 'FWD'].map((pos) => (
            <button
              key={pos}
              onClick={() => setFilter(pos as any)}
              className={`
                px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap
                ${filter === pos 
                  ? 'bg-chelsea-blue text-white shadow-lg ring-2 ring-blue-200 dark:ring-blue-900' 
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              {pos}
            </button>
          ))}
      </div>

      {filteredPlayers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
           <p className="text-gray-500 dark:text-gray-400">No players found matching your criteria.</p>
           <button onClick={() => { setSearchQuery(''); setFilter('All'); }} className="mt-2 text-chelsea-blue font-medium hover:underline">Clear filters</button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        /* Transfermarkt Style List View */
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-chelsea-blue text-white text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3 text-center">#</th>
                  <th className="px-4 py-3">Player</th>
                  <th className="px-4 py-3 text-center">Age</th>
                  <th className="px-4 py-3">Nat</th>
                  <th className="px-4 py-3">Contract</th>
                  <th className="px-4 py-3 text-right">Market Value</th>
                  <th className="px-4 py-3 text-center">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredPlayers.map((player, idx) => (
                  <tr key={player.id} className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors group">
                    <td className="px-4 py-3 text-center font-bold text-gray-400 bg-gray-50/50 dark:bg-gray-900/20">
                      {player.number}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                          <PlayerAvatar src={player.image} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-chelsea-dark dark:text-white group-hover:text-chelsea-blue dark:group-hover:text-chelsea-gold transition-colors">
                            {player.name}
                          </div>
                          <div className="text-xs text-gray-500">{player.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">
                      {player.age}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                       <span className="flex items-center gap-2">
                         {/* Placeholder flag logic */}
                         {player.nationality}
                       </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">
                       <div className="flex flex-col">
                         <span>{player.contractExpiry}</span>
                         <span className="text-[10px] text-gray-400">Joined: {new Date(player.joined).getFullYear()}</span>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">
                       <div className="flex flex-col items-end">
                         <span>{player.marketValue}</span>
                         {/* Mock Trend Arrow */}
                         {idx % 3 === 0 && <span className="text-[10px] text-green-600 flex items-center">▲ +5m</span>}
                       </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                       <Link to={`/squad/${player.id}`} className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-chelsea-blue hover:text-white transition-colors">
                         <ChevronRight size={16} />
                       </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
