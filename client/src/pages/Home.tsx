import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CheckCircle, Circle, Plus, Star, Ungroup, Calendar, Hammer, ArrowRight, Search, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Recipe, getRecipesByCategory } from "@/lib/recipes";

// Task type definition
type Task = {
  id: number;
  text: string;
  done: boolean;
};

// Type pour les catégories d'artisanat
type CraftingCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
};

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [craftingSearch, setCraftingSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [journalTab, setJournalTab] = useState<string>("crafting");

  // Fetch tasks
  const { data: tasks = [], refetch } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: (text: string) => {
      return apiRequest('POST', '/api/tasks', { text, done: false });
    },
    onSuccess: () => {
      setNewTask("");
      refetch();
    }
  });

  // Toggle task mutation
  const toggleTaskMutation = useMutation({
    mutationFn: (task: { id: number; done: boolean }) => {
      return apiRequest('PATCH', `/api/tasks/${task.id}`, { done: task.done });
    },
    onSuccess: () => {
      refetch();
    }
  });

  // Catégories d'artisanat
  const craftingCategories: CraftingCategory[] = [
    {
      id: "tools",
      name: "Outils",
      icon: <Hammer className="h-8 w-8 mb-2 text-amber-600" />,
      color: "amber",
      count: 8
    },
    {
      id: "fabrics",
      name: "Tissus",
      icon: <div className="h-8 w-8 mb-2 text-blue-600 flex items-center justify-center text-xl">🧵</div>,
      color: "blue",
      count: 12
    },
    {
      id: "farming",
      name: "Agriculture",
      icon: <div className="h-8 w-8 mb-2 text-green-600 flex items-center justify-center text-xl">🌱</div>,
      color: "green",
      count: 10
    },
    {
      id: "alchemy",
      name: "Alchimie",
      icon: <div className="h-8 w-8 mb-2 text-purple-600 flex items-center justify-center text-xl">🧪</div>,
      color: "purple",
      count: 15
    },
    {
      id: "cooking",
      name: "Cuisine",
      icon: <div className="h-8 w-8 mb-2 text-red-600 flex items-center justify-center text-xl">🍲</div>,
      color: "red",
      count: 24
    },
    {
      id: "furniture",
      name: "Meubles",
      icon: <div className="h-8 w-8 mb-2 text-gray-600 flex items-center justify-center text-xl">🪑</div>,
      color: "gray",
      count: 18
    }
  ];

  const addTask = () => {
    if (newTask.trim() !== "") {
      addTaskMutation.mutate(newTask);
    }
  };

  const toggleTask = (id: number, currentDone: boolean) => {
    toggleTaskMutation.mutate({ id, done: !currentDone });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  
  // Gérer la sélection de catégorie d'artisanat
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };
  
  // Fonction pour générer les classes CSS basées sur la couleur
  const getCategoryClasses = (category: CraftingCategory) => {
    const isSelected = selectedCategory === category.id;
    
    let classes = {
      container: "",
      title: "",
      text: ""
    };
    
    switch (category.color) {
      case "amber":
        classes.container = `bg-amber-50 border-amber-200 ${isSelected ? "ring-2 ring-amber-500 bg-amber-100" : "hover:bg-amber-100"}`;
        classes.title = "text-amber-800";
        classes.text = "text-amber-600";
        break;
      case "blue":
        classes.container = `bg-blue-50 border-blue-200 ${isSelected ? "ring-2 ring-blue-500 bg-blue-100" : "hover:bg-blue-100"}`;
        classes.title = "text-blue-800";
        classes.text = "text-blue-600";
        break;
      case "green":
        classes.container = `bg-green-50 border-green-200 ${isSelected ? "ring-2 ring-green-500 bg-green-100" : "hover:bg-green-100"}`;
        classes.title = "text-green-800";
        classes.text = "text-green-600";
        break;
      case "purple":
        classes.container = `bg-purple-50 border-purple-200 ${isSelected ? "ring-2 ring-purple-500 bg-purple-100" : "hover:bg-purple-100"}`;
        classes.title = "text-purple-800";
        classes.text = "text-purple-600";
        break;
      case "red":
        classes.container = `bg-red-50 border-red-200 ${isSelected ? "ring-2 ring-red-500 bg-red-100" : "hover:bg-red-100"}`;
        classes.title = "text-red-800";
        classes.text = "text-red-600";
        break;
      case "gray":
        classes.container = `bg-gray-50 border-gray-200 ${isSelected ? "ring-2 ring-gray-500 bg-gray-100" : "hover:bg-gray-100"}`;
        classes.title = "text-gray-800";
        classes.text = "text-gray-600";
        break;
    }
    
    return classes;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-blue-50 p-4 font-sans">
      <header className="max-w-3xl mx-auto mb-6 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-green-800">Coral Island Companion</h1>
      </header>

      <div className="w-full max-w-3xl mx-auto">
        <Tabs defaultValue="checklist" className="w-full">
          <TabsList className="grid grid-cols-5 bg-green-200 rounded-t-lg overflow-hidden">
            <TabsTrigger value="checklist" className="py-2 px-4 font-medium text-green-800 hover:bg-green-300 transition-colors data-[state=active]:bg-green-300">
              Check-list
            </TabsTrigger>
            <TabsTrigger value="quests" className="py-2 px-4 font-medium text-green-800 hover:bg-green-300 transition-colors data-[state=active]:bg-green-300">
              Quêtes
            </TabsTrigger>
            <TabsTrigger value="relationships" className="py-2 px-4 font-medium text-green-800 hover:bg-green-300 transition-colors data-[state=active]:bg-green-300">
              Relations
            </TabsTrigger>
            <TabsTrigger value="events" className="py-2 px-4 font-medium text-green-800 hover:bg-green-300 transition-colors data-[state=active]:bg-green-300">
              Événements
            </TabsTrigger>
            <TabsTrigger value="journal" className="py-2 px-4 font-medium text-green-800 hover:bg-green-300 transition-colors data-[state=active]:bg-green-300">
              Journal
            </TabsTrigger>
          </TabsList>

          {/* Checklist Tab */}
          <TabsContent value="checklist">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                <div className="space-y-4">
                  {/* Liste des tâches */}
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <label className="flex items-center cursor-pointer">
                        <Checkbox 
                          checked={task.done} 
                          onCheckedChange={() => toggleTask(task.id, task.done)}
                          className="h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-green-500"
                        />
                        <span className={`ml-2 ${task.done ? "text-gray-500 line-through" : "text-gray-700"}`}>
                          {task.text}
                        </span>
                      </label>
                    </div>
                  ))}
                  
                  {/* Formulaire d'ajout manuel */}
                  <div className="add-task-form pt-4 mt-2 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        className="flex-1 rounded-md px-4 py-2"
                        placeholder="Ajouter une tâche"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        onClick={addTask}
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                  
                  {/* Tâches récurrentes */}
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-700 mb-3">Tâches quotidiennes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                        onClick={() => {
                          addTaskMutation.mutate("Arroser les cultures");
                        }}
                      >
                        🌱 Arroser les cultures
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        onClick={() => {
                          addTaskMutation.mutate("Nourrir les animaux");
                        }}
                      >
                        🐔 Nourrir les animaux
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100" 
                        onClick={() => {
                          addTaskMutation.mutate("Récolter les légumes mûrs");
                        }}
                      >
                        🥕 Récolter
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        onClick={() => {
                          addTaskMutation.mutate("Collecter les œufs");
                        }}
                      >
                        🥚 Collecter les œufs
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                        onClick={() => {
                          addTaskMutation.mutate("Vérifier la boîte aux lettres");
                        }}
                      >
                        📫 Boîte aux lettres
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        onClick={() => {
                          addTaskMutation.mutate("Parler aux villageois");
                        }}
                      >
                        👋 Parler aux villageois
                      </Button>
                    </div>
                  </div>
                  
                  {/* Tâches hebdomadaires */}
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700 mb-3">Tâches hebdomadaires</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
                        onClick={() => {
                          addTaskMutation.mutate("Visiter la Reine des Sauces (dimanche)");
                        }}
                      >
                        🛒 Reine des Sauces (dimanche)
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100"
                        onClick={() => {
                          addTaskMutation.mutate("Vérifier les nouveaux objets en magasin");
                        }}
                      >
                        🏪 Nouveaux objets
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                        onClick={() => {
                          addTaskMutation.mutate("Explorer la mine");
                        }}
                      >
                        ⛏️ Explorer la mine
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quests Tab */}
          <TabsContent value="quests">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-green-800 border-b border-green-100 pb-2">Quêtes Actives</h2>
                  
                  {/* Quest 1 */}
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-blue-800">La demande du Maire</h3>
                      <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">En cours</span>
                    </div>
                    <p className="text-gray-600 mt-2">Aidez le maire à restaurer le centre communautaire en fournissant 5 poutres de bois et 10 pierres.</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">5/5 poutres de bois</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">6/10 pierres</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{width: "65%"}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">65% complété</p>
                    </div>
                  </div>
                  
                  {/* Quest 2 */}
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-green-800">Amélioration de la ferme</h3>
                      <span className="bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">En cours</span>
                    </div>
                    <p className="text-gray-600 mt-2">Construisez un nouveau poulailler pour accueillir plus d'animaux dans votre ferme.</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">Acheter les plans (500 pièces)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Rassembler les matériaux</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{width: "25%"}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">25% complété</p>
                    </div>
                  </div>
                  
                  <Button className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition-colors flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Voir toutes les quêtes</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relationships Tab */}
          <TabsContent value="relationships">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-green-800 border-b border-green-100 pb-2">Relations avec les villageois</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Villager 1 */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        FR
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">François</h3>
                        <p className="text-sm text-gray-500 mb-2">Fermier</p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: "75%"}}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Amitié</span>
                          <span>★★★☆☆</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Villager 2 */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        SO
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Sophie</h3>
                        <p className="text-sm text-gray-500 mb-2">Fleuriste</p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-orange-500 h-2 rounded-full" style={{width: "90%"}}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Amitié</span>
                          <span>★★★★☆</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Villager 3 */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        TH
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Thomas</h3>
                        <p className="text-sm text-gray-500 mb-2">Pêcheur</p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: "45%"}}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Amitié</span>
                          <span>★★☆☆☆</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Villager 4 */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm flex gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        MA
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">Marie</h3>
                        <p className="text-sm text-gray-500 mb-2">Libraire</p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: "60%"}}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Amitié</span>
                          <span>★★★☆☆</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Conseils d'amitié</h3>
                    <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
                      <li>Parlez aux villageois quotidiennement</li>
                      <li>Offrez des cadeaux qu'ils aiment (voir profils)</li>
                      <li>Participez aux événements du village</li>
                      <li>Complétez leurs quêtes personnelles</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full py-2 px-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-md transition-colors flex items-center justify-center gap-2">
                    <Ungroup className="h-4 w-4" />
                    <span>Voir tous les villageois</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-green-800 border-b border-green-100 pb-2">Calendrier des événements</h2>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Printemps</h3>
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Saison actuelle</div>
                  </div>
                  
                  {/* Event list */}
                  <div className="space-y-4">
                    {/* Event 1 */}
                    <div className="border-l-4 border-pink-500 pl-3 py-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Festival des Fleurs</h4>
                        <span className="text-sm text-gray-500">Jour 15</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Décorez le village avec des fleurs et participez au concours floral.</p>
                    </div>
                    
                    {/* Event 2 */}
                    <div className="border-l-4 border-blue-500 pl-3 py-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Course aux œufs</h4>
                        <span className="text-sm text-gray-500">Jour 28</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Cherchez des œufs cachés partout dans le village et gagnez des prix.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-8">
                    <h3 className="font-medium">Été</h3>
                    <div className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">À venir</div>
                  </div>
                  
                  {/* Summer events */}
                  <div className="space-y-4 opacity-75">
                    {/* Event 1 */}
                    <div className="border-l-4 border-yellow-500 pl-3 py-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Festival de la Plage</h4>
                        <span className="text-sm text-gray-500">Jour 12</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Profitez de jeux de plage et d'un feu d'artifice nocturne.</p>
                    </div>
                    
                    {/* Event 2 */}
                    <div className="border-l-4 border-green-500 pl-3 py-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Foire Agricole</h4>
                        <span className="text-sm text-gray-500">Jour 25</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Présentez vos meilleures récoltes et animaux pour remporter des récompenses.</p>
                    </div>
                  </div>
                  
                  <Button className="w-full py-2 px-4 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-md transition-colors flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Voir toute l'année</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Journal Tab */}
          <TabsContent value="journal">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-green-800 border-b border-green-100 pb-2">Journal</h2>
                  
                  {/* Sous-navigation du Journal */}
                  <div className="flex border-b border-gray-200">
                    <button
                      className={`px-4 py-2 font-medium text-sm ${journalTab === "crafting" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"}`}
                      onClick={() => setJournalTab("crafting")}
                    >
                      Artisanat
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${journalTab === "items" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"}`}
                      onClick={() => setJournalTab("items")}
                    >
                      Objets
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${journalTab === "fish" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"}`}
                      onClick={() => setJournalTab("fish")}
                    >
                      Poissons
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${journalTab === "creatures" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500 hover:text-gray-700"}`}
                      onClick={() => setJournalTab("creatures")}
                    >
                      Créatures
                    </button>
                  </div>
                  
                  {/* Contenu de l'onglet Artisanat */}
                  {journalTab === "crafting" && (
                    <div className="space-y-6">
                      {/* Search and filter */}
                      <div className="relative flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input 
                            className="pl-10" 
                            placeholder="Rechercher une recette..." 
                            value={craftingSearch}
                            onChange={(e) => setCraftingSearch(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">
                          Filtrer
                        </Button>
                      </div>
                      
                      {/* Crafting Categories */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {craftingCategories.map((category) => {
                          const classes = getCategoryClasses(category);
                          return (
                            <div 
                              key={category.id}
                              onClick={() => handleCategorySelect(category.id)}
                              className={`${classes.container} rounded-lg border p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors`}
                            >
                              {category.icon}
                              <h3 className={`font-medium ${classes.title}`}>
                                {category.name}
                              </h3>
                              <p className={`text-xs ${classes.text} mt-1`}>
                                {category.count} recettes
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Selected Category Content */}
                      {selectedCategory && (
                        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                              {craftingCategories.find(c => c.id === selectedCategory)?.name}
                            </h3>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setSelectedCategory(null)}
                              className="h-7 text-gray-500 hover:text-gray-700"
                            >
                              Fermer
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            {getRecipesByCategory(selectedCategory).length > 0 ? (
                              getRecipesByCategory(selectedCategory).map((recipe) => (
                                <div key={recipe.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                                    <Badge 
                                      className={`
                                        ${selectedCategory === "tools" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : ""}
                                        ${selectedCategory === "cooking" ? "bg-red-100 text-red-800 hover:bg-red-200" : ""}
                                        ${selectedCategory === "fabrics" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""}
                                        ${selectedCategory === "farming" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                                        ${selectedCategory === "alchemy" ? "bg-purple-100 text-purple-800 hover:bg-purple-200" : ""}
                                        ${selectedCategory === "furniture" ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}
                                      `}
                                    >
                                      {craftingCategories.find(c => c.id === selectedCategory)?.name.slice(0, -1)}
                                    </Badge>
                                  </div>
                                  
                                  {/* Image de la recette si disponible */}
                                  {recipe.imagePath && (
                                    <div className="mt-2 flex justify-center">
                                      <div className="border border-gray-200 rounded-md p-1 w-16 h-16 flex items-center justify-center">
                                        <img 
                                          src={recipe.imagePath} 
                                          alt={recipe.name} 
                                          className="max-w-full max-h-full object-contain" 
                                          onError={(e) => {
                                            // Fallback en cas d'erreur de chargement d'image
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                          }}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Matériaux nécessaires */}
                                  <div className="mt-2 text-sm text-gray-600">
                                    {recipe.materials.map((material, index) => (
                                      <div key={index} className="flex gap-1 items-center mb-1">
                                        <ArrowRight className="h-3 w-3 text-gray-400" />
                                        <span>{material.quantity} × {material.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* Description et effets */}
                                  {(recipe.description || recipe.effects) && (
                                    <div className="mt-2 text-xs text-gray-500 border-t border-gray-100 pt-2">
                                      {recipe.description && <p>{recipe.description}</p>}
                                      {recipe.effects && recipe.effects.map((effect, index) => (
                                        <p key={index} className="text-green-600 mt-1">✦ {effect}</p>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Niveau requis et bouton détails */}
                                  <div className="mt-2 flex justify-between items-center text-xs">
                                    <span className="text-gray-500">{recipe.level}</span>
                                    <Button size="sm" variant="outline" className="h-7 bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                                      Détails
                                    </Button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-6">
                                <p className="text-gray-500">
                                  Les recettes pour {craftingCategories.find(c => c.id === selectedCategory)?.name.toLowerCase()} seront bientôt disponibles.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Recent Recipes */}
                      {!selectedCategory && (
                        <div>
                          <h3 className="font-medium text-gray-700 mb-3">Recettes récentes</h3>
                          
                          <div className="space-y-3">
                            {/* Recipe 1 */}
                            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900">Arrosoir amélioré</h4>
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Outil</Badge>
                              </div>
                              
                              <div className="mt-2 text-sm text-gray-600">
                                <div className="flex gap-1 items-center mb-1">
                                  <ArrowRight className="h-3 w-3 text-gray-400" />
                                  <span>1 × Arrosoir</span>
                                </div>
                                <div className="flex gap-1 items-center mb-1">
                                  <ArrowRight className="h-3 w-3 text-gray-400" />
                                  <span>5 × Minerai de cuivre</span>
                                </div>
                                <div className="flex gap-1 items-center">
                                  <ArrowRight className="h-3 w-3 text-gray-400" />
                                  <span>1 × Barre de fer</span>
                                </div>
                              </div>
                              
                              <div className="mt-2 flex justify-between items-center text-xs">
                                <span className="text-gray-500">Débloqué au niveau 3 de fermier</span>
                                <Button size="sm" variant="outline" className="h-7 bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                                  Détails
                                </Button>
                              </div>
                            </div>
                            
                            {/* Recipe 2 */}
                            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                              <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900">Conserves de légumes</h4>
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cuisine</Badge>
                              </div>
                              
                              <div className="mt-2 text-sm text-gray-600">
                                <div className="flex gap-1 items-center mb-1">
                                  <ArrowRight className="h-3 w-3 text-gray-400" />
                                  <span>1 × Bocal vide</span>
                                </div>
                                <div className="flex gap-1 items-center mb-1">
                                  <ArrowRight className="h-3 w-3 text-gray-400" />
                                  <span>3 × Légumes au choix</span>
                                </div>
                                <div className="flex gap-1 items-center">
                                  <ArrowRight className="h-3 w-3 text-gray-400" />
                                  <span>1 × Sel</span>
                                </div>
                              </div>
                              
                              <div className="mt-2 flex justify-between items-center text-xs">
                                <span className="text-gray-500">Débloqué au niveau 2 de cuisine</span>
                                <Button size="sm" variant="outline" className="h-7 bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                                  Détails
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <Button className="w-full mt-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition-colors flex items-center justify-center gap-2">
                            <Hammer className="h-4 w-4" />
                            <span>Toutes les recettes</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Contenu de l'onglet Objets */}
                  {journalTab === "items" && (
                    <div className="text-center py-10">
                      <div className="bg-gray-50 rounded-lg p-6 mb-4">
                        <Info className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Section en développement</h3>
                        <p className="text-gray-600">
                          Cette section du journal qui contiendra tous les objets collectionnés sera bientôt disponible.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Contenu de l'onglet Poissons */}
                  {journalTab === "fish" && (
                    <div className="text-center py-10">
                      <div className="bg-gray-50 rounded-lg p-6 mb-4">
                        <Info className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Section en développement</h3>
                        <p className="text-gray-600">
                          Cette section du journal qui contiendra tous les poissons pêchés sera bientôt disponible.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Contenu de l'onglet Créatures */}
                  {journalTab === "creatures" && (
                    <div className="text-center py-10">
                      <div className="bg-gray-50 rounded-lg p-6 mb-4">
                        <Info className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Section en développement</h3>
                        <p className="text-gray-600">
                          Cette section du journal qui contiendra toutes les créatures découvertes sera bientôt disponible.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="max-w-3xl mx-auto mt-8 text-center text-gray-500 text-sm py-4">
        <p>Coral Island Companion © {new Date().getFullYear()} - Tous droits réservés</p>
      </footer>
    </main>
  );
}