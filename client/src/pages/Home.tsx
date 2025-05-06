import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Anchor, Building2, CheckCircle, Circle, Plus, Star, Ungroup, Calendar as CalendarIcon, Hammer, ArrowRight, Search, Info, Heart, Trash, X, CalendarDays, Clock, Sparkles, Minus, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Recipe, getRecipesByCategory } from "@/lib/recipes";
import { Crop, getAllCrops, getCropsBySeason, calculateProfitability } from "@/lib/crops";
import { CropCard } from "@/components/CropCard";
import { getAllVillagers, getVillagersBySeason, getVillagersByLove, Villager, villagers } from "@/lib/villagers";
import { PresetQuest, getAllPresetQuests, getPresetQuestsByCategory } from "@/lib/presetQuests";
import { CalendarEvent, EventActivity, getAllEvents, getEventsForDay, hasEvent } from "@/lib/events";

export default function Home() {
  // Tâches journalières régulières
  const dailyTasks = [
    "Arroser les cultures",
    "Vérifier la météo du lendemain",
    "Ramasser les œufs et le lait (si animaux)",
    "Ramasser les produits sauvages (fleurs, champignons)",
    "Vérifier les pièges à crabes",
    "Aller voir les marchands (Sam, Dinda, etc.)",
    "Parler à au moins 5 villageois",
    "Donner un cadeau à un PNJ",
    "Pêcher un peu (selon l'énergie)",
    "Miner pour du minerai ou des géodes",
    "Mettre à jour les machines (compost, four, etc.)"
  ];
  
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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [gameDate, setGameDate] = useState<{season: string; day: number; weekDay?: string}>({
    season: "Printemps", 
    day: 1,
    weekDay: "Lundi"
  });
  
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
    { id: "crops", name: "Cultures", icon: <div className="text-green-600">🌾</div>, color: "bg-green-100 text-green-800", count: getAllCrops().length },
    { id: "tools", name: "Outils", icon: <Hammer className="h-5 w-5" />, color: "bg-zinc-100 text-zinc-800", count: getRecipesByCategory("tools").length },
    { id: "animals", name: "Animaux", icon: <div className="text-yellow-600">🐄</div>, color: "bg-yellow-100 text-yellow-800", count: 0 },
    { id: "fish", name: "Poissons", icon: <div className="text-blue-600">🐟</div>, color: "bg-blue-100 text-blue-800", count: 0 },
    { id: "farming", name: "Agriculture", icon: <div className="text-lime-600">🌱</div>, color: "bg-lime-100 text-lime-800", count: getRecipesByCategory("farming").length },
    { id: "furniture", name: "Meubles", icon: <div className="text-amber-600">🪑</div>, color: "bg-amber-100 text-amber-800", count: getRecipesByCategory("furniture").length },
    { id: "cooking", name: "Cuisine", icon: <div className="text-orange-600">🍲</div>, color: "bg-orange-100 text-orange-800", count: getRecipesByCategory("cooking").length },
  ];

  // Fonction pour obtenir les classes CSS en fonction de la catégorie
  const getCategoryClasses = (category: CraftingCategory) => {
    return `flex items-center gap-2 p-2 rounded-lg ${category.color} hover:bg-opacity-80 transition-all`;
  };
  
  // État pour la catégorie d'artisanat sélectionnée
  const [selectedCraftingCategory, setSelectedCraftingCategory] = useState(craftingCategories[0].id);
  
  // État pour la sous-catégorie de cuisine sélectionnée
  const [selectedCookingSubcategory, setSelectedCookingSubcategory] = useState("");
  
  // Liste des sous-catégories pour l'équipement de cuisine
  const cookingSubcategories = [
    { id: "frying_pan", name: "Poêle à frire", icon: "🍳", color: "bg-amber-100 text-amber-800" },
    { id: "chef_knife", name: "Couteau de chef", icon: "🔪", color: "bg-gray-100 text-gray-800" },
    { id: "oven", name: "Four", icon: "🔥", color: "bg-red-100 text-red-800" },
    { id: "pot", name: "Casserole", icon: "🥘", color: "bg-zinc-100 text-zinc-800" },
    { id: "ceramic_bowl", name: "Bol en céramique", icon: "🥣", color: "bg-purple-100 text-purple-800" },
    { id: "blender", name: "Mixeur", icon: "🥤", color: "bg-blue-100 text-blue-800" },
    { id: "grill", name: "Grill", icon: "♨️", color: "bg-orange-100 text-orange-800" },
    { id: "seasoning_set", name: "Ensemble d'assaisonnement", icon: "🧂", color: "bg-yellow-100 text-yellow-800" },
    { id: "skillet", name: "Poêlon", icon: "🍳", color: "bg-slate-100 text-slate-800" },
  ];
  
  // Recettes par type d'équipement de cuisine
  const cookingRecipes = {
    // Poêle à frire
    frying_pan: [
      { name: "Beignet de banane", ingredients: ["Banane", "Farine", "Huile"] },
      { name: "Chips de betterave", ingredients: ["Betterave", "Huile"] },
      { name: "Falafel", ingredients: ["Pois", "Concombre", "Huile"] },
      { name: "Riz frit", ingredients: ["Riz", "Légume", "Échalote", "Œuf"] },
      { name: "Tempeh frit", ingredients: ["Tempeh", "Huile"] },
      { name: "Chips de chou frisé", ingredients: ["Chou frisé", "Huile de canola"] },
      { name: "Omurice", ingredients: ["Riz", "Œuf", "Ketchup", "Carotte"] },
      { name: "Pad Thaï", ingredients: ["Farine", "Crevette", "Citron", "Légume"] },
      { name: "Peyek", ingredients: ["Chenille", "Amande", "Farine"] },
      { name: "Chips de pomme de terre", ingredients: ["Pomme de terre", "Huile"] },
      { name: "Amandes grillées", ingredients: ["Amande"] },
      { name: "Châtaignes grillées", ingredients: ["Châtaigne"] },
      { name: "Champignons grillés", ingredients: ["Champignon", "Basilic", "Huile d'olive"] },
      { name: "Frites de patate douce", ingredients: ["Patate douce", "Huile"] },
      { name: "Poutine de patate douce", ingredients: ["Patate douce", "Fromage", "Huile"] },
    ],
    
    // Couteau de chef
    chef_knife: [
      { name: "Sandwich au poisson", ingredients: ["Pain", "Laitue", "Échalote", "Poisson"] },
      { name: "Salade fraîche", ingredients: ["Légume"] },
      { name: "Sandwich arc-en-ciel", ingredients: ["Pain", "Tomate", "Légume", "Mayonnaise"] },
      { name: "Sashimi", ingredients: ["Poisson", "Wasabi"] },
      { name: "Sushi", ingredients: ["Poisson", "Riz"] },
      { name: "Boisson à la noix de coco", ingredients: ["Noix de coco"] },
    ],
    
    // Four
    oven: [
      { name: "Tarte aux pommes", ingredients: ["Pomme", "Farine de blé", "Beurre", "Miel"] },
      { name: "Pain", ingredients: ["Farine"] },
      { name: "Croissant au beurre", ingredients: ["Farine", "Lait", "Beurre"] },
      { name: "Muffins aux pépites de chocolat", ingredients: ["Cacao", "Farine", "Œuf"] },
      { name: "Cookies", ingredients: ["Cacao", "Farine", "Beurre"] },
      { name: "Lasagnes d'aubergine", ingredients: ["Aubergine", "Tomate", "Fromage"] },
      { name: "Tarte aux fruits", ingredients: ["Farine de blé", "Sucre", "Fruit x2"] },
      { name: "Pizza hawaïenne", ingredients: ["Ananas", "Farine", "Fromage"] },
      { name: "Gratin de jacquier", ingredients: ["Jacquier", "Pomme de terre", "Champignon", "Lait"] },
      { name: "Kue Kancing", ingredients: ["Sucre", "Œuf", "Farine"] },
      { name: "Tourte au jacquier haché", ingredients: ["Jacquier", "Farine", "Beurre"] },
      { name: "Gâteau de lune", ingredients: ["Lotus", "Farine", "Œuf"] },
      { name: "Jerky de champignon", ingredients: ["Champignon"] },
      { name: "Risotto au four", ingredients: ["Riz", "Beurre", "Champignon", "Fromage"] },
      { name: "Gâteau renversé à l'ananas", ingredients: ["Sucre", "Ananas", "Farine de blé"] },
      { name: "Pizza", ingredients: ["Tomate", "Farine", "Fromage", "Champignon"] },
      { name: "Tarte à la citrouille", ingredients: ["Citrouille", "Sucre", "Farine", "Œuf"] },
      { name: "Raisins secs", ingredients: ["Raisin"] },
      { name: "Ratatouille", ingredients: ["Poivron", "Olive", "Tomate", "Aubergine"] },
      { name: "Gâteau Red Velvet", ingredients: ["Œuf", "Lait", "Farine", "Fraise"] },
      { name: "Jerky de légumes", ingredients: ["Légume"] },
    ],
    
    // Casserole
    pot: [
      { name: "Pâtes au pesto de basilic", ingredients: ["Basilic", "Tomate", "Farine de blé"] },
      { name: "Soupe de palourdes", ingredients: ["Palourde", "Lait"] },
      { name: "Soupe de poisson", ingredients: ["Saké", "Poisson", "Légume"] },
      { name: "Gnocchi", ingredients: ["Farine de blé", "Sucre", "Fruit x2"] },
      { name: "Curry vert", ingredients: ["Poivron", "Basilic", "Pois", "Noix de coco"] },
      { name: "Œuf dur de canard", ingredients: ["Œuf de canard"] },
      { name: "Œuf dur", ingredients: ["Œuf"] },
      { name: "Œuf dur de caille", ingredients: ["Œuf de caille"] },
      { name: "Chocolat chaud", ingredients: ["Cacao", "Lait"] },
      { name: "Kue Lapis", ingredients: ["Sucre", "Taro", "Noix de coco"] },
      { name: "Lodeh", ingredients: ["Aubergine", "Tempeh", "Légume", "Noix de coco"] },
      { name: "Curry rouge", ingredients: ["Piment", "Échalote", "Carotte", "Noix de coco"] },
      { name: "Ramen aux fruits de mer", ingredients: ["Farine de blé", "Poisson", "Moule"] },
      { name: "Ragoût", ingredients: ["Pomme de terre", "Champignon"] },
      { name: "Soupe de pierre", ingredients: ["Pierre", "Ingrédient comestible"] },
      { name: "Soupe de tomate", ingredients: ["Tomate"] },
      { name: "Ramen végétarien", ingredients: ["Farine de blé", "Kombu", "Champignon"] },
      { name: "Polenta aux champignons sauvages", ingredients: ["Maïs", "Champignon"] },
    ],
    
    // Bol en céramique
    ceramic_bowl: [
      { name: "Cenil", ingredients: ["Noix de coco", "Sucre", "Taro"] },
      { name: "Flan aux œufs", ingredients: ["Œuf", "Lait", "Sucre"] },
      { name: "Es Cendol", ingredients: ["Sirop", "Noix de coco", "Farine de riz"] },
      { name: "Es Doger", ingredients: ["Sirop", "Noix de coco", "Patate douce", "Lait"] },
      { name: "Klepon", ingredients: ["Noix de coco", "Farine de riz", "Sucre"] },
      { name: "Purée", ingredients: ["Fruit ou Légume"] },
      { name: "Yaourt", ingredients: ["Lait"] },
      { name: "Wakame", ingredients: ["Algue x2"] },
    ],
    
    // Mixeur
    blender: [
      { name: "Smoothie vert", ingredients: ["Légume"] },
      { name: "Guacamole", ingredients: ["Avocat", "Tomate", "Ail"] },
      { name: "Houmous", ingredients: ["Pois", "Huile d'olive"] },
      { name: "Glace", ingredients: ["Lait"] },
      { name: "Jamu", ingredients: ["Gingembre", "Miel", "Ginseng"] },
      { name: "Ketchup", ingredients: ["Tomate", "Sel gourmet"] },
      { name: "Beurre de cacahuète", ingredients: ["Amande", "Beurre"] },
      { name: "Smoothie", ingredients: ["Fruit"] },
      { name: "Pâte de wasabi", ingredients: ["Wasabi"] },
    ],
    
    // Grill
    grill: [
      { name: "Assortiment grillé", ingredients: ["Légume x2", "Miel"] },
      { name: "Jerky d'insecte", ingredients: ["Insecte"] },
      { name: "Maïs grillé", ingredients: ["Maïs", "Beurre"] },
      { name: "Poisson grillé", ingredients: ["Poisson"] },
      { name: "Tempeh aux herbes", ingredients: ["Tempeh", "Sel gourmet", "Basilic"] },
      { name: "Poisson fumé", ingredients: ["Poisson", "Bois"] },
      { name: "Saumon fumé", ingredients: ["Saumon", "Bois"] },
      { name: "Burger d'été", ingredients: ["Pain", "Ananas", "Échalote", "Fromage"] },
    ],
    
    // Ensemble d'assaisonnement
    seasoning_set: [
      { name: "Burrito", ingredients: ["Tortilla", "Soja", "Fromage", "Légume"] },
      { name: "Edamame", ingredients: ["Pois"] },
      { name: "Wrap de laitue", ingredients: ["Laitue", "Soja"] },
      { name: "Onigiri", ingredients: ["Riz"] },
      { name: "Gombo gluant", ingredients: ["Gombo", "Gelée de slime"] },
      { name: "Choucroute épicée", ingredients: ["Piment", "Chou rouge"] },
    ],
    
    // Poêlon
    skillet: [
      { name: "Gratin de chou-fleur", ingredients: ["Pomme de terre", "Chou-fleur", "Farine"] },
    ],
  };
  
  // Jour de la semaine dans Coral Island
  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  
  // Fonction pour récupérer les anniversaires des villageois pour un jour et une saison donnés
  const getVillagersBirthday = (season: string, day: number): string[] => {
    return villagers
      .filter(v => v.birthday && v.birthday.season === season && v.birthday.day === day)
      .map(v => v.name);
  };

  // Fonction pour mettre à jour la saison et le jour dans le jeu
  const updateGameDate = (newDate: Date) => {
    setDate(newDate);
    
    // Dans Coral Island, chaque saison a exactement 28 jours divisés en 4 semaines de 7 jours
    // Nous allons simplement utiliser le chiffre sélectionné pour représenter le jour
    // et attribuer une saison en fonction du "mois" sélectionné
    
    const month = newDate.getMonth();
    let season = "";
    
    // Dans Coral Island: Printemps (1-28), Été (1-28), Automne (1-28), Hiver (1-28)
    switch(month) {
      case 0: // Janvier
      case 1: // Février
      case 2: // Mars
        season = "Printemps";
        break;
      case 3: // Avril
      case 4: // Mai
      case 5: // Juin
        season = "Été";
        break;
      case 6: // Juillet
      case 7: // Août
      case 8: // Septembre  
        season = "Automne";
        break;
      default: // Octobre, Novembre, Décembre
        season = "Hiver";
        break;
    }
    
    // Le jour du mois est directement utilisé (limité à 28 max)
    const day = Math.min(28, newDate.getDate());
    
    // Calculer le jour de la semaine dans Coral Island (les semaines commencent le lundi)
    // Dans Coral Island, les jours 1, 8, 15 et 22 sont des lundis
    const weekDay = weekDays[(day - 1) % 7];
    
    setGameDate({ season, day, weekDay });
  };

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
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="Ajouter une tâche..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="min-w-[200px]"
              />
              <Button onClick={addTask}>Ajouter</Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  // Ajouter toutes les tâches journalières qui ne sont pas déjà dans la liste
                  const existingTexts = tasks.map(t => t.text);
                  const newTasks = dailyTasks
                    .filter(text => !existingTexts.includes(text))
                    .map(text => ({
                      id: Date.now() + dailyTasks.indexOf(text),
                      text,
                      done: false
                    }));
                  
                  if (newTasks.length > 0) {
                    setTasks([...tasks, ...newTasks]);
                  }
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Tâches quotidiennes
              </Button>
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
                                  ["dans-les-mines", "examen-entree", "reve-mythique", "offrande-temple", 
                                   "geant-petrifie-1", "village-geants", "geant-petrifie-2", "geant-petrifie-3", 
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
                                  ["dans-locean", "explorer-ocean", "royaume-sirenes", "invite-indesirable", "arbre-corail", "racines-audessus", "lun-de-nous", "expedition-starlet", "a-la-surface"]
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
                                  ["plus-de-vide", "agrandissement-musee", "lancement-pickstarter", "empreintes-dinosaures"]
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
                        <div className="space-y-6">
                          {/* Sous-catégorie: Quêtes Courrier (Printemps) */}
                          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <h4 className="font-medium text-green-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 text-center">📩</div>
                              Courrier (Printemps)
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("secondary")
                                .filter(quest => quest.giver && quest.giver.toLowerCase().includes("printemps"))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-green-100">
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

                          {/* Sous-catégorie: Quêtes Courrier (Été) */}
                          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                            <h4 className="font-medium text-yellow-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 text-center">📩</div>
                              Courrier (Été)
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("secondary")
                                .filter(quest => quest.giver && quest.giver.toLowerCase().includes("été"))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-yellow-100">
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

                          {/* Sous-catégorie: Quêtes Courrier (Automne) */}
                          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                            <h4 className="font-medium text-amber-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 text-center">📩</div>
                              Courrier (Automne)
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("secondary")
                                .filter(quest => quest.giver && quest.giver.toLowerCase().includes("automne"))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-amber-100">
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

                          {/* Sous-catégorie: Quêtes Courrier (Hiver) */}
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 text-center">📩</div>
                              Courrier (Hiver)
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("secondary")
                                .filter(quest => quest.giver && quest.giver.toLowerCase().includes("hiver"))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-blue-100">
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
                          
                          {/* Sous-catégorie: Quêtes Cœurs */}
                          <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                            <h4 className="font-medium text-pink-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 text-center">❤️</div>
                              Quêtes Cœurs
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("secondary")
                                .filter(quest => quest.notes && quest.notes.toLowerCase().includes("cœurs"))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-pink-100">
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
                                    <div className="bg-pink-50 px-2 py-1 mb-2 rounded inline-block text-xs text-pink-800 font-medium">
                                      {presetQuest.giver}
                                    </div>
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
                                    {presetQuest.prerequisite && (
                                      <div className="mt-2 text-xs text-gray-500">
                                        <span className="font-medium">Prérequis:</span> {presetQuest.prerequisite}
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
                          
                          {/* Sous-catégorie: Autres Quêtes */}
                          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                            <h4 className="font-medium text-slate-800 mb-3 flex items-center">
                              <div className="h-4 w-4 mr-2 text-center">⚙️</div>
                              Autres Quêtes
                            </h4>
                            <div className="space-y-4">
                              {getPresetQuestsByCategory("secondary")
                                .filter(quest => quest.notes && quest.notes.toLowerCase().includes("autres"))
                                .map((presetQuest) => (
                                  <div key={presetQuest.id} className="bg-white rounded-lg p-4 border border-slate-100">
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
                                    <div className="bg-slate-50 px-2 py-1 mb-2 rounded inline-block text-xs text-slate-800 font-medium">
                                      {presetQuest.giver}
                                    </div>
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
                                    {presetQuest.prerequisite && (
                                      <div className="mt-2 text-xs text-gray-500">
                                        <span className="font-medium">Prérequis:</span> {presetQuest.prerequisite}
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
                <CalendarIcon className="h-5 w-5 mr-1 text-blue-500" /> Quêtes saisonnières
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
                      {villager.birthday ? (
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <CalendarDays className="h-3.5 w-3.5 mr-1" />
                          {villager.birthday.season}, jour {villager.birthday.day}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600 flex items-center mt-1">
                          <CalendarDays className="h-3.5 w-3.5 mr-1" />
                          Pas d'anniversaire
                        </div>
                      )}
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
            
            <div className="mb-6">
              <Card className="border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    <span>Calendrier de Coral Island</span>
                  </h3>
                  
                  <div className="flex flex-col space-y-2">
                    {/* Sélection de saison */}
                    <div className="flex flex-col gap-2 mb-4">
                      <label className="text-sm font-medium">Saison:</label>
                      <Select 
                        value={gameDate.season} 
                        onValueChange={(value) => {
                          let monthValue = 0;
                          switch(value) {
                            case "Printemps": monthValue = 0; break;
                            case "Été": monthValue = 3; break;
                            case "Automne": monthValue = 6; break;
                            case "Hiver": monthValue = 9; break;
                          }
                          const newDate = new Date();
                          newDate.setMonth(monthValue);
                          newDate.setDate(gameDate.day);
                          updateGameDate(newDate);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Saison" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Printemps">Printemps</SelectItem>
                          <SelectItem value="Été">Été</SelectItem>
                          <SelectItem value="Automne">Automne</SelectItem>
                          <SelectItem value="Hiver">Hiver</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Sélection du jour (1-28) */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
                        <div key={i} className="text-center text-xs font-medium text-gray-500 h-8 flex items-center justify-center">
                          {day}
                        </div>
                      ))}
                    </div>
                        
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {Array.from({ length: 28 }, (_, i) => {
                        const dayNumber = i + 1;
                        const isSelected = gameDate.day === dayNumber;
                        const birthdays = getVillagersBirthday(gameDate.season, dayNumber);
                        const hasBirthday = birthdays.length > 0;
                        
                        const hasEventToday = hasEvent(gameDate.season, dayNumber);
                        return (
                          <button
                            key={i}
                            className={`relative h-8 w-full flex items-center justify-center rounded-md text-sm transition-colors ${
                              isSelected 
                                ? "bg-blue-100 text-blue-700 font-medium border border-blue-300" 
                                : hasBirthday && hasEventToday
                                  ? "bg-gradient-to-br from-rose-50 to-blue-50 text-gray-700 hover:from-rose-100 hover:to-blue-100"
                                  : hasBirthday
                                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                                    : hasEventToday
                                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                      : "hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              let monthValue = 0;
                              switch(gameDate.season) {
                                case "Printemps": monthValue = 0; break;
                                case "Été": monthValue = 3; break;
                                case "Automne": monthValue = 6; break;
                                case "Hiver": monthValue = 9; break;
                              }
                              const newDate = new Date();
                              newDate.setMonth(monthValue);
                              newDate.setDate(dayNumber);
                              updateGameDate(newDate);
                            }}
                            title={
                              (hasBirthday && hasEventToday) 
                                ? `Anniversaire: ${birthdays.join(', ')} | Événement`
                                : hasBirthday 
                                  ? `Anniversaire: ${birthdays.join(', ')}`
                                  : hasEventToday 
                                    ? `Événement festival`
                                    : ''
                            }
                          >
                            {dayNumber}
                            <div className="absolute -top-1 flex gap-0.5">
                              {hasBirthday && (
                                <div className="-right-1 w-2 h-2 bg-rose-500 rounded-full"></div>
                              )}
                              {hasEventToday && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                        "text-lg font-medium px-4 py-2 rounded-md",
                        gameDate.season === "Printemps" ? "bg-green-100 text-green-800" : 
                        gameDate.season === "Été" ? "bg-amber-100 text-amber-800" : 
                        gameDate.season === "Automne" ? "bg-orange-100 text-orange-800" : 
                        "bg-blue-100 text-blue-800"
                      )}>
                        {gameDate.season} - Jour {gameDate.day}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium">{gameDate.weekDay}</span>
                        <span className="text-xs text-gray-500">Semaine {Math.ceil(gameDate.day / 7)}</span>
                      </div>
                    </div>

                    {/* Affichage des anniversaires du jour sélectionné */}
                    {(() => {
                      const birthdays = getVillagersBirthday(gameDate.season, gameDate.day);
                      if (birthdays.length > 0) {
                        return (
                          <div className="bg-rose-50 rounded-md p-3 border border-rose-200 mt-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                              <h4 className="font-medium text-rose-700">Anniversaires aujourd'hui</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {birthdays.map((name, index) => (
                                <Badge key={index} variant="outline" className="bg-white text-rose-600 border-rose-200">
                                  {name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Affichage des événements du jour sélectionné */}
                    {(() => {
                      const events = getEventsForDay(gameDate.season, gameDate.day);
                      if (events.length > 0) {
                        return (
                          <div className="bg-blue-50 rounded-md p-3 border border-blue-200 mt-2">
                            {events.map((event, eventIndex) => (
                              <div key={event.id} className={eventIndex > 0 ? "mt-4 pt-4 border-t border-blue-200" : ""}>
                                <div className="flex items-center gap-2 mb-2">
                                  <CalendarIcon className="h-4 w-4 text-blue-500" />
                                  <h4 className="font-medium text-blue-700">{event.name}</h4>
                                </div>
                                
                                <div className="space-y-2 text-sm text-gray-600">
                                  {event.timeRange && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5 text-blue-500" />
                                      <span>{event.timeRange}</span>
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center gap-1">
                                    <Building2 className="h-3.5 w-3.5 text-blue-500" />
                                    <span>{event.location}</span>
                                  </div>
                                  
                                  {event.merits && (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3.5 w-3.5 text-blue-500" />
                                      <span>{event.merits} points de mérite</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="mt-3">
                                  <h5 className="text-xs font-medium text-blue-700 mb-2">Activités :</h5>
                                  <div className="space-y-2">
                                    {event.activities.filter(act => act.type === "Principal").map((activity, idx) => (
                                      <div key={idx} className="bg-white rounded-md p-2 border border-blue-100">
                                        <div className="flex items-center gap-1">
                                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Principal</Badge>
                                          <span className="text-sm">{activity.name}</span>
                                        </div>
                                        {activity.reward && (
                                          <div className="text-xs mt-1 text-green-600">
                                            Récompense: {activity.reward}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                    
                                    {event.activities.filter(act => act.type === "Côté").length > 0 && (
                                      <div className="mt-2">
                                        <h6 className="text-xs font-medium text-gray-600 mb-1">Activités secondaires :</h6>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                          {event.activities.filter(act => act.type === "Côté").map((activity, idx) => (
                                            <div key={idx} className="bg-white rounded-md p-2 border border-gray-100">
                                              <div className="flex items-center gap-1">
                                                <Badge variant="outline" className="bg-gray-50 text-gray-600">Côté</Badge>
                                                <span className="text-sm">{activity.name}</span>
                                              </div>
                                              {activity.reward && (
                                                <div className="text-xs mt-1 text-green-600">
                                                  Récompense: {activity.reward}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Légende du calendrier */}
            <div className="mb-4">
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-2">Légende :</h3>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                      <span>Anniversaire</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Événement / Festival</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </TabsContent>
        
        <TabsContent value="journal">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Journal du fermier</h2>
          </div>
          
          <Tabs defaultValue="crafting">
            <TabsList className="mb-4">
              <TabsTrigger value="crafting">Artisanat</TabsTrigger>
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
                {selectedCraftingCategory === "cooking" ? (
                  // Affichage des ustensiles de cuisine
                  <div>
                    <h3 className="text-lg font-medium text-orange-800 mb-3">Équipement de cuisine</h3>
                    
                    {/* Sous-catégories d'ustensiles de cuisine */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                      {cookingSubcategories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          className={`flex items-center gap-2 p-3 rounded-lg ${subcategory.color} hover:bg-opacity-80 transition-all ${
                            selectedCookingSubcategory === subcategory.id ? "ring-2 ring-orange-500" : ""
                          }`}
                          onClick={() => setSelectedCookingSubcategory(subcategory.id)}
                        >
                          <div className="text-xl">{subcategory.icon}</div>
                          <div className="flex-1 text-sm font-medium">{subcategory.name}</div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Détails de l'ustensile sélectionné */}
                    {selectedCookingSubcategory && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">
                            {cookingSubcategories.find(s => s.id === selectedCookingSubcategory)?.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-orange-800">
                              {cookingSubcategories.find(s => s.id === selectedCookingSubcategory)?.name}
                            </h3>
                            <p className="text-sm text-orange-600">Équipement de cuisine</p>
                          </div>
                          <div className="text-sm text-orange-800 font-medium px-2 py-1 bg-orange-100 rounded-full">
                            {cookingRecipes[selectedCookingSubcategory as keyof typeof cookingRecipes].length} recettes
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-md border border-orange-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                            <p className="text-sm text-gray-600">
                              {selectedCookingSubcategory === "frying_pan" && "Essentiel pour faire sauter et frire les aliments."}
                              {selectedCookingSubcategory === "chef_knife" && "Un couteau de qualité pour découper les ingrédients avec précision."}
                              {selectedCookingSubcategory === "oven" && "Permet de cuire au four et de faire des pâtisseries."}
                              {selectedCookingSubcategory === "pot" && "Idéale pour les soupes, les ragoûts et les cuissons à l'eau."}
                              {selectedCookingSubcategory === "ceramic_bowl" && "Un bol durable et élégant pour la préparation et le service."}
                              {selectedCookingSubcategory === "blender" && "Parfait pour les smoothies, les purées et les sauces."}
                              {selectedCookingSubcategory === "grill" && "Pour griller viandes, poissons et légumes avec une saveur fumée."}
                              {selectedCookingSubcategory === "seasoning_set" && "Une collection d'épices et herbes pour rehausser vos plats."}
                              {selectedCookingSubcategory === "skillet" && "Une poêle profonde en fonte, excellente pour la cuisine à haute température."}
                            </p>
                          </div>
                          
                          <div className="bg-white p-3 rounded-md border border-orange-100">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Recettes ({cookingRecipes[selectedCookingSubcategory as keyof typeof cookingRecipes].length})</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {cookingRecipes[selectedCookingSubcategory as keyof typeof cookingRecipes].map((recipe, index) => (
                                <div key={index} className="border border-orange-100 rounded-md p-2 hover:bg-orange-50 transition-colors">
                                  <div className="font-medium text-orange-800">{recipe.name}</div>
                                  <div className="mt-1 text-xs text-gray-600">
                                    <span className="font-medium">Ingrédients:</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {recipe.ingredients.map((ingredient, idx) => (
                                        <span key={idx} className="inline-block bg-orange-50 text-orange-700 px-1 py-0.5 rounded text-xs">
                                          {ingredient}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          

                        </div>
                      </div>
                    )}
                  </div>
                ) : selectedCraftingCategory === "crops" ? (
                  // Affichage des cultures
                  <div>
                    {/* Filtres supplémentaires */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge className="cursor-pointer bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs px-3 py-1">
                        Arbre fruitier
                      </Badge>
                      <Badge className="cursor-pointer bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs px-3 py-1">
                        Plante fruitière
                      </Badge>
                      <Badge className="cursor-pointer bg-green-100 text-green-800 hover:bg-green-200 text-xs px-3 py-1">
                        Légume
                      </Badge>
                      <Badge className="cursor-pointer bg-red-100 text-red-800 hover:bg-red-200 text-xs px-3 py-1">
                        Fruit
                      </Badge>
                      <Badge className="cursor-pointer bg-orange-100 text-orange-800 hover:bg-orange-200 text-xs px-3 py-1">
                        Céréale
                      </Badge>
                      <Badge className="cursor-pointer bg-lime-100 text-lime-800 hover:bg-lime-200 text-xs px-3 py-1">
                        Légumineuse
                      </Badge>
                      <Badge className="cursor-pointer bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs px-3 py-1">
                        Plante
                      </Badge>
                    </div>
                    
                    {/* Tri par groupes */}
                    <div className="space-y-6">
                      {/* Arbres fruitiers */}
                      <div>
                        <h3 className="text-lg font-medium text-amber-800 mb-3">Arbres fruitiers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getAllCrops()
                            .filter(crop => crop.category === "Arbre fruitier")
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(crop => {
                              const profit = calculateProfitability(crop);
                              const likesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const lovesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id} 
                                  crop={crop} 
                                  profit={profit} 
                                  likesCount={likesCount} 
                                  lovesCount={lovesCount} 
                                />
                              );
                            })
                          }
                        </div>
                      </div>
                      
                      {/* Plantes fruitières */}
                      <div>
                        <h3 className="text-lg font-medium text-yellow-800 mb-3">Plantes fruitières</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getAllCrops()
                            .filter(crop => crop.category === "Plante fruitière")
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(crop => {
                              const profit = calculateProfitability(crop);
                              const likesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const lovesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id} 
                                  crop={crop} 
                                  profit={profit} 
                                  likesCount={likesCount} 
                                  lovesCount={lovesCount} 
                                />
                              );
                            })
                          }
                        </div>
                      </div>
                      
                      {/* Légumes */}
                      <div>
                        <h3 className="text-lg font-medium text-green-800 mb-3">Légumes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getAllCrops()
                            .filter(crop => crop.category === "Légume")
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(crop => {
                              const profit = calculateProfitability(crop);
                              const likesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const lovesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id} 
                                  crop={crop} 
                                  profit={profit} 
                                  likesCount={likesCount} 
                                  lovesCount={lovesCount} 
                                />
                              );
                            })
                          }
                        </div>
                      </div>
                      
                      {/* Fruits */}
                      <div>
                        <h3 className="text-lg font-medium text-red-800 mb-3">Fruits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getAllCrops()
                            .filter(crop => crop.category === "Fruit")
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(crop => {
                              const profit = calculateProfitability(crop);
                              const likesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const lovesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id} 
                                  crop={crop} 
                                  profit={profit} 
                                  likesCount={likesCount} 
                                  lovesCount={lovesCount} 
                                />
                              );
                            })
                          }
                        </div>
                      </div>
                      
                      {/* Céréales et autres */}
                      <div>
                        <h3 className="text-lg font-medium text-orange-800 mb-3">Céréales et autres</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getAllCrops()
                            .filter(crop => ["Céréale", "Légumineuse", "Plante"].includes(crop.category))
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(crop => {
                              const profit = calculateProfitability(crop);
                              const likesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "aime").length : 0;
                              const lovesCount = crop.preferences ? crop.preferences.filter(p => p.preference === "adore").length : 0;
                              
                              return (
                                <CropCard 
                                  key={crop.id} 
                                  crop={crop} 
                                  profit={profit} 
                                  likesCount={likesCount} 
                                  lovesCount={lovesCount} 
                                />
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedCraftingCategory === "tools" ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          <th className="p-3 border">Outil</th>
                          <th className="p-3 border">Niveau</th>
                          <th className="p-3 border">Matériaux requis</th>
                          <th className="p-3 border">Prix</th>
                          <th className="p-3 border">Caractéristiques</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getRecipesByCategory(selectedCraftingCategory).map((recipe: Recipe) => {
                          // Détermine la couleur de fond en fonction du type d'outil
                          let bgColor = "";
                          if (recipe.id.includes("hoe")) {
                            bgColor = "bg-green-50 hover:bg-green-100";
                          } else if (recipe.id.includes("axe") && !recipe.id.includes("pickaxe")) {
                            bgColor = "bg-amber-50 hover:bg-amber-100";
                          } else if (recipe.id.includes("pickaxe")) {
                            bgColor = "bg-purple-50 hover:bg-purple-100";
                          } else if (recipe.id.includes("watering_can")) {
                            bgColor = "bg-cyan-50 hover:bg-cyan-100";
                          }
                          
                          return (
                            <tr key={recipe.id} className={`border-b ${bgColor}`}>
                              <td className="p-3 border font-medium">{recipe.name}</td>
                              <td className="p-3 border">{recipe.level}</td>
                              <td className="p-3 border">
                                {recipe.materials.length > 0 ? (
                                  <ul className="list-disc pl-4">
                                    {recipe.materials.map((material, index) => (
                                      <li key={index} className="text-sm">
                                        {material.quantity}x {material.name}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-gray-500 italic">Aucun matériau requis</span>
                                )}
                              </td>
                              <td className="p-3 border">{recipe.sellPrice} pièces</td>
                              <td className="p-3 border text-sm">{recipe.description}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  getRecipesByCategory(selectedCraftingCategory).map((recipe: Recipe) => (
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
                  ))
                )}
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