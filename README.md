# WoW: Forever quest tracker

Static HTML, CSS, and JavaScript. No installation, server, dependencies, or build required to use or host it.

Open [the GitHub Pages website](https://ttdow.github.io/wow-forever-quest-tracker/) in Firefox or another modern browser.

- Choose Teldrassil, Darkshore, or Ashenvale.
- Check a quest to complete it; uncheck it to undo.
- Quests use one line by default. Click a quest name or its chevron to expand or collapse its full details.
- Search quest names, IDs, givers, areas, coordinates, and objectives.
- Filter completed / not completed quests, or sort by level, name, or area.

Progress saves automatically in this browser's local storage. It survives closing the page and restarting the browser, but does not sync across browsers or devices. Clearing site data removes progress. Private browsing saves last only for that private session. Each quest is tracked by its ID, including shared IDs across zones.

## GitHub Pages

Use a separate repository for this tracker; existing Pages websites are unaffected.

1. Upload `index.html`, `style.css`, `app.js`, `progress.js`, `quests.js`, `.nojekyll`, and the `data/` folder to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Open the website URL shown by GitHub Pages after deployment completes.

All assets use relative paths and work under a repository URL such as `https://USERNAME.github.io/wow-forever-quest-tracker/`.

## Quest data

The browser loads all 225 entries directly from these files in `data/`:

- `wow_forever_teldrassil_quests_full_with_ids.csv`
- `Quests - Darkshore.csv`
- `wow_forever_ashenvale_quests_with_ids.csv`

Edit a CSV and publish the change to update the tracker. No generated bundle, Node.js, package manager, or build step is needed. To add a zone, add its CSV to `data/`, register it in `quests.js`, and add its zone button in `index.html`.

Missing coordinates appear as a dash. Coordinates next to a turn-in giver retain that qualifier. Zone tabs follow the source CSV, so cross-zone pickup areas remain as listed. Quest level 0 is preserved from the source.

The site must be served over HTTP or HTTPS so the browser can load the CSV files. Opening `index.html` directly from disk is not supported.
