import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  CalendarDays, 
  Users, 
  ArrowRightLeft, 
  GraduationCap, 
  Newspaper,
  Menu,
  Trophy,
  BarChart2,
  Moon,
  Sun,
  Map,
  ClipboardList,
  Megaphone
} from 'lucide-react';
import { useTheme } from './ThemeContext';

// Import Pages
import Dashboard from './Dashboard';
import MatchCentre from './MatchCentre';
import Squad from './Squad';
import PlayerProfile from './PlayerProfile';
import Transfers from './Transfers';
import Academy from './Academy';
import AcademyPlayerProfile from './AcademyPlayerProfile';
import NewsPage from './News';
import Stats from './Stats';
import PredictXI from './PredictXI';
import LoanWatch from './LoanWatch';
import FanZone from './FanZone';

// Components
import { AskTheGaffer } from './AskTheGaffer';

// Services
import { fetchMatches } from './api';
import { Match } from './types';

const Navigation = ({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (open: boolean) => void }) => {
  const location = useLocation();
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const loadNextMatch = async () => {
      try {
        const matches = await fetchMatches();
        // Filter for upcoming matches and sort by date (nearest first) to be safe
        const upcoming = matches
          .filter((m: Match) => m.status === 'Upcoming')
          .sort((a: Match, b: Match) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
          
        setNextMatch(upcoming || null);
      } catch (error) {
        console.error('Failed to load next match widget', error);
      } finally {
        setLoading(false);
      }
    };
    loadNextMatch();
  }, []);
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Match Centre', icon: CalendarDays, path: '/matches' },
    { name: 'First Team', icon: Users, path: '/squad' },
    { name: 'Predict XI', icon: ClipboardList, path: '/predict' },
    { name: 'Stats', icon: BarChart2, path: '/stats' },
    { name: 'Transfers', icon: ArrowRightLeft, path: '/transfers' },
    { name: 'Academy', icon: GraduationCap, path: '/academy' },
    { name: 'Loan Watch', icon: Map, path: '/loan-watch' },
    { name: 'Fan Zone', icon: Megaphone, path: '/fanzone' },
    { name: 'News', icon: Newspaper, path: '/news' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar / Drawer */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-chelsea-blue text-white shadow-xl transition-transform duration-300 ease-in-out
        md:translate-x-0 flex flex-col
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-20 items-center justify-center border-b border-white/10 bg-chelsea-dark shrink-0">
          <div className="flex items-center gap-3">
             {/* Logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-chelsea-gold bg-chelsea-blue text-chelsea-gold font-bold">
               CFC
            </div>
            <span className="text-xl font-bold tracking-wider font-sans">THE SHED END</span>
          </div>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/squad' && location.pathname.startsWith('/squad/'));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-chelsea-gold text-chelsea-blue shadow-lg' 
                    : 'text-gray-100 hover:bg-white/10 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-4">
          <button 
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div className={`w-8 h-4 rounded-full relative ${theme === 'dark' ? 'bg-chelsea-gold' : 'bg-gray-400'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all`} style={{ left: theme === 'dark' ? '18px' : '2px' }}></div>
            </div>
          </button>

          <div className="rounded-xl bg-gradient-to-br from-chelsea-dark to-chelsea-blue p-4 border border-white/10 shadow-inner">
            <div className="flex items-center gap-2 text-chelsea-gold mb-2">
              <Trophy size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Next Match</span>
            </div>
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                <div className="h-3 w-1/2 bg-white/10 rounded"></div>
              </div>
            ) : nextMatch ? (
              <>
                <p className="text-sm text-white font-semibold">vs {nextMatch.opponent}</p>
                <p className="text-xs text-gray-300">
                  {new Date(nextMatch.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                  {nextMatch.time ? ` • ${nextMatch.time}` : ''}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-300 italic">No upcoming fixtures</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ setMobileOpen }: { setMobileOpen: (o: boolean) => void }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white dark:bg-gray-800 px-4 shadow-sm md:hidden border-b dark:border-gray-700 transition-colors">
      <div className="flex items-center gap-2 text-chelsea-blue dark:text-chelsea-gold">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-chelsea-blue dark:border-chelsea-gold bg-white dark:bg-gray-900 text-chelsea-blue dark:text-chelsea-gold font-bold text-xs">
            CFC
        </div>
        <span className="font-bold">The Shed End</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button 
          onClick={() => setMobileOpen(true)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
        <Navigation mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        
        <div className="md:pl-64 flex flex-col min-h-screen">
          <Header setMobileOpen={setMobileOpen} />
          
          <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full relative">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/matches" element={<MatchCentre />} />
              <Route path="/squad" element={<Squad />} />
              <Route path="/squad/:playerId" element={<PlayerProfile />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/predict" element={<PredictXI />} />
              <Route path="/transfers" element={<Transfers />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/academy/:playerId" element={<AcademyPlayerProfile />} />
              <Route path="/loan-watch" element={<LoanWatch />} />
              <Route path="/fanzone" element={<FanZone />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </main>
        </div>
        
        {/* Global Chat Widget */}
        <AskTheGaffer />
      </div>
    </Router>
  );
}