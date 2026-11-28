# Badlands

Researched November 27, 2026. **47 Alliance/shared quest entries** under Zones, suggested levels **35–45**. The band describes the ordinary leveling route; individual introductions and elite continuations have different levels. Maintained data: [quests.json](../../data/quests.json).

Sources: the [45-entry main index](https://foreverchanges.pro/quests/badlands), [44-entry secondary index](https://foreverdb.net/quests/badlands), [48-entry API-derived index](https://legacyofwarcraft.com/db/forever/quests/badlands.html), current individual pages/tooltips at build **1.60.1.71139**, and Questie's primary Forever baseline/generated records, authored corrections, and player traces at revision `0e6f3386b2a31b76b1b103e1d3aa6f4f6a7797ba`. Unchanged Classic quests retain reference provenance; current custom quests use their generated/observed records. [Candidate ledger and primary fields](sources.json) · [Selected page extracts](quest-pages.json) · [Current tooltip extracts](quest-tooltips.json)

## Coverage

All **45** main-index entries are accounted for: **34 included and 11 Horde-only excluded**. The broader audit checks **82 candidates** across the three indexes, all baseline/generated zone assignments, local NPC/object starters, objectives mentioning Badlands, and the direct Theldurin introduction:

| Decision | Candidates |
| --- | ---: |
| Included | 47 |
| Horde-only | 33 |
| Magram route | 1 |
| Misfiled Searing Gorge/Blasted Lands quest | 1 |

The 13 additions beyond the main index are Summoning the Princess; Theldurin the Lost; Solution to Doom; the second A Sign of Hope; Martek the Exiled, Indurium, and News for Fizzle; Flash Bomb Recipe; Power Stones; both Alliance Badlands Reagent Runs; and both Terror of the Desert Skies steps.

The list covers Sigrun/Ryedol's prospectors, Agmond/Murdaloc, the relevant Uldaman entry/return chain and Ironforge investigation, Rigglefuzz, Lotwil/Lucien, the elemental experiments, the Alliance dragon-release route, Theldurin's fragments/digest route, the Martek detour, Alchemy/Engineering tasks, and the current Forever additions.

Thirteen IDs copy the existing Uldaman records, changing only `zone`: **709, 719, 720, 721, 723, 724, 725, 726, 738, 739, 762, 2418, and 2500**. Their existing data, source provenance, and completion IDs remain intact. Uldaman-only steps such as Amulet of Secrets stay in the dungeon list and are reached through quest links. Direct Badlands introductions and follow-ups retain their actual outside pickup areas rather than being mislabeled as Badlands coordinates. Summoning the Princess explicitly identifies its continuation in Arathi Highlands.

## Chains and locations

There are **30 explicit prerequisite references and one active-quest link**. Existing shared links are preserved; inherited requirements use Classic/primary baseline attribution. Reverse links are derived by the app and cross-list steps resolve to Uldaman where appropriate.

- **This Is Going to Be Hard (734) requires both Study of the Elements: Rock (712) and Gyro... What? (714).** The primary `preQuestGroup` supplies the two parallel requirements; Liquid Stone and Stone Is Better than Cloth are not invented as additional mandatory requirements.
- The three Study of the Elements steps, three This Is Going to Be Hard steps, and same-named Tremors/Prospect/Passing Word quests retain distinct IDs and objectives. They are chain stages, not duplicate names to merge.
- **Seal of the Earth (779) requires Tremors of the Earth (717) active**, not completed. Its objective and expanded detail label preserve that distinction. The Horde Seal (795) and Broken Alliances (782/793) are excluded.
- The Alliance reagent route uses **Ghak Healtouch in Thelsamar (2500/2501)**. The Horde Jarkal variants (2258/2203) are excluded. Badlands Reagent Run links forward to the existing Uldaman Reagent Run in the dungeon list; the alchemy branch retains its Alchemy 210 condition.
- Ironforge pickups use city-map positions from the primary NPC baseline, not the public page's projected Dun Morogh coordinates. The Theldurin introduction uses the Alliance Gerrig Bonegrip route rather than Zaruk's Horde pickup. Existing curated Ironforge references in the shared Uldaman records remain unchanged.

**Safety Checks (97617)** is Alliance-only. The public page lacks a starter, but player quest/NPC traces identify **Dorgaron (269577)** at **54.63, 12.87 in Badlands**, near the Loch Modan border. **Mirage Mirror (97821)** starts from its item and can be turned in to Dorgaron; the Horde Mus'hale turn-in is not presented as the Alliance route. Item-started quests retain blank fixed pickup coordinates.

**Terror of the Desert Skies (78823/78830)** is supported by current Forever quest tooltips, the API pages, primary generated/observed quest records, and authored chain corrections, despite the public quest pages returning 404. The first starts from Primitive Drawing and leads to Hemet Nesingwary; the second sends the player to hunt Gharrik in Badlands. Hemet uses the existing Stranglethorn Vale expedition reference. The current API lists equipment rewards, not an assumed class-rune reward. No class restriction is recorded. The primary all-race default is explicitly an assumption based on the public Both label and inherited mask, so shared eligibility is inferred rather than claimed as a separately observed Alliance acceptance.

## Exclusions and limits

**Supplies and Studies (97663)** is labeled Both factions by the public page and has a broad authored correction, but its generated record and direct player trace explicitly record the Horde mask `8589934770`. Its starter/turn-in is Mus'hale at Kargath. It is excluded for this Alliance tracker; an unqualified public label does not erase the observed restriction.

**A Conqueror's Crown (92743)** requires maintaining Magram reputation and is excluded under the user's Gelkis preference. **The Burning Beast (81900)** is misfiled under Badlands: its starter is Weathered Etching **441061 in Searing Gorge (area 51)**, and it leads to Bloodmage Lynnore in the Blasted Lands. Neither its pickup nor objective belongs in Badlands.

The Kargath quest hubs and Horde Blackrock dungeon/Onyxia routes remain excluded. No source-evidence metadata is required to load this quest list. This addition registers a quest list, without a separate zone map. Existing maps, loot, profession data, progress-storage behavior, and the Rogue simulator are unchanged.
