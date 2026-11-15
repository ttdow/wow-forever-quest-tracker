# Fishing research

Researched 2026-11-14. The initial table contains 25 catch entries for 23 fish, based on the user's supplied list. Cooking recipes and cooked-food bonuses are explicitly deferred to a future Cooking section.

## Sources and limits

- [ForeverDB Fishing](https://foreverdb.net/profession/fishing) and [Forever Changes Fishing](https://foreverchanges.pro/professions/fishing) provide current community references.
- Current Wowhead Forever item tooltips confirm all 23 fish names and item IDs. Individual URLs are recorded in [sources.json](sources.json). Item identity does not establish catch locations or required skill.
- Classic catch tables, school locations, and skill bands were checked against the 2026-11-13 CMaNGOS Classic database snapshot used for the existing map research. Its SHA-256 and queried tables are recorded in the source inventory. [CMaNGOS Classic DB](https://github.com/cmangos/classic-db) is licensed under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt).
- [The Whimsyfin community guide](https://foreverchanges.pro/savory-whimsyfin-delight) supplies the specific pool location and an approximate no-escape report.

These are representative catch locations, not exhaustive zone lists. Classic-derived locations and thresholds remain references rather than measured Forever server behavior. Riverglades catches supplied by the user have not been independently corroborated; both rows retain `null` skill values and display **Unverified**. Source and evidence labels are optional metadata and never block valid table rows from loading.

## Skill values

The table retains the common Classic bands from the supplied list: minimum 1, 55, 130, 205, or 330 and no-fail 25, 75, 150, 225, 300, or 425. Values refer to effective skill including equipment and lures. They describe the listed water rather than an intrinsic requirement of each fish.

The Classic database stores bases including -70, -20, 55, 130, 205, and 330. The usual no-fail reference is base + 95; minimums below 1 are shown as 1. The [inspected catch code](https://github.com/cmangos/mangos-classic/blob/master/src/game/Entities/GameObject.cpp) also checks `skill >= zone base` before applying `skill - base + 5 >= roll`. Consequently a chance-only interpretation giving minimums 51/126/201/326 is not adopted as established fact.

The [Classic cast code](https://github.com/cmangos/mangos-classic/blob/master/src/game/Spells/Spell.cpp) contains additional hard-coded location gates, including Stormwind and Wailing Caverns, which disagree with some broader community references. The supplied 1/75 references for those locations are retained; neither emulator implementation is asserted to reproduce Forever's server. The on-page note explicitly identifies the table's skills as Classic references.

Whimsyfin keeps the Classic Redridge minimum reference of 55. Its no-fail value displays **~150**, reflecting a community report rather than an exact established threshold. Riverglades minimum and no-fail values remain unverified.

## Changes to the supplied examples

- Raw Longjaw Mud Snapper retains Stormwind City; the Loch Modan example was not corroborated in the audited catch reference and is omitted.
- Raw Sagefish uses corroborated Sagefish Schools in Ashenvale and Hillsbrad Foothills in place of the Wetlands example. Raw Greater Sagefish includes Greater Sagefish Schools in Alterac Mountains and Stranglethorn Vale. School groups were checked as well as direct object spawns.
- Whimsyfin pools are described as the river south of Stonewatch Keep, east of Lake Everstill. This does not claim the main lake itself has Whimsyfin pools.
- Coastal catches name the coast, including Feralas' Forgotten Coast. Redgill, Nightfin, and Sunscale examples use Felwood and Moonglade rather than an unqualified Feralas location with differing inland/coastal loot tables.
- Nightfin and Sunscale say night/day **favored**, allowing the dawn/dusk overlap. Winter Squid and Summer Bass retain their Classic seasonal qualifiers.
- High-skill Azshara catches specify Bay of Storms; its subzone records must not be confused with default coastal water.

## Maintenance

`data/professions/fishing.json` is the maintained source. It loads on demand independently of quests, drops, maps, and completion storage. Each row has a stable row ID, numeric-string item ID, name, location, and nullable numeric minimum/no-fail skill. Two fish have separate Riverglades rows. Item IDs can support later links to Cooking without introducing recipes or bonuses into this version.

Optional `verification`, `sources`, `evidence`, `notes`, and `noFailApproximate` fields document uncertainty. Research hashes and identity links are retained in [sources.json](sources.json); no CSV conversion or server runtime is required.
