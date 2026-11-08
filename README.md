# WoW: Forever quest tracker

Static HTML, CSS, and JavaScript. No installation, server, dependencies, or build required to use or host it.

Open the GitHub Pages website in Firefox or another modern browser. You can also double-click **index.html** to use the files locally.

- Choose Teldrassil, Darkshore, or Ashenvale.
- Check a quest to complete it; uncheck it to undo.
- Search quest names, IDs, givers, areas, coordinates, and objectives.
- Filter completed / not completed quests, or sort by level, name, or area.

Progress saves automatically in this browser's local storage. It survives closing the page and restarting the browser, but does not sync across browsers or devices. Clearing site data removes progress. Private browsing saves last only for that private session. A local file and the hosted website have separate saves. Each quest is tracked by its ID, including shared IDs across zones.

## GitHub Pages

Use a separate repository for this tracker; existing Pages websites are unaffected.

1. Upload `index.html`, `style.css`, `app.js`, `progress.js`, `quests-data.js`, and `.nojekyll` to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Open the website URL shown by GitHub Pages after deployment completes.

All assets use relative paths and work under a repository URL such as `https://USERNAME.github.io/wow-forever-quest-tracker/`.

## Quest data

All 225 entries from the original three CSV files are bundled in `quests-data.js`. Missing coordinates appear as a dash. Coordinates next to a turn-in giver retain that qualifier. Zone tabs follow the source CSV, so cross-zone pickup areas remain as listed. Quest level 0 is preserved from the source.

After editing a CSV, the optional maintenance command `node generate-data.mjs` refreshes `quests-data.js`. Commit the refreshed file along with the edited CSV. Node.js 20 or newer is only needed for that maintenance command and `node --test`; it is not used to run or host the website.
