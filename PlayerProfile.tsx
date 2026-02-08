import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PLAYERS } from './constants';
import { ArrowLeft, Activity, Trophy, Clock, Target, Shield, AlertTriangle, Footprints, Zap, ArrowRightLeft, Repeat, Info, Briefcase, Calendar, Ruler } from 'lucide-react';
import { PlayerAvatar } from './PlayerAvatar';

const Heatmap = () => (
  <div className="relative w-full aspect-[2/3] bg-green-50 rounded-lg border border-green-100 overflow-hidden">
    {/* Pitch Markings */}
    <div className="absolute inset-x-0 top-0 h-1/6 border-b border-green-200/50"></div>
    <div className="absolute inset-x-0 bottom-0 h-1/6 border-t border-green-200/50"></div>
    <div className="absolute inset-x-1/4 top-0 h-1/12 border-x border-b border-green-200/50"></div>
    <div className="absolute inset-x-1/4 bottom-0 h-1/12 border-x border-t border-green-200/50"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full h-px bg-green-200/50"></div>
      <div className="absolute w-20 h-20 rounded-full border border-green-200/50"></div>
    </div>
    
    {/* Heatmap Blobs - Simplified visual representation */}
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 blur-3xl rounded-full"></div>
    <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-red-500/30 blur-3xl rounded-full"></div>
    <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-red-600/20 blur-2xl rounded-full"></div>
  </div>
);

const StatBox = ({ label, value, icon: Icon, subtext }: { label: string, value: string | number, icon: any, subtext?: string }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
    <div className="flex items-center gap-2 text-gray-400 mb-2">
      <Icon size={16} />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-2xl font-bold text-chelsea-dark dark:text-white">{value}</div>
    {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
  </div>
);

const InfoRow = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: any }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Icon size={14} />
            <span>{label}</span>
        </div>
        <div className="font-semibold text-gray-900 dark:text-white text-sm text-right">{value}</div>
    </div>
);

const RatingTrendChart = ({ data }: { data: { result: string, rating: number, opponent: string }[] }) => {
  const height = 120;
  const width = 300;
  const paddingX = 30;
  const paddingY = 20;
  
  // Scales
  const minRating = 4.0;
  const maxRating = 10.0;
  
  const getY = (rating: number) => {
    return height - paddingY - ((rating - minRating) / (maxRating - minRating)) * (height - (paddingY * 2));
  };
  
  const getX = (index: number) => {
    return (index / (data.length - 1)) * (width - (paddingX * 2)) + paddingX;
  };
  
  const points = data.map((d, i) => `${getX(i)},${getY(d.rating)}`).join(' ');

  return (
    <div className="w-full select-none pt-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#034694" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#034694" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area fill */}
        <polygon 
          points={`${paddingX},${height-paddingY} ${points} ${width-paddingX},${height-paddingY}`} 
          fill="url(#chartGradient)" 
        />
        
        {/* Line */}
        <polyline 
          points={points} 
          fill="none" 
          stroke="#034694" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Points & Labels */}
        {data.map((d, i) => {
           const x = getX(i);
           const y = getY(d.rating);
           const resultColor = d.result === 'W' ? '#22c55e' : d.result === 'L' ? '#ef4444' : '#9ca3af';
           
           return (
            <g key={i}>
              {/* Vertical Grid Line (Optional, subtle) */}
              <line x1={x} y1={paddingY} x2={x} y2={height - paddingY} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 2" />

              {/* Data Point */}
              <circle cx={x} cy={y} r="5" fill="white" stroke={resultColor} strokeWidth="2.5" />
              
              {/* Rating Label */}
              <text x={x} y={y - 12} textAnchor="middle" className="text-[10px] font-bold fill-gray-700 font-sans dark:fill-gray-300">{d.rating}</text>
              
              {/* Result Label (W/D/L) */}
              <text x={x} y={height} textAnchor="middle" fontWeight="bold" fontSize="10" fill={resultColor} className="font-sans">
                {d.result}
              </text>
              
              {/* Opponent Label (Optional short code) */}
               <text x={x} y={height + 12} textAnchor="middle" fontSize="8" fill="#9ca3af" className="font-sans uppercase">
                {d.opponent}
              </text>
            </g>
           );
        })}
      </svg>
    </div>
  );
};

