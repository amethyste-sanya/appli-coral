import { useState } from 'react';
import { getAllVillagers, getVillagersBySeason, Villager } from '@/lib/villagers';
import { VillagerCard } from '@/components/VillagerCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, SearchIcon, ArrowLeftIcon, HomeIcon, SortAscIcon } from 'lucide-react';

export default function Relations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState<'default' | 'alphabetic' | 'birthdayAsc'>('default');
  const villagers = getAllVillagers();
  
  // Récupérer les villageois du printemps, été, automne et hiver
  const springVillagers = getVillagersBySeason("Printemps");
  const summerVillagers = getVillagersBySeason("Été");
  const fallVillagers = getVillagersBySeason("Automne");
  const winterVillagers = getVillagersBySeason("Hiver");
  
  // Navigation vers la page d'accueil
  const navigateToHome = () => {
    window.location.href = '/';
  };
  
  // Filtrer les villageois en fonction de la recherche
  const filterVillagers = (villagersList: Villager[]) => {
    if (!searchTerm) return villagersList;
    
    return villagersList.filter(villager => 
      villager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      villager.occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      villager.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Fonction pour trier les villageois selon la méthode choisie
  const sortVillagers = (villagersList: Villager[]) => {
    let sortedList = [...villagersList];
    
    switch (sortMethod) {
      case 'alphabetic':
        // Tri par ordre alphabétique du nom
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'birthdayAsc':
        // Tri par date d'anniversaire (déjà le comportement par défaut pour les onglets par saison)
        sortedList.sort((a, b) => {
          // Si l'un des villageois n'a pas d'anniversaire, le placer à la fin
          if (!a.birthday) return 1;
          if (!b.birthday) return -1;
          return a.birthday.day - b.birthday.day;
        });
        break;
      default:
        // Pas de tri spécial, on garde l'ordre par défaut
        break;
    }
    
    return sortedList;
  };
  
  // Villageois filtrés et triés pour chaque saison
  const filteredSpringVillagers = sortVillagers(filterVillagers(springVillagers));
  const filteredSummerVillagers = sortVillagers(filterVillagers(summerVillagers));
  const filteredFallVillagers = sortVillagers(filterVillagers(fallVillagers));
  const filteredWinterVillagers = sortVillagers(filterVillagers(winterVillagers));
  const filteredAllVillagers = sortVillagers(filterVillagers(villagers));
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4 flex items-center gap-2" 
          onClick={navigateToHome}
        >
          <ArrowLeftIcon size={16} />
          <span>Retour à l'accueil</span>
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Relations avec les villageois</h1>
      
      {/* Barre de recherche et sélecteur de tri */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher un villageois..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="w-full md:w-[200px]">
          <Select value={sortMethod} onValueChange={(value: 'default' | 'alphabetic' | 'birthdayAsc') => setSortMethod(value)}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <SortAscIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trier par..." />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Par défaut</SelectItem>
              <SelectItem value="alphabetic">Ordre alphabétique</SelectItem>
              <SelectItem value="birthdayAsc">Date d'anniversaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
              {filteredSpringVillagers.map((villager) => (
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
              {filteredSummerVillagers.map((villager) => (
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
              {filteredFallVillagers.map((villager) => (
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
              {filteredWinterVillagers.map((villager) => (
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