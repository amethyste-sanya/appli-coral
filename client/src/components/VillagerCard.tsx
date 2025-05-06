import { useState, useEffect } from 'react';
import { Villager } from '@/lib/villagers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CalendarIcon, 
  HeartIcon, 
  MapPinIcon, 
  Users2Icon,
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
  // Caché par défaut
  const [isExpanded, setIsExpanded] = useState(false);
  // Niveau de cœur (0-15)
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
    if (heartLevel < 15) {
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

  // Génère une couleur aléatoire pastel basée sur le nom du villageois
  const generatePastelColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  const bgColor = generatePastelColor(villager.name);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        {/* En-tête avec avatar et informations principales */}
        <div className="flex items-center gap-3">
          {/* Avatar du villageois (texte si pas d'image) */}
          <div 
            className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: bgColor }}
          >
            {villager.imagePath ? (
              <img 
                src={villager.imagePath} 
                alt={villager.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              villager.name.substring(0, 2).toUpperCase()
            )}
          </div>
          
          {/* Informations principales */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <h3 className="font-medium text-gray-900">{villager.name}</h3>
                {villager.romanceable && (
                  <span className="ml-1 text-pink-500" title="Personnage romançable">❤️</span>
                )}
              </div>
              {villager.birthday ? (
                <Badge variant="outline" className="ml-2">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {villager.birthday.day} {villager.birthday.season}
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-2 text-gray-500">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  Pas d'anniversaire
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600">{villager.occupation}</p>
              {villager.species && (
                <Badge variant="outline" className="text-xs py-0">
                  {villager.species}
                </Badge>
              )}
            </div>
          </div>
          <div className="ml-2 text-gray-400">
            {isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </div>
        </div>
        
        {/* Description courte - toujours visible */}
        <div className="mt-2">
          <p className="text-sm text-gray-700 line-clamp-2">{villager.description}</p>
        </div>
        
        {/* Contrôle du niveau d'amitié (cœurs) */}
        <div className="mt-3 p-2 bg-pink-50 rounded-md border border-pink-100">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-pink-800">Niveau d'amitié:</span>
            <div className="flex items-center space-x-1">
              <button 
                onClick={decrementHeartLevel} 
                className="text-pink-600 hover:text-pink-800 p-1 rounded-full hover:bg-pink-100"
                title="Diminuer le niveau"
              >
                <MinusCircleIcon size={16} />
              </button>
              <span className="text-pink-800 font-bold">{heartLevel}</span>
              <button 
                onClick={incrementHeartLevel} 
                className="text-pink-600 hover:text-pink-800 p-1 rounded-full hover:bg-pink-100"
                title="Augmenter le niveau"
              >
                <PlusCircleIcon size={16} />
              </button>
              <button 
                onClick={resetHeartLevel} 
                className="text-pink-600 hover:text-pink-800 p-1 rounded-full hover:bg-pink-100 ml-1"
                title="Réinitialiser le niveau"
              >
                <XCircleIcon size={16} />
              </button>
            </div>
          </div>
          <div className="mt-1 w-full bg-pink-200 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full" 
              style={{ width: `${(heartLevel / 15) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Badges principaux - toujours visibles */}
        <div className="flex flex-wrap gap-2 mt-3">
          {villager.location && (
            <Badge variant="secondary" className="text-xs flex items-center">
              <MapPinIcon className="w-3 h-3 mr-1" />
              {villager.location}
            </Badge>
          )}
          
          {villager.relationships && villager.relationships.length > 0 && (
            <Badge variant="secondary" className="text-xs flex items-center">
              <Users2Icon className="w-3 h-3 mr-1" />
              {villager.relationships.length} relation(s)
            </Badge>
          )}
          
          <Badge variant="secondary" className="text-xs flex items-center bg-pink-100 text-pink-800 border-pink-200">
            <HeartIcon className="w-3 h-3 mr-1" />
            {villager.gifts.love.length} cadeau(x) adoré(s)
          </Badge>
        </div>
      </div>
      
      {/* Détails - visibles seulement quand on clique sur la carte */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-100 mt-3">
          {/* Relations avec d'autres personnages */}
          {villager.relationships && villager.relationships.length > 0 && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Relations:</h4>
              <div className="flex flex-wrap gap-2">
                {villager.relationships.map((relation, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="text-xs py-1"
                  >
                    {relation.name} ({relation.type})
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Cadeaux préférés - Liste directement visible */}
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Cadeaux adorés ❤️</h4>
            <div className="grid grid-cols-2 gap-2">
              {villager.gifts.love.map((gift, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="text-xs py-1 bg-pink-50 text-pink-800 border-pink-200 justify-start"
                >
                  {gift.item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}