// Helper to get mock transfer history
const getMockTransferHistory = (id: string) => {
  switch(id) {
    case '20': // Palmer
      return [
        { date: '01 Sep 2023', from: 'Manchester City', to: 'Chelsea FC', fee: '£42.5m' },
        { date: '01 Jul 2021', from: 'Man City U23', to: 'Manchester City', fee: '-' },
      ];
    case '25': // Caicedo
      return [
        { date: '14 Aug 2023', from: 'Brighton', to: 'Chelsea FC', fee: '£115m' },
        { date: '01 Feb 2021', from: 'Indep. del Valle', to: 'Brighton', fee: '£4.5m' },
        { date: '31 Aug 2021', from: 'Brighton', to: 'Beerschot', fee: 'Loan' },
      ];
    case '8': // Enzo
      return [
        { date: '31 Jan 2023', from: 'Benfica', to: 'Chelsea FC', fee: '£106.8m' },
        { date: '14 Jul 2022', from: 'River Plate', to: 'Benfica', fee: '£12m' },
      ];
    case '15': // Jackson
      return [
        { date: '30 Jun 2023', from: 'Villarreal', to: 'Chelsea FC', fee: '£32m' },
        { date: '01 Jul 2022', from: 'Villarreal B', to: 'Villarreal', fee: '-' },
      ];
     case '18': // Nkunku
      return [
        { date: '01 Jul 2023', from: 'RB Leipzig', to: 'Chelsea FC', fee: '£52m' },
        { date: '18 Jul 2019', from: 'PSG', to: 'RB Leipzig', fee: '£11m' },
      ];
    default:
      return [
        { date: '14 Aug 2023', from: 'Previous Club', to: 'Chelsea FC', fee: 'Undisclosed' },
         { date: '01 Jul 2020', from: 'Youth Academy', to: 'Previous Club', fee: 'Free' },
      ];
  }
};


