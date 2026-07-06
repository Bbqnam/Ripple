export interface LifeMoment {
  id: string;
  title: string;
  description: string;
  age: number;
  trigger: string;
  category: string;
}

export const LIFE_MOMENTS: LifeMoment[] = [
  {
    id: "graduation",
    title: "Graduation Day",
    description: "You walk across the stage with your name called. The room feels bigger than it did when you were a child.",
    age: 18,
    trigger: "education",
    category: "education",
  },
  {
    id: "first_apartment",
    title: "First Apartment",
    description: "The apartment is small, but it is yours. The key feels heavier than it should.",
    age: 20,
    trigger: "home",
    category: "home",
  },
  {
    id: "first_company",
    title: "First Company",
    description: "The first real office. The first real team. You can finally feel the future becoming concrete.",
    age: 22,
    trigger: "career",
    category: "career",
  },
  {
    id: "wedding",
    title: "Wedding Day",
    description: "A day that feels older than the years that built it. The room is bright, the faces are known, and everything changes.",
    age: 28,
    trigger: "relationship",
    category: "relationships",
  },
  {
    id: "first_child",
    title: "First Child",
    description: "The world suddenly feels so much larger and so much more fragile.",
    age: 30,
    trigger: "family",
    category: "family",
  },
];
