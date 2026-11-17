# Zul'Farrak

Researched November 17, 2026. Added under **Dungeons**, suggested levels **44–54**, with **21 Alliance/shared quest entries**, including two Rogue entries, and **38 boss-specific equipment drops across 13 cards**. **22 items** pass the Rogue equipment filter. Maintained data: [quests.json](../../data/quests.json) and [drops.json](../../data/drops.json).

Sources include the [current quest index](https://foreverchanges.pro/quests/zulfarrak), individual current quest pages, [ForeverDB's full dungeon registry](https://foreverdb.net/data/dungeons/209.json) at build **1.60.1.70938**, Questie's primary and generated Forever records/player traces at revision `e1652ce62113c152da682baf2d6fb85f1396bcfb`, the [All The Things dungeon record](addon.lua) at revision `36684dda55e4aa297de3ea24475a77687b54c620`, current Wowhead Forever quest/item tooltips, and the read-only CMaNGOS Classic snapshot released November 13, 2026. Classic references and observed handoffs retain their provenance.

## Quest coverage

All **10 current-index quests** were checked: **nine included**, with Horde-only **The Spider God (2936)** excluded. The dungeon registry and primary generated data identify Alliance **The Witch Doctor's Head (96770)**, absent from that index. A scan of active generated objectives also identifies Rogue-only **The Talisman of Kazdor (80411)**, which explicitly requires a solo job inside Zul'Farrak, and its introduction **Fool Me Twice (80526)**. Nine associated introductions/follow-ups bring the total to 21.

The [24-candidate ledger](sources.json) accounts for 21 included quests, two Horde-only exclusions, and one unrelated random-item quest. The second Horde exclusion is **Zum'rah's Head (96775)**, the separate Mulgore version; it is not substituted for the Alliance quest. **Find OOX-17/TN! (351)** is a general Tanaris distress-beacon quest without a Zul'Farrak objective and is excluded despite its item appearing in the registry's clues. No non-Rogue class quest was selected.

Included dungeon tasks:

- Divino-matic Rod, including Sergeant Bly after the pyramid event.
- Gahz'rilla.
- Tiara of the Deep, from Hydromancer Velratha.
- Scarab Shells and Troll Temper.
- Nekrum's Medallion.
- The Prophecy of Mosh'aru, with tablets from Theka and Velratha.
- The Witch Doctor's Head.
- The Talisman of Kazdor, labeled as a Rogue solo task.

The additional entries cover Tran'rek, The Brassbolts Brothers, Tabetha's Task, Screecher Spirits, The Ancient Egg, Fool Me Twice, and the six surrounding Sharpbeak chain steps. The Sharpbeak route runs **Witherbark Cages → The Altar of Zul → Thadius Grimshade → Nekrum's Medallion → The Divination → Return to the Hinterlands → Saving Sharpbeak**. The Mosh'aru route includes its Feralas preparation and immediate Hinterlands follow-up; later Sunken Temple tasks are outside this dungeon list.

**Tran'rek reuses its existing Stranglethorn Vale record**, changing only the list, so completion is shared and the new reverse chain link also appears there. Other existing quest records are unchanged.

## Requirements and pickups

Eight explicit prerequisite links use the primary Classic quest table. **Saving Sharpbeak uses current quest level 51**, overriding the older Classic level 53. Minimum levels use current quest pages or primary generated data for the Rogue entries.

**The Brassbolts Brothers, Tabetha's Task, and Tran'rek are introductions**, not invented mandatory completion requirements. The primary Classic table records no `PrevQuestId` requirement on Gahz'rilla, Tiara of the Deep, or Scarab Shells. The addon/older Questie metadata suggests stricter parents, so these relationships are retained as earlier/later chain references, distinct from prerequisites. No player must complete an optional breadcrumb just to use the tracker.

Fool Me Twice → The Talisman of Kazdor is recorded by Questie as observed offer order. The tracker retains the **observed order** label in both directions. Both current Wowhead quest tooltips independently confirm the names/objectives; the primary generated records and player traces supply Rogue restriction, level 50, minimum 45, and Fahrad as giver. ForeverChanges returns 404 for these two IDs; that gap is recorded rather than silently dropping the Rogue dungeon task. Shared-faction access retains the primary source's reviewed assumption.

**Mage trainer names do not establish a Mage-only quest.** Tabetha's Task has no class restriction in the primary quest record; its pickups list only Alliance trainers Jennea Cannon and Bink. Archmage Lan'dalock's title likewise does not exclude a Rogue from The Witch Doctor's Head.

Pickups show their actual areas in Tanaris, Thousand Needles, Dustwallow, Ironforge, Stormwind, the Hinterlands, Blasted Lands, and Dalaran/Ravenholdt in Alterac Mountains. Klockmort and Bink use approximate **Ironforge city-map** coordinates from the addon, not broad Dun Morogh coordinates. Fahrad uses a Classic NPC reference at approximately **84.5, 80.3** in Alterac Mountains. Older outdoor pickup coordinates remain references, not newly measured Forever positions.

Gahz'rilla's note describes the party's Mallet of Zul'Farrak/gong requirement. Preparing the mallet is an item process, not a separate quest to invent. There is no speculative dungeon pickup pin or map in this change.

## Boss equipment

| Boss/source | Equipment |
| --- | ---: |
| Antu'sul | 4 |
| Theka the Martyr | 3 |
| Witch Doctor Zum'rah | 3 |
| Nekrum Gutchewer | 3 |
| Shadowpriest Sezz'ziz | 4 |
| Sergeant Bly | 3 |
| Hydromancer Velratha | 3 |
| Gahz'rilla | 3 |
| Ruuzlu | 2 |
| Chief Ukorz Sandscalp | 5 |
| Zerillis, rare | 2 |
| Dustwraith, rare | 1 |
| Sandarr Dunereaver, rare | 2 |

The current Forever tooltips explicitly identify **35 boss/item associations**. Gahz'rilla Fang and The Hand of Antu'sul additionally have player-recorded ForeverDB source evidence and use **Seen in Forever**. Another 33 items use **Wowhead ref.** **Zum'rah's Vexing Cane, Jumanza Grips, and Embrace of the Lycan** have no explicit boss line in the inspected tooltip; they retain **Classic ref.**, corroborated by primary Classic loot rows and the Forever addon.

All 38 items use current Forever tooltip stats, quality, required level, and item level, separately marked `statsEvidence: "wowhead"`. [item-tooltips.json](item-tooltips.json) preserves the payloads. This includes newer equipment for Theka, Velratha, Nekrum, Bly, Ruuzlu, Gahz'rilla, Zerillis, and Sandarr, rather than treating the registry's eight-boss list and partial loot table as exhaustive.

Vice Grips retains its **random enchantment**, without inventing an affix. Current proc/effect changes are preserved, including the Gahz'rilla Fang's Static Electricity, Zum'rah's zombie summon, and the new trinkets. Sang'thraze and Jang'thraze are individually listed as actual boss drops; Jang'thraze describes combining them. **Sul'thraze itself is a combined item, not a direct boss drop**, and is not mislisted as one.

The Rogue filter means equipable after training, including one-handed axes, thrown equipment, and held off-hand accessories. Caster stats do not make otherwise equipable gear unusable. Plate, mail, shields, staves, polearms, two-handed weapons, and wands are excluded by that filter.

## Exclusions and verification limits

Sandarr's older addon pool explicitly describes items shared with other dungeon creatures. The 11 shared zone/world equipment items are excluded: Blackmetal Cape, Bloodletter Scalpel, Brainlash, Eyegouger, Flaming Incinerator, Gutwrencher, Runed Ring, Spellshock Leggings, The Minotaur, Troll Protector, and Witch Doctor's Cane. **A tooltip naming a boss as a source does not by itself make shared zone equipment unique boss loot**; Eyegouger, Gutwrencher, and Spellshock Leggings remain excluded on that basis. Sandarr's two new boss-specific items are included.

Quest items, quest rewards, beacon, mallets, crafting materials, Shriveled Heart, recipes, and consumables are excluded from Drops. No tooltip/observed percentages are shown as guaranteed drop rates. Source metadata remains optional and cannot block loading.

[sources.json](sources.json) preserves candidate decisions, parsed page facts, source revisions, source failures, hashes, NPC references, and the three Classic loot fallback rows. [primary-records.json](primary-records.json) and [quest-tooltips.json](quest-tooltips.json) preserve quest evidence. Coverage is bounded by these inspected sources, not a claim that no undocumented change exists.

Existing quests, drops, professions, maps, completion IDs, and the progress-storage key are preserved. Totals are **795 list entries / 765 unique quest IDs**, and **345 equipment entries**. The site remains static, with no hosting runtime or build dependency.
