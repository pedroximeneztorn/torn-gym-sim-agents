# Torn Gym Simulator - Agent Toolkit

A codebase designed for AI agents to quickly understand and simulate gym training in [Torn](https://www.torn.com).

## Quick Start for Agents

**Goal:** Calculate how much a player's stats will increase from gym training.

**Core function:** `calculateResult()` in `src/gains.ts`

```typescript
import { calculateResult } from "./src/gains";

const gain = calculateResult({
  trainedStatTotal: 10_000_000,  // Current stat value
  startingHappy: 5000,           // Current happiness
  statName: "Strength",          // Which stat to train
  gymName: "George's",           // Which gym
  perks: [0.045, 0.10],          // 4.5% personal perk + 10% faction perk
});
```

## How Gym Training Works

### The Four Stats
- **Strength** - Physical power
- **Speed** - Movement speed
- **Dexterity** - Agility and accuracy
- **Defense** - Damage resistance

### Key Factors Affecting Gains

1. **Gym Dots** - Each gym has a dot rating (20-100) per stat. Higher = more gain.
2. **Energy Cost** - Gyms cost 5, 10, 25, or 50 energy per train. Higher cost = more gain.
3. **Current Stat** - Diminishing returns as stats grow (logarithmic scaling above 50M).
4. **Happiness** - More happiness = more gains (up to 99,999 cap).
5. **Perks** - Personal perks (up to ~4.5%) and faction perks (up to ~15%) multiply gains.

### The Gain Formula (Simplified)

```
gain = (1/200000) × gymDots × energyCost × perks × (
    scaledStat × happinessBonus +
    happinessPower +
    statConstants
)
```

Where:
- `scaledStat` = current stat (with log scaling above 50M)
- `happinessBonus` = 1 + 0.07 × ln(1 + happiness/250)
- `happinessPower` = 8 × happiness^1.05
- `statConstants` = magic numbers per stat (A, B values)

## File Reference

| File | Purpose |
|------|---------|
| `src/gains.ts` | **Core calculation** - `calculateResult()` function |
| `src/gyms.ts` | **Gym database** - All 33 gyms with dots and energy costs |
| `src/gym-progression.ts` | **Unlock sequence** - Energy needed to unlock each gym |
| `src/types.ts` | **Type definitions** - `StatName`, `GymName`, `TrainInput` |
| `docs/special-gyms.md` | **Specialist gyms** - Requirements for Stage 4 gyms |

## Gym Progression

Players progress through 24 gyms by spending energy:

- **Stage 1** (8 gyms): 5 energy, 20-40 dots
- **Stage 2** (8 gyms): 10 energy, 40-60 dots
- **Stage 3** (8 gyms): 10 energy, 60-73 dots → ends at **George's**
- **Stage 4** (specialist): 25-50 energy, 75-100 dots, require stat imbalance

**George's** (73 dots all stats, 10 energy) is the optimal endgame gym for balanced builds.

## Common Simulation Scenarios

1. **How long to reach X stat?** - Loop `calculateResult()` with energy budget per day
2. **Which gym is best?** - Compare gains per energy at different gyms
3. **Specialist gym worth it?** - Calculate energy cost to build required imbalance
4. **Optimal training split?** - Compare balanced vs focused stat training

## Example: 30-Day Projection

```typescript
import { calculateResult } from "./src/gains";

let strength = 10_000_000;
const energyPerDay = 1000;
const energyPerTrain = 10; // George's

for (let day = 0; day < 30; day++) {
  const trains = energyPerDay / energyPerTrain;
  for (let i = 0; i < trains; i++) {
    strength += calculateResult({
      trainedStatTotal: strength,
      startingHappy: 5000,
      statName: "Strength",
      gymName: "George's",
      perks: [0.045],
    });
  }
}

console.log(`After 30 days: ${strength.toLocaleString()}`);
```
