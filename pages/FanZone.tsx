import React, { useState } from 'react';
import { Music, MapPin, Beer, Train, Info, Play, Pause } from 'lucide-react';

const CHANTS = [
  {
    id: '1',
    title: 'Blue Is The Colour',
    lyrics: "Blue is the colour, football is the game\nWe're all together, and winning is our aim\nSo cheer us on through the sun and rain\n'Cause Chelsea, Chelsea is our name!",
    audio: '#' // Placeholder
  },
  {
    id: '2',
    title: 'Keep The Blue Flag Flying High',
    lyrics: "Flying high, up in the sky,\nWe'll keep the blue flag flying high,\nFrom Stamford Bridge to Wemb-er-ley,\nWe'll keep the blue flag flying high!",
    audio: '#'
  },
  {
    id: '3',
    title: 'Liquidator',
    lyrics: "(Clap... Clap... Clap Clap Clap...)\nCHELSEA!\n(Clap... Clap... Clap Clap Clap...)\nCHELSEA!",
    audio: '#'
  },
  {
    id: '4',
    title: 'Ten Men Went To Mow',
    lyrics: "One man went to mow, went to mow a meadow,\nOne man and his dog (Spot!), went to mow a meadow...",
    audio: '#'
  }
];

const PUBS = [
  { name: "The Butcher's Hook", dist: "0.2 miles", desc: "Historic pub where the club was founded in 1905." },
  { name: "The Pensioner", dist: "0.3 miles", desc: "Bustling atmosphere, packed on matchdays." },
  { name: "McGettigan's", dist: "0.5 miles", desc: "Fulham Broadway favorite for live sports." }
];

export default function FanZone() {
  const [playing, setPlaying] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-chelsea-dark dark:text-white">The 12th Man</h1>
        <p className="text-gray-500 dark:text-gray-400">Matchday atmosphere, chants, and stadium guide.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Virtual Chant Book */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-chelsea-blue to-chelsea-dark text-white">
            <div className="flex items-center gap-3">
              <Music size={24} className="text-chelsea-gold" />
              <h2 className="text-xl font-bold">Chant Book</h2>
            </div>
            <p className="text-blue-200 text-sm mt-1">Learn the lyrics before kick-off.</p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {CHANTS.map((chant) => (
              <div key={chant.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{chant.title}</h3>
                  <button 
                    onClick={() => togglePlay(chant.id)}
                    className={`p-2 rounded-full transition-all ${playing === chant.id ? 'bg-chelsea-gold text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-700 text-chelsea-blue'}`}
                  >
                    {playing === chant.id ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-pre-line italic font-serif leading-relaxed">
                    "{chant.lyrics}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-8">
           {/* Stadium Guide */}
           <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                 <img 
                   src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Stamford_Bridge_Panorama_1.jpg/1200px-Stamford_Bridge_Panorama_1.jpg" 
                   alt="Stamford Bridge" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Stamford Bridge</h2>
                      <p className="text-gray-300 text-sm flex items-center gap-1"><MapPin size={14}/> Fulham Rd, London SW6 1HS</p>
                    </div>
                 </div>
              </div>
              <div className="p-6 grid gap-6">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-chelsea-blue">
                       <Train size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 dark:text-white">Getting There</h4>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                         Nearest tube station is <span className="font-semibold">Fulham Broadway</span> (District Line). 
                         Imperial Wharf (Overground) is a 15-min walk.
                       </p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-600">
                       <Info size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 dark:text-white">Bag Policy</h4>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                         Strict bag policy in place. Bags larger than A4 size are not permitted. Arrive 45 mins early for security.
                       </p>
                    </div>
                 </div>
              </div>
           </section>

           {/* Pub Guide */}
           <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <Beer size={20} className="text-chelsea-gold" /> Pre-Match Pubs
              </h3>
              <div className="space-y-4">
                 {PUBS.map((pub, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
                       <div>
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white">{pub.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{pub.desc}</p>
                       </div>
                       <span className="text-xs font-bold text-chelsea-blue bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                         {pub.dist}
                       </span>
                    </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}