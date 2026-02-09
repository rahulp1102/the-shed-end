import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertTriangle, TrendingUp, Activity, Loader2, Timer, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PLAYERS } from '../constants'; // Uses your 2026 Squad
import { fetchMatches, fetchNews } from '../services/api'; // Uses your Smart API
import { Match, NewsItem } from '../types';

// --- SUB-COMPONENTS ---

const StatCard: React.FC<{ title: string, value: string, subtext: string, trend?: 'up' | 'down' | 'neutral' }> = ({ title, value, subtext, trend }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</h3>
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-3xl font-bold text-blue-600 dark:text-white">{value}</span>
    </div>
    <div className="mt-2 flex items-center gap-2">
      {trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
      {trend === 'down' && <TrendingUp size={16} className="text-red-500 rotate-180" />}
      <span className="text-sm text-gray-400 dark:text-gray-500">{subtext}</span>
    </div>
  </div>
);

const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => (
  <a href={news.url} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 block h-full flex flex-col">
    <div className="aspect-video w-full overflow-hidden relative">
      <img 
        src={news.image} 
        alt={news.title} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
        {news.timestamp}
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-bold text-blue-600 dark:text-blue-300 uppercase tracking-wider">
          {news.category || 'News'}
        </span>
      </div>
      <h3 className="mb-3 text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
        {news.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
        {news.summary}
      </p>
      <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
        Read Article <ArrowRight size={12} />
      </div>
    </div>
  </a>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, mins: number} | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };
    calculateTimeLeft();
  }, [targetDate]);

  if (!timeLeft) return <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-bold"><Calendar size={18} /> Match Day!</div>;

  return (
    <div className="flex gap-4 mt-6 text-center">
      {['Days', 'Hours', 'Mins'].map((label, i) => (
        <div key={label}>
          <div className="text-3xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[60px]">
            {Object.values(timeLeft)[i]}
          </div>
          <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
};

// --- MAIN DASHBOARD ---

export default function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const matchData = await fetchMatches();
      const newsData = await fetchNews();
      setMatches(matchData);
      setNews(newsData);
      setLoading(false);
    };
    loadData();
  }, []);

  const nextMatch = matches.find(m => m.status === 'Upcoming');
  const lastMatch = [...matches].reverse().find(m => m.status === 'Finished');
  
  // Logic: Get injured players from our Constants file
  const injuredPlayers = PLAYERS.filter(p => p.status.includes('Injured'));

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin mt-10" />
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12 pt-20 px-4 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="grid gap-6 lg:grid-cols-3">
        
        {/* NEXT MATCH CARD */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-blue-700 text-white shadow-xl min-h-[350px] group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-90"></div>
          
          <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 shadow-lg">
                  <Timer size={12} /> Next Match
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="text-5xl font-bold">Chelsea</div>
                  <div className="text-xl font-light text-blue-300">vs</div>
                  <div className="text-5xl font-bold opacity-90">{nextMatch?.opponent || 'TBD'}</div>
                </div>
                
                <p className="mt-4 text-lg text-blue-100 flex items-center gap-4">
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">{nextMatch?.competition}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} /> 
                    {nextMatch?.date ? new Date(nextMatch.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }) : 'TBD'}
                  </span>
                </p>
                
                {nextMatch?.date && <Countdown targetDate={nextMatch.date} />}
              </div>

              <div className="mt-8 flex gap-4">
                <Link to="/fixtures" className="rounded-xl bg-white px-6 py-3 font-bold text-blue-700 hover:bg-yellow-400 hover:text-blue-900 transition-colors shadow-lg">
                  Match Centre
                </Link>
              </div>
            </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          
          {/* LAST RESULT */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <Activity size={18} className="text-blue-600" /> Last Result
               </h3>
               <Link to="/fixtures" className="text-xs font-bold text-blue-600 hover:underline">View</Link>
             </div>
             {lastMatch ? (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                    <div className="text-center">
                        <span className="block font-bold dark:text-white text-lg">Chelsea</span>
                        <span className="text-xs text-gray-500">Home</span>
                    </div>
                    <div className="bg-gray-900 text-white px-3 py-1 rounded-lg font-mono font-bold text-xl">
                        {lastMatch.score.chelsea} - {lastMatch.score.opponent}
                    </div>
                    <div className="text-center">
                        <span className="block font-bold dark:text-white text-lg">{lastMatch.opponent}</span>
                        <span className="text-xs text-gray-500">Away</span>
                    </div>
                </div>
             ) : (
                <p className="text-gray-500 text-sm">No recent matches.</p>
             )}
          </div>

          {/* INJURY LIST */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4 text-red-500">
               <AlertTriangle size={18} />
               <h3 className="font-bold text-gray-900 dark:text-white">Injury List</h3>
            </div>
            <div className="space-y-3">
              {injuredPlayers.length > 0 ? injuredPlayers.slice(0, 3).map(player => (
                <div key={player.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                        {player.number}
                    </div>
                    <div>
                      <span className="font-bold text-sm dark:text-white block">{player.name}</span>
                      <span className="text-xs text-red-500">{player.status}</span>
                    </div>
                </div>
              )) : (
                <p className="text-green-500 text-sm">Full squad available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="League Position" value="2nd" subtext="Chasing Liverpool" trend="up" />
        <StatCard title="Top Scorer" value="18" subtext="Cole Palmer" trend="up" />
        <StatCard title="Next Fixture" value="Man City" subtext="Title Decider" trend="neutral" />
        <StatCard title="Clean Sheets" value="12" subtext="Robert Sanchez" trend="up" />
      </section>

      {/* LATEST NEWS */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Updates</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map(item => <NewsCard key={item.id} news={item} />)}
        </div>
      </section>
    </div>
  );
}