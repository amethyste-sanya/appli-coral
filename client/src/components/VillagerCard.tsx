import { useState, useEffect } from 'react';
import { Villager } from '@/lib/villagers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  HeartIcon, 
  ChevronDownIcon,
  ChevronUpIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon
} from 'lucide-react';

type VillagerCardProps = {
  villager: Villager;
};

const STORAGE_KEY_PREFIX = 'coral_island_heart_level_';

export function VillagerCard({ villager }: VillagerCardProps) {
  // État d'expansion de la carte
  const [isExpanded, setIsExpanded] = useState(false);
  // Niveau de cœur (0-12)
  const [heartLevel, setHeartLevel] = useState(0);

  // Charger le niveau de cœur depuis le stockage local
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

  // Incrémenter le niveau de cœur
  const incrementHeartLevel = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher l'expansion/contraction de la carte
    if (heartLevel < 12) {
      saveHeartLevel(heartLevel + 1);
    }
  };

  // Décrémenter le niveau de cœur
  const decrementHeartLevel = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher l'expansion/contraction de la carte
    if (heartLevel > 0) {
      saveHeartLevel(heartLevel - 1);
    }
  };

  // Réinitialiser le niveau de cœur
  const resetHeartLevel = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher l'expansion/contraction de la carte
    saveHeartLevel(0);
  };

  // Génère une couleur aléatoire pastel basée sur la première lettre du nom
  const generateAvatarColor = (name: string) => {
    const firstChar = name.charAt(0).toLowerCase();
    const colorMap: Record<string, string> = {
      a: '#ff9eb3', // rose pâle pour lettres A-E
      b: '#ff9eb3',
      c: '#ff9eb3',
      d: '#ff9eb3',
      e: '#ff9eb3',
      f: '#9eecff', // bleu clair pour lettres F-J
      g: '#9eecff',
      h: '#9eecff',
      i: '#9eecff',
      j: '#9eecff',
      k: '#c2b280', // beige pour lettres K-O
      l: '#c2b280',
      m: '#c2b280',
      n: '#c2b280',
      o: '#c2b280',
      p: '#b19cd9', // lavande pour lettres P-T
      q: '#b19cd9',
      r: '#b19cd9',
      s: '#b19cd9',
      t: '#b19cd9',
      u: '#77dd77', // vert pastel pour lettres U-Z
      v: '#77dd77',
      w: '#77dd77',
      x: '#77dd77',
      y: '#77dd77',
      z: '#77dd77',
    };
    
    return colorMap[firstChar] || '#ffb347'; // orange pastel par défaut
  };

  // Obtenir les initiales du villageois
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const bgColor = generateAvatarColor(villager.name);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="flex flex-col">
        {/* En-tête avec avatar et informations de base */}
        <div className="flex items-center p-4">
          {/* Avatar avec initiales */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: bgColor }}
          >
            {getInitials(villager.name)}
          </div>
          
          {/* Informations de base */}
          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">{villager.name}</h3>
              {villager.romanceable && (
                <span className="ml-1 text-red-500" title="Personnage romançable">❤</span>
              )}
            </div>
            <p className="text-sm text-gray-600">{villager.occupation}</p>
          </div>
          
          {/* Icône d'anniversaire et jour */}
          {villager.birthday && (
            <div className="flex items-center text-sm">
              <span className="font-bold mr-1">{villager.birthday.day}</span>
              <span className="text-gray-500">{villager.birthday.season}</span>
            </div>
          )}
          
          {/* Bouton pour étendre/réduire */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
          </button>
        </div>
        
        {/* Description */}
        <div className="px-4 pb-3">
          <p className="text-sm text-gray-700">{villager.description}</p>
        </div>
        
        {/* Niveau d'amitié */}
        <div className="px-4 pb-4">
          <div className="bg-pink-50 p-3 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700">Niveau d'amitié:</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={decrementHeartLevel} 
                  className="text-red-500 hover:text-red-700"
                >
                  <MinusCircleIcon size={18} />
                </button>
                <span className="font-bold">{heartLevel}</span>
                <button 
                  onClick={incrementHeartLevel} 
                  className="text-green-500 hover:text-green-700"
                >
                  <PlusCircleIcon size={18} />
                </button>
                <button 
                  onClick={resetHeartLevel} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircleIcon size={18} />
                </button>
              </div>
            </div>
            
            {/* Indicateurs de cœurs - 12 au total */}
            <div className="flex items-center justify-center space-x-1 flex-wrap">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="relative text-lg">
                  {/* Cœur vide (gris) */}
                  <div className="text-gray-300">
                    ♡
                  </div>
                  
                  {/* Cœur rempli (si le niveau est suffisant) */}
                  {heartLevel > i && (
                    <div className="absolute inset-0 flex items-center justify-center text-red-500">
                      ♥
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Badge pour nombre de cadeaux adorés */}
        <div className="px-4 pb-4">
          <div 
            className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-md inline-flex items-center"
          >
            <span>{villager.gifts.love.length} cadeau(x) adoré(s)</span>
          </div>
        </div>
        
        {/* Partie dépliable - Cadeaux adorés */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-gray-100 pt-3">
            <h4 className="font-medium text-sm mb-2">Cadeaux adorés</h4>
            <div className="flex flex-wrap gap-2">
              {villager.gifts.love.map((gift, index) => (
                <span 
                  key={index}
                  className="bg-pink-50 text-pink-800 border border-pink-200 rounded px-2 py-1 text-xs"
                >
                  {gift.item}
                </span>
              ))}
            </div>
            
            {/* Relations (si présentes) */}
            {villager.relationships && villager.relationships.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium text-sm mb-2">Relations</h4>
                <div className="flex flex-wrap gap-2">
                  {villager.relationships.map((relation, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-800 border border-blue-200 rounded px-2 py-1 text-xs"
                    >
                      {relation.name} ({relation.type})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}