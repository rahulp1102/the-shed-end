import { Match } from './types';

export const fetchMatches = async (): Promise<Match[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const today = new Date();
  const dayMs = 86400000;

  return [
    {
      id: 'm-live-1',
      opponent: 'Arsenal',
      opponentLogo: 'https://ui-avatars.com/api/?name=A+R&background=ef4444&color=fff',
      date: new Date().toISOString(), // Today / Now
      venue: 'Home',
      competition: 'Premier League',
      status: 'Live',
      score: { chelsea: 1, opponent: 1 },
      events: [
        { minute: 12, type: 'Goal', player: 'Martinelli', isChelsea: false },
        { minute: 34, type: 'Goal', player: 'Palmer', isChelsea: true },
        { minute: 40, type: 'Card', player: 'Caicedo', detail: 'Yellow Card', isChelsea: true }
      ]
    },
    {
      id: 'm-prev-1',
      opponent: 'London Rivals',
      opponentLogo: 'https://ui-avatars.com/api/?name=L+R&background=ef4444&color=fff',
      date: new Date(today.getTime() - dayMs * 3).toISOString(),
      venue: 'Home',
      competition: 'Premier League',
      status: 'Finished',
      score: { chelsea: 2, opponent: 1 },
      events: [
        { minute: 15, type: 'Goal', player: 'Chelsea Forward', isChelsea: true },
        { minute: 42, type: 'Card', player: 'Opponent Defender', isChelsea: false, detail: 'Yellow Card' },
        { minute: 88, type: 'Goal', player: 'Chelsea Midfielder', isChelsea: true }
      ]
    },
    {
      id: 'm-next-1',
      opponent: 'Northern United',
      opponentLogo: 'https://ui-avatars.com/api/?name=N+U&background=000&color=fff',
      date: new Date(today.getTime() + dayMs * 4).toISOString(),
      venue: 'Away',
      competition: 'Premier League',
      status: 'Upcoming'
    },
    {
      id: 'm-next-2',
      opponent: 'Euro Giants',
      opponentLogo: 'https://ui-avatars.com/api/?name=E+G&background=1e40af&color=fff',
      date: new Date(today.getTime() + dayMs * 10).toISOString(),
      venue: 'Home',
      competition: 'Conference League',
      status: 'Upcoming'
    },
    {
      id: 'm-next-3',
      opponent: 'Cup Challenger',
      opponentLogo: 'https://ui-avatars.com/api/?name=C+C&background=16a34a&color=fff',
      date: new Date(today.getTime() + dayMs * 14).toISOString(),
      venue: 'Neutral',
      competition: 'FA Cup',
      status: 'Upcoming'
    }
  ];
};