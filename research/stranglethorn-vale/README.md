# Stranglethorn Vale

Researched November 16, 2026. **156 quest entries** are added under **Zones**, using current Forever quest pages, the two public zone indexes, and Questie's baseline, generated corrections, and player observations at revision `e1652ce62113c152da682baf2d6fb85f1396bcfb`. The current pages report build **1.60.1.70938**. Maintained data: [quests.json](../../data/quests.json). This addition does not include a map or drops view.

## Coverage

All **173 quests** in the [current ForeverChanges zone index](https://foreverchanges.pro/quests/stranglethorn-vale) are accounted for:

| Decision | Entries |
| --- | ---: |
| Included | 117 |
| Horde-only | 27 |
| Classes other than Rogue | 24 |
| Older duplicate quest variants | 5 |

The comparison also checks every active generated Stranglethorn zone assignment and quests offered by NPCs/objects with Stranglethorn positions. That finds quests filed under professions, class, dungeon, and other zone categories. The [secondary ForeverDB index](https://foreverdb.net/quests/stranglethorn-vale) contributes two additional shared Krazek dungeon quests already verified in the tracker. **39 entries beyond the main index** are included. Across both indexes and the primary starter scan, the [ledger](sources.json) accounts for **259 candidates**: 156 included, 41 Horde-only, 54 other-class, five duplicate variants, two holiday deliveries outside this zone, and one unresolved quest.

Included groups cover the hunting masteries, Rebel Camp, Booty Bay and Bloodsail routes, Kurzen, troll tablets, Green Hills chapters, arena, item-started quests, profession hand-ins, fishing contest, two local Lunar Festival elders, Zul'Gurub reputation hand-ins, and all seven inspected Rogue-specific Zandalar armor/talisman quests. Professions, events, and Rogue upgrades have concise expanded subtitles. Bloodsail allegiance is not the Horde faction; its eligible quests remain included with their reputation objectives.

Newer Forever quests include the Cook in the Cage/Returning to Port chain, Anything of Value, Zimmix's rescue chain, Twice Misplaced Trust, Noise Complaints, Reduce, Reuse, Reconcile, Lost Shipping Crate, the mystical-note item starts, In Demand, and Talk of the Town. The starter scan finds the three-step **We've Been Robbed! (95325) → The Big Payback (95326) → All's Well That Ends Well (95327)**, omitted by the main zone index. The middle step starts at **Venture Co. Ledger, 42.7, 18.5**; the other two start with Caravaneer Ruzzgot in Booty Bay. The earlier Get the Goods remains an external Riverglades reference.

Other additions include Galvan's six Blacksmithing quests, Booty Bay delivery/handoff quests, four Rogue talisman upgrades, Fishing Extravaganza hand-ins, and Flipfin's three Tip the Scales exchanges. Their published quest level **0** remains explicitly unconfirmed; it is not replaced with an invented level. Show Me the Money! (83934) is corroborated by the current [Wowhead Forever tooltip](https://nether.wowhead.com/forever/tooltip/quest/83934) and primary observations, despite its missing public quest page. Level 60/minimum 55 and shared access retain community-reference provenance.

**State Secrets (96379)** is not added: a current tooltip establishes its name and Document Box requirement, and player traces identify Rix Xizzix in Booty Bay as a starter, but no reliable level or faction/class eligibility was established. Winter's Presents and New Year Celebrations are not included merely because a multi-location Wonderform Operator has a Stranglethorn spawn: their current pickup/delivery records concern Stormwind/Ironforge. The two local Lunar Festival elders do have actual Stranglethorn objectives.

## Duplicate selection

| Older ID excluded | Version selected |
| --- | --- |
| 614 — The Captain's Chest | 8551 |
| 620 — The Monogrammed Sash | 8552 |
| 615 — The Captain's Cutlass | 8553 |
| 618 — Facing Negolash | 8554 |
| 7908 — Arena Master | 7810 |

The selected versions have actual item/NPC starters. The older chest/cutlass/Negolash versions have no baseline starter, and player relationship traces explicitly associate their completion with the selected counterpart. Arena 7908 has no recorded starter; item-started 7810 is retained. This is a tracker selection, not proof that the server deleted those records. Completion is not transferred between different IDs. **Enticing Negolash (619)** and **Stranglethorn Fever (349)** are distinct event steps and are retained, rather than deduplicated by name.

## Prerequisites and shared progress

There are **97 recorded backward links** on the added entries. Explicit baseline prerequisites retain **Classic reference** provenance. Questie's inferred handoffs remain **Earlier in chain / observed order**, not mandatory requirements. Reverse links are derived by the app. Multiple `preQuestSingle` values mean alternatives in Questie and are not silently presented as simultaneous mandatory requirements. Big Game Hunter correctly requires all three final hunting masteries; An OOX of Your Own requires the three rescue completions; Galvan's reward requires the three crafting tasks. Chapter requests and the Negolash summoning event do not require completion of the parent quest they help finish.

Six quests share existing IDs with other lists:

- The Caravan Road (1041), already in Ashenvale.
- Cherry for Your Thoughts? (79236) and No Honor Among Thieves (79242), already in Desolace. Their earlier On the Lam/Highway Robbery chain links back to that list.
- An Acquaintance in Southshore (95786), Shady Saltseers (95789), and The Saltseer Captain (95791), already in The Drowned City. The Southshore handoff links to the existing dungeon chain; the two Krazek quests are shared-access dungeon quests, not Horde variants.

These six entries copy the existing quest records with only their list assignment changed. Other lists, every existing quest record, drops, maps, saved IDs, and the browser storage key are preserved. The tracker now has **648 list entries / 621 unique quest IDs**.

## Field verification and limits

Individual pages supply current names, levels, minimum levels, objectives, faction, class restrictions, and pickup references. Classic fallback text/positions retain their provenance. Actual outside starters remain in their proper area: Ansirem in Alterac Mountains, Talk of the Town in Hillsbrad, and Confront Yeh'kinya in Tanaris. Item pickup positions remain blank unless the source records one; a turn-in NPC is not used as the item giver. Nat's Measuring Tape and the Heart of Hakkar retain Zul'Gurub pickup areas.

Noise Complaints starts with **Knaz Blunderflame (8679)**. Reduce, Reuse, Reconcile is offered by **Gnaz Blunderflame (2687)** in player traces, although its objective text names Knaz. The two actual starter identities are preserved; their nearby positions are approximate Classic references. Pix Xizzix and Flipfin use current player-observed Stranglethorn positions. Unknown item #213127 is displayed by ID rather than inventing an item name.

For quests whose objective prose is empty, concise instructions use the page's required items, reputation, dialogue, and primary records. Rogue talisman and Dressing the Part reputation conditions retain Classic-reference provenance where the current page does not expose them. Current required-item counts take precedence over old dialogue; Zanza's Potent Potables currently requires one token even though its older text mentions three. Repeatable and event records are included as quest references; the checkbox remains a manual completed/not-completed flag, not a daily reset or contest timer. No event schedule is asserted as verified Forever behavior.

The secondary index's Horde dungeon records 95775 and 95776 remain excluded, as do their Horde introduction chains. Their individual page fetches returned 403; primary race restrictions and existing dungeon research establish the exclusion. ForeverDB's compiled data modules were also blocked here. The main current pages, primary records, preserved earlier verified entries, and current tooltips supply the actual field evidence; blocked endpoints are not claimed as verification.

[sources.json](sources.json) preserves each candidate's decision, extracted page facts, source revisions, and inspected-file hashes. [primary-records.json](primary-records.json) preserves relevant baseline/correction/observation blocks. Coverage is bounded by these inspected sources; it does not prove no undocumented quest exists.
