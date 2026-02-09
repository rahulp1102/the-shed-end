import { Match, NewsItem } from '../types';

// --- CONFIGURATION ---
const API_KEY = '5f457185de1af36d836a866d80c4bdff'; // Your Key
const BASE_URL = 'https://v3.football.api-football.com';

const HEADERS = {
  'x-rapidapi-host': 'v3.football.api-football.com',
  'x-rapidapi-key': API_KEY,
};

// --- 1. FETCH MATCHES (Fixtures) ---
export const fetchMatches = async (): Promise<Match[]> => {
  try {
    // Fetching Chelsea (ID 49) matches for the 2024 season (Current IRL season)
    const res = await fetch(`${BASE_URL}/fixtures?season=2024&team=49`, {
      method: 'GET',
      headers: HEADERS,
    });
    
    const data = await res.json();
    
    if (!data.response) return [];

    return data.response.map((m: any) => ({
      id: m.fixture.id.toString(),
      opponent: m.teams.home.id === 49 ? m.teams.away.name : m.teams.home.name,
      opponentLogo: m.teams.home.id === 49 ? m.teams.away.logo : m.teams.home.logo,
      date: m.fixture.date,
      venue: m.teams.home.id === 49 ? 'Home' : 'Away',
      competition: m.league.name,
      status: m.fixture.status.short === 'NS' ? 'Upcoming' : m.fixture.status.short === 'FT' ? 'Finished' : 'Live',
      score: {
        chelsea: m.teams.home.id === 49 ? m.goals.home : m.goals.away,
        opponent: m.teams.home.id === 49 ? m.goals.away : m.goals.home
      },
      events: [] 
    }));
  } catch (error) {
    console.error("API Error (Matches)", error);
    return []; 
  }
};

// --- 2. FETCH STANDINGS (Table) ---
export const fetchStandings = async () => {
  try {
    // Premier League is League ID 39
    const res = await fetch(`${BASE_URL}/standings?season=2024&league=39`, {
      method: 'GET',
      headers: HEADERS,
    });

    const data = await res.json();
    
    // Return the standings array (Rank 1-20)
    return data.response?.[0]?.league?.standings?.[0] || [];
  } catch (error) {
    console.error("API Error (Standings)", error);
    return [];
  }
};

// --- 3. FETCH NEWS (Kept exactly as you had it) ---
export const fetchNews = async (): Promise<NewsItem[]> => {
  try {
    const res = await fetch('/api/proxy?type=news');
    const data = await res.json();

    if (!data.articles) return [];

    return data.articles.slice(0, 9).map((article: any, idx: number) => ({
      id: idx.toString(),
      title: article.title,
      summary: article.description || '',
      image: article.urlToImage || 'https://via.placeholder.com/400x200?text=Chelsea+News',
      category: 'Team',
      timestamp: new Date(article.publishedAt).toLocaleDateString(),
      url: article.url 
    }));
  } catch (error) {
    console.error("News API Error", error);
    return [];
  }
};