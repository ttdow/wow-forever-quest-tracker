# Scarlet Monastery Armory map

Researched November 16, 2026. Maintained data: [scarlet-monastery-armory.json](../../data/maps/scarlet-monastery-armory.json).

The map contains **11 markers**:

| Kind | Entries |
| --- | ---: |
| Herod | 1 |
| Possible chest positions | 2 |
| Possible supply-crate positions | 6 |
| Herod's chamber door | 1 |
| Armory arrival | 1 |

Herod links the existing **In the Name of the Light (1053)** entry and the Armory Drops view. External quest givers and other wings are not projected into this map. Quest/drop records and browser completion storage are unchanged.

## Artwork and geometry

The [ForeverDB guide](https://foreverdb.net/dungeon/189-scarlet-monastery) and [structured dungeon record](https://foreverdb.net/data/dungeons/189.json), build **1.60.1.70938**, supply **Part 3**, the Armory client minimap: **506 × 1045** pixels. It covers the entrance halls, Training Grounds, Footman's Armory, and Herod's chamber. The image is stored unmodified at `assets/maps/scarlet-monastery-armory.webp`. No unrelated wing or additional floor is needed.

Static positions come from [CMaNGOS Classic-DB's Scarlet Monastery SQL](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/189_scarlet_monastery.sql), revision `09000ea8d7333856727204e4e2d30f772149b7a8`, cross-checked against the read-only November 13 Classic SQLite snapshot used for earlier maps. Source/image hashes, exact positions, and pool configuration are recorded in [sources.json](sources.json) and the map dataset.

Projection uses `originX = 2016.25`, `originY = -229.86`, and `pixelsPerYard = 2`:

```text
pixelX = (originY - worldY) × pixelsPerYard
pixelY = (originX - worldX) × pixelsPerYard
mapX = pixelX / 506 × 100
mapY = pixelY / 1045 × 100
```

All eleven markers fall within the image. Herod's exact Classic spawn projects within 0.02 percentage points of the guide's boss reference. Original world XYZ and spawn GUIDs are retained. Map percentages describe this image, not outdoor `/way` coordinates; vertical differences are not drawn as separate floors.

The entrance uses **teleport trigger 612**, destination map 189, position **1608.1, -318.919, 18.6714**. The dungeon record's default arrival belongs to Graveyard and is not reused. Herod's chamber door is **object 101854**, GUID 1890034.

## Chests and supply crates

Chest GUIDs **1890131** and **1890132** resolve through `gameobject_spawn_entry` to alternatives **75297: Large Iron Bound Chest** and **75300: Large Solid Chest**. One position has one marker listing both possible templates, rather than two claimed simultaneous chests.

Classic subpools **46097** (Training Grounds) and **46098** (Footman's Armory) each permit one active position. Their parent **46096** permits one chest overall. This describes the Classic configuration, not a guaranteed count, probability, timer, or lockpicking requirement in Forever.

The separate **Supply crates** layer contains six physical positions, GUIDs **1890133–1890138**, with alternatives **3703: Armor Crate** and **3704: Weapon Crate**. Classic pool **46099** permits two active positions among these six. These are container references, not new entries in the boss equipment tables; generic world equipment remains excluded from Drops.

## Evidence and behavior

All positions are **Classic references on Forever client artwork**, not measured Forever spawn observations. They retain `verification: classic-derived` and the map note states the limit. No chest guarantee, patrol route, trash spawn cloud, class-ineligible quest marker, or external entrance-door position is invented.

The existing map controls provide pan/zoom, Fit map, search, layers, evidence filters, coordinate copying, quest/drop links, and retries. Chest and crate layers can be toggled independently. Source labels remain optional and cannot block loading. Browser checks are left to the user.

Classic spawn data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). Blizzard artwork retains its copyright; the data license does not license the image. Assets are local static files with no live API or Node runtime required by the site.
