import { Match, NewsItem } from './types';

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const res = await fetch('/api/proxy?type=matches');
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
    console.error("API Error", error);
    return []; 
  }
};

// This is the part that was missing or not exported!
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