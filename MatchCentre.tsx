import React, { useState, useEffect, useRef } from 'react';
import { MatchCard } from './MatchCard';
import { Filter, Loader2, Radio, Zap } from 'lucide-react';
import { fetchMatches } from './api';
import { Match, MatchEvent } from './types';

export default function MatchCentre() {
  const [activeTab, setActiveTab] = useState<'fixtures' | 'results' | 'live'>('live');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestEvent, setLatestEvent] = useState<MatchEvent | null>(null);

  // Load Initial Data
  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      try {
        const data = await fetchMatches();
        setMatches(data);
        
        // Auto-switch tab if there is a live match
        if (data.some(m => m.status === 'Live')) {
          setActiveTab('live');
        } else {
          setActiveTab('fixtures');
        }
      } catch (error) {
        console.error("Failed to load matches", error);
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, []);

  // Simulation Engine for "Live" Matches
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prevMatches => {
        return prevMatches.map(match => {
          if (match.status !== 'Live') return match;

          // Determine current minute (mocking time passing)
          const lastEventMinute = match.events && match.events.length > 0 
            ? Math.max(...match.events.map(e => e.minute)) 
            : 0;
          
          const currentMinute = Math.min(90, Math.max(45, lastEventMinute + 1)); // Start simulation mid-game

          // 10% chance of an event happening per tick
          const eventChance = Math.random();
          let newEvent: MatchEvent | null = null;
          let newScore = { ...match.score! };

          if (eventChance > 0.85 && currentMinute < 90) {
             const eventTypeRand = Math.random();
             
             if (eventTypeRand > 0.6) {
               // GOAL
               const isChelsea = Math.random() > 0.5;
               const player = isChelsea ? (Math.random() > 0.5 ? 'Jackson' : 'Palmer') : 'Opponent Fwd';
               newEvent = { minute: currentMinute, type: 'Goal', player, isChelsea };
               if (isChelsea) newScore.chelsea += 1;
               else newScore.opponent += 1;
             } else if (eventTypeRand > 0.3) {
               // CARD
               const isChelsea = Math.random() > 0.5;
               newEvent = { minute: currentMinute, type: 'Card', player: isChelsea ? 'Cucurella' : 'Opponent Mid', detail: 'Yellow Card', isChelsea };
             } else {
               // SUB
               const isChelsea = Math.random() > 0.5;
               newEvent = { minute: currentMinute, type: 'Sub', player: isChelsea ? 'Mudryk' : 'Opponent Sub', isChelsea };
             }
          }

          if (newEvent) {
            setLatestEvent(newEvent);
            // Clear notification after 5 seconds
            setTimeout(() => setLatestEvent(null), 5000);
            
            return {
              ...match,
              score: newScore,
              events: [...(match.events || []), newEvent]
            };
          }

          return match;
        });
      });
    }, 3000); // Tick every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter Logic
  const filteredMatches = matches.filter(match => {
    if (activeTab === 'live') return match.status === 'Live';
    if (activeTab === 'fixtures') return match.status === 'Upcoming';
    return match.status === 'Finished';
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Reverse sort for results to show latest first
  const displayMatches = activeTab === 'results' ? filteredMatches.reverse() : filteredMatches;
  const hasLiveMatch = matches.some(m => m.status === 'Live');

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Live Event Ticker */}
      {latestEvent && (
        <div className="fixed top-20 right-4 z-50 animate-bounce md:top-24 md:right-8">
           <div className={`px-4 py-3 rounded-lg shadow-lg border-l-4 flex items-center gap-3 ${latestEvent.isChelsea ? 'bg-white border-chelsea-blue text-chelsea-dark' : 'bg-gray-800 border-red-500 text-white'}`}>
              <div className={`p-2 rounded-full ${latestEvent.type === 'Goal' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                {latestEvent.type === 'Goal' ? <Zap size={16} /> : <Radio size={16} />}
              </div>
              <div>
                <p className="font-bold text-sm uppercase">{latestEvent.type}! <span className="text-xs opacity-70">({latestEvent.minute}')</span></p>
                <p className="text-sm">{latestEvent.player}</p>
              </div>
           </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-chelsea-dark dark:text-white">Match Centre</h1>
          <p className="text-gray-500 dark:text-gray-400">Track every kick, every goal, every game.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          {hasLiveMatch && (
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'live' 
                ? 'bg-red-500 text-white shadow-md animate-pulse' 
                : 'text-red-500 hover:bg-red-50'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE
            </button>
          )}
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'fixtures' ? 'bg-chelsea-blue text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Fixtures
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'results' ? 'bg-chelsea-blue text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Results
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-chelsea-blue" size={32} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayMatches.length > 0 ? (
            displayMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              <p>No {activeTab} matches found at the moment.</p>
            </div>
          )}
        </div>
      )}

      {/* Advanced Stats Section (Placeholder for "Premium" feel) */}
      <div className="mt-12 rounded-2xl bg-gradient-to-br from-chelsea-dark to-chelsea-blue p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold">Season Statistics</h2>
           <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm backdrop-blur-md hover:bg-white/20 transition-colors">
              <Filter size={16} /> Filter Comp
           </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <p className="text-chelsea-gold text-sm font-bold uppercase tracking-widest mb-1">Goals Scored</p>
            <p className="text-4xl font-bold">41</p>
            <p className="text-xs text-blue-200 mt-1">1.6 per game</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-chelsea-gold text-sm font-bold uppercase tracking-widest mb-1">Possession</p>
            <p className="text-4xl font-bold">61.5%</p>
            <p className="text-xs text-blue-200 mt-1">Avg per game</p>
          </div>
          <div className="text-center md:text-left">
             <p className="text-chelsea-gold text-sm font-bold uppercase tracking-widest mb-1">Big Chances</p>
             <p className="text-4xl font-bold">52</p>
             <p className="text-xs text-blue-200 mt-1">Created</p>
          </div>
          <div className="text-center md:text-left">
             <p className="text-chelsea-gold text-sm font-bold uppercase tracking-widest mb-1">Pass Accuracy</p>
             <p className="text-4xl font-bold">88.2%</p>
             <p className="text-xs text-blue-200 mt-1">League Avg: 82%</p>
          </div>
        </div>
      </div>
    </div>
  );
}