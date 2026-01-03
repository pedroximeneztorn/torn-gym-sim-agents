# Agent Notes

This file contains guidance for AI agents working with this codebase. Information here supplements the wiki dumps in `docs/wiki/` and **takes precedence** when there's a conflict.

## Formula Implementation

Our `calculateResult()` in `src/gains.ts` uses a formula derived from Omanpx's Torn-UI Gym Gains Calculator, which differs from the wiki's Vladar formula. We prefer Omanpx's version.

Test cases in `src/gains.spec.ts` are validated against reference values from the Omanpx calculator.

## Gyms to Ignore

### Fight Club
Ignore completely. It's listed in the wiki but is invite-only and not available to any regular user. Do not include it in simulations or recommendations.

### The Sports Science Lab (SSL)
Ignore unless the user specifically asks about it. The requirements (max 150 Xanax + Ecstasy lifetime) make it inaccessible to most players. If a user asks, note the drug restriction.

## Happiness Mechanics

### Happiness Loss Per Train
Each gym train costs 40-60% of the energy spent in happiness. **Use 50% as the average for simulations.**

Example: A 10-energy train at George's costs ~5 happiness.

### Happiness Reset
Happiness resets to your base maximum at xx:00, xx:15, xx:30, and xx:45 **only if you're above your base max**. If you're at or below base, nothing happens.

### Ecstasy
Exactly doubles current happiness. Not approximate.

### Booster Cooldown
Limits non-drug, non-medical consumables (candy, alcohol, energy drinks, EDVDs). Additive timer capped at 24 hours (can be raised to 48h with faction perks). You can use items while under the cap; each item adds time based on its type.
