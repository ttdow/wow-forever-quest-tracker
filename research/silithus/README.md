# Silithus

Researched November 27, 2026. **106 Alliance/shared quests** under Zones, suggested levels **55–60**. The suggested band describes the ordinary leveling quests; introductions, seasonal quests, and raid tasks have their own requirements. Maintained data: [quests.json](../../data/quests.json).

Sources: the [119-entry current index](https://foreverchanges.pro/quests/silithus), individual pages at build **1.60.1.71139**, the [57-entry secondary index](https://foreverdb.net/quests/silithus), the [124-entry API-derived index](https://legacyofwarcraft.com/db/forever/quests/silithus.html), and Questie's primary Forever baseline, generated records, authored corrections, and starter-location records at revision `0e6f3386b2a31b76b1b103e1d3aa6f4f6a7797ba`. The public pages explicitly identify inherited Classic data; this is reference coverage rather than a claim that every raid/event quest is available in the current phase.

## Coverage

The [166-candidate ledger](sources.json) draws on all three indexes, generated zone and objective matches, local NPC and object starters, and related introductions and hand-ins. The tracker includes **89 quests from the main index**. The published ledger contains:

| Decision | Candidates |
| --- | ---: |
| Included | 106 |
| Horde-only | 28 |
| Non-Rogue class quests | 27 |
| API-only records without usable eligibility/starter data | 3 |
| Unassigned older Desert Survival Kits variant | 1 |
| Unrelated Darnassus quest | 1 |

The 17 entries outside the main index include Wasteland, A Reliquary of Purity, the Thunderfury chain, Alliance Taking Back Silithus, the Smoked Desert Dumplings Cooking chain, both outdoor Lunar Festival elders, the Rogue Veiled Shadows hand-ins, The Fall of Ossirian, Hunting for Ectoplasm, and Wild Fires in Kalimdor.

The list includes the venom/supply-line chains, Southwind investigation, Twilight Lexicon/texts, Natalia/Crystal Calling chain, Abyssal summons and repeatables, Alliance Field Duty, all twelve Combat Task assignments, Tactical/Alliance Logistics tasks, Cenarion battlegear, Silithyst, Cooking 285, and supported local raid/event references. Item-started quests retain their actual item names and do not acquire invented fixed pickup coordinates.

**Armaments of War (8378), Cloak of Veiled Shadows (8693), Band of Veiled Shadows (8701), and Dagger of Veiled Shadows (8709)** copy the existing Rogue records, changing only the list name. Completion continues to use the same IDs. The other class variants remain excluded. No prior quest record or progress storage behavior is changed.

## Chains and requirements

There are **39 prerequisite references and two earlier/active-quest links**, backed by the primary Forever baseline's explicit prerequisite fields and labeled as Classic references. The app derives reverse links and resolves shared quests between Silithus and Rogue.

- **Glyph Chasing and Breaking the Code are both required for Unraveling the Mystery.** This comes from `preQuestGroup`, rather than a guessed order between the two parallel quests.
- **Goldleaf's Discovery precedes Lords of the Council.** The primary table supplies this requirement even though the separate Classic SQL `PrevQuestId` differs.
- **Taking Back Silithus is an optional introduction** to Securing the Supply Lines. It appears under Earlier in chain, not Prerequisites.
- **Field Duty Papers requires Field Duty active**, not completed. Its expanded objective preserves that distinction. Assignment briefings are item requirements, not invented mandatory completion links between all assignments.
- **Wasteland links to the Alliance Rabine Saturna introduction (6762)**; the Horde alternative is omitted. The Ectoplasmic Distiller links to its external guide.
- Cooking 285, Cenarion Circle reputation, briefing items, raid access, and event windows are listed where supported. Repeatable records remain individually checkable; completing a repeatable does not automatically reset it or complete a different quest ID.

Thunderfury, Ahn'Qiraj raid hand-ins, Colossus researchers, and seasonal tasks have detail labels for their respective content phases or events. The existing stage field carries these visible conditions; the notes field retains additional research metadata.

## Locations and excluded records

**Cenarion Emissary Jademoon** uses the primary **Ironforge city position 58.54, 47.32**. The public page projects this NPC onto Dun Morogh; those projected coordinates are not used. Wild Fires in Kalimdor uses the shared Festival Flamekeeper's **Stormwind 49.39, 71.86** reference rather than the public page's first Orgrimmar spawn. Known hubs identify Cenarion Hold, Valor's Rest, Ortell's Hideout, Bronzebeard's Encampment and Crystal Vale. Locations inherited from Classic remain approximate references.

**Desert Survival Kits (8856)** has no supported starter, level zero, and conflicting objective/required-item lists. It is excluded; the valid Alliance briefing version **8497** is retained. **Eyes of the Sentinels (98067)** is a level 11 Darnassus task: its Cenarion Hold depths objective refers to Darnassus, not the Silithus settlement.

The API-derived index also contains **86674, 86724, and 86725** (an alternate poison quest and two Dust to Dust records). Their pages provide names/descriptive text but no reliable quest level, starter, or faction/class conditions; current ForeverChanges pages and Wowhead Forever quest tooltips return 404, and the inspected primary addon records do not corroborate them. They remain documented candidates rather than speculative playable entries or automatically substituted IDs. In particular, the two Dust to Dust descriptions suggest different faction routes, so neither is assumed neutral. These are a known coverage limit, not proof that the records cannot be used in game.

[Quest-page extracts](quest-pages.json) retain the inspected selected page facts. [Sources and request results](sources.json) preserve the reviewed revision, primary fields, decision ledger, and download failures. The existing November 13 Classic SQL snapshot was consulted for comparison, not treated as new Forever observations. Temporary research/QA utilities remain outside the published runtime.
