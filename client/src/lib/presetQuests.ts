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
  // Autres quêtes secondaires
  {
    id: "corbeaux-partis",
    title: "Les corbeaux sont partis",
    description: "Les corbeaux volent vos récoltes ! Pour remédier à ce problème, fabriquez un épouvantail et placez-le près de vos cultures. Vous ne savez pas comment en fabriquer un ? En maîtrisant les activités, vous découvrirez différentes façons de faciliter le travail ou de gagner plus de pièces grâce aux recettes d'artisanat.",
    category: "secondary",
    total: 1,
    giver: "Initié par un événement aléatoire de corbeaux mangeant des cultures",
    objectives: [
      "Fabriquez un épouvantail de fortune"
    ],
    reward: "100 pièces",
    notes: "Autres"
  },
  {
    id: "enchantement-outil",
    title: "Enchantement d'outil",
    description: "Enchantez l'un de vos outils au Village Géant !",
    category: "secondary",
    total: 1,
    giver: "Grog (après avoir terminé Giant Village)",
    objectives: [
      "Enchantez votre outil !"
    ],
    prerequisite: "Avoir terminé Giant Village",
    reward: "250 pièces",
    notes: "Autres"
  },
  {
    id: "festival-arbre-1",
    title: "Festival de plantation d'arbres I",
    description: "Allez planter des arbres !",
    category: "secondary",
    total: 5,
    giver: "Connor (automatiquement lancé au début de la journée du Festival de plantation d'arbres)",
    objectives: [
      "Assistez au festival de plantation d'arbres",
      "Parlez à Connor pour démarrer l'événement",
      "Nettoyez la zone A (114/114)",
      "Préparez le sol dans la zone B (44/44)",
      "Plantez le jeune arbre dans la zone C (20/20)"
    ],
    reward: "Plant de bananier + 150 pièces + 70 points d'amitié avec tous les habitants",
    notes: "Autres"
  },
  {
    id: "festival-arbre-2",
    title: "Festival de plantation d'arbres II",
    description: "Allez planter des arbres !",
    category: "secondary",
    total: 3,
    giver: "Connor (lors du démarrage de l'activité principale du Festival de plantation d'arbres)",
    objectives: [
      "Dégagez la zone A (113/113)",
      "Préparez le sol dans la zone B (64/64)",
      "Plantez le jeune arbre dans la zone C (16/16)"
    ],
    prerequisite: "Festival de plantation d'arbres I",
    reward: "Plant de prunier + 150 pièces + 70 points d'amitié avec tous les habitants",
    notes: "Autres"
  },
  {
    id: "festival-arbre-3",
    title: "Festival de plantation d'arbres III",
    description: "Allez planter des arbres !",
    category: "secondary",
    total: 3,
    giver: "Connor (au début de l'activité principale du Festival de plantation d'arbres)",
    objectives: [
      "Dégagez la zone A (127/127)",
      "Préparez le sol dans la zone B (80/80)",
      "Plantez le jeune arbre dans la zone C (22/22)"
    ],
    prerequisite: "Festival de plantation d'arbres II",
    reward: "Plant de ramboutan + 150 pièces + 70 points d'amitié avec tous les habitants",
    notes: "Autres"
  },
  {
    id: "chaperon-sirenes-1",
    title: "Chaperon des sirènes, partie 1",
    description: "Accompagnez l'équipage de l'expédition Starlet en ville. Dates d'expédition : Printemps 8-14, Été 22-28, Automne 22-28, Hiver 22-28",
    category: "secondary",
    total: 5,
    giver: "À la surface",
    objectives: [
      "Attendez la date de l'expédition",
      "Attendez que le temps soit clair",
      "Attendez un jour sans festival",
      "Dirigez-vous vers le quai de plongée",
      "Soyez là entre 8h et 12h"
    ],
    prerequisite: "À la surface",
    reward: "3 Grains de café + Warp sesajen",
    notes: "Autres"
  },
  {
    id: "chaperon-sirenes-2",
    title: "Sirènes Chaperon Partie 2",
    description: "Accompagnez l'équipage de l'expédition Starlet en ville. Dates d'expédition : Printemps 8-14, Été 22-28, Automne 22-28, Hiver 22-28",
    category: "secondary",
    total: 5,
    giver: "Après avoir terminé Chaperon des sirènes, partie 1",
    objectives: [
      "Attendez la date de l'expédition",
      "Attendez que le temps soit clair",
      "Attendez un jour sans festival",
      "Dirigez-vous vers le Raj Coffee Shop",
      "Soyez là entre 8h et 12h"
    ],
    prerequisite: "Chaperon des sirènes, partie 1",
    reward: "3 Géodes mystérieuses + 2 Starfruit",
    notes: "Autres"
  },
  {
    id: "chaperon-sirenes-3",
    title: "Sirènes Chaperon Partie 3",
    description: "Accompagnez l'équipage de l'expédition Starlet en ville. Dates d'expédition : Printemps 8-14, Été 22-28, Automne 22-28, Hiver 22-28",
    category: "secondary",
    total: 5,
    giver: "Après avoir terminé Sirènes Chaperon Partie 2",
    objectives: [
      "Attendez la date de l'expédition",
      "Attendez que le temps soit clair",
      "Attendez un jour sans festival",
      "Dirigez-vous vers le musée extérieur",
      "Soyez là entre 8h et 12h"
    ],
    prerequisite: "Sirènes Chaperon Partie 2",
    reward: "3 Coffres ornés + Panier d'intérieur pour animaux de compagnie sur le thème du renard",
    notes: "Autres"
  },
  {
    id: "chaperon-sirenes-4",
    title: "Chaperon des sirènes, partie 4",
    description: "Accompagnez l'équipe de l'expédition Starlet en ville. Évitez les dates d'exposition, car les Sirènes ne seront pas présentes. Dates d'expédition : Printemps 8-14, Été 22-28, Automne 22-28, Hiver 22-28",
    category: "secondary",
    total: 3,
    giver: "Après avoir terminé Sirènes Chaperon Partie 3",
    objectives: [
      "Attendez la date de l'expédition",
      "Dirigez-vous vers le château de Naga",
      "Soyez là entre 8h et 18h"
    ],
    prerequisite: "Sirènes Chaperon Partie 3",
    reward: "10 000 pièces + 1 cœur avec Denali, Miranjani et Semeru",
    notes: "Autres"
  },
  
  // Quêtes Cœurs
  {
    id: "saumon-pour-jim",
    title: "Saumon pour Jim",
    description: "Apportez 1 saumon à Jim entre 17h et 20h.",
    category: "secondary",
    total: 1,
    giver: "Jim (5 cœurs)",
    objectives: [
      "Apportez 1 saumon au Beach Shack entre 17h et 20h"
    ],
    prerequisite: "Avoir terminé l'événement cardiaque à 3 cœurs de Jim",
    reward: "Points d'amitié",
    notes: "Quête cœurs"
  },
  {
    id: "fleur-svp",
    title: "Fleur s'il vous plaît",
    description: "Léa a besoin de deux fleurs pour confectionner un cadeau spécial pour sa mère. Elle vous a demandé de l'aide.",
    category: "secondary",
    total: 1,
    giver: "Léa (2 cœurs)",
    objectives: [
      "Livrer 2 fleurs à Leah"
    ],
    prerequisite: "Avoir 2 cœurs d'amitié avec Léa",
    reward: "Points d'amitié",
    notes: "Quête cœurs"
  },
  {
    id: "fleur-de-poisson",
    title: "Fleur de poisson",
    description: "La taverne a besoin de quelques fleurs fraîches. Votre ferme pourrait-elle en fournir ? Si oui, merci de les faire livrer au plus vite.",
    category: "secondary",
    total: 1,
    giver: "Noé (3 cœurs)",
    objectives: [
      "Apportez 2 fleurs à la taverne entre 10h et 13h"
    ],
    prerequisite: "Avoir terminé l'événement cardiaque à 1 cœur de Noé",
    reward: "Points d'amitié",
    notes: "Quête cœurs"
  },
  {
    id: "feux-de-joie",
    title: "Feux de joie",
    description: "Viendras-tu à Garden Lane demain matin et m'aideras-tu à couper du bois ?",
    category: "secondary",
    total: 1,
    giver: "Noé (6 cœurs)",
    objectives: [
      "Apportez 4 bois à Garden Lane entre 10h et 13h"
    ],
    prerequisite: "Avoir terminé les événements cardiaques à 1, 3, 4 et 5 cœurs de Noé",
    reward: "Points d'amitié",
    notes: "Quête cœurs"
  },
  {
    id: "aidez-paul",
    title: "Aidez Paul",
    description: "Apportez du thé vert à Paul.",
    category: "secondary",
    total: 1,
    giver: "Paul (cœur inconnu)",
    objectives: [
      "Livrer du thé vert à Paul"
    ],
    prerequisite: "Niveau d'amitié spécifique avec Paul ou Anne",
    reward: "Points d'amitié",
    notes: "Quête cœurs"
  },
  {
    id: "bois-pour-theo",
    title: "Du bois pour Théo",
    description: "Apportez Théo 3 Bois.",
    category: "secondary",
    total: 1,
    giver: "Théo (5 cœurs)",
    objectives: [
      "Livrer 3 bois à Théo"
    ],
    prerequisite: "Avoir terminé les événements cardiaques à 2, 3 et 4 cœurs de Théo",
    reward: "Points d'amitié",
    notes: "Quête cœurs"
  },
  {
    id: "tresor-legendaire",
    title: "Trésor légendaire",
    description: "Rejoignez Zarah dans sa quête pour découvrir les pièces manquantes d'un indice mystérieux. Résolvez le mystère : ce trésor légendaire est-il réel ou un simple mythe ?",
    category: "secondary",
    total: 3,
    giver: "Zarah (6 cœurs)",
    objectives: [
      "Trouver un indice dans l'océan",
      "Trouver un indice dans la caverne",
      "Rencontrer Zarah chez elle"
    ],
    prerequisite: "Avoir terminé les événements cardiaques à 2, 4 et 6 cœurs de Zarah",
    reward: "Points d'amitié + récompense spéciale",
    notes: "Quête cœurs"
  },
  {
    id: "dans-locean",
    title: "Dans l'océan",
    description: "Ling dit que la combinaison de plongée est à toi, à une condition : tu guéris les coraux malades en activant les orbes coralliens.",
    category: "main",
    total: 5,
    giver: "Ling (courrier, le plus tôt le 8 printemps)",
    objectives: [
      "Visitez Ling au quai de plongée",
      "Plongez dans l'océan",
      "Activez 5 orbes solaires",
      "Soignez 5 sites coralliens",
      "Visitez Ling au laboratoire"
    ],
    prerequisite: "Aucun",
    reward: "Combinaison de plongée",
    notes: "Commence à explorer l'océan"
  },
  {
    id: "explorer-ocean",
    title: "Explorez l'océan",
    description: "L'océan regorge de varech précieux, de créatures marines et de trouvailles rares. Pour les atteindre, il vous faudra soigner davantage de coraux et dégager votre chemin des racines malades.",
    category: "main",
    total: 4,
    giver: "Automatique après avoir terminé Dans l'océan",
    objectives: [
      "Soignez 20 sites coralliens",
      "Inspectez la source du tremblement",
      "Suivez la racine en retrait",
      "Trouvez un moyen d'ouvrir la porte"
    ],
    prerequisite: "Dans l'océan",
    reward: "Combinaison de plongée V2 + 300 pièces",
    notes: "Commence le Royaume des sirènes"
  },
  {
    id: "royaume-sirenes",
    title: "Royaume des sirènes",
    description: "Vous êtes arrivé au Royaume des Sirènes. Il est temps de trouver un moyen d'y pénétrer et d'explorer ses merveilles.",
    category: "main",
    total: 2,
    giver: "Automatique après avoir terminé Explorez l'océan",
    objectives: [
      "Trouvez un moyen d'ouvrir la porte",
      "Explorez le Royaume"
    ],
    prerequisite: "Explorez l'océan",
    reward: "500 pièces",
    notes: "Commence Invité indésirable"
  },
  {
    id: "invite-indesirable",
    title: "Invité indésirable",
    description: "Vous êtes un invité indésirable au Royaume des Mers ! Denali vous a demandé de parler au roi Krakatoa au Palais Naga. Votre destin vous attend…",
    category: "main",
    total: 3,
    giver: "Denali en complétant le Royaume des sirènes",
    objectives: [
      "Entrez dans le palais Naga",
      "Rencontrez le roi",
      "Entrez dans les profondeurs de la mer"
    ],
    prerequisite: "Royaume des sirènes",
    reward: "Fruit de l'endurance",
    notes: "Commence l'arbre de corail"
  },
  {
    id: "arbre-corail",
    title: "L'arbre corail",
    description: "Entrez dans les eaux profondes et explorez tout ce que l'océan a à offrir afin de guérir l'arbre corail.",
    category: "main",
    total: 2,
    giver: "Automatique après avoir terminé Invité indésirable",
    objectives: [
      "Entrez dans les profondeurs marines",
      "Soignez l'arbre corail"
    ],
    prerequisite: "Invité indésirable",
    reward: "10 000 pièces + 100 points océaniques + 150 points d'amitié avec tous les habitants",
    notes: "Guérir l'océan"
  },
  {
    id: "racines-audessus",
    title: "Racines au-dessus",
    description: "Dépêchez-vous. Vous êtes convoqué au Palais Naga !",
    category: "main",
    total: 3,
    giver: "Le roi Krakatoa et la reine Nanda Devi (courrier le lendemain de la fin de l'Arbre Corail)",
    objectives: [
      "Visitez le palais Naga",
      "Visitez l'arbre corail",
      "Attendez la nuit"
    ],
    prerequisite: "L'arbre corail",
    reward: "Sceau de Naga + 1 500 pièces + 50 points océaniques",
    notes: "Suite des quêtes de l'océan"
  },
  {
    id: "lun-de-nous",
    title: "L'un de nous",
    description: "L'Oracle prétend qu'il existe un moyen de faire de vous « l'un des nôtres ». Rassemblez les matériaux nécessaires et découvrez ce qu'elle veut dire.",
    category: "main",
    total: 3,
    giver: "Cho Oyu (courrier 3 jours après avoir terminé Racines au-dessus)",
    objectives: [
      "Visitez l'Oracle",
      "Apportez 5 essences d'osmium",
      "Apportez 5 cultures d'osmium"
    ],
    prerequisite: "Racines au-dessus",
    reward: "Bénédiction des sirènes + 2 000 pièces",
    notes: "Suite des quêtes de l'océan"
  },
  {
    id: "expedition-starlet",
    title: "Expédition Starlet",
    description: "Aventurez-vous au Palais Naga une fois lorsque vous serez prêt à en apprendre davantage sur cette « expédition Starlet ».",
    category: "main",
    total: 3,
    giver: "Miranjani (courrier 5 jours après avoir terminé L'un de nous)",
    objectives: [
      "Allez au Palais Naga",
      "Récoltez 75 cultures d'osmium",
      "Récoltez 30 essences d'algues d'osmium"
    ],
    prerequisite: "L'un de nous",
    reward: "Commence À la surface",
    notes: "Suite des quêtes de l'océan"
  },
  {
    id: "a-la-surface",
    title: "À la surface",
    description: "Vous avez rassemblé les ingrédients de la potion. Il ne vous reste plus qu'à vous rendre au lieu de rendez-vous et à emmener des sirènes sur terre !",
    category: "main",
    total: 5,
    giver: "Après avoir terminé Expédition Starlet",
    objectives: [
      "Attendre la date de l'expédition",
      "Se rendre au point de rendez-vous",
      "Attendre que le temps soit clair",
      "Attendre un jour sans festival",
      "Se rendre au point de rendez-vous pendant une date d'expédition"
    ],
    prerequisite: "Expédition Starlet",
    reward: "5 000 pièces",
    notes: "Début de la partie 1 de l'accompagnement des sirènes"
  },
  {
    id: "plus-de-vide",
    title: "Plus de vide",
    description: "Donnez un coup de pouce à la collection du Musée en lui faisant un don !",
    category: "main",
    total: 1,
    giver: "Scott (lorsqu'il est entré au musée pour la première fois dès le 3e printemps)",
    objectives: [
      "Faire don d'un objet au Musée"
    ],
    prerequisite: "Entrer au musée pour la première fois",
    reward: "150 pièces",
    notes: "Première quête du musée"
  },
  {
    id: "agrandissement-musee",
    title: "Agrandissement du musée",
    description: "Avec votre aide, Scott pense que la ville pourrait financer un musée agrandi sur Pickstarter. Pensez à donner davantage d'objets pour donner vie à ce projet.",
    category: "main",
    total: 2,
    giver: "Scott (la cinématique sera jouée après 10 dons au musée)",
    objectives: [
      "Faire un don d'objets au Musée (10/10)",
      "Faire un don d'objets au Musée (50/50)"
    ],
    prerequisite: "Plus de vide",
    reward: "150 pièces",
    notes: "Progression des quêtes du musée"
  },
  {
    id: "lancement-pickstarter",
    title: "Lancement de Pickstarter",
    description: "Vous avez reçu une lettre de Scott. Il vous informe qu'ils sont prêts à lancer la campagne Pickstarter, mais qu'ils ne peuvent pas le faire sans vous. Rendez-vous au musée !",
    category: "main",
    total: 2,
    giver: "Scott (courrier 2 jours après avoir terminé l'extension du musée)",
    objectives: [
      "Aller au musée",
      "Attendre le financement de Pickstarter pendant une semaine"
    ],
    prerequisite: "Agrandissement du musée",
    reward: "Brosse à poils doux + 50 points du musée + 70 points d'amitié avec tous les habitants",
    notes: "Point de cheminement déverrouillé"
  },
  {
    id: "empreintes-dinosaures",
    title: "Empreintes de dinosaures",
    description: "Aidez à compléter l'exposition d'hologrammes de dinosaures pour élever le rang du musée, en présentant les merveilles de la vie préhistorique.",
    category: "main",
    total: 1,
    giver: "Après avoir fait don de tous les fossiles et atteint le rang A de la ville",
    objectives: [
      "Hologrammes de dinosaures complets (10/10)"
    ],
    prerequisite: "Tous les fossiles donnés et rang A de la ville",
    reward: "Amélioration du rang du musée",
    notes: "Quête avancée du musée"
  },
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
  // Quêtes secondaires (Courrier)
  {
    id: "smoothies-verts-suki",
    title: "Les smoothies verts de Suki",
    description: "Suki veut faire des smoothies, apportez-lui n'importe quel légume de printemps.",
    category: "secondary",
    total: 1,
    giver: "Suki (courrier le 14 printemps)",
    objectives: [
      "Offrez n'importe quel légume de printemps à Suki"
    ],
    prerequisite: "Recevoir le courrier de Suki",
    reward: "1 cœur d'amitié avec Suki",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "papaye-emma",
    title: "Papaye pour Emma",
    description: "Emma recherche des papayes et vous a proposé un prix premium en échange de 2 papayes.",
    category: "secondary",
    total: 1,
    giver: "Emma (courrier le 3 été)",
    objectives: [
      "Offrez 2 Papayes à Emma"
    ],
    prerequisite: "Recevoir le courrier d'Emma",
    reward: "1 cœur d'amitié avec Emma + 400 pièces",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "floraison-ete",
    title: "Floraison d'été",
    description: "Walter veut un hibiscus et vous a promis un pourboire.",
    category: "secondary",
    total: 1,
    giver: "Walter (courrier le 11 été)",
    objectives: [
      "Offrez 1 Hibiscus à Walter"
    ],
    prerequisite: "Recevoir le courrier de Walter",
    reward: "1 cœur d'amitié avec Walter + 100 pièces",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "demande-erika",
    title: "La demande d'Erika",
    description: "Erika a besoin d'un œuf pour préparer le plat préféré de Frank. Aidez-la à lui en offrir un !",
    category: "secondary",
    total: 1,
    giver: "Erika (courrier le 20 été)",
    objectives: [
      "Offrez 1 œuf à Erika"
    ],
    prerequisite: "Recevoir le courrier d'Erika",
    reward: "1 cœur d'amitié avec Erika + 100 pièces",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "aide-voisin",
    title: "L'aide du voisin",
    description: "Il y a une bûche derrière la maison de Paul qui a blessé des animaux du coin. Aidez-nous à la retirer.",
    category: "secondary",
    total: 1,
    giver: "Paul (courrier le 23 été)",
    objectives: [
      "Coupez la bûche derrière la maison de Paul (interaction simple, aucune hache requise)"
    ],
    prerequisite: "Recevoir le courrier de Paul",
    reward: "1 cœur d'amitié avec Paul",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "poisson-nuit",
    title: "Poisson de nuit",
    description: "Jim a besoin d'un Arapaima, on en trouve généralement par temps froid après le coucher du soleil.",
    category: "secondary",
    total: 1,
    giver: "Jim (courrier le 4 automne)",
    objectives: [
      "Offrez 1 Arapaima à Jim"
    ],
    prerequisite: "Recevoir le courrier de Jim",
    reward: "1 cœur d'amitié avec Jim + 200 pièces",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "couronne-tournesol",
    title: "Couronne de tournesol",
    description: "Valentina a besoin d'un tournesol pour l'anniversaire de Sunny, le 26. Ne soyez pas en retard !",
    category: "secondary",
    total: 1,
    giver: "Valentina (courrier le 4 automne)",
    objectives: [
      "Offrez 1 Tournesol à Valentina"
    ],
    prerequisite: "Recevoir le courrier de Valentina",
    reward: "1 cœur d'amitié avec Valentina",
    notes: "Quête de courrier saisonnier, à compléter avant le 26 automne"
  },
  {
    id: "saison-citrouilles",
    title: "Saison des citrouilles",
    description: "Bree a une recette qu'elle veut essayer, mais elle a besoin d'une citrouille. Aidez-la à lui en donner une.",
    category: "secondary",
    total: 1,
    giver: "Bree (courrier le 6 automne)",
    objectives: [
      "Offrez 1 citrouille à Bree"
    ],
    prerequisite: "Recevoir le courrier de Bree",
    reward: "1 cœur d'amitié avec Bree + 150 pièces",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "champignons-ben",
    title: "Champignons spéciaux de Ben",
    description: "L'ami de Ben cherche un champignon trompette noir. On en trouve autour du lac. Aidez-le à en trouver un.",
    category: "secondary",
    total: 1,
    giver: "Ben (courrier le 18 automne)",
    objectives: [
      "Offrez 1 champignon trompette noire à Ben (quand il sera de retour sur l'île)"
    ],
    prerequisite: "Recevoir le courrier de Ben",
    reward: "1 cœur d'amitié avec Ben + 200 pièces",
    notes: "Quête de courrier saisonnier, Ben est absent pendant la deuxième moitié de l'automne"
  },
  {
    id: "chapeau-maire",
    title: "Le chapeau perdu du maire",
    description: "Une catastrophe a frappé ! Le maire Conner a perdu un de ses chapeaux. Restez vigilants et aidez-nous à le lui rendre.",
    category: "secondary",
    total: 2,
    giver: "Connor (courrier le 2 hiver)",
    objectives: [
      "Trouvez le chapeau perdu du maire",
      "Restituez le chapeau perdu du maire"
    ],
    prerequisite: "Recevoir le courrier de Connor",
    reward: "1 cœur d'amitié avec Connor",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "the-charles",
    title: "Le thé de Charles",
    description: "Charles veut envoyer des feuilles de thé à ses parents. Aidez-le à lui en donner.",
    category: "secondary",
    total: 1,
    giver: "Charles (courrier le 4 hiver)",
    objectives: [
      "Offrez 1 Feuille de Thé à Charles"
    ],
    prerequisite: "Recevoir le courrier de Charles",
    reward: "1 cœur d'amitié avec Charles + 100 pièces",
    notes: "Quête de courrier saisonnier"
  },
  {
    id: "article-millie",
    title: "L'article de Millie",
    description: "Millie a besoin d'une bouteille de varech légendaire pour un article qu'elle écrit, aidez-la à en trouver une.",
    category: "secondary",
    total: 1,
    giver: "Millie (courrier le 12 hiver)",
    objectives: [
      "Offrez 1 bouteille d'essence d'algues osmium à Millie"
    ],
    prerequisite: "Recevoir le courrier de Millie",
    reward: "1 cœur d'amitié avec Millie + 600 pièces",
    notes: "Quête de courrier saisonnier"
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
  },
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