# Zul'Farrak map

Choose **Dungeons → Zul'Farrak → Map**. The map has 22 entries covering the entrance, all 13 tracked bosses and rares, objectives for nine tracked quests, and two chests. Marker popups link to the existing quest entries and Drops tab. [Map data](../../data/maps/zulfarrak.json) · [Source inventory](sources.json)

## Bosses and rare spawns

The dungeon image is the 1357 × 1495 Forever client minimap. Fixed spawns, patrol origins, and the interior entrance use Classic world coordinates. Gahz'rilla uses the scripted summon in the pool. Nekrum Gutchewer and Shadowpriest Sezz'ziz share a marker at the foot of the pyramid where the final wave spawns. Sergeant Bly's marker shows his cage at the top. Talk to Bly after the event for the fight and the Divino-matic Rod. [ForeverDB minimap and projection](https://foreverdb.net/data/dungeons/209.json) · [Classic spawn and event script](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/209_zulfarrak.sql) · [Forever quest and encounter guide](https://www.wowhead.com/forever/guide/zulfarrak-dungeon-overview-location-rewards)

The rare layer shows two Sandarr Dunereaver references, three Dustwraith references, and Zerillis's patrol origin. The Classic pools allow one selection per rare and include a substitute spawn. The SQL labels a fourth Dustwraith location (2090294) as guessed. The live Forever rare spawn rules and patrol ranges are unverified. [Classic spawn and pool records](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/209_zulfarrak.sql)

## Quests and chests

- Search by quest name to see related markers. The Prophecy of Mosh'aru highlights both tablet drops. Scarab Shells marks a representative scarab in the courtyard. Troll Temper marks the Sandfury Executioner at the pyramid as one of several eligible trolls throughout the dungeon. The portal marker also gives the Tanaris entrance coordinates. [Quest research](../zulfarrak/README.md) · [Classic loot snapshot](https://github.com/cmangos/classic-db/releases/tag/latest)
- **Witch Doctor's Chest** is the treasure chest by Zum'rah's cauldron. It has one recorded position in the Classic instance data and a listing in the Forever object catalog. The inspected Classic snapshot lists Shallow Graves separately and has no other general treasure chest coordinates in the instance. [Classic instance records](https://github.com/cmangos/classic-db/blob/09000ea8d7333856727204e4e2d30f772149b7a8/Updates/Instances/209_zulfarrak.sql) · [Forever object record](https://azeroth.wiki/forever/objects/witch-doctor-s-chest)
- **Spellbound War Chest** is a solo Rogue objective for The Talisman of Kazdor. A Forever player walkthrough places the chest atop the pyramid near Nekrum, so the map uses an approximate marker at the existing pyramid-top reference. Searching for the quest highlights Antu'sul, Zum'rah, and the chest, with the intermediate steps in their popups. [Forever quest and player walkthrough](https://www.wowhead.com/forever/quest=80411/the-talisman-of-kazdor#comments)

## Projection and credits

Pixel X is `(1313.89 − world Y) × 2` and pixel Y is `(1936.20 − world X) × 2`. Divide by the image dimensions and multiply by 100 to obtain the map percentages. The five comparable Classic boss positions agree with the ForeverDB references within 0.02 percentage points. The background is unmodified Blizzard client artwork via ForeverDB. Classic spawn data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). [Image and source hashes](sources.json)
