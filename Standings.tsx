import React, { useEffect, useState } from 'react';
import { fetchStandings } from '../services/api';
import { Trophy, Minus, ChevronUp, ChevronDown, Activity } from 'lucide-react';

export default function Standings() {
  const [table, setTable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTable = async () => {
      const data = await fetchStandings();
      setTable(data);
      setLoading(false);
    };
    getTable();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex flex-col items-center justify-center">
        <Activity className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 animate-pulse">Loading Live Standings...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-yellow-500/10 rounded-2xl">
                <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Premier League Table</h1>
                <p className="text-gray-500 dark:text-gray-400">Live 2025/26 Standings</p>
            </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-center font-bold">Pos</th>
                            <th className="px-6 py-4 font-bold">Club</th>
                            <th className="px-4 py-4 text-center font-bold">MP</th>
                            <th className="px-4 py-4 text-center font-bold text-gray-400 hidden sm:table-cell">W</th>
                            <th className="px-4 py-4 text-center font-bold text-gray-400 hidden sm:table-cell">D</th>
                            <th className="px-4 py-4 text-center font-bold text-gray-400 hidden sm:table-cell">L</th>
                            <th className="px-4 py-4 text-center font-bold">GD</th>
                            <th className="px-4 py-4 text-center font-black text-base">Pts</th>
                            <th className="px-6 py-4 text-center font-bold hidden md:table-cell">Form</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {table.map((team: any) => {
                            const isChelsea = team.team.id === 49;
                            return (
                                <tr 
                                    key={team.team.id} 
                                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30 ${
                                        isChelsea ? 'bg-blue-50/80 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
                                    }`}
                                >
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`font-bold text-base ${isChelsea ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                                {team.rank}
                                            </span>
                                            {/* Rank Change Indicator */}
                                            {team.status === 'up' && <ChevronUp className="w-3 h-3 text-green-500" />}
                                            {team.status === 'down' && <ChevronDown className="w-3 h-3 text-red-500" />}
                                            {team.status === 'same' && <Minus className="w-3 h-3 text-gray-300" />}
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={team.team.logo} alt={team.team.name} className="w-8 h-8 object-contain drop-shadow-sm" />
                                            <span className={`font-bold text-base ${isChelsea ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                                {team.team.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-center font-medium text-gray-900 dark:text-white">{team.all.played}</td>
                                    <td className="px-4 py-4 text-center text-gray-500 hidden sm:table-cell">{team.all.win}</td>
                                    <td className="px-4 py-4 text-center text-gray-500 hidden sm:table-cell">{team.all.draw}</td>
                                    <td className="px-4 py-4 text-center text-gray-500 hidden sm:table-cell">{team.all.lose}</td>
                                    
                                    <td className={`px-4 py-4 text-center font-medium ${
                                        team.goalsDiff > 0 ? 'text-green-600 dark:text-green-400' : 
                                        team.goalsDiff < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500'
                                    }`}>
                                        {team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}
                                    </td>

                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-lg font-black ${isChelsea ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                            {team.points}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="flex items-center justify-center gap-1">
                                            {team.form?.split('').map((res: string, i: number) => (
                                                <div 
                                                    key={i} 
                                                    className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                                                        res === 'W' ? 'bg-green-500' : 
                                                        res === 'D' ? 'bg-gray-400' : 'bg-red-500'
                                                    }`}
                                                >
                                                    {res}
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            {/* Footer Legend */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 flex gap-6 justify-center sm:justify-start">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Champions League</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div>Europa League</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div>Relegation</div>
            </div>
        </div>

      </div>
    </div>
  );
}