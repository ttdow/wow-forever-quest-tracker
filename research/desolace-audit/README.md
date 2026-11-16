# Desolace completeness audit

Audited November 15, 2026 against the current published build, **1.60.1.70938**, the [Desolace quest index](https://foreverchanges.pro/quests/desolace), individual quest pages, and [Questie primary data at revision 4dbb824](https://github.com/Questie/QuestieDB/tree/4dbb82440a27856f8dccf57094a5d792cdc7cc9b).

The tracker now contains **49 Desolace quests**, up from 33. All **82 indexed quests** are accounted for: **46 included**, **13 Magram-route quests excluded**, and **23 Horde-only quests or variants excluded**. Three associated introductions/handoffs bring the list to 49: Reclaimers' Business in Desolace (1453), Valley of Bones (93034), and The Visiting Mage (93464). The [source ledger](sources.json) records all 85 candidates, page facts, primary observations, relationships, and source hashes.

## Added quests

| Group | Quests |
| --- | --- |
| Gelkis material hand-ins | Mysterious Mysticism (92755), I Need a Tailor (92814), Leather Technique (92817) |
| Centaur reputation | Carved Centaur Totems (93224), Buying Friendship: Gelkis (93227), Economic Warfare (92812) |
| Gelkis / Shen'dralas handoffs | Valley of Bones (93034), A Cleansing Cry (93044), Test Your Theory (93045), Khan Jehn (93128) |
| Shared quests and Alliance delivery | Vahlarriel's Vengeance (97284), Umarak's Khan Hratha (96222), Lost Shipping Crate (94841) |
| Shared Draenethyst chain | The Visiting Mage (93464), Notes on Draenethyst (93465), Abridged Notes on Draenethyst (93678) |

The user examples are confirmed by both their current pages and primary quest observations:

- **Mysterious Mysticism:** bring **3 Greater Mystic Essences** to **Halea**, Gelkis Village.
- **I Need a Tailor:** bring **1 White Bandit Mask** to **Molkar**, Gelkis Village.
- **Leather Technique:** bring **1 Barbaric Harness** to **Talra**, Gelkis Village.

All three are level 35, minimum level 30, and explicitly list both factions. No class or profession requirement is recorded in the inspected quest fields; profession-themed rewards alone are not treated as an access restriction. Gelkis reputation conditions remain in their objectives. Their observed earlier step is Stealing Supplies (1370); they are parallel hand-ins, not an invented three-quest sequence.

## Factions and route choices

Current explicit faction labels take precedence over older inconsistent generated flags. Economic Warfare (92812) lists both factions, turns in five Carved Centaur Totems to Gelkis quartermaster Molkar, rewards Gelkis reputation in the trace, and has the Alliance Buying Friendship (93227) among its observed predecessors. Its old Horde flag is retained as a documented conflict, not used to discard the shared hand-in. Its published level is **0 / unconfirmed**, minimum 1; the older generated level 60 is not asserted as verified.

Buying Friendship's alternatives are faction variants. Only the Captain Pentigast → Gelkis version (93227) and its Alliance Carved Centaur Totems predecessor (93224) are selected. Gurda Wildmane's counterpart (94873) is excluded despite its broad current Both factions label: its starter, primary Horde race flag, and Horde introduction identify it as the other faction's variant. The two faction predecessors are not displayed as simultaneous mandatory requirements.

The neutral **Umarak Khan Hratha (96222)** is distinct from the retained Classic Gelkis version (1380) and the excluded Magram version (1381). Its own page describes challenging Khan Hratha in the Valley of Spears, with no Magram allegiance requirement recorded. Matching names alone do not merge quest IDs or determine allegiance.

The Draenethyst pages explicitly support both factions, including The Visiting Mage and the earlier Draenethyst Crystals (1389). Their giver Magtoor is shared. This resolves the older Horde flag on Notes on Draenethyst without including a Horde-gated chain. Draenethyst Crystals remains an external earlier-quest reference because its objective is entirely in Swamp of Sorrows; The Visiting Mage is included as the direct Desolace introduction.

Hate the Hatefury (97265), formerly unresolved in the older export, is now explicitly Horde and starts in Shadowprey Village. It stays excluded. All original Magram exclusions remain excluded, together with the newer Magram crafting, crown, Khan Jehn, and reputation variants. No class-restricted candidate was added.

## Locations, links, and limits

NPC starts are checked against current pages and primary quest/NPC observations. Lost Shipping Crate uses its **pickup object** at 64.7, 10.3 in Desolace, rather than the Riverglades turn-in. Azore Aldamort's 38.9, 27.2 position is an approximate Classic NPC reference. Halea's quest text names Gelkis Village, but her only NPC trace pin is 69.8, 78.0, conflicting with that location. Her coordinates remain blank until that conflict is resolved. Molkar and Talra have consistent Gelkis positions.

Questie's relation traces explicitly describe inferred handoffs as assumptions. Added links therefore use `previousQuests` / **Offered after**, not confirmed mandatory `prerequisites`. The app derives reverse links automatically, including cross-list links into Shen'dralas. The four duplicated Gelkis handoffs retain the same IDs and share completion across lists.

Observed quest starts for NPCs placed in Desolace were also compared with the index. The additional out-of-index starts found there are already excluded Magram / Shen'dralas steps, not additional eligible Desolace quests. This is coverage against the current public index and observed records, not proof that no undiscovered quest exists.

All 33 existing Desolace records and all records in other lists remain unchanged. Completion storage and saved IDs are unchanged, including historical removed IDs. No runtime, CSV conversion, or server dependency is introduced.
