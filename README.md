# WoW: Forever quest tracker

Static HTML, CSS, and JavaScript. No installation, application server, package manager, or build required to use or host it.

Open [the GitHub Pages website](https://ttdow.github.io/wow-forever-quest-tracker/) in Chrome, Firefox, or another modern browser.

- Choose Teldrassil, Darkshore, Ashenvale, Stonetalon Mountains, Desolace, Shen'dralas, Feralas, Deadmines, Wailing Caverns, Blackfathom Deeps, The Stockades, Gnomeregan, Excavation Site: Wetlands, The City of Dalaran, Razorfen Kraul, Scarlet Monastery Graveyard, or Scarlet Monastery Library.
- Check a quest to complete it; uncheck it to undo.
- Quests use one line by default. Click a quest name or its chevron to expand or collapse its full details.
- Expanded quests show known prerequisites, quests they unlock, and earlier/later chain steps. Click a tracked quest to jump to its list and expand it; completed quests are marked with a check. Quests outside the tracker link to their ForeverDB guide.
- Search quest names, IDs, givers, areas, coordinates, and objectives.
- Click **Zones** or **Dungeons** to expand its full list with completion counts. Choosing a list collapses the navigation; the current list name stays visible. Click the same tab again or press Escape to collapse it.
- Filter completed / not completed quests, or sort by level, name, or area.
- In dungeon lists, switch between **Quests** and **Drops**. Each boss with recorded equipment has a card with an expandable loot table. Drops have item names, required levels, base stats/effects, and source evidence, with search, source filtering, and an optional Rogue filter.
- In **Desolace**, **Gnomeregan**, or **The City of Dalaran**, choose **Map** for researched location references. Pan, zoom, filter layers, search, and open markers for coordinates and quest/drop links. Gnomeregan has separate map sections; Dalaran has City and Sewers sections, with six community boss-guide markers on the city map.

Progress saves automatically in this browser's local storage. It survives closing the page and restarting the browser, but does not sync across browsers or devices. Clearing site data removes progress. Private browsing saves last only for that private session. Each quest is tracked by its ID, including shared IDs across zones.

## GitHub Pages

Use a separate repository for this tracker; existing Pages websites are unaffected.

1. Upload `index.html`, `style.css`, `app.js`, `progress.js`, `drops.js`, `map.js`, `.nojekyll`, and the `data/`, `assets/`, `vendor/`, and `research/` folders to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Open the website URL shown by GitHub Pages after deployment completes.

All assets use relative paths and work under a repository URL such as `https://USERNAME.github.io/wow-forever-quest-tracker/`.

## Quest data

The browser loads all 442 quest entries directly from `data/quests.json`. This JSON file is the authoritative quest data and can be edited directly. No conversion tools, CSV files, Node.js, package manager, or build step are needed.

- Teldrassil: 76 quests
- Darkshore: 73 quests
- Ashenvale: 58 quests, including Shared Fury, Seeking Caitlin, and the six Althalaxx steps that start in or lead to Ashenvale; known Horde-only and non-Rogue class quests are excluded
- Stonetalon Mountains: 28 quests, including relevant introductions and follow-ups; The Zoram Strand is linked as a prerequisite in Ashenvale
- Desolace: 39 quests, including the Alliance Reclaimers introduction and the Gelkis/Magram reputation routes; unclassified Hate the Hatefury is excluded
- Shen'dralas: 24 quests, including its 19 zone quests and five related Desolace handoffs; Gelkis/Magram routes and observed sequence links are identified
- Feralas: 52 Alliance/neutral quests, including related introductions, cross-zone chain steps, item-started quests, and repeatable quests
- Deadmines: 24 quests, including prerequisites and excluding Paladin-only quests
- Wailing Caverns: 7 quests, including Raptor Horns and the Alliance In Nightmares follow-up
- Blackfathom Deeps: 6 quests, including the Corruption Abroad introduction
- The Stockades: 7 quests, including the Bazil Thredd introduction; earlier prerequisites link to their existing list or external guide
- Gnomeregan: 21 quests, including introductions, the ring upgrade follow-up, and the distinct Sparklematic machine/step IDs
- Excavation Site: Wetlands: 13 Alliance quests, including four Greenwarden prerequisites for Horrors in the Highland and four return/delivery follow-ups; player-reported requirements and observed sequence links are labeled
- The City of Dalaran: 6 Alliance quests, including Modera's introduction and follow-up; Horde-only quests, including Opportunistic Education, are excluded
- Razorfen Kraul: 5 quests, including the Lonebrow's Journal introduction; Blueleaf Tubers links to the observed earlier Raptor Horns step in Wailing Caverns
- Scarlet Monastery Graveyard: no verified Alliance or Rogue quests; opens on Drops, with a concise empty Quests view
- Scarlet Monastery Library: 3 quests, including Past Due; In the Name of the Light links to Desolace prerequisites and explicitly requires Library, Armory, and Cathedral

The researched lists include Alliance/neutral quests available to Rogues and omit known Horde-only quests and quests restricted to other classes. Vengeful Trail's Alliance classification is supported by community quest data. There are 431 unique quest IDs across 442 list entries: four quests are shared by Ashenvale and Stonetalon, six Althalaxx steps by Ashenvale and Darkshore, and Seeking Caitlin by Ashenvale and Excavation Site: Wetlands. Their completion status is shared automatically.

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

Desolace was researched on November 11, 2026 using [ForeverDB's Desolace quest list](https://foreverdb.net/quests/desolace) and individual quest guides. Most Desolace details currently remain Classic references; the JSON preserves that provenance and approximate pickup-location confidence.

Excavation Site: Wetlands was audited again on November 12, 2026 against the full dungeon quest registry, individual guides, and [Gurkenklaus's prerequisite report on Wowhead](https://www.wowhead.com/forever/quest=95646/horrors-in-the-highland#comments:id=6440044), supplied by the user. Four missing Alliance follow-ups and the four Greenwarden prerequisites were added. Several other sequence links are observed offer order rather than confirmed requirements; unknown quest starts remain unguessed.

The City of Dalaran was researched on November 12, 2026 using ForeverDB's full dungeon quest records, Wowhead's Forever quest/item tooltips, and the All The Things addon database. The addon supplies faction and prerequisite details missing from the quest guides. Research notes link the exact addon revision used.

Ashenvale was audited again on November 13, 2026 against its full zone index, Questie's Forever data, additional community quest datasets and leveling guides, and individual quest records. Shared Fury is absent from ForeverDB's current index; its identity, objective, faction, giver, and Vengeful Trail prerequisite are corroborated by the other sources linked in the data and research notes.

Shen'dralas and Feralas were researched on November 13, 2026 using current ForeverChanges quest pages, Questie's generated data and player traces, ForeverDB's zone/quest records, and a second zone dataset. Current Shen'dralas listings resolve older faction conflicts; observed handoffs remain separate from confirmed prerequisites. Feralas's Classic-reference details and newer updates retain their source provenance.

Razorfen Kraul and the Graveyard/Library wings of Scarlet Monastery were researched on November 13, 2026 using ForeverDB quest/client records, current ForeverChanges quest pages, explicit boss sources in Wowhead Forever item tooltips, and the All The Things Forever database. Rare bosses are included. The separate wing lists share Scarlet Monastery instance ID 189, with wing-specific loot lists.

The site must be served over HTTP or HTTPS so the browser can load the JSON file. Opening `index.html` directly from disk is not supported.

## Dungeon drops

`data/drops.json` contains 179 boss-specific equipment entries: 31 for Deadmines, 21 for Wailing Caverns, 21 for Blackfathom Deeps, 9 for The Stockades, 16 for Gnomeregan, 9 for Excavation Site: Wetlands, 24 for The City of Dalaran, 23 for Razorfen Kraul, 15 for Scarlet Monastery Graveyard, and 10 for Scarlet Monastery Library. Equipment covers all classes by default. The Rogue-usable filter uses Forever's client proficiencies, including one-handed axes, and means equipable after appropriate training rather than a recommendation of ideal stats.

Boss cards start collapsed and show their matching item counts. Multiple cards can be expanded at once. Open cards are remembered for each dungeon during the current page session. Searching or choosing a specific source opens matching cards. Named rare bosses are included; ordinary trash sources and equipment without a confirmed boss source are excluded.

Only equipment specific to a boss's loot table is included. Generic world drops are excluded even when observed dropping from a boss, including generic rare-quality equipment. Boss-specific green items, such as Woodworking Gloves and Metalworking Gloves, remain included.

Drop-source evidence and item stats are separate. "Seen in Forever" means players recorded that drop source; "Classic ref." means the source is still a Classic reference. "Wowhead ref." links to an explicit boss source in Wowhead's Forever item database. Stats/effects come from Forever client records. An instance-level `build` overrides the root default when its stats are refreshed separately. Speculative client-only associations without corroboration, non-equipment, and quest rewards are excluded.

Drops load separately when requested; a failed drop-data request does not block quests. Each dungeon is validated when opened, so malformed records in another dungeon cannot block it. Source-evidence metadata is optional and is not part of loading validation. Missing, blank, unfamiliar, or incorrectly typed evidence values display as "Source ref." and cannot block the loot list. Retry fetches fresh data. After a site update, reload an already-open tab to load the latest scripts; this does not clear quest progress. The drop view, filters, and item links do not write to quest completion storage. Direct view links use a fragment such as `#zone=Deadmines&view=drops`.

Research sources and limits are documented in [the research notes](data/research.md). The JSON remains the maintained data source; no fetch/conversion tooling or Node runtime is needed to host the app.

## Maps

Desolace, Gnomeregan, and The City of Dalaran have a Map view. Maps load independently, use local background images, and preserve quest completion history.

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

Choose **Map section → Sewers** to view the Underbelly layout, or use [the direct sewer link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=The%20City%20of%20Dalaran&view=map&floor=sewers). The player confirmed that the original Underbelly artwork matches this dungeon's sewer layout. It supports pan, zoom, Fit map, and section switching. The six city markers remain on **City**, with separate viewport memory for each section.

Chest positions, sewer encounters Atrexis/Lyn, Mana Wraith, and interior quest-giver locations remain unplotted because no compatible position evidence was obtained. Section notices state those limits. No placeholder points or outdoor Dalaran coordinates are added to the dungeon. Boss popups link the existing Drops view, while all other map controls work as in the other lists. Searching from Sewers can find city markers and offer a switch to their section.

`data/maps/city-of-dalaran.json` is the maintained dataset, with a `floors` array and an explicit section ID on each point. The local images are `assets/maps/city-of-dalaran.webp` (600 × 620 city layout) and `assets/maps/city-of-dalaran-sewers.jpg` (1009 × 673 Underbelly artwork). The original city section ID `main` remains compatible with existing links. Blizzard/Azeroth DB/Wowhead attribution and source terms are separate from the Classic datasets' GPL license. See the [Dalaran map research](research/city-of-dalaran-map/README.md) and [source inventory](research/city-of-dalaran-map/sources.json) for layout confirmation, original normalized pins, identity verification, and coverage limits.
