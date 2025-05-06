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
  
  // Équipement de cuisine
  {
    id: "frying_pan",
    name: "Poêle à frire",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Lingot de cuivre", quantity: 3 },
      { name: "Barre de fer", quantity: 1 },
      { name: "Bois", quantity: 5 }
    ],
    level: "Cuisine niveau 1",
    description: "Essentiel pour faire sauter et frire les aliments."
  },
  {
    id: "chef_knife",
    name: "Couteau de chef",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Lingot de fer", quantity: 2 },
      { name: "Bois dur", quantity: 1 }
    ],
    level: "Cuisine niveau 1",
    description: "Un couteau de qualité pour découper les ingrédients avec précision."
  },
  {
    id: "oven",
    name: "Four",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Brique", quantity: 20 },
      { name: "Lingot de fer", quantity: 5 },
      { name: "Verre", quantity: 3 }
    ],
    level: "Cuisine niveau 2",
    description: "Permet de cuire au four et de faire des pâtisseries."
  },
  {
    id: "pot",
    name: "Casserole",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Lingot de cuivre", quantity: 4 },
      { name: "Barre de fer", quantity: 1 }
    ],
    level: "Cuisine niveau 1",
    description: "Idéale pour les soupes, les ragoûts et les cuissons à l'eau."
  },
  {
    id: "ceramic_bowl",
    name: "Bol en céramique",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Argile", quantity: 5 },
      { name: "Terre siliceuse", quantity: 2 }
    ],
    level: "Cuisine niveau 1",
    description: "Un bol durable et élégant pour la préparation et le service."
  },
  {
    id: "blender",
    name: "Mixeur",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Verre", quantity: 2 },
      { name: "Lingot de fer", quantity: 3 },
      { name: "Circuit", quantity: 1 }
    ],
    level: "Cuisine niveau 3",
    description: "Parfait pour les smoothies, les purées et les sauces."
  },
  {
    id: "grill",
    name: "Grill",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Barre de fer", quantity: 8 },
      { name: "Brique", quantity: 10 },
      { name: "Charbon", quantity: 5 }
    ],
    level: "Cuisine niveau 2",
    description: "Pour griller viandes, poissons et légumes avec une saveur fumée."
  },
  {
    id: "seasoning_set",
    name: "Ensemble d'assaisonnement",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Verre", quantity: 3 },
      { name: "Herbes", quantity: 5 },
      { name: "Sel", quantity: 3 }
    ],
    level: "Cuisine niveau 2",
    description: "Une collection d'épices et herbes pour rehausser vos plats."
  },
  {
    id: "skillet",
    name: "Poêlon",
    category: "cooking",
    subcategory: "equipment",
    materials: [
      { name: "Fonte", quantity: 4 },
      { name: "Bois", quantity: 2 }
    ],
    level: "Cuisine niveau 2",
    description: "Une poêle profonde en fonte, excellente pour la cuisine à haute température."
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

// Fonction pour récupérer les recettes par sous-catégorie
export const getRecipesBySubcategory = (categoryId: string, subcategoryId: string): Recipe[] => {
  return recipes.filter(recipe => 
    recipe.category === categoryId && 
    recipe.subcategory === subcategoryId
  );
};

// Fonction pour récupérer les sous-catégories d'une catégorie
export const getSubcategories = (categoryId: string): string[] => {
  const subcategories = new Set<string>();
  
  recipes
    .filter(recipe => recipe.category === categoryId && recipe.subcategory)
    .forEach(recipe => {
      if (recipe.subcategory) {
        subcategories.add(recipe.subcategory);
      }
    });
    
  return Array.from(subcategories);
};

// Fonction pour récupérer une recette par son ID
export const getRecipeById = (recipeId: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === recipeId);
};

// Fonction pour ajouter une nouvelle recette
export const addRecipe = (recipe: Recipe): void => {
  recipes.push(recipe);
};