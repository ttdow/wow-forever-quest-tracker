# Razorfen Downs map

Researched November 15, 2026. Maintained data: [razorfen-downs.json](../../data/maps/razorfen-downs.json).

The map has **13 location entries**:

| Kind | Entries |
| --- | ---: |
| Tuten'kash, Plaguemaw the Rotting, Mordresh Fire Eye, Glutton, Amnennar the Coldbringer | 5 |
| Ragglesnout, rare | 1 |
| Possible chest positions | 5 |
| Belnistrasz, escort pickup | 1 |
| Instance arrival | 1 |

All six boss/rare markers link to the existing Drops view. Belnistrasz links to Scourge of the Downs (3523) and Extinguishing the Idol (3525); Plaguemaw links to the latter's ritual event. Amnennar links to Bring the Light (3636) and The Coldbringer's Eye (96773). Existing quest/drop records and saved progress are unchanged.

## Layout and projection

The [ForeverDB dungeon guide](https://foreverdb.net/dungeon/129-razorfen-downs) and [structured record](https://foreverdb.net/data/dungeons/129.json), build **1.60.1.70938**, provide the client artwork, projection, four comparison boss spots, and arrival reference. Only **Part 1**, the playable interior, is used: **1199 × 871** pixels, stored unmodified as `assets/maps/razorfen-downs.webp`. Part 2 is an overhead thorn canopy obscuring the paths, not a separate playable floor.

Exact static positions are corroborated by [CMaNGOS Classic-DB's instance SQL](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/129_razorfen_downs.sql), revision `09000ea8d7333856727204e4e2d30f772149b7a8`, and the read-only November 13 Classic SQLite snapshot used for the earlier maps. Its SHA-256, source/image hashes, chest pools, and comparison positions are in [sources.json](sources.json).

Projection uses `originX = 2658.24`, `originY = 1181.73`, and `pixelsPerYard = 2`:

```text
pixelX = (originY - worldY) × pixelsPerYard
pixelY = (originX - worldX) × pixelsPerYard
mapX = pixelX / 1199 × 100
mapY = pixelY / 871 × 100
```

All markers lie inside the image. Mordresh, Ragglesnout, Glutton, and Amnennar agree with the guide's reference pins within 0.02 percentage points. Original world XYZ and applicable spawn GUIDs are retained. Percentages describe this image, not outdoor `/way` coordinates. Overlapping elevations and Glutton's movement do not establish a route or patrol boundary.

The arrival uses teleport trigger **442**, destination map 129, world position **2593.68, 1111.23, 50.9518**.

## Event bosses

Tuten'kash and Plaguemaw are summoned encounters, not ordinary fixed creature spawns. Their markers have `approximate: true`, distinct styling, and explicit explanations.

- **Tuten'kash:** the marker identifies **Gong (148917)** at **2552.44, 856.984, 51.495**. The [gong instance script](https://github.com/cmangos/mangos-classic/blob/d8eec6e2b9b00ae116b1746338dc1f86be213190/src/game/AI/ScriptDevAI/scripts/kalimdor/razorfen_downs/instance_razorfen_downs.cpp) and [wave definitions](https://github.com/cmangos/mangos-classic/blob/d8eec6e2b9b00ae116b1746338dc1f86be213190/src/game/AI/ScriptDevAI/scripts/kalimdor/razorfen_downs/razorfen_downs.h) summon eight Tomb Fiends, four Tomb Reavers, and then Tuten'kash. Summons move toward the gong. The pin is an encounter reference, not a claimed fixed boss spawn.
- **Plaguemaw:** the [Belnistrasz script](https://github.com/cmangos/mangos-classic/blob/d8eec6e2b9b00ae116b1746338dc1f86be213190/src/game/AI/ScriptDevAI/scripts/kalimdor/razorfen_downs/razorfen_downs.cpp) summons the boss late in the ritual from one of three spawner positions. The marker is their approximate center. All three source positions remain in `eventSpawnPositions`; the center is not mislabeled as an actual spawn point.

The three Plaguemaw reference positions are **2582.79, 954.392, 52.4821**; **2569.42, 956.380, 52.2732**; and **2570.62, 942.393, 53.7433**. The derived marker uses their centroid, **2574.2767, 951.0550, 52.8329**. Belnistrasz's separate marker is his pickup at **2610.66, 730.583, 54.6521**, not his ritual location. No escort path is drawn.

## Chests

Five physical positions, GUIDs **1290075–1290078** and **1290081**, resolve through `gameobject_spawn_entry`. Each has two template alternatives: **75297: Large Iron Bound Chest** and **75300: Large Solid Chest**. Alternatives are grouped in one popup per position, not ten separate chests.

Classic pool **45991** permits one active position among the four Spiral of Thorns references. Pool **45992** permits one at the Murder Pens reference. This documents Classic configuration only; no Forever spawn guarantee, probability, respawn time, or lockpicking requirement is inferred.

## Scope and behavior

These are **Classic reference locations on Forever client artwork**, not measured Forever spawn observations. Rare Ragglesnout is optional. Ambassador Bloodrage is outside on the approach and remains available in Drops; he is not projected onto the interior map. Myriam Moonsinger and the other outdoor quest givers likewise stay outside it. No exact pickup source is established for the Forever Agamaggan's Blood objective, so no speculative pin is added. Ordinary trash, herbs, fire scenery, and faction/class-ineligible quest markers are omitted.

The map uses the existing pan/zoom, Fit map, layer/evidence filters, search, coordinate copying, quest/drop links, and retry controls. Source labels remain optional and cannot block loading. All images and JSON are local static assets, with no live API or Node runtime. Browser checks are left to the user.

Classic spawn/event references are CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt); source file licenses remain as stated in their headers. Blizzard client artwork retains its copyright; the data license does not license the artwork.
