# Shen'dralas completeness audit

Audited November 15, 2026 against the current published build, 1.60.1.70938. The previous 11-quest Gelkis list was incomplete: it inherited an older 19-entry zone export that omitted shared quests.

The tracker now has **32 Shen'dralas quests**:

- **27** of the 38 quests in the [current zone index](https://foreverchanges.pro/quests/shendralas), after excluding its 11 Magram-route entries.
- **Five associated steps** listed under other categories: A Cleansing Cry (93044), Test Your Theory (93045), the Gelkis Khan Jehn ending (93128), Rot and Regret (93404, Maraudon), and Agamaggan's Blood (93604, Razorfen Downs).

The two Magram-related outside-category steps, A Conqueror's Crown (92743) and the Magram Khan Jehn ending (93196), also remain excluded. This accounts for all **45 inspected candidates: 32 included and 13 excluded**.

## What was missing

The 21 added entries comprise:

| Group | Added quests |
| --- | --- |
| Pylons and temple | Strange Pylons (92914), Fragments of the Pylons (96010), Powering the Pylons (96018), A Brief History Lesson (93016), Meeting the Magister (93394) |
| Phantasmal blade | Phantasmal Problems (93450), Spectral Iron Ore (93546), Tempered Expectations (96060) |
| Historian Biraxas | A Heart of Crystal (99257), Mana Mania (99258) |
| Forlorn Gardens and associated dungeons | Forlorn Gardens (93341), What They've Done to My Peonies (93362), Word of the Woods (93594), Rot and Regret (93404), Passing the Blame (93601), Agamaggan's Blood (93604), Not on Squealing Terms (93606) |
| Item starters | Partially Digested Collar (93568), Corpsefeeder's Carapace (93574), Forlorn Necklace (93609), Tattered Journal (93644) |

Word of the Woods, Rot and Regret, Passing the Blame, and Agamaggan's Blood already appeared in Razorfen Downs. They now also appear in Shen'dralas with the same completion IDs. Existing records in other lists are unchanged.

## Verification

Every indexed candidate and associated step was checked on its individual current [ForeverChanges quest page](https://foreverchanges.pro/quests/shendralas), including objective, starter, level, side, and available coordinates. All added pages explicitly list **Both factions**. No class restriction or Magram minimum reputation is listed for the added shared quests in the inspected page/trace fields. The current explicit side labels take precedence over old exports' unresolved/default race values.

The [Questie primary data at revision 4dbb824](https://github.com/Questie/QuestieDB/tree/4dbb82440a27856f8dccf57094a5d792cdc7cc9b) was checked independently: base/generated quest data, quest traces, NPC traces, and quest-relation traces. Quest starts and ends for NPCs recorded in area **16651** produced no additional quest candidate outside the checked set. This is coverage against the current index and observed primary records, not proof that no undiscovered quest exists.

The source comparison and every inclusion/exclusion are recorded in [sources.json](sources.json), with individual page facts, relationships, revisions, and source hashes. The previous secondary zone export is not used as the completeness boundary.

## Reputation and chains

Only the Magram-specific route is excluded. Shared quests can mention Magram locations without requiring that allegiance: for example, Fragments of the Pylons explicitly visits both clans' villages. None of the new relationships points into the excluded Magram chain.

Questie labels inferred relationships as **assumptions based on observed offers and handoffs**. They therefore appear in `previousQuests` as **Offered after**, not as confirmed mandatory prerequisites. Commented-out relationship fields are ignored; in particular, the disabled 93065 relation is not invented as a prerequisite for Strange Pylons. Reverse links are derived by the existing app.

## Starters and coordinates

Strange Pylons correctly starts at a **Shen'dralar Pylon object**, not at its turn-in NPC. The four item-started quests identify their items as starters. Current item tooltips confirm that those items begin quests; Partially Digested Collar names Prowler as a drop source and Corpsefeeder's Carapace names Corpsefeeder.

No fixed pickup position is established for those item quests, so their coordinate fields stay blank. A turn-in NPC's location is not repurposed as an item pickup location. Missing NPC-start positions are filled from the matching NPC's observed Shen'dralas trace and labeled approximate. Current source levels are retained even when chain steps have differing levels.

All 11 retained Gelkis quests, their Desolace links, and existing completion storage remain intact. No runtime, Node dependency, or CSV source is introduced.
