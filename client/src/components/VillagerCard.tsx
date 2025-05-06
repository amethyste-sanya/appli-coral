import { useState } from 'react';
import { Villager } from '@/lib/villagers';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon, 
  HeartIcon, 
  MapPinIcon, 
  Users2Icon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';

type VillagerCardProps = {
  villager: Villager;
};

export function VillagerCard({ villager }: VillagerCardProps) {
  // Caché par défaut
  const [isExpanded, setIsExpanded] = useState(false);

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
              <h3 className="font-medium text-gray-900">{villager.name}</h3>
              <Badge variant="outline" className="ml-2">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {villager.birthday.day} {villager.birthday.season}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{villager.occupation}</p>
          </div>
          <div className="ml-2 text-gray-400">
            {isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
          </div>
        </div>
        
        {/* Description courte - toujours visible */}
        <div className="mt-2">
          <p className="text-sm text-gray-700 line-clamp-2">{villager.description}</p>
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