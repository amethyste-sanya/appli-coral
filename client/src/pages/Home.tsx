import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Anchor, Building2, CheckCircle, Circle, Plus, Star, Ungroup, Calendar, Hammer, ArrowRight, Search, Info, Heart, Trash, X, CalendarDays, Clock, Sparkles, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Recipe, getRecipesByCategory } from "@/lib/recipes";
import { Crop, getAllCrops, getCropsBySeason, calculateProfitability } from "@/lib/crops";
import { getAllVillagers, getVillagersBySeason, getVillagersByLove } from "@/lib/villagers";
import { PresetQuest, getAllPresetQuests, getPresetQuestsByCategory } from "@/lib/presetQuests";

export default function Home() {
  // States pour les données
  const [tab, setTab] = useState("checklist");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isAddingQuest, setIsAddingQuest] = useState(false);
  const [newQuestTitle, setNewQuestTitle] = useState("");
  const [newQuestDescription, setNewQuestDescription] = useState("");
  const [newQuestCategory, setNewQuestCategory] = useState<"main" | "secondary" | "seasonal">("secondary");
  const [newQuestTotal, setNewQuestTotal] = useState(1);
  const [newQuestObjectives, setNewQuestObjectives] = useState("");
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isQuestLibraryOpen, setIsQuestLibraryOpen] = useState(false);
  const [currentQuestForEdit, setCurrentQuestForEdit] = useState<Quest | null>(null);
  const [filterSaison, setFilterSaison] = useState<string>("all");
  const [expandedVillagers, setExpandedVillagers] = useState<{[key: string]: boolean}>({});
  const [villagerHearts, setVillagerHearts] = useState<{[key: string]: number}>({});
  
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        done: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(quest => quest.id !== id));
  };

  const addQuest = () => {
    if (newQuestTitle.trim()) {
      const objectives = newQuestObjectives
        .split('\n')
        .filter(objective => objective.trim() !== '')
        .map(objective => ({
          text: objective,
          completed: false
        }));

      const newQuestItem: Quest = {
        id: Date.now(),
        title: newQuestTitle,
        description: newQuestDescription,
        category: newQuestCategory,
        completed: false,
        current: 0,
        total: newQuestTotal,
        objectives: objectives.length > 0 ? objectives : undefined
      };

      setQuests([...quests, newQuestItem]);
      setNewQuestTitle("");
      setNewQuestDescription("");
      setNewQuestCategory("secondary");
      setNewQuestTotal(1);
      setNewQuestObjectives("");
      setIsAddingQuest(false);
    }
  };

  const updateQuest = (quest: Quest) => {
    setQuests(quests.map(q => q.id === quest.id ? quest : q));
  };

  const incrementQuestProgress = (id: number) => {
    setQuests(
      quests.map((quest) =>
        quest.id === id ? 
          { 
            ...quest, 
            current: quest.current < quest.total ? quest.current + 1 : quest.total,
            completed: quest.current + 1 >= quest.total
          } : quest
      )
    );
  };

  const decrementQuestProgress = (id: number) => {
    setQuests(
      quests.map((quest) =>
        quest.id === id ? 
          { 
            ...quest, 
            current: quest.current > 0 ? quest.current - 1 : 0,
            completed: false
          } : quest
      )
    );
  };

  const toggleQuestStatus = (id: number) => {
    setQuests(
      quests.map((quest) =>
        quest.id === id ? 
          { 
            ...quest, 
            completed: !quest.completed,
            current: !quest.completed ? quest.total : quest.current
          } : quest
      )
    );
  };

  const toggleQuestObjective = (questId: number, objectiveIndex: number) => {
    setQuests(
      quests.map((quest) => {
        if (quest.id === questId && quest.objectives) {
          const updatedObjectives = [...quest.objectives];
          updatedObjectives[objectiveIndex] = {
            ...updatedObjectives[objectiveIndex],
            completed: !updatedObjectives[objectiveIndex].completed
          };
          
          // Calcule le nombre d'objectifs complétés
          const completedCount = updatedObjectives.filter(obj => obj.completed).length;
          const allCompleted = completedCount === updatedObjectives.length;
          
          return {
            ...quest,
            objectives: updatedObjectives,
            completed: allCompleted,
            current: completedCount
          };
        }
        return quest;
      })
    );
  };

  const deleteQuest = (id: number) => {
    setQuests(quests.filter(quest => quest.id !== id));
  };

  const startEditQuest = (quest: Quest) => {
    setCurrentQuestForEdit(quest);
  };

  const saveEditQuest = () => {
    if (currentQuestForEdit) {
      updateQuest(currentQuestForEdit);
      setCurrentQuestForEdit(null);
    }
  };

  const cancelEditQuest = () => {
    setCurrentQuestForEdit(null);
  };

  // Fonction pour convertir un tableau de strings en tableau d'objectifs
  const convertStringsToObjectives = (objectives: string[]): QuestObjective[] => {
    return objectives.map(obj => ({ text: obj, completed: false }));
  };

  // Fonction pour créer une quête à partir d'un préréglage
  const createQuestFromPreset = (presetQuest: PresetQuest): Quest => {
    // Convertit les objectifs si présents
    const objectives = presetQuest.objectives 
      ? convertStringsToObjectives(presetQuest.objectives)
      : undefined;

    // Crée l'objet quête
    const quest: Quest = {
      id: Date.now(),
      title: presetQuest.title,
      description: presetQuest.description,
      category: presetQuest.category,
      completed: false,
      current: 0,
      total: presetQuest.total,
      objectives
    };

    return quest;
  };

  // Catégories d'artisanat
  const craftingCategories: CraftingCategory[] = [
    { id: "tools", name: "Outils", icon: <Hammer className="h-5 w-5" />, color: "bg-zinc-100 text-zinc-800", count: getRecipesByCategory("tools").length },
    { id: "farming", name: "Agriculture", icon: <div className="text-lime-600">🌱</div>, color: "bg-lime-100 text-lime-800", count: getRecipesByCategory("farming").length },
    { id: "furniture", name: "Meubles", icon: <div className="text-amber-600">🪑</div>, color: "bg-amber-100 text-amber-800", count: getRecipesByCategory("furniture").length },
    { id: "fabrics", name: "Tissus", icon: <div className="text-indigo-600">🧵</div>, color: "bg-indigo-100 text-indigo-800", count: getRecipesByCategory("fabrics").length },
    { id: "cooking", name: "Cuisine", icon: <div className="text-orange-600">🍲</div>, color: "bg-orange-100 text-orange-800", count: getRecipesByCategory("cooking").length },
    { id: "alchemy", name: "Alchimie", icon: <div className="text-purple-600">⚗️</div>, color: "bg-purple-100 text-purple-800", count: getRecipesByCategory("alchemy").length },
  ];

  // Fonction pour obtenir les classes CSS en fonction de la catégorie
  const getCategoryClasses = (category: CraftingCategory) => {
    return `flex items-center gap-2 p-2 rounded-lg ${category.color} hover:bg-opacity-80 transition-all`;
  };
  
  // État pour la catégorie d'artisanat sélectionnée
  const [selectedCraftingCategory, setSelectedCraftingCategory] = useState(craftingCategories[0].id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-amber-700">Coral Island Companion</h1>
      
      <Tabs value={tab} onValueChange={setTab} className="bg-white p-6 rounded-xl border shadow">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="checklist">Tâches</TabsTrigger>
          <TabsTrigger value="quests">Quêtes</TabsTrigger>
          <TabsTrigger value="relations">Relations</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checklist">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une tâche..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <Button onClick={addTask}>Ajouter</Button>
            </div>
            
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between border rounded p-3 bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={task.done}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <span className={task.done ? "line-through text-gray-500" : ""}>
                      {task.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  Aucune tâche pour le moment
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="quests">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Quêtes en cours</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsQuestLibraryOpen(true)}
              >
                <Search className="h-4 w-4 mr-1" /> Bibliothèque de quêtes
              </Button>
              
              <Dialog open={isQuestLibraryOpen} onOpenChange={setIsQuestLibraryOpen}>
                <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Bibliothèque de quêtes</DialogTitle>
                    <DialogDescription>
                      Parcourez les quêtes disponibles et ajoutez-les à votre suivi.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="flex-1 overflow-y-auto pr-2">
                    <Tabs defaultValue="main">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="main">Quêtes principales</TabsTrigger>
                        <TabsTrigger value="secondary">Quêtes secondaires</TabsTrigger>
                        <TabsTrigger value="seasonal">Quêtes saisonnières</TabsTrigger>
                      </TabsList>

                      <TabsContent value="main">
                        <div className="space-y-4">
                          {/* Section Ville - Restaurée avec les nouvelles quêtes */}
                          <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                              <Building2 className="h-4 w-4 mr-2" />
                              Ville
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("main")
                                .filter(quest => 
                                  ["debuter", "nouveau-fermier", "se-faire-des-amis", "home-sweet-home", 
                                   "visitez-beach-shack", "tout-ou-rien", "fondre-pour-progres", "extracteur", 
                                   "extraction-essence", "produits-locaux", "nouvel-objectif-rang-s", "attraction-starlet-town"]
                                  .includes(quest.id))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="flex justify-between mb-2">
                                      <h4 className="font-medium text-gray-800">{presetQuest.title}</h4>
                                      <Button
                                        onClick={() => {
                                          const newQuestItem: Quest = {
                                            id: Date.now(),
                                            title: presetQuest.title,
                                            description: presetQuest.description,
                                            category: presetQuest.category,
                                            completed: false,
                                            current: 0,
                                            total: presetQuest.total,
                                            objectives: presetQuest.objectives ? convertStringsToObjectives(presetQuest.objectives) : undefined
                                          };
                                          setQuests([...quests, newQuestItem]);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="add-button-blue"
                                        disabled={quests.some(q => q.title === presetQuest.title)}
                                      >
                                        {quests.some(q => q.title === presetQuest.title) ? "Déjà ajouté" : "Ajouter"}
                                      </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{presetQuest.description}</p>
                                    {presetQuest.objectives && presetQuest.objectives.length > 0 && (
                                      <div className="mt-2">
                                        <span className="text-xs font-medium text-gray-600">Objectifs:</span>
                                        <ul className="list-disc pl-5 text-xs text-gray-600 mt-1 space-y-1">
                                          {presetQuest.objectives.map((obj, idx) => (
                                            <li key={idx}>{obj}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {presetQuest.reward && (
                                      <div className="mt-2 text-xs text-amber-600">
                                        <span className="font-medium">Récompense:</span> {presetQuest.reward}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                          
                          {/* Section Géants */}
                          <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
                            <h4 className="font-medium text-amber-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 flex items-center justify-center text-amber-600">🏔️</div>
                              Géants
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("main")
                                .filter(quest => 
                                  ["geant-petrifie-1", "village-geants", "geant-petrifie-2", "geant-petrifie-3", 
                                   "geant-petrifie-4", "coupable-petrifie", "dernier-geant", "peinture-murale-gardien"]
                                  .includes(quest.id))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-amber-200">
                                    <div className="flex justify-between mb-2">
                                      <h4 className="font-medium text-gray-800">{presetQuest.title}</h4>
                                      <Button
                                        onClick={() => {
                                          const newQuestItem: Quest = {
                                            id: Date.now(),
                                            title: presetQuest.title,
                                            description: presetQuest.description,
                                            category: presetQuest.category,
                                            completed: false,
                                            current: 0,
                                            total: presetQuest.total,
                                            objectives: presetQuest.objectives ? convertStringsToObjectives(presetQuest.objectives) : undefined
                                          };
                                          setQuests([...quests, newQuestItem]);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="add-button-blue"
                                        disabled={quests.some(q => q.title === presetQuest.title)}
                                      >
                                        {quests.some(q => q.title === presetQuest.title) ? "Déjà ajouté" : "Ajouter"}
                                      </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{presetQuest.description}</p>
                                    {presetQuest.objectives && presetQuest.objectives.length > 0 && (
                                      <div className="mt-2">
                                        <span className="text-xs font-medium text-gray-600">Objectifs:</span>
                                        <ul className="list-disc pl-5 text-xs text-gray-600 mt-1 space-y-1">
                                          {presetQuest.objectives.map((obj, idx) => (
                                            <li key={idx}>{obj}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {presetQuest.reward && (
                                      <div className="mt-2 text-xs text-amber-600">
                                        <span className="font-medium">Récompense:</span> {presetQuest.reward}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                          
                          {/* Section Océan */}
                          <div className="bg-blue-100 rounded-lg p-4 border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                              <Anchor className="h-4 w-4 mr-2" />
                              Océan
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("main")
                                .filter(quest => 
                                  ["mysteres-ocean"]
                                  .includes(quest.id))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-blue-200">
                                    <div className="flex justify-between mb-2">
                                      <h4 className="font-medium text-gray-800">{presetQuest.title}</h4>
                                      <Button
                                        onClick={() => {
                                          const newQuestItem: Quest = {
                                            id: Date.now(),
                                            title: presetQuest.title,
                                            description: presetQuest.description,
                                            category: presetQuest.category,
                                            completed: false,
                                            current: 0,
                                            total: presetQuest.total,
                                            objectives: presetQuest.objectives ? convertStringsToObjectives(presetQuest.objectives) : undefined
                                          };
                                          setQuests([...quests, newQuestItem]);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="add-button-blue"
                                        disabled={quests.some(q => q.title === presetQuest.title)}
                                      >
                                        {quests.some(q => q.title === presetQuest.title) ? "Déjà ajouté" : "Ajouter"}
                                      </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{presetQuest.description}</p>
                                    {presetQuest.objectives && presetQuest.objectives.length > 0 && (
                                      <div className="mt-2">
                                        <span className="text-xs font-medium text-gray-600">Objectifs:</span>
                                        <ul className="list-disc pl-5 text-xs text-gray-600 mt-1 space-y-1">
                                          {presetQuest.objectives.map((obj, idx) => (
                                            <li key={idx}>{obj}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {presetQuest.reward && (
                                      <div className="mt-2 text-xs text-amber-600">
                                        <span className="font-medium">Récompense:</span> {presetQuest.reward}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                          
                          {/* Section Musée */}
                          <div className="bg-purple-100 rounded-lg p-4 border border-purple-200">
                            <h4 className="font-medium text-purple-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 flex items-center justify-center text-purple-600">🏛️</div>
                              Musée
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("main")
                                .filter(quest => 
                                  [""]
                                  .includes(quest.id))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-purple-200">
                                    <div className="flex justify-between mb-2">
                                      <h4 className="font-medium text-gray-800">{presetQuest.title}</h4>
                                      <Button
                                        onClick={() => {
                                          const newQuestItem: Quest = {
                                            id: Date.now(),
                                            title: presetQuest.title,
                                            description: presetQuest.description,
                                            category: presetQuest.category,
                                            completed: false,
                                            current: 0,
                                            total: presetQuest.total,
                                            objectives: presetQuest.objectives ? convertStringsToObjectives(presetQuest.objectives) : undefined
                                          };
                                          setQuests([...quests, newQuestItem]);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="add-button-blue"
                                        disabled={quests.some(q => q.title === presetQuest.title)}
                                      >
                                        {quests.some(q => q.title === presetQuest.title) ? "Déjà ajouté" : "Ajouter"}
                                      </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{presetQuest.description}</p>
                                    {presetQuest.objectives && presetQuest.objectives.length > 0 && (
                                      <div className="mt-2">
                                        <span className="text-xs font-medium text-gray-600">Objectifs:</span>
                                        <ul className="list-disc pl-5 text-xs text-gray-600 mt-1 space-y-1">
                                          {presetQuest.objectives.map((obj, idx) => (
                                            <li key={idx}>{obj}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {presetQuest.reward && (
                                      <div className="mt-2 text-xs text-amber-600">
                                        <span className="font-medium">Récompense:</span> {presetQuest.reward}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="secondary">
                        <div className="space-y-4">
                          {getPresetQuestsByCategory("secondary").map((presetQuest) => (
                            <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium text-gray-800">{presetQuest.title}</h4>
                                <Button
                                  onClick={() => {
                                    const newQuestItem: Quest = {
                                      id: Date.now(),
                                      title: presetQuest.title,
                                      description: presetQuest.description,
                                      category: presetQuest.category,
                                      completed: false,
                                      current: 0,
                                      total: presetQuest.total,
                                      objectives: presetQuest.objectives ? convertStringsToObjectives(presetQuest.objectives) : undefined
                                    };
                                    setQuests([...quests, newQuestItem]);
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="add-button-blue"
                                  disabled={quests.some(q => q.title === presetQuest.title)}
                                >
                                  {quests.some(q => q.title === presetQuest.title) ? "Déjà ajouté" : "Ajouter"}
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{presetQuest.description}</p>
                              {presetQuest.objectives && presetQuest.objectives.length > 0 && (
                                <div className="mt-2">
                                  <span className="text-xs font-medium text-gray-600">Objectifs:</span>
                                  <ul className="list-disc pl-5 text-xs text-gray-600 mt-1 space-y-1">
                                    {presetQuest.objectives.map((obj, idx) => (
                                      <li key={idx}>{obj}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {presetQuest.reward && (
                                <div className="mt-2 text-xs text-amber-600">
                                  <span className="font-medium">Récompense:</span> {presetQuest.reward}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="seasonal">
                        <div className="space-y-4">
                          {getPresetQuestsByCategory("seasonal").map((presetQuest) => (
                            <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex justify-between mb-2">
                                <h4 className="font-medium text-gray-800">{presetQuest.title}</h4>
                                <Button
                                  onClick={() => {
                                    const newQuestItem: Quest = {
                                      id: Date.now(),
                                      title: presetQuest.title,
                                      description: presetQuest.description,
                                      category: presetQuest.category,
                                      completed: false,
                                      current: 0,
                                      total: presetQuest.total,
                                      objectives: presetQuest.objectives ? convertStringsToObjectives(presetQuest.objectives) : undefined
                                    };
                                    setQuests([...quests, newQuestItem]);
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="add-button-blue"
                                  disabled={quests.some(q => q.title === presetQuest.title)}
                                >
                                  {quests.some(q => q.title === presetQuest.title) ? "Déjà ajouté" : "Ajouter"}
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{presetQuest.description}</p>
                              {presetQuest.objectives && presetQuest.objectives.length > 0 && (
                                <div className="mt-2">
                                  <span className="text-xs font-medium text-gray-600">Objectifs:</span>
                                  <ul className="list-disc pl-5 text-xs text-gray-600 mt-1 space-y-1">
                                    {presetQuest.objectives.map((obj, idx) => (
                                      <li key={idx}>{obj}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {presetQuest.reward && (
                                <div className="mt-2 text-xs text-amber-600">
                                  <span className="font-medium">Récompense:</span> {presetQuest.reward}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                onClick={() => setIsAddingQuest(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-1" /> Nouvelle quête
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center text-amber-700">
                <Star className="h-5 w-5 mr-1 text-amber-500" /> Quêtes principales
              </h3>
              {quests.filter(quest => quest.category === "main" && !quest.completed).length > 0 && (
                <div className="space-y-3 mb-4">
                  {quests
                    .filter(quest => quest.category === "main" && !quest.completed)
                    .map(quest => (
                      <Card key={quest.id} className="border-amber-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <h4 className="font-medium mr-2">{quest.title}</h4>
                                {quest.current === quest.total ? (
                                  <Badge className="bg-green-500">Terminé</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-amber-600 border-amber-200">
                                    {quest.current}/{quest.total}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
                            </div>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => decrementQuestProgress(quest.id)}
                                disabled={quest.current === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => incrementQuestProgress(quest.id)}
                                disabled={quest.current === quest.total}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteQuest(quest.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {quest.objectives && quest.objectives.length > 0 && (
                            <div className="mt-3 space-y-1">
                              {quest.objectives.map((objective, index) => (
                                <div key={index} className="flex items-center">
                                  <Checkbox 
                                    checked={objective.completed}
                                    onCheckedChange={() => toggleQuestObjective(quest.id, index)}
                                    className="mr-2"
                                  />
                                  <span className={`text-sm ${objective.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
                                    {objective.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
              {quests.filter(quest => quest.category === "main" && !quest.completed).length === 0 && (
                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
                  Aucune quête principale en cours
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center text-green-700">
                <Circle className="h-5 w-5 mr-1 text-green-500" /> Quêtes secondaires
              </h3>
              {quests.filter(quest => quest.category === "secondary" && !quest.completed).length > 0 && (
                <div className="space-y-3 mb-4">
                  {quests
                    .filter(quest => quest.category === "secondary" && !quest.completed)
                    .map(quest => (
                      <Card key={quest.id} className="border-green-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <h4 className="font-medium mr-2">{quest.title}</h4>
                                {quest.current === quest.total ? (
                                  <Badge className="bg-green-500">Terminé</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-green-600 border-green-200">
                                    {quest.current}/{quest.total}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
                            </div>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => decrementQuestProgress(quest.id)}
                                disabled={quest.current === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => incrementQuestProgress(quest.id)}
                                disabled={quest.current === quest.total}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteQuest(quest.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {quest.objectives && quest.objectives.length > 0 && (
                            <div className="mt-3 space-y-1">
                              {quest.objectives.map((objective, index) => (
                                <div key={index} className="flex items-center">
                                  <Checkbox 
                                    checked={objective.completed}
                                    onCheckedChange={() => toggleQuestObjective(quest.id, index)}
                                    className="mr-2"
                                  />
                                  <span className={`text-sm ${objective.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
                                    {objective.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
              {quests.filter(quest => quest.category === "secondary" && !quest.completed).length === 0 && (
                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
                  Aucune quête secondaire en cours
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2 flex items-center text-blue-700">
                <Calendar className="h-5 w-5 mr-1 text-blue-500" /> Quêtes saisonnières
              </h3>
              {quests.filter(quest => quest.category === "seasonal" && !quest.completed).length > 0 && (
                <div className="space-y-3 mb-4">
                  {quests
                    .filter(quest => quest.category === "seasonal" && !quest.completed)
                    .map(quest => (
                      <Card key={quest.id} className="border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <h4 className="font-medium mr-2">{quest.title}</h4>
                                {quest.current === quest.total ? (
                                  <Badge className="bg-green-500">Terminé</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                                    {quest.current}/{quest.total}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{quest.description}</p>
                            </div>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => decrementQuestProgress(quest.id)}
                                disabled={quest.current === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => incrementQuestProgress(quest.id)}
                                disabled={quest.current === quest.total}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteQuest(quest.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {quest.objectives && quest.objectives.length > 0 && (
                            <div className="mt-3 space-y-1">
                              {quest.objectives.map((objective, index) => (
                                <div key={index} className="flex items-center">
                                  <Checkbox 
                                    checked={objective.completed}
                                    onCheckedChange={() => toggleQuestObjective(quest.id, index)}
                                    className="mr-2"
                                  />
                                  <span className={`text-sm ${objective.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
                                    {objective.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
              {quests.filter(quest => quest.category === "seasonal" && !quest.completed).length === 0 && (
                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
                  Aucune quête saisonnière en cours
                </div>
              )}
            </div>
            
            {quests.filter(quest => quest.completed).length > 0 && (
              <div>
                <h3 className="font-medium text-lg mb-2 flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 mr-1 text-green-500" /> Quêtes terminées
                </h3>
                <div className="space-y-3 mb-4">
                  {quests
                    .filter(quest => quest.completed)
                    .map(quest => (
                      <Card key={quest.id} className="border-gray-200 bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <h4 className="font-medium mr-2 text-gray-700">{quest.title}</h4>
                                <Badge className="bg-green-500">Terminé</Badge>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">{quest.description}</p>
                            </div>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleQuestStatus(quest.id)}
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => deleteQuest(quest.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
          
          <Dialog open={isAddingQuest} onOpenChange={setIsAddingQuest}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle quête</DialogTitle>
                <DialogDescription>
                  Remplissez les détails de la quête que vous souhaitez suivre
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titre</label>
                  <Input
                    value={newQuestTitle}
                    onChange={(e) => setNewQuestTitle(e.target.value)}
                    placeholder="Nom de la quête"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newQuestDescription}
                    onChange={(e) => setNewQuestDescription(e.target.value)}
                    placeholder="Description de la quête"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Catégorie</label>
                    <Select 
                      value={newQuestCategory} 
                      onValueChange={(value) => setNewQuestCategory(value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Principale</SelectItem>
                        <SelectItem value="secondary">Secondaire</SelectItem>
                        <SelectItem value="seasonal">Saisonnière</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Total</label>
                    <Input
                      type="number"
                      min="1"
                      value={newQuestTotal}
                      onChange={(e) => setNewQuestTotal(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Objectifs (un par ligne)</label>
                  <Textarea
                    value={newQuestObjectives}
                    onChange={(e) => setNewQuestObjectives(e.target.value)}
                    placeholder="Listez les objectifs, un par ligne"
                    className="h-24"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingQuest(false)}>
                  Annuler
                </Button>
                <Button onClick={addQuest}>
                  Ajouter la quête
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={!!currentQuestForEdit} onOpenChange={(open) => !open && setCurrentQuestForEdit(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier la quête</DialogTitle>
                <DialogDescription>
                  Modifiez les détails de cette quête
                </DialogDescription>
              </DialogHeader>
              
              {currentQuestForEdit && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre</label>
                    <Input
                      value={currentQuestForEdit.title}
                      onChange={(e) => setCurrentQuestForEdit({...currentQuestForEdit, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={currentQuestForEdit.description}
                      onChange={(e) => setCurrentQuestForEdit({...currentQuestForEdit, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Catégorie</label>
                      <Select 
                        value={currentQuestForEdit.category} 
                        onValueChange={(value) => setCurrentQuestForEdit({...currentQuestForEdit, category: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Principale</SelectItem>
                          <SelectItem value="secondary">Secondaire</SelectItem>
                          <SelectItem value="seasonal">Saisonnière</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Total</label>
                      <Input
                        type="number"
                        min="1"
                        value={currentQuestForEdit.total}
                        onChange={(e) => setCurrentQuestForEdit({...currentQuestForEdit, total: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={cancelEditQuest}>
                  Annuler
                </Button>
                <Button onClick={saveEditQuest}>
                  Enregistrer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="relations">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Relations avec les villageois</h2>
              <Select value={filterSaison} onValueChange={setFilterSaison}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les villageois</SelectItem>
                  <SelectItem value="spring">Printemps</SelectItem>
                  <SelectItem value="summer">Été</SelectItem>
                  <SelectItem value="fall">Automne</SelectItem>
                  <SelectItem value="winter">Hiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(filterSaison === "all" ? getAllVillagers() : getVillagersBySeason(filterSaison))
                .map(villager => (
                  <Card key={villager.id} className="overflow-hidden border-neutral-200">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-lg">{villager.name}</h3>
                        {villager.romanceable && (
                          <div className="text-rose-500 flex items-center">
                            <Heart className="h-4 w-4 fill-rose-500" />
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <CalendarDays className="h-3.5 w-3.5 mr-1" />
                        {villager.birthday.season}, jour {villager.birthday.day}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {villager.occupation}
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-600">Relation</span>
                          <span className="text-xs text-rose-500 font-medium">
                            {villagerHearts[villager.id] || 0} / 15
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(15)].map((_, i) => (
                            <button 
                              key={i}
                              onClick={() => setVillagerHearts({...villagerHearts, [villager.id]: i + 1})}
                              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                (villagerHearts[villager.id] || 0) >= i + 1 
                                  ? "text-rose-500 hover:text-rose-600" 
                                  : "text-gray-300 hover:text-gray-400"
                              } transition-colors`}
                              title={`${i + 1} cœurs`}
                            >
                              <Heart className={`w-3 h-3 ${(villagerHearts[villager.id] || 0) >= i + 1 ? "fill-current" : ""}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {villager.gifts.love.length > 0 && (
                        <div className="mt-3">
                          <button 
                            onClick={() => setExpandedVillagers({...expandedVillagers, [villager.id]: !expandedVillagers[villager.id]})} 
                            className="flex items-center text-sm text-rose-600 font-medium w-full justify-between bg-rose-50 px-2 py-1 rounded hover:bg-rose-100 transition-colors"
                          >
                            <span className="flex items-center">
                              <Heart className="h-3.5 w-3.5 mr-1 fill-rose-500" />
                              Cadeaux préférés ({villager.gifts.love.length})
                            </span>
                            {expandedVillagers[villager.id] ? (
                              <span className="text-xs">▼</span>
                            ) : (
                              <span className="text-xs">▶</span>
                            )}
                          </button>
                          
                          {expandedVillagers[villager.id] && (
                            <div className="flex flex-wrap gap-1 mt-1 animate-fadeIn">
                              {villager.gifts.love.map((gift, index) => (
                                <Badge 
                                  key={index} 
                                  className="bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200"
                                >
                                  {gift.item}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Événements et festivals</h2>
              <p className="text-gray-600 mt-1">Calendrier des événements de l'année</p>
            </div>
            
            <Card className="border-green-200">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg text-green-700 mb-1">Printemps</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                    <div className="text-center">
                      <span className="inline-block bg-green-100 text-green-700 rounded px-2 py-1 font-medium">Jour 1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Nouvel An</h4>
                      <p className="text-sm text-gray-600">Célébrez le nouvel an avec les villageois à la plage.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                    <div className="text-center">
                      <span className="inline-block bg-green-100 text-green-700 rounded px-2 py-1 font-medium">Jour 14</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Festival de l'œuf</h4>
                      <p className="text-sm text-gray-600">Participez à la chasse aux œufs dans le village.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-200">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg text-amber-700 mb-1">Été</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                    <div className="text-center">
                      <span className="inline-block bg-amber-100 text-amber-700 rounded px-2 py-1 font-medium">Jour 7</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Festival de la plage</h4>
                      <p className="text-sm text-gray-600">Concours de natation et stands de jeux sur la plage.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="journal">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Journal du fermier</h2>
          </div>
          
          <Tabs defaultValue="crafting">
            <TabsList className="mb-4">
              <TabsTrigger value="crafting">Artisanat</TabsTrigger>
              <TabsTrigger value="crops">Cultures</TabsTrigger>
              <TabsTrigger value="fish">Poissons</TabsTrigger>
              <TabsTrigger value="animals">Animaux</TabsTrigger>
            </TabsList>
            
            <TabsContent value="crafting">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {craftingCategories.map(category => (
                  <button
                    key={category.id}
                    className={getCategoryClasses(category)}
                    onClick={() => setSelectedCraftingCategory(category.id)}
                  >
                    {category.icon}
                    <div className="flex-1">{category.name}</div>
                    <span className="text-xs rounded-full px-2 py-0.5 bg-white bg-opacity-50">{category.count}</span>
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                {getRecipesByCategory(selectedCraftingCategory).map((recipe: Recipe) => (
                  <Card key={recipe.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{recipe.name}</h3>
                        <Badge variant="outline" className="ml-2">
                          Niveau {recipe.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {recipe.description || "Aucune description disponible"}
                      </p>
                      
                      <div className="mt-3">
                        <span className="text-sm font-medium">Matériaux requis:</span>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          {recipe.materials.map((material, index) => (
                            <div key={index} className="flex items-center">
                              <ArrowRight className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="text-sm">{material.quantity}x {material.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {recipe.sellPrice && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Prix de vente:</span> {recipe.sellPrice} pièces
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="crops">
              <div className="mb-4 flex justify-between">
                <Select value={filterSaison} onValueChange={setFilterSaison}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par saison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les saisons</SelectItem>
                    <SelectItem value="Printemps">Printemps</SelectItem>
                    <SelectItem value="Été">Été</SelectItem>
                    <SelectItem value="Automne">Automne</SelectItem>
                    <SelectItem value="Hiver">Hiver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(filterSaison === "all" ? getAllCrops() : getCropsBySeason(filterSaison))
                  .map(crop => {
                    const profit = calculateProfitability(crop);
                    const likesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                    const lovesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                    
                    return (
                      <Card key={crop.id} className="overflow-hidden">
                        <div className="h-32 bg-gray-50 border-b flex items-center justify-center">
                          {crop.imagePath && (
                            <img 
                              src={crop.imagePath} 
                              alt={crop.name} 
                              className="h-full w-full object-contain p-2"
                            />
                          )}
                          {!crop.imagePath && (
                            <div className="text-5xl mx-auto">🌱</div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{crop.name}</h3>
                            <Badge>{crop.season}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {crop.category}
                          </p>
                          
                          <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                            <div>
                              <span className="block text-gray-500">Croissance</span>
                              <span className="font-medium">{crop.growthTime} jours</span>
                            </div>
                            <div>
                              <span className="block text-gray-500">Prix</span>
                              <span className="font-medium">{crop.seedPrice} pièces</span>
                            </div>
                            <div>
                              <span className="block text-gray-500">Profit</span>
                              <span className={`font-medium ${profit > 100 ? "text-green-600" : ""}`}>
                                {profit} pièces
                              </span>
                            </div>
                          </div>
                          
                          {(likesCount > 0 || lovesCount > 0) && (
                            <div className="flex gap-2 mt-2 text-xs">
                              {lovesCount > 0 && (
                                <div className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1 fill-rose-500 text-rose-500" />
                                  <span className="text-rose-600 font-medium">{lovesCount}</span>
                                </div>
                              )}
                              {likesCount > 0 && (
                                <div className="flex items-center">
                                  <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                                  <span className="text-amber-600 font-medium">{likesCount}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </TabsContent>
            
            <TabsContent value="fish">
              <div className="flex items-center justify-center py-12 px-4 border rounded-lg">
                <div className="text-center">
                  <div className="text-5xl mx-auto">🐟</div>
                  <h3 className="mt-4 text-xl font-medium">Encyclopédie des poissons</h3>
                  <p className="mt-2 text-gray-600">
                    Cette fonctionnalité sera disponible dans une prochaine mise à jour !
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="animals">
              <div className="flex items-center justify-center py-12 px-4 border rounded-lg">
                <div className="text-center">
                  <div className="text-5xl mx-auto">🐄</div>
                  <h3 className="mt-4 text-xl font-medium">Encyclopédie des animaux</h3>
                  <p className="mt-2 text-gray-600">
                    Cette fonctionnalité sera disponible dans une prochaine mise à jour !
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type QuestObjective = {
  text: string;
  completed: boolean;
};

type Quest = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: "main" | "secondary" | "seasonal";
  current: number;
  total: number; // Pour les quêtes avec progression comme "3/10 items collectés"
  deadline?: string; // Pour les quêtes saisonnières avec une date limite
  objectives?: QuestObjective[]; // Liste des objectifs spécifiques de la quête avec leur état
};

type CraftingCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
};