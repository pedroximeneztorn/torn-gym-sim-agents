import { GymProgressionData } from "./types";

/**
 * The 24-gym linear progression path (excludes Stage 4 specialist gyms)
 *
 * To unlock the next gym, you must spend `energyToUnlock` energy at the current gym.
 * George's is the final gym in the main progression (energyToUnlock: Infinity).
 *
 * Note: This does NOT include specialist gyms (Stage 4), which have different
 * unlock requirements based on stat ratios. See docs/special-gyms.md for those.
 */
export const gymProgression: GymProgressionData[] = [
  // Stage 1 - 5 energy per train
  { name: "Premier Fitness", energyToUnlock: 200 },
  { name: "Average Joes", energyToUnlock: 500 },
  { name: "Woody's Workout Club", energyToUnlock: 1_000 },
  { name: "Beach Bods", energyToUnlock: 2_000 },
  { name: "Silver Gym", energyToUnlock: 2_750 },
  { name: "Pour Femme", energyToUnlock: 3_000 },
  { name: "Davies Den", energyToUnlock: 3_500 },
  { name: "Global Gym", energyToUnlock: 4_000 },

  // Stage 2 - 10 energy per train
  { name: "Knuckle Heads", energyToUnlock: 6_000 },
  { name: "Pioneer Fitness", energyToUnlock: 7_000 },
  { name: "Anabolic Anomalies", energyToUnlock: 8_000 },
  { name: "Core", energyToUnlock: 11_000 },
  { name: "Racing Fitness", energyToUnlock: 12_420 },
  { name: "Complete Cardio", energyToUnlock: 18_000 },
  { name: "Legs, Bums and Tums", energyToUnlock: 18_100 },
  { name: "Deep Burn", energyToUnlock: 24_140 },

  // Stage 3 - 10 energy per train
  { name: "Apollo Gym", energyToUnlock: 31_260 },
  { name: "Gun Shop", energyToUnlock: 36_610 },
  { name: "Force Training", energyToUnlock: 46_640 },
  { name: "Cha Cha's", energyToUnlock: 56_520 },
  { name: "Atlas", energyToUnlock: 67_775 },
  { name: "Last Round", energyToUnlock: 84_535 },
  { name: "The Edge", energyToUnlock: 106_305 },
  { name: "George's", energyToUnlock: Infinity }, // Final gym in main progression
];
