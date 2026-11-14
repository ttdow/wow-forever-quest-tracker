# The City of Dalaran map research

Researched November 14, 2026. The maintained dataset is [data/maps/city-of-dalaran.json](../../data/maps/city-of-dalaran.json). Existing quests, dungeon drops, and saved completion storage are unchanged.

## Included markers

The **City** section uses Azeroth DB's published City of Dalaran image and its six corresponding guide markers:

| Marker | NPC ID | Image X | Image Y |
| --- | --- | ---: | ---: |
| Arcane Anomaly | 245999 | 72.50 | 76.28 |
| Fel Ancient | 246003 | 57.90 | 48.70 |
| Mana Devourer | 246008 | 52.17 | 73.50 |
| Arcanic Enigma, listed as Mana Elemental on the source map | 246016 | 77.77 | 33.86 |
| Unstable Sentinel | 246017 | 65.60 | 29.08 |
| Shade of the Archmage access | 246020 | 49.62 | 13.84 |

These are **community map references**, not Classic spawns or measured Forever world coordinates. Their evidence classification is `community-reference`; they do not appear under the Forever-confirmed filter.

The source's `u` and `v` values are normalized image coordinates. The maintained records use `x = 100 × u` and `y = 100 × v` on the matching **600 × 620** image. No coordinates were estimated from screenshots or transferred onto a different background. The values are image percentages, not outdoor zone coordinates or dungeon `/way` positions.

Shade of the Archmage takes place in the Purple Parlor, reached through the Violet Citadel portal. Its marker represents the guide's city access location rather than an asserted physical boss spawn. This is explained in its popup. Arcanic Enigma's current name was verified by NPC ID against Wowhead's Forever tooltip; the Mana Elemental alias remains searchable and links to Power Overwhelming. Shade links to Heart of Disruption. Every included boss links to the existing dungeon Drops view.

## Sewer section

Choose **Map section → Sewers** to open the Underbelly layout, or use [the direct sewer link](https://ttdow.github.io/wow-forever-quest-tracker/#zone=The%20City%20of%20Dalaran&view=map&floor=sewers). The city section keeps its existing `main` ID, so previous links still work.

The background is the original **1009 × 673** [Dalaran Underbelly map artwork](https://wow.zamimg.com/images/wow/maps/enus/original/4395-2.jpg), obtained from Wowhead's public image CDN. It is originally Wrath's Dalaran map 4395, floor 2, showing the Circle of Wills and Cantrips & Crows Tavern. The player inspected this exact image and confirmed on November 14, 2026 that it matches Forever's dungeon sewer layout. This confirms the layout by player report; it does not establish coordinates for Forever encounters or objects.

No sewer spawn markers are added. Neither the current Azeroth DB guide nor ForeverDB supplies compatible sewer position records, and the route descriptions do not establish exact image coordinates for Atrexis or Lyn. The sewer notice says that boss and chest positions are not yet mapped. The background remains visible without a misleading “no locations match” overlay. Pan, zoom, Fit map, section navigation, and separate viewport memory work even with zero recorded positions. Searching from Sewers can still find city markers and offer a button to switch to their section.

The JPG is copied without cropping, resizing, annotations, or recompression to `assets/maps/city-of-dalaran-sewers.jpg`. Its dimensions, SHA-256, original context, and the player's layout confirmation are recorded in [sources.json](sources.json). No outdoor or Wrath NPC positions were transferred into the dungeon.

## Sources

- [Azeroth DB City of Dalaran guide](https://azeroth.wiki/forever/dungeons/city-of-dalaran): the published map image and its normalized marker records, plus the boss access and quest descriptions. Individual boss guide URLs are retained in the dataset.
- [Wowhead Forever NPC tooltip interface](https://nether.wowhead.com/forever/tooltip/npc/246016): verifies the six NPC identities/current names. It does not provide the position evidence used here.
- [ForeverDB dungeon data](https://foreverdb.net/data/dungeons/2959.json), build 1.60.1.70938: verifies dungeon ID **2959**, named encounters, and the availability of two client minimap composites. The data contains no `bossSpots` and no `entranceSpot` for this dungeon.
- [The Forever Era dungeon guide](https://theforeverera.com/en/dungeons/city-of-dalaran/): independently states that its boss-position data is not yet available.
- [Wowhead Underbelly artwork](https://wow.zamimg.com/images/wow/maps/enus/original/4395-2.jpg): sewer background only, matched to Forever by the player's confirmation above. It is not a source for Forever NPC or object coordinates.

The [source inventory](sources.json) records the original normalized marker values, image URL and SHA-256, guide snapshot SHA-256, and identity-tooltip endpoints. Dungeon area **16544** is distinct from outdoor Alterac Mountains and from the ordinary Dalaran city NPC data; those outdoor positions were not applied to this dungeon.

## Coverage limits

- **No verified chest positions were obtained.** No Classic chest locations or invented placeholders are shown.
- **The sewer layout is available, but Atrexis the Grave Knight and Lyn the Ignored are not plotted.** The accessible guides describe their route and Lyn's summoning ritual but do not publish matching map coordinates.
- **Mana Wraith is not plotted:** no supported position was obtained.
- No interior quest-giver or quest-object position was established with compatible coordinates. Outside attunement NPCs are not pinned onto the city layout.
- The six guide markers do not establish full patrol ranges, live spawn locations, spawn times, or a complete dungeon route.
- ForeverDB's broad client minimap composites include surrounding terrain and lack placement records; they were not substituted for the source image or used to infer missing coordinates.

Each section has its own notice. Only the populated Bosses layer is shown on the city section; the sewer section has no marker layers yet. The city layout supports pan/zoom, search including the Mana Elemental alias, coordinate copying, source popups, quest links, and dungeon-drop links. Loading or switching map sections does not alter the other map datasets or quest progress.

## Attribution and source terms

The images are Blizzard game artwork presented by Azeroth DB (city) and Wowhead (sewers). The footer credits Blizzard and switches the provider link and source terms with the selected section: [Azeroth DB terms](https://azeroth.wiki/terms) or [Wowhead terms](https://www.wowhead.com/terms-of-service). No open data/artwork redistribution license was established for these sources, and the Classic reference data's GPL license is **not** asserted for these community map references. The local images and small marker reference set are attributed to their sources; source website code, guide prose, and databases are not copied into the application.
