import { useState, useEffect } from 'react';
import { Villager } from '@/lib/villagers';
import { Gift, Calendar, Clock, ChevronRight } from 'lucide-react';

type VillagerCardProps = {
  villager: Villager;
};

const STORAGE_KEY_PREFIX = 'coral_island_heart_level_';

export function VillagerCard({ villager }: VillagerCardProps) {
  // Niveau de cœur (0-10)
  const [heartLevel, setHeartLevel] = useState(0);
  
  // État pour afficher/masquer les cadeaux préférés
  const [showGifts, setShowGifts] = useState(false);

  // Charger les données depuis le stockage local
  useEffect(() => {
    const storedLevel = localStorage.getItem(`${STORAGE_KEY_PREFIX}${villager.id}`);
    if (storedLevel) {
      setHeartLevel(parseInt(storedLevel, 10));
    }
  }, [villager.id]);

  // Sauvegarder le niveau de cœur
  const saveHeartLevel = (level: number) => {
    setHeartLevel(level);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${villager.id}`, level.toString());
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
    <div className="bg-white rounded-lg shadow-sm w-full max-w-md p-4">
      <div className="flex justify-between items-start">
        {/* Nom */}
        <h3 className="text-xl font-bold text-gray-800">{villager.name}</h3>
        
        {/* Badge romançable */}
        {villager.romanceable && (
          <span className="text-pink-500 text-2xl">❤</span>
        )}
      </div>
      
      {/* Informations de base */}
      <div className="mt-3 space-y-1">
        {/* Date d'anniversaire */}
        {villager.birthday && (
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Printemps, jour {villager.birthday.day}</span>
          </div>
        )}
        
        {/* Occupation */}
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2" />
          <span>{villager.occupation}</span>
        </div>
      </div>
      
      {/* Section relation */}
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Relation</span>
          <span className="text-pink-500 font-medium">{heartLevel} / 10</span>
        </div>
        
        {/* Cœurs (une seule rangée) */}
        <div className="flex mt-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <button 
              key={`heart-${i}`}
              onClick={() => handleHeartClick(i)}
              className="focus:outline-none mr-1"
            >
              {heartLevel > i ? (
                <span className="text-pink-500">❤</span>
              ) : (
                <span className="text-gray-200">❤</span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Section cadeaux préférés */}
      <div 
        className="mt-5 bg-pink-50 rounded-lg p-3 cursor-pointer"
        onClick={() => setShowGifts(!showGifts)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center text-pink-600">
            <span className="mr-2 text-pink-500">❤</span>
            <span className="font-medium">Cadeaux préférés ({villager.gifts.love.length})</span>
          </div>
          <ChevronRight className={`h-5 w-5 text-pink-500 transition-transform ${showGifts ? 'rotate-90' : ''}`} />
        </div>
        
        {/* Liste de cadeaux - conditionnelle */}
        {showGifts && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {villager.gifts.love.map((gift, index) => (
              <div key={index} className="text-gray-700 text-sm">
                • {gift.item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}