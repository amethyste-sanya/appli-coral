// Type pour les préférences des villageois
export type VillagerPreference = {
  name: string;           // Nom du villageois
  preference: "adore" | "aime" | "neutre" | "déteste";  // Niveau de préférence
};

// Type pour les cultures
export type Crop = {
  id: string;             // Identifiant unique (ex: "navet")
  name: string;           // Nom (ex: "Navet")
  category: string;       // Catégorie (ex: "Légumes")
  description: string;    // Description (ex: "Un légume-racine légèrement épicé.")
  imagePath: string;      // Chemin vers l'image (ex: "/images/crops/navet.jpg")
  seedName: string;       // Nom des graines (ex: "Graines de navet")
  seedPrice: number;      // Prix des graines (ex: 15)
  seedSource: string;     // Source des graines (ex: "Bazar de Sam")
  townRank: string;       // Rang de la ville requis (ex: "F")
  season: string;         // Saison (ex: "Printemps")
  growthTime: number;     // Temps de maturation en jours (ex: 4)
  size: string;           // Taille (ex: "1x1")
  regrowth?: number;      // Temps de repousse (optionnel, pour les cultures qui repoussent)
  sellPrice?: number;     // Prix de vente (optionnel)
  harvestYield?: number;  // Nombre d'items récoltés (optionnel)
  energy?: number;        // Énergie si consommable (optionnel)
  effects?: string[];     // Effets spéciaux (optionnel)
  preferences?: VillagerPreference[]; // Préférences des villageois
  notes?: string;         // Notes supplémentaires (optionnel)
  isGoddessOffering?: boolean; // Item nécessaire pour le temple de la déesse
  goddessOfferingNote?: string; // Note spécifique pour l'offrande à la déesse
  combinePct?: number;    // Pourcentage de chance de combinaison (optionnel)
};

