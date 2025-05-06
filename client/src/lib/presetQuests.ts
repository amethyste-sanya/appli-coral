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
    id: "reparation-temple",
    title: "Réparer le Temple de la Déesse",
    description: "Le temple de la déesse est en ruines et a besoin de réparations. Collectez des offrandes pour restaurer ce lieu important pour la ville.",
    category: "main",
    total: 10,
    giver: "Maire Sam",
    objectives: ["Collectez 10 offrandes pour le temple"],
    prerequisite: "Avoir terminé 'Débuter'",
    reward: "Accès aux bénédictions du temple",
    notes: "Les offrandes peuvent être trouvées en explorant les mines, en pêchant ou en cultivant des plantes spéciales."
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