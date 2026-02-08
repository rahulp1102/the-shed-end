import React, { useEffect, useState } from 'react';
import { Newspaper, Loader2 } from 'lucide-react';
import { fetchNews } from './api';  // <--- FIXED: Changed from '../services/api' to './api'
import { NewsItem } from './types'; // <--- FIXED: Changed from '../types' to './types'

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const data = await fetchNews();
      setNews(data);
      setLoading(false);
    };
    loadNews();
  }, []);

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
         <Newspaper size={32} className="text-chelsea-blue" />
         <h1 className="text-3xl font-bold text-chelsea-dark">Latest News</h1>
       </div>

       {loading ? (
         <div className="flex justify-center py-12">
           <Loader2 className="animate-spin text-chelsea-blue" size={32} />
         </div>
       ) : (
         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
           {news.map((item, idx) => (
             <div key={item.id} className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all ${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <div className={`overflow-hidden ${idx === 0 ? 'aspect-video md:aspect-[2/1]' : 'aspect-video'}`}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-chelsea-blue bg-blue-50 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{item.timestamp}</span>
                  </div>
                  <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-chelsea-blue transition-colors ${idx === 0 ? 'text-2xl' : 'text-lg'}`}>
                    {item.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
             </div>
           ))}
         </div>
       )}
    </div>
  );
}