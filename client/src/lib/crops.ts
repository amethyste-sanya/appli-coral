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
  // Ajoutez vos cultures ici
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