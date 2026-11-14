# The City of Dalaran map research

Researched November 14, 2026. The maintained dataset is [data/maps/city-of-dalaran.json](../../data/maps/city-of-dalaran.json). Existing quests, dungeon drops, and saved completion storage are unchanged.

## Included markers

The map uses Azeroth DB's published City of Dalaran image and its six corresponding guide markers:

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

## Sources

- [Azeroth DB City of Dalaran guide](https://azeroth.wiki/forever/dungeons/city-of-dalaran): the published map image and its normalized marker records, plus the boss access and quest descriptions. Individual boss guide URLs are retained in the dataset.
- [Wowhead Forever NPC tooltip interface](https://nether.wowhead.com/forever/tooltip/npc/246016): verifies the six NPC identities/current names. It does not provide the position evidence used here.
- [ForeverDB dungeon data](https://foreverdb.net/data/dungeons/2959.json), build 1.60.1.70938: verifies dungeon ID **2959**, named encounters, and the availability of two client minimap composites. The data contains no `bossSpots` and no `entranceSpot` for this dungeon.
- [The Forever Era dungeon guide](https://theforeverera.com/en/dungeons/city-of-dalaran/): independently states that its boss-position data is not yet available.

The [source inventory](sources.json) records the original normalized marker values, image URL and SHA-256, guide snapshot SHA-256, and identity-tooltip endpoints. Dungeon area **16544** is distinct from outdoor Alterac Mountains and from the ordinary Dalaran city NPC data; those outdoor positions were not applied to this dungeon.

## Coverage limits

- **No verified chest positions were obtained.** No Classic chest locations or invented placeholders are shown.
- **The sewer encounters Atrexis the Grave Knight and Lyn the Ignored are not plotted.** The accessible guides describe their route and Lyn's summoning ritual but do not publish matching map coordinates.
- **Mana Wraith is not plotted:** no supported position was obtained.
- No interior quest-giver or quest-object position was established with compatible coordinates. Outside attunement NPCs are not pinned onto the city layout.
- The six guide markers do not establish full patrol ranges, live spawn locations, spawn times, or a complete dungeon route.
- ForeverDB's broad client minimap composites include surrounding terrain and lack placement records; they were not substituted for the source image or used to infer missing coordinates.

The map notice explicitly states the community evidence and the missing chest/sewer coverage. Only the populated Bosses layer is shown. The city layout supports pan/zoom, search including the Mana Elemental alias, coordinate copying, source popups, quest links, and dungeon-drop links. Loading this map does not alter the other map datasets or quest progress.

## Attribution and source terms

The image is Blizzard game artwork presented by Azeroth DB. The page credits Blizzard and links to Azeroth DB. No open data/artwork redistribution license was established for this source, and the Classic reference data's GPL license is **not** asserted for these community map references. The map's footer links the [source terms](https://azeroth.wiki/terms) separately. The local image and small marker reference set are attributed to their source; the source website's code, guide prose, and database are not copied into the application.
