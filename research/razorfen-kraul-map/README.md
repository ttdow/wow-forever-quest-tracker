# Razorfen Kraul map research

Researched November 14, 2026. The maintained dataset is [data/maps/razorfen-kraul.json](../../data/maps/razorfen-kraul.json).

## Coverage

The map has **87 location entries**:

| Kind | Entries |
| --- | ---: |
| Roogug, Aggem Thorncurse, Death Speaker Jargba, Overlord Ramtusk, Agathelos the Raging, Charlga Razorflank | 6 |
| Blind Hunter and Earthcaller Halmgar, rares | 2 |
| Possible chest positions | 7 |
| Willix the Importer and Heralath Fallowbrook | 2 |
| Hidden Blueleaf Tuber positions | 69 |
| Arrival point inside the instance | 1 |
| Total | 87 |

These are **Classic reference positions projected onto a Forever client minimap**, not measured Forever spawn observations. Each point has `verification: classic-derived` and retains its original world position and source. Eighteen entries are visible initially. Quest objects starts off for this map; enabling it adds the 69 tuber positions. Nearby objects with identical rounded map coordinates share a popup, so marker counts can be lower than entry counts.

## Sources and geometry

- [ForeverDB dungeon guide](https://foreverdb.net/dungeon/47-razorfen-kraul) and [structured dungeon record](https://foreverdb.net/data/dungeons/47.json), client build **1.60.1.70938**, supply the local minimap image, image-space projection, six corroborating boss locations, and Classic arrival point.
- [CMaNGOS Classic-DB's Razorfen Kraul SQL](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/047_razorfen_kraul.sql), revision `09000ea8d7333856727204e4e2d30f772149b7a8`, supplies exact spawn positions and chest-group configuration.
- The [Classic SQLite snapshot](https://github.com/cmangos/classic-db/releases/tag/latest), released November 13, 2026, was queried using a read-only URI. Its SHA-256 matches the snapshot used for the Gnomeregan research. The database and archive are research inputs, not website assets.
- The [Classic Snufflenose Gopher script](https://github.com/cmangos/mangos-classic/blob/master/src/game/AI/ScriptDevAI/scripts/kalimdor/razorfen_kraul/razorfen_kraul.cpp) corroborates which objects are hidden tubers and how the gopher uncovers them. The inspected script's hash is recorded in [sources.json](sources.json).

Only **Part 1** is used: **1512 × 777** pixels, stored unmodified as `assets/maps/razorfen-kraul.webp`. ForeverDB places all six ordinary boss references and the arrival point on this image. Its second image is a canopy surface that obscures the playable paths; it is not presented as another dungeon floor.

Projection parameters are `originX = 2287.13`, `originY = 2090.93`, and `pixelsPerYard = 2`. Each point is calculated from its exact Classic world XY:

```text
pixelX = (originY - worldY) * pixelsPerYard
pixelY = (originX - worldX) * pixelsPerYard
mapX = pixelX / 1512 * 100
mapY = pixelY / 777 * 100
```

All projected points lie inside the image bounds. The original Z values remain in the data because passages overlap in this top-down view. Percentages apply to this image, not outdoor zone or dungeon `/way` coordinates. Rare positions do not establish patrol ranges. Willix's marker is his escort pickup, not an escort path.

## Chests

The seven physical spawn GUIDs are **4700150–4700153** and **4700160–4700162**. Their `gameobject.id` is zero, and this instance resolves alternatives through **`spawn_group_spawn` → `spawn_group_entry`**, rather than `gameobject_spawn_entry`. A direct join to object templates therefore misses these chest positions.

Each location can use **74447: Large Iron Bound Chest** or **74448: Large Solid Chest**. Both names and IDs appear in one popup per position, not as 14 separate chests. Classic spawn groups 4700004 and 4700005 have maximum active counts of one each. This configuration is retained as research metadata; it does not establish Forever spawn counts, probabilities, respawn timers, or lockpicking requirements.

## Blueleaf Tubers and quest links

The optional Quest objects layer contains **69 object-20920 Blueleaf Tuber positions**. The gopher script finds hidden objects of this exact ID, moves to a suitable one, refreshes it, and removes its interaction restriction. The older 19 rows named **Tuber Node (20919)** are not substituted for these pickups. No herbs, old trigger nodes, or ordinary scenery are mapped.

Each tuber popup explains the Crate with Holes / Snufflenose Command Stick process and links **Blueleaf Tubers (1221)**. Multiple reference rows at nearby positions or elevations are preserved without claiming that all pickups are active together in Forever. Defaulting this layer off avoids crowding the initial boss/chest view; its checkbox shows the available entry count.

Willix links **Willix the Importer (1144)**, Heralath links **Mortality Wanes (1142)**, and Charlga links **The Crone of the Kraul (1101)** for Razorflank's Medallion. All eight bosses/rares link to the existing dungeon Drops view. External quest givers in Ratchet, Feralas, or Thousand Needles are not projected into the instance. Warrior-only Fire Hardened Mail, Horde-only objectives, ordinary trash, herbs, and generic loot are excluded.

The map provides pan/zoom, Fit map, search, layer/evidence filters, coordinate copying, quest/drop links, and retry after data/image failures. Source metadata stays optional. Existing quests, drops, other map datasets, and the browser completion-storage key are unchanged.

Classic spawn data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). The background is Blizzard client artwork via ForeverDB; the data license does not license the artwork. All website assets are local static files, with no Node runtime or live API required.