// Liste des cultures
export const crops: Crop[] = [
  // Arbres fruitiers (cultivés dans un espace 3x3)
  {
    id: "orange",
    name: "Orange",
    category: "Arbre fruitier",
    description: "Un fruit d'arbre fruitier au goût sucré et acidulé.",
    imagePath: "",
    seedName: "Jeune arbre d'orange",
    seedPrice: 4000,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Printemps",
    growthTime: 28,
    size: "3x3",
    regrowth: 4,
    sellPrice: 136,
    harvestYield: 1,
    energy: 15,
  },
  {
    id: "durian",
    name: "Durian",
    category: "Arbre fruitier",
    description: "Un fruit exotique à l'odeur forte et au goût unique.",
    imagePath: "",
    seedName: "Jeune arbre de durian",
    seedPrice: 4500,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Printemps",
    growthTime: 28,
    size: "3x3",
    regrowth: 4,
    sellPrice: 155,
    harvestYield: 1,
    energy: 18,
  },
  {
    id: "peche",
    name: "Pêche",
    category: "Arbre fruitier",
    description: "Un fruit juteux et sucré, idéal pour les desserts.",
    imagePath: "",
    seedName: "Jeune arbre de pêche",
    seedPrice: 4500,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Été",
    growthTime: 28,
    size: "3x3",
    regrowth: 4,
    sellPrice: 153,
    harvestYield: 1,
    energy: 17,
  },
  {
    id: "mangue",
    name: "Mangue",
    category: "Arbre fruitier",
    description: "Un fruit tropical, juteux et sucré.",
    imagePath: "",
    seedName: "Jeune arbre de mangue",
    seedPrice: 4000,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Été",
    growthTime: 28,
    size: "3x3",
    regrowth: 4,
    sellPrice: 136,
    harvestYield: 1,
    energy: 16,
  },
  {
    id: "pomme",
    name: "Pomme",
    category: "Arbre fruitier",
    description: "Un fruit croquant et légèrement sucré, symbole de l'automne.",
    imagePath: "",
    seedName: "Jeune arbre de pomme",
    seedPrice: 4000,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Automne",
    growthTime: 28,
    size: "3x3",
    regrowth: 4,
    sellPrice: 136,
    harvestYield: 1,
    energy: 15,
  },
  {
    id: "olive",
    name: "Olive",
    category: "Arbre fruitier",
    description: "Un fruit utilisé pour faire de l'huile et dans divers plats.",
    imagePath: "",
    seedName: "Jeune arbre d'olive",
    seedPrice: 4000,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Automne",
    growthTime: 28,
    size: "3x3",
    regrowth: 4,
    sellPrice: 113,
    harvestYield: 1,
    energy: 10,
  },
  {
    id: "amande",
    name: "Amande",
    category: "Arbre fruitier",
    description: "Une noix douce idéale pour les desserts et les collations.",
    imagePath: "",
    seedName: "Jeune arbre d'amande",
    seedPrice: 4250,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Hiver",
    growthTime: 28,
    size: "3x3",
    regrowth: 4,
    sellPrice: 144,
    harvestYield: 1,
    energy: 14,
  },
  
  // Plantes fruitières (cultivées dans un espace 1x1 mais produisant des fruits)
  {
    id: "banane",
    name: "Banane",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits jaunes en grappe, sucrés et riches en potassium.",
    imagePath: "",
    seedName: "Semis de bananier",
    seedPrice: 800,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps, Été",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 68,
    harvestYield: 1,
    energy: 20,
  },
  {
    id: "prune",
    name: "Prune",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits violets, juteux et sucrés.",
    imagePath: "",
    seedName: "Semis de prunier",
    seedPrice: 1350,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps, Été",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 68,
    harvestYield: 1,
    energy: 15,
  },
  {
    id: "ramboutan",
    name: "Ramboutan",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits exotiques à l'écorce épineuse et à la chair translucide.",
    imagePath: "",
    seedName: "Semis de ramboutan",
    seedPrice: 1350,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps, Été",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 68,
    harvestYield: 1,
    energy: 15,
  },
  {
    id: "fruit_du_dragon",
    name: "Fruit du dragon",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits exotiques à l'écorce rose vif et à la chair blanche parsemée de graines noires.",
    imagePath: "",
    seedName: "Semis de pitaya",
    seedPrice: 1350,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été, Automne",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 68,
    harvestYield: 1,
    energy: 15,
  },
  {
    id: "jacquier",
    name: "Jacquier",
    category: "Plante fruitière",
    description: "Une plante produisant d'énormes fruits à la chair jaune et au goût sucré.",
    imagePath: "",
    seedName: "Semis de jacquier",
    seedPrice: 1500,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été, Automne",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 74,
    harvestYield: 1,
    energy: 18,
  },
  {
    id: "papaye",
    name: "Papaye",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits orange à la chair sucrée.",
    imagePath: "",
    seedName: "Semis de papayer",
    seedPrice: 1350,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été, Automne",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 68,
    harvestYield: 1,
    energy: 15,
  },
  {
    id: "cacao",
    name: "Cacao",
    category: "Plante fruitière",
    description: "Une plante produisant des cabosses qui contiennent les fèves utilisées pour faire du chocolat.",
    imagePath: "",
    seedName: "Semis de cacaoyer",
    seedPrice: 1500,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Automne, Hiver",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 85,
    harvestYield: 1,
    energy: 10,
  },
  {
    id: "citron",
    name: "Citron",
    category: "Plante fruitière",
    description: "Une plante produisant des agrumes jaunes au goût acide.",
    imagePath: "",
    seedName: "Semis de citronnier",
    seedPrice: 1200,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Automne, Hiver",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 61,
    harvestYield: 1,
    energy: 8,
  },
  {
    id: "poire",
    name: "Poire",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits en forme de goutte, à la chair juteuse et sucrée.",
    imagePath: "",
    seedName: "Semis de poirier",
    seedPrice: 1350,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Automne, Hiver",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 68,
    harvestYield: 1,
    energy: 15,
  },
  {
    id: "salak",
    name: "Salak",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits au goût unique, connus sous le nom de 'fruit du serpent' en raison de leur peau écailleuse.",
    imagePath: "",
    seedName: "Semis de salak",
    seedPrice: 1200,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Hiver, Printemps",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 67,
    harvestYield: 1,
    energy: 14,
  },
  {
    id: "litchi",
    name: "Litchi",
    category: "Plante fruitière",
    description: "Une plante produisant des fruits à la coque rouge et à la chair translucide sucrée.",
    imagePath: "",
    seedName: "Semis de litchi",
    seedPrice: 1350,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Hiver, Printemps",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 68,
    harvestYield: 1,
    energy: 15,
  },
  
  // Cultures normales
  {
    id: "navet",
    name: "Navet",
    category: "Légume",
    description: "Un légume-racine légèrement épicé.",
    imagePath: "/attached_assets/navet.jpg",
    seedName: "Graines de navet",
    seedPrice: 15,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 4,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 40,
    harvestYield: 1,
    energy: 20,
    preferences: [
      { name: "Aaliyah", preference: "aime" },
      { name: "Eva", preference: "aime" },
      { name: "Scott", preference: "aime" }
    ],
    isGoddessOffering: true,
    goddessOfferingNote: "Requis pour le Temple de la Déesse"
  },
  {
    id: "carotte",
    name: "Carotte",
    category: "Légume",
    description: "Une racine sucrée et croquante.",
    imagePath: "/images/crops/carotte.jpg",
    seedName: "Graines de carotte",
    seedPrice: 35,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 7,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 78,
    harvestYield: 1,
    energy: 25
  },
  {
    id: "chou_fleur",
    name: "Chou-fleur",
    category: "Légume",
    description: "Un légume à tête blanche, riche en nutriments.",
    imagePath: "/images/crops/chou_fleur.jpg",
    seedName: "Graines de chou-fleur",
    seedPrice: 70,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 10,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 175,
    harvestYield: 1,
    energy: 30,
    preferences: [
      { name: "Betty", preference: "adore" },
      { name: "Emily", preference: "aime" }
    ]
  },
  {
    id: "pomme_de_terre",
    name: "Pomme de terre",
    category: "Légume",
    description: "Un tubercule polyvalent.",
    imagePath: "/attached_assets/pomme de terre.jpg",
    seedName: "Graines de pomme de terre",
    seedPrice: 25,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 5,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 75,
    harvestYield: 1,
    energy: 25,
    preferences: [
      { name: "Luc", preference: "aime" },
      { name: "Betty", preference: "déteste" }
    ]
  },
  {
    id: "laitue",
    name: "Laitue",
    category: "Légume",
    description: "Une feuille verte croquante.",
    imagePath: "/images/crops/laitue.jpg",
    seedName: "Graines de laitue",
    seedPrice: 20,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Printemps",
    growthTime: 5,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 47,
    harvestYield: 1,
    energy: 15
  },
  {
    id: "concombre",
    name: "Concombre",
    category: "Légume",
    description: "Un légume long et vert, idéal pour les salades.",
    imagePath: "/images/crops/concombre.jpg",
    seedName: "Graines de concombre",
    seedPrice: 25,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps",
    growthTime: 9,
    size: "1x1",
    regrowth: 3,
    sellPrice: 41,
    harvestYield: 1,
    energy: 20
  },
  {
    id: "petits_pois",
    name: "Petits pois",
    category: "Légume",
    description: "De petites graines vertes sucrées.",
    imagePath: "/images/crops/petits_pois.jpg",
    seedName: "Graines de petits pois",
    seedPrice: 45,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Printemps",
    growthTime: 11,
    size: "1x1",
    regrowth: 4,
    sellPrice: 59,
    harvestYield: 1,
    energy: 18
  },
  {
    id: "canne_a_sucre",
    name: "Canne à sucre",
    category: "Plante",
    description: "Une tige sucrée utilisée pour produire du sucre.",
    imagePath: "/images/crops/canne_a_sucre.jpg",
    seedName: "Graines de canne à sucre",
    seedPrice: 50,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Printemps",
    growthTime: 5,
    size: "1x1",
    regrowth: 1,
    sellPrice: 23,
    harvestYield: 1,
    energy: 10
  },
  {
    id: "fraise",
    name: "Fraise",
    category: "Fruit",
    description: "Un fruit rouge sucré et juteux.",
    imagePath: "/images/crops/fraise.jpg",
    seedName: "Graines de fraise",
    seedPrice: 145,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 102,
    harvestYield: 1,
    energy: 25,
    preferences: [
      { name: "Paul", preference: "adore" },
      { name: "Charles", preference: "adore" },
      { name: "Erika", preference: "adore" }
    ]
  },
  {
    id: "radis",
    name: "Radis",
    category: "Légume",
    description: "Un légume-racine piquant.",
    imagePath: "/images/crops/radis.jpg",
    seedName: "Graines de radis",
    seedPrice: 60,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps",
    growthTime: 6,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 119,
    harvestYield: 1,
    energy: 20
  },
  {
    id: "soja",
    name: "Soja",
    category: "Légumineuse",
    description: "Une légumineuse riche en protéines.",
    imagePath: "/images/crops/soja.jpg",
    seedName: "Graines de soja",
    seedPrice: 20,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Printemps",
    growthTime: 7,
    size: "1x1",
    regrowth: 4,
    sellPrice: 19,
    harvestYield: 1,
    energy: 15
  },
  // Cultures d'été
  {
    id: "mais",
    name: "Maïs",
    category: "Céréale",
    description: "Une céréale jaune sucrée.",
    imagePath: "/images/crops/mais.jpg",
    seedName: "Graines de maïs",
    seedPrice: 25,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été",
    growthTime: 12,
    size: "1x1",
    regrowth: 4,
    sellPrice: 24,
    harvestYield: 1,
    energy: 20
  },
  {
    id: "piment_fort",
    name: "Piment fort",
    category: "Légume",
    description: "Un petit légume rouge très épicé.",
    imagePath: "/images/crops/piment_fort.jpg",
    seedName: "Graines de piment fort",
    seedPrice: 40,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Été",
    growthTime: 7,
    size: "1x1",
    regrowth: 3,
    sellPrice: 36,
    harvestYield: 1,
    energy: 15
  },
  {
    id: "myrtille",
    name: "Myrtille",
    category: "Fruit",
    description: "Une petite baie bleue sucrée.",
    imagePath: "/images/crops/myrtille.jpg",
    seedName: "Graines de myrtille",
    seedPrice: 50,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Été",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 41,
    harvestYield: 1,
    energy: 22,
    preferences: [
      { name: "Charles", preference: "adore" },
      { name: "Erika", preference: "adore" }
    ]
  },
  {
    id: "tomate",
    name: "Tomate",
    category: "Fruit",
    description: "Un fruit rouge juteux.",
    imagePath: "/images/crops/tomate.jpg",
    seedName: "Graines de tomate",
    seedPrice: 25,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été",
    growthTime: 10,
    size: "1x1",
    regrowth: 4,
    sellPrice: 34,
    harvestYield: 1,
    energy: 20
  },
  {
    id: "melon",
    name: "Melon",
    category: "Fruit",
    description: "Un gros fruit sucré à chair rose.",
    imagePath: "/images/crops/melon.jpg",
    seedName: "Graines de melon",
    seedPrice: 130,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été",
    growthTime: 12,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 233,
    harvestYield: 1,
    energy: 30,
    preferences: [
      { name: "Dinda", preference: "adore" }
    ]
  },
  {
    id: "poivron",
    name: "Poivron",
    category: "Légume",
    description: "Un légume croquant et coloré.",
    imagePath: "/images/crops/poivron.jpg",
    seedName: "Graines de poivron",
    seedPrice: 70,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été",
    growthTime: 8,
    size: "1x1",
    regrowth: 4,
    sellPrice: 47,
    harvestYield: 1,
    energy: 20
  },
  {
    id: "ananas",
    name: "Ananas",
    category: "Fruit",
    description: "Un fruit tropical sucré et acidulé.",
    imagePath: "/images/crops/ananas.jpg",
    seedName: "Graines d'ananas",
    seedPrice: 110,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Été",
    growthTime: 9,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 201,
    harvestYield: 1,
    energy: 25
  },
  {
    id: "okra",
    name: "Okra",
    category: "Légume",
    description: "Un légume vert allongé.",
    imagePath: "/images/crops/okra.jpg",
    seedName: "Graines d'okra",
    seedPrice: 60,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Été",
    growthTime: 9,
    size: "1x1",
    regrowth: 6,
    sellPrice: 59,
    harvestYield: 1,
    energy: 18
  },
  // Cultures d'automne
  {
    id: "patate_douce",
    name: "Patate douce",
    category: "Légume",
    description: "Un tubercule sucré à chair orange.",
    imagePath: "/images/crops/patate_douce.jpg",
    seedName: "Graines de patate douce",
    seedPrice: 60,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Automne",
    growthTime: 9,
    size: "1x1",
    regrowth: 4,
    sellPrice: 30,
    harvestYield: 1,
    energy: 25
  },
  {
    id: "aubergine",
    name: "Aubergine",
    category: "Légume",
    description: "Un légume violet allongé.",
    imagePath: "/images/crops/aubergine.jpg",
    seedName: "Graines d'aubergine",
    seedPrice: 35,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Automne",
    growthTime: 9,
    size: "1x1",
    regrowth: 3,
    sellPrice: 36,
    harvestYield: 1,
    energy: 20,
    preferences: [
      { name: "Aaliyah", preference: "adore" }
    ]
  },
  {
    id: "citrouille",
    name: "Citrouille",
    category: "Légume",
    description: "Un gros légume orange.",
    imagePath: "/images/crops/citrouille.jpg",
    seedName: "Graines de citrouille",
    seedPrice: 90,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Automne",
    growthTime: 13,
    size: "1x1",
    regrowth: 7,
    sellPrice: 116,
    harvestYield: 1,
    energy: 25,
    preferences: [
      { name: "Archie", preference: "adore" },
      { name: "Noah", preference: "adore" }
    ]
  },
  {
    id: "canneberge",
    name: "Canneberge",
    category: "Fruit",
    description: "Une petite baie rouge acidulée.",
    imagePath: "/images/crops/canneberge.jpg",
    seedName: "Graines de canneberge",
    seedPrice: 20,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Automne",
    growthTime: 5,
    size: "1x1",
    regrowth: 2,
    sellPrice: 18,
    harvestYield: 1,
    energy: 15
  },
  {
    id: "riz",
    name: "Riz",
    category: "Céréale",
    description: "Une céréale de base.",
    imagePath: "/images/crops/riz.jpg",
    seedName: "Graines de riz",
    seedPrice: 15,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Automne",
    growthTime: 9,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 33,
    harvestYield: 1,
    energy: 20
  },
  {
    id: "betterave",
    name: "Betterave",
    category: "Légume",
    description: "Un légume-racine sucré.",
    imagePath: "/images/crops/betterave.jpg",
    seedName: "Graines de betterave",
    seedPrice: 20,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Automne",
    growthTime: 6,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 52,
    harvestYield: 1,
    energy: 22
  },
  {
    id: "bok_choy",
    name: "Bok choy",
    category: "Légume",
    description: "Un légume-feuille asiatique.",
    imagePath: "/images/crops/bok_choy.jpg",
    seedName: "Graines de bok choy",
    seedPrice: 60,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Automne",
    growthTime: 8,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 126,
    harvestYield: 1,
    energy: 25
  },
  {
    id: "artichaut",
    name: "Artichaut",
    category: "Légume",
    description: "Un légume à feuilles comestibles.",
    imagePath: "/images/crops/artichaut.jpg",
    seedName: "Graines d'artichaut",
    seedPrice: 45,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Automne",
    growthTime: 8,
    size: "1x1",
    regrowth: 4,
    sellPrice: 29,
    harvestYield: 1,
    energy: 20
  },
  {
    id: "orchidee",
    name: "Orchidée",
    category: "Fleur",
    description: "Une fleur exotique.",
    imagePath: "/images/crops/orchidee.jpg",
    seedName: "Graines d'orchidée",
    seedPrice: 75,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Automne",
    growthTime: 8,
    size: "1x1",
    regrowth: 0, // Aucune
    sellPrice: 130,
    harvestYield: 1,
    energy: 0
  },
  // Cultures d'hiver
  {
    id: "amande",
    name: "Amande",
    category: "Fruit",
    description: "Un fruit à coque riche en nutriments.",
    imagePath: "/images/crops/amande.jpg",
    seedName: "Graines d'amandier",
    seedPrice: 4250,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Hiver",
    growthTime: 28,
    size: "1x1",
    regrowth: 4,
    sellPrice: 144,
    harvestYield: 1,
    energy: 30
  },
  {
    id: "avocat",
    name: "Avocat",
    category: "Fruit",
    description: "Un fruit crémeux et nutritif.",
    imagePath: "/images/crops/avocat.jpg",
    seedName: "Graines d'avocatier",
    seedPrice: 1000,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Hiver",
    growthTime: 15,
    size: "1x1",
    regrowth: 3,
    sellPrice: 120,
    harvestYield: 1,
    energy: 25
  }
];

