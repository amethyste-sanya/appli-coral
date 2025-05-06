// Types pour les événements du calendrier
export type EventActivity = {
  name: string;
  reward?: string | number;
  type: "Principal" | "Côté";
};

export type CalendarEvent = {
  id: string;
  name: string;
  day: number;
  season: string;
  timeRange?: string;
  location: string;
  activities: EventActivity[];
  merits?: number;
};

// Base de données des événements
export const calendarEvents: CalendarEvent[] = [
  // Événements du Printemps
  {
    id: "printemps-potluck",
    name: "Potluck de fleurs de cerisier",
    day: 10,
    season: "Printemps",
    timeRange: "09:00 - 14:00",
    location: "Place Alun-Alun",
    activities: [
      {
        name: "Repas-partage",
        reward: 300,
        type: "Principal"
      }
    ],
    merits: 40
  },
  {
    id: "printemps-plantation-arbres",
    name: "Festival de plantation d'arbres",
    day: 21,
    season: "Printemps",
    timeRange: "08:00 - 14:00",
    location: "Près du ranch",
    activities: [
      {
        name: "Plantation d'arbres (Jusqu'à 3 fois seulement)",
        reward: "• 150 pièces\n• 70 points d'amitié avec tous les habitants",
        type: "Principal"
      }
    ],
    merits: 40
  },
  
  // Événements d'Été
  {
    id: "ete-festival-animaux",
    name: "Festival des animaux",
    day: 12,
    season: "Été",
    timeRange: "09:00 - 14:00",
    location: "Starlet Town",
    activities: [
      {
        name: "Course d'animaux de compagnie",
        reward: 300,
        type: "Principal"
      },
      {
        name: "Concours de poulets",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Concours de vaches",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Rodeo",
        reward: 100,
        type: "Côté"
      }
    ],
    merits: 40
  },
  {
    id: "ete-nettoyage-plages",
    name: "Journée de nettoyage des plages",
    day: 27,
    season: "Été",
    timeRange: "09:00 - 14:00",
    location: "Plage",
    activities: [
      {
        name: "Nettoyage de la plage",
        type: "Principal"
      },
      {
        name: "Concours de natation",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Lutte acharnée",
        reward: 100,
        type: "Côté"
      }
    ],
    merits: 40
  },
  
  // Événements d'Automne
  {
    id: "automne-fete-recoltes",
    name: "Fête des récoltes",
    day: 15,
    season: "Automne",
    timeRange: "19:00 - 22:00",
    location: "Place Alun-Alun",
    activities: [
      {
        name: "Exposition de récoltes",
        reward: 300,
        type: "Principal"
      },
      {
        name: "Pêche aux pommes",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Citrouille Écrasante",
        reward: 100,
        type: "Côté"
      }
    ],
    merits: 40
  },
  {
    id: "automne-festival-effrayant",
    name: "Festival du jour effrayant",
    day: 28,
    season: "Automne",
    timeRange: "19:00 - 22:00",
    location: "Starlet Town",
    activities: [
      {
        name: "Défilé Ogoh Ogoh",
        type: "Principal"
      },
      {
        name: "Bonk le squelette",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Lancer d'anneaux",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Chasse au trésor",
        type: "Côté"
      }
    ],
    merits: 40
  },
  
  // Événements d'Hiver
  {
    id: "hiver-foire",
    name: "Foire d'hiver",
    day: 17,
    season: "Hiver",
    timeRange: "18:00 - tard",
    location: "Plage",
    activities: [
      {
        name: "Curling",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Pêche à l'aimant",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Modèle de correspondance",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Tournage",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Anecdotes (9 catégories)",
        reward: "11x8 + 12x1 (Total 100)",
        type: "Côté"
      }
    ],
    merits: 40
  },
  {
    id: "hiver-nouvel-an",
    name: "Fête du Nouvel An",
    day: 28,
    season: "Hiver",
    timeRange: "19:00 - 22:00",
    location: "Vignoble",
    activities: [
      {
        name: "Regarder les feux d'artifice",
        type: "Principal"
      },
      {
        name: "Ne laissez pas tomber le ballon",
        reward: 100,
        type: "Côté"
      },
      {
        name: "Roue de la chance",
        type: "Côté"
      }
    ],
    merits: 40
  }
];

// Récupérer tous les événements
export const getAllEvents = (): CalendarEvent[] => {
  return calendarEvents;
};

// Récupérer les événements par saison
export const getEventsBySeason = (season: string): CalendarEvent[] => {
  return calendarEvents.filter(event => event.season === season);
};

// Récupérer les événements pour un jour spécifique d'une saison
export const getEventsForDay = (season: string, day: number): CalendarEvent[] => {
  return calendarEvents.filter(event => event.season === season && event.day === day);
};

// Fonction pour vérifier si un jour a un événement
export const hasEvent = (season: string, day: number): boolean => {
  return calendarEvents.some(event => event.season === season && event.day === day);
};