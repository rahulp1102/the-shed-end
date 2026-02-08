import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { fetchSquad } from '../services/footballData'; // <--- IMPORT THE SOURCE
import { Player } from '../types';

export default function Squad() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch from source when page loads
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const liveData = await fetchSquad();
      
      if (liveData.length > 0) {
        setPlayers(liveData);
      } else {
        setError("Could not fetch players from TheSportsDB. API might be busy.");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter Logic (remains the same)
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'All' || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex flex-col justify-center items-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p>Contacting TheSportsDB...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex justify-center items-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  // ... The rest of your JSX (Search bar, Grid, etc.) goes here ...
  // ... Just make sure you use `filteredPlayers.map(...)` ...
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* HEADER */}
         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
           <div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">First Team Squad</h1>
             <p className="text-gray-500 dark:text-gray-400">
                Data sourced from TheSportsDB
             </p>
           </div>
           
           {/* SEARCH BARS ETC HERE (Copy from your old file) */}
           <div className="flex gap-4 mt-4 md:mt-0 w-full md:w-auto">
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
                 {/* Player Image & Card Content (Copy your Card JSX here) */}
                 <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" 
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
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}