import { describe, it, expect } from "vitest";
import { calculateResult } from "./gains";
import { TrainInput } from "./types";

/**
 * Reference values checked against Omanpx's Torn-UI Gym Gains Calculator
 * https://algisk.shinyapps.io/Torn-UI/
 */

const defaults: TrainInput = {
  trainedStatTotal: 10_000_000,
  startingHappy: 5000,
  statName: "Strength",
  gymName: "George's",
  perks: [],
};

const testCases: [string, Partial<TrainInput>, number][] = [
  ["baseline - 10M Strength at George's", {}, 4451.4],
  ["perk stacking - multiplies (1+perk) values", { perks: [0.045, 0.10] }, 5116.9],
  ["high-stat scaling - log scaling above 50M", { trainedStatTotal: 200_000_000 }, 23074.3],
  ["happiness near cap - 99k happy", { startingHappy: 99000 }, 5693.4],
  ["low happiness - 250 happy", { startingHappy: 250 }, 3829.2],
  ["stat-specific constants - Defense has different A/B values", { statName: "Defense" }, 4450.7],
  ["gym data integration - 50-energy gym with higher dots", { gymName: "Gym 3000" }, 24391.1],
  [
    "complex case - custom values for everything",
    {
      trainedStatTotal: 75_000_000,
      startingHappy: 12000,
      statName: "Defense",
      gymName: "Last Round",
      perks: [0.03, 0.12, 0.05],
    },
    27232.4,
  ],
];

describe("calculateResult", () => {
  testCases.forEach(([name, overrides, expected]) => {
    it(name, () => {
      const gain = calculateResult({ ...defaults, ...overrides });
      expect(gain).toBeCloseTo(expected, 0);
    });
  });
});

describe("multi-day simulation", () => {
  it("10M to 15M Defense at George's takes 913 days", () => {
    let stat = 10_000_000;
    const target = 15_000_000;
    let days = 0;

    while (stat < target) {
      stat += calculateResult({
        ...defaults,
        trainedStatTotal: stat,
        statName: "Defense",
      });
      days++;
    }

    expect(days).toBe(913);
  });
});
