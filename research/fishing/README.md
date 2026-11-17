# Fishing coverage

Expanded 2026-11-14 after the user selected **usable fish and reagents, with all known locations**. The earlier representative list of 23 fish and 43 area/catch references is superseded by **30 fish, 73 water/skill groups, and 298 area/catch references across 53 listed areas**. Riverglades accounts for two unverified references; the other 52 areas have support in the inspected sources.

Both By fish and By area use this expanded dataset. Different skill bands and water types remain separate, even for the same fish in one zone. The list covers eligible catches and locations in the inspected references; it is not proof that the live Forever server has no undocumented catches.

## Scope

Included: fish eaten raw, fish with usable effects, and raw fish used as crafting reagents. Newly added species are **Oily Blackmouth, Firefin Snapper, Stonescale Eel, Lightning Eel, Sickly Looking Fish, Oil Covered Fish, and Darkshore Grouper**. Darkshore Grouper is edible, and Raw Plated Armorfish has a current Forever Cooking recipe, so they qualify despite quest associations.

Excluded: quest-only fish without a food/reagent use, tournament-only catches, trophy weights, bloated loot containers, non-fish loot, cooked products, and fish without a supported fishing source. Raw Spinefin Halibut has a current recipe, but the inspected acquisition records supply world/drop references rather than a fishing source; a recipe does not establish a catch location. Cooking recipes and cooked bonuses are now shown in the separate [Cooking view](../cooking/README.md).

## Source coverage

The current [coverage inventory](coverage.json) records every eligible Classic fishing-water row, guide fish/area pair, and named school spawn group used in the expansion. Dataset locations retain their own source links and evidence. [sources.json](sources.json) retains identities, hashes, revisions, and decisions. [audit.json](audit.json) is the historical audit of the initial 25 entries, with its incorrect area-1039 attribution removed.

