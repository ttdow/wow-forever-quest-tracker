# Riverglades

Researched November 19, 2026. Added under **Zones**, suggested levels **38–44**, with **121 Alliance/shared quest entries**: **108 from the current index and 13 additional relevant entries**. Fourteen reuse existing quest IDs and records from Desolace, Stranglethorn Vale, and Krol'dok Stronghold. The maintained data is [quests.json](../../data/quests.json).

Sources: the [170-entry current index](https://foreverchanges.pro/quests/riverglades), individual current quest pages at build **1.60.1.70959**, the [101-entry secondary index](https://foreverdb.net/quests/riverglades), and Questie's primary generated records, authored corrections, and player traces at revision `48ce570ee1c17e354d6b25ac26c5ad6560ef0d89`. The suggested range uses the secondary zone guide; it is a leveling recommendation, not the minimum and maximum levels of every associated quest.

## Coverage

All **170** main-index entries are accounted for:

| Decision | Entries |
| --- | ---: |
| Included Alliance/shared quests | 108 |
| Horde-only quests excluded | 61 |
| Unrelated Duskwood quest excluded | 1 |

The broader [204-candidate ledger](sources.json) also checks the secondary index, every generated Riverglades category assignment, objectives mentioning Riverglades/Farholde/Powderfuse, local NPC/object starters in zone **16591**, authored corrections, direct observed parents, and existing shared-list records. Its final decisions are:

| Decision | Candidates |
| --- | ---: |
| Included | 121 |
| Horde-only | 73 |
| Mount Hyjal chain outside this zone | 3 |
| Outside-zone prerequisites retained as references | 3 |
| Unrelated Duskwood quest | 1 |
| Instance-only task with an outside pickup | 1 |
| Unverified dungeon escort retained only in its dungeon list | 1 |
| Unimplemented placeholder | 1 |

No selected quest has a recorded non-Rogue class restriction. Horde versions of similarly named tasks remain excluded by their actual IDs, including the gnoll, hunt, Ghostmaw, shipping-crate, Twilight, and faction-specific dungeon routes. **Armory of Sunnyglade (97884)** is Horde-only and is excluded despite its Riverglades objective and crafting reward.

The 13 additions outside the main index are:

- Alliance Lost Shipping Crate introductions from Stranglethorn Vale (93443) and Desolace (94841).
- Deliver the Second Shipment (94929), Overseas Delivery (95144), The Riverglades Report (95315), and Twice Misplaced Trust (97332).
- Krol'dok Moulding, Key Ingredients, Eye of Mugg, Twilight Mementos, Tome of Twilight, Lingering Essence, and Curios of Curiosity, connecting the existing dungeon stages to their Riverglades pickups/handoffs.

The core list includes the Farholde, Wheeler's Grange, Southern Watch, Turner's Logging Camp, Sunnyglade, Twilight's Shroud, Terral's Watch, Bolder'ok, and Powderfuse Port routes; Wanted posters; item-started quests; and the smuggler/shipping branches through Booty Bay, Tanaris, and Feralas. Outside pickups retain their actual zones rather than being labeled as Riverglades coordinates.

## Chains and shared progress

There are **79 earlier-chain links**, all retained as **observed offer order**, rather than asserted mandatory completion requirements. The primary relationship traces explicitly describe these links as assumptions based on player offer sets/handoffs. Multi-parent observations stay in that category; they do not claim that every listed parent must be completed. The app derives the reverse **Later in chain** links automatically.

Covered routes include the horses, logging camp rescue, Elbrim's family possessions, Sunnyglade investigation, Marshal Ryan, the western front, Twilight cave investigation, mementos/dungeon continuation, ogre captive, Murloc/sea-monster tasks, pirate ships, the smuggler branches, Dawnbright family story, and the clerical water-contamination chain.

The observed **A Few Furs for Friz → Smuggler's Paradise** handoff appears in the parent's forward trace even though the child's backward trace omits it. It is included with the same observed-order provenance. **Biting the Hand (94961 and 94963)** remains two distinct quests: bone collection and Fuzzle's escort. The latter's objective summary only says “Fuzzle snarls,” so the tracker uses the actual escort instruction from the quest text/requirements.

Fourteen shared IDs reuse the prior records, changing only `zone`: two Lost Shipping Crates; eight Krol'dok chain entries, including A Small Favor; three Venture Co. ledger/shipment steps; and Twice Misplaced Trust. Their existing saves and original field provenance are preserved. These copies let the app resolve related steps within Riverglades where possible and navigate to another list when needed.

Twice Misplaced Trust links back to **Anything of Value** and **Zimmix's Great Escape** in the existing Stranglethorn Vale list. Deliver the Second Shipment links to **Driftwood (1398)** through an external guide because that Swamp of Sorrows prerequisite is not tracked. Its observed order does not introduce an invented requirement to finish every unrelated Swamp quest.

The two Alliance Lost Shipping Crates are alternative acquisition records, not an excuse to merge different quest IDs. Primary traces record mutual exclusions/co-completion across crate variants. Each existing ID retains its own save; the tracker does not automatically mark another ID complete or add the Horde variants.

## Location and eligibility checks

**If a Tree Falls, and No One Hears... (94857)** has no starter in the public page. Both primary quest records and NPC traces identify **Curly (258935)**; the observed pickup is **46.11, 71.06**, near Turner's Logging Camp. That coordinate keeps trace provenance and approximate confidence. Helping Hands links back to this recovered introduction.

Known hubs identify pickup areas rather than generic zone text where supported. Wanted posters are distinguished between Farholde Keep and Powderfuse Port. Item-started Field Marshal's Log, Drop the Hammer, Hail the Dragonslayer, and Krol'dok Moulding do not acquire invented fixed coordinates. Lost Horse uses an approximate reference because horses occur at multiple positions.

**Remember That I Love You (95161)** starts in Stormwind and ends in Duskwood. The primary category is Duskwood, with an earlier Duskwood quest in the authored correction, so it is excluded despite the Riverglades index entry.

**Belle's Ring (94832)** is another misleading category assignment. Its level 58/minimum 54, Mount Hyjal introduction More of the Same, follow-up 96077, and Daythor Brellan's observed **Mount Hyjal** location establish a Hyjal chain. These three inspected candidates are excluded; a Riverglades category alone is not enough to include them.

The Horde-only unindexed Might Over Magic, Magic Over Might, and Twilight Scouting Report references remain excluded, even where no current public page exists. **REUSEME (98426)** is an unimplemented placeholder, not a new playable quest. The current sources give no additional Rogue-specific Riverglades candidate.

**Vengeance of the Highborne (96771)** remains in Krol'dok Stronghold: it is an instance task with an Alterac pickup and no distinct outdoor Riverglades stage. **Krol'dok No More! (94969)** remains that list's explicitly unverified escort reference. It has no verified outdoor starter, so this change does not promote it to the zone list.

Current published faction labels are cross-checked against generated records and authored faction corrections. Some neutral records in the primary source use an explicitly unresolved all-race default; that default alone is not proof of access. The maintained notes retain that limitation where relevant. Current pages and actual offer traces provide additional evidence; none is relabeled Horde-only without support.

## Artifacts and limits

[sources.json](sources.json) records the exact revision, parsed page facts, candidate decisions, scan methods, HTTP failures, and source hashes. [primary-records.json](primary-records.json) preserves relevant generated/authored quest records and relationship traces. [starter-records.json](starter-records.json) preserves the inspected local NPC/object starters and the Hyjal NPC reference used to resolve the misleading category.

No map or new drop data is added. Existing quest/drop records, professions, maps, completion IDs, and the progress-storage key are preserved. The tracker now has **916 list entries / 872 unique quest IDs**. Coverage is bounded by the inspected current sources, not a claim that every undocumented quest has been discovered. Hosting remains static, with no runtime or build dependency.
