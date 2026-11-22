# Uldaman map

Choose **Dungeons → Uldaman → Map**. The dungeon interior and Badlands approach have 67 markers between them. Popups link to 21 tracked Alliance or shared quests and the eight existing boss and rare drop sources. The optional **Quest materials** layer shows all 16 distinct Magenta Cap Cluster positions and 14 Carved Stone Urns from the Classic snapshot. [Maintained map data](../../data/maps/uldaman.json) · [Source inventory](sources.json)

## Dungeon interior

The **1168 × 1208** Forever client minimap comes from ForeverDB's Uldaman map. Seven boss markers use Classic spawn data, including Ironaya's scripted summon position and the Revelosh position used by ForeverDB. Revelosh has two other nearby positions in the Classic spawn group. The Lost Dwarves appear through friendly quest giver Baelog, with his chest and journal marked nearby. The front and rear arrival pins use Classic teleport destinations. [Client map and projection](https://foreverdb.net/data/dungeons/70.json) · [CMaNGOS instance records](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/070_uldaman.sql)

Quest pins cover the necklace gems and power source, the Tablet of Will, the Discs of Norgannon, the Keystone, and the exploration area for The Hidden Chamber. The exploration pin marks the center of client area trigger **822**. The Discs pin also identifies where to summon the Lore Keeper. The original XYZ positions are kept in the data because upper and lower passages overlap in the minimap. [Forever area triggers](https://wago.tools/db2/AreaTrigger/csv?build=1.60.1.70959) · [Uldaman quest research](../uldaman/README.md)

## Badlands approach

The **1002 × 668** Badlands client map shows both portals, Digmaster Shovelphlange, Hammertoe Grez, Magregan Deepshadow, Krom Stoutarm's Chest, the Ancient Chest in the Sealed Hall, and nearby tracked Badlands quest locations. The cave positions project onto the surface map. Zoom in to separate nearby pins. The Shadowforge pins mark examples of recorded quest-item drop sources. Magregan's pin marks a spawn reference for a patrol. The Shattered Necklace and the summoned scrying bowl have no fixed location recorded. [Badlands map](https://foreverdb.net/maps/1418) · [Client map bounds](https://wago.tools/db2/UiMapAssignment/csv?build=1.60.1.70959) · [Classic portal triggers](https://wago.tools/db2/AreaTrigger/csv?build=1.15.9.70576)

## Chest coverage

- **Large Mithril Bound Chest** has two possible locations, spawn GUIDs **700183** and **700184**. Pool **45691** allows one active location in the Classic configuration.
- **Ancient Treasure** is the fixed chest in the vault after Archaedas. The **Ancient Chest** in the entrance caves holds the Tablet of Ryun’eh and has its own quest marker.
- **Baelog's Chest**, **Shadowforge Cache**, and **Krom Stoutarm's Chest** are quest containers. They appear under **Quest chests**.

Other Classic references list a Large Darkwood Chest in Uldaman. The inspected CMaNGOS records provide a template for it and no separate Uldaman spawn coordinates. The map shows the two mapped chest sites as Classic references. Live Forever spawn rules are unverified. [Classic spawn snapshot](https://github.com/cmangos/classic-db/releases/tag/latest) · [Classic Large Darkwood Chest record](https://www.wowhead.com/classic/object=131979/large-darkwood-chest)

## Projection and credits

Inside the dungeon, pixel X is `(490.33 − world Y) × 2` and pixel Y is `(208.31 − world X) × 2`. Divide by the image dimensions and multiply by 100 for the displayed image coordinates. The seven comparable positions agree with the ForeverDB boss pins within 0.02 percentage points. The Badlands section uses UI map **1418** and its full-precision client world bounds. Both backgrounds are stored unmodified. [Image and source hashes](sources.json)

Classic spawn data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). The map backgrounds are Blizzard client artwork via ForeverDB.