- **Classic open water:** all applicable rows in `fishing_loot_template`, recursively resolved through `reference_loot_template` in the 2026-11-13 [CMaNGOS Classic database snapshot](https://github.com/cmangos/classic-db/releases/tag/latest). Direct rows and matching references establish inclusion; names in unused SQL comments alone do not.
- **Classic schools:** eligible `gameobject_loot_template` records for fishing holes, with `gameobject_template`, `spawn_group_entry`, and named `spawn_group` records resolving their waters. These include low-skill coastal Stonescale Eel Swarms in Stranglethorn, not just higher-skill open water around Jaguero Isle.
- **Full published fish-location lists:** [Warcraft Tavern fishing loot](https://www.warcrafttavern.com/wow-classic/guides/fishing-loot-list/) and [pool locations](https://www.warcrafttavern.com/wow-classic/guides/fishing-pools/). Every eligible linked fish/zone pair is retained, including guide references not present in a partial database query. These remain Classic references rather than verified Forever server loot.
- **Named geography:** [Questie's Forever area hierarchy](https://github.com/Questie/QuestieDB/blob/4dbb82440a27856f8dccf57094a5d792cdc7cc9b/support/Forever/Zones/subZoneToParentZone.lua) and [area names](https://github.com/Questie/Questie/blob/da56b36c54ca4777c1d4747bdb9c009b37560307/Localization/lookups/lookupZones.lua), pinned to revisions. A pool spot name occurring in another zone is not allowed to borrow that zone's skill base.
- **Current Forever identity and utility:** all 30 names/IDs match current Wowhead Forever tooltips. [ForeverDB's current item catalog](https://foreverdb.net/data/items.json) and [Cooking records](https://foreverdb.net/data/professions/cooking.json) distinguish raw catches, usable food, crafting reagents, trophies, and cooked products. The inspected client build is 1.60.1.70938. Item existence or a cooking recipe alone does not verify a fishing location.
- **Forever catches:** [the public fishing dataset](https://foreverdb.net/data/profguides/fishing.json) records Smallfish and Longjaw catches on **Zephras Isle**. Its skill value is absent, so both requirements remain Unverified. Public item source records also corroborate familiar catches, including Oily Blackmouth in Darkshore, Firefin Snapper in Wetlands, Oil Covered Fish in Stonetalon, and Darkshore Grouper in Darkshore. Source counts aggregate observations; they are not per-coordinate catch rates.
- **Forever guides:** [Fishing/Cooking leveling](https://www.wow-professions.com/forever/fishing-and-cooking-leveling-guide) corroborates named starter lakes, Stormwind canals, inland Dustwallow, and ordinary Feralas inland water; it labels its basis as beta data. [Whimsyfin's community guide](https://foreverchanges.pro/savory-whimsyfin-delight) supports its special freshwater pools and approximately 150 no-escape report.

CMaNGOS-derived reference data remains under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). Source-data provenance is separate from map artwork and other assets.

## Skills vary by water

The old single-band-per-fish examples were insufficient for broader coverage. Catch groups now split by minimum, no-fail reference, water type, and special catch method. Examples:

| Catch | Water | Min. / no-fail reference |
| --- | --- | --- |
| Raw Brilliant Smallfish | Starter zones such as Elwynn Forest | 1 / 25 |
| Raw Brilliant Smallfish | Capital/low-zone waters such as Stormwind | 1 / 75 |
| Raw Sagefish | Loch Modan and Silverpine schools | 1 / 75 |
| Raw Sagefish | Ashenvale, Hillsbrad, and Stonetalon schools | 55 / 150 |
| Stonescale Eel | Ordinary Stranglethorn coastal swarms | 130 / 225 |
| Raw Nightfin Snapper | Ordinary Feralas inland water | 205 / 300 |
| Raw Nightfin Snapper | Feralas: Jademir Lake | 330 / 425 |
| Raw Summer Bass | Ordinary Azshara coast | 205 / 300 |
| Raw Summer Bass | Bay of Storms, Hetaera's Clutch, Scalebeard's Cave | 330 / 425 |

Named waters use their own Classic skill base when available and otherwise inherit their named parent zone. Jaguero Isle, Jademir Lake, Bay of Storms, Hetaera's Clutch, and Scalebeard's Cave retain their higher bases. Multiple subzones sharing a name are checked against the school group's named parent rather than matched globally.

Values use effective skill including equipment/lures. The retained Classic assumption is base + 95 for no-fail, with visible minimums below 1 clamped to 1. Exact Forever thresholds are not established by these sources. [Forever Changes](https://foreverchanges.pro/professions/fishing) gives chance-only bite minima 51/126/201/326, whereas inspected [Classic success code](https://github.com/cmangos/mangos-classic/blob/master/src/game/Entities/GameObject.cpp) additionally checks `skill >= base` and the [Classic cast guide](https://www.warcrafttavern.com/wow-classic/guides/fishing-1-300/) uses 55/130/205/330. Those reference bands are retained without claiming to resolve the live server's behavior.

The Classic guide's inconsistent low-zone 1/96 grouping is not adopted. Negative database bases, ForeverDB/Forever Changes, and the Forever beta guide's 75-in-capitals statement support the retained low-zone references. Extra hard-coded Stormwind/Wailing Caverns gates in Classic cast code also disagree with the guides; emulator code is not server verification.

Seasonal dates and server-time windows remain explicitly **Classic**: Winter Squid September 23–March 19; Summer Bass March 20–September 22; Nightfin 18:00–12:00; Sunscale 06:00–00:00. Whimsyfin minimum is Unverified and no-fail is **~150**, a community report.

## Riverglades and undocumented Forever water

The public fishing dataset currently lists 44 zones and 68 recorded spots, including Zephras Isle, but no Riverglades entry. The zone registry recognizes Riverglades with insufficient known data. Published Trout and Greater Sagefish source records expose Stranglethorn locations; they are not exhaustive records of every zone and neither prove nor disprove Riverglades catches.

The two user-supplied Riverglades possibilities stay in the table with **Unverified** catches, water type, and skills. No additional fish, minimums, or freshwater classification are inferred from the zone's name. Other new Forever waters without compatible catch evidence are not populated by guessing from geography. This is the remaining limit on claiming a server-wide exhaustive list.

## Data and interface

`data/professions/fishing.json` remains the maintained source, with no conversion or runtime server required. Each row is a catch group with its own water/skill values and explicit `locations`. Location records include named area, detailed waters, source URLs, and evidence. The compact combined `location` text is for By fish; By area shows the fuller local details. Stable item IDs support the two-way Cooking links added November 16, 2026. Existing quest saves are unrelated to this data.

By fish counts unique fish and catch groups. By area lists the corresponding catches under each named zone/dungeon and scopes searches to that area's waters. Searching a named lake, school, or shore also works in By fish. Unknown source labels and optional metadata remain nonblocking; errors in Fishing do not block quests, maps, or drops.

Area **1039 is The Lost Fleet in Wetlands**, not Westfall. The initial audit's mistaken attribution was corrected using the named hierarchy. Westfall Albacore remains supported independently by the guide and a current Forever catch record.
