# Scarlet Monastery Cathedral

Researched November 15, 2026 against the current published Forever sources, build **1.60.1.70938** where reported. Cathedral has **one quest**, **10 equipment drops across three boss cards**, and **two map sections**. The maintained records are in [quests.json](../../data/quests.json), [drops.json](../../data/drops.json), and [scarlet-monastery-cathedral.json](../../data/maps/scarlet-monastery-cathedral.json). [sources.json](sources.json) records source hashes, decisions, and geometry.

## Quest coverage

The [current Scarlet Monastery quest index](https://foreverchanges.pro/quests/scarlet-monastery) contains eight quests. Only **In the Name of the Light (1053)** applies to an Alliance Rogue in Cathedral. Its [individual page](https://foreverchanges.pro/quest/1053/in-the-name-of-the-light) confirms Alliance, level 40, minimum level 34, and the four targets across Library, Armory, and Cathedral. It starts with Raleigh the Devout in Southshore and requires the letter-delivery Down the Scarlet Path (1052), already tracked in Desolace.

The Cathedral entry copies the existing Library/Armory quest ID and relationship. Completion is shared across all three lists. No extra completion flag or prerequisite copy is introduced.

Excluded from Cathedral:

- **Horde-only:** Into the Scarlet Monastery (1048), Compendium of the Fallen (1049), Vorrel's Revenge (1051), Hearts of Zeal (1113), and Test of Lore (1160).
- **Library objectives:** Mythology of the Titans (1050) and Past Due (96800), already tracked in Library.
- **Mage-only:** Rituals of Power (1951), an additional known quest outside that eight-entry index.

Existing research and the [All The Things Forever dungeon record](https://github.com/ATTWoWAddon/AllTheThings/blob/36684dda55e4aa297de3ea24475a77687b54c620/.contrib/.db/forever/dungeons%20%26%20raids/scarlet%20monastery.lua) corroborate wing/faction/class restrictions. No Horde-only or non-Rogue class quest is added.

## Boss equipment

| Boss | Equipment |
| --- | --- |
| High Inquisitor Fairbanks | Inquisitor's Shawl (19507), Branded Leather Bracers (19508), Dusty Mail Boots (19509) |
| Scarlet Commander Mograine | Aegis of the Scarlet Commander (7726), Gauntlets of Divinity (7724), Mograine's Might (7723), Scarlet Leggings (10330) |
| High Inquisitor Whitemane | Hand of Righteousness (7721), Triune Amulet (7722), Whitemane's Chapeau (7720) |

**Nine** current [Wowhead Forever item tooltips](https://nether.wowhead.com/forever/tooltip/item/7720) explicitly name their matching boss. Each item record links its own tooltip. Branded Leather Bracers also have a Forever player observation in the [ForeverDB dungeon record](https://foreverdb.net/data/dungeons/189.json).

Scarlet Leggings' tooltip verifies the item and stats but omits a boss line. The Mograine association is independently present in the Forever addon and [Classic primary loot data](https://github.com/cmangos/classic-db/releases/tag/latest), so that association retains **Classic ref.** evidence. The read-only snapshot's creature-template/loot-table join links Mograine (3976) to Scarlet Leggings (10330); its hash is recorded below. It is shared boss loot, also found in the existing Herod list. The current ForeverDB encounter registry omits Mograine altogether; its shorter list is not used as the completeness boundary.

Stats and effects use current Forever tooltip values, separately marked `statsEvidence: wowhead`. Scarlet Leggings also match the existing Armory client record. The Rogue filter includes **five** items: the cloth shoulder/head pieces, leather bracers, necklace, and one-handed mace. It excludes mail, the shield, and the two-handed mace. Eligibility means equipable with training, not a gear recommendation.

Generic world greens, cloth, quest items, recipes, consumables, and quest rewards are excluded. Unique boss items are included regardless of their old Classic quality; the inspected current tooltips rate all ten as rare. Drop percentages are not presented as guaranteed probabilities.

## Map sections

The [ForeverDB Scarlet Monastery guide](https://foreverdb.net/dungeon/189-scarlet-monastery) supplies unmodified client minimap artwork and world projections:

| Section | Client part | Dimensions | Origin X | Origin Y | Pixels/yard |
| --- | ---: | --- | ---: | ---: | ---: |
| Cathedral, default | 4 | 364 × 401 | 1247.84 | 1489.99 | 2 |
| Courtyard | 7 | 553 × 887 | 1255.29 | 1542.07 | 2 |

The courtyard view includes the covered approaches and shows a roof over the cathedral itself. The separate Cathedral section shows the playable interior and all three bosses. Part 4 alone would omit the entrance and gardens; Part 7 alone would obscure the boss rooms. Neither is mislabeled as another wing.

There are **seven markers**: three bosses, the torch beside Fairbanks' secret chamber, the chapel doorway shown once on each section, and the Cathedral arrival. The duplicated doorway is one physical location linking the sections conceptually, not two doors. Bosses link to Drops; Mograine and Whitemane link to the tracked quest. The section selector uses the existing map controls, and search reports matches in the other section.

Positions come from the CMaNGOS SQL at revision `09000ea8d7333856727204e4e2d30f772149b7a8` and the read-only November 13 Classic SQLite snapshot used for the previous maps (SHA-256 recorded in the source inventory). Whitemane and Fairbanks match the guide's boss pins within 0.02 percentage points; Mograine's missing pin is supplied by the primary spawn record. Original world XYZ and spawn GUIDs are retained.

```text
pixelX = (originY - worldY) × pixelsPerYard
pixelY = (originX - worldX) × pixelsPerYard
mapX = pixelX / sectionWidth × 100
mapY = pixelY / sectionHeight × 100
```

The **Cathedral** arrival uses teleport trigger **610**, world position **853.179, 1319.18, 18.6714**. The dungeon-wide default arrival is for Graveyard and is not reused. Chapel Door (104591) and Torch (97701) use their actual object positions. No chest position is established for Cathedral in the inspected records, so none is invented.

These are **Classic reference positions on Forever client artwork**, not measured Forever spawn observations. Coordinates are relative to each section image, not outdoor `/way` coordinates. Source labels remain optional. Existing quest/drop records, other maps, and completion storage are unchanged. Browser checks are left to the user.

Classic spawn data is derived from CMaNGOS under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). Blizzard artwork retains its copyright; the data license does not license the images. All website assets are local static files and need no live API or Node runtime.
