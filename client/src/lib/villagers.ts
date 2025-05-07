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
  /* Fiche supprimée */
  {
    id: "alice",
    name: "Alice",
    birthday: {
      day: 18,
      season: "Été"
    },
    occupation: "Artiste",
    description: "Alice est une artiste qui vit à Coral Island.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Huile d'amande" },
        { item: "Colorant" },
        { item: "Smoothie vert" },
        { item: "Tarte au jacquier hachée" },
        { item: "Huile d'olive" }
      ]
    }
  },
  {
    id: "connor",
    name: "Connor",
    birthday: {
      day: 5,
      season: "Été"
    },
    occupation: "Maire",
    description: "Avant de devenir maire, Connor tenait son propre magasin général avec sa défunte épouse, Carol. Il porte un chapeau.",
    romanceable: false,
    gifts: {
      love: [
        { item: "Bok choy" },
        { item: "Gâteau renversé à l'ananas" },
        { item: "Saké" },
        { item: "Huile de truffe blanche" }
      ]
    }
  },
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
    romanceable: false,
    gifts: {
      love: [
        { item: "Beignet de banane" },
        { item: "Café" },
        { item: "Edamame" },
        { item: "Riz frit" },
        { item: "Ananas" },
        { item: "Bette sautée" },
        { item: "Yaourt" }
      ]
    }
  },
  {
    id: "luc",
    name: "Luc",
    birthday: {
      day: 16,
      season: "Automne"
    },
    occupation: "Chef d'entreprise",
    description: "Luke dirige Socket & Pan Electronics et son entreprise familiale, Hillside Manor and Vineyard. Il est connu pour être un fin gourmet et pour sa tendance à trop réfléchir.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Croissant au beurre" },
        { item: "Lasagnes aux aubergines" },
        { item: "Ratatouille" },
        { item: "Soupe de tomates" },
        { item: "Ragoût" },
        { item: "Vin" }
      ]
    }
  },
  {
    id: "youri",
    name: "Youri",
    birthday: {
      day: 28,
      season: "Été"
    },
    occupation: "Médecin",
    description: "Yuri a consacré des années à offrir bénévolement ses services médicaux à un programme international de médecins, sans être rémunérée, voire presque, avant de s'installer à Coral Island. Elle aime jouer aux échecs et au billard.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Muffin aux pépites de chocolat" },
        { item: "Sandwich au poisson" },
        { item: "Poisson-grenouille" },
        { item: "Curry vert" },
        { item: "Homard" },
        { item: "Curry rouge" },
        { item: "Choucroute épicée" }
      ]
    }
  },
  {
    id: "ben",
    name: "Ben",
    birthday: {
      day: 22,
      season: "Printemps"
    },
    occupation: "Inconnu",
    description: "Ben possède une vaste collection de cristaux de guérison. Il adore les voyages en voiture et se fait plaisir en dépensant son argent dans des festivals de musique.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Banane" },
        { item: "Thé vert" },
        { item: "Champignons" }
      ]
    }
  },
  {
    id: "kira",
    name: "Kira",
    occupation: "Chasseuse (BOS)",
    description: "Kira est membre du BOS, un groupe international de chasseurs. Elle passe ses journées en forêt, à surveiller la caverne. Elle ne fête pas ses anniversaires.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Fleur" }
      ]
    }
  },
  {
    id: "sam",
    name: "Sam",
    birthday: {
      day: 8,
      season: "Été"
    },
    occupation: "Épicier",
    description: "Sam est propriétaire et gérant de l'épicerie. Il consacre son temps libre à des exercices cérébraux, comme les échecs, les puzzles et les mots croisés. Il va également danser avec sa femme, Emily.",
    romanceable: false,
    relationships: [
      {
        name: "Emily",
        type: "épouse"
      }
    ],
    gifts: {
      love: [
        { item: "Puzzle" }
      ]
    }
  },
  {
    id: "lis",
    name: "Lis",
    birthday: {
      day: 19,
      season: "Hiver"
    },
    occupation: "Spécialiste en cybersécurité",
    description: "Lily travaille à distance pour une entreprise de cybersécurité et n'a pas d'horaires fixes. Elle aime la solitude et les bonsaïs.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Bonsaï" }
      ]
    }
  },
  {
    id: "jack",
    name: "Jack",
    occupation: "Éleveur",
    description: "Jack est l'éleveur de l'île et vit avec sa famille dans une humble cabane en pleine forêt. Il ne fête pas les anniversaires.",
    romanceable: false,
    gifts: {
      love: [
        { item: "Lait" }
      ]
    }
  },
  {
    id: "alice_auberge",
    name: "Alice (Auberge)",
    birthday: {
      day: 27,
      season: "Hiver"
    },
    occupation: "Gérante d'auberge",
    description: "Alice gère l'auberge familiale avec sa sœur jumelle, Suki. Elle aime discuter de phénomènes inexpliqués, qu'elle a étudiés à l'université.",
    relationships: [
      {
        name: "Suki",
        type: "sœur jumelle"
      }
    ],
    romanceable: true,
    gifts: {
      love: [
        { item: "Livre" }
      ]
    }
  },
  {
    id: "anne",
    name: "Anne",
    birthday: {
      day: 24,
      season: "Été"
    },
    occupation: "Vidéaste animalière",
    description: "Passionnée de la faune, Anne aime aller à la plage et jouer au volley-ball avec sa famille lorsqu'elle n'est pas occupée à monter des vidéos.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Carotte" }, 
        { item: "Jus de fruits" }, 
        { item: "Tempeh frit" }, 
        { item: "Thé vert" }, 
        { item: "Houmous" }, 
        { item: "Kimchi" }, 
        { item: "Tournesol" }
      ]
    }
  },
  {
    id: "archie",
    name: "Archie",
    birthday: {
      day: 24,
      season: "Hiver"
    },
    occupation: "Aspirant vétérinaire",
    description: "On peut parfois croiser Archie dans les vignes, jouant avec Taco. Il adore les animaux et rêve de devenir vétérinaire.",
    relationships: [
      {
        name: "Taco",
        type: "animal de compagnie"
      }
    ],
    romanceable: true,
    gifts: {
      love: [
        { item: "Toutes les pierres précieuses" },
        { item: "Pâtes au pesto de basilic" },
        { item: "Burrito" },
        { item: "Taco de poisson" },
        { item: "Crème glacée" },
        { item: "Citrouille" }
      ]
    }
  },
  {
    id: "betty",
    name: "Betty",
    birthday: {
      day: 13,
      season: "Hiver"
    },
    occupation: "Retraitée",
    description: "Betty est à la retraite et passe ses journées à remplir les mangeoires à oiseaux de la ville, à éduquer les enfants sur les récifs coralliens et à préparer des pâtisseries.",
    romanceable: false,
    relationships: [
      {
        name: "Noah",
        type: "fils"
      }
    ],
    gifts: {
      love: [
        { item: "Chou-fleur" },
        { item: "Jonquille" },
        { item: "Thé vert" },
        { item: "Gâteau Red Velvet" }
      ]
    }
  },
  {
    id: "bree",
    name: "Bree",
    birthday: {
      day: 14,
      season: "Automne"
    },
    occupation: "Propriétaire de vignoble",
    description: "Bree est propriétaire du Hillside Manor and Vineyard. Ancienne mannequin, elle consacre désormais ses journées à l'agriculture et à la gestion de son foyer.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Taco de poisson" },
        { item: "Jacquier" },
        { item: "Taco végétalien" },
        { item: "Vin" }
      ]
    }
  },
  {
    id: "charles",
    name: "Charles",
    birthday: {
      day: 4,
      season: "Hiver"
    },
    occupation: "Médecin",
    description: "Charles est médecin local. Il profite de son temps libre pour discuter avec les insulaires à la taverne et se contente parfois de prodiguer des conseils médicaux.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Myrtille" },
        { item: "Burrito" },
        { item: "Biscuits" },
        { item: "Diamant" },
        { item: "Falafel" },
        { item: "Fraise" }
      ]
    }
  },
  {
    id: "dinda",
    name: "Dinda",
    birthday: {
      day: 21,
      season: "Été"
    },
    occupation: "Menuisière",
    description: "Dinda est une menuisière locale. Elle affirme que la menuiserie est une passion, pas un métier. Elle entretient son jardin d'herbes aromatiques et participe à des activités communautaires pendant son temps libre.",
    romanceable: false,
    relationships: [
      {
        name: "Joko",
        type: "époux"
      }
    ],
    gifts: {
      love: [
        { item: "Salade fraîche" },
        { item: "Bouquet de fleurs" },
        { item: "Melon" },
        { item: "Perle" }
      ]
    }
  },
  {
    id: "dippa",
    name: "Dippa",
    birthday: {
      day: 25,
      season: "Automne"
    },
    occupation: "Artiste",
    description: "Dippa aime se perdre dans la création artistique. Comme ils le disaient autrefois, la raison est ennuyeuse, et pour eux, l'ennui n'est pas la vie.",
    romanceable: true,
    relationships: [
      {
        name: "Emma",
        type: "compagne"
      }
    ],
    gifts: {
      love: [
        { item: "Taco de poisson" },
        { item: "Hot-dog aux champignons" },
        { item: "Quiche aux champignons et poireaux" },
        { item: "Rubis" }
      ]
    }
  },
  {
    id: "emily",
    name: "Émilie",
    birthday: {
      day: 16,
      season: "Hiver"
    },
    occupation: "Coiffeuse",
    description: "Emily travaille comme coiffeuse et gère, avec Erika, le salon attenant à la clinique. Elle et son mari, Sam, habitent au deuxième étage de l'épicerie.",
    romanceable: false,
    relationships: [
      {
        name: "Sam",
        type: "époux"
      },
      {
        name: "Erika",
        type: "collègue"
      }
    ],
    gifts: {
      love: [
        { item: "Sandwich aux légumes" },
        { item: "Limonade" },
        { item: "Guimauve" },
        { item: "Chou-fleur" }
      ]
    }
  },
  {
    id: "emma",
    name: "Emma",
    birthday: {
      day: 13,
      season: "Été"
    },
    occupation: "Propriétaire de food truck",
    description: "Emma mène une vie tranquille avec sa compagne, Dippa, et n'est pas une grande fan des sorties nocturnes. Elle est l'heureuse propriétaire d'un camion de tacos.",
    romanceable: true,
    relationships: [
      {
        name: "Dippa",
        type: "compagne"
      }
    ],
    gifts: {
      love: [
        { item: "Burrito" },
        { item: "Taco de poisson" },
        { item: "Avocat" },
        { item: "Crème glacée" },
        { item: "Amarante" }
      ]
    }
  },
  {
    id: "erika",
    name: "Erika",
    birthday: {
      day: 8,
      season: "Hiver"
    },
    occupation: "Coiffeuse",
    description: "Lorsqu'elle ne travaille pas au salon de coiffure, Erika fait du bénévolat à l'école ou traîne en ville, prêtant une oreille attentive et donnant des conseils, gratuitement.",
    romanceable: true,
    relationships: [
      {
        name: "Emily",
        type: "collègue"
      },
      {
        name: "Frank",
        type: "ami"
      },
      {
        name: "Peanut",
        type: "animal de compagnie"
      }
    ],
    gifts: {
      love: [
        { item: "Limonade" },
        { item: "Quiche aux légumes" },
        { item: "Myrtille" },
        { item: "Topaze" },
        { item: "Fraise" }
      ]
    }
  },
  {
    id: "eva",
    name: "Eva",
    birthday: {
      day: 13,
      season: "Été"
    },
    occupation: "Boulangère",
    description: "Eva est une boulangère talentueuse qui aime parler aux insulaires – locaux, nouveaux arrivants, visiteurs, tout le monde – et elle a beaucoup de bons amis.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Pain" }
      ]
    }
  },
  {
    id: "frank",
    name: "Franc",
    birthday: {
      day: 16,
      season: "Été"
    },
    occupation: "Gérant de taverne",
    description: "Frank gère la taverne avec son frère Noah. Il adore cuisiner et les scooters vintage. Il a deux chats très gâtés, Peanut et Butter.",
    romanceable: true,
    relationships: [
      {
        name: "Noah",
        type: "frère"
      },
      {
        name: "Peanut",
        type: "animal de compagnie"
      },
      {
        name: "Butter",
        type: "animal de compagnie"
      }
    ],
    gifts: {
      love: [
        { item: "Scooter miniature" }
      ]
    }
  },
  {
    id: "jim",
    name: "Jim",
    birthday: {
      day: 6,
      season: "Automne"
    },
    occupation: "Cuisinier",
    description: "Jim aide Sunny à gérer le Beach Shack en tant que cuisinier. Il prépare un saumon fumé exceptionnel qu'il vend parfois au bar.",
    romanceable: true,
    relationships: [
      {
        name: "Sunny",
        type: "patron"
      }
    ],
    gifts: {
      love: [
        { item: "Saumon" }
      ]
    }
  },
  {
    id: "kenny",
    name: "Kenny",
    birthday: {
      day: 9,
      season: "Printemps"
    },
    occupation: "Inconnu",
    description: "Kenny a vécu sur l'île de Corail toute sa vie et a noué des relations étroites avec d'autres insulaires, des gens, des animaux, des arbres, des esprits d'au-delà - tous.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Objet mystique" }
      ]
    }
  },
  {
    id: "leah",
    name: "Léa",
    birthday: {
      day: 24,
      season: "Été"
    },
    occupation: "Professeure de yoga",
    description: "Leah est professeure de yoga indépendante au centre communautaire. Elle vit dans une vieille maison avec son père, Randy, et sa belle-mère, Ling.",
    romanceable: true,
    relationships: [
      {
        name: "Randy",
        type: "père"
      },
      {
        name: "Ling",
        type: "belle-mère"
      }
    ],
    gifts: {
      love: [
        { item: "Tapis de yoga" }
      ]
    }
  },
  {
    id: "ling",
    name: "Ling",
    birthday: {
      day: 17,
      season: "Printemps"
    },
    occupation: "Biologiste marine",
    description: "Ling est biologiste marine. Elle consacre sa vie à l'étude des récifs coralliens et au développement de méthodes pour améliorer les pratiques agricoles grâce aux minéraux marins.",
    romanceable: true,
    relationships: [
      {
        name: "Randy",
        type: "époux"
      },
      {
        name: "Leah",
        type: "belle-fille"
      }
    ],
    gifts: {
      love: [
        { item: "Échantillon de corail" },
        { item: "Combinaison de plongée" },
        { item: "Miel" },
        { item: "Émeraude" },
        { item: "Algue marine rare" }
      ]
    }
  },
  {
    id: "macy",
    name: "Macy",
    birthday: {
      day: 25,
      season: "Printemps"
    },
    occupation: "Photographe",
    description: "Macy a grandi sur une île voisine. Ses passions sont la photographie, les animaux et la nature. Elle a un homard sauvé, Stephen.",
    romanceable: true,
    relationships: [
      {
        name: "Stephen",
        type: "animal de compagnie"
      }
    ],
    gifts: {
      love: [
        { item: "Appareil photo" }
      ]
    }
  },
  {
    id: "millie",
    name: "Millie",
    birthday: {
      day: 3,
      season: "Hiver"
    },
    occupation: "Bibliothécaire/Conservatrice de musée",
    description: "Millie travaille à la bibliothèque et supervise le musée. Elle consacre son temps libre à observer les oiseaux et à restaurer de vieux livres.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Livre ancien" }
      ]
    }
  },
  {
    id: "nina",
    name: "Nina",
    birthday: {
      day: 24,
      season: "Hiver"
    },
    occupation: "Inconnue",
    description: "La villa sur la plage est l'une des nombreuses résidences secondaires de Nina. Instruite, humble et coquette par nature, elle apprécie les vacances luxueuses.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Bijou" }
      ]
    }
  },
  {
    id: "noah",
    name: "Noé",
    birthday: {
      day: 10,
      season: "Hiver"
    },
    occupation: "Gérant de Fishensips",
    description: "Noah passe ses journées à s'occuper de Fishensips. Lors des rares occasions où il est libre, il apprécie les longues promenades avec sa mère, Betty, et discute de théories sur des phénomènes inexpliqués avec son amie proche, Alice.",
    romanceable: true,
    relationships: [
      {
        name: "Betty",
        type: "mère"
      },
      {
        name: "Frank",
        type: "frère"
      },
      {
        name: "Alice",
        type: "amie"
      }
    ],
    gifts: {
      love: [
        { item: "Poisson rare" },
        { item: "Café" },
        { item: "Huile d'olive" },
        { item: "Miel" },
        { item: "Burrito" },
        { item: "Tarte à la citrouille" }
      ]
    }
  },
  {
    id: "oliver",
    name: "Olivier",
    birthday: {
      day: 12,
      season: "Printemps"
    },
    occupation: "Écolier",
    description: "Oliver veut rejoindre la police quand il sera grand. Il adore les séries policières et rêve de devenir inspecteur.",
    romanceable: false,
    gifts: {
      love: [
        { item: "Badge de policier" }
      ]
    }
  },
  {
    id: "pablo",
    name: "Pablo",
    birthday: {
      day: 27,
      season: "Printemps"
    },
    occupation: "Forgeron",
    description: "Pablo est un forgeron local. Très apprécié, charismatique et séducteur, il est toujours prêt à jouer au billard avec ses amis le soir au Fishensips.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Métal rare" }
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
    romanceable: false,
    gifts: {
      love: [
        { item: "Houmous" },
        { item: "Fraise" },
        { item: "Confiture", category: "Confiture" },
        { item: "Châtaigne" }
      ]
    }
  },
  {
    id: "rafael",
    name: "Rafael",
    birthday: {
      day: 4,
      season: "Automne"
    },
    occupation: "Forgeron",
    description: "Rafael est un forgeron local. Il est réservé et privilégie le silence, ce qu'il considère comme un avantage de son métier.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Minerai" }
      ]
    }
  },
  {
    id: "randy",
    name: "Randy",
    birthday: {
      day: 19,
      season: "Automne"
    },
    occupation: "Enseignant",
    description: "Randy Barnes est un enseignant doté d'une remarquable capacité à expliquer des idées complexes de manière simple et accessible. Il est passionné de littérature classique.",
    romanceable: false,
    relationships: [
      {
        name: "Ling",
        type: "épouse"
      },
      {
        name: "Leah",
        type: "fille"
      }
    ],
    gifts: {
      love: [
        { item: "Livre classique" }
      ]
    }
  },
  {
    id: "scott",
    name: "Scott",
    birthday: {
      day: 12,
      season: "Printemps"
    },
    occupation: "Collectionneur",
    description: "Scott est toujours prêt à s'amuser et ne s'ennuie jamais. Il s'est découvert une passion pour les objets et a consacré sa vie à leur préservation.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Objet ancien" }
      ]
    }
  },
  {
    id: "suki",
    name: "Suki",
    birthday: {
      day: 27,
      season: "Hiver"
    },
    occupation: "Gérante d'auberge",
    description: "Suki gère l'auberge avec sa sœur jumelle, Alice. Maman avant tout, tout le reste passe après. Une vie saine est importante pour elle.",
    romanceable: true,
    relationships: [
      {
        name: "Alice",
        type: "sœur jumelle"
      },
      {
        name: "Antonio",
        type: "ex-époux"
      },
      {
        name: "Valentina",
        type: "fille"
      }
    ],
    gifts: {
      love: [
        { item: "Smoothie" }
      ]
    }
  },
  {
    id: "sunny",
    name: "Sunny",
    birthday: {
      day: 26,
      season: "Automne"
    },
    occupation: "Gérant du Beach Shack",
    description: "Sunny gère le Beach Shack. Bien qu'il ne pêche plus souvent, il garde toujours des photos de ses prises de poissons géants à l'étage de sa maison.",
    romanceable: true,
    relationships: [
      {
        name: "Jim",
        type: "employé"
      }
    ],
    gifts: {
      love: [
        { item: "Poisson rare" }
      ]
    }
  },
  {
    id: "surya",
    name: "Surya",
    birthday: {
      day: 25,
      season: "Automne"
    },
    occupation: "Biologiste marin",
    description: "Surya est un biologiste marin qui travaille au laboratoire en semaine. Il passe son temps libre avec ses amis.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Spécimen marin" }
      ]
    }
  },
  {
    id: "taco",
    name: "Taco",
    occupation: "Chien",
    description: "Un chien. Vit dans le vignoble.",
    species: "Chien",
    romanceable: false,
    relationships: [
      {
        name: "Archie",
        type: "ami"
      }
    ],
    gifts: {
      love: [
        { item: "Os" }
      ]
    }
  },
  {
    id: "theo",
    name: "Théo",
    birthday: {
      day: 11,
      season: "Automne"
    },
    occupation: "Pêcheur",
    description: "Théo est un pêcheur local qui passe la plupart de ses journées à pêcher ou à jouer de la guitare. Le week-end, il se produit au Fishensips pour gagner rapidement de l'argent.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Guitare" }
      ]
    }
  },
  {
    id: "valentina",
    name: "Valentina",
    birthday: {
      day: 3,
      season: "Été"
    },
    occupation: "Étudiante",
    description: "Valentina aime passer du temps avec ses amis et sa famille. Elle vit à l'auberge et joue souvent à la plage.",
    romanceable: false,
    relationships: [
      {
        name: "Suki",
        type: "mère"
      },
      {
        name: "Antonio",
        type: "père"
      }
    ],
    gifts: {
      love: [
        { item: "Jouet de plage" }
      ]
    }
  },
  {
    id: "walter",
    name: "Walter",
    birthday: {
      day: 20,
      season: "Printemps"
    },
    occupation: "Ancien avocat/Propriétaire de vignoble",
    description: "Walter est un ancien avocat influent. Il est aujourd'hui propriétaire du Hillside Manor and Vineyard.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Vin de qualité" }
      ]
    }
  },
  {
    id: "zoe",
    name: "Zoé",
    birthday: {
      day: 8,
      season: "Hiver"
    },
    occupation: "Étudiante",
    description: "Zoé est une passionnée de la faune, tout comme ses parents. Elle aime le volley-ball, l'observation des oiseaux et l'hiver.",
    romanceable: false,
    gifts: {
      love: [
        { item: "Jumelles" }
      ]
    }
  },
  {
    id: "zarah",
    name: "Zarah",
    birthday: {
      day: 16,
      season: "Été"
    },
    occupation: "Exploratrice",
    description: "Zarah est une aventurière dans l'âme. Elle aime explorer l'île à la recherche de toutes sortes de trésors : pierres précieuses, artefacts ou vestiges historiques.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Artefact" }
      ]
    }
  },
  {
    id: "denali",
    name: "Denali",
    birthday: {
      day: 10,
      season: "Été"
    },
    occupation: "Gardienne royale",
    description: "Gardienne royale. Elle perpétue l'héritage de sa famille, garante de la protection du royaume.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Équipement de garde" }
      ]
    }
  },
  {
    id: "karen",
    name: "Karen",
    occupation: "Directrice de Pufferfish Corp.",
    description: "Karen est la directrice de la succursale de Pufferfish Corp. Elle est une joueuse d'équipe autoproclamée.",
    romanceable: false,
    gifts: {
      love: [
        { item: "Café de luxe" }
      ]
    }
  },
  {
    id: "chef_clan",
    name: "Chef de clan",
    occupation: "Chef du Village des Géants",
    description: "Le chef du Village des Géants. Une figure respectée.",
    romanceable: false,
    gifts: {
      love: [
        { item: "Offrande traditionnelle" }
      ]
    }
  },
  {
    id: "peanut",
    name: "Peanut",
    occupation: "Chat",
    description: "Un chat. Vit avec Erika et Frank.",
    species: "Chat",
    romanceable: false,
    relationships: [
      {
        name: "Frank",
        type: "propriétaire"
      },
      {
        name: "Erika",
        type: "amie"
      }
    ],
    gifts: {
      love: [
        { item: "Poisson" }
      ]
    }
  },
  {
    id: "raj",
    name: "Raj",
    birthday: {
      day: 2,
      season: "Hiver"
    },
    occupation: "Propriétaire de café",
    description: "Raj est un amateur de café qui possède un petit café en terrasse à Starlet Town. Ils vivent à l'auberge.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Grain de café rare" }
      ]
    }
  },
  {
    id: "takeba",
    name: "Takeba",
    occupation: "Gardien de source chaude",
    description: "Takeba est le gardien de la source chaude.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Plante tropicale" }
      ]
    }
  },
  {
    id: "chaem",
    name: "Chaem",
    birthday: {
      day: 6,
      season: "Automne"
    },
    occupation: "Maître-nageuse/Athlète",
    description: "Chaem est une athlète en formation qui rêve de participer un jour à une compétition nationale de volley-ball. Elle travaille à temps partiel comme maître-nageuse.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Ballon de volley-ball" }
      ]
    }
  },
  {
    id: "mark",
    name: "Mark",
    birthday: {
      day: 18,
      season: "Printemps"
    },
    occupation: "Chasseur (BOS)",
    description: "Mark est membre de BOS, un groupe international de chasseurs. Il fait du bénévolat au refuge pendant son temps libre.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Viande" }
      ]
    }
  },
  {
    id: "wakuu",
    name: "Wakuu",
    birthday: {
      day: 8,
      season: "Hiver"
    },
    occupation: "Astronome",
    description: "Wakuu est astronome. En semaine, il travaille et vit à l'observatoire. Il passe les week-ends au phare, où vit son père.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Télescope" }
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
    romanceable: true,
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
  },
  {
    id: "aaliyah_militaire",
    name: "Aaliyah (Militaire)",
    birthday: {
      day: 22,
      season: "Printemps"
    },
    occupation: "Militaire/Astronaute en formation",
    description: "Aaliyah, l'aînée de la fratrie, était la reine des farces quand elle était petite. Elle est maintenant dans l'armée de l'air et s'entraîne pour devenir astronaute.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Maquette d'avion" }
      ]
    }
  },
  {
    id: "wataru",
    name: "Wataru",
    birthday: {
      day: 3,
      season: "Été"
    },
    occupation: "Jardinier",
    description: "Wataru sort généralement uniquement pour s'occuper de son jardin et pour visiter le Beach Shack.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Graine rare" }
      ]
    }
  },
  {
    id: "eleanor",
    name: "Éléonore",
    birthday: {
      day: 4,
      season: "Automne"
    },
    occupation: "Entomologiste",
    description: "Eleanor est l'experte en insectes de Coral Island. Elle fréquente beaucoup Garden Lane.",
    romanceable: true,
    gifts: {
      love: [
        { item: "Insecte rare" }
      ]
    }
  },
  {
    id: "agung",
    name: "Agung",
    birthday: {
      day: 8,
      season: "Été"
    },
    occupation: "Gardien royal",
    description: "Un gardien royal doté d'une curiosité insatiable et d'une soif de connaissances.",
    romanceable: true,
    species: "Sirène",
    gifts: {
      love: [
        { item: "Livre d'histoire" }
      ]
    }
  }
];

// Fonction pour récupérer tous les villageois
export const getAllVillagers = (): Villager[] => {
  // Trier les villageois par ordre alphabétique (croissant)
  return [...villagers].sort((a, b) => a.name.localeCompare(b.name));
};

// Fonction pour récupérer un villageois par son identifiant
export const getVillagerById = (villagerId: string): Villager | undefined => {
  return villagers.find(villager => villager.id === villagerId);
};

// Fonction pour récupérer les villageois par saison d'anniversaire (triés par ordre alphabétique)
export const getVillagersBySeason = (season: string): Villager[] => {
  return villagers
    .filter(villager => villager.birthday && villager.birthday.season === season)
    .sort((a, b) => a.name.localeCompare(b.name));
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