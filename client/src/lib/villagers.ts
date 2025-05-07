export type GiftPreference = {
  item: string;       // Nom de l'objet
  category?: string;  // Catégorie optionnelle (ex: "Poisson", "Fleur", etc.)
};

export type Gift = {
  love: GiftPreference[];  // Cadeaux adorés
  like?: GiftPreference[]; // Cadeaux appréciés (optionnel pour l'instant)
};

export type Villager = {
  id: string;           // Identifiant unique (ex: "joko")
  name: string;         // Nom (ex: "Joko")
  birthday?: {          // Optionnel pour les personnages qui n'ont pas d'anniversaire
    day: number;        // Jour d'anniversaire
    season: string;     // Saison d'anniversaire
  };
  occupation: string;   // Métier ou occupation
  description: string;  // Description du personnage
  location?: string;    // Lieu où on peut trouver le personnage (optionnel)
  gifts: Gift;          // Préférences de cadeaux
  relationships?: {     // Relations avec d'autres villageois (optionnel)
    name: string;       // Nom du villageois lié
    type: string;       // Type de relation (ex: "époux", "enfant", "ami", etc.)
  }[];
  romanceable?: boolean; // Indique si on peut avoir une romance avec ce personnage
  species?: string;     // Espèce du personnage (humain, sirène, etc.)
  imagePath?: string;   // Chemin vers l'image du villageois (optionnel)
};

// Liste des villageois avec leurs informations
export const villagers: Villager[] = [
  {
    id: "aaliyah",
    name: "Aaliyah",
    occupation: "Pâtissière",
    description: "Aaliyah est pâtissière. Elle aime les muffins aux pépites de chocolat, les lasagnes aux aubergines et le houmous. Café préféré: le Gesha.",
    romanceable: true,
    species: "Humain",
    gifts: {
      love: [
        { item: "Muffin aux pépites de chocolat" },
        { item: "Lasagnes aux aubergines" },
        { item: "Houmous" },
        { item: "Café Gesha" },
        { item: "Fraise" },
        { item: "Hibiscus blanc" }
      ]
    }
  }
];

// Fonctions d'accès aux données des villageois
export const getAllVillagers = (): Villager[] => {
  return villagers;
};

export const getVillagerById = (villagerId: string): Villager | undefined => {
  return villagers.find(villager => villager.id === villagerId);
};

export const getVillagersBySeason = (season: string): Villager[] => {
  return villagers.filter(
    villager => villager.birthday && villager.birthday.season === season
  );
};

export const getVillagersByLove = (itemName: string): Villager[] => {
  return villagers.filter(villager => 
    villager.gifts.love.some(gift => gift.item.toLowerCase() === itemName.toLowerCase())
  );
};
