import React, { useState } from 'react';
import { PLAYERS } from './constants';
import { Player } from './types';
import { 
  BarChart2, Trophy, Target, Footprints, ArrowUp, ArrowDown, ChevronsUpDown, Timer, Shield, Activity, PieChart as PieChartIcon
} from 'lucide-react';
import { PlayerAvatar } from './PlayerAvatar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const LeaderCard = ({ title, player, value, subLabel, icon: Icon, colorClass }: { title: string, player: Player, value: string | number, subLabel: string, icon: any, colorClass: string }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 group hover:shadow-md transition-all">
    <div className={`absolute top-0 right-0 p-3 opacity-10 ${colorClass}`}><Icon size={64} /></div>
    <div className="relative z-10 flex items-start gap-4"><div className="h-16 w-16 rounded-full border-2 border-white dark:border-gray-600 shadow-md overflow-hidden bg-gray-50 dark:bg-gray-700"><PlayerAvatar src={player.image} alt={player.name} className="h-full w-full object-cover" /></div><div><p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{title}</p><h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{player.name}</h3><p className="text-xs text-gray-500 dark:text-gray-400">{player.position} • {player.nationality}</p></div></div>
    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 flex items-baseline justify-between"><div><span className={`text-3xl font-black ${colorClass.replace('bg-', 'text-')}`}>{value}</span><span className="text-xs font-medium text-gray-400 ml-1">{subLabel}</span></div><div className={`p-2 rounded-full ${colorClass} bg-opacity-20 text-opacity-100`}><Icon size={20} className={colorClass.replace('bg-', 'text-')} /></div></div>
  </div>
);

