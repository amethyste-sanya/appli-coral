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
  {
    id: "navet",
    name: "Navet",
    category: "Légumes",
    description: "Un légume-racine légèrement épicé.",
    imagePath: "/attached_assets/navet.jpg",
    seedName: "Graines de navet",
    seedPrice: 15,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 4,
    size: "1x1",
    sellPrice: 40,
    harvestYield: 1,
    energy: 20,
    preferences: [
      { name: "Aaliyah", preference: "aime" },
      { name: "Eva", preference: "aime" },
      { name: "Scott", preference: "aime" },
    ],
    isGoddessOffering: true,
    goddessOfferingNote: "Requis pour le Temple de la Déesse",
  },
  {
    id: "marguerite",
    name: "Marguerite",
    category: "Fleur",
    description: "Également connue sous le nom de marguerite commune.",
    imagePath: "/images/crops/marguerite.jpg",
    seedName: "Graines de marguerites",
    seedPrice: 15,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 4,
    size: "1x1",
    sellPrice: 40,
    harvestYield: 1,
    preferences: [
      { name: "Aaliyah", preference: "aime" },
      { name: "Alice", preference: "aime" },
      { name: "Anne", preference: "aime" },
      { name: "Antonio", preference: "aime" },
      { name: "Archie", preference: "aime" },
      { name: "Ben", preference: "aime" },
      { name: "Betty", preference: "aime" },
      { name: "Bree", preference: "aime" },
      { name: "Chaem", preference: "aime" },
      { name: "Chef Connor", preference: "aime" },
      { name: "Dinda", preference: "aime" },
      { name: "Dippa", preference: "aime" },
      { name: "Éléanor", preference: "aime" },
      { name: "Emilie", preference: "aime" },
      { name: "Emma", preference: "aime" },
      { name: "Erika", preference: "aime" },
      { name: "Eva", preference: "aime" },
      { name: "Frank", preference: "aime" },
      { name: "Giu", preference: "aime" },
      { name: "Gong", preference: "aime" },
      { name: "Grog", preference: "aime" },
      { name: "Groo", preference: "aime" },
      { name: "Jack", preference: "aime" },
      { name: "Jim", preference: "aime" },
      { name: "Joko", preference: "aime" },
      { name: "Kenny", preference: "aime" },
      { name: "Kira", preference: "aime" },
      { name: "Leah", preference: "aime" },
      { name: "Lily", preference: "aime" },
      { name: "Ling", preference: "aime" },
      { name: "Luc", preference: "aime" },
      { name: "Macy", preference: "aime" },
      { name: "Mark", preference: "aime" },
      { name: "Millie", preference: "aime" },
      { name: "Nina", preference: "aime" },
      { name: "Noah", preference: "aime" },
      { name: "Olivier", preference: "aime" },
      { name: "Pablo", preference: "aime" },
      { name: "Paul", preference: "aime" },
      { name: "Rafael", preference: "aime" },
      { name: "Raj", preference: "aime" },
      { name: "Randy", preference: "aime" },
      { name: "Ratih", preference: "aime" },
      { name: "Sam", preference: "aime" },
      { name: "Scott", preference: "aime" },
      { name: "Suki", preference: "aime" },
      { name: "Sunny", preference: "aime" },
      { name: "Surya", preference: "aime" },
      { name: "Théo", preference: "aime" },
      { name: "Valentina", preference: "aime" },
      { name: "Wakuu", preference: "aime" },
      { name: "Walter", preference: "aime" },
      { name: "Wataru", preference: "aime" },
      { name: "Zarah", preference: "aime" },
      { name: "Zoé", preference: "aime" },
    ],
    isGoddessOffering: true,
    goddessOfferingNote: "Requis pour le Temple de la Déesse",
  },
  {
    id: "pivoine",
    name: "Pivoine",
    category: "Fleur",
    description: "Une plante à fleurs aux couleurs vives qui fleurit dans l'air printanier.",
    imagePath: "/images/crops/pivoine.jpg",
    seedName: "Graines de pivoine",
    seedPrice: 20,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 4,
    size: "1x1",
    sellPrice: 42,
    harvestYield: 1,
    preferences: [
      { name: "Eva", preference: "adore" },
      { name: "Aaliyah", preference: "aime" },
      { name: "Alice", preference: "aime" },
      { name: "Anne", preference: "aime" },
      { name: "Antonio", preference: "aime" },
      { name: "Archie", preference: "aime" },
      { name: "Ben", preference: "aime" },
      { name: "Betty", preference: "aime" },
      { name: "Bree", preference: "aime" },
      { name: "Chaem", preference: "aime" },
      { name: "Chef Connor", preference: "aime" },
      { name: "Dinda", preference: "aime" },
      { name: "Dippa", preference: "aime" },
      { name: "Éléanor", preference: "aime" },
      { name: "Emilie", preference: "aime" },
      { name: "Emma", preference: "aime" },
      { name: "Erika", preference: "aime" },
      { name: "Frank", preference: "aime" },
      { name: "Giu", preference: "aime" },
      { name: "Gong", preference: "aime" },
      { name: "Grog", preference: "aime" },
      { name: "Groo", preference: "aime" },
      { name: "Jack", preference: "aime" },
      { name: "Jim", preference: "aime" },
      { name: "Joko", preference: "aime" },
      { name: "Kenny", preference: "aime" },
      { name: "Kira", preference: "aime" },
      { name: "Leah", preference: "aime" },
      { name: "Lily", preference: "aime" },
      { name: "Ling", preference: "aime" },
      { name: "Luc", preference: "aime" },
      { name: "Macy", preference: "aime" },
      { name: "Mark", preference: "aime" },
      { name: "Millie", preference: "aime" },
      { name: "Nina", preference: "aime" },
      { name: "Noah", preference: "aime" },
      { name: "Olivier", preference: "aime" },
      { name: "Pablo", preference: "aime" },
      { name: "Paul", preference: "aime" },
      { name: "Rafael", preference: "aime" },
      { name: "Raj", preference: "aime" },
      { name: "Randy", preference: "aime" },
      { name: "Ratih", preference: "aime" },
      { name: "Sam", preference: "aime" },
      { name: "Scott", preference: "aime" },
      { name: "Suki", preference: "aime" },
      { name: "Sunny", preference: "aime" },
      { name: "Surya", preference: "aime" },
      { name: "Valentina", preference: "aime" },
      { name: "Wakuu", preference: "aime" },
      { name: "Walter", preference: "aime" },
      { name: "Wataru", preference: "aime" },
      { name: "Zarah", preference: "aime" },
      { name: "Zoé", preference: "aime" },
    ],
  },
  {
    id: "pomme-de-terre",
    name: "Pomme de terre",
    category: "Légumes",
    description: "Tubercule commun trouvé au printemps.",
    imagePath: "/images/crops/pomme-de-terre.jpg",
    seedName: "Graines de pommes de terre",
    seedPrice: 25,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 5,
    size: "1x1",
    sellPrice: 75,
    harvestYield: 1,
    combinePct: 5,
    preferences: [
      { name: "Aaliyah", preference: "aime" },
      { name: "Alice", preference: "aime" },
      { name: "Anne", preference: "aime" },
      { name: "Antonio", preference: "aime" },
      { name: "Archie", preference: "aime" },
      { name: "Ben", preference: "aime" },
      { name: "Betty", preference: "aime" },
      { name: "Bree", preference: "aime" },
      { name: "Chaem", preference: "aime" },
      { name: "Charles", preference: "aime" },
      { name: "Chef Connor", preference: "aime" },
      { name: "Dinda", preference: "aime" },
      { name: "Dippa", preference: "aime" },
      { name: "Éléanor", preference: "aime" },
      { name: "Emilie", preference: "aime" },
      { name: "Emma", preference: "aime" },
      { name: "Erika", preference: "aime" },
      { name: "Frank", preference: "aime" },
      { name: "Giu", preference: "aime" },
      { name: "Gong", preference: "aime" },
      { name: "Grog", preference: "aime" },
      { name: "Groo", preference: "aime" },
      { name: "Jack", preference: "aime" },
      { name: "Jim", preference: "aime" },
      { name: "Joko", preference: "aime" },
      { name: "Kenny", preference: "aime" },
      { name: "Kira", preference: "aime" },
      { name: "Lily", preference: "aime" },
      { name: "Ling", preference: "aime" },
      { name: "Luc", preference: "aime" },
      { name: "Mark", preference: "aime" },
      { name: "Millie", preference: "aime" },
      { name: "Nina", preference: "aime" },
      { name: "Noah", preference: "aime" },
      { name: "Olivier", preference: "aime" },
      { name: "Paul", preference: "aime" },
      { name: "Rafael", preference: "aime" },
      { name: "Randy", preference: "aime" },
      { name: "Ratih", preference: "aime" },
      { name: "Suki", preference: "aime" },
      { name: "Sunny", preference: "aime" },
      { name: "Surya", preference: "aime" },
      { name: "Théo", preference: "aime" },
      { name: "Valentina", preference: "aime" },
      { name: "Wakuu", preference: "aime" },
      { name: "Walter", preference: "aime" },
      { name: "Wataru", preference: "aime" },
      { name: "Yuri", preference: "aime" },
      { name: "Zarah", preference: "aime" },
      { name: "Zoé", preference: "aime" },
    ],
  },
  // Chou-fleur
  {
    id: "chou-fleur",
    name: "Chou-fleur",
    category: "Légumes",
    description: "Les boutons floraux pâles et immatures sont appelés caillés. Ils sont riches en nutriments.",
    imagePath: "/images/crops/chou-fleur.jpg",
    seedName: "Graines de chou-fleur",
    seedPrice: 70,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 10,
    size: "1x1",
    sellPrice: 175,
    harvestYield: 1,
    preferences: [
      { name: "Betty", preference: "adore" },
    ],
  },
  // Carotte
  {
    id: "carotte",
    name: "Carotte",
    category: "Légumes",
    description: "Un légume-racine aux couleurs vives. Très croquant cru.",
    imagePath: "/images/crops/carotte.jpg",
    seedName: "Graines de carottes",
    seedPrice: 35,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 7,
    size: "1x1",
    sellPrice: 78,
    harvestYield: 1,
    preferences: [
      { name: "Anne", preference: "adore" },
      { name: "Walter", preference: "adore" },
    ],
  },
  // Pavot/coquelicot
  {
    id: "pavot",
    name: "Pavot",
    category: "Fleur",
    description: "Un symbole de souvenir et de résurrection.",
    imagePath: "/images/crops/pavot.jpg",
    seedName: "Graines de pavot",
    seedPrice: 30,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps",
    growthTime: 7,
    size: "1x1",
    sellPrice: 82,
    harvestYield: 1,
  },
  // Fraise
  {
    id: "fraise",
    name: "Fraise",
    category: "Fruit",
    description: "Un fruit de printemps rouge et juteux.",
    imagePath: "/images/crops/fraise.jpg",
    seedName: "Graines de fraises",
    seedPrice: 145,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Printemps",
    growthTime: 10,
    size: "1x1",
    sellPrice: 102,
    harvestYield: 1,
    regrowth: 4,
    preferences: [
      { name: "Aaliyah", preference: "adore" },
      { name: "Charles", preference: "adore" },
      { name: "Paul", preference: "adore" },
    ],
  },
  // Radis
  {
    id: "radis",
    name: "Radis",
    category: "Légumes",
    description: "Une racine croquante et comestible de couleur rouge vif.",
    imagePath: "/images/crops/radis.jpg",
    seedName: "Graines de radis",
    seedPrice: 60,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps,Été",
    growthTime: 6,
    size: "1x1",
    sellPrice: 119,
    harvestYield: 1,
    preferences: [
      { name: "Dippa", preference: "adore" },
    ],
  },
  // Petits pois
  {
    id: "petits-pois",
    name: "Petits pois",
    category: "Légumes",
    description: "Petit, vert et riche en nutriments.",
    imagePath: "/images/crops/petits-pois.jpg",
    seedName: "Graines de pois",
    seedPrice: 45,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Printemps",
    growthTime: 11,
    size: "1x1",
    sellPrice: 59,
    harvestYield: 1,
    regrowth: 4,
  },
  // Canne à sucre
  {
    id: "canne-a-sucre",
    name: "Canne à sucre",
    category: "Légumes",
    description: "Couramment cultivé pour son jus, qui peut être transformé en sucre.",
    imagePath: "/images/crops/canne-a-sucre.jpg",
    seedName: "Graines de canne à sucre",
    seedPrice: 50,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps",
    growthTime: 5,
    size: "1x1",
    sellPrice: 23,
    harvestYield: 1,
    regrowth: 1,
    preferences: [
      { name: "Groo", preference: "adore" },
      { name: "Millie", preference: "adore" },
    ],
  },
  // Concombre
  {
    id: "concombre",
    name: "Concombre",
    category: "Légumes",
    description: "Légume vert riche en eau. Rafraîchissant cru.",
    imagePath: "/images/crops/concombre.jpg",
    seedName: "Graines de concombre",
    seedPrice: 25,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps",
    growthTime: 9,
    size: "1x1",
    sellPrice: 41,
    harvestYield: 1,
    regrowth: 3,
  },
  // Laitue
  {
    id: "laitue",
    name: "Laitue",
    category: "Légumes",
    description: "Légumes verts à feuilles souvent utilisés pour les salades.",
    imagePath: "/images/crops/laitue.jpg",
    seedName: "Graines de laitue",
    seedPrice: 20,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Printemps",
    growthTime: 5,
    size: "1x1",
    sellPrice: 47,
    harvestYield: 1,
    preferences: [
      { name: "Jack", preference: "adore" },
    ],
  },
  // Soja
  {
    id: "soja",
    name: "Soja",
    category: "Grain",
    description: "Une excellente source de protéines.",
    imagePath: "/images/crops/soja.jpg",
    seedName: "Graines de soja",
    seedPrice: 20,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps",
    growthTime: 7,
    size: "1x1",
    sellPrice: 19,
    harvestYield: 1,
    regrowth: 4,
    preferences: [
      { name: "Kenny", preference: "adore" },
    ],
  },
  // Perce-neige
  {
    id: "perce-neige",
    name: "Perce-neige",
    category: "Fleur",
    description: "Sa couleur imite la neige et il peut survivre au froid.",
    imagePath: "/images/crops/perce-neige.jpg",
    seedName: "Graines de perce-neige",
    seedPrice: 45,
    seedSource: "Bazar de Sam",
    townRank: "C",
    season: "Printemps,Hiver",
    growthTime: 12,
    size: "1x1",
    sellPrice: 125,
    harvestYield: 1,
  },
  // Bettes
  {
    id: "bettes",
    name: "Bettes",
    category: "Légumes",
    description: "Un légume à feuilles avec une tige violette majestueuse.",
    imagePath: "/images/crops/bettes.jpg",
    seedName: "Graines de blettes",
    seedPrice: 50,
    seedSource: "Bazar de Sam",
    townRank: "D",
    season: "Printemps",
    growthTime: 6,
    size: "1x1",
    sellPrice: 111,
    harvestYield: 1,
  },
  // Banane
  {
    id: "banane",
    name: "Banane",
    category: "Fruit",
    description: "Une baie nutritive et nourrissante. Elle pousse sur les arbres et dégage un parfum doux et sucré.",
    imagePath: "/images/crops/banane.jpg",
    seedName: "Plant de bananier",
    seedPrice: 800,
    seedSource: "Bazar de Sam",
    townRank: "E",
    season: "Printemps,Été",
    growthTime: 10,
    size: "1x1",
    sellPrice: 50,
    harvestYield: 1,
    regrowth: 3,
    preferences: [
      { name: "Ben", preference: "adore" },
    ],
  },
  // Autres cultures à ajouter...
];

