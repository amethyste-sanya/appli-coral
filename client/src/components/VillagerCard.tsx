import { useState, useEffect } from 'react';
import { Villager } from '@/lib/villagers';
import { Button } from '@/components/ui/button';
import { Gift, CalendarHeart, Check } from 'lucide-react';

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

  // Incrémenter le niveau de cœur
  const incrementHeartLevel = () => {
    if (heartLevel < 10) {
      saveHeartLevel(heartLevel + 1);
    }
  };

  // Décrémenter le niveau de cœur
  const decrementHeartLevel = () => {
    if (heartLevel > 0) {
      saveHeartLevel(heartLevel - 1);
    }
  };
  
  // Toggle les cadeaux offerts
  const toggleGift = () => {
    const newGifts = giftsGiven === 2 ? 0 : giftsGiven + 1;
    saveGiftsGiven(newGifts, weeklyGiftsGiven);
  };
  
  // Toggle les cadeaux hebdomadaires offerts
  const toggleWeeklyGift = () => {
    const newWeeklyGifts = weeklyGiftsGiven === 2 ? 0 : weeklyGiftsGiven + 1;
    saveGiftsGiven(giftsGiven, newWeeklyGifts);
  };
  
  // Réinitialiser les cadeaux (pour la nouvelle semaine)
  const resetWeeklyGifts = () => {
    saveGiftsGiven(giftsGiven, 0);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden w-full max-w-xs">
      <div className="flex">
        {/* Partie gauche - Image du personnage ou avatar par défaut */}
        <div className="w-1/2 bg-white relative">
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
          
          {/* Badge de statut (Solo/Marié/etc.) */}
          <div className="absolute top-2 right-2">
            <div className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md text-xs font-medium">
              {villager.romanceable ? "Solo" : "Non romançable"}
            </div>
          </div>
        </div>
        
        {/* Partie droite - Informations du personnage */}
        <div className="w-1/2 p-3 bg-gray-50 flex flex-col">
          {/* Nom */}
          <h3 className="font-bold text-lg text-gray-800">{villager.name}</h3>
          
          {/* Indicateurs spéciaux */}
          {villager.species && (
            <div className="my-1 text-xs text-blue-600">
              {villager.species}
            </div>
          )}
          
          {/* Hearts Row 1 */}
          <div className="flex mt-2 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button 
                key={`heart-${i}`}
                onClick={() => saveHeartLevel(i+1)}
                className="focus:outline-none"
              >
                <div className="w-5 h-5 text-lg">
                  {heartLevel > i ? (
                    <span className="text-pink-500">❤️</span>
                  ) : (
                    <span className="text-gray-300">❤️</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Hearts Row 2 */}
          <div className="flex mt-1 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button 
                key={`heart-${i+5}`}
                onClick={() => saveHeartLevel(i+6)}
                className="focus:outline-none"
              >
                <div className="w-5 h-5 text-lg">
                  {heartLevel > i+5 ? (
                    <span className="text-pink-500">❤️</span>
                  ) : (
                    <span className="text-gray-300">❤️</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Cadeaux offerts */}
          <div className="mt-6 flex items-center justify-between">
            {/* Cadeaux (birthday/event) */}
            <div className="flex items-center">
              <button 
                onClick={toggleGift}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <Gift className="h-5 w-5 text-amber-700" />
                <span className="text-sm">{giftsGiven}/2</span>
              </button>
            </div>
            
            {/* Cadeaux hebdomadaires */}
            <div className="flex items-center">
              <button 
                onClick={toggleWeeklyGift}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <CalendarHeart className="h-5 w-5 text-amber-700" />
                <span className="text-sm">{weeklyGiftsGiven}/2</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panneau de contrôle (visible seulement lors du développement) */}
      <div className="p-2 bg-gray-200 flex justify-between text-xs">
        <div className="flex space-x-2">
          <button
            onClick={decrementHeartLevel}
            className="px-1 py-0.5 bg-gray-300 hover:bg-gray-400 rounded"
          >
            -1 ❤️
          </button>
          <button
            onClick={incrementHeartLevel}
            className="px-1 py-0.5 bg-gray-300 hover:bg-gray-400 rounded"
          >
            +1 ❤️
          </button>
        </div>
        <button
          onClick={resetWeeklyGifts}
          className="px-1 py-0.5 bg-gray-300 hover:bg-gray-400 rounded flex items-center"
        >
          <Check className="h-3 w-3 mr-1" />
          Reset Hebdo
        </button>
      </div>
    </div>
  );
}