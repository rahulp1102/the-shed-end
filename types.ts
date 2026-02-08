
export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  image: string;
  nationality: string;
  // New Biographical & Market Data
  age: number;
  height: string; // e.g. "1.89m"
  foot: 'Right' | 'Left' | 'Both';
  joined: string; // Date string
  contractExpiry: string; // Date string or Year
  marketValue: string; // e.g. "€45.00m"
  
  stats: {
    appearances: number;
    minutesPlayed: number;
    goals: number;
    assists: number;
    cleanSheets?: number;
    rating: number;
  };
  status: 'Available' | 'Injured' | 'Suspended' | 'Doubtful';
  injuryDetails?: {
    type: string;
    expectedReturn: string;
  };
}

export interface Match {
  id: string;
  opponent: string;
  opponentLogo: string;
  date: string; // ISO date string
  time?: string;
  venue: 'Home' | 'Away' | 'Neutral';
  competition: 'Premier League' | 'FA Cup' | 'Carabao Cup' | 'Conference League';
  status: 'Upcoming' | 'Live' | 'Finished';
  score?: {
    chelsea: number;
    opponent: number;
  };
  events?: MatchEvent[];
}

export interface MatchEvent {
  minute: number;
  type: 'Goal' | 'Card' | 'Sub';
  player: string;
  detail?: string;
  isChelsea: boolean;
}

export interface TransferNews {
  id: string;
  player: string;
  fromClub?: string;
  toClub?: string;
  type: 'In' | 'Out' | 'Rumour';
  fee?: string;
  confidence?: number; // 0-100 for rumours
  date: string;
  source?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  category: 'Team' | 'Academy' | 'Club' | 'Interview';
  timestamp: string;
}

export interface AcademyPlayer {
  id: string;
  name: string;
  age: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  image: string;
  highlight: string;
  stats: {
    games: number;
    goals: number;
    assists: number;
    rating: number;
  };
  bio: string;
  recentMatches?: {
    date: string;
    opponent: string;
    result: string;
    rating: number;
    keyStats?: string; 
  }[];
}

export interface LoanPlayer {
  id: string;
  name: string;
  club: string;
  league: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  image: string;
  stats: {
    apps: number;
    goals: number;
    assists: number;
    rating: number;
  };
  recentUpdate: string;
}
