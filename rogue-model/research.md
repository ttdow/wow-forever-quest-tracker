# Level-29 Combat Rogue model: research and validation plan

Researched November 11, 2026 using Chrome. The browser prototype covers weapon swings and Sinister Strike. Its results are hypothetical until the combat rules are validated against Forever logs.

## Browser prototype

The default level is 53. The editable weapon and sheet stat defaults come from the saved level 29 snapshot below. The selected level determines rank availability and the level used by the armour formula. The target is assumed to be the same level. Enter each weapon's damage range and speed from its item tooltip. For Sinister Strike the prototype applies provisional Classic normalization of 1.7 seconds for a dagger and 2.4 seconds for other one-handed weapons.

| Sinister Strike rank | Required level | Bonus damage |
| --- | ---: | ---: |
| [I](https://www.wowhead.com/forever/spell=1752/sinister-strike) | 1 | 3 |
| [II](https://www.wowhead.com/forever/spell=1757/sinister-strike) | 6 | 6 |
| [III](https://www.wowhead.com/forever/spell=1758/sinister-strike) | 14 | 10 |
| [IV](https://www.wowhead.com/forever/spell=1759/sinister-strike) | 22 | 15 |
| [V](https://www.wowhead.com/forever/spell=1760/sinister-strike) | 30 | 22 |
| [VI](https://www.wowhead.com/forever/spell=8621/sinister-strike) | 38 | 33 |
| [VII](https://www.wowhead.com/forever/spell=11293/sinister-strike) | 46 | 52 |
| [VIII](https://www.wowhead.com/forever/spell=11294/sinister-strike) | 54 | 68 |

Forever spell tooltips show 45 base Energy across all eight ranks. The simulator applies the saved build's 5-Energy Efficient Strikes discount and 15% Aggression damage bonus at all selected levels.

The prototype assumes an equal-level NPC, a fixed attack position, and capped weapon skills. It uses its Classic-style reference table with 24% base dual-wield miss, 5% special miss, 5% dodge, 5% frontal parry, and 10% glancing blows on autos at 95% damage. Hit and expertise reduce their respective outcomes. It uses a single roll for avoidance, glancing blows, crits, and ordinary hits, with double damage for crits and no blocks. Physical damage uses the reference armour formula `armour / (armour + 400 + 85 * attacker level)`, capped at 75%.

Hack and Slash uses the selected weapon type for each hand. Daggers and fist weapons gain 5 percentage points of crit on attacks using that weapon. Sinister Strike inherits the main hand’s bonus. Landed sword and axe attacks roll a 5% chance for an extra main-hand swing. The model includes main-hand swings and Sinister Strike in these rolls. Extra swings use the main-hand white attack table, leave swing timers alone, and do not chain. Rolls are independent in this approximation, with no proc cooldown. An optional switch enables landed off-hand sword or axe triggers so that hypothesis can be tested separately.

A main-hand mace applies the chosen Hack and Slash percentage to target armour before mitigation. The reduction applies to both hands and Sinister Strike, and applies once with two maces. The tooltip gives 15%. The Hammer and Thrash Blade comparison against Saltwater Snapjaws showed about 4.3% more dagger damage at the same raw damage, equivalent to about 9% less armour in the reference formula. The percentage is editable to reproduce either case. An optional switch models the unverified activation from an off-hand mace alone. Both off-hand switches default off. [Hack and Slash tooltip](https://www.wowhead.com/forever/spell=13960/hack-and-slash)

The editable off-hand damage multiplier defaults to 75% for 2/2 Dual Wield Specialization. The base multiplier without the talent is 50%. This multiplier applies to raw off-hand swing damage before armour. The old level 29 calculations below use 50%.

The opener starts at full Energy. Sinister Strike fires as soon as the Rogue has 40 Energy and the global cooldown is ready. A landed strike spends 40 Energy. An avoided strike spends 8 after a 32-Energy refund, which can bring the next attempt forward. The November 25 Alcaz Prison log supported an 8-Energy net cost on two dodges. The model extends that rule to misses and parries, which still need direct confirmation. The log is private.

The first auto-attacks occur after one weapon interval. Attacks exactly at the selected end time count. The tool weights each possible Sinister Strike cast time and Energy state by its probability to calculate expected attempts and DPS. It also rolls the outcomes and schedules casts in 1,000 repeatable fights to show the middle 90% of results. That range describes fight-to-fight variance under the selected assumptions. The prototype covers auto-attacks, Sinister Strike, and Hack and Slash. Individual weapon procs such as Thrash Blade are outside its scope.

## Character inputs

`character.json` records the latest user-supplied level, weapons, sheet stats and talents. The user confirmed that the remaining five talent points are utility and requested maximum weapon skill. Instant Poison Rank 1 is the available poison; application to both weapons is an assumption.

Use 253 AP, 10.4% crit, 3.4% hit and 1.0% expertise directly. Do not add weapon attributes, Precision or Weapon Expertise a second time. Agility is descriptive when calculating this snapshot from sheet AP and crit; add only the marginal effects of Agility when testing an equipment change.

## Sources read

1. [Official Blizzard development notes, November 2, edited November 4](https://us.forums.blizzard.com/en/wow/t/wow-forever-beta-development-notes-%E2%80%93-updated-november-2/2360696/9): Rogue Poised, Shank, poison AP coefficients and Combat talent changes.
2. [Wowhead Forever: Sinister Strike Rank 4, spell 1759](https://www.wowhead.com/forever/spell=1759/sinister-strike): level 22, cost, damage effect, combo-point generation and GCD.
3. [Wowhead Forever: Eviscerate Rank 4, spell 6762](https://www.wowhead.com/forever/spell=6762/eviscerate): level 24, cost, base damage ranges, GCD and server-side script marker.
4. [Wowhead Forever: Instant Poison I, item 6947](https://www.wowhead.com/forever/item=6947/instant-poison): level 20, proc chance, base damage, coating duration and charges.
5. [Wowhead Forever: Shank Rank 1, spell 1329283](https://www.wowhead.com/forever/spell=1329283/shank): damage effect, cost, Energy gain, GCD, cooldown and proc-suppression flags.

Additional search corroboration, weaker than opening the underlying records:

- [Wowhead Forever weapon listing](https://www.wowhead.com/forever/items/weapons/side:1/class:7/slot:13) search excerpt lists Leaden Mace at 16.03 DPS / 2.90 seconds and Cross Dagger at 14.62 DPS / 1.30 seconds. The pasted context's damage ranges are consistent with these values. Random suffix attributes were not reverified and are unnecessary when using total sheet AP/crit.
- [Zockify Rogue overview](https://www.zockify.com/forever/rogue/) search excerpt describes continuous Energy regeneration. The precise server update interval and exact rate were not established from a primary source in this pass. Continuous 10 Energy/second remains a baseline assumption.

## Rules supported by official notes or current spell records

| Mechanic | Rule | Consequence for model |
| --- | --- | --- |
| Poised | Learned at 18. Gained out of combat at maximum Energy; next Energy ability costs 10 less. | Apply to an eligible opener. Do not reactivate simply because Energy reaches 100 during combat. |
| Composure 2/2 | Increases Poised's discount by 10. | Total opener discount is 20 Energy. It is not a recurring reduction on every ability. |
| Efficient Strikes 2/2 | Reduces Sinister Strike cost by 5. | Ordinary cost is 45 - 5 = 40 Energy; a Poised Sinister Strike is expected to cost 20. Cost-discount interaction is worth checking in game. |
| Sinister Strike IV | Normalized weapon damage +15; awards 1 CP; 1-second GCD. | Use a separate special-attack outcome table and award CP on a successful attack. |
| Eviscerate IV | 35 Energy; 1-second GCD; requires level 24. | Flawless Execution's 15-Energy reduction gives an ordinary 20-Energy cost. |
| Coup de Grace 3/3 | +20% Eviscerate damage. | Preserve its contribution separately from Aggression until stacking is validated. |
| Aggression 3/3 | +15% Sinister Strike and Eviscerate damage. | Apply to these abilities, not automatically to autos or Shank. |
| Shank I | Learned at 24; costs 5, generates 15 Energy, 10-second cooldown, 1-second GCD; 50% off-hand weapon damage; cannot miss. | Potential net gain of 10 Energy per cast, reduced by overcap. Include its GCD and damage. |
| Shank procs | Spell flags include Suppress Caster Procs and Suppress Weapon Procs. | Baseline excludes Shank-triggered poison applications; verify in logs if observed behaviour disagrees. |
| Shank CP | Tooltip awards 2 CP through Boot Knife, which this character does not have. | No baseline CP generation from Shank. The generic CP effect entry alone is not evidence of baseline CP. |
| Instant Poison I | 20% chance per strike; 13-17 base Nature damage. Official notes specify AP coefficient 0.01. | Expected pre-resistance, noncritical damage per proc: 15 + 0.01 * 253 = 17.53, assuming the coefficient applies unmodified to this rank. |
| Poison coating | 30 minutes; 60 charges. | Decide explicitly whether encounters start with fresh coatings; track depletion for longer runs. |

"Cannot miss" on Shank does not by itself establish immunity to dodge/parry. Do not silently convert it into a guaranteed successful attack. Its Energy gain on avoided attacks also needs checking.

## Eviscerate: what is and is not established

The current Rank-4 tooltip lists base ranges:

| Combo points | Base damage |
| --- | --- |
| 1 | 41-61 |
| 2 | 72-92 |
| 3 | 103-123 |
| 4 | 134-154 |
| 5 | 165-185 |

This is a base mean of `20 + 31 * CP`, before AP, talents, crit and armour. The record says damage increases with AP and includes a server-side script. It does **not** establish the AP coefficient. The prior conversation's `0.03 * AP * CP` is an inherited Classic assumption, not a verified Forever formula.

Similarly, `1.20 * 1.15 = 1.38` for the two damage talents is provisional. The alternative additive combination is `1 + 0.20 + 0.15 = 1.35`. Test or retain both as sensitivity cases before interpreting close talent/rotation rankings.

## Analytical checks before simulation

With the inherited weapon damage ranges, total AP 253 and the standard assumed 50% off-hand penalty:

```text
MH raw DPS = ((32 + 61) / 2) / 2.9 + 253 / 14 = 34.106
OH raw DPS = 0.5 * (((13 + 25) / 2) / 1.3 + 253 / 14) = 16.343
Combined = 50.449 DPS
```

This checks arithmetic only. It excludes attack outcomes, armour, poisons, abilities and haste.

Sinister Strike's effect is explicitly normalized. With the **provisional Classic** one-hand normalization constant of 2.4 seconds:

```text
SS mean = (46.5 + (253 / 14) * 2.4 + 15) * 1.15 = 120.602
```

That is before armour and attack outcomes. The static spell entry does not expose the numeric 2.4 constant, so verify it independently before treating this as a confirmed damage prediction.

## Outstanding mechanics, with concrete tests

1. **Eviscerate scaling and talent stacking:** collect noncritical Eviscerates at fixed CP on the same target type, with two known AP totals. Use enough casts to estimate the means and their uncertainty. Keep talent allocation, buffs and debuffs fixed. AP differences help isolate scaling; controlled talent changes or reliable server evidence are needed to isolate stacking. Respect the base damage range and armour mitigation.
2. **Sinister Strike normalization:** compare noncritical damage at two AP totals on the same target with the same weapon. The damage shift tests whether the AP term uses 2.4 seconds rather than the mace's actual 2.9 seconds. Use an unchanged target and account for armour.
3. **Shank:** record damage, Energy before/after, GCD and cooldown; test both frontal and rear positioning. Check whether avoidance changes Energy generation, whether damage includes the usual off-hand penalty, and whether weapon/poison procs actually occur. Do not double-apply a 50% penalty based only on wording.
4. **Energy and failed attacks:** verify passive regeneration, cap behaviour, and Energy refunds/CP retention on missed, dodged or parried builders and finishers. Spell records expose a discount-on-miss flag, not the complete server behaviour.
5. **Poison:** validate eligible attacks, proc frequency per eligible landed attack, damage, resistance outcomes, critical strikes and charges consumed. Do not apply the 20% chance to swings that do not qualify.
6. **Hit tables and armour:** specify a target level/armour and attack position. Separate dual-wield autos from specials; include glancing blows only where applicable. Use explicit assumptions until Forever outcomes are validated.
7. **Slice and Dice:** before comparing maintenance policies, verify its level-appropriate rank, haste, CP durations, cost, and how changing haste reschedules an in-progress swing.

Combat logs can validate damage and outcomes. Resource transitions, Poised consumption and some cooldown details may require an in-game observation or resource/event recording in addition to the damage log.

## Implementation order and first experiment

1. Separate character data, mechanics parameters, encounter settings and rotation policy. Every uncertain parameter should retain its source/status.
2. Implement auto-attacks and Sinister Strike with deterministic analytical checks before stochastic combat.
3. Add Eviscerate and Poised, using configurable AP scaling/stacking until validation resolves them.
4. Add Shank and poison. Shank is available at this level and should be included before describing results as the character's full sustained DPS.
5. Compare Eviscerate thresholds from **1 through 5 CP**, not just 2-5: the cheap finisher makes excluding 1 CP an unnecessary prior assumption. Use fixed-condition 30-, 120-, 180- and 300-second scenarios, including both Poised and already-in-combat starts.
6. Add Slice and Dice policies, then controlled gear/talent perturbations and marginal stat weights. Compare paired per-encounter DPS differences, their confidence intervals, damage breakdown, cap waste, casts and buff uptime.

The earlier Efficient Strikes vs. Lightning Reflexes comparison remains a useful sanity check for a stationary Sinister Strike policy. For short fights the result can tie if the saved Energy cannot be spent before the encounter ends; "strictly better in every encounter" is too strong. Talent swaps must remain legal at the required tree tiers.
