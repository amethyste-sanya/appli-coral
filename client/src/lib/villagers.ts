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
  birthday: {
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
  imagePath?: string;   // Chemin vers l'image du villageois (optionnel)
};

// Liste des villageois avec leurs informations
export const villagers: Villager[] = [
  {
    id: "joko",
    name: "Joko",
    birthday: {
      day: 4,
      season: "Printemps"
    },
    occupation: "Charpentier",
    description: "Joko est un charpentier local. Il est marié à Dinda, elle aussi charpentière. Il a de la famille sur une île voisine et leur rend visite de temps en temps.",
    relationships: [
      {
        name: "Dinda",
        type: "épouse"
      }
    ],
    gifts: {
      love: [
        { item: "Ananas" },
        { item: "Blettes sautées" },
        { item: "Edamame" },
        { item: "Beignet de banane" },
        { item: "Café" },
        { item: "Riz frit" },
        { item: "Yaourt" },
        { item: "Rose noire" }
      ]
    }
  },
  {
    id: "semeru",
    name: "Semeru",
    birthday: {
      day: 5,
      season: "Printemps"
    },
    occupation: "Chef des gardes",
    description: "Le chef des gardes. Son dévouement indéfectible à la sécurité du royaume n'a d'égal que sa loyauté et son sens du devoir indéfectibles. Il a un homard apprivoisé, Poséidon.",
    gifts: {
      love: [
        { item: "Burger de récif" },
        { item: "Herbiers marins gelés" },
        { item: "Élixir des profondeurs marines" },
        { item: "Toutes les bières", category: "Bière" },
        { item: "Tous les vins sous-marins", category: "Vin sous-marin" },
        { item: "Perle noire" },
        { item: "Café Guésha" },
        { item: "Homard bleu" },
        { item: "Grand café gesha" },
        { item: "Café gesha vieilli" },
        { item: "Grand café gesha vieilli" }
      ]
    }
  },
  {
    id: "paul",
    name: "Paul",
    birthday: {
      day: 7,
      season: "Printemps"
    },
    occupation: "Documentariste animalier",
    description: "Paul est un passionné de la vie sauvage. Avec sa femme, il réalise des documentaires animaliers pour gagner sa vie. Il a un grand cœur et aime la plage.",
    gifts: {
      love: [
        { item: "Houmous" },
        { item: "Fraise" },
        { item: "Tout Jam", category: "Confiture" },
        { item: "Châtaigne" }
      ]
    }
  },
  {
    id: "antonio",
    name: "Antonio",
    birthday: {
      day: 7,
      season: "Printemps"
    },
    occupation: "Propriétaire de boutique",
    description: "Antonio est l'ex-mari de Suki et le père de Valentina. Il est propriétaire de la boutique White Flamingo. Lorsqu'il est à Starlet Town, il séjourne à l'auberge.",
    location: "Boutique White Flamingo / Auberge",
    relationships: [
      {
        name: "Suki",
        type: "ex-épouse"
      },
      {
        name: "Valentina",
        type: "fille"
      }
    ],
    gifts: {
      love: [
        { item: "Serabi" },
        { item: "Café" }
      ]
    }
  }
];

// Fonction pour récupérer tous les villageois
export const getAllVillagers = (): Villager[] => {
  return villagers;
};

// Fonction pour récupérer un villageois par son identifiant
export const getVillagerById = (villagerId: string): Villager | undefined => {
  return villagers.find(villager => villager.id === villagerId);
};

// Fonction pour récupérer les villageois par saison d'anniversaire
export const getVillagersBySeason = (season: string): Villager[] => {
  return villagers.filter(villager => villager.birthday.season === season);
};

// Fonction pour récupérer les villageois qui aiment un objet particulier
export const getVillagersByLove = (itemName: string): Villager[] => {
  return villagers.filter(villager => 
    villager.gifts.love.some(gift => 
      gift.item === itemName || 
      (gift.category && itemName.includes(gift.category))
    )
  );
};