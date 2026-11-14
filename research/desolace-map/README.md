# Desolace map research

Research date: November 13, 2026. The original research snapshot is preserved here. The implemented Desolace Map view uses the maintained dataset at `data/maps/desolace.json`; existing quest/drop records and completion storage are unchanged.

## Findings

An initial map can be populated with real reference coordinates. However, none of the obtained chest positions is supported by a Forever-specific position observation. They must be presented as Classic references, not confirmed live Forever spawns.

| Object | ID | Candidate points | Present in other checked coordinate sets | Classic lockpicking requirement |
| --- | --- | ---: | ---: | --- |
| Solid Chest, guide variant H | 2855 | 12 | 10 | Not established |
| Solid Chest, guide variant C | 2857 | 16 | 15 | Not established |
| Waterlogged Footlocker | 179491 | 7 | 7 | 150 |
| Mossy Footlocker | 179493 | 3 | 3 | 175 |
| Total | | 38 | 35 | |

The 28 Solid Chest points and 10 footlocker points are stored individually in [locations.json](locations.json), with object IDs, zone coordinates, original world XYZ, evidence classification, and source references. No coordinates were estimated from screenshots. The C/H letters come from Warcraft Tavern's guide; object IDs remain the actual identity.

Thirty-five points match The Forever Era's Classic-derived map layer and Questie's Classic coordinates. The additional Classic snapshot supplies three more:

- Solid Chest 2855: 75.52, 26.42.
- Solid Chest 2855: 71.73, 50.25.
- Solid Chest 2857: 69.52, 78.54.

These three points are absent from the other coordinate sets. All three fall inside the current client's Desolace terrain polygon and outside Shen'dralas's terrain polygon. This verifies their map placement, not their presence in Forever. They are retained as `additional-snapshot-only` candidates, rather than silently discarded or promoted to corroborated spawns.

The sources often share CMaNGOS ancestry. Agreement between those sites is not independent in-game verification. There is no evidence that all candidate chests can be active simultaneously.

## Map background and coordinates

ForeverDB exposes a fully explored, labeled Desolace map with roads and landmarks, measuring 1002 by 668 pixels and about 122 KB:

