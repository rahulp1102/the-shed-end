import { Player, TransferNews, NewsItem, AcademyPlayer, LoanPlayer } from './types';

// Images are set to empty strings to demonstrate the UI's graceful fallback 
// to Chelsea-themed placeholders (using PlayerAvatar component).

export const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Robert Sánchez',
    number: 1,
    position: 'GK',
    image: '', 
    nationality: 'Spain',
    age: 26,
    height: '1.97m',
    foot: 'Right',
    joined: 'Aug 5, 2023',
    contractExpiry: 'Jun 30, 2030',
    marketValue: '€30.00m',
    stats: { appearances: 22, minutesPlayed: 1980, goals: 0, assists: 0, cleanSheets: 6, rating: 6.8 },
    status: 'Available'
  },
  {
    id: '24',
    name: 'Reece James',
    number: 24,
    position: 'DEF',
    image: '',
    nationality: 'England',
    age: 24,
    height: '1.79m',
    foot: 'Right',
    joined: 'Jul 1, 2018',
    contractExpiry: 'Jun 30, 2028',
    marketValue: '€50.00m',
    stats: { appearances: 8, minutesPlayed: 450, goals: 0, assists: 1, rating: 7.2 },
    status: 'Injured',
    injuryDetails: { type: 'Hamstring', expectedReturn: 'Mid March' }
  },
  {
    id: '6',
    name: 'Thiago Silva',
    number: 6,
    position: 'DEF',
    image: '',
    nationality: 'Brazil',
    age: 39,
    height: '1.81m',
    foot: 'Right',
    joined: 'Aug 28, 2020',
    contractExpiry: 'Jun 30, 2024',
    marketValue: '€2.00m',
    stats: { appearances: 20, minutesPlayed: 1750, goals: 1, assists: 0, rating: 7.5 },
    status: 'Available'
  },
  {
    id: '8',
    name: 'Enzo Fernández',
    number: 8,
    position: 'MID',
    image: '',
    nationality: 'Argentina',
    age: 23,
    height: '1.78m',
    foot: 'Right',
    joined: 'Jan 31, 2023',
    contractExpiry: 'Jun 30, 2032',
    marketValue: '€80.00m',
    stats: { appearances: 24, minutesPlayed: 2100, goals: 3, assists: 2, rating: 7.1 },
    status: 'Available'
  },
  {
    id: '25',
    name: 'Moisés Caicedo',
    number: 25,
    position: 'MID',
    image: '',
    nationality: 'Ecuador',
    age: 22,
    height: '1.78m',
    foot: 'Right',
    joined: 'Aug 14, 2023',
    contractExpiry: 'Jun 30, 2031',
    marketValue: '€90.00m',
    stats: { appearances: 23, minutesPlayed: 2050, goals: 0, assists: 1, rating: 7.0 },
    status: 'Available'
  },
  {
    id: '20',
    name: 'Cole Palmer',
    number: 20,
    position: 'MID',
    image: '',
    nationality: 'England',
    age: 21,
    height: '1.89m',
    foot: 'Left',
    joined: 'Sep 1, 2023',
    contractExpiry: 'Jun 30, 2030',
    marketValue: '€55.00m',
    stats: { appearances: 22, minutesPlayed: 1890, goals: 12, assists: 9, rating: 8.4 },
    status: 'Available'
  },
  {
    id: '15',
    name: 'Nicolas Jackson',
    number: 15,
    position: 'FWD',
    image: '',
    nationality: 'Senegal',
    age: 22,
    height: '1.86m',
    foot: 'Right',
    joined: 'Jul 1, 2023',
    contractExpiry: 'Jun 30, 2031',
    marketValue: '€35.00m',
    stats: { appearances: 21, minutesPlayed: 1650, goals: 8, assists: 3, rating: 6.9 },
    status: 'Available'
  },
  {
    id: '18',
    name: 'Christopher Nkunku',
    number: 18,
    position: 'FWD',
    image: '',
    nationality: 'France',
    age: 26,
    height: '1.75m',
    foot: 'Right',
    joined: 'Jul 1, 2023',
    contractExpiry: 'Jun 30, 2029',
    marketValue: '€70.00m',
    stats: { appearances: 5, minutesPlayed: 180, goals: 2, assists: 0, rating: 7.0 },
    status: 'Doubtful',
    injuryDetails: { type: 'Hip', expectedReturn: 'Next Week' }
  }
];

