// api/proxy.js
export default async function handler(req, res) {
    const { type } = req.query;
    
    // These variables will be loaded from Vercel settings automatically
    const FOOTBALL_KEY = process.env.RAPIDAPI_KEY; 
    const NEWS_KEY = process.env.NEWS_API_KEY;
  
    try {
      if (type === 'matches') {
        // USING YOUR DIRECT API KEY HERE
        const response = await fetch("https://v3.football.api-sports.io/fixtures?team=49&last=5&next=5", {
          headers: {
            "x-apisports-key": FOOTBALL_KEY,  // This is the header for your specific key
          }
        });
        
        const data = await response.json();
        
        // Check for errors from the API provider
        if (data.errors && Object.keys(data.errors).length > 0) {
          console.error("API Sports Error:", data.errors);
          return res.status(500).json({ error: "API Provider Error", details: data.errors });
        }
  
        return res.status(200).json(data);
      } 
      
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