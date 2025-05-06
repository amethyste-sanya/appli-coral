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
  materials: Material[]; // Matériaux nécessaires
  level: string;        // Niveau requis pour débloquer
  description?: string; // Description optionnelle
  imagePath?: string;   // Chemin vers l'image (optionnel)
  season?: string;      // Saison où la recette est disponible (optionnel)
  sellPrice?: number;   // Prix de vente (optionnel)
  energy?: number;      // Énergie fournie si c'est de la nourriture (optionnel)
  effects?: string[];   // Effets spéciaux (optionnel)
};

// Liste des recettes du jeu
export const recipes: Recipe[] = [
  // Outils - Houes
  {
    id: "basic_hoe",
    name: "Houe",
    category: "tools",
    materials: [],
    level: "Départ",
    description: "La houe de départ. Laboure jusqu'à 1 case.",
    sellPrice: 0
  },
  {
    id: "bronze_hoe",
    name: "Houe de bronze",
    category: "tools",
    materials: [
      { name: "Houe", quantity: 1 },
      { name: "Barres de bronze", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "La houe de bronze laboure 1x3 cases.",
    sellPrice: 1500
  },
  {
    id: "silver_hoe",
    name: "Houe en argent",
    category: "tools",
    materials: [
      { name: "Houe en bronze", quantity: 1 },
      { name: "Lingots d'argent", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "La houe en argent laboure 3x3 cases.",
    sellPrice: 3000
  },
  {
    id: "gold_hoe",
    name: "Houe en or",
    category: "tools",
    materials: [
      { name: "Houe en argent", quantity: 1 },
      { name: "Lingots d'or", quantity: 3 },
      { name: "Bois dur", quantity: 5 }
    ],
    level: "Fabrication",
    description: "La houe en or laboure 5x3 cases.",
    sellPrice: 10000
  },
  
  // Outils - Haches
  {
    id: "basic_axe",
    name: "Hache",
    category: "tools",
    materials: [],
    level: "Départ",
    description: "",
    sellPrice: 0
  },
  {
    id: "bronze_axe",
    name: "Hache de bronze",
    category: "tools",
    materials: [
      { name: "Hache", quantity: 1 },
      { name: "Barres de bronze", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 1500
  },
  {
    id: "silver_axe",
    name: "Hache en argent",
    category: "tools",
    materials: [
      { name: "Hache en bronze", quantity: 1 },
      { name: "Lingots d'argent", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 3000
  },
  {
    id: "gold_axe",
    name: "Hache en or",
    category: "tools",
    materials: [
      { name: "Hache en argent", quantity: 1 },
      { name: "Lingots d'or", quantity: 3 },
      { name: "Bois dur", quantity: 5 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 10000
  },
  
  // Outils - Pioches
  {
    id: "basic_pickaxe",
    name: "Pioche",
    category: "tools",
    materials: [],
    level: "Départ",
    description: "",
    sellPrice: 0
  },
  {
    id: "bronze_pickaxe",
    name: "Pioche de bronze",
    category: "tools",
    materials: [
      { name: "Pioche", quantity: 1 },
      { name: "Barres de bronze", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 1500
  },
  {
    id: "silver_pickaxe",
    name: "Pioche en argent",
    category: "tools",
    materials: [
      { name: "Pioche en bronze", quantity: 1 },
      { name: "Lingots d'argent", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 3000
  },
  {
    id: "gold_pickaxe",
    name: "Pioche en or",
    category: "tools",
    materials: [
      { name: "Pioche en argent", quantity: 1 },
      { name: "Lingots d'or", quantity: 3 },
      { name: "Bois dur", quantity: 5 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 10000
  },
  
  // Outils - Arrosoirs
  {
    id: "basic_watering_can",
    name: "Arrosoir",
    category: "tools",
    materials: [],
    level: "Départ",
    description: "",
    sellPrice: 0
  },
  {
    id: "bronze_watering_can",
    name: "Arrosoir de bronze",
    category: "tools",
    materials: [
      { name: "Arrosoir", quantity: 1 },
      { name: "Barres de bronze", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 1500
  },
  {
    id: "silver_watering_can",
    name: "Arrosoir en argent",
    category: "tools",
    materials: [
      { name: "Arrosoir en bronze", quantity: 1 },
      { name: "Lingots d'argent", quantity: 5 },
      { name: "Bois", quantity: 20 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 3000
  },
  {
    id: "gold_watering_can",
    name: "Arrosoir en or",
    category: "tools",
    materials: [
      { name: "Arrosoir en argent", quantity: 1 },
      { name: "Lingots d'or", quantity: 3 },
      { name: "Bois dur", quantity: 5 }
    ],
    level: "Fabrication",
    description: "",
    sellPrice: 10000
  },
  
  // Cuisine
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