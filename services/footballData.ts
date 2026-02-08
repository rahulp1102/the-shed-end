import { Player } from '../types';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const CHELSEA_TEAM_ID = '133610';

export const fetchSquad = async (): Promise<Player[]> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup_all_players.php?id=${CHELSEA_TEAM_ID}`);
    const data = await response.json();

    if (!data.player) return [];

    return data.player.map((p: any) => ({
      id: p.idPlayer,
      name: p.strPlayer,
      number: p.strNumber ? parseInt(p.strNumber) : 0,
      position: mapPosition(p.strPosition),
      image: p.strCutout || p.strThumb || '', 
      nationality: p.strNationality,
      age: calculateAge(p.dateBorn),
      height: p.strHeight || 'N/A',
      foot: p.strSide || 'Right',
      joined: p.dateSigned ? new Date(p.dateSigned).toLocaleDateString() : 'Unknown',
      contractExpiry: '2026', 
      marketValue: '€' + (p.strWage ? parseInt(p.strWage) * 100 : 'Unknown'),
      stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 },
      status: 'Available'
    }));
  } catch (error) {
    console.error("Error fetching squad:", error);
    return [];
  }
};

const calculateAge = (dob: string) => {
  if (!dob) return 0;
  return new Date().getFullYear() - new Date(dob).getFullYear();
};

const mapPosition = (pos: string): "GK" | "DEF" | "MID" | "FWD" => {
  if (!pos) return "MID";
  const p = pos.toLowerCase();
  if (p.includes("goalkeeper")) return "GK";
  if (p.includes("defender") || p.includes("back")) return "DEF";
  if (p.includes("midfield")) return "MID";
  return "FWD";
};