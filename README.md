# WoW: Forever quest tracker

Static HTML, CSS, and JavaScript. No installation, server, dependencies, or build required to use or host it.

Open [the GitHub Pages website](https://ttdow.github.io/wow-forever-quest-tracker/) in Firefox or another modern browser.

- Choose Teldrassil, Darkshore, Ashenvale, Stonetalon Mountains, Deadmines, or Blackfathom Deeps.
- Check a quest to complete it; uncheck it to undo.
- Quests use one line by default. Click a quest name or its chevron to expand or collapse its full details.
- Search quest names, IDs, givers, areas, coordinates, and objectives.
- Filter completed / not completed quests, or sort by level, name, or area.

Progress saves automatically in this browser's local storage. It survives closing the page and restarting the browser, but does not sync across browsers or devices. Clearing site data removes progress. Private browsing saves last only for that private session. Each quest is tracked by its ID, including shared IDs across zones.

## GitHub Pages

Use a separate repository for this tracker; existing Pages websites are unaffected.

1. Upload `index.html`, `style.css`, `app.js`, `progress.js`, `.nojekyll`, and the `data/` folder to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Open the website URL shown by GitHub Pages after deployment completes.

All assets use relative paths and work under a repository URL such as `https://USERNAME.github.io/wow-forever-quest-tracker/`.

## Quest data

The browser loads all 260 quest entries directly from `data/quests.json`. This JSON file is the authoritative quest data and can be edited directly. No conversion tools, CSV files, Node.js, package manager, or build step are needed.

- Teldrassil: 76 quests
- Darkshore: 73 quests
- Ashenvale: 52 quests, excluding Horde-only quests
- Stonetalon Mountains: 29 quests, including relevant introductions, prerequisites, and follow-ups
- Deadmines: 24 quests, including prerequisites and excluding Paladin-only quests
- Blackfathom Deeps: 6 quests, including the Corruption Abroad introduction

The new Stonetalon Mountains and Blackfathom Deeps lists include Alliance/neutral quests available to Rogues and omit Horde-only quests and quests restricted to other classes. There are 255 unique quest IDs: five Ashenvale quests also appear with their related Stonetalon chains. Their completion status is shared automatically.

Each quest has `id`, `zone`, `level`, `name`, `stage`, `giver`, `coordinates`, `area`, and `objective` fields. `areaConfidence` and `notes` preserve additional source details. Researched entries include `sources` links and field-level provenance in `evidence`. Keep IDs as strings and preserve existing IDs so saved completion status continues to match. Use an empty string for unavailable text fields.

Edit the JSON and publish the change to update the tracker. To add another zone, add its quests to the JSON and its zone button to `index.html`.

When changing JavaScript or CSS, increment the `?v=` version on the asset URLs in `index.html` so browsers load the new files instead of cached copies. Quest JSON is requested without using the browser cache.

Missing coordinates appear as a dash. Turn-in qualifiers, cross-zone pickup areas, and quest level 0 are preserved from the original data.

### Research sources

The two new lists were researched on November 8, 2026 using [ForeverDB's Blackfathom Deeps guide](https://foreverdb.net/dungeon/48-blackfathom-deeps), [Stonetalon Mountains quest list](https://foreverdb.net/quests/stonetalon-mountains), and the individual quest guides linked in the JSON. [Research notes](data/research.md) describe eligibility checks, cross-zone inclusions, and evidence limits.

The site must be served over HTTP or HTTPS so the browser can load the JSON file. Opening `index.html` directly from disk is not supported.