const TeamStatRow = ({ label, value, rank }: { label: string, value: string, rank?: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0"><span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span><div className="text-right"><span className="block font-bold text-gray-900 dark:text-white">{value}</span>{rank && <span className="text-[10px] text-gray-400">{rank}</span>}</div></div>
);

type SortKey = keyof Player['stats'] | 'name';

export default function Stats() {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'goals', direction: 'desc' });
  const sortedPlayers = [...PLAYERS].sort((a, b) => {
    const aValue = sortConfig.key === 'name' ? a.name : a.stats[sortConfig.key as keyof typeof a.stats] || 0;
    const bValue = sortConfig.key === 'name' ? b.name : b.stats[sortConfig.key as keyof typeof b.stats] || 0;
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };
  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column) return <ChevronsUpDown size={14} className="text-gray-300" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="text-chelsea-blue" /> : <ArrowDown size={14} className="text-chelsea-blue" />;
  };
  const topScorer = [...PLAYERS].sort((a, b) => b.stats.goals - a.stats.goals)[0];
  const topAssister = [...PLAYERS].sort((a, b) => b.stats.assists - a.stats.assists)[0];
  const topRated = [...PLAYERS].sort((a, b) => b.stats.rating - a.stats.rating)[0];
  const topScorersData = [...PLAYERS].sort((a, b) => b.stats.goals - a.stats.goals).slice(0, 5).map(p => ({ name: p.name.split(' ').pop(), goals: p.stats.goals, assists: p.stats.assists }));
  const positionValueData = ['GK', 'DEF', 'MID', 'FWD'].map(pos => {
    const total = PLAYERS.filter(p => p.position === pos).reduce((sum, p) => sum + parseFloat(p.marketValue.replace('€', '').replace('m', '') || '0'), 0);
    return { name: pos, value: total };
  });
  const PIE_COLORS = ['#C8AA6E', '#034694', '#60a5fa', '#1e293b'];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3"><BarChart2 className="text-chelsea-blue dark:text-chelsea-gold h-8 w-8" /><div><h1 className="text-3xl font-bold text-chelsea-dark dark:text-white">Statistics Hub</h1><p className="text-gray-500 dark:text-gray-400">Comprehensive player and team performance data.</p></div></div>
      <div className="grid gap-6 md:grid-cols-3"><LeaderCard title="Golden Boot" player={topScorer} value={topScorer.stats.goals} subLabel="Goals" icon={Target} colorClass="bg-yellow-500" /><LeaderCard title="Playmaker" player={topAssister} value={topAssister.stats.assists} subLabel="Assists" icon={Footprints} colorClass="bg-blue-500" /><LeaderCard title="Highest Rated" player={topRated} value={topRated.stats.rating} subLabel="Avg Rating" icon={Trophy} colorClass="bg-green-500" /></div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"><div className="flex items-center justify-between mb-6"><h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><BarChart2 size={18} className="text-chelsea-blue" /> Top Contributors</h3></div><div className="h-64 w-full text-xs"><ResponsiveContainer width="100%" height="100%"><BarChart data={topScorersData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" /><XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} /><YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} /><Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Legend wrapperStyle={{ paddingTop: '20px' }} /><Bar dataKey="goals" name="Goals" fill="#034694" radius={[4, 4, 0, 0]} barSize={32} /><Bar dataKey="assists" name="Assists" fill="#C8AA6E" radius={[4, 4, 0, 0]} barSize={32} /></BarChart></ResponsiveContainer></div></div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"><div className="flex items-center justify-between mb-6"><h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><PieChartIcon size={18} className="text-chelsea-gold" /> Squad Value Distribution</h3></div><div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={positionValueData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{positionValueData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} strokeWidth={0} />))}</Pie><Tooltip formatter={(value: number) => `€${value.toFixed(2)}m`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" /></PieChart></ResponsiveContainer></div></div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center"><h2 className="text-lg font-bold text-gray-900 dark:text-white">Squad Statistics</h2><div className="text-xs text-gray-400 font-medium bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">2023/24 Season</div></div>
          <div className="overflow-x-auto"><table className="w-full text-sm text-left whitespace-nowrap"><thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-bold border-b border-gray-100 dark:border-gray-700"><tr><th className="px-6 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleSort('name')}><div className="flex items-center gap-2">Player <SortIcon column="name" /></div></th><th className="px-4 py-4 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleSort('appearances')}><div className="flex items-center justify-center gap-1">Apps <SortIcon column="appearances" /></div></th><th className="px-4 py-4 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleSort('minutesPlayed')}><div className="flex items-center justify-center gap-1">Mins <SortIcon column="minutesPlayed" /></div></th><th className="px-4 py-4 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleSort('goals')}><div className="flex items-center justify-center gap-1">Goals <SortIcon column="goals" /></div></th><th className="px-4 py-4 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleSort('assists')}><div className="flex items-center justify-center gap-1">Ast <SortIcon column="assists" /></div></th><th className="px-6 py-4 text-right cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onClick={() => handleSort('rating')}><div className="flex items-center justify-end gap-1">Rating <SortIcon column="rating" /></div></th></tr></thead><tbody className="divide-y divide-gray-50 dark:divide-gray-700">{sortedPlayers.map((player) => (<tr key={player.id} className="hover:bg-blue-50/30 dark:hover:bg-gray-700/30 transition-colors group"><td className="px-6 py-3 font-medium text-gray-900 dark:text-white flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600"><PlayerAvatar src={player.image} alt={player.name} className="w-full h-full object-cover" /></div><div><span className="block">{player.name}</span><span className="text-[10px] text-gray-400 font-normal uppercase">{player.position}</span></div></td><td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">{player.stats.appearances}</td><td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300 font-mono text-xs">{player.stats.minutesPlayed}</td><td className={`px-4 py-3 text-center font-bold ${player.stats.goals > 0 ? 'text-chelsea-blue dark:text-blue-400' : 'text-gray-300 dark:text-gray-600'}`}>{player.stats.goals}</td><td className={`px-4 py-3 text-center font-bold ${player.stats.assists > 0 ? 'text-chelsea-blue dark:text-blue-400' : 'text-gray-300 dark:text-gray-600'}`}>{player.stats.assists}</td><td className="px-6 py-3 text-right"><span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${player.stats.rating >= 7.5 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : player.stats.rating >= 7.0 ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>{player.stats.rating}</span></td></tr>))}</tbody></table></div>
        </div>
        <div className="space-y-6"><div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"><div className="flex items-center gap-2 mb-4"><Activity className="text-chelsea-gold" /><h2 className="text-lg font-bold text-gray-900 dark:text-white">Team Performance</h2></div><div className="space-y-1"><TeamStatRow label="Goals Scored" value="41" rank="6th in PL" /><TeamStatRow label="Goals Conceded" value="32" rank="9th in PL" /><TeamStatRow label="Avg Possession" value="61.5%" rank="3rd in PL" /><TeamStatRow label="Pass Accuracy" value="88.2%" rank="4th in PL" /><TeamStatRow label="Clean Sheets" value="6" rank="10th in PL" /><TeamStatRow label="Yellow Cards" value="52" rank="1st in PL" /></div></div><div className="bg-gradient-to-br from-chelsea-dark to-chelsea-blue rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"><div className="relative z-10"><h3 className="font-bold text-chelsea-gold uppercase tracking-widest text-xs mb-2">Next Milestone</h3><div className="text-3xl font-bold mb-1">50 Goals</div><p className="text-sm text-blue-100 opacity-90">Chelsea needs 9 more goals to reach 50 Premier League goals this season.</p><div className="mt-4 h-2 bg-black/20 rounded-full overflow-hidden"><div className="h-full bg-chelsea-gold w-[82%]"></div></div><div className="mt-1 flex justify-between text-[10px] text-blue-200"><span>41 Goals</span><span>Target: 50</span></div></div><div className="absolute -bottom-6 -right-6 text-white opacity-5"><Target size={120} /></div></div></div>
      </div>
    </div>
  );
}