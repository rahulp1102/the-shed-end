import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertTriangle, TrendingUp, Activity, Loader2, Timer, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PLAYERS } from './constants'; // Keep PLAYERS for mock injury data if not fetching squad yet
import { MatchCard } from './MatchCard';
import { fetchMatches, fetchNews } from './api'; // Import both fetchers
import { Match, NewsItem } from './types';
import { PlayerAvatar } from './PlayerAvatar';

// --- Sub-components ---

const StatCard: React.FC<{ title: string, value: string, subtext: string, trend?: 'up' | 'down' | 'neutral' }> = ({ title, value, subtext, trend }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</h3>
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-3xl font-bold text-chelsea-blue dark:text-white">{value}</span>
    </div>
    <div className="mt-2 flex items-center gap-2">
      {trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
      {trend === 'down' && <TrendingUp size={16} className="text-red-500 rotate-180" />}
      <span className="text-sm text-gray-400 dark:text-gray-500">{subtext}</span>
    </div>
  </div>
);

const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => (
  <a href={news.url} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 block h-full flex flex-col">
    <div className="aspect-video w-full overflow-hidden relative">
      <img 
        src={news.image || "https://via.placeholder.com/800x400?text=Chelsea+FC"} 
        alt={news.title} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
        {news.timestamp}
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-chelsea-blue/10 dark:bg-chelsea-blue/20 px-2 py-1 text-xs font-bold text-chelsea-blue dark:text-blue-300 uppercase tracking-wider">
          {news.category || 'News'}
        </span>
      </div>
      <h3 className="mb-3 text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-chelsea-blue dark:group-hover:text-chelsea-gold transition-colors line-clamp-2">
        {news.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
        {news.summary}
      </p>
      <div className="text-xs font-bold text-chelsea-blue dark:text-chelsea-gold flex items-center gap-1 group-hover:gap-2 transition-all">
        Read Article <ArrowRight size={12} />
      </div>
    </div>
  </a>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, mins: number, secs: number} | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return (
    <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-bold">
      <Calendar size={18} /> Match Day!
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 mt-6 text-center">
      <div>
        <div className="text-xl md:text-3xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] md:min-w-[60px]">{timeLeft.days}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Days</div>
      </div>
      <div>
        <div className="text-xl md:text-3xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] md:min-w-[60px]">{timeLeft.hours}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Hours</div>
      </div>
      <div>
        <div className="text-xl md:text-3xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] md:min-w-[60px]">{timeLeft.mins}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Mins</div>
      </div>
      <div>
        <div className="text-xl md:text-3xl font-bold text-chelsea-gold bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[50px] md:min-w-[60px]">{timeLeft.secs}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Secs</div>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]); // Added state for news
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch Matches
        const matchData = await fetchMatches();
        setMatches(matchData);
        
        // Fetch News
        const newsData = await fetchNews();
        setNews(newsData);
      } catch (e) {
        console.error("Failed to fetch dashboard data", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter Data
  const nextMatch = matches
    .filter(m => m.status === 'Upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
    
  const lastMatch = matches.find(m => m.status === 'Finished' || m.status === 'Live');
  
  // Note: Using static PLAYERS for injuries until we have a real Squad API
  const injuredPlayers = PLAYERS.filter(p => p.status === 'Injured');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="grid gap-6 lg:grid-cols-3">
        
        {/* Next Match Hero Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-chelsea-blue text-white shadow-xl min-h-[350px] group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-chelsea-blue via-chelsea-blue/80 to-transparent"></div>
          
          {loading ? (
             <div className="relative z-10 flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-chelsea-gold" size={48} />
             </div>
          ) : (
            <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 rounded-full bg-chelsea-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-chelsea-blue shadow-lg">
                  <Timer size={12} /> Next Match
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <div className="text-4xl font-bold md:text-5xl">Chelsea</div>
                  <div className="hidden md:block text-xl font-light text-chelsea-gold">vs</div>
                  <div className="md:hidden text-sm font-bold text-chelsea-gold uppercase tracking-widest my-1">Versus</div>
                  <div className="text-4xl font-bold md:text-5xl opacity-90">{nextMatch?.opponent || 'TBD'}</div>
                </div>
                
                <p className="mt-4 text-lg text-blue-100 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="opacity-75 bg-white/10 px-2 py-1 rounded">{nextMatch?.competition || 'Fixture List'}</span>
                  {nextMatch?.venue && <span className="text-sm opacity-75">{nextMatch.venue === 'Home' ? 'Stamford Bridge' : 'Away'}</span>}
                  <span className="font-semibold text-white flex items-center gap-2">
                    <Calendar size={16} className="text-chelsea-gold" />
                    {nextMatch?.date ? new Date(nextMatch.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Date TBD'}
                  </span>
                </p>
                
                {nextMatch?.date && <Countdown targetDate={nextMatch.date} />}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/matches" className="rounded-xl bg-white px-6 py-3 font-bold text-chelsea-blue transition-all hover:bg-chelsea-gold hover:text-white shadow-lg text-center hover:shadow-xl transform hover:-translate-y-0.5">
                  Match Centre
                </Link>
                <button className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                  Buy Tickets
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Last Result & Injuries */}
        <div className="space-y-6">
          {/* Last Result Card */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors h-fit">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <Activity size={18} className="text-chelsea-blue dark:text-chelsea-gold" /> Last Result
               </h3>
               <Link to="/matches" className="text-xs font-semibold text-chelsea-blue dark:text-blue-400 hover:underline">View All</Link>
             </div>
             {loading ? (
                <div className="h-24 flex items-center justify-center text-gray-400">
                  <Loader2 className="animate-spin mr-2" size={16} /> Loading...
                </div>
             ) : lastMatch ? (
                <MatchCard match={lastMatch} compact />
             ) : (
                <div className="text-sm text-gray-500 italic py-8 text-center bg-gray-50 dark:bg-gray-900 rounded-xl">
                  No recent matches found
                </div>
             )}
          </div>

          {/* Injury List Card */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
                 <AlertTriangle size={20} />
               </div>
               <h3 className="font-bold text-gray-900 dark:text-white">Injury List</h3>
            </div>
            <div className="space-y-4">
              {injuredPlayers.slice(0, 3).map(player => (
                <div key={player.id} className="flex items-center justify-between text-sm group cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                       <PlayerAvatar src={player.image} alt={player.name} size={64} className="w-full h-full" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 dark:text-gray-200 block">{player.name}</span>
                      <span className="text-xs text-gray-400">{player.position}</span>
                    </div>
                  </div>
                  <span className="text-xs text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md whitespace-nowrap">
                    {player.injuryDetails?.expectedReturn || 'Unknown'}
                  </span>
                </div>
              ))}
              {injuredPlayers.length === 0 && (
                <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">Full squad available!</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="League Position" value="3rd" subtext="Last 5: W W D W L" trend="up" />
        <StatCard title="Top Scorer" value="Cole Palmer" subtext="16 Goals" trend="up" />
        <StatCard title="Avg Possession" value="61.2%" subtext="2nd in League" trend="up" />
        <StatCard title="Clean Sheets" value="8" subtext="Last: vs West Ham" trend="neutral" />
      </section>

      {/* Latest News Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-chelsea-dark dark:text-white flex items-center gap-2">
            Latest Updates
            {loading && <Loader2 size={20} className="animate-spin text-chelsea-blue" />}
          </h2>
          <Link to="/news" className="flex items-center gap-1 text-sm font-medium text-chelsea-blue dark:text-blue-400 hover:text-chelsea-gold transition-colors">
            View All News <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
             // Skeleton Loading State
             Array(3).fill(0).map((_, i) => (
               <div key={i} className="rounded-2xl bg-white dark:bg-gray-800 p-4 h-80 animate-pulse border border-gray-100">
                 <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                 <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                 <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                 <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
               </div>
             ))
          ) : news.length > 0 ? (
            news.slice(0, 3).map(item => (
              <NewsCard key={item.id} news={item} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 border-dashed">
              <p className="text-gray-500">No news articles found at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}