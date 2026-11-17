# Uldaman

Researched November 16, 2026. Added under **Dungeons** with **36 Alliance/shared quest entries** and **24 unique boss equipment drops across eight cards**. **13 items** pass the Rogue equipment filter. Maintained data: [quests.json](../../data/quests.json) and [drops.json](../../data/drops.json). No map is added by this change.

Sources include the [current quest index](https://foreverchanges.pro/quests/uldaman), individual current quest pages, [ForeverDB's dungeon data](https://foreverdb.net/data/dungeons/70.json) at build **1.60.1.70938**, Questie at revision `e1652ce62113c152da682baf2d6fb85f1396bcfb`, the [All The Things dungeon record](addon.lua) at revision `36684dda55e4aa297de3ea24475a77687b54c620`, current Wowhead Forever item tooltips, and the read-only CMaNGOS Classic snapshot released November 13, 2026. Public pages and player observations take precedence over older conflicting metadata; Classic references retain their provenance.

## Quest coverage

The 29-entry current index contains **19 eligible Alliance/shared quests** and **10 Horde-only quests**. The dungeon registry additionally lists Mage-only **Power in Uldaman (1956)**, which is excluded. The addon, primary quest category, NPC starters, and direct prerequisite chains identify 17 more eligible introductions, entrance-area tasks, and follow-ups. The [52-candidate ledger](sources.json) accounts for **36 included, 15 Horde-only, and one other-class quest**.

The list includes:

- Uldaman Reagent Run and its Badlands Reagent Run prerequisite.
- Agmond's Fate and its Ironband/Agmond/Murdaloc introductions.
- Hammertoe's approach tasks, both A Sign of Hope steps, Amulet of Secrets, the two Prospect of Faith and Passing Word of a Threat handoffs, An Ambassador of Evil, and The Lost Tablets of Will.
- Solution to Doom, Alliance Reclaimed Treasures, and Power Stones.
- The full Alliance Shattered Necklace chain, including its separate reward step and optional Replacement Phial.
- The Lost Dwarves introduction and The Hidden Chamber.
- The three Alliance/shared Platinum Discs steps and the Alliance Uldum continuation through A Future Task.

Incoming prerequisites and outgoing follow-ups show their real pickup area in Ironforge, Loch Modan, the Badlands, or Tanaris. They are not mislabeled as starting inside the dungeon. Several tasks cover the entrance caves or Badlands approach rather than the instance interior; the relevant expanded subtitles/objectives identify that scope.

**Remains of a Paladin is an NPC name, not a class restriction.** Find the Gems is available to an Alliance Rogue. The Horde Necklace Recovery/Translating the Journal chain is separately excluded by its actual faction restriction, not by that shared NPC's name.

No different quest IDs are merged by name. Both A Sign of Hope steps, the necklace stages, three Platinum Discs steps, and paired delivery handoffs have different objectives and remain individually trackable. No Horde version is substituted for its Alliance counterpart.

## Chain and location verification

Explicit prerequisites use the primary Classic quest table and retain **Classic reference** provenance. Forward links are derived by the app. Every tracked prerequisite points to its actual entry rather than an untracked duplicate.

**Replacement Phial (3375)** is optional. The Classic condition requires Back to Uldaman to be active or completed, Restoring the Necklace (2204) not yet rewarded, and no phial in inventory/bank. It is linked as an earlier/later chain step from Back to Uldaman; completing the parent first is not invented as a mandatory prerequisite. The addon suggests Lore for a Price, but the more precise primary condition is preserved in the ledger.

**The Stone Watcher (2954)** is also linked as a continuation from the Alliance Seeing What Happens step, not as a mandatory requirement that both Alliance and Horde introductions be completed. The shared watcher's alternative Horde path remains excluded. Subsequent Return to Ironforge and A Future Task retain their actual prerequisites.

Some public pages place Ironforge NPCs on a broad Dun Morogh map. The tracker instead uses their approximate **Ironforge city-map** positions from the primary NPC reference: for example, Talvash at **36.4, 3.6**, Stormpike at **74.6, 11.7**, and Belgrum at **77.3, 9.7**. Those coordinates are not presented as newly observed Forever measurements.

Hammertoe's generic Loch Modan coordinate is not reused as a measured cave pickup: he is labeled **Uldaman entrance caves**, with coordinates left blank. Baelog, Remains of a Paladin, the Discs, and other instance pickups likewise have no invented outdoor coordinates. Talvash's Scrying Bowl is summoned by the phial and is not assigned a fixed Ironforge position. Stone Watcher is labeled at the Tanaris Uldum gates without guessing a spawn pin. Item-started Shattered Necklace has no asserted fixed pickup point.

Current levels/minimum levels override older addon minimum-level shorthand. For example, the current Alliance Uldaman Reagent Run requires level **38**. The necklace gems use the actual source objects: Shadowforge Cache for the Ruby, Conspicuous Urn for the Topaz, and Grimlok for the Sapphire. The final power source comes from Archaedas.

## Boss equipment

| Boss/source | Equipment |
| --- | --- |
| Digmaster Shovelphlange, rare in entrance caves | Expert Goldminer's Helmet (9375), Shovelphlange's Mining Axe (9378), Tromping Miner's Boots (9382) |
| Revelosh | Revelosh's Boots (9387), Armguards (9388), Spaulders (9389), Gloves (9390) |
| Ironaya | Stoneweaver Leggings (9407), Ironshod Bludgeon (9408), Ironaya's Bracers (9409) |
| Obsidian Sentinel | White Obsidian Wand (274425) |
| Ancient Stone Keeper | Cragfists (9410), Rockshard Pauldrons (9411) |
| Galgann Firehammer | Galgann's Fireblaster (9412), Galgann's Firehammer (9419), Flameseer Mantle (11310), Emberscale Cape (11311) |
| Grimlok | Oilskin Leggings (9414), Grimlok's Tribal Vestments (9415), Grimlok's Charge (9416) |
| Archaedas | The Rockpounder (9413), Stoneslayer (9418), Archaedic Stone (11118), Stone Keeper Spire (274432) |

All **24** current Forever tooltips explicitly name the matching boss. **17** additionally have player-recorded source evidence in ForeverDB and use **Seen in Forever**; seven use **Wowhead ref.** Source evidence and stats evidence are separate. Stats, item levels, required levels, current quality, and effects use the inspected current tooltips, preserved in [item-tooltips.json](item-tooltips.json).

The addon does not list the newer **White Obsidian Wand** or **Stone Keeper Spire**. Both are included because current Forever observations and explicit tooltip boss lines independently support them. Digmaster's three items are also retained even though he is outside the instance and absent from the main dungeon boss registry.

Random enchantments on Revelosh equipment, Ironaya's Bracers, Cragfists, and Archaedic Stone remain unspecified; no affix is fabricated. Armor bonuses shown separately by the tooltip remain separate. Stoneslayer preserves its special triple-damage targets. Oilskin Leggings retain Feral Combat +1 even though a Rogue can equip them. Goldminer's Helmet retains the reworked dodge/parry reduction and Axes bonus. Short proc descriptions omit negligible internal millisecond cooldowns; the complete tooltip text is preserved in the research artifact.

The Rogue filter means equipable after training, including the one-handed axe. It excludes plate, mail, the wand, staves, the polearm, and two-handed weapons. Caster stats do not make an otherwise equipable cloth piece, ring, cape, gun, or one-handed mace unusable. The named green **Tromping Miner's Boots** remain included because they are unique rare-boss equipment, not a generic world green.

## Exclusions and limits

**Baelog, Eric, and Olaf are friendly Alliance quest NPCs.** Their hostile encounter and six equipment drops are Horde-only in the inspected addon and primary NPC faction records, so those items are excluded from this Alliance-focused list: Horned Viking Helmet, Worn Running Boots, Baelog's Shortbow, Nordic Longshank, Battered Viking Shield, and Olaf's All Purpose Shield. Baelog's Alliance quest remains included.

Precision Arrows/ammunition, potions, Oil of Olaf, crafting materials, the Staff of Prehistoria components, quest items, quest rewards, and treasure-chest world drops are excluded. The addon's separate zone-drop equipment (including Pendulum of Doom, The Jackhammer, and Miner's Hat of the Deep) is not promoted to unique boss loot merely because it can drop in Uldaman. Observed/tooltip percentages are not shown as guaranteed rates.

[sources.json](sources.json) records revisions, page facts, decisions, file hashes, the optional-phial condition, and the Classic snapshot hash. [primary-records.json](primary-records.json) preserves relevant quest metadata/relationships; [addon.lua](addon.lua) and [item-tooltips.json](item-tooltips.json) preserve the inspected source records. Coverage is bounded by these sources, not a claim that no undocumented change exists.

All previous quest/drop records, saved IDs, and the storage key are unchanged. Totals are now **764 list entries / 737 unique quest IDs**, and **273 equipment entries** across the dungeon lists. The site remains static with no hosting runtime or build dependency.
