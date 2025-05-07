import { useState, useEffect } from 'react';
import { Villager } from '@/lib/villagers';
import { Gift, Calendar } from 'lucide-react';

type VillagerCardProps = {
  villager: Villager;
};

const STORAGE_KEY_PREFIX = 'coral_island_heart_level_';
const STORAGE_KEY_GIFTS_PREFIX = 'coral_island_gifts_given_';

export function VillagerCard({ villager }: VillagerCardProps) {
  // Niveau de cœur (0-10)
  const [heartLevel, setHeartLevel] = useState(0);
  
  // Suivi des cadeaux offerts
  const [giftsGiven, setGiftsGiven] = useState(0);
  const [weeklyGiftsGiven, setWeeklyGiftsGiven] = useState(0);

  // Charger les données depuis le stockage local
  useEffect(() => {
    const storedLevel = localStorage.getItem(`${STORAGE_KEY_PREFIX}${villager.id}`);
    if (storedLevel) {
      setHeartLevel(parseInt(storedLevel, 10));
    }
    
    const storedGifts = localStorage.getItem(`${STORAGE_KEY_GIFTS_PREFIX}${villager.id}`);
    if (storedGifts) {
      const [gifts, weeklyGifts] = storedGifts.split(',').map(Number);
      setGiftsGiven(gifts);
      setWeeklyGiftsGiven(weeklyGifts);
    }
  }, [villager.id]);

  // Sauvegarder le niveau de cœur
  const saveHeartLevel = (level: number) => {
    setHeartLevel(level);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${villager.id}`, level.toString());
  };
  
  // Sauvegarder les cadeaux offerts
  const saveGiftsGiven = (gifts: number, weeklyGifts: number) => {
    setGiftsGiven(gifts);
    setWeeklyGiftsGiven(weeklyGifts);
    localStorage.setItem(`${STORAGE_KEY_GIFTS_PREFIX}${villager.id}`, `${gifts},${weeklyGifts}`);
  };

  // Toggle les cadeaux offerts (normaux)
  const toggleGift = () => {
    const newGifts = giftsGiven === 2 ? 0 : giftsGiven + 1;
    saveGiftsGiven(newGifts, weeklyGiftsGiven);
  };
  
  // Toggle les cadeaux hebdomadaires offerts
  const toggleWeeklyGift = () => {
    const newWeeklyGifts = weeklyGiftsGiven === 2 ? 0 : weeklyGiftsGiven + 1;
    saveGiftsGiven(giftsGiven, newWeeklyGifts);
  };
  
  // Gestionnaire de clic sur un cœur
  const handleHeartClick = (index: number) => {
    if (heartLevel === index + 1) {
      // Si le cœur est déjà rempli à ce niveau, on le vide (réduit d'un niveau)
      saveHeartLevel(index);
    } else {
      // Sinon, on remplit jusqu'à ce niveau
      saveHeartLevel(index + 1);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden w-full max-w-sm flex">
      {/* Partie gauche - Photo */}
      <div className="w-1/3 bg-white relative">
        {villager.imagePath ? (
          <img 
            src={villager.imagePath} 
            alt={villager.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-amber-50">
            <div className="text-6xl">👤</div>
          </div>
        )}
        
        {/* Badge de statut (Solo) */}
        <div className="absolute top-2 right-2">
          <div className="bg-amber-100/90 text-amber-800 px-2 py-0.5 rounded-md text-xs font-medium">
            {villager.romanceable ? "Solo" : "NPC"}
          </div>
        </div>
        
        {/* Nom en bas */}
        <div className="absolute bottom-0 left-0 w-full bg-amber-800/70 py-2 px-4">
          <h3 className="font-bold text-lg text-amber-50">{villager.name}</h3>
        </div>
      </div>
      
      {/* Partie droite - Infos et interactions */}
      <div className="w-2/3 p-4 bg-amber-50 flex flex-col">
        {/* Date d'anniversaire */}
        {villager.birthday && (
          <div className="text-amber-800 text-sm font-medium mb-3 flex items-center">
            <Gift className="h-4 w-4 mr-1" />
            <span>{villager.birthday.day} {villager.birthday.season}</span>
          </div>
        )}
        
        {/* Description */}
        <p className="text-sm text-amber-950 mb-4">{villager.description}</p>
        
        {/* Cœurs - Rangée 1 */}
        <div className="flex space-x-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button 
              key={`heart-${i}`}
              onClick={() => handleHeartClick(i)}
              className="focus:outline-none"
            >
              <div className="w-5 h-5">
                {heartLevel > i ? (
                  <span className="text-pink-500">❤️</span>
                ) : (
                  <span className="text-gray-300">❤️</span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Cœurs - Rangée 2 */}
        <div className="flex space-x-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <button 
              key={`heart-${i+5}`}
              onClick={() => handleHeartClick(i+5)}
              className="focus:outline-none"
            >
              <div className="w-5 h-5">
                {heartLevel > i+5 ? (
                  <span className="text-pink-500">❤️</span>
                ) : (
                  <span className="text-gray-300">❤️</span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Cadeaux */}
        <div className="flex justify-between mt-auto">
          {/* Cadeaux normaux */}
          <div className="flex items-center">
            <button 
              onClick={toggleGift}
              className="flex items-center mr-4 focus:outline-none"
            >
              <Gift className="h-5 w-5 mr-1 text-amber-700" />
              <span className="text-sm font-medium">{giftsGiven}/2</span>
            </button>
          </div>
          
          {/* Cadeaux hebdomadaires */}
          <div className="flex items-center">
            <button 
              onClick={toggleWeeklyGift}
              className="flex items-center focus:outline-none"
            >
              <Calendar className="h-5 w-5 mr-1 text-amber-700" />
              <span className="text-sm font-medium">{weeklyGiftsGiven}/2</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}