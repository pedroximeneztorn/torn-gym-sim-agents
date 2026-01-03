/**
 * The four trainable stats in Torn
 */
export type StatName = "Strength" | "Speed" | "Dexterity" | "Defense";

/**
 * All gym names in Torn (33 total)
 */
export type GymName =
  | "Premier Fitness"
  | "Average Joes"
  | "Woody's Workout Club"
  | "Beach Bods"
  | "Silver Gym"
  | "Pour Femme"
  | "Davies Den"
  | "Global Gym"
  | "Knuckle Heads"
  | "Pioneer Fitness"
  | "Anabolic Anomalies"
  | "Core"
  | "Racing Fitness"
  | "Complete Cardio"
  | "Legs, Bums and Tums"
  | "Deep Burn"
  | "Apollo Gym"
  | "Gun Shop"
  | "Force Training"
  | "Cha Cha's"
  | "Atlas"
  | "Last Round"
  | "The Edge"
  | "George's"
  | "Balboas Gym"
  | "Frontline Fitness"
  | "Gym 3000"
  | "Mr. Isoyamas"
  | "Total Rebound"
  | "Elites"
  | "The Sports Science Lab"
  | "Unknown"
  | "The Jail Gym";

/**
 * Input for calculating stat gain from a single training action
 */
export type TrainInput = {
  /** Current total of the stat being trained */
  trainedStatTotal: number;
  /** Current happiness before training */
  startingHappy: number;
  /** Which stat to train */
  statName: StatName;
  /** Which gym to train at */
  gymName: GymName;
  /** Array of perk multipliers (e.g., [0.045, 0.10] for 4.5% personal + 10% faction) */
  perks: number[];
};

/**
 * Gym data structure
 */
export type GymDataType = Record<
  GymName,
  {
    energyReq: 5 | 10 | 25 | 50;
    dots: Record<StatName, number>;
  }
>;

/**
 * Gym progression entry (for the linear unlock path)
 */
export type GymProgressionData = {
  name: GymName;
  /** Energy needed at THIS gym to unlock the NEXT gym */
  energyToUnlock: number;
};