export const ACADEMY_PLAYERS: AcademyPlayer[] = [
  {
    id: 'a1',
    name: 'Leo Castledine',
    age: 18,
    position: 'MID',
    image: '',
    highlight: 'Top Scorer U21',
    stats: { games: 18, goals: 10, assists: 8, rating: 8.2 },
    bio: 'A box-to-box midfielder with an eye for goal. Leo has been the standout performer for the U21s this season, often captaining the side. His driving runs from midfield are reminiscent of a young Lampard.',
    recentMatches: [
        { date: '2024-02-25', opponent: 'Man Utd U21', result: '3-2 (W)', rating: 9.0, keyStats: '2 Goals' },
        { date: '2024-02-18', opponent: 'PSV U21', result: '1-1 (D)', rating: 7.5, keyStats: '90% Pass Acc' },
        { date: '2024-02-10', opponent: 'Leeds U21', result: '2-0 (W)', rating: 8.1, keyStats: '1 Assist' }
    ]
  },
  {
    id: 'a2',
    name: 'Tyrique George',
    age: 18,
    position: 'FWD',
    image: '',
    highlight: 'Wondergoal vs Palace',
    stats: { games: 15, goals: 8, assists: 4, rating: 7.8 },
    bio: 'An explosive winger capable of scoring from anywhere. Known for his spectacular long-range efforts and dribbling ability. Recently went viral for a 30-yard screamer.',
    recentMatches: [
        { date: '2024-02-25', opponent: 'Man Utd U21', result: '3-2 (W)', rating: 7.2, keyStats: '3 Dribbles' },
        { date: '2024-02-05', opponent: 'Crystal Palace U21', result: '4-1 (W)', rating: 9.5, keyStats: 'Hat-trick' }
    ]
  },
  {
    id: 'a3',
    name: 'Ronnie Stutter',
    age: 19,
    position: 'FWD',
    image: '',
    highlight: 'First Team Training',
    stats: { games: 12, goals: 6, assists: 2, rating: 7.4 },
    bio: 'A hard-working forward who presses tirelessly. Recently called up to train with the first team squad under Poch and has impressed the coaching staff with his work ethic.',
    recentMatches: [
        { date: '2024-02-10', opponent: 'Leeds U21', result: '2-0 (W)', rating: 7.8, keyStats: '1 Goal' },
        { date: '2024-02-02', opponent: 'Reading U21', result: '1-0 (W)', rating: 7.0, keyStats: '2 Key Passes' }
    ]
  }
];

export const TRANSFERS: TransferNews[] = [
  {
    id: 't1',
    player: 'Victor Osimhen',
    fromClub: 'Napoli',
    type: 'Rumour',
    confidence: 65,
    date: '2024-02-28',
    source: 'The Athletic'
  },
  {
    id: 't2',
    player: 'Andrey Santos',
    toClub: 'Strasbourg',
    type: 'Out',
    fee: 'Loan',
    date: '2024-01-31'
  },
  {
    id: 't3',
    player: 'Antonio Nusa',
    fromClub: 'Club Brugge',
    type: 'Rumour',
    confidence: 40,
    date: '2024-02-20',
    source: 'Sky Sports'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Poch: "We are building something special"',
    summary: 'The head coach reflects on recent performances and the growth of the young squad ahead of the weekend clash.',
    image: 'https://picsum.photos/id/200/600/400',
    category: 'Interview',
    timestamp: '2 hours ago'
  },
  {
    id: 'n2',
    title: 'Injury Update: James and Nkunku',
    summary: 'Latest news from the medical department regarding the return dates for our captain and forward.',
    image: 'https://picsum.photos/id/201/600/400',
    category: 'Team',
    timestamp: '5 hours ago'
  },
  {
    id: 'n3',
    title: 'Academy Report: U21s thrash Man Utd',
    summary: 'A detailed look at how the development squad performed in their latest PL2 fixture.',
    image: 'https://picsum.photos/id/202/600/400',
    category: 'Academy',
    timestamp: '1 day ago'
  }
];

export const LOAN_PLAYERS: LoanPlayer[] = [
  {
    id: 'l1',
    name: 'Andrey Santos',
    club: 'Strasbourg',
    league: 'Ligue 1',
    position: 'MID',
    image: '',
    stats: { apps: 5, goals: 0, assists: 1, rating: 6.9 },
    recentUpdate: 'Started and played 90mins in 1-1 draw vs Montpellier.'
  },
  {
    id: 'l2',
    name: 'David Datro Fofana',
    club: 'Burnley',
    league: 'Premier League',
    position: 'FWD',
    image: '',
    stats: { apps: 8, goals: 3, assists: 1, rating: 7.2 },
    recentUpdate: 'Scored a brace to secure a vital point against Fulham.'
  },
  {
    id: 'l3',
    name: 'Romelu Lukaku',
    club: 'AS Roma',
    league: 'Serie A',
    position: 'FWD',
    image: '',
    stats: { apps: 24, goals: 10, assists: 2, rating: 7.1 },
    recentUpdate: 'Provided an assist in the Europa League knockout stage.'
  },
  {
    id: 'l4',
    name: 'Kepa Arrizabalaga',
    club: 'Real Madrid',
    league: 'La Liga',
    position: 'GK',
    image: '',
    stats: { apps: 18, goals: 0, assists: 0, rating: 6.8 },
    recentUpdate: 'Kept a clean sheet but currently rotating with Lunin.'
  },
  {
    id: 'l5',
    name: 'Angelo Gabriel',
    club: 'Strasbourg',
    league: 'Ligue 1',
    position: 'FWD',
    image: '',
    stats: { apps: 20, goals: 0, assists: 4, rating: 6.95 },
    recentUpdate: 'Won Man of the Match with 4 successful dribbles.'
  }
];