import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, AlertTriangle, TrendingUp, Activity, Loader2, Timer, Calendar, 
  GraduationCap, Plane, Megaphone, BarChart2, ClipboardList, Trophy 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PLAYERS } from '../constants'; 
import { fetchMatches, fetchNews } from '../services/api'; 
import { Match, NewsItem } from '../types';

// --- SUB-COMPONENTS ---

const QuickLinkCard = ({ title, icon: Icon, color, to, desc }: { title: string, icon: any, color: string, to: string, desc: string }) => (
  <Link to={to} className="group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={64} />
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-10 text-opacity-100`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
  </Link>
);

const StatCard: React.FC<{ title: string, value: string, subtext: string, trend?: 'up' | 'down' | 'neutral' }> = ({ title, value, subtext, trend }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
    <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</h3>
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-3xl font-black text-gray-900 dark:text-white">{value}</span>
    </div>
    <div className="mt-2 flex items-center gap-2">
      {trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
      {trend === 'down' && <TrendingUp size={16} className="text-red-500 rotate-180" />}
      <span className="text-xs font-medium text-gray-500">{subtext}</span>
    </div>
  </div>
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

        {/* SIDEBAR: Last Result & Injury */}
        <div className="space-y-6">
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
        <StatCard title="League Pos" value="2nd" subtext="Chasing Liverpool" trend="up" />
        <StatCard title="Top Scorer" value="18" subtext="Cole Palmer" trend="up" />
        <StatCard title="Avg Poss" value="62%" subtext="Rank 2nd in PL" trend="up" />
        <StatCard title="Clean Sheets" value="12" subtext="Robert Sanchez" trend="up" />
      </section>

      {/* --- EXPLORE THE HUB (NEW SECTION) --- */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explore The Hub</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
           <QuickLinkCard 
             title="Academy" 
             to="/academy" 
             icon={GraduationCap} 
             color="bg-blue-500" 
             desc="Future Stars"
           />
           <QuickLinkCard 
             title="Loan Watch" 
             to="/loan-watch" 
             icon={Plane} 
             color="bg-purple-500" 
             desc="Global Tracker"
           />
           <QuickLinkCard 
             title="Stats" 
             to="/stats" 
             icon={BarChart2} 
             color="bg-green-500" 
             desc="Season Data"
           />
           <QuickLinkCard 
             title="Predict XI" 
             to="/predict" 
             icon={ClipboardList} 
             color="bg-orange-500" 
             desc="Pick Your Team"
           />
           <QuickLinkCard 
             title="Fan Zone" 
             to="/fanzone" 
             icon={Megaphone} 
             color="bg-yellow-500" 
             desc="Chants & Guide"
           />
        </div>
      </section>

      {/* LATEST NEWS */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Updates</h2>
          <Link to="/news" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 3).map(item => (
                <Link key={item.id} to={item.url} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="aspect-video overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    </div>
                    <div className="p-5">
                        <span className="text-xs font-bold text-blue-600 uppercase">{item.category}</span>
                        <h3 className="font-bold text-gray-900 dark:text-white mt-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
}