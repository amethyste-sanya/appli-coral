// Types importés depuis Home.tsx à reproduire ici
export type PresetQuest = {
  id: string;
  title: string;
  description: string;
  category: "main" | "secondary" | "seasonal";
  total: number;
  giver?: string;
  objectives?: string[];
  prerequisite?: string;
  reward?: string;
  notes?: string;
};

export const presetQuests: PresetQuest[] = [
  {
    id: "debuter",
    title: "Débuter",
    description: "Apprenons à cultiver ! Commencez par labourer la terre avec une houe, puis utilisez un sac de semences pour cultiver. Arrosez quotidiennement jusqu'à la récolte. Une fois prêt, rendez-vous au magasin général de Sam en ville pour acheter des semences.",
    category: "main",
    total: 4,
    giver: "Introduction",
    objectives: [
      "Plantez 10 graines", 
      "Arrosez 10 graines", 
      "Visitez le magasin général de Sam", 
      "Récoltez la première récolte"
    ],
    prerequisite: "Aucun",
    reward: "100 pièces",
    notes: "Progression: Commence Le nouveau fermier"
  },
  {
    id: "nouveau-fermier",
    title: "Le nouveau fermier",
    description: "Puisque vous êtes nouveau en ville, pensez à vous présenter aux habitants. Ils seront probablement curieux de savoir qui est le nouveau fermier !",
    category: "main",
    total: 1,
    giver: "Connor (en entrant dans le magasin général de Sam dans le cadre de son démarrage)",
    objectives: ["Rencontrez 30 citadins"],
    prerequisite: "Débuter",
    reward: "Commence à se faire des amis",
    notes: ""
  },
  {
    id: "se-faire-des-amis",
    title: "Se faire des amis",
    description: "Liez-vous d'amitié avec les citadins en apprenant à les connaître et en leur offrant des cadeaux. Gagnez des points bonus si vous leur offrez quelque chose qu'ils aiment !",
    category: "main",
    total: 2,
    giver: "Après avoir terminé Le nouveau fermier",
    objectives: [
      "Créez un bouquet de fleurs",
      "Offrez-le à quelqu'un"
    ],
    prerequisite: "Le nouveau fermier",
    reward: "Recette de fabrication de bouquet de fleurs",
    notes: "En progression: Recette de fabrication de bouquet de fleurs"
  },
  {
    id: "home-sweet-home",
    title: "Home Sweet Home",
    description: "Les charpentiers peuvent réparer votre nouvelle maison, mais vous devrez d'abord rassembler quelques ressources. Rendez-leur visite une fois que vous aurez rassemblé suffisamment de bois et de pierres.",
    category: "main",
    total: 4,
    giver: "Joko et Dinda (courrier du 1er printemps)",
    objectives: [
      "Rassemblez 50 bois",
      "Rassemblez 20 pierres",
      "Visitez le charpentier",
      "Réparez votre maison"
    ],
    prerequisite: "Arriver au printemps",
    reward: "100 pièces + 1 cœur points d'amitié avec Joko et Dinda",
    notes: ""
  },
  {
    id: "visitez-beach-shack",
    title: "Visitez le Beach Shack",
    description: "Sunny et Eleanor ont des cadeaux de bienvenue pour vous. Rendez-leur visite au Beach Shack pour découvrir ce que c'est…",
    category: "main",
    total: 1,
    giver: "Sunny et Eleanor (courrier du 3e printemps)",
    objectives: [
      "Visitez la cabane de plage"
    ],
    prerequisite: "Atteindre le 3ème jour du printemps",
    reward: "Canne à pêche + Filet anti-insectes",
    notes: ""
  },
  {
    id: "tout-ou-rien",
    title: "Tout ou rien",
    description: "Envisagez de fabriquer un four, vous pourrez l'utiliser pour fondre des minerais en barres !",
    category: "main",
    total: 1,
    giver: "Pablo (le lendemain après avoir obtenu du minerai de bronze)",
    objectives: [
      "Fabriquer un four"
    ],
    prerequisite: "Obtenir du minerai de bronze",
    reward: "Recette de fabrication de four",
    notes: "En progression: Recette de fabrication de four. Terminer: Commence 'Fondre pour le progrès'"
  },
  {
    id: "fondre-pour-progres",
    title: "Fondre pour le progrès",
    description: "Le four est prêt ! Essayez de fondre du minerai de cuivre pour en faire une barre de cuivre. Lorsque vous aurez assez de barres, rendez-vous chez le forgeron et améliorez vos outils. Cela vous simplifiera la vie à la ferme.",
    category: "main",
    total: 1,
    giver: "Après avoir terminé 'Tout ou rien'",
    objectives: [
      "Faites fondre une barre de bronze à l'aide de votre nouveau four"
    ],
    prerequisite: "Tout ou rien",
    reward: "Accès aux améliorations d'outils",
    notes: ""
  },
  {
    id: "aider-scott",
    title: "Aider Scott à la ferme",
    description: "Scott a besoin d'aide avec une commande urgente pour son restaurant.",
    category: "secondary",
    total: 5,
    giver: "Scott",
    objectives: ["Apporter 5 navets frais à Scott"],
    prerequisite: "Avoir débloqué la culture de navets",
    reward: "350 pièces + augmentation de relation avec Scott",
    notes: "Les navets doivent être de qualité standard ou supérieure"
  },
  {
    id: "peche-keiko",
    title: "Pêche pour Keiko",
    description: "Keiko étudie les poissons rares et aimerait examiner un poisson-lune.",
    category: "secondary",
    total: 1,
    giver: "Keiko",
    objectives: ["Attraper un poisson-lune et l'apporter à Keiko"],
    prerequisite: "Avoir débloqué la canne à pêche",
    reward: "500 pièces + recette spéciale",
    notes: "Le poisson-lune n'est disponible qu'en été"
  },
  {
    id: "festival-printemps",
    title: "Festival du Printemps",
    description: "Le festival du printemps approche et c'est l'occasion de présenter vos talents de cultivateur.",
    category: "seasonal",
    total: 1,
    giver: "Maire Sam",
    objectives: ["Cultivez une fleur primée pour le festival"],
    prerequisite: "Saison: Printemps",
    reward: "Trophée + 1000 pièces si vous gagnez",
    notes: "La qualité de la fleur est importante pour avoir une chance de gagner"
  },
  {
    id: "festival-automne",
    title: "Festival d'Automne",
    description: "Le festival d'automne arrive et la ville organise un concours de décoration de citrouilles.",
    category: "seasonal",
    total: 1,
    giver: "Maire Sam",
    objectives: ["Cultivez une citrouille et participez au concours de décoration"],
    prerequisite: "Saison: Automne",
    reward: "Décorations uniques pour votre ferme",
    notes: "Le festival a lieu le 14 Automne"
  }
];

// Fonctions pour récupérer les quêtes
export const getAllPresetQuests = (): PresetQuest[] => {
  return presetQuests;
};

export const getPresetQuestsByCategory = (category: string): PresetQuest[] => {
  return presetQuests.filter(quest => quest.category === category);
};

export const getPresetQuestById = (id: string): PresetQuest | undefined => {
  return presetQuests.find(quest => quest.id === id);
};