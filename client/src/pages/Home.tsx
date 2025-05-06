import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CheckCircle, Circle, Plus, Star, Ungroup, Calendar, Hammer, ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Task type definition
type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [newTask, setNewTask] = useState("");

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
            <TabsTrigger value="crafting" className="py-2 px-4 font-medium text-green-800 hover:bg-green-300 transition-colors data-[state=active]:bg-green-300">
              Artisanat
            </TabsTrigger>
          </TabsList>

          {/* Checklist Tab */}
          <TabsContent value="checklist">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                <div className="space-y-4">
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
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs text-gray-500">Récompense: Graines rares + 500 pièces</span>
                      </div>
                    </div>
                    
                    {/* Event 2 */}
                    <div className="border-l-4 border-blue-500 pl-3 py-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Tournoi de Pêche</h4>
                        <span className="text-sm text-gray-500">Jour 24</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Attrapez le plus gros poisson pour remporter le tournoi annuel.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs text-gray-500">Récompense: Canne à pêche spéciale + Trophée</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <h3 className="font-medium">Été</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Event 3 */}
                    <div className="border-l-4 border-yellow-500 pl-3 py-2 opacity-75">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Festival de la Plage</h4>
                        <span className="text-sm text-gray-500">Jour 12</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Profitez des activités sur la plage et du grand feu d'artifice nocturne.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs text-gray-500">Récompense: Vêtements d'été + Recettes</span>
                      </div>
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
          
          {/* Crafting Tab */}
          <TabsContent value="crafting">
            <Card className="rounded-b-lg shadow-md mt-1">
              <CardContent className="p-5">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-green-800 border-b border-green-100 pb-2">Artisanat</h2>
                  
                  {/* Search and filter */}
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        className="pl-10" 
                        placeholder="Rechercher une recette..." 
                      />
                    </div>
                    <Button variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">
                      Filtrer
                    </Button>
                  </div>
                  
                  {/* Crafting Categories */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-amber-50 rounded-lg border border-amber-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-amber-100 transition-colors">
                      <Hammer className="h-8 w-8 mb-2 text-amber-600" />
                      <h3 className="font-medium text-amber-800">Outils</h3>
                      <p className="text-xs text-amber-600 mt-1">8 recettes</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="h-8 w-8 mb-2 text-blue-600 flex items-center justify-center text-xl">🧵</div>
                      <h3 className="font-medium text-blue-800">Tissus</h3>
                      <p className="text-xs text-blue-600 mt-1">12 recettes</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg border border-green-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-green-100 transition-colors">
                      <div className="h-8 w-8 mb-2 text-green-600 flex items-center justify-center text-xl">🌱</div>
                      <h3 className="font-medium text-green-800">Agriculture</h3>
                      <p className="text-xs text-green-600 mt-1">10 recettes</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg border border-purple-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-purple-100 transition-colors">
                      <div className="h-8 w-8 mb-2 text-purple-600 flex items-center justify-center text-xl">🧪</div>
                      <h3 className="font-medium text-purple-800">Alchimie</h3>
                      <p className="text-xs text-purple-600 mt-1">15 recettes</p>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg border border-red-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-red-100 transition-colors">
                      <div className="h-8 w-8 mb-2 text-red-600 flex items-center justify-center text-xl">🍲</div>
                      <h3 className="font-medium text-red-800">Cuisine</h3>
                      <p className="text-xs text-red-600 mt-1">24 recettes</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="h-8 w-8 mb-2 text-gray-600 flex items-center justify-center text-xl">🪑</div>
                      <h3 className="font-medium text-gray-800">Meubles</h3>
                      <p className="text-xs text-gray-600 mt-1">18 recettes</p>
                    </div>
                  </div>
                  
                  {/* Recent Recipes */}
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
