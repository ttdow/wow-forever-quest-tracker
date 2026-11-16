# Felwood

Researched November 16, 2026. **80 Alliance/shared quest entries** are added under **Zones**. The maintained data is [quests.json](../../data/quests.json). Sources include the current public quest pages, both zone indexes, Questie's generated records and player traces at revision `e1652ce62113c152da682baf2d6fb85f1396bcfb`, and the read-only CMaNGOS Classic snapshot released November 13, 2026. Current pages report build **1.60.1.70938**.

## Coverage

All **95 entries** in the [current ForeverChanges Felwood index](https://foreverchanges.pro/quests/felwood) are accounted for:

| Decision | Entries |
| --- | ---: |
| Included | 73 |
| Horde-only | 19 |
| Entirely in Winterspring | 2 |
| Older unassigned Timbermaw Ally record | 1 |

The [secondary ForeverDB index](https://foreverdb.net/quests/felwood) has 47 entries, all present in the larger index. Additional scans check every generated Felwood zone assignment, NPC/object quest starters in Felwood, and quest objectives mentioning Felwood, Jaedenar, or Deadwood. The [ledger](sources.json) accounts for **125 candidates**: 80 included, 23 Horde-only, 17 restricted to other classes, two Winterspring-only tasks, two incidental geographic mentions, and one older unassigned variant.

The seven included entries beyond the index are:

| ID | Quest | Felwood relevance |
| --- | --- | --- |
| 3942 | Linken's Memory | Introduction from J.D. Collie in Un'Goro to Eridan Bluewind in Felwood |
| 4084 | Silver Heart | Eridan's collection quest, including an Irontree Heart from Felwood |
| 4005 | Aquementas | Eridan's outgoing Linken-chain step; its later objectives are in Tanaris and Un'Goro |
| 5084 | Falling to Corruption | Donova Snowden sends the player from Winterspring to the Deadwood Cauldron in Felwood |
| 5085 | Mystery Goo | Object-started follow-up at the cauldron, 60.2, 5.8 in Felwood |
| 5128 | Words of the High Chief | Delivery from Winterspring to Kelek Skykeeper in Felwood |
| 8723 | Nightwind the Elder | Local Lunar Festival elder, 37.6, 53.0 |

**Winterfall Activity (8464)** and **Beads for Salfa (8469)** both start and take place in Winterspring, so they are not put in the Felwood list merely because the index categorizes them there. **Speak to Salfa (8465)** and **To Winterspring! (5249)** do start in Felwood and remain included as outgoing handoffs. Rabine Saturna's two introductions mention Felwood only as geography on the way to Moonglade; neither belongs in this list.

The newer Forever quests are **A Sampling of Putrescence (86577)**, **Stag Lord's Bauble (86611, Alliance)**, and **The Source of the Corruption (91952)**. Current pages confirm their identities, objectives, levels/minimum levels, and faction. No non-Rogue class restriction is recorded. The distinct Horde bauble variant (86612) is excluded.

## First-time and repeatable salves

The Alliance salve quests are distinct first-time and repeatable records, not obsolete duplicate names:

| Route | First turn-in | Repeatable |
| --- | --- | --- |
| Hunting | 5882 | 4103 |
| Mining | 5883 | 4104 |
| Gathering / Herbalism | 5884 | 4105 |
| Skinning | 5885 | 4106 |
| Disenchanting | 5886 | 4107 |

The current pages and primary Classic creature relations identify **Arathandris Silversky** as the Alliance giver. The older Questie merged baseline incorrectly assigns some first-time Alliance IDs to Maybess/Horde and routes the repeatable steps directly from Cleansing Felwood. That baseline is not allowed to override the stronger references.

The Classic primary quest table establishes **Cleansing Felwood (4101) → the applicable first-time turn-in → its matching repeatable hand-in**. Each material route is parallel, not a five-quest mandatory sequence. Mining, Herbalism, Skinning, and Enchanting requirements are retained. The current objective requirements verify six Corrupted Soul Shards, four Tainted Vitriol, four Fel Creep, five Patches of Tainted Skin, or one Lesser Nether Essence respectively, each for two Plant Salves.

The Horde Cleansing Felwood (4102), repeatable salves (4108–4112), and first-time salves (5887–5891) are excluded. Friendly shared NPCs such as Islen Waterseer are not excluded merely because they stand in Horde territory: **Cleansed Water Returns to Felwood (5159)** explicitly supports both factions and shows its actual Barrens pickup.

## Plant quests and older Timbermaw record

There are **30 distinct plant-cleansing quests**, corresponding to different source objects/positions: 10 Songflowers, 10 Windblossoms, six Whipper Roots, and four Night Dragons. Their shared names do not make their IDs duplicates. The current pages record their coordinates and required salves: two for Songflowers/Windblossoms, three for Whipper Roots, and four for Night Dragons. Expanded rows identify the individual location; repeatability is preserved. Completion remains a manual quest flag, not a prediction that a plant is currently spawned or ready to harvest.

The selected **Timbermaw Ally (8460)** is offered by Grazle and requires six of each named Deadwood type. The older **6131** record asks for five of each, has no published starter, and is absent from the inspected primary Classic quest/start relations. It is excluded as an older unassigned variant; this does not assert proven deletion from the Forever server. No completion is transferred between different IDs.

## Prerequisites, locations, and evidence

The 80 entries have **33 prerequisite links**, with reverse links derived automatically by the app. Classic prerequisites retain Classic-reference provenance. The chains cover Eridan/Xavaric/Arei, Greta's Jaedenar route, Arko'narin/Trey, Timbermaw, Donova's cauldron, Linken, and the salve routes. Unknown prerequisites on new Forever quests remain unguessed. External earlier quests such as A Gnome's Assistance, Winterfall Firewater, and The Final Piece link to their quest guides.

The primary Classic table also establishes the Brokering of Peace (8484) prerequisite **The Root of All Evil (8481)**, omitted by the older Questie baseline. **Friendly Timbermaw** requirements for Runecloth/Sacred Cloth and **Exalted Timbermaw** requirements for The Root of All Evil/Brokering of Peace appear in the objective text as actionable restrictions, with Classic provenance. Sacred Cloth also requires **Tailoring 290**.

**Stag Lord's Bauble** starts at **Statue of Malorne (661778)**. The Alliance page omits its pickup, but player quest/object traces independently record both the quest starter and **42.04, 47.35** in Felwood. The displayed 42.0, 47.4 is a rounded community position. The bauble is provided by the object quest; it is not mislabeled as an item drop or assigned its Talonbranch Glade turn-in coordinates.

Arei's exact escort pickup and the fixed pickup positions for Flute of Xavaric, Blood Red Key, and Deadwood Ritual Totem remain blank where unverified. Item starters are identified as items. Meilosh/Gorn are labeled Timbermaw Hold; sanctuary NPCs are labeled Emerald Sanctuary. Outside starts remain in Un'Goro, Winterspring, or the Barrens as appropriate. Escort/delivery destinations are kept in their objectives, rather than substituted for pickup locations.

Classic fallback quest text, plant positions, reputation requirements, and prerequisite links are references, not newly observed Forever behavior. Current faction/level details and explicitly sourced player traces take precedence over conflicting baseline data. The raw Classic snapshot hash, extracted relevant records, source revisions, page facts, and candidate decisions are preserved in [sources.json](sources.json), [primary-records.json](primary-records.json), and [object-records.json](object-records.json). Coverage is bounded by these sources; undocumented quests may exist.

All existing quest records, saved IDs, and the storage key are preserved. The tracker now has **728 list entries / 701 unique quest IDs**. No map, drop view, runtime, or build dependency is added.
