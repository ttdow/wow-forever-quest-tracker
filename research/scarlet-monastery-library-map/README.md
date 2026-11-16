# Scarlet Monastery Library map

Researched November 15, 2026. Maintained data: [scarlet-monastery-library.json](../../data/maps/scarlet-monastery-library.json).

The Library map has **nine markers**:

| Kind | Markers |
| --- | ---: |
| Houndmaster Loksey and Arcanist Doan | 2 |
| Possible chest positions | 4 |
| Doan's Strongbox | 1 |
| Mythology of the Titans quest book | 1 |
| Library entrance arrival | 1 |

Both bosses link to the existing Library Drops view. Loksey links to In the Name of the Light (1053); the book links to Mythology of the Titans (1050). Past Due (96800) names Doan as the book's borrower but does not establish an exact pickup location or drop source, so no speculative marker is added for it. External quest givers, Horde-only Compendium of the Fallen, Mage-only Rituals of Power, herbs, ordinary trash, scenery, and other wings are excluded.

## Map and placement

The [ForeverDB dungeon record](https://foreverdb.net/data/dungeons/189.json) and [Scarlet Monastery guide](https://foreverdb.net/dungeon/189-scarlet-monastery), build **1.60.1.70938**, supply the client minimap and projection. Only **Part 2**, the Library, is used: **736 × 453** pixels. The image is stored unmodified at `assets/maps/scarlet-monastery-library.webp`. Parts 1, 3, and 4 cover other wings, not additional Library floors.

Exact world positions come from [CMaNGOS Classic-DB's Scarlet Monastery SQL](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/189_scarlet_monastery.sql) at revision `09000ea8d7333856727204e4e2d30f772149b7a8`, cross-checked against the read-only November 13 Classic SQLite snapshot used for the earlier dungeon maps. The snapshot's SHA-256, image/SQL hashes, comparison boss positions, and chest pools are recorded in [sources.json](sources.json).

Projection uses `originX = 313.88`, `originY = -108.27`, and `pixelsPerYard = 2`:

```text
pixelX = (originY - worldY) * pixelsPerYard
pixelY = (originX - worldX) * pixelsPerYard
mapX = pixelX / 736 * 100
mapY = pixelY / 453 * 100
```

All nine markers lie inside the image bounds. Both boss positions agree with the guide's Library boss pins within 0.02 percentage points. Percentages describe this image, not outdoor `/way` coordinates. Original world XYZ values are retained.

The dungeon-wide default arrival in ForeverDB is the **Graveyard** entrance and cannot be reused for this wing. The Library marker instead uses **areatrigger 614**, destination map 189, position **253.672, -206.624, 18.6773**.

## Chests and quest book

Four physical chest positions, GUIDs **1890121–1890124**, are resolved through `gameobject_spawn_entry`. Each can use **75296: Large Iron Bound Chest** or **75299: Large Solid Chest**. Alternatives appear in one popup per position, not as eight separate chests. Classic pools 46094 and 46095 each have maximum active count one; their parent Library pool allows two. This documents the Classic configuration, not guaranteed Forever spawn counts, probabilities, timers, or lockpicking requirements.

**Doan's Strongbox (103821)** has a fixed position in Doan's room. The Classic object's loot table 4668 contains **The Scarlet Key (7146)**. Its popup labels those contents as a Classic reference; no independent Forever content claim is made.

**Mythology of the Titans (19284)** is the quest-book object. Its Classic loot table 3064 supplies item 5536 for the existing quest. It is distinct from unrelated readable books, Mage quest objects, and Horde quest pickups.

## Behavior and evidence

This uses the existing map view: pan/zoom, Fit map, layer/evidence filters, search, coordinate copying, quest/drop links, and retry after data/image failures. Source labels remain optional and cannot block loading. Existing quests, drops, maps, and browser completion storage are unchanged.

These are **Classic reference positions on Forever client artwork**, not measured Forever spawn observations. The map note states this explicitly. No patrol route, full run route, or unverified Forever object position is invented.

Classic spawn data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). Blizzard client artwork retains its copyright; the data license does not license the artwork. Assets are local static files with no live API or Node dependency.
