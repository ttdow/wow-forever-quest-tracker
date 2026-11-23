# WoW: Forever quest tracker

Static HTML, CSS, and JavaScript. No installation, application server, package manager, or build required to use or host it.

Open [the GitHub Pages website](https://ttdow.github.io/wow-forever-quest-tracker/) in Chrome, Firefox, or another modern browser.

- Choose Teldrassil, Darkshore, Ashenvale, Stonetalon Mountains, Desolace, Shen'dralas, Feralas, Stranglethorn Vale, Azshara, Felwood, Riverglades, Deadmines, Wailing Caverns, Blackfathom Deeps, The Stockades, Gnomeregan, Excavation Site: Wetlands, The City of Dalaran, Razorfen Kraul, Razorfen Downs, Scarlet Monastery Graveyard, Scarlet Monastery Library, Scarlet Monastery Armory, Scarlet Monastery Cathedral, The Drowned City, Krol'dok Stronghold, Uldaman, Maraudon, Zul'Farrak, or Alcaz Prison.
- Check a quest to complete it; uncheck it to undo.
- Quests use one line by default. Click a quest name or its chevron to expand or collapse its full details.
- Expanded quests show known prerequisites, quests they unlock, and earlier/later chain steps. Click a tracked quest to jump to its list and expand it; completed quests are marked with a check. Quests outside the tracker link to their ForeverDB guide.
- Search quest names, IDs, givers, areas, coordinates, and objectives.
- Click **Zones**, **Dungeons**, or **Professions** to expand its full list. Zones and dungeons are ordered by suggested minimum level, then maximum level, with completion counts beside each name. Scarlet Monastery wings have separate ranges. Choosing a list collapses the navigation and keeps the current selection visible. Click the same tab again or press Escape to collapse it.
- Choose **Professions → Fishing** for a searchable table of fish, catch locations, water/catch types, minimum Fishing, and no-fail Fishing. Fish with recorded recipes link to Cooking.
- Choose **Professions → Cooking** for 39 fish/shellfish recipe records with Cooking requirements, ingredient quantities, food effects, and learning references. Search or filter by your Cooking skill; ingredients with Fishing records link back to their catch locations. Unverified recipe availability is labeled.
- Choose **Professions → Leatherworking** for 592 WoW Forever recipe records. Check recipes you know and filter by known or needed. Progress saves in this browser. Each row lists crafted item binding, ingredient quantities, skill color thresholds, and available acquisition details. Set a minimum learn skill and maximum grey skill to show recipes whose full skill range fits. [Leatherworking data notes](research/leatherworking/README.md)
- Filter completed / not completed quests, or sort by level, name, or area.
- In dungeon lists, switch between **Quests** and **Drops**. Each boss with recorded equipment has a card with an expandable loot table. Drops have item names, required levels, base stats/effects, and source evidence, with search, source filtering, and an optional Rogue filter.
- In **Desolace**, **Feralas**, **Felwood**, **Gnomeregan**, **Razorfen Kraul**, **Razorfen Downs**, **Scarlet Monastery Library**, **Scarlet Monastery Armory**, **Scarlet Monastery Cathedral**, **The City of Dalaran**, **The Drowned City**, **Uldaman**, **Maraudon**, **Zul'Farrak**, or **Alcaz Prison**, choose **Map** for researched location references. Pan, zoom, filter layers, search, and open markers for coordinates and available quest/drop links. Felwood's map links all 80 tracked quests and marks 30 corrupted plants, Shadow Hold objectives, a quest chest, and eight rares. Alcaz Prison uses Santiago Reyes's floor plans for both sections, with all five bosses, Mason Connery, and the Perfumed Note. [Felwood map research](research/felwood-map/README.md) · [Alcaz Prison map research](research/alcaz-prison/README.md)

Uldaman has separate dungeon and Badlands approach views with bosses, quest locations, and chest positions. Maraudon has three client minimap sections and a Desolace approach view with all five Khans, the Celebras shortcut, and the Valley of Spears chest pool. Zul'Farrak includes boss and rare positions, the pyramid event, the Witch Doctor's Chest, and the solo Rogue quest's Spellbound War Chest. Gnomeregan has separate map sections. Razorfen Kraul has bosses, chest positions, quest givers, and an optional Blueleaf Tuber layer. Dalaran has six community boss-guide markers in City and one approximate player-reported Atrexis marker in Sewers. Drowned City uses Santiago Reyes' fan map with entrance and named-area references. Library has both bosses, four possible chest positions, Doan's Strongbox, the Mythology quest book, and its own entrance. [Maraudon map research](research/maraudon-map/README.md)

Progress saves automatically in this browser's local storage. It survives closing the page and restarting the browser, but does not sync across browsers or devices. Clearing site data removes progress. Private browsing saves last only for that private session. Each quest is tracked by its ID, including shared IDs across zones.

## GitHub Pages

Use a separate repository for this tracker; existing Pages websites are unaffected.

1. Upload `index.html`, `style.css`, `app.js`, `progress.js`, `drops.js`, `map.js`, `cooking.js`, `leatherworking.js`, `professions.js`, `.nojekyll`, and the `data/`, `assets/`, `vendor/`, and `research/` folders to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Open the website URL shown by GitHub Pages after deployment completes.

All assets use relative paths and work under a repository URL such as `https://USERNAME.github.io/wow-forever-quest-tracker/`.

## Quest data

The browser loads all 1,004 quest entries directly from `data/quests.json`. This JSON file is the authoritative quest data and can be edited directly. No conversion tools, CSV files, Node.js, package manager, or build step are needed.

- Teldrassil: 76 quests
- Darkshore: 73 quests
- Ashenvale: 58 quests, including Shared Fury, Seeking Caitlin, and the six Althalaxx steps that start in or lead to Ashenvale; known Horde-only and non-Rogue class quests are excluded
- Stonetalon Mountains: 28 quests, including relevant introductions and follow-ups; The Zoram Strand is linked as a prerequisite in Ashenvale
- Desolace: 51 quests: 44 selected current-index quests, three associated introductions/handoffs, and the four-step Highway Robbery chain omitted by the index. Includes the Gelkis crafting hand-ins, centaur totems, and shared Draenethyst chain; Horde-only, Magram-route quests, and the two old Classic Khan duplicates are excluded
- Shen'dralas: 32 quests: all 27 non-Magram entries in the current zone index plus five related handoffs/dungeon steps. Includes the shared pylon, temple, spectral-blade, Forlorn Gardens, and item-started quests; the 13 Magram-route quests remain excluded
- Feralas: 53 Alliance/neutral quests, including related introductions, cross-zone chain steps, item-started quests, and repeatable quests
- Stranglethorn Vale: 156 Alliance/shared entries, including Forever additions, Rogue Zandalar hand-ins, professions, events, and Booty Bay handoffs; Horde-only, other-class, and five older duplicate variants are excluded
- Azshara: 76 Alliance/shared entries, including the Talrendis Point and Saria Fairmoon chains, the Blackmaw refugees and their dungeon handoffs, and the Rogue Azure Key chain. [Azshara research](research/azshara/README.md)
- Felwood: 80 Alliance/shared entries, including Forever additions, 30 distinct plant quests, first-time/repeatable salves, and relevant cross-zone handoffs; Horde-only, other-class, Winterspring-only tasks, and the older unassigned Timbermaw Ally variant are excluded
- Riverglades: 121 Alliance/shared entries, including 13 introductions/deliveries/local dungeon stages outside the main index; Horde-only quests, misfiled Duskwood/Hyjal quests, and unimplemented records are excluded
- Deadmines: 24 quests, including prerequisites and excluding Paladin-only quests
- Wailing Caverns: 7 quests, including Raptor Horns and the Alliance In Nightmares follow-up
- Blackfathom Deeps: 6 quests, including the Corruption Abroad introduction
- The Stockades: 7 quests, including the Bazil Thredd introduction; earlier prerequisites link to their existing list or external guide
- Gnomeregan: 21 quests, including introductions, the ring upgrade follow-up, and the distinct Sparklematic machine/step IDs
- Excavation Site: Wetlands: 13 Alliance quests, including four Greenwarden prerequisites for Horrors in the Highland and four return/delivery follow-ups; player-reported requirements and observed sequence links are labeled
- The City of Dalaran: 6 Alliance quests, including Modera's introduction and follow-up; Horde-only quests, including Opportunistic Education, are excluded
- Razorfen Kraul: 5 quests, including the Lonebrow's Journal introduction; Blueleaf Tubers links to the observed earlier Raptor Horns step in Wailing Caverns
- Razorfen Downs: 6 Alliance/neutral dungeon quests plus 3 chain steps leading to Agamaggan's Blood; includes The Coldbringer's Eye and Belnistrasz's escort chain
- Scarlet Monastery Graveyard: no verified Alliance or Rogue quests; opens on Drops, with a concise empty Quests view
- Scarlet Monastery Library: 3 quests, including Past Due; In the Name of the Light links to Desolace prerequisites and explicitly requires Library, Armory, and Cathedral
- Scarlet Monastery Armory: In the Name of the Light, shared with Library using the same completion ID and Desolace prerequisite link
- Scarlet Monastery Cathedral: In the Name of the Light, shared with Library and Armory; 10 equipment drops across three bosses, plus courtyard/interior maps
- The Drowned City: 8 Alliance/neutral entries, including An Acquaintance in Southshore and the two Dibbs follow-ups; observed handoffs remain distinct from mandatory prerequisites
- Krol'dok Stronghold: 10 Alliance entries, including A Small Favor and delivery follow-ups; Krol'dok No More! is a labeled escort reference with unverified availability and unknown giver/pickup
- Uldaman: 36 Alliance/shared entries, including the necklace, Platinum Discs/Uldum continuation, entrance tasks, and relevant introductions; Horde-only and Mage-only quests are excluded
- Maraudon: 10 Alliance/shared entries, including the Scepter chain and shared Word of the Woods / Rot and Regret; Horde-only quests are excluded
- Zul'Farrak: 21 Alliance/shared entries, including the Sharpbeak chain, Mosh'aru preparation/follow-up, the new Witch Doctor task, and two Rogue entries; Horde-only quests are excluded
- Alcaz Prison: 12 Alliance/shared entries, including the Theramore investigation, The Dragon's Journal, and Mason Connery's chain with its two eligible State Secrets hand-ins

The researched lists include Alliance/neutral quests available to Rogues and omit known Horde-only quests and quests restricted to other classes. Vengeful Trail's Alliance classification is supported by community quest data. There are 960 unique quest IDs across 1,004 list entries: four quests are shared by Ashenvale and Stonetalon, six Althalaxx steps by Ashenvale and Darkshore, Seeking Caitlin by Ashenvale and Excavation Site: Wetlands, In the Name of the Light by Scarlet Monastery Library, Armory, and Cathedral, four Forlorn Gardens/Agamaggan chain quests by Shen'dralas and Razorfen Downs (Word of the Woods and Rot and Regret also appear in Maraudon), and four Gelkis handoffs by Desolace and Shen'dralas. The Caravan Road, two Tokal chain steps, and three Drowned City quests also share IDs with Stranglethorn Vale. Tran'rek also shares an ID between Stranglethorn Vale and Zul'Farrak. Riverglades shares 14 IDs with Desolace, Stranglethorn Vale, and Krol'dok Stronghold. Their completion status is shared automatically.

Each quest has `id`, `zone`, `level`, `name`, `stage`, `giver`, `coordinates`, `area`, and `objective` fields. `areaConfidence` and `notes` preserve additional source details. Researched entries include `sources` links and field-level provenance in `evidence`. Keep IDs as strings and preserve existing IDs so saved completion status continues to match. Use an empty string for unavailable text fields.

`prerequisites` contains explicit "Complete first" relationships and sourced player-reported requirements. References with `evidence: "community"` display a "player report" label in both directions. `previousQuests` contains sequence links displayed separately as "Earlier in chain". Each reference has a string `id`, `name`, `evidence`, and `sources`. Audited "Offered after" observations also carry `relation: "Offered after"` and display an "observed order" label in both directions. These are not confirmed mandatory prerequisites. An empty array means no relationship is currently recorded; it does not prove a quest has no prerequisite.

Forward links are derived automatically from those relationships: "Unlocks" reverses `prerequisites`, and "Later in chain" reverses `previousQuests`. Each following quest is listed once by ID, even when it appears in multiple lists. No duplicate forward-link data needs to be maintained.

Tracked references prefer the current list when the same ID appears in more than one list; otherwise they open the matching quest in its other list. Navigation clears search/completion filters that would hide the target and expands and focuses it. Quest links use URL fragments and work when opened directly or in another tab. Browser Back restores the previous list.

Edit the JSON and publish the change to update the tracker. To add another zone, add its quests to the JSON and its name to the `zones` list in `app.js`.

When changing JavaScript or CSS, increment the `?v=` version on the asset URLs in `index.html` so browsers load the new files instead of cached copies. Quest JSON is requested without using the browser cache.

Missing coordinates appear as a dash. Turn-in qualifiers, cross-zone pickup areas, and quest level 0 are preserved from the original data.

### Research sources

Blackfathom Deeps and Stonetalon Mountains were researched on November 8, 2026 using [ForeverDB's Blackfathom Deeps guide](https://foreverdb.net/dungeon/48-blackfathom-deeps), [Stonetalon Mountains quest list](https://foreverdb.net/quests/stonetalon-mountains), and individual quest guides. Wailing Caverns and The Stockades were researched on November 9, 2026 using [ForeverDB's Wailing Caverns guide](https://foreverdb.net/dungeon/43-wailing-caverns), [Stockades guide](https://foreverdb.net/dungeon/34-stormwind-stockade), and individual quest/item-source records. [Research notes](data/research.md) describe eligibility checks, cross-zone inclusions, and evidence limits.

Gnomeregan and Excavation Site: Wetlands were researched on November 10, 2026 using [ForeverDB's Gnomeregan guide](https://foreverdb.net/dungeon/90-gnomeregan), [Excavation Site: Wetlands guide](https://foreverdb.net/dungeon/2998-excavation-site-wetlands), and individual quest/item records.

Desolace was audited on November 15, 2026 against all 82 entries in the current ForeverChanges index and Questie's primary quest/NPC traces. The initial sixteen additions include Leather Technique, Mysterious Mysticism, I Need a Tailor, further Gelkis reputation quests, and shared quests. A follow-up added the four-step Highway Robbery chain omitted by the zone index. See the [coverage and verification report](research/desolace-audit/README.md). Retained Classic-reference records keep their original provenance.

Excavation Site: Wetlands was audited again on November 12, 2026 against the full dungeon quest registry, individual guides, and [Gurkenklaus's prerequisite report on Wowhead](https://www.wowhead.com/forever/quest=95646/horrors-in-the-highland#comments:id=6440044), supplied by the user. Four missing Alliance follow-ups and the four Greenwarden prerequisites were added. Several other sequence links are observed offer order rather than confirmed requirements; unknown quest starts remain unguessed.

The City of Dalaran was researched on November 12, 2026 using ForeverDB's full dungeon quest records, Wowhead's Forever quest/item tooltips, and the All The Things addon database. The addon supplies faction and prerequisite details missing from the quest guides. Research notes link the exact addon revision used.

Ashenvale was audited again on November 13, 2026 against its full zone index, Questie's Forever data, additional community quest datasets and leveling guides, and individual quest records. Shared Fury is absent from ForeverDB's current index; its identity, objective, faction, giver, and Vengeful Trail prerequisite are corroborated by the other sources linked in the data and research notes.

Shen'dralas and Feralas were researched on November 13, 2026 using current ForeverChanges quest pages, Questie's generated data and player traces, ForeverDB's zone/quest records, and a second zone dataset. Current Shen'dralas listings resolve older faction conflicts; observed handoffs remain separate from confirmed prerequisites. Feralas's Classic-reference details and newer updates retain their source provenance.

Razorfen Kraul and the Graveyard/Library wings of Scarlet Monastery were researched on November 13, 2026 using ForeverDB quest/client records, current ForeverChanges quest pages, explicit boss sources in Wowhead Forever item tooltips, and the All The Things Forever database. Rare bosses are included. The separate wing lists share Scarlet Monastery instance ID 189, with wing-specific loot lists.

The Drowned City and Scarlet Monastery Armory were researched on November 14, 2026 using current ForeverChanges quest pages, Questie's primary data and handoff traces, All The Things' dungeon records, ForeverDB client items/Classic source references, and Wowhead Forever item tooltips. Drowned City’s eight quest entries and 15 equipment drops are new Forever data; Armory shares In the Name of the Light and has four Herod drops.

Razorfen Downs was researched on November 14, 2026 using current ForeverChanges quest pages, ForeverDB's full dungeon/client data, Questie's relationship traces, All The Things' dungeon record, and explicit Wowhead Forever boss-source lines. Its nine quest entries include the three earlier Agamaggan chain steps; its 22 boss-specific equipment drops include rare Ragglesnout and Ambassador Bloodrage's entrance-area drop.

Krol'dok Stronghold was researched on November 16, 2026 against all 13 current indexed quests, a direct introduction, an additional escort reference, Questie player traces, the All The Things dungeon record, and current Wowhead Forever item tooltips. It has 19 equipment drops across six named bosses. The escort's availability is unverified; no supported map was found. See the [coverage report](research/kroldok-stronghold/README.md).

Stranglethorn Vale was researched on November 16, 2026 against all 173 current indexed quests, the secondary index, and primary NPC/object starter records. The 156 selected entries include 39 outside the main index. See the [coverage and verification report](research/stranglethorn-vale/README.md).

Felwood was researched on November 16, 2026 against all 95 current indexed quests, the secondary index, primary NPC/object and objective scans, current quest pages, and Classic primary prerequisite records. The 80 selected entries include seven outside the main index. See the [coverage and verification report](research/felwood/README.md).

Uldaman was researched on November 16, 2026 against the full quest/dungeon registries, current quest and item pages, primary Classic conditions, and the Forever addon. It has 36 Alliance/shared quest entries and 24 equipment drops across eight boss cards, including the entrance rare. See the [coverage and verification report](research/uldaman/README.md).

Maraudon was researched on November 17, 2026 against all 13 current-index quests, primary quest and relationship records, the full dungeon registry, the Forever addon, and current item tooltips. Ten Alliance/shared entries include the Rot and Regret introduction. Its 34 equipment drops across nine cards include rare Meshlok and Blade of Eternal Darkness; 23 items are Rogue-usable. See the [coverage report](research/maraudon/README.md).

Zul'Farrak was researched on November 17, 2026 against the current index, full dungeon registry, active primary category/objective scans, Forever addon, and current quest/item tooltips. Its 21 Alliance/shared quest entries include the Rogue Talisman of Kazdor task; 38 boss-specific equipment drops across 13 cards include three rare bosses and newer Forever equipment. Twenty-two items are Rogue-usable. See the [coverage report](research/zulfarrak/README.md).

Alcaz Prison uses Blizzard's suggested range of 48–53 and includes 12 Alliance/shared quests, 15 boss-specific equipment drops, and maps for both floors. Save The Questioner for Mason Connery's quest. [Alcaz Prison sources and coverage](research/alcaz-prison/README.md)

Riverglades was researched on November 19, 2026 against all 170 current-index entries, the secondary index, refreshed primary quest/NPC/object records, authored corrections, and player traces. Its 121 selected entries include 13 outside the index and share 14 existing completion IDs. Curly's missing pickup is recovered from primary traces; observed chain order remains distinct from confirmed prerequisites. See the [coverage report](research/riverglades/README.md).

The site must be served over HTTP or HTTPS so the browser can load the JSON file. Opening `index.html` directly from disk is not supported.

## Dungeon drops

`data/drops.json` contains 360 boss-specific equipment entries: 31 for Deadmines, 21 for Wailing Caverns, 21 for Blackfathom Deeps, 9 for The Stockades, 16 for Gnomeregan, 9 for Excavation Site: Wetlands, 24 for The City of Dalaran, 23 for Razorfen Kraul, 22 for Razorfen Downs, 15 for Scarlet Monastery Graveyard, 10 for Scarlet Monastery Library, 4 for Scarlet Monastery Armory, 10 for Scarlet Monastery Cathedral, 15 for The Drowned City, 19 for Krol'dok Stronghold, 24 for Uldaman, 34 for Maraudon, 38 for Zul'Farrak, and 15 for Alcaz Prison. Equipment covers all classes by default. The Rogue-usable filter uses Forever's client proficiencies, including one-handed axes, and means equipable after appropriate training rather than a recommendation of ideal stats. Razorfen Downs has 14 Rogue-usable entries, Drowned City and Alcaz Prison each have nine, and Armory's four Herod items are all mail or a two-handed axe and produce an empty Rogue filter.

Boss cards start collapsed and show their matching item counts. Multiple cards can be expanded at once. Open cards are remembered for each dungeon during the current page session. Searching or choosing a specific source opens matching cards. Named rare bosses are included; ordinary trash sources and equipment without a confirmed boss source are excluded.

Only equipment specific to a boss's loot table is included. Generic world drops are excluded even when observed dropping from a boss, including generic rare-quality equipment. Boss-specific green items, such as Woodworking Gloves and Metalworking Gloves, remain included.

Drop-source evidence and item stats are separate. "Seen in Forever" means players recorded that drop source; "Classic ref." means the source is still a Classic reference. "Wowhead ref." links to an explicit boss source in Wowhead's Forever item database. Stats/effects come from Forever client records except where `statsEvidence: "wowhead"` records current Forever tooltip values, as in The Drowned City and Razorfen Downs; the evidence tooltip identifies that source. An instance-level `build` overrides the root default when its client reference is refreshed separately. Speculative client-only associations without corroboration, non-equipment, and quest rewards are excluded.

Drops load separately when requested; a failed drop-data request does not block quests. Each dungeon is validated when opened, so malformed records in another dungeon cannot block it. Source-evidence metadata is optional and is not part of loading validation. Missing, blank, unfamiliar, or incorrectly typed evidence values display as "Source ref." and cannot block the loot list. Retry fetches fresh data. After a site update, reload an already-open tab to load the latest scripts; this does not clear quest progress. The drop view, filters, and item links do not write to quest completion storage. Direct view links use a fragment such as `#zone=Deadmines&view=drops`.

Research sources and limits are documented in [the research notes](data/research.md). The JSON remains the maintained data source; no fetch/conversion tooling or Node runtime is needed to host the app.

## Professions

Open **Professions → Fishing**, or use [the direct Fishing link](https://ttdow.github.io/wow-forever-quest-tracker/#profession=Fishing). Switch between **By fish** and **By area** for 30 usable fish and fish reagents, 73 water/skill groups, and 298 catch references in 53 listed areas (including unverified Riverglades). The five-column tables show Freshwater, Ocean, and specific catch types such as Whimsyfin pools (freshwater). Search by fish name, location, water type, or item ID. In By area, an area search shows only that area; fish and water-type searches show matching catches in each area. Fish names link to their Forever item pages. The layout adapts to narrow screens. The grouping and search stay selected while switching away from Fishing during the page session.

`data/professions/fishing.json` is the maintained dataset. Coverage includes the full applicable Classic fish-location and pool references, matched against current Forever item identities, plus published Zephras Isle catches. Catch groups keep different skill bands and water types separate. Source coverage is documented in `research/fishing/coverage.json`; undocumented Forever catches may still exist. Skill values remain Classic references and include equipment/lure bonuses; exact Forever thresholds are unverified. Whimsyfin's minimum is unknown and its reported no-fail value is approximate. The two Riverglades rows have unverified catches, water types, and skill requirements. Seasonal dates and server-time windows are explicitly Classic references. Recipes and cooked bonuses are shown in the separate Cooking section. See [the Fishing research](research/fishing/README.md) for source limits and corrections to the supplied examples.

Open **Professions → Cooking**, or use [the direct Cooking link](https://ttdow.github.io/wow-forever-quest-tracker/#profession=Cooking), for 39 fish and shellfish recipe records in `data/professions/cooking.json`. The table shows Cooking skill, station exceptions such as Iron Oven, per-craft ingredient quantities, food effects, and learning references. Five client-only or incompletely documented recipes have an Unverified availability label. Cooking skill and learning source for Spinefin Halibut remain unknown. See the [Cooking research](research/cooking/README.md).

Fishing and Cooking link through ingredient item IDs in both directions; for example, [Redgill recipes](https://ttdow.github.io/wow-forever-quest-tracker/#profession=Cooking&item=13758) link back to the existing catch locations. Source metadata is optional. Each profession loads independently and has its own retry control. Optional research/source labels never block its table. Visiting or searching Fishing does not write to quest completion storage.

## Maps

Desolace, Gnomeregan, Razorfen Kraul, The City of Dalaran, and The Drowned City have a Map view. Maps load independently, use local background images, and preserve quest completion history.

### Desolace

Open **Desolace → Map**, or use [the direct map link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=Desolace&view=map).

The map has 62 entries: 28 Solid Chest candidates, 10 lockpicking footlockers, 15 quest-giver NPCs, 6 rares, and 3 quest-start objects. All location records are Classic references, not confirmed Forever spawn observations. Three chest candidates appear in an additional Classic snapshot only; their markers have dashed borders. The evidence filter can exclude them, show only them, or show Forever-confirmed records. The latter is currently empty and says so.

Each layer has its own checkbox and count. Search accepts names, quest names, IDs, and coordinates. Click a marker to see its identity, exact coordinates, optional Classic lockpicking requirement, sources, and links to tracked quests. Quest links open the Quests view, expand the selected quest, and show its completion status. NPCs sharing exact coordinates share one marker with both records in its popup. Nearby markers can be separated by zooming or searching. Caravan NPCs are explicitly marked as moving; rare markers are reference points rather than complete patrol routes.

Drag or use arrow keys to pan; use the mouse wheel or zoom buttons to zoom. **Fit map** restores the full zone. The coordinate readout follows the pointer, and **Copy coords** copies a selected marker's coordinates. If clipboard access is unavailable, the coordinates are selected for manual copying. Map filters and viewport persist while switching views during the current page session. Map interactions do not write to quest completion storage.

`data/maps/desolace.json` is the maintained Desolace dataset. It contains the map dimensions and image path, marker records, and optional source metadata. Add a location to its `points` array to show another marker of an existing category. Each point needs a unique string `id`, `name`, supported `category`, and numeric `x` and `y` between 0 and 100. `npcId`/`objectId` identify the game entity; `questIds` link to existing quests. Original world coordinates and research provenance are retained where available. Missing or unfamiliar source/evidence labels cannot prevent the map from loading.

The map data loads only when requested, independently of dungeon drops. Retry refetches data and recreates a failed image/map. Leaving the view during loading cannot reopen it unexpectedly. Invalid map data does not stop the Quests view from working.

The 1002 × 668 explored background is stored at `assets/maps/desolace.webp`, with Blizzard and ForeverDB attribution on the page. Map art and data licensing are separate. Classic reference data is derived from CMaNGOS under [GPL-3.0](research/desolace-map/LICENSE-GPL-3.0.txt). [Leaflet 1.9.4](https://leafletjs.com/) is included locally under its [BSD 2-Clause license](vendor/leaflet/LICENSE); the site needs no runtime CDN, map service, or API key. See the [map research report](research/desolace-map/README.md) and [source inventory](research/desolace-map/sources.json) for coverage and evidence limits.

### Gnomeregan

Open **Gnomeregan → Map**, or use [the direct map link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=Gnomeregan&view=map).

The map contains 38 entries across **Main layout** (26) and **Upper platforms** (12): 6 possible chest positions, 5 bosses, Dark Iron Ambassador, 10 possible Kernobee pickup positions, Blastmaster Emi Shortfuse, 14 Sparklematic/Matrix Punchograph positions, and the instance arrival point. Kernobee is one NPC with alternative pickup positions. The two client map sections are not a claim that Gnomeregan has only two physical floors. Locations are Classic references on Forever client minimap art.

Each chest position can produce either **Large Iron Bound Chest (74447)** or **Large Solid Chest (74448)** in the Classic database. One marker represents the position; its popup lists both alternatives. Chest pool rows are resolved through `gameobject_spawn_entry`, so zero-ID spawn records are not lost. No Forever spawn rate, active chest count, or lockpicking requirement is inferred.

Use **Map section** to switch layouts. Layer counts refer to the selected section. Searching also checks the other section and offers a button for matching results there. Each section keeps its own pan/zoom state, and each zone keeps its own filters during the current page session. Links can select a section directly, such as `#zone=Gnomeregan&view=map&floor=upper`. Boss popups link to the dungeon's Drops view; tracked quest links open and expand the matching quest.

`data/maps/gnomeregan.json` is the maintained dataset. Its `floors` array contains section IDs, names, image paths, dimensions, and source projection metadata. Every point includes a matching `floor` ID and coordinates relative to that image. The single-map Desolace format remains supported. The shared renderer validates and caches each zone separately; a malformed or unavailable dungeon map cannot block another map, quests, or drops. Optional provenance labels remain nonblocking.

Techbot and Matrix Punchograph A are outside the instance and are not placed on the interior map. Ordinary trash and the many Artificial Extrapolator pickup points are outside this initial map's scope. See the [Gnomeregan map research](research/gnomeregan-map/README.md) and [source inventory](research/gnomeregan-map/sources.json) for coordinate transforms, placement evidence, and coverage limits.

### The City of Dalaran

Open **The City of Dalaran → Map**, or use [the direct map link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=The%20City%20of%20Dalaran&view=map).

The map uses a matching community-published city layout and six boss-guide markers: Arcane Anomaly, Fel Ancient, Mana Devourer, Arcanic Enigma, Unstable Sentinel, and Shade of the Archmage access. Each marker is labeled **Community map reference**; none is classified as a measured Forever spawn or a Classic reference. Coordinates are percentages of the guide image. The Mana Elemental alias finds Arcanic Enigma; its quest link opens Power Overwhelming. Shade's marker describes access through the Violet Citadel portal to the Purple Parlor and links Heart of Disruption.

Choose **Map section → Sewers** to view the Underbelly layout, or use [the direct sewer link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=The%20City%20of%20Dalaran&view=map&floor=sewers). The player confirmed that the original Underbelly artwork matches this dungeon's sewer layout and reported **Atrexis the Grave Knight near the Circle of Wills**. His dashed marker is labeled **Player report · approximate location**, links the dungeon Drops view, and is searchable by the landmark. Its position is an area estimate, not measured spawn coordinates. It supports pan, zoom, Fit map, and section switching. The six city markers remain on **City**, with separate viewport memory for each section.

Chest positions, Lyn the Ignored, Mana Wraith, and interior quest-giver locations remain unplotted because no compatible position evidence was obtained. Section notices state those limits and identify the approximate Atrexis report. No outdoor Dalaran coordinates are added to the dungeon. Boss popups link the existing Drops view, while all other map controls work as in the other lists. Searching across sections can find city or sewer markers and offer a switch to their section.

`data/maps/city-of-dalaran.json` is the maintained dataset, with a `floors` array and an explicit section ID on each point. The local images are `assets/maps/city-of-dalaran.webp` (600 × 620 city layout) and `assets/maps/city-of-dalaran-sewers.jpg` (1009 × 673 Underbelly artwork). The original city section ID `main` remains compatible with existing links. Blizzard/Azeroth DB/Wowhead attribution and source terms are separate from the Classic datasets' GPL license. See the [Dalaran map research](research/city-of-dalaran-map/README.md) and [source inventory](research/city-of-dalaran-map/sources.json) for layout confirmation, original normalized pins, identity verification, and coverage limits.

### The Drowned City

Open **The Drowned City → Map**, or use [the direct map link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=The%20Drowned%20City&view=map).

The map uses the original 3000 × 2000 fan recreation by **Santiago Reyes — Atlas de Azeroth: Forever**, supplied through Reddit. The creator's credit remains visible. Searchable image-reference markers identify Sunken Hollow entrance, Altar of the Serpent, Eternal Amphitheater, Abyssal Dais, and Deep Archives. These area/entrance references do not establish boss or chest positions; those remain unmapped. Coordinates are percentages of this image.

`data/maps/drowned-city.json` is the maintained dataset, and `assets/maps/drowned-city.jpg` is the unmodified original image. Entrance and Areas layers can be filtered separately. Pan, zoom, Fit map, search, coordinate copying, and the existing Quests/Drops navigation are supported. The footer links the credited source and its terms. See the [Drowned City map research](research/drowned-city-map/README.md) and [source inventory](research/drowned-city-map/sources.json) for attribution, image hash, marker interpretations, and coverage limits.

### Razorfen Kraul

Open **Razorfen Kraul → Map**, or use [the direct map link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=Razorfen%20Kraul&view=map).

The local Forever client minimap shows Classic reference positions for six bosses, rare Blind Hunter and Earthcaller Halmgar, seven possible chest positions, Heralath Fallowbrook, Willix the Importer, and the instance arrival point. Bosses link to Drops, Charlga links The Crone of the Kraul, and the two quest givers link their quests. Chest popups list Large Iron Bound Chest and Large Solid Chest as alternatives at each position.

Enable **Quest objects** for 69 hidden Blueleaf Tuber reference positions and their quest links. This layer starts off to keep the initial map readable; the gopher must uncover tubers. These are Classic references, not observed Forever spawn positions, and map coordinates are percentages of the image. No chest probabilities, lockpicking requirements, escort paths, or patrol routes are inferred.

`data/maps/razorfen-kraul.json` is the maintained dataset; `assets/maps/razorfen-kraul.webp` is the 1512 × 777 client image. See the [Razorfen Kraul map research](research/razorfen-kraul-map/README.md) and [source inventory](research/razorfen-kraul-map/sources.json) for exact world positions, projection, chest spawn groups, and gopher behavior.

## Scarlet Monastery Library map

Open **Dungeons → Scarlet Monastery Library → Map** for the Library wing. Its nine markers use Classic reference positions projected onto a locally stored Forever client minimap. Bosses link to Drops; Loksey and the Mythology book link to tracked quests. Chest alternatives are grouped by position. See the [map research](research/scarlet-monastery-library-map/README.md) for sources and limits.

## Scarlet Monastery Cathedral

Open **Dungeons → Scarlet Monastery Cathedral** for Quests, Drops, and Map. In the Name of the Light shares completion with Library and Armory. Drops has three expandable boss cards, 10 boss-specific equipment entries, and a Rogue filter (five usable). The map has separate Cathedral and Courtyard sections, three bosses, the Fairbanks chamber torch, the chapel doorway on both sections, and the correct wing entrance. See the [research report](research/scarlet-monastery-cathedral/README.md) for sources and limits.

## Razorfen Downs map

Open **Dungeons → Razorfen Downs → Map** for five bosses, rare Ragglesnout, five possible chest positions, Belnistrasz, and the entrance. Tuten'kash and Plaguemaw use labeled encounter-area references. Bosses link to Drops; Belnistrasz, Plaguemaw, and Amnennar link to existing quests. These are Classic references on a local Forever client minimap. See the [map research](research/razorfen-downs-map/README.md) for sources and limits.

## Feralas map

Open **Feralas → Map** for 17 quest givers, five quest objects, two quest chests, and nine rare references. Nearby entries share a marker with individual source coordinates in its popup. The map links the existing quests, includes the current Kristy Grant location, and has a Quest chests layer for Old Chest and Shay's Chest. Old Chest links the newly tracked The Old Key quest; its item pickup is unconfirmed. Random treasure positions remain unverified. See the [Feralas map research](research/feralas-map/README.md) for sources and limits.

## Scarlet Monastery Armory map

Open **Dungeons → Scarlet Monastery Armory → Map** for Herod, two possible chest positions, six possible supply-crate positions, the chamber door, and the Armory entrance. Chest and Supply crates layers are separate. Herod links the existing quest and Drops view. Positions are Classic references on a local Forever client minimap. See the [map research](research/scarlet-monastery-armory-map/README.md) for sources and limits.

## Suggested level labels

Navigation lists and the current selection show suggested bands such as `Felwood (48–55)`. These are labels only: quest IDs, list names in data, links, completion storage, and filters keep their existing values. Fishing is unchanged.

Dungeon bands use the [current ForeverChanges dungeon listing](https://foreverchanges.pro/dungeons), checked November 16, 2026: its new-dungeon ranges are attributed to Blizzard, and its Classic dungeon/wing ranges are Classic Era Group Finder references. Zone bands are general Classic leveling guidance; Shen'dralas uses its published [40–45 main quest band](https://foreverchanges.pro/quests/shendralas). These are suggestions rather than entrance restrictions or the minimum/maximum level of every tracked quest.