export default function PlayerProfile() {
  const { playerId } = useParams();
  const player = PLAYERS.find(p => p.id === playerId);

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Player not found</h2>
        <Link to="/squad" className="mt-4 text-chelsea-blue hover:underline">Back to Squad</Link>
      </div>
    );
  }

  // Enhanced Mock Data for detailed view with 5 seasons history
  const seasons = [
    { year: '23/24', team: 'Chelsea FC', apps: player.stats.appearances, goals: player.stats.goals, assists: player.stats.assists, rating: player.stats.rating },
    { year: '22/23', team: 'Chelsea FC', apps: 32, goals: Math.max(0, Math.floor(player.stats.goals * 0.8)), assists: Math.max(0, Math.floor(player.stats.assists * 0.7)), rating: 7.12 },
    { year: '21/22', team: 'Chelsea FC', apps: 28, goals: Math.max(0, Math.floor(player.stats.goals * 0.6)), assists: Math.max(0, Math.floor(player.stats.assists * 0.5)), rating: 6.95 },
    { year: '20/21', team: 'Previous Club', apps: 34, goals: Math.max(1, Math.floor(player.stats.goals * 0.5)), assists: Math.max(1, Math.floor(player.stats.assists * 0.4)), rating: 6.84 },
    { year: '19/20', team: 'Previous Club', apps: 15, goals: 0, assists: 1, rating: 6.55 },
  ];

  // Mock data for line chart
  const recentForm = [
    { result: 'W', rating: 7.4, opponent: 'CRY' },
    { result: 'L', rating: 5.9, opponent: 'LIV' },
    { result: 'D', rating: 6.5, opponent: 'MCI' },
    { result: 'W', rating: 8.2, opponent: 'AVL' },
    { result: 'W', rating: 9.1, opponent: 'LUT' }
  ];

  const transferHistory = getMockTransferHistory(player.id);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2">
        <Link to="/squad" className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-chelsea-blue transition-colors">
          <ArrowLeft size={16} /> Back to Squad
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-chelsea-dark to-chelsea-blue text-white shadow-xl">
        <div className="absolute top-0 right-0 p-32 bg-chelsea-gold blur-[120px] opacity-20 rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 p-8 md:p-12">
          {/* Image */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl bg-chelsea-blue">
            <PlayerAvatar src={player.image} alt={player.name} className="w-full h-full object-cover" size={512} />
             <div className="absolute top-0 right-0 bg-chelsea-gold text-chelsea-blue font-bold px-3 py-1 rounded-bl-lg text-lg">
               #{player.number}
             </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-white/10">
                   {player.position}
                 </span>
                 <span className="flex items-center gap-1 text-xs text-blue-200">
                   {player.nationality}
                 </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">{player.name}</h1>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
               <div className="text-center md:text-left">
                  <span className="block text-2xl font-bold">{player.stats.appearances}</span>
                  <span className="text-xs text-blue-200 uppercase tracking-wide">Appearances</span>
               </div>
               <div className="text-center md:text-left">
                  <span className="block text-2xl font-bold">{player.stats.goals}</span>
                  <span className="text-xs text-blue-200 uppercase tracking-wide">Goals</span>
               </div>
               <div className="text-center md:text-left">
                  <span className="block text-2xl font-bold">{player.stats.assists}</span>
                  <span className="text-xs text-blue-200 uppercase tracking-wide">Assists</span>
               </div>
               <div className="text-center md:text-left">
                  <span className={`block text-2xl font-bold ${parseFloat(String(player.stats.rating)) >= 7.0 ? 'text-chelsea-gold' : ''}`}>
                    {player.stats.rating}
                  </span>
                  <span className="text-xs text-blue-200 uppercase tracking-wide">Avg Rating</span>
               </div>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="self-start md:self-center">
             <div className={`
               px-4 py-2 rounded-xl font-bold text-sm border backdrop-blur-md shadow-lg
               ${player.status === 'Available' ? 'bg-green-500/20 border-green-400 text-green-200' : 
                 player.status === 'Injured' ? 'bg-red-500/20 border-red-400 text-red-200' : 'bg-yellow-500/20 border-yellow-400 text-yellow-200'}
             `}>
               {player.status}
               {player.injuryDetails && <span className="block text-[10px] font-normal mt-1 opacity-80">{player.injuryDetails.type} • Returns: {player.injuryDetails.expectedReturn}</span>}
             </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Table */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Detailed Stats Grid */}
          <section>
            <h3 className="text-lg font-bold text-chelsea-dark dark:text-white mb-4 flex items-center gap-2">
              <Activity className="text-chelsea-blue" size={20} /> Season Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatBox label="Min / Goal" value="142" icon={Clock} subtext="Premier League" />
              <StatBox label="Shots / 90" value="3.4" icon={Target} subtext="Top 5%" />
              <StatBox label="Pass Comp" value="84%" icon={Activity} subtext="Progressive: 5.2" />
              <StatBox label={player.position === 'GK' ? 'Saves' : 'Duels Won'} value={player.position === 'GK' ? '68' : '58%'} icon={Shield} />
              
              <StatBox label="Key Passes" value={player.position === 'DEF' ? '0.5' : '1.8'} icon={Footprints} subtext="Per 90" />
              <StatBox label="Tackles Won" value={player.position === 'FWD' ? '0.8' : '2.4'} icon={Shield} subtext="Success: 72%" />
              <StatBox label="Interceptions" value={player.position === 'FWD' ? '0.4' : '1.5'} icon={Zap} subtext="Per 90" />
              <StatBox label="Recoveries" value="5.2" icon={Activity} subtext="Possession Won" />
            </div>
          </section>

          {/* Season History Table */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
             <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-chelsea-dark dark:text-white flex items-center gap-2">
                  <Trophy className="text-chelsea-gold" size={20} /> Career History
                </h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left whitespace-nowrap">
                 <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700">
                   <tr>
                     <th className="px-6 py-3">Season</th>
                     <th className="px-6 py-3">Team</th>
                     <th className="px-6 py-3 text-center">Apps</th>
                     <th className="px-6 py-3 text-center">Goals</th>
                     <th className="px-6 py-3 text-center">Assists</th>
                     <th className="px-6 py-3 text-right">Rating</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                   {seasons.map((season, i) => (
                     <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                       <td className="px-6 py-4 font-medium text-chelsea-blue dark:text-blue-400">{season.year}</td>
                       <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{season.team}</td>
                       <td className="px-6 py-4 text-center dark:text-gray-300">{season.apps}</td>
                       <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">{season.goals}</td>
                       <td className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">{season.assists}</td>
                       <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">{season.rating}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </section>

          {/* Transfer History Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
             <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-chelsea-dark dark:text-white flex items-center gap-2">
                  <Repeat className="text-chelsea-blue" size={20} /> Transfer History
                </h3>
             </div>
             <div className="p-6">
                <div className="space-y-6">
                  {transferHistory.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 relative">
                      {/* Timeline Line (Visual only, hidden on last item) */}
                      {index !== transferHistory.length - 1 && (
                        <div className="absolute left-6 top-10 bottom-[-24px] w-0.5 bg-gray-100 dark:bg-gray-700 hidden md:block"></div>
                      )}
                      
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shrink-0 z-10 text-xs font-bold text-gray-400">
                          {new Date(item.date).getFullYear()}
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                             <Clock size={12} /> {item.date}
                           </div>
                           <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                             <span>{item.from}</span>
                             <ArrowRightLeft size={16} className="text-gray-400" />
                             <span className="text-chelsea-blue dark:text-blue-400">{item.to}</span>
                           </div>
                        </div>
                      </div>
                      
                      <div className="pl-16 md:pl-0">
                         <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold rounded-lg border border-green-100 dark:border-green-800 text-sm">
                           {item.fee}
                         </span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </section>
        </div>

        {/* Right Column: Profile Data & Heatmap */}
        <div className="space-y-8">
           
           {/* Profile Data (Transfermarkt Style) */}
           <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                 <Info size={16} /> Player Data
              </h3>
              
              {/* Market Value Box */}
              <div className="mb-6 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl text-white text-center shadow-lg">
                  <div className="text-xs text-gray-300 uppercase tracking-widest mb-1">Current Market Value</div>
                  <div className="text-3xl font-bold text-white mb-2">{player.marketValue}</div>
                  <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                     Last Update: Jan 2024 <span className="text-green-400 font-bold">▲</span>
                  </div>
              </div>

              <div className="space-y-1">
                 <InfoRow label="Date of Birth / Age" value={`${player.age} Years`} icon={Calendar} />
                 <InfoRow label="Height" value={player.height} icon={Ruler} />
                 <InfoRow label="Citizenship" value={player.nationality} icon={Briefcase} />
                 <InfoRow label="Position" value={player.position} icon={Target} />
                 <InfoRow label="Foot" value={player.foot} icon={Footprints} />
                 <InfoRow label="Joined" value={player.joined} icon={ArrowRightLeft} />
                 <InfoRow label="Contract Exp" value={player.contractExpiry} icon={Briefcase} />
                 <InfoRow label="Outfitter" value="Nike" icon={Zap} />
              </div>
           </section>

           {/* Form Guide */}
           <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
             <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Recent Form (Rating)</h3>
             <RatingTrendChart data={recentForm} />
             <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 text-center">
                <span className="text-xs text-gray-400">Last 5 Matches Performance</span>
             </div>
           </section>

           {/* Heatmap */}
           <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Season Heatmap</h3>
              <Heatmap />
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                 <div className="flex items-center gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500 opacity-50"></div> High Activity
                 </div>
                 <div className="flex items-center gap-1">
                   <div className="w-2 h-2 rounded-full bg-green-200"></div> Low Activity
                 </div>
              </div>
           </section>

        </div>
      </div>
    </div>
  );
}