# Desolace completeness audit

Audited November 15, 2026 against the current published build, **1.60.1.70938**, the [Desolace quest index](https://foreverchanges.pro/quests/desolace), individual quest pages, and [Questie primary data at revision 4dbb824](https://github.com/Questie/QuestieDB/tree/4dbb82440a27856f8dccf57094a5d792cdc7cc9b).

The tracker now contains **51 Desolace quests**. All **82 indexed quests** are accounted for: **44 included**, **13 Magram-route quests excluded**, **23 Horde-only quests or variants excluded**, and **two legacy Khan versions excluded**. Three associated introductions/handoffs are Reclaimers' Business in Desolace (1453), Valley of Bones (93034), and The Visiting Mage (93464). Four additional generated Desolace quests form the Highway Robbery chain, which the zone index omits. The [source ledger](sources.json) records all **89 candidates**, page facts, primary observations, relationships, and source hashes.

## Legacy Khan cleanup — November 16, 2026

At the user's request, removed the Classic-reference **Khan Jehn (1374)** and **Khan Hratha (1380)** from the active list. Keep the newer Forever **Khan Jehn (93128, Nerlokh)** and **Khan Hratha (96222, Umarak)**. The newer records have Forever observations; the old records retain Classic fallback data. An explicit server disable/removal notice was not found, so this is a tracker selection rather than a claim of proven server deletion. Old map links are removed. Saved IDs remain intact, and completion is not transferred automatically between different quest IDs.

## Highway Robbery correction

The user identified Highway Robbery after the initial audit. The earlier coverage check was too narrow: it used the zone index and NPC traces with explicit positions, missing an object starter and a follow-up NPC whose position comes from baseline data. A comparison of **every uncommented generated Questie Desolace zone assignment** against the initial ledger found these four missing IDs:

- **Highway Robbery (79229):** starts at Extinguished Campfire (417353), **47.5, 54.7** in Desolace; turn in to Bibbly F'utzbuckle at Kormek's Hut.
- **On the Lam (79235):** starts with Bibbly at **62.3, 39.0** in Desolace; sends the player to Tokal in Booty Bay.
- **Cherry for Your Thoughts? (79236):** starts with Tokal, **27.0, 77.4** in Stranglethorn Vale; bring one Cherry Grog. The guide records Nixxrax Fillamug as a vendor.
- **No Honor Among Thieves (79242):** starts with Tokal, **27.0, 77.3** in Stranglethorn Vale; find Illari Duskfeather on the Arathi coast and access her stolen-loot cache. No combat requirement or race-specific dialogue option is invented.

All four current **ForeverDB individual guides** record player observations in WoW Forever, their level 40 objectives, and pickup locations. The campfire and Bibbly have four-player confirmations; Tokal's last pickup position has only one observation and retains approximate confidence. Questie quest, object, NPC, and relation traces independently corroborate the starter identities and sequence. The current ForeverChanges individual routes return 404 and are not treated as evidence for these four.

Minimum level **30** comes from generated Questie fields; the current guides do not record it, so it remains a reference rather than an observed restriction. Questie's all-race flags are explicitly **shared-access inferences** based on its source comparison, not direct server faction proof. No class, profession, or Gelkis/Magram requirement is recorded. That provenance is retained; the chain is not mislabeled as current-page-confirmed Both factions. No Horde or Magram branch is added.

The sequence links use **Offered after**, supported by the guides and Questie's observed handoffs, rather than mandatory prerequisites. Bone Collector is incidentally offered at the same NPC in some observations; its existing standalone record is not made dependent on Highway Robbery. The confirmed campfire is added to the map, and Bibbly's existing marker links the hand-in and next step. Booty Bay coordinates stay labeled as Stranglethorn Vale rather than being projected onto the Desolace map.

## Added quests

| Group | Quests |
| --- | --- |
| Gelkis material hand-ins | Mysterious Mysticism (92755), I Need a Tailor (92814), Leather Technique (92817) |
| Centaur reputation | Carved Centaur Totems (93224), Buying Friendship: Gelkis (93227), Economic Warfare (92812) |
| Gelkis / Shen'dralas handoffs | Valley of Bones (93034), A Cleansing Cry (93044), Test Your Theory (93045), Khan Jehn (93128) |
| Shared quests and Alliance delivery | Vahlarriel's Vengeance (97284), Umarak's Khan Hratha (96222), Lost Shipping Crate (94841) |
| Shared Draenethyst chain | The Visiting Mage (93464), Notes on Draenethyst (93465), Abridged Notes on Draenethyst (93678) |
| Highway Robbery correction | Highway Robbery (79229), On the Lam (79235), Cherry for Your Thoughts? (79236), No Honor Among Thieves (79242) |

The user examples are confirmed by both their current pages and primary quest observations:

- **Mysterious Mysticism:** bring **3 Greater Mystic Essences** to **Halea**, Gelkis Village.
- **I Need a Tailor:** bring **1 White Bandit Mask** to **Molkar**, Gelkis Village.
- **Leather Technique:** bring **1 Barbaric Harness** to **Talra**, Gelkis Village.

All three are level 35, minimum level 30, and explicitly list both factions. No class or profession requirement is recorded in the inspected quest fields; profession-themed rewards alone are not treated as an access restriction. Gelkis reputation conditions remain in their objectives. Their observed earlier step is Stealing Supplies (1370); they are parallel hand-ins, not an invented three-quest sequence.

## Factions and route choices

Current explicit faction labels take precedence over older inconsistent generated flags. Economic Warfare (92812) lists both factions, turns in five Carved Centaur Totems to Gelkis quartermaster Molkar, rewards Gelkis reputation in the trace, and has the Alliance Buying Friendship (93227) among its observed predecessors. Its old Horde flag is retained as a documented conflict, not used to discard the shared hand-in. Its published level is **0 / unconfirmed**, minimum 1; the older generated level 60 is not asserted as verified.

Buying Friendship's alternatives are faction variants. Only the Captain Pentigast → Gelkis version (93227) and its Alliance Carved Centaur Totems predecessor (93224) are selected. Gurda Wildmane's counterpart (94873) is excluded despite its broad current Both factions label: its starter, primary Horde race flag, and Horde introduction identify it as the other faction's variant. The two faction predecessors are not displayed as simultaneous mandatory requirements.

The neutral **Umarak Khan Hratha (96222)** is distinct from the now-excluded Classic Gelkis version (1380) and the excluded Magram version (1381). Its own page describes challenging Khan Hratha in the Valley of Spears, with no Magram allegiance requirement recorded. Matching names alone do not merge quest IDs or determine allegiance.

The Draenethyst pages explicitly support both factions, including The Visiting Mage and the earlier Draenethyst Crystals (1389). Their giver Magtoor is shared. This resolves the older Horde flag on Notes on Draenethyst without including a Horde-gated chain. Draenethyst Crystals remains an external earlier-quest reference because its objective is entirely in Swamp of Sorrows; The Visiting Mage is included as the direct Desolace introduction.

Hate the Hatefury (97265), formerly unresolved in the older export, is now explicitly Horde and starts in Shadowprey Village. It stays excluded. All original Magram exclusions remain excluded, together with the newer Magram crafting, crown, Khan Jehn, and reputation variants. No class-restricted candidate was added.

## Locations, links, and limits

NPC starts are checked against current pages and primary quest/NPC observations. Lost Shipping Crate uses its **pickup object** at 64.7, 10.3 in Desolace, rather than the Riverglades turn-in. Azore Aldamort's 38.9, 27.2 position is an approximate Classic NPC reference. Halea's quest text names Gelkis Village, but her only NPC trace pin is 69.8, 78.0, conflicting with that location. Her coordinates remain blank until that conflict is resolved. Molkar and Talra have consistent Gelkis positions.

Questie's relation traces explicitly describe inferred handoffs as assumptions. Added links therefore use `previousQuests` / **Offered after**, not confirmed mandatory `prerequisites`. The app derives reverse links automatically, including cross-list links into Shen'dralas. The four duplicated Gelkis handoffs retain the same IDs and share completion across lists.

The initial NPC-trace-only comparison found excluded Magram / Shen'dralas steps but failed to include NPC locations inherited from baseline data. The follow-up comparison described above instead checks all generated Desolace zone assignments, including object starts and cross-zone chain pickups. Coverage remains limited to the inspected records, not proof that no undiscovered quest exists.

The 31 retained pre-audit Desolace records and all records in other lists remain unchanged. The two old Khan entries are excluded as described above. Completion storage and saved IDs are unchanged, including historical removed IDs. No runtime, CSV conversion, or server dependency is introduced.
