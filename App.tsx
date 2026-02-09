import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  ArrowRightLeft, 
  Trophy,
  Menu,
  Moon,
  Sun
} from 'lucide-react';

// --- 1. IMPORT ALL YOUR PAGES ---
import Dashboard from './pages/Dashboard';
import Squad from './pages/Squad';
import Fixtures from './pages/Fixtures';
import Transfers from './pages/Transfers';
import Standings from './pages/Standings';
import Academy from './pages/Academy';
import LoanWatch from './pages/LoanWatch';
import Stats from './pages/Stats';
import PredictXI from './pages/PredictXI';
import FanZone from './pages/FanZone';
import NewsPage from './pages/News';

// --- IMPORT COMPONENTS ---
import { AskTheGaffer } from './components/AskTheGaffer'; // <--- NEW IMPORT

// --- API Service for Sidebar Widget ---
import { fetchMatches } from './services/api'; 
import { Match } from './types';

// Updated Props Interface to accept Dark Mode controls
const Navigation = ({ 
  mobileOpen, 
  setMobileOpen, 
  darkMode, 
  toggleTheme 
}: { 
  mobileOpen: boolean, 
  setMobileOpen: (open: boolean) => void,
  darkMode: boolean,
  toggleTheme: () => void
}) => {
  const location = useLocation();
  const [nextMatch, setNextMatch] = useState<Match | null>(null);

  // Removed local state here, receiving from props instead

  useEffect(() => {
    const loadNextMatch = async () => {
      try {
        const matches = await fetchMatches();
        const upcoming = matches.find((m: Match) => m.status === 'Upcoming');
        setNextMatch(upcoming || null);
      } catch (error) {
        console.error('Sidebar Widget Error', error);
      }
    };
    loadNextMatch();
  }, []);
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Squad', icon: Users, path: '/squad' },
    { name: 'Fixtures', icon: CalendarDays, path: '/fixtures' },
    { name: 'Table', icon: Trophy, path: '/standings' },
    { name: 'Transfers', icon: ArrowRightLeft, path: '/transfers' },
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

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-blue-900 text-white shadow-xl transition-transform duration-300 ease-in-out
        md:translate-x-0 flex flex-col
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-20 items-center justify-center border-b border-white/10 bg-blue-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 bg-blue-700 text-yellow-400 font-bold">
               CFC
            </div>
            <span className="text-xl font-bold tracking-wider">CHELSEA HUB</span>
          </div>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-yellow-500 text-blue-900 shadow-lg font-bold' 
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'}
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
            className="flex w-full items-center justify-between rounded-lg bg-white/5 px-4 py-2 text-sm text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>

          <div className="rounded-xl bg-gradient-to-br from-blue-950 to-blue-800 p-4 border border-white/10 shadow-inner">
            <div className="flex items-center gap-2 text-yellow-400 mb-2">
              <Trophy size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Next Match</span>
            </div>
            {nextMatch ? (
              <>
                <p className="text-sm text-white font-semibold">vs {nextMatch.opponent}</p>
                <p className="text-xs text-blue-300 mt-1">
                  {new Date(nextMatch.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                </p>
              </>
            ) : (
              <p className="text-sm text-blue-300 italic">No upcoming fixtures</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ setMobileOpen }: { setMobileOpen: (o: boolean) => void }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white dark:bg-gray-800 px-4 shadow-sm md:hidden border-b dark:border-gray-700 transition-colors">
      <div className="flex items-center gap-2 text-blue-700 dark:text-yellow-400">
        <span className="font-bold text-lg">Chelsea Hub</span>
      </div>
      <button 
        onClick={() => setMobileOpen(true)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <Menu size={24} />
      </button>
    </header>
  );
};

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // --- MOVED DARK MODE STATE HERE ---
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Force dark mode on initial load
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
        <Navigation 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
          darkMode={darkMode}       // Pass prop
          toggleTheme={toggleTheme} // Pass prop
        />
        
        <div className="md:pl-64 flex flex-col min-h-screen">
          <Header setMobileOpen={setMobileOpen} />
          
          <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full relative">
            
            <Routes>
              {/* Main Sidebar Pages */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/squad" element={<Squad />} />
              <Route path="/fixtures" element={<Fixtures />} />
              <Route path="/transfers" element={<Transfers />} />
              <Route path="/standings" element={<Standings />} />

              {/* The "Explore Hub" Pages */}
              <Route path="/academy" element={<Academy />} />
              <Route path="/loan-watch" element={<LoanWatch />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/predict" element={<PredictXI />} />
              <Route path="/fanzone" element={<FanZone />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>

          </main>
        </div>

        {/* --- ADDED CHATBOT HERE --- */}
        <AskTheGaffer />
        
      </div>
    </Router>
  );
}