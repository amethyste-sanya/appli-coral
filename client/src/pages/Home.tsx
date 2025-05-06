import React, { useState } from "react";
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
import { Crop, getAllCrops, getCropsBySeason, calculateProfitability } from "@/lib/crops";
import { CropCard } from "@/components/CropCard";

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
                        className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                        onClick={() => {
                          addTaskMutation.mutate("Acheter des graines pour la semaine");
                        }}
                      >
                        🌾 Acheter des graines
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100"
                        onClick={() => {
                          addTaskMutation.mutate("Offrir des cadeaux aux villageois");
                        }}
                      >
                        🎁 Offrir des cadeaux
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                        onClick={() => {
                          addTaskMutation.mutate("Vendre les produits accumulés");
                        }}
                      >
                        💰 Vendre les produits
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
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-6">
                    <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-amber-500" />
                      Quêtes principales
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800 line-through">Rencontrer le maire</h4>
                          <p className="text-sm text-gray-500">Présentez-vous au maire Sam pour commencer votre nouvelle vie.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800">Réparer le Temple de la Déesse</h4>
                          <p className="text-sm text-gray-500">Collectez 10 offrandes pour restaurer le Temple de la Déesse.</p>
                          <div className="mt-1 bg-gray-100 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">3/10 offrandes collectées</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-medium text-green-800 mb-2 flex items-center">
                      <Ungroup className="h-5 w-5 mr-2 text-green-500" />
                      Quêtes secondaires
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800">Aider Scott à la ferme</h4>
                          <p className="text-sm text-gray-500">Apportez 5 navets frais à Scott pour l'aider avec sa commande.</p>
                          <div className="mt-1 bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">3/5 navets récoltés</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800">Pêche pour Keiko</h4>
                          <p className="text-sm text-gray-500">Attrapez un poisson-lune pour Keiko.</p>
                          <div className="mt-1 text-xs italic text-blue-600">
                            Disponible seulement en été
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-medium text-purple-800 mb-2 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                      Quêtes saisonnières
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Circle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800">Festival du Printemps</h4>
                          <p className="text-sm text-gray-500">Cultivez une fleur primée pour le festival du printemps.</p>
                          <div className="mt-1 text-xs italic text-purple-600 flex items-center">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            7 jours restants
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relationships Tab */}
          <TabsContent value="relationships">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5 text-center">
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <Info className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Section en développement</h3>
                  <p className="text-gray-600">
                    Cette section qui vous permettra de suivre vos relations avec les villageois
                    sera bientôt disponible.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Vous pourrez suivre vos affinités, offrir les cadeaux appropriés et garder 
                    une trace des anniversaires et événements spéciaux.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5 text-center">
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <Info className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Section en développement</h3>
                  <p className="text-gray-600">
                    Cette section du calendrier des événements sera bientôt disponible.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Retrouvez facilement tous les festivals, anniversaires et événements spéciaux 
                    pour ne rien manquer des activités de Coral Island.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Journal Tab */}
          <TabsContent value="journal">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                {/* En-tête du journal avec sous-onglets */}
                <Tabs defaultValue={journalTab} className="w-full" onValueChange={setJournalTab}>
                  <TabsList className="bg-gray-100 rounded-lg mb-5 grid grid-cols-4">
                    <TabsTrigger value="crafting" className="text-gray-700 data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
                      Artisanat
                    </TabsTrigger>
                    <TabsTrigger value="crops" className="text-gray-700 data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
                      Cultures
                    </TabsTrigger>
                    <TabsTrigger value="fish" className="text-gray-700 data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
                      Poissons
                    </TabsTrigger>
                    <TabsTrigger value="animals" className="text-gray-700 data-[state=active]:bg-green-100 data-[state=active]:text-green-800">
                      Animaux
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Contenu de l'onglet Artisanat */}
                  <TabsContent value="crafting">
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          className="pl-9 pr-4 py-2 rounded-lg bg-gray-50 border-gray-200 w-full"
                          placeholder="Rechercher des recettes..."
                          value={craftingSearch}
                          onChange={(e) => setCraftingSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Catégories d'artisanat */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                      {craftingCategories.map((category) => {
                        const classes = getCategoryClasses(category);
                        return (
                          <div
                            key={category.id}
                            className={`border rounded-lg p-3 transition-all cursor-pointer ${classes.container}`}
                            onClick={() => handleCategorySelect(category.id)}
                          >
                            <div className="flex flex-col items-center text-center">
                              {category.icon}
                              <h3 className={`font-medium ${classes.title}`}>{category.name}</h3>
                              <p className={`text-xs ${classes.text}`}>{category.count} recettes</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Liste des recettes filtrées */}
                    <div>
                      {selectedCategory ? (
                        <div>
                          <h3 className="font-medium text-gray-700 mb-3">Recettes de {craftingCategories.find(c => c.id === selectedCategory)?.name}</h3>
                          <div className="space-y-3">
                            {getRecipesByCategory(selectedCategory)
                              .filter(recipe => craftingSearch ? recipe.name.toLowerCase().includes(craftingSearch.toLowerCase()) : true)
                              .map((recipe: Recipe) => (
                                <div key={recipe.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                  <div className="flex justify-between">
                                    <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                                    <Badge className="bg-gray-100 text-gray-800">Niv. {recipe.level}</Badge>
                                  </div>
                                  <div className="mt-2 text-sm text-gray-600">
                                    <h5 className="font-medium mb-1">Matériaux requis:</h5>
                                    <ul className="space-y-1 ml-2">
                                      {recipe.materials.map((material, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                          <span className="text-green-600">✓</span>
                                          <span>{material.quantity} × {material.name}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  {recipe.sellPrice && (
                                    <div className="mt-2 text-sm">
                                      <span className="font-medium text-amber-700">Prix de vente:</span>
                                      <span className="ml-2 text-amber-600">{recipe.sellPrice} pièces</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-gray-400 mb-2">
                            <Info className="h-12 w-12 mx-auto mb-2" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-700 mb-1">Sélectionnez une catégorie</h3>
                          <p className="text-sm text-gray-500">
                            Choisissez une catégorie d'artisanat pour voir les recettes disponibles.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  {/* Contenu de l'onglet Cultures */}
                  <TabsContent value="crops">
                    <div className="space-y-5">
                      {/* Cultures les plus rentables */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-700">Cultures les plus rentables</h3>
                          <div className="relative group">
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute z-10 right-0 mt-2 w-64 px-4 py-3 text-xs bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
                              <p>
                                La rentabilité est calculée sur une saison complète de 28 jours, en tenant compte des repousses pour les cultures qui repoussent après la première récolte.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {getAllCrops()
                            .filter(crop => crop.sellPrice)
                            .sort((a, b) => {
                              // Utilisation de la fonction calculateProfitability qui prend en compte les repousses
                              const profitPerDayA = calculateProfitability(a);
                              const profitPerDayB = calculateProfitability(b);
                              return profitPerDayB - profitPerDayA;
                            })
                            .slice(0, 4)
                            .map(crop => {
                              // Utilisation de la fonction calculateProfitability qui prend en compte les repousses
                              const profitPerDay = calculateProfitability(crop);
                              return (
                                <div key={crop.id} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 bg-white">
                                  <div className="w-12 h-12 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                                    <img 
                                      src={crop.imagePath} 
                                      alt={crop.name} 
                                      className="max-w-full max-h-full object-contain" 
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{crop.name}</h4>
                                    <div className="flex justify-between">
                                      <div className="text-xs text-gray-500">{crop.growthTime} jours | {crop.season}</div>
                                      <div className="text-xs font-medium text-green-600">+{profitPerDay} Po/jour</div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          }
                        </div>
                      </div>
                      
                      {/* Liste des cultures par saison */}
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-700 mb-3">Cultures par saison</h3>
                        
                        {/* Printemps */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-800">🌱</span>
                            <h4 className="font-medium text-green-800">Printemps</h4>
                          </div>
                          <div className="space-y-3">
                            {getCropsBySeason("Printemps").map((crop) => {
                              // Utilisation de la fonction calculateProfitability qui prend en compte les repousses
                              const profitPerDay = calculateProfitability(crop);
                              
                              // Comptage des préférences
                              const likes = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const loves = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id}
                                  crop={crop}
                                  profit={profitPerDay}
                                  likesCount={likes}
                                  lovesCount={loves}
                                />
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Été */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800">☀️</span>
                            <h4 className="font-medium text-yellow-800">Été</h4>
                          </div>
                          <div className="space-y-3">
                            {getCropsBySeason("Été").map((crop) => {
                              // Utilisation de la fonction calculateProfitability qui prend en compte les repousses
                              const profitPerDay = calculateProfitability(crop);
                              
                              // Comptage des préférences
                              const likes = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const loves = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id}
                                  crop={crop}
                                  profit={profitPerDay}
                                  likesCount={likes}
                                  lovesCount={loves}
                                />
                              );
                            })}
                            {getCropsBySeason("Été").length === 0 && (
                              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-500">Aucune culture d'été ajoutée pour le moment.</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Automne */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-100 text-orange-800">🍂</span>
                            <h4 className="font-medium text-orange-800">Automne</h4>
                          </div>
                          <div className="space-y-3">
                            {getCropsBySeason("Automne").map((crop) => {
                              // Utilisation de la fonction calculateProfitability qui prend en compte les repousses
                              const profitPerDay = calculateProfitability(crop);
                              
                              // Comptage des préférences
                              const likes = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const loves = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id}
                                  crop={crop}
                                  profit={profitPerDay}
                                  likesCount={likes}
                                  lovesCount={loves}
                                />
                              );
                            })}
                            {getCropsBySeason("Automne").length === 0 && (
                              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-500">Aucune culture d'automne ajoutée pour le moment.</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Hiver */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">❄️</span>
                            <h4 className="font-medium text-blue-800">Hiver</h4>
                          </div>
                          <div className="space-y-3">
                            {getCropsBySeason("Hiver").map((crop) => {
                              // Utilisation de la fonction calculateProfitability qui prend en compte les repousses
                              const profitPerDay = calculateProfitability(crop);
                              
                              // Comptage des préférences
                              const likes = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const loves = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id}
                                  crop={crop}
                                  profit={profitPerDay}
                                  likesCount={likes}
                                  lovesCount={loves}
                                />
                              );
                            })}
                            {getCropsBySeason("Hiver").length === 0 && (
                              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-500">Aucune culture d'hiver ajoutée pour le moment.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      
                        {/* Bouton Ajouter plus de cultures */}
                        <Button className="w-full mt-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-md transition-colors flex items-center justify-center gap-2">
                          <Plus className="h-4 w-4" />
                          <span>Ajouter plus de cultures</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Contenu de l'onglet Poissons */}
                  <TabsContent value="fish">
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-blue-400 mb-3">
                        <div className="text-5xl mx-auto">🐟</div>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Encyclopédie de poissons</h3>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Cette section répertoriera tous les poissons que vous pouvez attraper à Coral Island, avec leur emplacement, saison et prix de vente.
                      </p>
                      <Button className="mt-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md py-2 px-4 transition-colors inline-flex items-center">
                        <span>À venir prochainement</span>
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Contenu de l'onglet Animaux */}
                  <TabsContent value="animals">
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-amber-400 mb-3">
                        <div className="text-5xl mx-auto">🐄</div>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Animaux de la ferme</h3>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Cette section contiendra des informations sur les animaux de la ferme, leur prix d'achat, ce qu'ils produisent et comment prendre soin d'eux.
                      </p>
                      <Button className="mt-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md py-2 px-4 transition-colors inline-flex items-center">
                        <span>À venir prochainement</span>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
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