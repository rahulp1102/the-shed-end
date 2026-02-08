import React from 'react';
import { Star, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ACADEMY_PLAYERS } from './constants';
import { AcademyPlayer } from './types';
import { PlayerAvatar } from './PlayerAvatar';

const AcademyPlayerCard: React.FC<{ player: AcademyPlayer }> = ({ player }) => (
  <Link 
    to={`/academy/${player.id}`} 
    className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-chelsea-gold/50 hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full border border-gray-100 overflow-hidden">
        <PlayerAvatar 
          src={player.image} 
          alt={player.name} 
          size={64} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 group-hover:text-chelsea-blue transition-colors">{player.name}</h4>
        <p className="text-xs text-gray-500">{player.age} years old • {player.position}</p>
      </div>
    </div>
    <div className="flex flex-col items-end gap-1">
       <span className="inline-block px-2 py-1 bg-yellow-50 text-yellow-700 text-[10px] font-bold uppercase rounded-md border border-yellow-100">
         {player.highlight}
       </span>
       <span className="text-xs text-chelsea-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex items-center gap-1 font-medium">
         View Profile <ArrowRight size={10} />
       </span>
    </div>
  </Link>
);

export default function Academy() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative rounded-2xl bg-chelsea-dark overflow-hidden p-8 text-white shadow-lg">
        <div className="absolute top-0 right-0 p-32 bg-chelsea-blue blur-[100px] opacity-40 rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Cobham Academy</h1>
          <p className="text-blue-200 max-w-lg">Tracking the next generation of Blues. Updates on U21, U18, and Development squads.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ones to Watch */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
             <Star className="text-chelsea-gold" />
             <h2 className="text-xl font-bold text-gray-900">Ones to Watch</h2>
          </div>
          <div className="space-y-4">
             {ACADEMY_PLAYERS.map(player => (
               <AcademyPlayerCard key={player.id} player={player} />
             ))}
          </div>
        </section>

        {/* Recent Results */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
          <div className="flex items-center gap-2 mb-6">
             <TrendingUp className="text-chelsea-blue" />
             <h2 className="text-xl font-bold text-gray-900">Recent U21 Results</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
               <span className="font-semibold text-gray-700">Chelsea U21</span>
               <span className="font-bold bg-green-50 text-green-700 px-2 py-1 rounded text-sm border border-green-100">3 - 2</span>
               <span className="font-semibold text-gray-700 text-right">Man City U21</span>
            </div>
             <div className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
               <span className="font-semibold text-gray-700">Chelsea U21</span>
               <span className="font-bold bg-gray-50 text-gray-600 px-2 py-1 rounded text-sm border border-gray-200">1 - 1</span>
               <span className="font-semibold text-gray-700 text-right">PSV U21</span>
            </div>
             <div className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
               <span className="font-semibold text-gray-700">Leeds U21</span>
               <span className="font-bold bg-green-50 text-green-700 px-2 py-1 rounded text-sm border border-green-100">0 - 2</span>
               <span className="font-semibold text-gray-700 text-right">Chelsea U21</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}