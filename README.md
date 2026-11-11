# WoW: Forever quest tracker

Static HTML, CSS, and JavaScript. No installation, server, dependencies, or build required to use or host it.

Open [the GitHub Pages website](https://ttdow.github.io/wow-forever-quest-tracker/) in Firefox or another modern browser.

- Choose Teldrassil, Darkshore, Ashenvale, Stonetalon Mountains, Deadmines, Wailing Caverns, Blackfathom Deeps, The Stockades, Gnomeregan, or Excavation Site: Wetlands.
- Check a quest to complete it; uncheck it to undo.
- Quests use one line by default. Click a quest name or its chevron to expand or collapse its full details.
- Expanded quests show known prerequisites, quests they unlock, and earlier/later chain steps. Click a tracked quest to jump to its list and expand it; completed quests are marked with a check. Quests outside the tracker link to their ForeverDB guide.
- Search quest names, IDs, givers, areas, coordinates, and objectives.
- Filter completed / not completed quests, or sort by level, name, or area.
- In dungeon lists, switch between **Quests** and **Drops**. Each boss with recorded equipment has a card with an expandable loot table. Drops have item names, required levels, base stats/effects, and source evidence, with search, source filtering, and an optional Rogue filter.

Progress saves automatically in this browser's local storage. It survives closing the page and restarting the browser, but does not sync across browsers or devices. Clearing site data removes progress. Private browsing saves last only for that private session. Each quest is tracked by its ID, including shared IDs across zones.

## GitHub Pages

Use a separate repository for this tracker; existing Pages websites are unaffected.

1. Upload `index.html`, `style.css`, `app.js`, `progress.js`, `drops.js`, `.nojekyll`, and the `data/` folder to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Open the website URL shown by GitHub Pages after deployment completes.

All assets use relative paths and work under a repository URL such as `https://USERNAME.github.io/wow-forever-quest-tracker/`.

## Quest data

The browser loads all 297 quest entries directly from `data/quests.json`. This JSON file is the authoritative quest data and can be edited directly. No conversion tools, CSV files, Node.js, package manager, or build step are needed.

- Teldrassil: 76 quests
- Darkshore: 73 quests
- Ashenvale: 50 quests, excluding known Horde-only quests; Vengeful Trail's faction remains unverified
- Stonetalon Mountains: 28 quests, including relevant introductions and follow-ups; The Zoram Strand is linked as a prerequisite in Ashenvale
- Deadmines: 24 quests, including prerequisites and excluding Paladin-only quests
- Wailing Caverns: 7 quests, including Raptor Horns and the Alliance In Nightmares follow-up
- Blackfathom Deeps: 6 quests, including the Corruption Abroad introduction
- The Stockades: 7 quests, including the Bazil Thredd introduction; earlier prerequisites link to their existing list or external guide
- Gnomeregan: 21 quests, including introductions, the ring upgrade follow-up, and the distinct Sparklematic machine/step IDs
- Excavation Site: Wetlands: 5 Alliance quests, including the introductions from Ashenvale and Redridge Mountains

The researched lists include Alliance/neutral quests available to Rogues and omit known Horde-only quests and quests restricted to other classes. Ashenvale's Forever-specific Vengeful Trail still has no faction classification in the source. There are 293 unique quest IDs: four Ashenvale quests with Stonetalon objectives or hand-ins also appear with their Stonetalon chains. Their completion status is shared automatically.

Each quest has `id`, `zone`, `level`, `name`, `stage`, `giver`, `coordinates`, `area`, and `objective` fields. `areaConfidence` and `notes` preserve additional source details. Researched entries include `sources` links and field-level provenance in `evidence`. Keep IDs as strings and preserve existing IDs so saved completion status continues to match. Use an empty string for unavailable text fields.

`prerequisites` contains explicit "Complete first" relationships. `previousQuests` contains sequence links displayed separately as "Earlier in chain". Each reference has a string `id`, `name`, `evidence`, and `sources`. An empty array means no relationship is currently recorded. Do not infer a mandatory prerequisite from a quest's chain number or "Offered after" observations.

Forward links are derived automatically from those relationships: "Unlocks" reverses `prerequisites`, and "Later in chain" reverses `previousQuests`. Each following quest is listed once by ID, even when it appears in multiple lists. No duplicate forward-link data needs to be maintained.

Tracked references prefer the current list when the same ID appears in more than one list; otherwise they open the matching quest in its other list. Navigation clears search/completion filters that would hide the target and expands and focuses it. Quest links use URL fragments and work when opened directly or in another tab. Browser Back restores the previous list.

Edit the JSON and publish the change to update the tracker. To add another zone, add its quests to the JSON and its zone button to `index.html`.

When changing JavaScript or CSS, increment the `?v=` version on the asset URLs in `index.html` so browsers load the new files instead of cached copies. Quest JSON is requested without using the browser cache.

Missing coordinates appear as a dash. Turn-in qualifiers, cross-zone pickup areas, and quest level 0 are preserved from the original data.

### Research sources

Blackfathom Deeps and Stonetalon Mountains were researched on November 8, 2026 using [ForeverDB's Blackfathom Deeps guide](https://foreverdb.net/dungeon/48-blackfathom-deeps), [Stonetalon Mountains quest list](https://foreverdb.net/quests/stonetalon-mountains), and individual quest guides. Wailing Caverns and The Stockades were researched on November 9, 2026 using [ForeverDB's Wailing Caverns guide](https://foreverdb.net/dungeon/43-wailing-caverns), [Stockades guide](https://foreverdb.net/dungeon/34-stormwind-stockade), and individual quest/item-source records. [Research notes](data/research.md) describe eligibility checks, cross-zone inclusions, and evidence limits.

Gnomeregan and Excavation Site: Wetlands were researched on November 10, 2026 using [ForeverDB's Gnomeregan guide](https://foreverdb.net/dungeon/90-gnomeregan), [Excavation Site: Wetlands guide](https://foreverdb.net/dungeon/2998-excavation-site-wetlands), and individual quest/item records.

The site must be served over HTTP or HTTPS so the browser can load the JSON file. Opening `index.html` directly from disk is not supported.

## Dungeon drops

`data/drops.json` contains 101 boss-specific equipment entries: 31 for Deadmines, 21 for Wailing Caverns, 21 for Blackfathom Deeps, 9 for The Stockades, 16 for Gnomeregan, and 3 for Excavation Site: Wetlands. Equipment covers all classes by default. The Rogue-usable filter uses Forever's client proficiencies, including one-handed axes, and means equipable after appropriate training rather than a recommendation of ideal stats.

Boss cards start collapsed and show their matching item counts. Multiple cards can be expanded at once. Open cards are remembered for each dungeon during the current page session. Searching or choosing a specific source opens matching cards. Named rare bosses are included; ordinary trash sources and equipment without a confirmed boss source are excluded.

Only equipment specific to a boss's loot table is included. Generic world drops are excluded even when observed dropping from a boss, including generic rare-quality equipment. Boss-specific green items, such as Woodworking Gloves and Metalworking Gloves, remain included.

Drop-source evidence and item stats are separate. "Seen in Forever" means players recorded that drop source; "Classic ref." means the source is still a Classic reference. Stats/effects come from the current Forever client. Speculative client-only associations, non-equipment, and quest rewards are excluded.

Drops load separately when requested; a failed drop-data request does not block quests. The drop view, filters, and item links do not write to quest completion storage. Direct view links use a fragment such as `#zone=Deadmines&view=drops`.

Research sources and limits are documented in [the research notes](data/research.md). The JSON remains the maintained data source; no fetch/conversion tooling or Node runtime is needed to host the app.
