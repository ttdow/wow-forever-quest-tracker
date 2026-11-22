# Felwood map

Open **Zones → Felwood → Map** for 78 searchable entries that link all 80 tracked quests. Quest links open the corresponding tracker row. A quest that starts outside Felwood can appear at its local objective or turn-in. Emerald Sanctuary, Timbermaw Hold, and the Shadow Hold equipment room use shared pins for nearby entries. Their popups give each entry’s original coordinates. [Map data](../../data/maps/felwood.json) · [Quest coverage](../felwood/README.md)

## Plants and quests

- **Corrupted plants** shows all 30 tracked plant sites, including 10 Songflowers, 10 Windblossoms, six Whipper Roots, and four Night Dragons. Each pin includes the salve cost and links its own repeatable quest. Search for the plant name or the reward, such as **Songflower Serenade**. The coordinates come from the audited quest pages. [Felwood quest index](https://foreverchanges.pro/quests/felwood)
- **Shadow Hold** shows the cave entrance, Captured Arko'narin, the four protection braziers, the equipment chest, Rakaiah, Trey Lightforge's remains, and Shadow Lord Fel'dan's group. The interior positions project onto the surface map. The Jaedenar Moon Well is outside the cave. [Classic positions](https://github.com/cmangos/classic-db/releases/tag/latest) · [Entrance reference](https://www.wowhead.com/classic/quest=5165/dousing-the-flames-of-protection#comments) · [Moon Well reference](https://www.wowhead.com/classic/quest=5157/collection-of-the-corrupt-water#comments)
- The **Statue of Malorne** uses a player-recorded Forever position for the Stag Lord's Bauble pickup. The **Arei summon site** is an approximate reference near the elven statue in Irontree Woods. [Questie object trace](https://github.com/Questie/QuestieDB/blob/e1652ce62113c152da682baf2d6fb85f1396bcfb/src/corrections/Forever/traces/foreverObjectTraces.lua) · [Flute of the Ancients](https://warcraft.wiki.gg/wiki/Flute_of_the_Ancients)

## Rares and chests

The Classic snapshot supplies 14 spawn positions for eight rares. These cover Death Howl, Mongress, Ragepaw, The Ongar, Olm the Wise, Alshirr Banebreath, Dessecus, and Immolatus. Live Forever spawn conditions and patrol ranges are unverified. [Classic spawn snapshot](https://github.com/cmangos/classic-db/releases/tag/latest) · [Rare references](https://theforeverera.com/data/map-layers/r.json?v=20261108113959)

**Arko'niran's Chest** (176225) is the escort equipment chest. The inspected Classic chest layer has no general treasure records assigned to Felwood. The nearby solid and battered chests in the snapshot project into the rectangular map bounds but fall outside Felwood’s terrain outline. Random treasure spawn locations in Felwood remain unverified. [Classic chest layer](https://theforeverera.com/data/map-layers/k.json?v=20261108113959) · [Forever zone outline](https://foreverdb.net/data/maps/zones.json) · [Escort objective](https://questing.wiki/wow-forever/quests/5203/)

## Coordinates and credits

The 1002 × 668 Forever client map uses UI map **1448**. To obtain the map percentages, divide `(1641.7 − world Y)` by `5750` and `(7133.3 − world X)` by `3833.3`, then multiply each by 100. Shared markers retain their source positions in the map data. The background is unmodified Blizzard client artwork via ForeverDB. Classic spawn data is CMaNGOS-derived under [GPL-3.0](../desolace-map/LICENSE-GPL-3.0.txt). [Source inventory and hashes](sources.json)
