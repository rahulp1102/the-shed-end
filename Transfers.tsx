import React, { useState } from 'react';
import { ArrowRightLeft, ArrowUpRight, ArrowDownLeft, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';

// --- MASTER TRANSFER DATA (2025/26 Season + Future) ---
const TRANSFERS = [
    // --- RUMOURS (THE BIG ONES) ---
    { id: '1', player: 'Julián Álvarez', fromTeam: 'Atletico Madrid', toTeam: 'Chelsea', amount: '€120m', date: 'Summer 2026', type: 'Rumour', status: 'Advanced Talks' },
    { id: '2', player: 'Dušan Vlahović', fromTeam: 'Juventus', toTeam: 'Chelsea', amount: 'Free', date: 'Summer 2026', type: 'Rumour', status: 'Monitoring' },
    { id: '3', player: 'Samu Omorodion', fromTeam: 'FC Porto', toTeam: 'Chelsea', amount: 'Undisclosed', date: 'Summer 2026', type: 'Rumour', status: 'Interest' },

    // --- FUTURE ARRIVALS (PRE-AGREED 2026/27) ---
    { id: '4', player: 'Geovany Quenda', fromTeam: 'Sporting CP', toTeam: 'Chelsea', amount: '£44m', date: 'Jul 1, 2026', type: 'Future', status: 'Pre-Contract Signed' },
    { id: '5', player: 'Emanuel Emegha', fromTeam: 'Strasbourg', toTeam: 'Chelsea', amount: 'Internal', date: 'Jul 1, 2026', type: 'Future', status: 'Loan Return' },

    // --- JANUARY 2026 WINDOW (DONE) ---
    { id: '6', player: 'Nicolas Jackson', fromTeam: 'Chelsea', toTeam: 'Bayern Munich', amount: 'Loan w/ Buy', date: 'Jan 2026', type: 'Outgoing', status: 'Confirmed' },
    { id: '7', player: 'Axel Disasi', fromTeam: 'Chelsea', toTeam: 'U21s', amount: 'N/A', date: 'Feb 2026', type: 'Outgoing', status: 'Frozen Out' },
    { id: '8', player: 'Leo Castledine', fromTeam: 'Chelsea', toTeam: 'Middlesbrough', amount: '£8m', date: 'Jan 2026', type: 'Outgoing', status: 'Permanent' },
    { id: '9', player: 'Ato Ampah', fromTeam: 'Chelsea', toTeam: 'Stoke City', amount: 'Loan', date: 'Jan 2026', type: 'Outgoing', status: 'Confirmed' },
    { id: '10', player: 'Facundo Buonanotte', fromTeam: 'Chelsea', toTeam: 'Leeds Utd', amount: 'Loan', date: 'Jan 2026', type: 'Outgoing', status: 'Confirmed' },
    { id: '11', player: 'Yahya Idrissi', fromTeam: 'Chelsea', toTeam: 'AC Milan', amount: 'Undisclosed', date: 'Jan 2026', type: 'Outgoing', status: 'Confirmed' },

    // --- SUMMER 2025 INCOMING (THE REBUILD) ---
    { id: '12', player: 'Liam Delap', fromTeam: 'Ipswich', toTeam: 'Chelsea', amount: '£30m', date: 'Jul 2025', type: 'Incoming', status: 'Confirmed' },
    { id: '13', player: 'Estêvão Willian', fromTeam: 'Palmeiras', toTeam: 'Chelsea', amount: '£28.7m', date: 'Jul 2025', type: 'Incoming', status: 'Confirmed' },
    { id: '14', player: 'João Pedro', fromTeam: 'Brighton', toTeam: 'Chelsea', amount: 'Undisclosed', date: 'Aug 2025', type: 'Incoming', status: 'Confirmed' },
    { id: '15', player: 'Jorrel Hato', fromTeam: 'Ajax', toTeam: 'Chelsea', amount: 'Undisclosed', date: 'Jul 2025', type: 'Incoming', status: 'Confirmed' },
    { id: '16', player: 'Dario Essugo', fromTeam: 'Sporting CP', toTeam: 'Chelsea', amount: '£18.8m', date: 'Aug 2025', type: 'Incoming', status: 'Confirmed' },
    { id: '17', player: 'Kendry Páez', fromTeam: 'Independiente', toTeam: 'Chelsea', amount: '£8.4m', date: 'Jul 2025', type: 'Incoming', status: 'Confirmed' },
    { id: '18', player: 'Mamadou Sarr', fromTeam: 'Strasbourg', toTeam: 'Chelsea', amount: 'Internal', date: 'Jul 2025', type: 'Incoming', status: 'Confirmed' },

    // --- SUMMER 2025 OUTGOING (THE CLEAROUT) ---
    { id: '19', player: 'João Félix', fromTeam: 'Chelsea', toTeam: 'Al-Nassr', amount: '£43.7m', date: 'Aug 2025', type: 'Outgoing', status: 'Confirmed' },
    { id: '20', player: 'Noni Madueke', fromTeam: 'Chelsea', toTeam: 'Arsenal', amount: '£48.5m', date: 'Aug 2025', type: 'Outgoing', status: 'Confirmed' },
    { id: '21', player: 'Djordje Petrovic', fromTeam: 'Chelsea', toTeam: 'Bournemouth', amount: '£25m', date: 'Jul 2025', type: 'Outgoing', status: 'Confirmed' },
];

export default function Transfers() {
  const [filter, setFilter] = useState('All');

  const filteredTransfers = TRANSFERS.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'Incoming') return t.type === 'Incoming' || t.type === 'Future';
    if (filter === 'Outgoing') return t.type === 'Outgoing';
    if (filter === 'Rumour') return t.type === 'Rumour';
    return true;
  });

  const getIcon = (type: string) => {
    if (type === 'Future') return <Clock className="h-5 w-5 text-purple-500" />;
    if (type === 'Incoming') return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
    if (type === 'Outgoing') return <ArrowUpRight className="h-5 w-5 text-red-500" />;
    return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Advanced')) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    if (status.includes('Pre-Contract')) return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
    if (status.includes('Frozen')) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
    if (status === 'Confirmed' || status === 'Permanent') return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
                <span className="h-8 w-1 bg-blue-600 rounded-full"></span>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Transfer Centre</h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">2025/26 Season • Post-January Update</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">Manager: Liam Rosenior</p>
                </div>
                
                {/* TABS */}
                <div className="flex p-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    {['All', 'Incoming', 'Outgoing', 'Rumour'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                filter === tab 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
            {filteredTransfers.map((item) => (
                <div key={item.id} className="group relative bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-500/50 transition-all duration-300">
                    
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* ICON */}
                        <div className={`p-4 rounded-2xl shadow-inner ${
                            item.type === 'Future' ? 'bg-purple-100 dark:bg-purple-900/20' :
                            item.type === 'Incoming' ? 'bg-green-100 dark:bg-green-900/20' : 
                            item.type === 'Outgoing' ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                        }`}>
                            {getIcon(item.type)}
                        </div>

                        {/* INFO */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                                    {item.player}
                                </h3>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-gray-900 dark:text-white">{item.fromTeam}</span>
                                <ArrowRightLeft className="h-3 w-3 text-gray-300" />
                                <span className="font-medium text-gray-900 dark:text-white">{item.toTeam}</span>
                            </div>
                        </div>

                        {/* PRICE & DATE */}
                        <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end border-t md:border-t-0 border-gray-100 dark:border-gray-700 pt-4 md:pt-0 mt-4 md:mt-0">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono tracking-tight">{item.amount}</p>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.date}</p>
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