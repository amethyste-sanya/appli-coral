// Structure de données pour les recettes de Coral Island

// Type pour les matériaux requis
export type Material = {
  name: string;         // Nom du matériau
  quantity: number;     // Quantité nécessaire
  itemId?: string;      // ID optionnel pour référencer l'item dans une autre liste
};

// Type pour les recettes
export type Recipe = {
  id: string;           // Identifiant unique de la recette
  name: string;         // Nom de la recette
  category: string;     // Catégorie (outils, tissus, agriculture, etc.)
  subcategory?: string; // Sous-catégorie (pour la cuisine : equipment, etc.)
  materials: Material[]; // Matériaux nécessaires
  level: string;        // Niveau requis pour débloquer
  description?: string; // Description optionnelle
  imagePath?: string;   // Chemin vers l'image (optionnel)
  season?: string;      // Saison où la recette est disponible (optionnel)
  sellPrice?: number;   // Prix de vente (optionnel)
  energy?: number;      // Énergie fournie si c'est de la nourriture (optionnel)
  effects?: string[];   // Effets spéciaux (optionnel)
};

// Exemple de recettes (à remplacer par les vraies données du jeu)
export const recipes: Recipe[] = [
  {
    id: "improved_watering_can",
    name: "Arrosoir amélioré",
    category: "tools",
    materials: [
      { name: "Arrosoir", quantity: 1 },
      { name: "Minerai de cuivre", quantity: 5 },
      { name: "Barre de fer", quantity: 1 }
    ],
    level: "Fermier niveau 3",
    description: "Un arrosoir de meilleure qualité qui contient plus d'eau.",
    imagePath: "/images/tools/improved_watering_can.png" // Chemin d'exemple
  },
  {
    id: "copper_pickaxe",
    name: "Pioche en cuivre",
    category: "tools",
    materials: [
      { name: "Pioche en bois", quantity: 1 },
      { name: "Minerai de cuivre", quantity: 10 },
      { name: "Bûches", quantity: 5 }
    ],
    level: "Mineur niveau 2",
    description: "Une pioche plus solide pour extraire des minéraux plus durs.",
    imagePath: "/images/tools/copper_pickaxe.png" // Chemin d'exemple
  },
  {
    id: "veggie_preserve",
    name: "Conserves de légumes",
    category: "cooking",
    materials: [
      { name: "Bocal vide", quantity: 1 },
      { name: "Légumes au choix", quantity: 3 },
      { name: "Sel", quantity: 1 }
    ],
    level: "Cuisine niveau 2",
    description: "Des légumes conservés dans un bocal pour une utilisation future.",
    imagePath: "/images/cooking/veggie_preserve.png", // Chemin d'exemple
    energy: 35
  },
  {
    id: "fish_soup",
    name: "Soupe de poisson",
    category: "cooking",
    materials: [
      { name: "Poisson (n'importe quel type)", quantity: 2 },
      { name: "Pomme de terre", quantity: 1 },
      { name: "Herbes", quantity: 1 }
    ],
    level: "Cuisine niveau 3",
    description: "Une soupe chaude et nourrissante à base de poisson frais.",
    imagePath: "/images/cooking/fish_soup.png", // Chemin d'exemple
    energy: 50,
    effects: ["Augmente l'endurance pendant 60 min"]
  }
];

// Fonction pour récupérer toutes les recettes
export const getAllRecipes = (): Recipe[] => {
  return recipes;
};

// Fonction pour récupérer les recettes par catégorie
export const getRecipesByCategory = (categoryId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.category === categoryId);
};

// Fonction pour récupérer une recette par son ID
export const getRecipeById = (recipeId: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === recipeId);
};

// Fonction pour ajouter une nouvelle recette
export const addRecipe = (recipe: Recipe): void => {
  recipes.push(recipe);
};