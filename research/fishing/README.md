# Fishing audit

Audited 2026-11-14: all 25 table entries, 23 fish identities, and all five visible columns. The audit is complete; some fields remain unverified for Forever. Cooking recipes and cooked-food bonuses remain excluded as requested.

## Sources

- Current Wowhead Forever item tooltips confirm all 23 names and IDs, including Whimsyfin 251524, Raw Winter Squid 13755, and Raw Plated Armorfish 13890. Individual links are in [audit.json](audit.json). Identity alone does not verify catch locations.
- [Warcraft Tavern's Classic fishing loot table](https://www.warcrafttavern.com/wow-classic/guides/fishing-loot-list/) corroborates representative catch zones for all 22 Classic fish, explicitly distinguishing fresh and salt water for most entries. Its [pool guide](https://www.warcrafttavern.com/wow-classic/guides/fishing-pools/) corroborates Sagefish and Greater Sagefish schools.
- The 2026-11-13 [CMaNGOS Classic database](https://github.com/cmangos/classic-db) snapshot was queried for actual fishing loot rows, recursive reference loot, school loot, and zone skill bases. Matching paths are preserved in the audit. A zone name in an unused SQL comment is not treated as a working loot link. CMaNGOS-derived data is under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt).
- [ForeverDB's public fishing dataset](https://foreverdb.net/data/profguides/fishing.json) labels its catch tables and skill rules as Classic references. Per-item source shards contain player-recorded Forever Fishing Bobber observations. Their counts aggregate observations and must not be read as catch counts at the one representative coordinate exposed in each record.
- The [Forever Fishing/Cooking guide](https://www.wow-professions.com/forever/fishing-and-cooking-leveling-guide) corroborates Smallfish in Lake Al'Ameth/Crystal Lake, Longjaw in Stormwind canals, and inland Dustwallow trout. It explicitly says it is based on the beta, with live high-level testing incomplete. Its [standalone Fishing guide](https://www.wow-professions.com/forever/fishing-leveling-guide) provides additional leveling-zone references.
- [The Forever Whimsyfin guide](https://foreverchanges.pro/savory-whimsyfin-delight) describes the named freshwater pools and an approximate 150 no-escape report.

Source hashes, URLs, disagreements, and decisions are in [sources.json](sources.json). These sources do not expose the actual Forever server's full fishing loot and skill rules.

## Riverglades result

Neither Mithril Head Trout nor Greater Sagefish in Riverglades could be independently verified. Searches covered public fishing guides and search results, the fishing-zone dataset, the [Riverglades zone registry](https://foreverdb.net/data/zones.json), and per-item catch-source records.

The public fishing dataset has 44 zones and 68 recorded fishing spots, including the new Zephras Isle, but no Riverglades entry. The zone registry recognizes Riverglades as map 2548 with insufficient known data. Current [Trout source records](https://foreverdb.net/data/sources/45.json) and [Greater Sagefish source records](https://foreverdb.net/data/sources/33.json) expose Stranglethorn Vale Fishing Bobber locations, not Riverglades. Those records are not an exhaustive list of catch zones. Wowhead's Riverglades page returned HTTP 403, and additional search engines returned challenges, errors, or no relevant catch evidence.

Both user-supplied Riverglades entries remain, with **Unverified** catch location, water type, minimum skill, and no-fail skill. Freshwater is not inferred merely from the zone's name or a fish's usual habitat. Missing corroboration does not mean the catches are impossible.

## Row-by-row results

All identities below are confirmed in current Forever item tooltips. Catch evidence is stated separately. Skills refer to the listed water, including equipment and lures, rather than an intrinsic requirement of each fish.

| Entry | Water / catch type | Catch-location evidence | Min. / no-fail |
| --- | --- | --- | --- |
| Raw Brilliant Smallfish | Freshwater | Classic tables; Forever beta guide names Lake Al'Ameth and Crystal Lake | 1 / 25, Classic |
| Raw Slitherskin Mackerel | Ocean | Classic guide and Darkshore loot; Forever catch recorded without a zone | 1 / 75, Classic |
| Raw Longjaw Mud Snapper | Freshwater | Classic guide lists Stormwind and Loch Modan; Forever beta guide names Stormwind canals | 1 / 75, Classic |
| Raw Loch Frenzy | Freshwater | Classic Loch loot; Forever catch in Loch Modan | 1 / 75, Classic |
| Raw Rainbow Fin Albacore | Ocean | Classic Darkshore/Westfall coast references; Forever catch in Westfall | 1 / 75, Classic |
| Deviate Fish | Oases / dungeon pools (freshwater) | Classic oasis/Wailing Caverns loot; Forever catch in the Barrens | 1 / 75, Classic |
| Raw Sagefish | Freshwater schools | Classic school loot and guides; Forever catch in Hillsbrad | 55 / 150, Classic |
| Whimsyfin | Whimsyfin pools (freshwater) | Forever guide, river south of Stonewatch Keep and nearby murloc lake | Unverified / ~150, community report |
| Raw Bristle Whisker Catfish | Freshwater | Classic Redridge/Wetlands guide and loot | 55 / 150, Classic |
| Raw Rockscale Cod | Ocean | Classic coastal loot/guide; Forever catch in Stranglethorn | 130 / 225, Classic |
| Raw Mithril Head Trout | Freshwater | Classic Dustwallow/Thousand Needles loot; Forever beta guide names inland Dustwallow | 130 / 225, Classic |
| Raw Mithril Head Trout — Riverglades | Unverified | No independent Riverglades catch evidence obtained | Unverified / Unverified |
| Raw Greater Sagefish | Freshwater schools | Classic Alterac/Stranglethorn school loot/guide; Forever catch in Stranglethorn | 130 / 225, Classic |
| Raw Greater Sagefish — Riverglades | Unverified | No independent Riverglades catch evidence obtained | Unverified / Unverified |
| Raw Spotted Yellowtail | Ocean | Classic coastal loot/guide; Forever catch in Stranglethorn | 130 / 225, Classic |
| Raw Glossy Mightfish | Ocean | Classic guide corroborates Tanaris/Feralas saltwater; working Tanaris loot path | 205 / 300, Classic |
| Raw Redgill | Freshwater | Classic Felwood/Moonglade loot and guide | 205 / 300, Classic |
| Raw Winter Squid | Ocean | Classic Tanaris/Feralas seasonal loot and guide | 205 / 300, Classic |
| Raw Summer Bass | Ocean | Classic Tanaris/Feralas seasonal loot and guide | 205 / 300, Classic |
| Raw Nightfin Snapper | Freshwater | Classic Felwood/Moonglade loot and guide | 205 / 300, Classic |
| Raw Sunscale Salmon | Freshwater | Classic Felwood/Moonglade loot and guide | 205 / 300, Classic |
| Raw Plated Armorfish | Freshwater | Classic Winterspring/Eastern Plaguelands inland loot and guide | 330 / 425, Classic |
| Raw Whitescale Salmon | Freshwater | Classic Winterspring/Eastern Plaguelands inland loot and guide | 330 / 425, Classic |
| Darkclaw Lobster | Ocean | Classic Bay of Storms loot and guide | 330 / 425, Classic |
| Large Raw Mightfish | Ocean | Classic Bay of Storms loot and guide | 330 / 425, Classic |

Freshwater covers rivers, lakes, and canals. Ocean covers saltwater coasts, including Bay of Storms. Restricted catches name their actual type directly: Oases / dungeon pools (freshwater) and Whimsyfin pools (freshwater). Sagefish locations name their schools. Locations are representative, not exhaustive.

## Corrections and unresolved skill disagreements

- Whimsyfin's previous minimum 55 was inferred from ordinary Redridge water. The guide does not establish that minimum for its special pools, so it is now **Unverified**. **~150** no-fail remains an approximate community report.
- Longjaw Mud Snapper in Loch Modan is restored after independent Classic guide corroboration. Its absence from a partial snapshot query was insufficient grounds to omit it.
- Smallfish now names Lake Al'Ameth and Crystal Lake. Albacore names both coasts; Mithril Head Trout specifies inland Dustwallow water.
- Glossy Mightfish's Feralas coastal location has independent Classic guide support, although a snapshot SQL comment alone did not establish it. The table says Feralas coast rather than claiming a verified precise subzone.
- The Classic loot guide specifies Winter Squid **September 23–March 19**, Summer Bass **March 20–September 22**, Nightfin **18:00–12:00 server time**, and Sunscale **06:00–00:00 server time**. The table labels these **Classic**; Forever season/time rules have not been verified.
- Classic bases include -70, -20, 55, 130, 205, and 330. Base + 95 yields no-fail references 25, 75, 150, 225, 300, and 425; visible minimums below 1 are clamped to 1. These remain references, not measured Forever thresholds.
- [Forever Changes](https://foreverchanges.pro/professions/fishing) gives chance-only bite minima 51/126/201/326. The inspected [Classic catch code](https://github.com/cmangos/mangos-classic/blob/master/src/game/Entities/GameObject.cpp) also checks `skill >= base`, and the [independent Classic guide](https://www.warcrafttavern.com/wow-classic/guides/fishing-1-300/) lists cast minimums 55/130/205/330. These bands are retained as Classic references without claiming they settle Forever behavior.
- The Classic leveling guide collapses low zones into an inconsistent 1/96 band. Its low-zone no-fail values are not adopted. Negative database bases, ForeverDB, Forever Changes, and the Forever beta guide's 75-in-capitals statement support the retained references. Additional hard-coded gates in [Classic cast code](https://github.com/cmangos/mangos-classic/blob/master/src/game/Spells/Spell.cpp), including Stormwind/Wailing Caverns, conflict with the guides; emulator code does not prove the live server rules.

## Maintenance and loading

`data/professions/fishing.json` is the maintained dataset. Rows have stable row/item IDs, a name, catch location, nullable skills, and nullable `waterType` (`freshwater` or `ocean`). Optional `catchType` names the actual catch type directly, and `waterDetail` describes Classic catch windows. Item IDs can support future Cooking links.

Source/evidence metadata and water labels are nonblocking. Missing, malformed, or unfamiliar water labels display **Unverified**; invalid optional source labels never reject valid rows. Fishing loads independently of quests, drops, maps, and completion storage. Search also matches water labels and catch-window details.

## Grouping by area

Fishing offers By fish and By area views of the same 25 source entries. Explicit `locations` records give each entry an area name and an optional `detail` such as Coast, Sagefish Schools, or Bay of Storms. These are normalized from the already researched catch descriptions; no new catch claims or skill thresholds are introduced. The resulting 43 area/catch references cover 24 areas.

By fish keeps the original catch descriptions. By area sorts named areas and their fish alphabetically, shows the local detail separately, and retains the entry's water/catch type, skill values, catch windows, and verification status. A Riverglades heading keeps its Unverified label inline. Search tests the current area/detail rather than every location in a fish's combined description, so searching Feralas does not also display Tanaris. The two views share search and stay selected during the page session without writing to quest storage.

When editing locations, maintain the combined `location` description and its structured `locations` records together. If two catches have different skill requirements, keep separate source entries rather than applying one skill band to both. Missing structured locations fall back to the original description without attempting to split prose or reject otherwise valid data.
