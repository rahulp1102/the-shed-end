import React, { useState } from 'react';
import { PLAYERS } from '../constants';
import { Player } from '../types';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { Save, RotateCcw, CheckCircle2 } from 'lucide-react';

interface PitchPositionProps {
  top: string;
  left: string;
  label: string;
  selectedPlayer: Player | null;
  onClick: () => void;
}

const PitchPosition: React.FC<PitchPositionProps> = ({ 
  top, 
  left, 
  label, 
  selectedPlayer, 
  onClick 
}) => {
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
      style={{ top, left }}
      onClick={onClick}
    >
      <div className={`
        w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all shadow-lg
        ${selectedPlayer 
          ? 'bg-chelsea-blue border-white shadow-xl scale-110' 
          : 'bg-white/20 border-white/50 border-dashed hover:bg-white/30 hover:scale-110'}
      `}>
        {selectedPlayer ? (
          <PlayerAvatar src={selectedPlayer.image} alt={selectedPlayer.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white font-bold text-xs md:text-sm drop-shadow-md">{label}</span>
        )}
      </div>
      {selectedPlayer && (
        <span className="mt-1 bg-chelsea-dark/80 text-white text-[10px] md:text-xs px-2 py-0.5 rounded-full backdrop-blur-sm truncate max-w-[80px]">
          {selectedPlayer.name.split(' ').pop()}
        </span>
      )}
    </div>
  );
};

export default function PredictXI() {
  const [lineup, setLineup] = useState<{ [key: string]: Player | null }>({
    gk: null,
    lb: null, cb1: null, cb2: null, rb: null,
    cm1: null, cm2: null,
    lw: null, cam: null, rw: null,
    st: null
  });
  
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Position Config (4-2-3-1)
  const positions = [
    { id: 'gk', top: '90%', left: '50%', label: 'GK' },
    { id: 'lb', top: '75%', left: '15%', label: 'LB' },
    { id: 'cb1', top: '80%', left: '35%', label: 'CB' },
    { id: 'cb2', top: '80%', left: '65%', label: 'CB' },
    { id: 'rb', top: '75%', left: '85%', label: 'RB' },
    { id: 'cm1', top: '60%', left: '35%', label: 'CM' },
    { id: 'cm2', top: '60%', left: '65%', label: 'CM' },
    { id: 'lw', top: '35%', left: '15%', label: 'LW' },
    { id: 'cam', top: '40%', left: '50%', label: 'CAM' },
    { id: 'rw', top: '35%', left: '85%', label: 'RW' },
    { id: 'st', top: '15%', left: '50%', label: 'ST' },
  ];

  const handleSelectPlayer = (player: Player) => {
    if (activeSlot) {
      setLineup(prev => ({ ...prev, [activeSlot]: player }));
      setActiveSlot(null);
      setSaved(false);
    }
  };

  const filledCount = Object.values(lineup).filter(Boolean).length;

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-chelsea-dark dark:text-white">Predict The XI</h1>
          <p className="text-gray-500 dark:text-gray-400">Pick your starting lineup for the next match.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setLineup({ gk: null, lb: null, cb1: null, cb2: null, rb: null, cm1: null, cm2: null, lw: null, cam: null, rw: null, st: null })}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={18} /> Reset
          </button>
          <button 
             onClick={() => setSaved(true)}
             disabled={filledCount < 11}
             className="flex items-center gap-2 px-6 py-2 bg-chelsea-blue text-white rounded-lg font-bold shadow-lg disabled:opacity-50 hover:bg-chelsea-dark transition-all"
          >
            {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
            {saved ? 'Saved' : 'Save Lineup'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pitch Area */}
        <div className="lg:col-span-2">
          <div className="relative aspect-[3/4] md:aspect-[4/3] w-full bg-green-600 rounded-2xl shadow-inner border-4 border-white/20 overflow-hidden">
             {/* Simple Pitch Markings */}
             <div className="absolute inset-4 border-2 border-white/30 rounded-lg"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-x-2 border-b-2 border-white/30 bg-white/5"></div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-x-2 border-t-2 border-white/30 bg-white/5"></div>
             <div className="absolute top-1/2 left-0 w-full h-px bg-white/30"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-white/30"></div>

             {/* Grass Stripes Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_10%] pointer-events-none"></div>

             {/* Player Positions */}
             {positions.map(pos => (
               <PitchPosition 
                 key={pos.id}
                 top={pos.top}
                 left={pos.left}
                 label={pos.label}
                 selectedPlayer={lineup[pos.id]}
                 onClick={() => setActiveSlot(pos.id)}
               />
             ))}
          </div>
        </div>

        {/* Player Selection Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
           <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
             <span>Select Player</span>
             {activeSlot && <span className="text-xs bg-chelsea-gold text-white px-2 py-1 rounded">For {activeSlot.toUpperCase()}</span>}
           </h3>
           
           {!activeSlot ? (
             <div className="text-center py-12 text-gray-400">
               <p>Tap a position on the pitch to select a player.</p>
             </div>
           ) : (
             <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
               {PLAYERS.map(player => (
                 <button
                   key={player.id}
                   onClick={() => handleSelectPlayer(player)}
                   className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
                 >
                   <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shrink-0">
                     <PlayerAvatar src={player.image} alt={player.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <div className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-chelsea-blue transition-colors">{player.name}</div>
                     <div className="text-xs text-gray-400">{player.position} • {player.status}</div>
                   </div>
                   {player.status === 'Injured' && <span className="ml-auto text-xs text-red-500 font-bold">Inj</span>}
                 </button>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}