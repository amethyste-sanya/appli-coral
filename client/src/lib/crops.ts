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
};

// Liste des cultures
export const crops: Crop[] = [
  {
    id: "navet",
    name: "Navet",
    category: "Légumes",
    description: "Un légume-racine légèrement épicé.",
    imagePath: "/images/crops/navet.jpg",
    seedName: "Graines de navet",
    seedPrice: 15,
    seedSource: "Bazar de Sam",
    townRank: "F",
    season: "Printemps",
    growthTime: 4,
    size: "1x1",
    sellPrice: 35,
    harvestYield: 1,
    energy: 20,
    preferences: [
      { name: "Aaliyah", preference: "aime" },
      { name: "Eva", preference: "aime" },
      { name: "Scott", preference: "aime" },
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
  return crops.filter(crop => crop.season === season);
};

// Fonction pour récupérer une culture par ID
export const getCropById = (cropId: string): Crop | undefined => {
  return crops.find(crop => crop.id === cropId);
};

// Fonction pour ajouter une nouvelle culture
export const addCrop = (crop: Crop): void => {
  crops.push(crop);
};

// Fonction pour calculer la rentabilité d'une culture
export const calculateProfitability = (crop: Crop): number => {
  if (!crop.sellPrice) return 0;
  
  const totalHarvest = crop.harvestYield || 1;
  const totalProfit = crop.sellPrice * totalHarvest - crop.seedPrice;
  
  return totalProfit;
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