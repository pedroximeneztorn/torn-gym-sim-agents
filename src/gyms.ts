import { StatName, GymName, GymDataType } from "./types";

/**
 * Raw gym data from the Torn API/wiki
 *
 * Stages:
 *   0: Jail Gym (special - always available)
 *   1: Starter gyms (5 energy per train)
 *   2: Mid-tier gyms (10 energy per train)
 *   3: High-tier gyms (10 energy per train) - ends at George's
 *   4: Specialist gyms (25-50 energy) - require stat imbalance to access
 */
const raw = {
  "1": {
    "name": "Premier Fitness",
    "stage": 1,
    "cost": 10,
    "energy": 5,
    "strength": 20,
    "speed": 20,
    "defense": 20,
    "dexterity": 20
  },
  "2": {
    "name": "Average Joes",
    "stage": 1,
    "cost": 100,
    "energy": 5,
    "strength": 24,
    "speed": 24,
    "defense": 27,
    "dexterity": 24
  },
  "3": {
    "name": "Woody's Workout Club",
    "stage": 1,
    "cost": 250,
    "energy": 5,
    "strength": 27,
    "speed": 32,
    "defense": 30,
    "dexterity": 27
  },
  "4": {
    "name": "Beach Bods",
    "stage": 1,
    "cost": 500,
    "energy": 5,
    "strength": 32,
    "speed": 32,
    "defense": 32,
    "dexterity": 0
  },
  "5": {
    "name": "Silver Gym",
    "stage": 1,
    "cost": 1000,
    "energy": 5,
    "strength": 34,
    "speed": 36,
    "defense": 34,
    "dexterity": 32
  },
  "6": {
    "name": "Pour Femme",
    "stage": 1,
    "cost": 2500,
    "energy": 5,
    "strength": 34,
    "speed": 36,
    "defense": 36,
    "dexterity": 38
  },
  "7": {
    "name": "Davies Den",
    "stage": 1,
    "cost": 5000,
    "energy": 5,
    "strength": 37,
    "speed": 0,
    "defense": 37,
    "dexterity": 37
  },
  "8": {
    "name": "Global Gym",
    "stage": 1,
    "cost": 10000,
    "energy": 5,
    "strength": 40,
    "speed": 40,
    "defense": 40,
    "dexterity": 40
  },
  "9": {
    "name": "Knuckle Heads",
    "stage": 2,
    "cost": 50000,
    "energy": 10,
    "strength": 48,
    "speed": 44,
    "defense": 40,
    "dexterity": 42
  },
  "10": {
    "name": "Pioneer Fitness",
    "stage": 2,
    "cost": 100000,
    "energy": 10,
    "strength": 44,
    "speed": 46,
    "defense": 48,
    "dexterity": 44
  },
  "11": {
    "name": "Anabolic Anomalies",
    "stage": 2,
    "cost": 250000,
    "energy": 10,
    "strength": 50,
    "speed": 46,
    "defense": 52,
    "dexterity": 46
  },
  "12": {
    "name": "Core",
    "stage": 2,
    "cost": 500000,
    "energy": 10,
    "strength": 50,
    "speed": 52,
    "defense": 50,
    "dexterity": 50
  },
  "13": {
    "name": "Racing Fitness",
    "stage": 2,
    "cost": 1000000,
    "energy": 10,
    "strength": 50,
    "speed": 54,
    "defense": 48,
    "dexterity": 52
  },
  "14": {
    "name": "Complete Cardio",
    "stage": 2,
    "cost": 2000000,
    "energy": 10,
    "strength": 55,
    "speed": 57,
    "defense": 55,
    "dexterity": 52
  },
  "15": {
    "name": "Legs, Bums and Tums",
    "stage": 2,
    "cost": 3000000,
    "energy": 10,
    "strength": 0,
    "speed": 55,
    "defense": 55,
    "dexterity": 57
  },
  "16": {
    "name": "Deep Burn",
    "stage": 2,
    "cost": 5000000,
    "energy": 10,
    "strength": 60,
    "speed": 60,
    "defense": 60,
    "dexterity": 60
  },
  "17": {
    "name": "Apollo Gym",
    "stage": 3,
    "cost": 7500000,
    "energy": 10,
    "strength": 60,
    "speed": 62,
    "defense": 64,
    "dexterity": 62
  },
  "18": {
    "name": "Gun Shop",
    "stage": 3,
    "cost": 10000000,
    "energy": 10,
    "strength": 65,
    "speed": 64,
    "defense": 62,
    "dexterity": 62
  },
  "19": {
    "name": "Force Training",
    "stage": 3,
    "cost": 15000000,
    "energy": 10,
    "strength": 64,
    "speed": 65,
    "defense": 64,
    "dexterity": 68
  },
  "20": {
    "name": "Cha Cha's",
    "stage": 3,
    "cost": 20000000,
    "energy": 10,
    "strength": 64,
    "speed": 64,
    "defense": 68,
    "dexterity": 70
  },
  "21": {
    "name": "Atlas",
    "stage": 3,
    "cost": 30000000,
    "energy": 10,
    "strength": 70,
    "speed": 64,
    "defense": 64,
    "dexterity": 65
  },
  "22": {
    "name": "Last Round",
    "stage": 3,
    "cost": 50000000,
    "energy": 10,
    "strength": 68,
    "speed": 65,
    "defense": 70,
    "dexterity": 65
  },
  "23": {
    "name": "The Edge",
    "stage": 3,
    "cost": 75000000,
    "energy": 10,
    "strength": 68,
    "speed": 70,
    "defense": 70,
    "dexterity": 68
  },
  "24": {
    "name": "George's",
    "stage": 3,
    "cost": 100000000,
    "energy": 10,
    "strength": 73,
    "speed": 73,
    "defense": 73,
    "dexterity": 73
  },
  "25": {
    "name": "Balboas Gym",
    "stage": 4,
    "cost": 50000000,
    "energy": 25,
    "strength": 0,
    "speed": 0,
    "defense": 75,
    "dexterity": 75
  },
  "26": {
    "name": "Frontline Fitness",
    "stage": 4,
    "cost": 50000000,
    "energy": 25,
    "strength": 75,
    "speed": 75,
    "defense": 0,
    "dexterity": 0
  },
  "27": {
    "name": "Gym 3000",
    "stage": 4,
    "cost": 100000000,
    "energy": 50,
    "strength": 80,
    "speed": 0,
    "defense": 0,
    "dexterity": 0
  },
  "28": {
    "name": "Mr. Isoyamas",
    "stage": 4,
    "cost": 100000000,
    "energy": 50,
    "strength": 0,
    "speed": 0,
    "defense": 80,
    "dexterity": 0
  },
  "29": {
    "name": "Total Rebound",
    "stage": 4,
    "cost": 100000000,
    "energy": 50,
    "strength": 0,
    "speed": 80,
    "defense": 0,
    "dexterity": 0
  },
  "30": {
    "name": "Elites",
    "stage": 4,
    "cost": 100000000,
    "energy": 50,
    "strength": 0,
    "speed": 0,
    "defense": 0,
    "dexterity": 80
  },
  "31": {
    "name": "The Sports Science Lab",
    "stage": 4,
    "cost": 500000000,
    "energy": 25,
    "strength": 90,
    "speed": 90,
    "defense": 90,
    "dexterity": 90
  },
  "32": {
    "name": "Unknown",
    "stage": 4,
    "cost": 2147483647,
    "energy": 10,
    "strength": 100,
    "speed": 100,
    "defense": 100,
    "dexterity": 100
  },
  "33": {
    "name": "The Jail Gym",
    "stage": 0,
    "cost": 0,
    "energy": 5,
    "strength": 34,
    "speed": 34,
    "defense": 46,
    "dexterity": 0
  }
} as const;

/**
 * Gym data indexed by gym name
 *
 * Usage:
 *   GymData["George's"].energyReq  // 10
 *   GymData["George's"].dots.Strength  // 73
 */
export const GymData: GymDataType = Object.fromEntries(
  Object.values(raw).map((gym) => [
    gym.name,
    {
      energyReq: gym.energy as 5 | 10 | 25 | 50,
      dots: {
        Strength: gym.strength,
        Speed: gym.speed,
        Dexterity: gym.dexterity,
        Defense: gym.defense,
      },
    },
  ])
) as GymDataType;
