# The Drowned City map

Researched November 14, 2026. The maintained dataset is [data/maps/drowned-city.json](../../data/maps/drowned-city.json).

## Artwork and attribution

The user supplied [this Reddit map](https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fi-have-created-all-the-dungeon-maps-for-phase-1-of-world-of-v0-qa4u9u3del1i1.jpeg%3Fwidth%3D1080%26crop%3Dsmart%26auto%3Dwebp%26s%3D0dcd0975ad7a9ac76764293f9c6e91bf36c12328). Its [original image](https://i.redd.it/qa4u9u3del1i1.jpeg) is **3000 × 2000**, compared with the linked 1080 × 720 preview. The original is stored byte-for-byte at `assets/maps/drowned-city.jpg`, with no cropping, resizing, annotations, or recompression.

The visible credit reads **Santiago Reyes — 2026 — Atlas de Azeroth: Forever**. It is a fan recreation, not a client-extracted map. The original credit remains visible at the bottom right. The map footer names Santiago Reyes and links the Reddit image. World of Warcraft artwork remains © Blizzard Entertainment. No open redistribution license was established, and the Classic map datasets' GPL license is not asserted for this image or the marker interpretations. The footer links [Reddit's source terms](https://redditinc.com/policies/user-agreement). Reddit's post search returned 403, so no unverifiable account/profile attribution is added.

## Included locations

Five image-reference markers provide search and popups:

| Location | Kind | Image pixel X | Image pixel Y |
| --- | --- | ---: | ---: |
| Sunken Hollow entrance | Entrance | 2530 | 1045 |
| Altar of the Serpent | Area | 1675 | 520 |
| Eternal Amphitheater | Area | 820 | 1080 |
| Abyssal Dais | Area | 540 | 1080 |
| Deep Archives | Area | 1540 | 1430 |

Positions are interpreted from the map's portal symbol and named structures. They are approximate representatives of those areas, not measured NPC or object spawns. Percentages are `x = pixelX / 3000 × 100` and `y = pixelY / 2000 × 100`, rounded to two decimals. They are relative to this exact image and are not outdoor zone or `/way` coordinates. Every marker has `verification: community-reference`; none qualifies for the Forever-confirmed filter.

The [ForeverChanges dungeon guide](https://foreverchanges.pro/dungeons/the-drowned-city) independently identifies Sunken Hollow as the entrance cave. It does not supply matching interior boss coordinates. The named-area markers deliberately do not assert that a particular boss or quest object occupies the marked point.

## Coverage and operation

The Map view loads its local JPG and JSON on demand. It supports pan/zoom, Fit map, search by area names or image coordinates, separate Entrance/Areas layers, evidence filtering, and coordinate copying. The dungeon's existing Quests and Drops views remain available alongside Map.

No boss, chest, or tablet spawn positions were established for this image. The known tablet descriptions (initial pool, left of Var'Taka, near Captain Dreadrise, behind Min'loth) are retained in the quest research but do not justify assigning exact locations to this map. No attunement NPCs or external quest givers are projected onto the interior layout. Boss locations must not be inferred solely from names such as Altar of the Serpent.

Earlier accessible sources lacked an interior map: [The Forever Era guide](https://theforeverera.com/en/dungeons/the-drowned-city/) states that its client data has no map, ForeverDB's dungeon 2970 record and minimap image returned 404, and Wowhead's area-16550 map image returned 404. Those findings do not mean a fan map is unavailable; the user-supplied artwork resolves that gap.

The [source inventory](sources.json) records the original image hash, dimensions, source URLs, guide snapshot hash, and pixel interpretations. Existing quests, drops, other map datasets, completion IDs, and browser progress storage are unchanged.
