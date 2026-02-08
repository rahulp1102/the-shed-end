import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ACADEMY_PLAYERS } from './constants';
import { ArrowLeft, Award, TrendingUp, Calendar, Zap, Target } from 'lucide-react';
import { PlayerAvatar } from './PlayerAvatar';

export default function AcademyPlayerProfile() {
  const { playerId } = useParams();
  const player = ACADEMY_PLAYERS.find(p => p.id === playerId);

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-900">Academy Player not found</h2>
        <Link to="/academy" className="mt-4 text-chelsea-blue hover:underline">Back to Academy</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
      <Link to="/academy" className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-chelsea-blue transition-colors w-fit"><ArrowLeft size={16} /> Back to Academy</Link>
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-chelsea-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-white shadow-lg overflow-hidden"><PlayerAvatar src={player.image} alt={player.name} size={256} className="w-full h-full object-cover" /></div>
          <div className="flex-1 text-center md:text-left space-y-3">
             <div className="flex flex-col md:flex-row items-center gap-3"><h1 className="text-3xl md:text-4xl font-bold text-chelsea-dark">{player.name}</h1><span className="px-3 py-1 bg-chelsea-blue/10 text-chelsea-blue text-xs font-bold uppercase tracking-wider rounded-full">U21 Squad</span></div>
             <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600 text-sm font-medium"><span>{player.age} Years Old</span><span>•</span><span>{player.position}</span></div>
             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-bold border border-yellow-100"><Zap size={14} className="fill-current" />{player.highlight}</div>
             <p className="text-gray-600 max-w-2xl leading-relaxed">{player.bio}</p>
          </div>
          <div className="flex flex-col gap-4 min-w-[140px]"><div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100"><span className="block text-3xl font-bold text-chelsea-blue">{player.stats.goals}</span><span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Season Goals</span></div><div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100"><span className="block text-3xl font-bold text-chelsea-dark">{player.stats.rating}</span><span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Avg Rating</span></div></div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Target size={18} className="text-chelsea-blue" /> Season Stats</h3><div className="space-y-4"><div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="text-gray-500 text-sm">Appearances</span><span className="font-bold text-gray-900">{player.stats.games}</span></div><div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="text-gray-500 text-sm">Goals</span><span className="font-bold text-gray-900">{player.stats.goals}</span></div><div className="flex justify-between items-center pb-3 border-b border-gray-50"><span className="text-gray-500 text-sm">Assists</span><span className="font-bold text-gray-900">{player.stats.assists}</span></div><div className="flex justify-between items-center"><span className="text-gray-500 text-sm">Avg Rating</span><span className="font-bold text-chelsea-gold">{player.stats.rating}</span></div></div></div>
           <div className="bg-gradient-to-br from-chelsea-blue to-chelsea-dark rounded-2xl p-6 text-white shadow-lg"><h3 className="font-bold text-chelsea-gold mb-2 flex items-center gap-2"><Award size={18} /> Scout Report</h3><p className="text-sm text-blue-100 leading-relaxed opacity-90">One of the brightest prospects at Cobham. Shows exceptional technical ability and tactical maturity beyond his years. Expected to push for first-team minutes in cup competitions.</p></div>
        </div>
        <div className="md:col-span-2">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-50"><h3 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={18} className="text-chelsea-blue" /> Recent Performances</h3></div>
             <div className="divide-y divide-gray-50">{player.recentMatches?.map((match, idx) => (<div key={idx} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"><div className="flex flex-col gap-1"><span className="font-bold text-gray-900">{match.opponent}</span><div className="flex items-center gap-2 text-xs text-gray-500"><Calendar size={12} /> {match.date}</div></div><div className="flex items-center gap-6">{match.keyStats && (<div className="hidden sm:block text-xs font-semibold text-chelsea-blue bg-blue-50 px-2 py-1 rounded">{match.keyStats}</div>)}<div className="text-right"><span className="block font-bold text-gray-900">{match.result}</span><span className={`text-xs font-bold ${match.rating >= 8.0 ? 'text-green-600' : match.rating >= 7.0 ? 'text-blue-600' : 'text-gray-500'}`}>{match.rating} Rating</span></div></div></div>))}</div>
           </div>
        </div>
      </div>
    </div>
  );
}