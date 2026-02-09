export default async function handler(req, res) {
  const { type } = req.query;
  
  // Make sure these are set in your Vercel Project Settings > Environment Variables
  const FOOTBALL_KEY = process.env.RAPIDAPI_KEY; 
  const NEWS_KEY = process.env.NEWS_API_KEY;

  try {
    // --- 1. MATCHES (Fixtures & Results) ---
    if (type === 'matches') {
      // Fetches Chelsea (ID 49) matches for the 2024 season
      // We use season=2024 to get the full schedule for the Fixtures page
      const response = await fetch("https://v3.football.api-sports.io/fixtures?team=49&season=2024", {
        headers: {
          "x-apisports-key": FOOTBALL_KEY,
        }
      });
      
      const data = await response.json();
      return res.status(200).json(data);
    } 
    
    // --- 2. STANDINGS (League Table) --- <--- THIS WAS MISSING
    else if (type === 'standings') {
      // Premier League (ID 39), Season 2024
      const response = await fetch("https://v3.football.api-sports.io/standings?league=39&season=2024", {
        headers: {
          "x-apisports-key": FOOTBALL_KEY,
        }
      });

      const data = await response.json();
      return res.status(200).json(data);
    }

    // --- 3. NEWS ---
    else if (type === 'news') {
      const response = await fetch(`https://newsapi.org/v2/everything?q="Chelsea FC"&language=en&sortBy=publishedAt&apiKey=${NEWS_KEY}`);
      const data = await response.json();
      return res.status(200).json(data);
    }
    
    return res.status(400).json({ error: "Invalid type" });

  } catch (error) {
    console.error("Proxy Error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}