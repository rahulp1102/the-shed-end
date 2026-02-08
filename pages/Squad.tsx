import React, { useState, useEffect } from 'react';
import { fetchSquad } from '../services/footballData'; // Import the new service
import { Player } from '../types';

// Inside your Squad component:
export default function Squad() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const liveSquad = await fetchSquad();
      setPlayers(liveSquad);
      setLoading(false);
    };
    loadData();
  }, []);

  // ... keep your existing state for search/filter ...
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');
  // ...

  // 3. Update the filtering logic to use 'players' (state) instead of 'PLAYERS' (constant)
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'All' || player.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  // 4. Add a "Loading" Spinner
  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
      {/* ... The rest of your existing JSX remains exactly the same ... */}
      {/* Just make sure you are mapping over 'filteredPlayers' */}
    </div>
  );
}