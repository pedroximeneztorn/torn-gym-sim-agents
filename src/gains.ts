import { StatName, TrainInput } from "./types";
import { GymData } from "./gyms";

/**
 * Magic numbers for each stat used in the gain formula.
 * These are empirically derived constants from the game.
 */
type StatMagicNumbers = { A: number; B: number; C: number };

const Stats: Record<StatName, StatMagicNumbers> = {
  Strength: { A: 1600, B: 1700, C: 700 },
  Speed: { A: 1600, B: 2000, C: 1350 },
  Dexterity: { A: 1800, B: 1500, C: 1000 },
  Defense: { A: 2100, B: -600, C: 1500 },
};

/**
 * Calculate the stat gain from a single training action.
 *
 * This is the core formula, translated from an Excel spreadsheet.
 *
 * The formula in plain language:
 *   gain = (1/200000) × gymDots × energyCost × perksMultiplier × (
 *       scaledStat × happinessMultiplier +
 *       8 × happiness^1.05 +
 *       statConstantA × (1 - (happiness/99999)²) +
 *       statConstantB
 *   )
 *
 * Where:
 *   - gymDots: The gym's dot rating for this stat (divided by 10)
 *   - energyCost: Energy per train (5, 10, 25, or 50)
 *   - perksMultiplier: Product of (1 + perk) for each perk
 *   - scaledStat: Current stat total (with log scaling above 50M)
 *   - happinessMultiplier: 1 + 0.07 × ln(1 + happiness/250)
 *   - statConstantA/B: Per-stat magic numbers
 *
 * @param input - The training parameters
 * @returns The stat gain from this single training action
 */
export function calculateResult(input: TrainInput): number {
  const gymDots = 0.1 * GymData[input.gymName].dots[input.statName];
  const energyCost = GymData[input.gymName].energyReq;
  const perksMultiplier = input.perks.reduce((acc, perk) => acc * (perk + 1), 1);
  const statTotal = input.trainedStatTotal;
  const happiness = input.startingHappy;
  const statName = input.statName;

  // Scale stat total logarithmically above 50M (diminishing returns)
  const scaledStat =
    statTotal < 50_000_000
      ? statTotal
      : (statTotal - 50_000_000) / (8.77635 * Math.log10(statTotal)) + 50_000_000;

  // Happiness multiplier (logarithmic scaling)
  const happinessMultiplier = round4(1 + 0.07 * round4(Math.log(1 + happiness / 250)));

  // Stat-specific magic numbers
  const A = Stats[statName].A;
  const B = Stats[statName].B;

  // The full formula
  return (
    (1 / 200000) *
    gymDots *
    energyCost *
    perksMultiplier *
    (scaledStat * happinessMultiplier +
      8 * happiness ** 1.05 +
      A * (1 - (happiness / 99999) ** 2) +
      B)
  );
}

/**
 * Round to 4 decimal places (matching Excel ROUND behavior)
 */
function round4(n: number): number {
  const multiplier = 10000;
  const sign = n < 0 ? -1 : 1;
  return sign * Math.round(Math.abs(n) * multiplier) / multiplier;
}
