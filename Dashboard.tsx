import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertTriangle, TrendingUp, Activity, Loader2, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NEWS, PLAYERS } from './constants';
import { MatchCard } from './MatchCard';
import { fetchMatches } from './api';
import { Match } from './types';
import { PlayerAvatar } from './PlayerAvatar';

const StatCard: React.FC<{ title: string, value: string, subtext: string, trend?: 'up' | 'down' | 'neutral' }> = ({ title, value, subtext, trend }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">{title}</h3>
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-3xl font-bold text-chelsea-blue dark:text-white">{value}</span>
    </div>
    <div className="mt-2 flex items-center gap-2">
      {trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
      <span className="text-sm text-gray-400 dark:text-gray-500">{subtext}</span>
    </div>
  </div>
);

const NewsCard: React.FC<{ news: typeof NEWS[0] }> = ({ news }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
    <div className="aspect-video w-full overflow-hidden">
      <img src={news.image} alt={news.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
    <div className="p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-chelsea-blue/10 dark:bg-chelsea-blue/20 px-2 py-0.5 text-xs font-semibold text-chelsea-blue dark:text-blue-300">
          {news.category}
        </span>
        <span className="text-xs text-gray-400">{news.timestamp}</span>
      </div>
      <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-chelsea-blue dark:group-hover:text-chelsea-gold transition-colors">
        {news.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{news.summary}</p>
    </div>
  </div>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, mins: number, secs: number} | null>(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-4 mt-6 text-center">
      <div>
        <div className="text-2xl md:text-3xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[60px]">{timeLeft.days}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Days</div>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[60px]">{timeLeft.hours}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Hours</div>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold text-white bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[60px]">{timeLeft.mins}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Mins</div>
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold text-chelsea-gold bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[60px]">{timeLeft.secs}</div>
        <div className="text-[10px] uppercase font-bold text-blue-200 mt-1">Secs</div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMatches();
        setMatches(data);
      } catch (e) {
        console.error("Failed to fetch matches", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const nextMatch = matches.find(m => m.status === 'Upcoming');
  const lastMatch = matches.find(m => m.status === 'Finished');
  const injuredPlayers = PLAYERS.filter(p => p.status === 'Injured');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Next Match Hero */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-chelsea-blue text-white shadow-xl min-h-[350px]">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/id/190/1000/600')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          
          {loading ? (
             <div className="relative z-10 flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-chelsea-gold" size={48} />
             </div>
          ) : (
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 rounded-full bg-chelsea-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-chelsea-blue shadow-lg">
                  <Timer size={12} /> Next Match
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold md:text-5xl">Chelsea</div>
                  <div className="text-xl font-light text-chelsea-gold">vs</div>
                  <div className="text-4xl font-bold md:text-5xl opacity-90">{nextMatch?.opponent || 'TBD'}</div>
                </div>
                <p className="mt-2 text-lg text-blue-100 flex items-center gap-2">
                  <span className="opacity-75">{nextMatch?.competition || 'Upcoming Fixture'}</span> • 
                  <span className="font-semibold text-white">
                    {nextMatch?.date ? new Date(nextMatch.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }) : 'Date TBD'}
                  </span>
                </p>
                
                {nextMatch?.date && <Countdown targetDate={nextMatch.date} />}
              </div>

              <div className="mt-8 flex gap-4">
                <Link to="/matches" className="rounded-xl bg-white px-6 py-3 font-bold text-chelsea-blue transition-colors hover:bg-chelsea-gold hover:text-white shadow-lg text-center">
                  Match Centre
                </Link>
                <button className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                  Buy Tickets
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats / Last Result */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-900 dark:text-white">Last Result</h3>
               <Link to="/matches" className="text-xs font-semibold text-chelsea-blue dark:text-blue-400 hover:underline">View All</Link>
             </div>
             {loading ? (
                <div className="h-24 flex items-center justify-center text-gray-400">Loading...</div>
             ) : lastMatch ? (
                <MatchCard match={lastMatch} compact />
             ) : (
                <div className="text-sm text-gray-500 italic py-4 text-center">No recent results</div>
             )}
          </div>

          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500">
                 <Activity size={20} />
               </div>
               <h3 className="font-bold text-gray-900 dark:text-white">Injury List</h3>
            </div>
            <div className="space-y-3">
              {injuredPlayers.slice(0, 3).map(player => (
                <div key={player.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700">
                       <PlayerAvatar src={player.image} alt={player.name} size={64} className="w-full h-full" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{player.name}</span>
                  </div>
                  <span className="text-xs text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                    {player.injuryDetails?.expectedReturn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="League Position" value="10th" subtext="Last 5: W D L W D" trend="neutral" />
        <StatCard title="Top Scorer" value="Cole Palmer" subtext="12 Goals" trend="up" />
        <StatCard title="Avg Possession" value="62%" subtext="3rd in League" trend="up" />
        <StatCard title="Clean Sheets" value="6" subtext="Last: vs Aston Villa" trend="down" />
      </section>

      {/* Latest News */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-chelsea-dark dark:text-white">Latest Updates</h2>
          <Link to="/news" className="flex items-center gap-1 text-sm font-medium text-chelsea-blue dark:text-blue-400 hover:text-chelsea-gold transition-colors">
            View All News <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>
    </div>
  );
}