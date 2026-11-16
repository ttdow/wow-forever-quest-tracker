# Feralas map

Researched November 16, 2026. Maintained data: [feralas.json](../../data/maps/feralas.json).

The map has **32 entries in 27 selectable markers**:

| Layer | Entries |
| --- | ---: |
| Quest givers | 17 |
| Quest objects, including Shay's quest chest | 6 |
| Rare NPC references | 9 |
| Random treasure chest positions established | 0 |

It links the existing Alliance/shared Feralas quests. Foreign quest starters remain in their actual zones; Horde-only and non-Rogue class quest markers are not added. Existing quest/drop data and completion storage are unchanged.

## Background and coordinates

The [ForeverDB Feralas map](https://foreverdb.net/maps/1444), [map metadata](https://foreverdb.net/data/maps/index.json), and [client boundaries](https://foreverdb.net/data/maps/zones.json) provide the unmodified local image, **1002 × 668** pixels. Feralas is **UI map 1444 / area 357**. The image is stored at `assets/maps/feralas.webp`; its hash and source snapshots are in [sources.json](sources.json).

World bounds are **[-7000.0, -1508.3, -2366.7, 5441.7]**, in `[Xmin, Ymin, Xmax, Ymax]` order:

```text
zoneX = 100 × (Ymax - worldY) / (Ymax - Ymin)
zoneY = 100 × (Xmax - worldX) / (Xmax - Xmin)
pixelX = zoneX / 100 × 1002
pixelY = zoneY / 100 × 668
```

Coordinates describe this image. Original world coordinates are retained where supplied. Treasure candidates were additionally checked against the client's **terrain polygons and holes**, using its documented world-to-plane transform; a point inside the rectangle alone is not sufficient to assign it to Feralas.

## Quest locations

The [quest-giver layer](https://foreverdb.net/data/maps/layer-questgivers.json) supplies 15 local NPC references matching existing quest starts, plus these five quest-start objects:

- Solarsal Gazebo → Return to Feathermoon Stronghold (2867).
- Equinex Monolith → The Morrow Stone (2942).
- Wrecked Row Boat → Boat Wreckage (4127).
- Large Leather Backpacks → The Writhing Deep (4135).
- Zukk'ash Pod → Freed from the Hive (4265).

Those positions are labeled **Classic references** by the source, not measured Forever locations. Marli Wishrunner's omitted To the Top (3567) pickup is supplemented from [Questie's baseline Feralas NPC record](https://github.com/Questie/QuestieDB/blob/c0718536287f809b5bd2689cbd020435d5601061/data/Forever/foreverNpcDB.lua): **45.82, 16.47**.

**Kristy Grant** is separately corroborated by the current [Pristine Pesterhide Pelts](https://foreverchanges.pro/quest/98155/pristine-pesterhide-pelts) and [Packaged Pristine Pelts](https://foreverchanges.pro/quest/98156/packaged-pristine-pelts) pages. Both explicitly place her in **Feralas at 89.3, 46.2**, despite an older generated Thousand Needles quest category. Only this position uses `forever-confirmed`. Existing quest records retain their older rounded coordinate reference; this map does not rewrite their levels or other fields.

The Homing Robot marker links both the Find OOX-22/FE! turn-in and the escort pickup. Pratt also links the Pristine Yeti Hide turn-in. These links do not turn the NPCs into starters for their respective item-started quests. No fixed distress-beacon, undelivered-parcel, or pristine-hide drop point is invented.

**Shay's Chest (144054)** is a specific quest chest beside Shay Leafrunner. The read-only November 13 CMaNGOS snapshot confirms its position and loot item **Shay's Bell (9189)**, used for Wandering Shay (2845). It belongs in Quest objects, not random chest spawns. The snapshot hash is recorded in the source inventory.

## Shared markers

Four nearby groups use the existing multi-entry popup so overlapping icons do not conceal selectable entries:

- Shandris Feathermoon and Latronicus Moonspear.
- Troyas Moonbreeze, Ginro Hearthkindle, and Angelas Moonbreeze.
- Kindal and Jer'kai Moonweaver.
- Shay Leafrunner and Shay's Chest.

Each group displays at its approximate mean position. Every member retains its own `sourceCoordinates`, and the popup note states that original reference coordinate. Group members are all less than 0.5 percentage points from the shared marker on both axes. The shared coordinate and distinctive approximate styling are not presented as a new measured NPC position. Names, IDs, and quest links remain separate entries.

## Rares and chest limits

The [rare layer](https://foreverdb.net/data/maps/layer-rares.json) supplies **Snarler, Old Grizzlegut, Gnarl Leafbrother, Diamond Head, Lady Szallah, Qirot, Antilus the Soarer, Bloodroar the Stalker, and Arash-ethis**. Its coordinates explicitly remain Classic references. An NPC being seen in Forever does not confirm the inherited position. No patrol range or spawn guarantee is inferred.

The checked [Classic chest layer](https://theforeverera.com/data/map-layers/k.json?v=20261108113959) has no Feralas rows. The read-only Classic snapshot's rectangle candidates fall outside the client's Feralas terrain, except for the identified Shay quest chest. Pooled object alternatives were also checked; the Feralas references there are resource/fishing nodes rather than supported random treasure chest positions. These findings are **not proof that no chest can spawn in Forever**. No speculative random chest pin, loot table, probability, timer, or lockpicking requirement is added.

The map uses the existing pan/zoom, Fit map, layers, evidence filter, search, coordinate copying, and quest links. Item-drop clouds, ordinary mob targets, services, and patrol/escort routes are outside this map's scope. Source labels remain optional and cannot block loading. Browser checks are left to the user.

Classic reference locations are CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). Blizzard artwork retains its copyright; the data license does not license the map image. All assets are local static files; no Node runtime or live API is required by the site.
