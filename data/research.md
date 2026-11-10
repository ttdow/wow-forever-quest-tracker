# Quest research notes

Blackfathom Deeps and Stonetalon Mountains were researched November 8, 2026. Wailing Caverns and The Stockades were researched November 9, 2026. The maintained quest data is `quests.json`.

## Sources

- [ForeverDB: Blackfathom Deeps](https://foreverdb.net/dungeon/48-blackfathom-deeps)
- [ForeverDB: Stonetalon Mountains quests](https://foreverdb.net/quests/stonetalon-mountains)
- [ForeverDB: Stonetalon Mountains map](https://foreverdb.net/maps/1442)
- Individual quest guides are linked in each added record's `sources` field. The public zone, dungeon, and quest-guide JSON backing those pages was used to verify IDs, levels, faction and class restrictions, givers, coordinates, and chain relationships.

## Inclusion

- Blackfathom Deeps: the five Alliance dungeon quests (#971, #1198, #1199, #1200, #1275), plus the related introduction The Corruption Abroad (#3765).
- Stonetalon Mountains: all 23 Alliance or unrestricted entries in the zone list, plus five related steps: Journey to Stonetalon Peak (#1056), On Guard in Stonetalon (#1070, #1085), Pridewings of Stonetalon (#1134), and the Ziz Fizziks introduction (#1483). The Zoram Strand (#1008) remains only in Ashenvale and is linked as the prerequisite to Pridewings of Stonetalon.
- Every added quest has no class restriction (`cls: 0`) and allows Alliance races. Horde-only quests and quests restricted to classes other than Rogue are excluded.
- The Ziz Fizziks and Piznik quests are unrestricted in the current source (`side` empty, race mask 255); they are included as neutral quests. Other quest guides about older WoW versions may categorize them differently.
- Cross-zone introductions and follow-ups belong to the listed chains. Their actual pickup zone is shown in `area`; the tab name does not claim that every step starts there. Optional chain links and observed "offered after" relationships are not represented as mandatory prerequisites.
- Quest IDs #1056, #1070, #1085, and #1134 also appear under Ashenvale. They retain the same IDs so one completion applies in both tabs.

## Evidence limits

ForeverDB distinguishes player observations in WoW: Forever from CMaNGOS Classic reference details. The five Blackfathom Deeps dungeon quests and their introduction have Forever observations. Some Stonetalon quest details and several pickup locations are still Classic references; those are identified in each record's `notes` and assigned approximate location confidence. An observed quest does not establish that every detail is observed: coordinates and objectives can have separate provenance.

Observed pickup coordinates are preferred to Classic coordinates when available for the same giver. Argent Guard Thaelrid is recorded inside Blackfathom Deeps without outdoor map coordinates, so his coordinates are intentionally blank. Objectives are concise summaries rather than copied quest narrative.

## Wailing Caverns

Source: [ForeverDB's Wailing Caverns guide](https://foreverdb.net/dungeon/43-wailing-caverns), its public dungeon quest JSON, and the individual guides linked in each quest record. The Glowing Shard item record (#10441) confirms that it starts #6981; its drop-source record lists Mutanus the Devourer with a Forever observation.

Included entries:

- Deviate Hides (#1486)
- Raptor Horns (#865), the prerequisite for Smart Drinks
- Smart Drinks (#1491)
- Trouble at the Docks (#959)
- Deviate Eradication (#1487)
- The Glowing Shard (#6981), an item-started quest
- In Nightmares (#3370), the Alliance follow-up to The Glowing Shard

The five dungeon-index quests have no faction restriction and race mask 255. Raptor Horns is likewise neutral. The Alliance In Nightmares has race mask 77. All seven have no class restriction. Hamuul Runetotem (#1489), Nara Wildmane (#1490), Serpentbloom (#962), Leaders of the Fang (#914), and the Horde In Nightmares (#3369) are excluded.

The neutral quests and Raptor Horns have player observations in Forever. Nalpak/Ebru pickup coordinates and some objectives are still Classic references. The Alliance In Nightmares remains a Classic-reference quest guide without a player observation; its Falla Sagewind pickup position is corroborated by the observed turn-in for The Glowing Shard. That distinction is preserved in `notes` and `evidence`.

The Glowing Shard starts from an item dropped inside the dungeon, so its pickup coordinates are blank. Its turn-in is Falla Sagewind after investigating the shard in Ratchet. Smart Drinks has an observed "offered after Deepmoss Spider Eggs" link; this is not asserted to be an additional mandatory prerequisite, and that unrelated quest is not added to this dungeon list.

## Prerequisite navigation

On November 9, 2026, ForeverDB's full quest-guide records were checked for all 269 unique quest IDs now in the tracker. Their explicit "Complete first" relationships are stored in `prerequisites`, with evidence and a link to the dependent quest's guide. "Chain link" and "Quest line" relationships are stored separately in `previousQuests` and shown as "Earlier in chain". "Offered after" observations are not turned into prerequisites.

This distinction also applies to the Forever Deadmines explosives chain: its current source labels the preceding steps "Quest line", so the UI presents them as sequence links rather than asserting a mandatory completion requirement from older notes.

Forward navigation uses the same researched relationships in reverse. A prerequisite displays the tracked quests it unlocks, while a sequence step displays the tracked quests later in its chain. These are calculated from `prerequisites` and `previousQuests`, so edits to the authoritative relationships update both directions automatically. Repeated copies of a quest ID do not produce duplicate forward links.

The Zoram Strand was removed from the Stonetalon list because its pickup and objectives are in Ashenvale. Pridewings of Stonetalon links to the existing Ashenvale entry instead; its completion ID is unchanged. The Bounty of Teldrassil's prerequisite Nessa Shadowsong (#6344) and Tyrande and Remulos' prerequisite Eranikus, Tyrant of the Dream (#8733) are outside the tracked lists and link to their external guides. The Absent Minded Prospector (#729) also links externally to Trouble In Darkshore? (#730) as an earlier chain step, not a mandatory prerequisite.

## Dungeon equipment drops

Researched November 9, 2026 from ForeverDB's [Deadmines](https://foreverdb.net/dungeon/36-deadmines), [Wailing Caverns](https://foreverdb.net/dungeon/43-wailing-caverns), and [Blackfathom Deeps](https://foreverdb.net/dungeon/48-blackfathom-deeps) dungeon records. Current item stats/effects, item types, stat names, and Rogue proficiencies come from the site's public Forever-client data (build 1.60.1.70862). Each item record includes source links.

- Deadmines: 65 equipment entries; 59 observed drop sources and 6 Classic references.
- Wailing Caverns: 23 equipment entries; all 23 drop sources are currently Classic references.
- Blackfathom Deeps: 45 equipment entries; 44 observed drop sources and 1 Classic reference.

Only uncommon-or-better equipment explicitly present in a dungeon's loot list is included. The dungeon's broader item dictionary also contains quest rewards and other items, which are not treated as drops. Skum's Bucket (#273137) and Treacherous Treads (#273842) have only speculative client associations in the current source and are excluded. Poor/common random equipment, recipes, materials, consumables, and quest items are outside this equipment view.

Drop evidence is preserved independently of client stat evidence. In particular, Wailing Caverns displays its current Forever item stats while clearly marking the drop sources as Classic references. Sample drop percentages are not presented as established probabilities. Generic items with no boss association are labeled "Dungeon drop (source unspecified)" rather than assigned to a guessed boss or trash creature.

The Rogue filter checks the client proficiency table for class ID 4, including one-handed axes as well as cloth, leather, appropriate weapons, and unrestricted accessories. Explicit item class/race restrictions are respected. "Rogue-usable" does not imply that caster stats are recommended. Damage/DPS are derived from client damage ranges and weapon speeds; effect text uses the current item spell descriptions. Classic comparison fields are not substituted for current stats, and random enchantment variants are not enumerated.

## The Stockades

Researched November 9, 2026 using [ForeverDB's Stormwind Stockade guide](https://foreverdb.net/dungeon/34-stormwind-stockade), its public dungeon quest/loot records, and individual quest and current-client item records. The source calls the instance "Stormwind Stockade"; the tracker uses "The Stockades".

The list includes the six dungeon quests: What Comes Around... (#386), Crime and Punishment (#377), Quell the Uprising (#387), The Color of Blood (#388), The Fury Runs Deep (#378), and The Stockade Riots (#391). Bazil Thredd (#389) is included as the introduction that sends the player to Warden Thelwater. All seven allow Alliance races and have no class restriction.

Bazil Thredd requires The Unsent Letter (#373), which already appears under Deadmines. The existing record is retained and linked in both directions automatically. The Stockade Riots requires Bazil Thredd. The Fury Runs Deep requires The Dark Iron War (#303), a Wetlands quest; that prerequisite links to its external guide and is not duplicated into The Stockades. Later Stormwind story quests after The Stockade Riots are outside this dungeon list.

The Fury Runs Deep's quest details are still Classic references. Motley Garmason's pickup position is corroborated by Forever observations on The Dark Iron War, so the location evidence is separate from the quest-detail evidence. Other included quests and givers have Forever observations. Nikova Raskol's coordinate is an observed position rather than a guarantee of a stationary NPC.

The Stockades Drops view adds 17 equipment entries: 13 observed drop sources and 4 Classic-reference sources. Eleven are usable by Rogues under the same client-proficiency filter as the other dungeons. The five primary bosses have cards; Bruegal Ironknuckle's rare-mob loot and named Defias creature drops are grouped under their actual source names. Bruegal's three entries and Defias Renegade Ring are Classic-reference sources. Speculative client associations are excluded, as are quest rewards and non-equipment. Current Forever stats are used for all 17 entries, independently of drop-source evidence.
