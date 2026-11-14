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

The counts and broad equipment scope in the original import sections below describe the initial research. The later **Boss-specific equipment refinement** section records the current inclusion rule and counts.

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

## Gnomeregan and Excavation Site: Wetlands

Researched November 10, 2026 using ForeverDB's [Gnomeregan guide](https://foreverdb.net/dungeon/90-gnomeregan), [Excavation Site: Wetlands guide](https://foreverdb.net/dungeon/2998-excavation-site-wetlands), their public dungeon/quest records, individual quest guides, and current-client item records (build 1.60.1.70862). Each added record links its sources. Existing quest IDs and completion storage are unchanged.

Gnomeregan includes the 20 Alliance/neutral dungeon-index entries, plus the immediate Gnome Improvement follow-up (#2948). This covers Techbot, Gnogaine, Data Rescue, Essential Artificials, Gyrodrillmatic Excavationators, A Fine Mess, the ring chain, The Grand Betrayal, and the Sparklematic steps. The four Horde-only entries (#2841, #2842, #2843, #2949) and the Horde ring follow-up (#2950) are excluded. All included quests have no class restriction.

The Sparklematic entries are separate machine and result-step IDs, not six different objectives: #2951 → #2952 (object #142487), #4601 → #4605 (object #175084), and #4602 → #4606 (object #175085). Their expanded stages distinguish the machine and step. The result objectives summarize the recorded completion text; they are not incorrectly described as another item deposit. The source does not mark these entries repeatable. All six are Classic-reference records.

Gnomeregan has nine quests with Forever observations and twelve Classic-reference quests. Individual objectives and pickup locations can still be Classic references even when the quest itself was observed. Ozzie Togglevolt's observed position from The Day After is used for his related quests, with separate location provenance. Indoor and item-started quests have no invented outdoor coordinates. The Grime-Encrusted Ring's Dark Iron Agent drop source is observed in the dungeon record. Explicit requirements and chain links are retained; the observed "offered after Underground Assault" link on Gyrodrillmatic Excavationators is not asserted to be a prerequisite.

Excavation Site: Wetlands includes Highland Hides (#98815), Horrors in the Highland (#95646), Lost in the Thicket Things (#95647), Seeking Caitlin (#95737), and Songblade Search (#95772). All five have observed Alliance classification, quest levels, objectives, and NPC pickup coordinates, with no class restriction. Their minimum levels are unknown and are not guessed. Seeking Caitlin starts with Llana in Astranaar, and Songblade Search starts with Dorin Songblade in Lakeshire; their actual pickup areas are shown. Changing Tastes (#95697) and Earthen Echo (#98823) are Horde-only and excluded. Lost in the Thicket Things has only an observed "offered after Seeking Caitlin" relationship, so it is not presented as a confirmed required prerequisite.

Gnomeregan adds 19 equipment entries: four observed sources and fifteen Classic-reference sources; thirteen are Rogue-usable. All five primary bosses, the Dark Iron Ambassador, and named creature sources have cards. Excavation Site: Wetlands adds seven equipment entries, all with observed sources; six are Rogue-usable. Saltspine, Shadetooth, and Relic Guardian have confirmed equipment. Highland Horror currently has only a lockbox observation and therefore no equipment card. Four generic equipment drops have no confirmed creature source and remain in the unspecified-source card.

Gnomeregan's client-only Thermaplugg association (#274068) and all six speculative Excavation Site associations (#273022, #273023, #273026–#273029, including Golemsight Long Gun) are excluded. Lockboxes, schematics, materials, quest items, poor/common equipment, and quest rewards are excluded under the existing equipment-only rule. Current item stats are used independently of source evidence; random enchantment variants are not enumerated.

## Boss-specific equipment refinement

Updated November 10, 2026 to show only boss-specific equipment at the user's request. A recorded drop from a boss does not by itself make an item part of that boss's distinctive loot table. Generic green equipment is removed from every dungeon, including Archer's Gloves from Thermaplugg and the generic greens observed on other bosses. Woodworking Gloves (#1945, Sneed) and Metalworking Gloves (#1944, Gilnid) remain because they are boss-specific uncommon items; this is not simply a quality cutoff.

Generic rare world equipment is also excluded: Antipodean Rod (#2879) was observed on Geilhast, but is not a boss-specific drop. All unspecified-source equipment and ordinary trash-source entries are removed, including dungeon-specific trash equipment. Named rare bosses (Miner Johnson, Bruegal Ironknuckle, and Dark Iron Ambassador) retain their specific loot cards. No item is reassigned to an invented boss.

The current lists contain 101 equipment entries: Deadmines 31, Wailing Caverns 21, Blackfathom Deeps 21, The Stockades 9, Gnomeregan 16, and Excavation Site: Wetlands 3. This removes 75 entries from the original 176. Remaining item stats, source evidence, and Rogue eligibility are unchanged. Quest records, prerequisite navigation, and completion storage are unchanged.

## Ashenvale faction correction

On November 10, 2026, all 52 tracked Ashenvale quest IDs were checked against current ForeverDB quest guides. Forty-nine were classified Alliance; Never Coming Back (#98251), A Void Path (#98252), and Vengeful Trail (#98417) had blank faction fields and race mask 0. Those blank values did not establish neutral eligibility.

The user confirmed that Never Coming Back and A Void Path are Horde-only. Both Va'xug Firefure quests were removed from Ashenvale based on that correction; the public guides' missing faction values are not presented as proof of Alliance availability. Ashenvale now has 50 entries. Vengeful Trail remains with its faction unverified. No remaining prerequisite or chain reference points to either removed quest. Existing completion storage is preserved, including any previously saved IDs.

## Desolace

Researched November 11, 2026 from [ForeverDB's Desolace quest list](https://foreverdb.net/quests/desolace), its public zone JSON, and the individual quest guides linked in each added record. All 57 zone-index quest IDs were checked for faction, race mask, class restrictions, objectives, givers, pickup coordinates, and chain relationships.

The list includes 38 eligible zone-index quests plus Reclaimers' Business in Desolace (#1453), the direct Alliance introduction from Roetten Stonehammer in Ironforge. The 39 entries comprise 22 Alliance quests and 17 explicitly unrestricted quests with race mask 255. All have no class restriction. Eighteen Horde-only zone entries are excluded. Hate the Hatefury (#97265) is also excluded: it has observations but no recorded giver, faction, or race eligibility. An empty faction and race mask 0 are not sufficient evidence of neutral availability.

Both centaur reputation routes are included and labeled under expanded quest names. Strange Alliance (#1382) and Raid on the Kolkar (#1384) introduce the Gelkis route; Brutal Politics (#1385) and Assault on the Kolkar (#1386) introduce the Magram route. The neutral continuations retain their Alliance route links. The alternate Horde-only introductions Gelkis Alliance (#1368) and Magram Alliance (#1367) are omitted from those links. Reputation conditions remain in objectives and notes; the tracker does not treat both branches as a combined mandatory route.

The Vahlarriel, Karnitol, Reclaimers, Ethel Rethor, and Scarlet Path chains retain their explicit prerequisites and sequence links. Reverse links are derived by the existing app. Brother Anton's introduction starts in Stormwind; the Reclaimers introduction starts in Ironforge. The Karnitol and Reclaimers chains include their immediate return-to-Ironforge steps. The Scarlet Path letter quest starts in Desolace and sends the player to Southshore; the later Scarlet Monastery quest is outside this zone list.

Of the included quests, Reclaimers' Business in Desolace has Forever observations and an observed giver position, while its level is still a Classic reference. The remaining 38 quest guides and pickup locations currently use Classic references. These limits are preserved per field in `evidence`, with approximate location confidence and notes. Caravan coordinates are reference positions for moving NPCs. No missing data or quest restrictions are guessed. Existing quest entries, drop lists, and completion storage are unchanged.

## Excavation Site: Wetlands audit

Audited November 12, 2026 against ForeverDB's full dungeon quest registry, the individual guides, and the Wetlands zone records. The full registry currently associates 14 quests with instance #2998; the narrower dungeon summary lists only eight. Nine registry quests are Alliance and unrestricted by class. The five Horde quests (Changing Tastes, Dragonmaw Rumors, Elder Knowledge, Earthen Echo, and Open the Maw) are excluded.

Added four missing Alliance quests: Fallen in the Fen (#95795), Heartwoven (#95809), Lost Relic Carry (#95810), and Prehistoric Prism (#98824). This completes the nine Alliance registry entries. Known objectives, levels, faction eligibility, and turn-in NPCs are observed in Forever. Quest-start entities and pickup locations are unrecorded for the first three additions; their giver, area, and coordinates remain blank. Dorin Songblade's known turn-in at Lakeshire is included in Fallen in the Fen's objective, without misrepresenting him as its quest giver. Prehistoric Prism starts with Prospector Whelgar at the observed 38.8, 52.3 Wetlands position and leads to High Explorer Magellas in Ironforge. Horrors in the Highland's pickup was refreshed to the current observed 56.3, 40.4 position.

The source records four "Offered after" links: Seeking Caitlin (#95737) → Lost in the Thicket Things (#95647) → Heartwoven (#95809), Songblade Search (#95772) → Fallen in the Fen (#95795), and Lost Relic Carry (#95810) → Prehistoric Prism (#98824). These links are now retained in `previousQuests` with `relation: "Offered after"`. The app labels both backward and derived forward links "observed order" and explains that a mandatory prerequisite is not confirmed. They are not promoted to `prerequisites` or displayed as confirmed unlock requirements.

The user supplied the text of [Gurkenklaus's Wowhead comment #6440044](https://www.wowhead.com/forever/quest=95646/horrors-in-the-highland#comments:id=6440044), dated October 2, 2026, after Wowhead returned HTTP 403 to the direct request. It reports that Horrors in the Highland requires The Greenwarden (#463) → Tramping Paws (#276) → Fire Taboo (#277) → Blisters on the Land (#275), beginning with First Mate Fitzsimmons. All four prerequisite quests are now included, bringing this instance list to 13 entries. Their individual guides independently corroborate Alliance eligibility, no class restriction, objectives, levels, and observed pickup positions.

The existing guide's Greenwarden → Tramping Paws sequence is treated as a required step based on that community report. Tramping Paws → Fire Taboo → Blisters on the Land already have explicit "Complete first" relationships in the guides. Blisters → Horrors is sourced to the supplied comment. References relying on the community report carry `evidence: "community"`, the exact comment URL, and a visible "player report" label in both directions. This preserves the distinction between the report and database-confirmed requirements.

No current guide records a confirmed requirement for Highland Hides (#98815); its empty prerequisite array means unrecorded, not proven prerequisite-free. Alchemical Hazards (#98282), which shares a Caitlin introduction but is not an instance-registry quest, is not added as a speculative instance prerequisite. Existing quest IDs and completion storage are preserved; other zone entries and boss-drop data are unchanged.

## Excavation Site: Wetlands loot audit

Audited November 12, 2026. ForeverDB still marks six boss-themed items as unconfirmed client associations and has player observations for only three boss equipment drops. The accessible Wowhead Forever tooltip records explicitly name the drop boss for all nine items, independently verifying the six missing sources. This supersedes the earlier exclusion of those six items as uncorroborated associations.

- Saltspine: Supple Bellyskin Leggings (#273022), Saltscale Girdle (#273023), Glinteye Slippers (#273024).
- Shadetooth: Raptorclaw Greaves (#273025), Garb of Florid Feathers (#273026), Raptor's Gaze (#273027).
- Relic Guardian: Reliquary Mantle (#273028), Golemsight Long Gun (#273029), Ring of Power Regulation (#273030).

Verification used `https://nether.wowhead.com/forever/tooltip/item/{id}` for each ID; every response includes an explicit "Dropped by" field. Each added record links the corresponding Forever item page, tooltip endpoint, and current ForeverDB item record. The six additions carry `dropEvidence: "wowhead"` and display a linked "Wowhead ref." label. The three existing observations retain their "Seen in Forever" evidence. Reported percentages are not presented as guaranteed drop probabilities.

All nine items' stats and Rogue eligibility were checked against current Forever-client records and proficiency data. This instance's `build` is 1.60.1.70888; other instances retain the root default and their unchanged item records. Six of the nine items are Rogue-usable. Generic equipment, quest rewards, and the Highland Horror lockbox remain excluded. No unverified equipment is assigned to Highland Horror. The tracker now contains 107 boss-specific equipment entries; quest data and completion storage are unchanged.

## Dungeon loading compatibility

After the Gnomeregan loading report, the failure was reproduced using the previous loader with the current JSON: its closed source-label list rejected Wetlands' new `wowhead` evidence and blocked every dungeon because it validated all instances at once. The current release loaded Gnomeregan's 16 items correctly. The loader now validates only the requested dungeon and displays unfamiliar evidence values as a neutral "Source ref." label. Retry discards cached drop data and fetches it again. Asset URLs are bumped to version 16 so a freshly opened release link loads the fix. Quest/item records and completion storage are unchanged.

Version 17 removes source-evidence metadata from validation entirely. Missing, empty, whitespace-only, unknown, and non-string `dropEvidence` values use the neutral display fallback without preventing valid equipment from rendering. Recognized evidence labels retain their current display. This metadata cannot block a dungeon's drops.

## The City of Dalaran

Researched November 12, 2026 using [ForeverDB's dungeon guide](https://foreverdb.net/dungeon/2959-city-of-dalaran), its full quest registry, individual quest guides, Wowhead Forever quest/item tooltip records, and [All The Things' Dalaran database at revision e887481](https://github.com/ATTWoWAddon/AllTheThings/blob/e8874812c8a9f9db0c65979c51eb8e9782915c98/.contrib/.db/forever/dungeons%20%26%20raids/city%20of%20dalaran.lua). Each added quest and item links its sources.

Included six Alliance quests: An Alarming Request (#92432), A Green Sample (#92456), Starving Arcane (#92457), Heart of Disruption (#92458), Friend of the Kirin Tor (#92459), and Power Overwhelming (#92489). All have no class restriction in the quest guides. The addon explicitly classifies all six as Alliance, resolving blank faction fields for the Modera chain. Opportunistic Education (#96987) is explicitly Horde-only in the addon despite its unclassified guide record, and is excluded along with the Horde Heart of Disruption (#96984), Source of Power (#96988), and The Grave Knight (#96986). Horde introductions/follow-ups are excluded. The created-only duplicate Friend of the Kirin Tor (#93689) is not treated as an observed available quest.

The addon records An Alarming Request as required for both Starving Arcane and the Alliance Heart of Disruption. Friend of the Kirin Tor requires that Heart of Disruption. These three relationships are stored as prerequisites with `evidence: "community"` and the pinned addon URL. The existing app displays their source as "player report" and links them in both directions. The introduction and immediate follow-up are included without adding unrelated world quest chains.

An Alarming Request's giver (Emissary Jacques, 48.3, 60.1 in Hillsbrad Foothills) and A Green Sample's giver (Shylamiir, 31.4, 63.0 in Stormwind) come from the addon. Shylamiir's position is also independently observed as the turn-in NPC in the quest guide; the quest-start provenance remains community data. Wowhead's tooltip supplies the missing objective text for both quests. Other givers and pickup positions have Forever observations. All six quest levels are 33 in the guides; minimum levels are unrecorded and are not inferred from the addon's `lvl` field.

Added 24 boss-specific equipment drops, three each from Arcane Anomaly, Fel Ancient, Mana Devourer, Arcanic Enigma, Unstable Sentinel, Lyn the Ignored, Atrexis the Grave Knight, and Shade of the Archmage. Wowhead's Forever item tooltips explicitly verify every boss association, and the addon corroborates the full equipment tables. This includes Spine of the Devourer (#273040), which is missing from ForeverDB's loot list, and thirteen items without a recorded player drop source there. Eleven items retain observed-source evidence; the other thirteen use linked Wowhead references. Item stats/effects and Rogue eligibility use Forever client build 1.60.1.70888. Sixteen of the 24 items are Rogue-usable.

Arcanic Enigma is the current name used by Wowhead and the addon for the encounter called Mana Elemental in ForeverDB (encounter #3301, creature #246016). Its boss card uses Arcanic Enigma; Power Overwhelming names both forms to keep the objective recognizable. Mana Wraith has no verified equipment table in these records, so no equipment or card is invented for it. Lyn's summoned-boss equipment is included. Generic world equipment (including Brawler Gloves), ordinary trash drops, quest rewards, blueprints, and non-equipment are excluded. Other quest/drop records and completion storage are unchanged. Source metadata remains optional and non-blocking.

## Ashenvale completeness audit

Audited November 13, 2026 after the user identified Shared Fury. Sources included ForeverDB's 80-entry Ashenvale zone index; [Questie's primary Forever quest data](https://github.com/Questie/QuestieDB/blob/master/data/Forever/foreverQuestDB.lua); [the new-quest dataset at YeaBwoi revision 0107568](https://github.com/logie-github/YeaBwoi/blob/0107568737561b38fbff21b23d69e9a34980f6a2/warcraft/modules/mod-forever-quests/data/forever/quests.json), which documents its QuestieDB and Foreverchanges/Wowhead imports; [Wayforth's Alliance guide at revision 9e42d3e](https://github.com/PhatZero/Wayforth/blob/9e42d3eadfd105c91c816c6a45d9cd70a07c70f3/clients/forever/guides/KalimdorAlliance.lua); individual quest guides; and Wowhead's Forever quest tooltip.

Shared Fury (#98418) is missing from ForeverDB's zone index and its individual guide is an unknown placeholder. The independent quest dataset records quest level 30, minimum level 23, Alliance race mask 4294967373, and Maseara Autumnmoon (#221269) as giver and turn-in NPC. Wowhead's tooltip confirms killing five each of Xavian Rogues, Felsworn, Betrayers, and Hellcallers before returning to her. The existing observed position for the same NPC on Vengeful Trail is 86.3, 45.8 at Forest Song; its separate provenance is preserved rather than claiming a Shared Fury pickup observation. Wayforth explicitly lists Vengeful Trail (#98417) as its earlier required quest, so that relationship carries community evidence and the pinned guide URL. The earlier Vengeful Trail entry now records the guide's Alliance classification; its ForeverDB faction field remains blank.

The comparison found no additional missing eligible entries among the primary database's 47 quests classified to Ashenvale; they were already tracked. The newer zone index had one missing Alliance tab entry, Seeking Caitlin (#95737), already tracked under Excavation Site: Wetlands. It now also appears in Ashenvale, where Llana gives it. Its existing follow-up links still lead to the dungeon list and its completion is shared.

Six Althalaxx steps were previously visible only in Darkshore even though they start in Ashenvale or send the player there: #967, #970, #973, #1140, #1167, and #981. They now also appear in Ashenvale with their original IDs and shared completion. Their current guides corroborate Alliance eligibility, no class restriction, objectives, and prerequisite links. Pickup coordinates are included with their actual zones; Classic-reference locations remain labeled as such. Entirely Darkshore steps #965, #966, and #1143 remain in Darkshore and are linked across lists as needed.

Horde-only zone entries remain excluded, including the user-confirmed Never Coming Back (#98251) and A Void Path (#98252). The community guide's unclassified Warsong update entries are not mistaken for neutral quests, and its Paladin-only additions (#78089, #78093) are excluded. Ashenvale now has 58 entries: Shared Fury plus seven shared-list additions. The tracker has 358 entries for 347 unique quest IDs. Existing Darkshore, Stonetalon, dungeon, and other quest records are retained; boss-drop data and completion storage are unchanged.

## Shen'dralas and Feralas

Researched November 13, 2026 using [ForeverDB's Feralas zone list](https://foreverdb.net/quests/feralas) and individual guides, current [ForeverChanges quest pages](https://foreverchanges.pro/quests), Questie's generated base/correction data and player traces at [revision 4dbb824](https://github.com/Questie/QuestieDB/tree/4dbb82440a27856f8dccf57094a5d792cdc7cc9b/src/corrections/Forever), and a separate generated zone dataset at [revision b89f085](https://github.com/draindrain/wow-forever-helper/tree/b89f085481bf17b27cc1ce8da287faa96999372e/src/data/generated/quests). Each new quest links its specific sources. Shen'dralas is the new outdoor zone (area ID 16651), not the similarly named Shen'dralar reputation faction. It is absent from ForeverDB's zone index, and its individual guide records are placeholders, so those placeholders are not treated as quest evidence.

Shen'dralas includes all 19 zone entries plus A Conqueror's Crown (#92743), A Cleansing Cry (#93044), Test Your Theory (#93045), and the two different Khan Jehn endings (#93128, #93196). Those five are adjacent handoffs classified under Desolace, and their actual pickup areas are displayed. The Gelkis route connects back to the existing Desolace Ongeku (#1373), and the Magram route connects through A Conqueror's Crown to the existing Broken Tears (#1369). Both reputation routes are labeled in expanded quest stages. No class restrictions are recorded for these new quests in the primary data.

Faction data for Shen'dralas is inconsistent across older exports: the secondary zone snapshot labels some Magram quests Alliance and Saving Our Own, Bone Burying, and Checking Things Out Horde; Questie's generated base also contains both older Horde flags and explicitly unresolved/defaulted race values. Those defaults alone are not treated as proof of shared access. The current published ForeverChanges pages (build 1.60.1.70938) were checked individually and explicitly list all 24 included quests as available to both factions. Their current listings take precedence over the older snapshot, and conflicting older flags are retained in the record notes where applicable. As a cross-check, the same source correctly identifies the known Horde-only Never Coming Back, A Void Path, and Opportunistic Education. Faction provenance remains `foreverchanges`, rather than being misrepresented as directly observed eligibility on the user's character.

Questie quest-relation traces explicitly describe their generated links as assumptions based on observed handoffs and offer order, even when they populate `preQuestSingle` or `preQuestGroup`. Accordingly, all new Shen'dralas links go in `previousQuests` with `relation: "Offered after"` and community evidence. They display "observed order" in both directions and are not promoted to mandatory prerequisites. No dependency is invented for the standalone escort Going Home (#93125).

Quest-start NPCs are corroborated by Questie's quest and NPC traces. Shen'dralas coordinates use the area-16651 positions, including Orgrul at 35.7, 12.7, Nerlokh at 20.9, 22.7, Hagiak at 59.3, 53.9, and Rokren at 34.1, 77.9. Orgrul also has an older Desolace coordinate; that coordinate is not substituted for his position on the new zone map. The unusual requirement of 426 bones in Mountain of Bones and Proof of Concept is preserved because it appears in both the current public quest page and primary quest data. Published minimum levels take precedence over older base values where they differ.

Feralas includes 52 Alliance/neutral quests. The selection compares the 76-entry ForeverDB zone index, a 79-entry secondary zone dataset, primary quest fields, and the current pages for entries missing from the first source. It includes Pristine Yeti Hide (#7735), To the Top (#3567), The Videre Elixir (#4041), the two repeatable Zorbin quests (#7725, #7726), and the alternate Stormwind Jonespyre's Request introduction (#3787), as well as the ordinary Feathermoon, courier, Equinex, Sprite Darter, and OOX chains. Primary race/class fields and current faction listings exclude Horde-only and non-Rogue class quests. Primary-data comparison found no further missing eligible quests classified directly to Feralas.

Confirmed Feralas requirements retain their explicit prerequisite links; optional chain links and observed offers stay separate. The repeatable Again With the Zapped Giants requires Zapped Giants, and Refuel for the Zapping requires Fuel for the Zapping. Item-started quests retain the item as giver without invented coordinates. Cross-zone library, Gadgetzan, Thousand Needles, Hinterlands, Stormwind, and Darnassus steps show their actual pickup areas. Most older Feralas details and coordinates remain Classic references and are marked approximate. Current pages place Pristine Pesterhide Pelts and Packaged Pristine Pelts at quest level 31/minimum 27, superseding the older level-29 records; their pickup remains Kristy Grant at the Thalanaar border in Feralas even though their category is Thousand Needles. Repeatable quests use the existing checkbox behavior to track one completion and do not reset automatically.

The two lists add 76 new quest IDs, bringing the tracker to 434 entries for 423 unique IDs. Other quest records, all boss-drop data, and the completion-storage key are unchanged. These are outdoor quest lists and do not add dungeon Drops views.
## Razorfen Kraul and Scarlet Monastery Graveyard / Library

Researched November 13, 2026. Added 8 Alliance/neutral quest entries and 48 boss-specific equipment entries. Existing quest IDs and completion storage are unchanged.

Sources: [Razorfen Kraul guide](https://foreverdb.net/dungeon/47-razorfen-kraul), [Scarlet Monastery guide](https://foreverdb.net/dungeon/189-scarlet-monastery), their full dungeon/quest registries, individual ForeverDB quest guides and item client records, current [ForeverChanges quest pages](https://foreverchanges.pro/quest/96800), and explicit "Dropped by" lines in Wowhead Forever item tooltips. Equipment records link their individual tooltip and public item pages. Client stats use build 1.60.1.70938; older dungeon stats are not implicitly refreshed.

Community cross-checks use All The Things revision `f106587a91ffec3967b34eb8cfa02a3dffcd9299`: [Razorfen Kraul](https://github.com/ATTWoWAddon/AllTheThings/blob/f106587a91ffec3967b34eb8cfa02a3dffcd9299/.contrib/.db/forever/dungeons%20%26%20raids/razorfen%20kraul.lua) and [Scarlet Monastery](https://github.com/ATTWoWAddon/AllTheThings/blob/f106587a91ffec3967b34eb8cfa02a3dffcd9299/.contrib/.db/forever/dungeons%20%26%20raids/scarlet%20monastery.lua). Quest faction/class checks use the full quest registry, supplemented by current ForeverChanges pages. No non-Rogue class quests are included.

- **Razorfen Kraul:** Blueleaf Tubers (1221), Mortality Wanes (1142), Willix the Importer (1144), The Crone of the Kraul (1101), and its prerequisite Lonebrow's Journal (1100). Going, Going, Guano! (1109), A Vengeful Fate (1102), and An Unholy Alliance (6522) are Horde-only and excluded. Blueleaf's link to Raptor Horns (865, already in Wailing Caverns) is observed offer order, not a confirmed requirement. The Crone explicitly requires Lonebrow's Journal. The journal's pickup is an item at the Great Lift, not its Feralas turn-in; coordinates 30.7, 24.3 in Thousand Needles are the Classic reference on the current ForeverChanges map. Heralath and Willix start inside the instance; no outdoor coordinates are assigned to them.
- **Graveyard:** no verified Alliance/Rogue quests. Vorrel's Revenge (1051) is Horde-only. This tab opens on Drops without inventing a quest placeholder. Its Quests view explains the absence. Library quests are not duplicated into Graveyard.
- **Library:** Mythology of the Titans (1050), In the Name of the Light (1053), and Past Due (96800). Past Due's current page explicitly gives Alliance, minimum level 30, Magus Olvek, and pickup coordinates 9.8, 63.0 in Alterac Mountains; its description identifies Doan as the borrower of the missing book. No specific book drop mechanism is assumed. In the Name of the Light requires Down the Scarlet Path (1052), linked to its existing Desolace record; its objective explicitly spans Library, Armory, and Cathedral. Horde Compendium of the Fallen (1049), Test of Lore (1160), Hearts of Zeal (1113), Into the Scarlet Monastery (1048), and Mage-only Rituals of Power (1951) are excluded.
- **Equipment:** Razorfen Kraul has 23 items across 8 boss cards, including rare Earthcaller Halmgar and Blind Hunter. Graveyard has 15 across 5 cards, including rare Fallen Champion, Azshir the Sleepless, and Ironspine. Library has 10 across Houndmaster Loksey and Arcanist Doan. All 48 associations have explicit matching Wowhead Forever boss-source lines. Current client proficiencies yield 17, 10, and 8 Rogue-usable entries respectively. New/reworked Forever items and unique green boss equipment are included, including Robe of Doan, Mantle of Doan, and Library Walkers.
- **Exclusions:** Armor Piercer (6679) is attributed to ordinary Razorfen Spearhide guards by its tooltip and the addon, despite a ForeverDB encounter observation under Ramtusk. Wisdom's Leather Helm (252515) is generic world equipment without an explicit boss-source line, despite a Thalnos observation. Both are excluded, along with other generic greens/blues, ordinary trash, recipes, quest rewards/items, and consumables. Observed drop counts are evidence of a source, not reliable drop-rate estimates.

The three new drop groups retain optional source labels. Missing or unfamiliar labels cannot prevent a list loading. Scarlet Monastery wings share instance ID 189 but have separate wing metadata and equipment arrays.

## The Drowned City and Scarlet Monastery Armory

Researched November 14, 2026. Added nine list entries (eight new quest IDs) and 19 boss-specific equipment drops. The tracker now has 451 quest entries / 439 unique IDs and 198 equipment entries. Existing records and completion storage remain unchanged.

The Drowned City is instance **2970**, area **16550**. Sources: current [ForeverChanges quest pages](https://foreverchanges.pro/quest/95787); QuestieDB revision `4dbb82440a27856f8dccf57094a5d792cdc7cc9b` ([generated quest fields](https://github.com/Questie/QuestieDB/blob/4dbb82440a27856f8dccf57094a5d792cdc7cc9b/src/corrections/Forever/generated/foreverBaseQuest.lua), [quest traces](https://github.com/Questie/QuestieDB/blob/4dbb82440a27856f8dccf57094a5d792cdc7cc9b/src/corrections/Forever/traces/foreverQuestTraces.lua), [relationship traces](https://github.com/Questie/QuestieDB/blob/4dbb82440a27856f8dccf57094a5d792cdc7cc9b/src/corrections/Forever/traces/foreverQuestRelationTraces.lua)); and All The Things revision `36684dda55e4aa297de3ea24475a77687b54c620` ([Drowned City](https://github.com/ATTWoWAddon/AllTheThings/blob/36684dda55e4aa297de3ea24475a77687b54c620/.contrib/.db/forever/dungeons%20%26%20raids/the%20drowned%20city.lua), [Scarlet Monastery](https://github.com/ATTWoWAddon/AllTheThings/blob/36684dda55e4aa297de3ea24475a77687b54c620/.contrib/.db/forever/dungeons%20%26%20raids/scarlet%20monastery.lua)). Individual quest and item records retain direct source links.

### Quests and relationships

- Drowned City includes An Acquaintance in Southshore (95786), Take Two With Water (95787), Magics of the Drowned City (95788), Shady Saltseers (95789), The Saltseer Captain (95791), Ancient Gurubashi Secrets (97130), The Web of Magic (95798), and Findings for the Explorer's League (95799). Current pages verify level 40 for all eight, minimum levels 30 or 34, and actual quest-start NPCs/coordinates. The two Krazek quests are explicitly available to both factions; the other six are Alliance. No class restriction is recorded in primary quest fields or current pages. Follow-ups retain Southshore as their pickup, rather than incorrectly using the Dalaran/Ironforge destinations.
- Primary-data comparison and the full addon dungeon section identify no additional eligible dungeon quest. Horde-only Locating the Lost City (95770), The Drowned City (95775), The Only Good Brinescale... (95776), A Tale Spun Around the Fire (96078), and Ancient Gurubashi Idol (96774) are excluded. The Drowned City quest title (95775) must not be confused with neutral access to the dungeon itself.
- Questie's traces explicitly call An Acquaintance → Take Two/Magics observed offer-order assumptions. An Acquaintance follows Troll Witchery (205), linked externally because it is not otherwise tracked. The addon contributor report accepted both follow-ups after completing the two Dibbs dungeon quests; these links appear in `previousQuests` with `relation: "Offered after"` and community evidence. They are not promoted to confirmed mandatory prerequisites. Empty prerequisite arrays mean unrecorded, not proof of no requirements.
- Armory adds In the Name of the Light (1053), requiring Down the Scarlet Path (1052) in the existing Desolace list. It is copied from the existing Library entry, retaining the same ID and completion status. Its objective still explicitly spans Library, Armory, and Cathedral. Library's book quests do not belong in Armory. Horde-only Monastery quests and Mage-only Rituals of Power remain excluded.

### Equipment

Drowned City has **15 equipment entries across six boss cards**. Every association was checked against an explicit `Dropped by` line in the current [Wowhead Forever tooltip interface](https://nether.wowhead.com/forever/tooltip/item/274598):

- Zul'Alai: Bloodslash Axe (274598), Oathbound Bracers (274599), Berserker Shackles (274600).
- Var'Taka: Harpoon of Command (274601), Brinebelly Leggings (274602).
- Captain Dreadrise: Dreadfrost Saber (274603), Frosty Blunderbuss (274604), Briny Sash (274605).
- Deathless Marrow: Bloodspine Staff (274606), Viscera Spaulders (274607). These two are missing from the addon's encounter loot groups, but their tooltip explicitly names Deathless Marrow. The addon names that creature (269586) as an idol source. The boss card uses the explicit drop NPC, rather than inventing an association to each Deathless Guardian add in the similarly named encounter.
- Primeval Elemental: Robe of the Drowned (274611), Waterlogged Burial Shroud (274612).
- Min'loth the Serpent: Maw of Min'loth (274608), Serpentbane Crown (274609), Ritual-Binder's Gloves (274610).

The dungeon is absent from ForeverDB's current dungeon index and its individual quest records are placeholders. Those are not evidence of missing in-game content. The [Forever Era guide](https://theforeverera.com/en/dungeons/the-drowned-city/) still says it lacks loot data, so absence there does not override explicit item-source records. The Drops footer links the pinned All The Things record and names its provider accurately.

Drowned City item stats/effects use current Wowhead Forever tooltips, cross-checked against ForeverDB client item records (build 1.60.1.70938). They carry `statsEvidence: "wowhead"` separately from `dropEvidence: "wowhead"`. This matters for Bloodspine Staff: the tooltip gives 71–108 damage at 3.30 seconds and +46 spell power, while the client export gives 96–145 damage and omits that spell-power effect. The displayed values follow the documented tooltip rather than combining incompatible versions. Briny Sash and Viscera Spaulders show total armor including their bonus armor, matching the client totals of 63 and 263. The nine Rogue-usable items include Bloodslash Axe, consistent with Forever's one-handed axe proficiency; staves, polearms, mail, and shields are excluded by the Rogue filter.

Armory has **four Herod items**: Ravager (7717), Herod's Shoulder (7718), Raging Berserker's Helm (7719), and Scarlet Leggings (10330). The first three have explicit matching Wowhead source lines; Scarlet Leggings retains Classic source evidence from ForeverDB's Herod loot table corroborated by the addon, because its current tooltip has no `Dropped by` line. All four use client build 1.60.1.70938 base stats/effects. All are unusable by Rogues, so that filter intentionally has no results. Scarlet Trainee's tabard, recipes, ordinary trash, generic world drops, quest rewards, and non-equipment are excluded. No additional boss equipment is inferred from neighboring item IDs or unconfirmed client associations.

The additions preserve collapsed boss cards, the existing source/class filters, and optional nonblocking source metadata. Quests and Drops remain independent loads; maps and their datasets are unchanged. No Node runtime, build tooling, source CSV files, or new installation is required.

## Razorfen Downs

Researched November 14, 2026. Added nine Alliance/neutral quest entries and 22 boss-specific equipment drops. Totals are now 460 quest entries / 448 unique IDs and 220 equipment entries. Razorfen Downs uses client map/dungeon ID **129**, area **722**; All The Things' internal instance-root ID 233 is a separate identifier and is not substituted for the client map ID.

Sources include the [ForeverDB dungeon guide](https://foreverdb.net/dungeon/129-razorfen-downs) and its full data record (build 1.60.1.70938), individual current [ForeverChanges quest pages](https://foreverchanges.pro/quest/93604), [All The Things at revision 36684dd](https://github.com/ATTWoWAddon/AllTheThings/blob/36684dda55e4aa297de3ea24475a77687b54c620/.contrib/.db/forever/dungeons%20%26%20raids/razorfen%20downs.lua), [Questie's offer-order traces at revision 4dbb824](https://github.com/Questie/QuestieDB/blob/4dbb82440a27856f8dccf57094a5d792cdc7cc9b/src/corrections/Forever/traces/foreverQuestRelationTraces.lua), and explicit `Dropped by` lines in [Wowhead's Forever item tooltips](https://nether.wowhead.com/forever/tooltip/item/274381). Individual data entries retain their source URLs.

### Quests

The six dungeon quests are A Host of Evil (6626, level 35/minimum 28), Scourge of the Downs (3523, 37/32), Extinguishing the Idol (3525, 37/32), Bring the Light (3636, 42/39), The Coldbringer's Eye (96773, 41/34), and Agamaggan's Blood (93604, 45/35). Bring the Light and this version of The Coldbringer's Eye are Alliance-only; the others are shared. The Horde Coldbringer's Eye (97196), Bring the End (3341), and both An Unholy Alliance quests (6521/6522) are excluded. Current quest pages and quest registries record no non-Rogue class restrictions on included quests.

The full addon record adds Agamaggan's Blood and the Alliance Coldbringer's Eye, both missing from ForeverDB's current seven-ID registry. The new quests' identities, objectives, levels, minimum levels, and factions are corroborated by current public quest pages. Older quests retain Classic-reference provenance where the page says details are unchanged. Myriam Moonsinger's 49.0, 94.9 pickup is on the Barrens approach, outside the instance. Benedictus uses the current page's Classic location 50.3, 45.5 in Stormwind rather than the addon's incompatible 39.6, 27.4. Belnistrasz's quests start inside Razorfen Downs and have no invented outdoor coordinates.

Extinguishing the Idol explicitly requires Scourge of the Downs and links it in both directions. The Agamaggan route includes Word of the Woods (93594, level 43), Rot and Regret (93404, level 49, objectives in Maraudon), and Passing the Blame (93601, level 45); all three are shared quests with minimum level 35. Their actual pickup locations are shown in Shen'dralas, rather than mislabeled as inside Razorfen Downs. Word of the Woods also references earlier Forlorn Gardens (93341) externally. These handoffs are labeled `previousQuests` / `Offered after`, because Questie's traces explicitly classify the links as observed offer-order assumptions. The addon's explicit Passing the Blame → Agamaggan link is corroborating community evidence, not a reason to promote the entire chain to mandatory prerequisites. Kog'thug's pickup at Bristleback Retreat (72.6, 31.4 on Shen'dralas) comes from the addon and is labeled an approximate community reference because the current page has no observed pickup pin.

### Boss equipment

There are **22 equipment entries across seven cards**, all with explicit matching Wowhead Forever boss-source lines:

- Ambassador Bloodrage (rare, outside on the entrance approach): Ambassador's Bloodrobes (286639).
- Tuten'kash: Carapace of Tuten'kash (10775), Silky Spider Cape (10776), Arachnid Gloves (10777).
- Plaguemaw the Rotting: Swine Fists (10760), Plaguerot Sprig (10766), Decaying Flesh Bands (274380). Plaguemaw is tied to the Belnistrasz event.
- Mordresh Fire Eye: Glowing Eye of Mordresh (10769), Mordresh's Lifeless Skull (10770), Deathmage Sash (10771).
- Ragglesnout (rare): X'caliboar (10758), Savage Boar's Guard (10767), Boar Champion's Belt (10768).
- Glutton: Glutton's Cleaver (10772), Fleshhide Shoulders (10774), Abomination Chain (274385).
- Amnennar the Coldbringer: Coldrage Dagger (10761), Robes of the Lich (10762), Icemetal Barbute (10763), Deathchill Armor (10764), Bonefingers (10765), Coldbringer Spine (274381).

The tooltips independently establish the three associations that ForeverDB still labels client clues: Decaying Flesh Bands → Plaguemaw, Abomination Chain → Glutton, and Coldbringer Spine → Amnennar. Ambassador's Bloodrobes is also absent from ForeverDB's loot list but is corroborated by its explicit tooltip and the addon. Four observed equipment sources retain `seen` evidence (Arachnid Gloves, Mordresh's Lifeless Skull, Robes of the Lich, Deathchill Armor); the other 18 use linked Wowhead references. Observed counts and tooltip percentages are not displayed as guaranteed drop probabilities.

Stats/effects use current Wowhead Forever tooltip values, separately marked `statsEvidence: wowhead`, with item identity/type/level cross-checked against client records. The Arachnid Gloves' random enchantment is preserved without inventing an affix. Decaying Flesh Bands retain both negative stats (-6 Stamina and -6 Spirit). Coldbringer Spine includes its tooltip's 63–95 damage at 2.80 seconds, +20 Spirit, +1% hit, and +59 Frost damage. Fourteen items are Rogue-usable, including the one-handed axe Glutton's Cleaver and the held off-hand accessory; plate, mail, shields, two-handed swords, staves, and wands are filtered out.

Generic world equipment, ordinary trash, quest rewards, Skull of the Coldbringer (quest item), recipes, and consumables are excluded. Ambassador Bloodrage is distinguished from Horde quest target Ambassador Malcin. Other lists, maps, existing quest/drop records, completion IDs, and the progress-storage key are unchanged. Source metadata remains optional and cannot block loading.
