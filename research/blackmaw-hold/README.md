# Blackmaw Hold

Researched November 27, 2026. Added under **Dungeons**, suggested levels **55–60**, with **10 quest entries and 29 unique encounter equipment drops in 11 expandable cards**. Instance ID **2974**, area **16554**. The level range comes from [Blizzard's dungeon overview](https://worldofwarcraft.blizzard.com/en-us/news/24301455/).

## Quests

The list covers the seven Alliance/shared dungeon quests in the [current Method guide](https://www.method.gg/wow-forever/dungeons/blackmaw-hold): Get to the Roots of It, Blackmaw Magic, Claws That Rend, Tusks that Gore, Blackmaw Pouches, A Lost Memento, The Twin Bears, and Blackmaw Reclamation. It also includes the Alliance Beneath Nordrassil introduction, the separate repeatable Blackmaw Pouches ID, and Feeding Time!.

The [seven-entry public index](https://foreverchanges.pro/quests/blackmaw-hold) includes two Horde variants and omits several playable quests. Primary Questie generated records, authored fixes, and player traces at revision `0e6f3386b2a31b76b1b103e1d3aa6f4f6a7797ba`, [current quest tooltips](quest-tooltips.json), and the [All The Things dungeon record](https://github.com/ATTWoWAddon/AllTheThings/blob/789b0feb395396c181999063b691f854167595c6/.contrib/.db/forever/dungeons%20%26%20raids/blackmaw%20hold.lua) supply the omitted records. The [14-candidate ledger](sources.json) accounts for the ten selected IDs and four Horde-only variants, including The Reliquary of Tyr, which is also Paladin-only.

Six records copy the existing Azshara entries, changing only `zone`: **92345, 92065, 92066, 92069, 97327, and 96246**. Existing completion is shared immediately. Blackmaw Reclamation links to Blackmaw Counter-Offensive in Azshara; the app derives its reverse link. The new Alliance Get to the Roots of It links to Beneath Nordrassil, using the authored correction and addon prerequisite. First-time and repeatable pouches retain distinct IDs and saves.

The Twin Bears, Blackmaw Reclamation, and A Lost Memento retain the supported Neutral Timbermaw requirement. A Lost Memento starts from **Feathered Charm Necklace**, not an NPC: the primary record identifies turn-in NPC **Unele (249855)**, whose current tooltip places her at **43.2, 18.2 in Azshara**. Feeding Time! has no log description, so its objective uses the actual **1 Fel-Tainted Flesh** requirement and the addon’s Flesh-Eating Lasher/Regurgitated Seed Pod record. It is repeatable. Neither item-started nor interior pickups receive invented outdoor coordinates.

Blackmaw Magic is the **Alliance 97173** version from Archmage Timear in Dalaran. The pickup reference **15.37, 74.09** comes from the current primary NPC trace on the Alterac Mountains map. It is a shared dungeon task, not a Mage-only quest. The Horde version, Horde roots/introduction, and Horde Paladin chain are excluded.

## Drops

There are three equipment items for each of the seven main encounters: Impaan, Bonesnout, Withermaw, Elder Shaman Bloodmane, Blackmaw Behemoth, Unbound Spirit, and Varrox Bleakhoof. Four corroborated rares each have two items: Gortek the Apprentice, Moontouched Wanderer, Mopes, and Tunnelweb Matriarch. The Behemoth card represents the Clawbert/Behemoth encounter without duplicating its loot.

Every selected item has an explicit matching boss source and current stats in its [Forever item tooltip](item-tooltips.json). **22** associations also appear as player-observed drops in the [current dungeon guide](https://foreverchanges.pro/dungeons/blackmaw-hold); the other seven use the current tooltip source. These evidence labels remain optional for loading. The Rogue filter shows **17 equipable items**, including cloth/caster equipment a Rogue can wear; it does not claim they are recommended upgrades.

Quest items/rewards, recipes, generic world equipment, bags, and shared/trash-only drops are excluded. This includes Grove Subjugator's Blade and Satyr's Touch. Truesight Rifle and Furbolg Rib Protector explicitly name **Sabella No-Eyes**, but the inspected sources do not establish her dungeon location; they remain documented exclusions pending corroboration. No association is invented from adjacent item IDs. The current Method guide lists four rares, while the public loot index has recorded just Tunnelweb Matriarch; their coverage is combined with explicit tooltip sources.

This addition supplies Quests and Drops. It does not register a map. All prior zone/dungeon records, the Rogue simulator, and progress-storage code remain unchanged. [Maintained quests](../../data/quests.json) · [Maintained drops](../../data/drops.json)
