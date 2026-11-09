# Quest research notes

Blackfathom Deeps and Stonetalon Mountains were researched November 8, 2026. Wailing Caverns was researched November 9, 2026. The maintained quest data is `quests.json`.

## Sources

- [ForeverDB: Blackfathom Deeps](https://foreverdb.net/dungeon/48-blackfathom-deeps)
- [ForeverDB: Stonetalon Mountains quests](https://foreverdb.net/quests/stonetalon-mountains)
- [ForeverDB: Stonetalon Mountains map](https://foreverdb.net/maps/1442)
- Individual quest guides are linked in each added record's `sources` field. The public zone, dungeon, and quest-guide JSON backing those pages was used to verify IDs, levels, faction and class restrictions, givers, coordinates, and chain relationships.

## Inclusion

- Blackfathom Deeps: the five Alliance dungeon quests (#971, #1198, #1199, #1200, #1275), plus the related introduction The Corruption Abroad (#3765).
- Stonetalon Mountains: all 23 Alliance or unrestricted entries in the zone list, plus six related steps: Journey to Stonetalon Peak (#1056), On Guard in Stonetalon (#1070, #1085), Pridewings of Stonetalon (#1134), its prerequisite The Zoram Strand (#1008), and the Ziz Fizziks introduction (#1483).
- Every added quest has no class restriction (`cls: 0`) and allows Alliance races. Horde-only quests and quests restricted to classes other than Rogue are excluded.
- The Ziz Fizziks and Piznik quests are unrestricted in the current source (`side` empty, race mask 255); they are included as neutral quests. Other quest guides about older WoW versions may categorize them differently.
- Cross-zone introductions and follow-ups belong to the listed chains. Their actual pickup zone is shown in `area`; the tab name does not claim that every step starts there. Optional chain links and observed "offered after" relationships are not represented as mandatory prerequisites.
- Quest IDs #1008, #1056, #1070, #1085, and #1134 already appear under Ashenvale. They retain the same IDs so one completion applies in both tabs. Existing records were left unchanged.

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
