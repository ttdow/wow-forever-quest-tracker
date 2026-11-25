# Winterspring map

Open **Zones → Winterspring → Map**, or use the [direct map link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=Winterspring&view=map). The existing **95-quest checklist is unchanged**. The map has **59 entries in 43 selectable markers**, linking **87 tracked quests** through local pickups, hand-ins, and supported objectives. [Quest coverage](../winterspring/README.md) · [Map data](../../data/maps/winterspring.json)

The unmodified Blizzard client background is stored locally at `assets/maps/winterspring.webp`, **1002 × 668**, from [ForeverDB](https://foreverdb.net/maps/1452). Winterspring is **UI map 1452 / area 618**. Pan, zoom, search, evidence filters, layer controls, coordinate copying, and quest navigation use the existing renderer.

## Quest and NPC locations

- **29 quest-giver entries** include Donova, Salfa, Rivern, Nami, Innkeeper Vizzie, the Everlook crafting NPCs, the two seasonal elders, and the tracked Forever quest givers. **Seven quest objects** cover Jaron's Wagon, Damaged Crate, Malyfous's Catalogue, and the four separate Highborne Relic Fragments. High Chief Winterfall has an additional NPC reference for his kill quest and the dropped log that starts The Final Piece.
- Crowded Everlook entries share north, south, and east hub pins; Wynd and Jaron share a Starfall Village pin. Each retains its individual source coordinate in the popup. These grouped display positions are explicitly approximate.
- Incoming quests link at their **Winterspring hand-in**, including the Nami/Red Bag, postal, Donova, Ranshalla, Haleh, and Kel'Theril routes. Pickups outside Winterspring retain their original locations in the checklist. No outside quest giver is projected into this map.
- **Nami** has a player-recorded Winterspring position at **61.33, 36.92**. **Thera Duskwhisper** has a recorded position at **52.93, 40.40** in [Questie's current NPC traces](https://github.com/Questie/QuestieDB/blob/498734b13f1ed25931566298f6ca119ad058c17f/src/corrections/Forever/traces/foreverNpcTraces.lua). Thera's presence does not establish availability of Secret of the Barrow Deeps: that quest and Umbranse's delivery retain their existing unverified-availability qualification.

Other pickup coordinates remain references from the existing curated quest records. A current quest identity does not by itself prove a newly measured NPC coordinate. Eight checklist entries remain without a pin: outside-only steps or quests whose materials, ritual, or item drop do not establish a supported single location. [Coverage inventory](sources.json)

## Rares and treasure

**Nine Classic spawn positions for seven rares** include three distinct General Colbatann sites. They are reference points, not asserted patrol routes or verified live Forever spawns. [Rare layer](https://foreverdb.net/data/maps/layer-rares.json)

**Chest spawns is off by default.** Enabling it reveals **13 possible Solid Chest (153454) positions**. Twelve match the [Classic chest layer](https://theforeverera.com/data/map-layers/k.json); one additional position exists in the read-only Classic snapshot. That extra candidate has a dashed marker and is controlled by the existing evidence filters. Presence, respawn conditions, and live Forever availability remain unverified.

All **48** chest/footlocker records inside the rectangular map bounds were checked against the client's actual **Winterspring terrain polygons and holes**. Only the 13 Solid Chest positions belong to Winterspring; 35 rectangle-only candidates are rejected. Nearby Azshara chests and Mossy Footlockers are not transplanted into Winterspring. Quest objects and Mau'ari's quest are not mislabeled as random treasure chests.

World coordinates use the client's region `[3800.0, -7416.7, 8533.3, -316.7]` in `[Xmin, Ymin, Xmax, Ymax]` order:

```text
zoneX = 100 × (Ymax - worldY) / (Ymax - Ymin)
zoneY = 100 × (Xmax - worldX) / (Xmax - Xmin)
```

Terrain ownership uses the documented Kalimdor world-to-plane transform and polygon membership, rather than rectangle membership alone. Original world coordinates are retained for Classic chest, fragment, rare, and chief positions.

## Sources and preservation

[sources.json](sources.json) records source URLs, the exact Questie revision, image/file hashes, client bounds/terrain data, source fetch results, linked/unmapped quest IDs, the inspected Classic snapshot identity, and all rejected chest candidates. Classic location data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt); Blizzard artwork retains its copyright. Source/evidence labels remain optional and cannot block map loading.

This change uses the updated repository's existing Winterspring zone. It does not add a second zone or alter quest, drop, profession, existing map data, or saved completion IDs. Hosting remains static, with no runtime CDN, build, or API key requirement.
