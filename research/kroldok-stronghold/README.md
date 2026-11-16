# Krol'dok Stronghold

Researched November 16, 2026. Instance **3039**, area **16842**, in **Riverglades**. The tracker has **10 quest entries** and **19 boss-specific equipment drops across six cards**, with **13 Rogue-usable items**. There is no map yet. JSON remains the maintained data source.

## Quest coverage

The [current dungeon quest index](https://foreverchanges.pro/quests/kroldok-stronghold) lists 13 quests. Eight are Alliance quests available to Rogues; five are Horde-only and excluded. Individual current pages verify quest levels, minimum levels, objectives, faction, and observed pickup positions. Their reported build is 1.60.1.70938. Questie and All The Things corroborate the records and supplement missing starters.

| ID | Included quest | Coverage |
| --- | --- | --- |
| 94980 | Krol'dok Moulding | Alliance item #267138 starts it; Tunk is the addon drop reference. Alphonse Dumas is the turn-in, not the pickup. |
| 94981 | Key Ingredients | Four Thick Leather and 12 Iron Bars; rewards the Compound Key. |
| 94982 | Eye of Mugg | Alliance version; Overlord Mugg's eye. Starter Demar Brant and his pickup position are player-trace references. |
| 94983 | Twilight Mementos | Eight Twilight Bangles; objective text calls them Cultist Bangles. |
| 94997 | Lingering Essence | Delivery follow-up to Ashe Amberhall. |
| 94998 | Curios of Curiosity | Delivery follow-up to Melanie Sable. |
| 94984 | Tome of Twilight | Nar'gurk's tome. |
| 96771 | Vengeance of the Highborne | Zalfan Moonshadow; Ranath Nightstride starts it in Alterac Mountains, not inside Riverglades. |
| 94907 | A Small Favor | Direct Riverglades introduction to Tome of Twilight; included alongside the indexed quests. |
| 94969 | Krol'dok No More! | **Availability unverified.** Alliance escort reference in Questie, ATT, and the current Wowhead Forever tooltip; absent from the current public index and player traces. Giver and pickup position remain blank. |

Excluded Horde versions: Eye of Mugg **94968**, Tome of Twilight **94972**, Krol'dok Moulding **94973**, Key Ingredients **94974**, and A Token of Vengeance **94975**. No non-Rogue class restriction is recorded on the included quests. No Horde quest is substituted for its distinct Alliance ID.

The escort's name, level 42, and objective are corroborated by [Wowhead's Forever tooltip](https://nether.wowhead.com/forever/tooltip/quest/94969). Minimum level 40 and Alliance eligibility are community database references. The objective names Marcus Tilwell as the escort target; that alone does not establish him as the giver. The addon itself explicitly says the starter is unknown. This reference is labeled in the expanded quest and is not claimed as a currently observed quest.

Chain links use Questie's **observed offer order**, separately labeled from mandatory prerequisites. The links are Moulding → Ingredients; Bring Me His Head → Twilight Mementos → Lingering Essence → Curios of Curiosity; and Curious Trinkets → A Small Favor → Tome of Twilight. Curious Trinkets (94881) and Bring Me His Head (94890) remain external references rather than extending the list to every Riverglades quest. Forward links are derived by the app. No requirement is invented for the other quests.

Current NPC traces place Demar Brant at 66.67, 81.01 in Riverglades and Ranath at 17.8, 65.95 in Alterac Mountains. Displayed positions are rounded to one decimal; they are explicitly community references. No turn-in coordinate is reused as an item pickup. Unknown instance pickup positions remain empty.

## Boss equipment

| Boss | Items |
| --- | --- |
| Slavecrusher Grox | Slavecrusher Scepter (274995), Resistance Breaker Spaulder (274996), Chain of Binding (274997) |
| Twilight Commander Zarmok | Shadowlight Athame (274998), Shadecaster's Leggings (274999), Zarmok's Plated Signet (275000) |
| War Handler Ashka | Bloodied Gutslicer (275001), War Handler's Gaze (275002), Worgbinder's Treads (275003) |
| Nar'gurk | Chain of the Corruptor (275004), Krol'dok Warplate Chest (275005), Krol'dok Warplate Helmet (275006) |
| Overlord Mugg | Mugg's Jabber (275007), Mugg's Crosser (275008), Emblem of Slamming (275009), Strongly Scented Hood (275010) |
| Bossman Toof | Band of Bossman (286428), Big-Belly Belt (286429), Toofbreaker (286430) |

Every included item's current Forever tooltip explicitly names its matching boss. The [ATT dungeon record](https://github.com/ATTWoWAddon/AllTheThings/blob/36684dda55e4aa297de3ea24475a77687b54c620/.contrib/.db/forever/dungeons%20%26%20raids/krol%27dok%20stronghold.lua) independently corroborates these tables, including Toof. Current NPC/item names take precedence over its older encounter labels “Handler Ashka” and “Overseer Mugg.” Card order follows the addon, not a measured route. Toof is not labeled rare: his tooltip only establishes Elite.

Stats, effects, equipment types, quality, required levels, and item levels come from the current Forever tooltips, preserved in [item-tooltips.json](item-tooltips.json). Mugg's two fists have distinct conditional attack-power bonuses. Emblem of Slamming preserves its self-stun, Ogre interaction, and cooldown. Toofbreaker preserves the facing condition. Conditional Warplate set bonuses are not added to base stats. No tooltip drop percentage is presented as a guaranteed probability.

Mail, plate, and the two-handed sword are excluded by the Rogue filter. Cloth, leather, accessories, one-handed maces, the dagger, and fist weapons remain usable after training; this is equipment eligibility, not a gear recommendation.

The inspected zone equipment IDs 287007–287016 are excluded: the addon places nine in zone drops, and Outrider's Gloves (287010) explicitly drop from ordinary Twilight Outriders. No confirmed named-boss association was found for these items. Recipe 273101, key 271721, quest-start items, quest rewards, and generic world drops are also excluded. Zalfan is a confirmed quest target, but no supported equipment table was found; no speculative boss card is added.

## Source limits and map

ForeverDB's current dungeon registry omits instance 3039, and its dungeon record/map endpoint returned 404. It therefore cannot be the coverage boundary or a working dungeon-guide link. The drop footer links the Wowhead zone reference instead. Current Wowhead full pages returned 403 here; the public tooltip endpoints supplied the quest/item records.

No supported published map layout was found. The addon has a commented estimated entrance coordinate with an incompatible Badlands map identifier; that coordinate is deliberately unused. No map tab or guessed marker is added.

[sources.json](sources.json) records revisions, inspected-file hashes, inclusions, and exclusions. [primary-records.json](primary-records.json) preserves relevant Questie blocks at revision `e1652ce62113c152da682baf2d6fb85f1396bcfb`; [addon.lua](addon.lua) preserves the ATT record at revision `36684dda55e4aa297de3ea24475a77687b54c620`. Current public-page details supersede older generated quest levels. Existing quest/drop records and completion storage are preserved.
