
import React from 'react';
import { TRANSFERS } from '../constants';
import { ArrowRight, ArrowLeft, RefreshCw, HelpCircle, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const TransferRow: React.FC<{ item: typeof TRANSFERS[0] }> = ({ item }) => {
  const isRumour = item.type === 'Rumour';
  const isIn = item.type === 'In';
  const isOut = item.type === 'Out';

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`
          flex items-center justify-center w-10 h-10 rounded-full font-bold shrink-0
          ${isIn ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
          ${isOut ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : ''}
          ${isRumour ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : ''}
        `}>
          {isIn && <ArrowRight className="rotate-45" size={20} />}
          {isOut && <ArrowLeft className="rotate-45" size={20} />}
          {isRumour && <HelpCircle size={20} />}
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{item.player}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 flex-wrap">
            {isIn && `From: ${item.fromClub}`}
            {isOut && `To: ${item.toClub}`}
            {isRumour && (
                <span>Source: <span className="font-semibold text-chelsea-blue dark:text-blue-400">{item.source}</span></span>
            )}
            <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
            <span>{item.date}</span>
          </p>
        </div>
      </div>

      <div className="text-right shrink-0">
        {isRumour ? (
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold uppercase text-gray-400 mb-1">Reliability</span>
            <div className="w-16 sm:w-20 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
               <div 
                 className={`h-full ${item.confidence! > 70 ? 'bg-green-500' : item.confidence! > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                 style={{ width: `${item.confidence}%` }} 
               />
            </div>
          </div>
        ) : (
          <div className="text-sm font-bold text-gray-900 dark:text-white">
             {item.fee || 'Undisclosed'}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Transfers() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-chelsea-dark dark:text-white flex items-center justify-center gap-3">
          <RefreshCw className="text-chelsea-blue" />
          Transfer Hub
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Rumours, confirmed deals, and financial overview.</p>
      </div>

      {/* Financial Overview (Transfermarkt Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
             <div className="flex items-center justify-center gap-2 text-red-500 mb-2">
                <TrendingDown size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Expenditure</span>
             </div>
             <div className="text-2xl font-black text-gray-900 dark:text-white">€467.80m</div>
             <div className="text-xs text-gray-400 mt-1">Season 23/24</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
             <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
                <TrendingUp size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Income</span>
             </div>
             <div className="text-2xl font-black text-gray-900 dark:text-white">€269.50m</div>
             <div className="text-xs text-gray-400 mt-1">Season 23/24</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center relative overflow-hidden">
             <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                <DollarSign size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Balance</span>
             </div>
             <div className="text-2xl font-black text-red-500">-€198.30m</div>
             <div className="text-xs text-gray-400 mt-1">Net Spend</div>
          </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Confirmed Section */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 mb-4">
             <div className="h-6 w-1 bg-chelsea-blue rounded-full"></div>
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Confirmed Deals</h2>
           </div>
           <div className="space-y-3">
             {TRANSFERS.filter(t => t.type !== 'Rumour').map(t => (
               <TransferRow key={t.id} item={t} />
             ))}
             {TRANSFERS.filter(t => t.type !== 'Rumour').length === 0 && (
               <p className="text-gray-400 text-sm italic">No recent activity.</p>
             )}
           </div>
        </section>

        {/* Rumour Mill */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 mb-4">
             <div className="h-6 w-1 bg-chelsea-gold rounded-full"></div>
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rumour Mill</h2>
           </div>
           <div className="space-y-3">
             {TRANSFERS.filter(t => t.type === 'Rumour').map(t => (
               <TransferRow key={t.id} item={t} />
             ))}
           </div>
        </section>
      </div>
    </div>
  );
}
