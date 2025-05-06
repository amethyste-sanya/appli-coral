// Types importés depuis Home.tsx à reproduire ici
export type PresetQuest = {
  id: string;
  title: string;
  description: string;
  category: "main" | "secondary" | "seasonal";
  total: number;
  giver?: string;
  objectives?: string[];
  prerequisite?: string;
  reward?: string;
  notes?: string;
};

export const presetQuests: PresetQuest[] = [
  {
    id: "debuter",
    title: "Débuter",
    description: "Apprenons à cultiver ! Commencez par labourer la terre avec une houe, puis utilisez un sac de semences pour cultiver. Arrosez quotidiennement jusqu'à la récolte. Une fois prêt, rendez-vous au magasin général de Sam en ville pour acheter des semences.",
    category: "main",
    total: 4,
    giver: "Introduction",
    objectives: [
      "Plantez 10 graines", 
      "Arrosez 10 graines", 
      "Visitez le magasin général de Sam", 
      "Récoltez la première récolte"
    ],
    prerequisite: "Aucun",
    reward: "100 pièces",
    notes: "Progression: Commence Le nouveau fermier"
  },
  {
    id: "nouveau-fermier",
    title: "Le nouveau fermier",
    description: "Puisque vous êtes nouveau en ville, pensez à vous présenter aux habitants. Ils seront probablement curieux de savoir qui est le nouveau fermier !",
    category: "main",
    total: 1,
    giver: "Connor (en entrant dans le magasin général de Sam dans le cadre de son démarrage)",
    objectives: ["Rencontrez 30 citadins"],
    prerequisite: "Débuter",
    reward: "Commence à se faire des amis",
    notes: ""
  },
  {
    id: "se-faire-des-amis",
    title: "Se faire des amis",
    description: "Liez-vous d'amitié avec les citadins en apprenant à les connaître et en leur offrant des cadeaux. Gagnez des points bonus si vous leur offrez quelque chose qu'ils aiment !",
    category: "main",
    total: 2,
    giver: "Après avoir terminé Le nouveau fermier",
    objectives: [
      "Créez un bouquet de fleurs",
      "Offrez-le à quelqu'un"
    ],
    prerequisite: "Le nouveau fermier",
    reward: "Recette de fabrication de bouquet de fleurs",
    notes: "En progression: Recette de fabrication de bouquet de fleurs"
  },
  {
    id: "home-sweet-home",
    title: "Home Sweet Home",
    description: "Les charpentiers peuvent réparer votre nouvelle maison, mais vous devrez d'abord rassembler quelques ressources. Rendez-leur visite une fois que vous aurez rassemblé suffisamment de bois et de pierres.",
    category: "main",
    total: 4,
    giver: "Joko et Dinda (courrier du 1er printemps)",
    objectives: [
      "Rassemblez 50 bois",
      "Rassemblez 20 pierres",
      "Visitez le charpentier",
      "Réparez votre maison"
    ],
    prerequisite: "Arriver au printemps",
    reward: "100 pièces + 1 cœur points d'amitié avec Joko et Dinda",
    notes: ""
  },
  {
    id: "visitez-beach-shack",
    title: "Visitez le Beach Shack",
    description: "Sunny et Eleanor ont des cadeaux de bienvenue pour vous. Rendez-leur visite au Beach Shack pour découvrir ce que c'est…",
    category: "main",
    total: 1,
    giver: "Sunny et Eleanor (courrier du 3e printemps)",
    objectives: [
      "Visitez la cabane de plage"
    ],
    prerequisite: "Atteindre le 3ème jour du printemps",
    reward: "Canne à pêche + Filet anti-insectes",
    notes: ""
  },
  {
    id: "tout-ou-rien",
    title: "Tout ou rien",
    description: "Envisagez de fabriquer un four, vous pourrez l'utiliser pour fondre des minerais en barres !",
    category: "main",
    total: 1,
    giver: "Pablo (le lendemain après avoir obtenu du minerai de bronze)",
    objectives: [
      "Fabriquer un four"
    ],
    prerequisite: "Obtenir du minerai de bronze",
    reward: "Recette de fabrication de four",
    notes: "En progression: Recette de fabrication de four. Terminer: Commence 'Fondre pour le progrès'"
  },
  {
    id: "fondre-pour-progres",
    title: "Fondre pour le progrès",
    description: "Le four est prêt ! Essayez de fondre du minerai de cuivre pour en faire une barre de cuivre. Lorsque vous aurez assez de barres, rendez-vous chez le forgeron et améliorez vos outils. Cela vous simplifiera la vie à la ferme.",
    category: "main",
    total: 1,
    giver: "Après avoir terminé 'Tout ou rien'",
    objectives: [
      "Faites fondre une barre de bronze à l'aide de votre nouveau four"
    ],
    prerequisite: "Tout ou rien",
    reward: "Accès aux améliorations d'outils",
    notes: ""
  },
  {
    id: "extracteur",
    title: "L'extracteur",
    description: "L'extracteur vous permettra d'augmenter vos revenus. Vous pouvez augmenter vos profits en expédiant des produits de meilleure qualité, et le laboratoire peut vous aider en vous fournissant de l'essence de varech. Fabriquez un extracteur pour produire de l'essence de varech.",
    category: "main",
    total: 1,
    giver: "Surya (le lendemain après avoir obtenu du varech de bronze)",
    objectives: [
      "Fabriquer un extracteur"
    ],
    prerequisite: "Obtenir du varech de bronze",
    reward: "Recette de fabrication d'extracteur",
    notes: "En progression: Recette de fabrication d'extracteur. Terminer: Commence l'extraction d'essence"
  },
  {
    id: "extraction-essence",
    title: "Extraction d'essence",
    description: "Maintenant que vous avez un extracteur, vous pouvez essayer de produire de l'essence d'algues bronzées. Pour fabriquer une bouteille, placez 10 algues bronzées et un verre dans l'extracteur.",
    category: "main",
    total: 1,
    giver: "Après avoir terminé 'L'extracteur'",
    objectives: [
      "Produire de l'essence de varech bronzé à l'aide d'un extracteur"
    ],
    prerequisite: "L'extracteur",
    reward: "Accès à la production d'essence de varech",
    notes: ""
  },
  {
    id: "produits-locaux",
    title: "Produits locaux",
    description: "Aidez Sam à relancer la section des produits locaux du magasin général en expédiant des légumes et des fruits de qualité bronze.",
    category: "main",
    total: 3,
    giver: "Sam (doit avoir déclenché le rang F de la ville)",
    objectives: [
      "Rencontrez Sam au magasin général",
      "Expédiez 50 légumes de qualité bronze",
      "Expédiez 25 fruits de qualité bronze"
    ],
    prerequisite: "Ville de rang F, puis vente/expédition d'une récolte",
    reward: "1000 pièces + déverrouillage du point de cheminement de la ville",
    notes: "Le courrier de lancement de la quête sera livré 5 jours plus tard"
  },
  {
    id: "nouvel-objectif-rang-s",
    title: "Nouvel objectif : rang de ville S !",
    description: "Aidez Starlet Town à réaliser son rêve d'atteindre le rang de ville S. Commencez par visiter le centre communautaire pour planifier les prochaines étapes.",
    category: "main",
    total: 2,
    giver: "Déclenchée en entrant dans le centre communautaire après avoir obtenu le rang de ville A",
    objectives: [
      "Atteindre le rang S de la ville",
      "Visiter le centre communautaire"
    ],
    prerequisite: "Obtenir le rang de ville A",
    reward: "Accès aux attractions de la ville",
    notes: ""
  },
  {
    id: "attraction-starlet-town",
    title: "Attraction de Starlet Town",
    description: "Aidez la ville en contribuant à sa première attraction majeure. Collaborez ensuite avec les habitants pour construire toutes les attractions.",
    category: "main",
    total: 2,
    giver: "Après avoir terminé 'Nouvel objectif : rang de ville S !'",
    objectives: [
      "Terminez une attraction de la ville (1/1)",
      "Terminez toutes les attractions (10/10)"
    ],
    prerequisite: "Nouvel objectif : rang de ville S !",
    reward: "650 × 650 pièces",
    notes: ""
  },
  {
    id: "dans-les-mines",
    title: "Dans les mines",
    description: "Vous pouvez pénétrer dans les puits souterrains des cavernes pour extraire des minerais et des gemmes précieux. N'oubliez pas d'emporter l'épée que Kira vous a donnée au cas où vous rencontreriez des monstres.",
    category: "main",
    total: 2,
    giver: "Kira (en entrant dans la mine pour la première fois après que Mark a informé que la mine était ouverte)",
    objectives: [
      "Atteindre le niveau 5 (puits de terre)",
      "Remettre l'ascenseur en marche"
    ],
    prerequisite: "Être informé par Mark que la mine est ouverte (le 5 printemps)",
    reward: "100 pièces + Épée émoussée",
    notes: "En progression: Épée émoussée"
  },
  {
    id: "examen-entree",
    title: "Examen d'entrée",
    description: "Les petits monstres deviennent plus faciles à gérer. Cependant, un défi plus grand et plus frétillant vous attend, au plus profond de la mine.",
    category: "main",
    total: 2,
    giver: "Kira (courrier après avoir atteint le niveau 10 dans la mine terrestre)",
    objectives: [
      "Vaincre 30 ennemis",
      "Visiter la Bande des Sourires"
    ],
    prerequisite: "Avoir atteint le niveau 10 dans la mine terrestre",
    reward: "Insigne BOS",
    notes: ""
  },
  {
    id: "reve-mythique",
    title: "Rêve mythique",
    description: "Tu as fait un rêve étrange la nuit dernière. Pour t'assurer que ce n'était pas autre chose, tu devrais examiner l'un des arbres sacrés de l'île.",
    category: "main",
    total: 4,
    giver: "Chef (rêvant pendant son sommeil après avoir déclenché le rang de ville F)",
    objectives: [
      "Inspecter une tablette sur un arbre sacré",
      "Recevoir une lettre le lendemain matin",
      "Rencontrer le chef à gauche de votre ferme",
      "Rencontrer la déesse au temple du lac"
    ],
    prerequisite: "Atteindre le rang de ville F",
    reward: "Troisième œil",
    notes: "En progression: Troisième œil. Achèvement: Début de l'offrande au Temple"
  },
  {
    id: "offrande-temple",
    title: "Offrande au temple",
    description: "Un être vous a demandé d'accomplir une offrande au temple. Il vous a demandé une bénédiction et comment cela restaurerait son pouvoir.",
    category: "main",
    total: 1,
    giver: "Après avoir terminé 'Rêve mythique'",
    objectives: [
      "Compléter une offrande au temple"
    ],
    prerequisite: "Rêve mythique",
    reward: "Bénédiction de la déesse + Les points de cheminement sont débloqués",
    notes: ""
  },
  {
    id: "geant-petrifie-1",
    title: "Géant pétrifié I",
    description: "Explorez la porte de la Terre et trouvez un moyen de libérer le géant de la Terre.",
    category: "main",
    total: 1,
    giver: "Chef, doit avoir terminé le Rêve Mythique",
    objectives: [
      "Libérez le géant de la Terre"
    ],
    prerequisite: "Rêve Mythique",
    reward: "150 pièces + Débloquez des géants",
    notes: ""
  },
  {
    id: "village-geants",
    title: "Village des Géants",
    description: "Vous êtes invité à visiter le Village des Géants. Pour commencer, retrouvez Grog à gauche de votre ferme.",
    category: "main",
    total: 1,
    giver: "Grog (courrier 1 jour après avoir terminé Petrified Giant I)",
    objectives: [
      "Allez au village des géants"
    ],
    prerequisite: "Géant pétrifié I",
    reward: "Commence l'enchantement de l'outil + Le voyage de Gulliver",
    notes: ""
  },
  {
    id: "geant-petrifie-2",
    title: "Géant pétrifié II",
    description: "Atteignez le bas de la porte de l'eau et annulez la malédiction de pierre pour libérer le géant de l'eau.",
    category: "main",
    total: 1,
    giver: "Chef de clan",
    objectives: [
      "Libérez le géant de l'eau"
    ],
    prerequisite: "Village des Géants",
    reward: "300 pièces",
    notes: ""
  },
  {
    id: "geant-petrifie-3",
    title: "Géant pétrifié III",
    description: "Atteignez le bas de la porte du vent et annulez la malédiction de pierre pour libérer le géant du vent.",
    category: "main",
    total: 1,
    giver: "Chef de clan",
    objectives: [
      "Libérez le géant du vent"
    ],
    prerequisite: "Géant pétrifié II",
    reward: "450 pièces",
    notes: ""
  },
  {
    id: "geant-petrifie-4",
    title: "Géant pétrifié IV",
    description: "Aucun des autres Géants ne semble savoir où se trouve le Géant de Feu. Explorez la Porte du Feu pour percer le mystère.",
    category: "main",
    total: 1,
    giver: "Chef de clan",
    objectives: [
      "Trouvez le géant du feu"
    ],
    prerequisite: "Géant pétrifié III",
    reward: "600 pièces",
    notes: ""
  },
  {
    id: "coupable-petrifie",
    title: "Le coupable pétrifié",
    description: "Les Géants recherchent toujours leur mystérieux sixième membre. Découvrez où se trouve le dernier Géant.",
    category: "main",
    total: 1,
    giver: "Chef de clan",
    objectives: [
      "Allez au village des géants"
    ],
    prerequisite: "Géant pétrifié IV",
    reward: "Commence Le Géant Final",
    notes: ""
  },
  {
    id: "dernier-geant",
    title: "Le dernier géant",
    description: "Embarquez pour une aventure dans la savane et localisez Gort.",
    category: "main",
    total: 4,
    giver: "Après avoir terminé 'Le coupable pétrifié'",
    objectives: [
      "Atteignez la savane",
      "Entrez dans la grotte des souvenirs",
      "Récupérez 5 fragments de mémoire de Gort",
      "Allez dans le hall de la grotte des souvenirs"
    ],
    prerequisite: "Le coupable pétrifié",
    reward: "Œil qui voit tout",
    notes: "En progression: Œil qui voit tout"
  },
  {
    id: "peinture-murale-gardien",
    title: "Peinture murale du gardien",
    description: "Localisez les gardiens de l'île et récupérez les fragments manquants pour terminer la fresque des gardiens.",
    category: "main",
    total: 1,
    giver: "Déclenchée en visitant le Temple du Lac un jour après avoir activé le nouvel objectif: Rang de ville S!",
    objectives: [
      "Complétez la fresque du Gardien (4/4)"
    ],
    prerequisite: "Nouvel objectif : rang de ville S !",
    reward: "Tenue de déesse + Points de cheminement de Rafflesia",
    notes: "Progression: Débloquer les points de cheminement de Rafflesia"
  },
  {
    id: "deguisement-recherche",
    title: "Déguisement recherché",
    description: "Gong veut devenir un « humain », mais a besoin de votre aide pour trouver le reste des objets nécessaires au déguisement.",
    category: "main",
    total: 5,
    giver: "Gong",
    objectives: [
      "Allez au Village des Géants",
      "Apportez le blazer Royal Grape",
      "Apportez une fleur",
      "Apportez des lunettes rondes et élégantes",
      "Apportez 3 laines"
    ],
    prerequisite: "Avoir rencontré Gong",
    reward: "1000 points d'amitié avec Grog et Gong + Débloquez Handsome",
    notes: ""
  },
  {
    id: "aider-scott",
    title: "Aider Scott à la ferme",
    description: "Scott a besoin d'aide avec une commande urgente pour son restaurant.",
    category: "secondary",
    total: 5,
    giver: "Scott",
    objectives: ["Apporter 5 navets frais à Scott"],
    prerequisite: "Avoir débloqué la culture de navets",
    reward: "350 pièces + augmentation de relation avec Scott",
    notes: "Les navets doivent être de qualité standard ou supérieure"
  },
  {
    id: "peche-keiko",
    title: "Pêche pour Keiko",
    description: "Keiko étudie les poissons rares et aimerait examiner un poisson-lune.",
    category: "secondary",
    total: 1,
    giver: "Keiko",
    objectives: ["Attraper un poisson-lune et l'apporter à Keiko"],
    prerequisite: "Avoir débloqué la canne à pêche",
    reward: "500 pièces + recette spéciale",
    notes: "Le poisson-lune n'est disponible qu'en été"
  },
  {
    id: "festival-printemps",
    title: "Festival du Printemps",
    description: "Le festival du printemps approche et c'est l'occasion de présenter vos talents de cultivateur.",
    category: "seasonal",
    total: 1,
    giver: "Maire Sam",
    objectives: ["Cultivez une fleur primée pour le festival"],
    prerequisite: "Saison: Printemps",
    reward: "Trophée + 1000 pièces si vous gagnez",
    notes: "La qualité de la fleur est importante pour avoir une chance de gagner"
  },
  {
    id: "festival-automne",
    title: "Festival d'Automne",
    description: "Le festival d'automne arrive et la ville organise un concours de décoration de citrouilles.",
    category: "seasonal",
    total: 1,
    giver: "Maire Sam",
    objectives: ["Cultivez une citrouille et participez au concours de décoration"],
    prerequisite: "Saison: Automne",
    reward: "Décorations uniques pour votre ferme",
    notes: "Le festival a lieu le 14 Automne"
  }
,
  {
    id: "mysteres-ocean",
    title: "Mystères de l'océan",
    description: "Découvrez les secrets cachés des profondeurs marines. Explorer l'océan peut révéler des trésors oubliés...",
    category: "main",
    total: 3,
    giver: "Keiko (quand vous atteignez le niveau 3 de pêche)",
    objectives: [
      "Découvrir le temple sous-marin",
      "Collecter 5 artefacts marins",
      "Parler à la sirène mystérieuse"
    ],
    prerequisite: "Niveau 3 de pêche",
    reward: "Équipement de plongée amélioré",
    notes: "Commence la série de quêtes océaniques"
  },
  {
    id: "tresor-sirenes",
    title: "Le trésor des sirènes",
    description: "Les sirènes gardent un trésor ancien dans les profondeurs. Gagnez leur confiance pour découvrir leurs secrets.",
    category: "main",
    total: 4,
    giver: "Sirène mystérieuse",
    objectives: [
      "Gagner la confiance des sirènes",
      "Retrouver la clé du trésor perdu",
      "Explorer la grotte des sirènes",
      "Récupérer le trésor ancien"
    ],
    prerequisite: "Mystères de l'océan",
    reward: "Collier de perles magiques + 2000 pièces",
    notes: "Nécessite l'équipement de plongée amélioré"
  }
];

// Fonctions pour récupérer les quêtes
export const getAllPresetQuests = (): PresetQuest[] => {
  return presetQuests;
};

export const getPresetQuestsByCategory = (category: string): PresetQuest[] => {
  return presetQuests.filter(quest => quest.category === category);
};

export const getPresetQuestById = (id: string): PresetQuest | undefined => {
  return presetQuests.find(quest => quest.id === id);
};