// Fonction pour récupérer toutes les cultures
export const getAllCrops = (): Crop[] => {
  return crops;
};

// Fonction pour récupérer les cultures par saison
export const getCropsBySeason = (season: string): Crop[] => {
  return crops.filter(crop => {
    // Vérifier si la saison est présente dans la saison de la culture
    // Cela permet de gérer les cas comme "Printemps,Été"
    return crop.season.split(',').includes(season);
  });
};

// Fonction pour récupérer une culture par ID
export const getCropById = (cropId: string): Crop | undefined => {
  return crops.find(crop => crop.id === cropId);
};

// Fonction pour ajouter une nouvelle culture
export const addCrop = (crop: Crop): void => {
  crops.push(crop);
};

// Fonction pour calculer la rentabilité d'une culture sur une saison (28 jours)
export const calculateProfitability = (crop: Crop): number => {
  if (!crop.sellPrice) return 0;
  
  const totalHarvest = crop.harvestYield || 1;
  const saisonDuration = 28; // Durée d'une saison en jours
  
  // Pour les cultures qui repoussent
  if (crop.regrowth) {
    // Nombre de récoltes possibles sur une saison (incluant la première)
    // La première récolte prend growthTime jours, puis chaque récolte supplémentaire prend regrowth jours
    const firstHarvest = crop.growthTime;
    const timeLeft = saisonDuration - firstHarvest;
    const additionalHarvests = Math.floor(timeLeft / crop.regrowth);
    const totalHarvests = 1 + additionalHarvests;
    
    // Profit total = (prix de vente * récolte totale * nombre de récoltes) - prix des graines (payé une seule fois)
    const totalProfit = (crop.sellPrice * totalHarvest * totalHarvests) - crop.seedPrice;
    
    // Profit par jour sur la saison complète
    return Math.round((totalProfit / saisonDuration) * 10) / 10;
  } 
  // Pour les cultures qui ne repoussent pas
  else {
    // Nombre de récoltes possibles sur une saison
    const totalHarvests = Math.floor(saisonDuration / crop.growthTime);
    
    // Profit total = (prix de vente * récolte par plant) * nombre de récoltes - (prix des graines * nombre de replantations)
    const totalProfit = (crop.sellPrice * totalHarvest * totalHarvests) - (crop.seedPrice * totalHarvests);
    
    // Profit par jour sur la saison complète
    return Math.round((totalProfit / saisonDuration) * 10) / 10;
  }
};

// Fonction pour récupérer les cultures les plus rentables
export const getMostProfitableCrops = (count: number = 5): Crop[] => {
  return [...crops]
    .sort((a, b) => {
      const profitA = calculateProfitability(a);
      const profitB = calculateProfitability(b);
      return profitB - profitA;
    })
    .slice(0, count);
};