- [Map image](https://foreverdb.net/img/maps/game/1443.webp).
- [Client map-image metadata](https://foreverdb.net/data/maps/index.json).
- [Client zone bounds and terrain polygons](https://foreverdb.net/data/maps/zones.json).

Desolace is UI map **1443**, area **405**. Questie uses area IDs for object coordinates; these are different identifier systems. The current data also identifies Shen'dralas separately as UI map 2652 / area 16651. Their rectangular map extents overlap, so a rectangular bounds check alone must not be treated as proof that a point belongs to a particular terrain zone.

The Forever Era's available Desolace image is the same size but visually unexplored, omitting most labels and roads. The fully explored ForeverDB image is the stronger background candidate.

Coordinate mapping for a single image is straightforward:

```text
pixelX = zoneX / 100 * imageWidth
pixelY = zoneY / 100 * imageHeight
Leaflet CRS.Simple position = [-pixelY, pixelX]
```

Classic world XYZ points were converted using the current client Desolace region `[-2545.8, -262.5, 452.1, 4233.3]`, in `[Xmin, Ymin, Xmax, Ymax]` order:

```text
zoneX = 100 * (Ymax - worldY) / (Ymax - Ymin)
zoneY = 100 * (Xmax - worldX) / (Xmax - Xmin)
```

Coordinates are rounded to two decimal places. All 35 shared points match Questie's two-decimal reference positions within 0.025 percentage points. A few last digits differ because the client bounds and source world coordinates are rounded. Their original XYZ values are retained. The image SHA-256 is recorded in the JSON so a later asset change can be detected.

The implemented map was inspected in Chrome. Automated checks cover coordinate projection, filtering, popups, quest navigation, responsive dimensions, and load retries. Landmark positions agree with the supplied zone art and reference coordinates; no in-game Forever spawn verification is claimed.

The background is Blizzard game artwork. The checked source pages do not provide an explicit blanket redistribution license for that artwork. GPL notices for Classic data do not license the map image. The implementation stores the image locally with Blizzard/ForeverDB attribution and keeps its copyright separate from the data license.

## NPC coverage

The research snapshot includes:

- **15 NPC quest givers** whose quests appear in the current Desolace list, with matching quest IDs for future links.
- **6 rare NPC references:** Prince Kellen, Giggler, Accursed Slitherblade, Hissperak, Kaskk, and Cursed Centaur.
- **3 quest-start objects:** Karnitol's Chest, Malem Chest, and Rackmore's Log. These are separate from random treasure chests.

All those NPC positions are Classic-derived. ForeverDB's current Desolace quest-giver and rare layers label the positions as Classic; the checked rows do not establish Forever-observed coordinates. NPC existence or a newer quest relationship does not, on its own, confirm an inherited location.

Cork and Rigger Gizelton are travelling caravan NPCs. Their reference pickup points must be labeled as moving-NPC references. They are not fixed spawns or complete patrol routes. Rare reference points likewise do not establish complete patrol coverage. NPC/object starts in Ironforge or Stormwind should link to their quests but should not be pinned onto the Desolace map.

Broader Classic NPC/service data is available: The Forever Era has 51 named/service NPC records in Desolace, and ForeverDB supplies services and client-derived flight points. This could support later vendor/trainer/service layers. It needs a separate faction/role audit; source shorthand is not a substitute for Alliance quest eligibility. Flight-point IDs are TaxiNode IDs, not NPC IDs, and must be stored separately.

For the first version, the 15 quest givers and six rares form a manageable NPC layer. Service NPCs and ordinary quest-target spawn clouds can be added after the intended scope is settled.

## Loot and source limits

The pinned Classic snapshot assigns loot template **2283** to Solid Chest 2855 and **2284** to Solid Chest 2857. Both footlockers use template **16465**. These are Classic identifiers, not confirmed Forever loot tables. Identical names must not merge the two Solid Chest objects. No live drop probabilities, respawn timings, or Forever skill requirements are established by this research.

The handoff's approximately 21 Desolace points for object 2857 could not be verified: Wowhead's full Forever object page returned 403 Forbidden. Its accessible tooltip confirms object identity but provides no spawn list. The obtained sources instead provide 15 shared reference points plus one additional Classic snapshot point for that object. This is a coverage gap, not evidence that the handoff count is wrong.

The other handoff leads were accessible. Azeroth DB's object pages expose matching Classic-style coordinate sets, but no additional Forever position confirmation was established. Its terms distinguish permitted public interfaces from bulk copying; it was used as a cross-check rather than an exported data source. Warcraft Tavern corroborates the chest IDs and broad locations but does not supply an extracted coordinate table. WoW Forever Friends explicitly labels its underlying data Classic and publishes its provenance and GPL license.

Questie's current Forever object overlays/traces did not supply additional Desolace chest coordinates. The file being named Forever does not make its inherited Classic object positions Forever-confirmed.

## Implemented scope

The map uses the fully explored Desolace background, all obtained Classic reference points, and clear evidence labels. Separate toggles control the two Solid Chest objects, two footlocker objects, quest givers, rares, and quest objects. The three additional snapshot candidates have dashed markers and can be filtered. The Forever-confirmed-only filter is empty and explicitly explains why.

Object/NPC identities remain separate from their locations and source observations. Popups link existing tracked quest IDs and label moving NPCs. The map does not write to quest completion storage. Its renderer consumes a maintained JSON dataset; no live scraping, API keys, or Node runtime are needed on the site.

Chest loot tables, routes, editing, visit tracking, patrol drawings, and ordinary mob clouds remain outside this first version. This is a **Classic-reference map on a Forever background**, not a complete, Forever-verified chest map.

## Files and attribution

- [locations.json](locations.json): research-only coordinate snapshot and map metadata; not wired into the app.
- [sources.json](sources.json): URLs, source roles, provenance, and access limitations.
- [LICENSE-GPL-3.0.txt](LICENSE-GPL-3.0.txt): license accompanying the CMaNGOS-derived reference data. This does not license Blizzard artwork or change the license of the existing application code.

The world-coordinate source is WoW Forever Friends' retained CMaNGOS Classic-DB snapshot, release published October 13, 2026, database SHA-256 `3ecce713758f290300931c88814e6349cf642d35d0365d1dab753a4e639faeb6`. The Era layer snapshot is generated November 8, 2026, with client context build 1.60.1.70888. Questie cross-checks use revision `4dbb82440a27856f8dccf57094a5d792cdc7cc9b`. Those Questie records were compared, rather than used as the exported coordinate source.