// Récupérer toutes les cultures
export const getAllCrops = (): Crop[] => {
  return crops;
};

// Récupérer les cultures par saison
export const getCropsBySeason = (season: string): Crop[] => {
  return crops.filter(crop => crop.season.includes(season));
};

// Récupérer une culture par son identifiant
export const getCropById = (cropId: string): Crop | undefined => {
  return crops.find(crop => crop.id === cropId);
};

// Ajouter une culture
export const addCrop = (crop: Crop): void => {
  crops.push(crop);
};

// Calculer la rentabilité d'une culture
export const calculateProfitability = (crop: Crop): number => {
  if (!crop.sellPrice || !crop.harvestYield) return 0;
  
  // Calculer le profit par récolte
  const profitPerHarvest = (crop.sellPrice * crop.harvestYield) - crop.seedPrice;
  
  // Si la culture repousse, calculer le profit sur plusieurs récoltes
  if (crop.regrowth) {
    // Calculer combien de récoltes supplémentaires on peut avoir en une saison (30 jours)
    const daysLeftInSeason = 30 - crop.growthTime;
    const additionalHarvests = Math.floor(daysLeftInSeason / crop.regrowth);
    
    // Profit total = profit initial + profit des récoltes supplémentaires
    return profitPerHarvest + (additionalHarvests * (crop.sellPrice * crop.harvestYield));
  }
  
  return profitPerHarvest;
};

// Obtenir les cultures les plus rentables
export const getMostProfitableCrops = (count: number = 5): Crop[] => {
  return [...crops]
    .sort((a, b) => calculateProfitability(b) - calculateProfitability(a))
    .slice(0, count);
};