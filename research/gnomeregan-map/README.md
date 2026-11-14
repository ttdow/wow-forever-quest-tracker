# Gnomeregan map research

Researched November 14, 2026. The maintained map dataset is [data/maps/gnomeregan.json](../../data/maps/gnomeregan.json). Existing quest/drop records and completion storage are unchanged.

## Coverage

The map has **38 location entries**:

| Kind | Entries |
| --- | ---: |
| Possible chest positions | 6 |
| Bosses: Grubbis, Viscous Fallout, Electrocutioner 6000, Crowd Pummeler 9-60, Mekgineer Thermaplugg | 5 |
| Dark Iron Ambassador, rare | 1 |
| Kernobee pickup positions, all for the same NPC | 10 |
| Blastmaster Emi Shortfuse | 1 |
| Sparklematics and Matrix Punchographs B/C/D | 14 |
| Arrival point inside the instance | 1 |
| Total | 38 |

These are **Classic reference positions**, not verified Forever spawn observations. The backgrounds are from the Forever client, build 1.60.1.70938. This distinction is preserved in every point's evidence metadata and shown on the map.

## Sources and chest discovery

- [ForeverDB Gnomeregan guide](https://foreverdb.net/dungeon/90-gnomeregan) and [structured dungeon data](https://foreverdb.net/data/dungeons/90.json) supply the two client minimap sections, projection parameters, four boss-section references, and instance arrival point.
- [CMaNGOS Classic-DB's Gnomeregan SQL](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/090_gnomeregan.sql), revision `09000ea8d7333856727204e4e2d30f772149b7a8`, contains the raw object/creature coordinates, alternative spawn entries, and chest pools.
- The original [Classic SQLite snapshot](https://github.com/cmangos/classic-db/releases/tag/latest), release published November 13, 2026, was queried read-only to retain exact coordinates and object/quest relationships. Its database and archive hashes are in [sources.json](sources.json). The database/archive are research inputs and are not shipped with the website.
- The [Classic Grubbis event script](https://github.com/cmangos/mangos-classic/blob/master/src/game/AI/ScriptDevAI/scripts/eastern_kingdoms/gnomeregan/gnomeregan.cpp) supplies the actual summoned boss position: `-476.3761, -108.1901, -145.7763`. The inspected script's SHA-256 is recorded in the source inventory. Grubbis is labeled as summoned, rather than a permanently present NPC.
- Questie Classic object records and Wowhead's accessible Classic zone page corroborate object IDs 74447 and 74448 in Gnomeregan. The full Forever object pages returned 403 Forbidden. WoW Forever Friends provided useful NPC and quest-object cross-checks, but its chest pages were absent.

The chest rows in `gameobject` have **ID 0**, so a simple join to an object template misses them. Joining through `gameobject_spawn_entry` resolves both alternatives at each of GUIDs 900099–900104:

- **74447: Large Iron Bound Chest**.
- **74448: Large Solid Chest**.

The app uses one marker per physical chest position, with both object IDs and names in its popup. These are six positions, not twelve independently present chests. The Classic pools are 45791, 45792, and 45793, each with a maximum of one active member. Those configuration limits do not establish Forever spawn counts, rates, timers, or lockpicking requirements. No unverified numerical lockpicking requirement or loot probability is displayed.

## Map sections and coordinates

The two source images are stitched client minimap layouts. They are shown as **Main layout** and **Upper platforms**, not claimed to be the game's four named dungeon floors. Some passages and rooms overlap in projection.

- Main layout: 1892 × 1520 pixels; 26 entries.
- Upper platforms: 1423 × 1211 pixels; 12 entries.

For each image, ForeverDB provides a world-space origin and scale. Positions are calculated from exact Classic world coordinates:

```text
pixelX = (originY - worldY) * pixelsPerYard
pixelY = (originX - worldX) * pixelsPerYard
mapX = pixelX / imageWidth * 100
mapY = pixelY / imageHeight * 100
```

All original world XYZ values are retained. The displayed percentages are relative to the selected image, not outdoor zone coordinates or an assertion that an addon accepts them as dungeon `/way` coordinates.

Published ForeverDB section assignments are retained for its four boss markers and entrance. Other assignments use the client layouts, source world elevation, and the named Classic areas; they are marked `client-layout` in the data. Every projected point was checked against visible image geometry. Section placement remains a derived reference, not an in-game Forever observation.

Hall of Gears and Engineering Labs chest positions on upper surfaces use Upper platforms; the three Dormitory chest positions use Main layout. Matrix Punchographs B/C use Upper platforms; D and the three Sparklematics use Main layout. The distinct Sparklematic object IDs retain their own start/turn-in quest relationships, including the relevant ring and repeatable steps already in the tracker.

## Limits and exclusions

- Kernobee has ten reference pickup positions in the Classic snapshot. These are alternatives for one NPC, not ten guaranteed NPCs or an escort route.
- Dark Iron Ambassador's rare reference point does not establish a full patrol route or Forever spawn chance.
- Techbot and Matrix Punchograph A are outside the instance portal, in Dun Morogh's entrance tunnels, and are not placed on the interior map.
- Quest givers in Ironforge, Stormwind, and Darnassus are not incorrectly pinned inside Gnomeregan.
- Thermaplugg's Safe belongs to the Horde-only Rig Wars quest and is excluded from this Alliance/Rogue-oriented map.
- Ordinary trash mobs, food crates, barrels, and generic world loot are excluded. The 93 Artificial Extrapolator rows are also outside this initial map's scope; their many overlapping elevations need a separate placement audit before they are offered as pickup markers.
- The layout does not invent routes, stairs, live NPC positions, chest timers, or missing source coordinates.

The map provides section selection, search across sections, layer toggles, source/evidence labels, coordinates, quest links, and links from bosses to the dungeon's Drops view. Search results in another section are surfaced as a button. Each zone and section retains its own viewport during the current page session. Loading errors, unavailable sources, and optional source labels are isolated from the quest/drop data.

Classic reference data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). The background images are Blizzard game artwork with Blizzard/ForeverDB attribution; the data license does not license the artwork. No application server, Node runtime, external map service, API key, or live scraping is needed to use the site.
