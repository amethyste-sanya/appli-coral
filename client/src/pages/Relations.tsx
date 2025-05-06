import { useState } from 'react';
import { getAllVillagers, getVillagersBySeason, Villager } from '@/lib/villagers';
import { VillagerCard } from '@/components/VillagerCard';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, SearchIcon } from 'lucide-react';

export default function Relations() {
  const [searchTerm, setSearchTerm] = useState('');
  const villagers = getAllVillagers();
  
  // Récupérer les villageois du printemps, été, automne et hiver
  const springVillagers = getVillagersBySeason("Printemps");
  const summerVillagers = getVillagersBySeason("Été");
  const fallVillagers = getVillagersBySeason("Automne");
  const winterVillagers = getVillagersBySeason("Hiver");
  
  // Filtrer les villageois en fonction de la recherche
  const filterVillagers = (villagersList: Villager[]) => {
    if (!searchTerm) return villagersList;
    
    return villagersList.filter(villager => 
      villager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      villager.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      villager.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Villageois filtrés pour chaque saison
  const filteredSpringVillagers = filterVillagers(springVillagers);
  const filteredSummerVillagers = filterVillagers(summerVillagers);
  const filteredFallVillagers = filterVillagers(fallVillagers);
  const filteredWinterVillagers = filterVillagers(winterVillagers);
  const filteredAllVillagers = filterVillagers(villagers);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Relations avec les villageois</h1>
      
      {/* Barre de recherche */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher un villageois..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Onglets par saison */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="spring" className="flex items-center gap-1">
            <span className="hidden sm:inline">Printemps</span>
            <span className="sm:hidden">🌱</span>
            <span className="bg-green-100 text-green-800 rounded-full text-xs px-2 py-0.5">{springVillagers.length}</span>
          </TabsTrigger>
          <TabsTrigger value="summer" className="flex items-center gap-1">
            <span className="hidden sm:inline">Été</span>
            <span className="sm:hidden">☀️</span>
            <span className="bg-yellow-100 text-yellow-800 rounded-full text-xs px-2 py-0.5">{summerVillagers.length}</span>
          </TabsTrigger>
          <TabsTrigger value="fall" className="flex items-center gap-1">
            <span className="hidden sm:inline">Automne</span>
            <span className="sm:hidden">🍂</span>
            <span className="bg-orange-100 text-orange-800 rounded-full text-xs px-2 py-0.5">{fallVillagers.length}</span>
          </TabsTrigger>
          <TabsTrigger value="winter" className="flex items-center gap-1">
            <span className="hidden sm:inline">Hiver</span>
            <span className="sm:hidden">❄️</span>
            <span className="bg-blue-100 text-blue-800 rounded-full text-xs px-2 py-0.5">{winterVillagers.length}</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Contenu de l'onglet "Tous" */}
        <TabsContent value="all">
          {filteredAllVillagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAllVillagers.map((villager) => (
                <VillagerCard key={villager.id} villager={villager} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun villageois trouvé pour cette recherche.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Contenu de l'onglet "Printemps" */}
        <TabsContent value="spring">
          <div className="mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-medium text-green-700">Anniversaires au Printemps</h2>
          </div>
          
          {filteredSpringVillagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpringVillagers
                .sort((a, b) => a.birthday.day - b.birthday.day)
                .map((villager) => (
                  <VillagerCard key={villager.id} villager={villager} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun villageois du printemps trouvé pour cette recherche.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Contenu de l'onglet "Été" */}
        <TabsContent value="summer">
          <div className="mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-yellow-600" />
            <h2 className="text-lg font-medium text-yellow-700">Anniversaires en Été</h2>
          </div>
          
          {filteredSummerVillagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSummerVillagers
                .sort((a, b) => a.birthday.day - b.birthday.day)
                .map((villager) => (
                  <VillagerCard key={villager.id} villager={villager} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun villageois d'été trouvé pour cette recherche.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Contenu de l'onglet "Automne" */}
        <TabsContent value="fall">
          <div className="mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-medium text-orange-700">Anniversaires en Automne</h2>
          </div>
          
          {filteredFallVillagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFallVillagers
                .sort((a, b) => a.birthday.day - b.birthday.day)
                .map((villager) => (
                  <VillagerCard key={villager.id} villager={villager} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun villageois d'automne trouvé pour cette recherche.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Contenu de l'onglet "Hiver" */}
        <TabsContent value="winter">
          <div className="mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-blue-700">Anniversaires en Hiver</h2>
          </div>
          
          {filteredWinterVillagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWinterVillagers
                .sort((a, b) => a.birthday.day - b.birthday.day)
                .map((villager) => (
                  <VillagerCard key={villager.id} villager={villager} />
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun villageois d'hiver trouvé pour cette recherche.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}