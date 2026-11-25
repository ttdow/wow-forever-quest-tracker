# Blackrock Depths

Added November 25, 2026 under **Dungeons → Blackrock Depths (52–60)**, with **65 Alliance/shared quest entries**, **131 equipment drops across 30 encounter cards**, and **four map views with 58 entries**. **80 items** pass the Rogue equipment filter. [Quest data](../../data/quests.json) · [Drop data](../../data/drops.json) · [Map data](../../data/maps/blackrock-depths.json)

## Quest coverage

The [43-entry current index](https://foreverchanges.pro/quests/blackrock-depths) contributes **25 eligible entries**. The full dungeon registry, current addon, primary quest conditions, and related chains identify 40 more introductions, follow-ups, profession/reputation tasks, and attunement steps. The [88-candidate ledger](sources.json) accounts for **65 included, 20 Horde-only, two older unassigned variants, and one unverified legacy record**.

- **Alliance Onyxia attunement:** Dragonkin Menace, the six True Masters steps, Windsor, Abandoned Hope, the item-started note, A Shred of Hope, Jail Break!, and the Stormwind continuation. The Dragon's Eye and Drakefire Amulet reuse their existing Winterspring records and completion IDs.
- **Royal rescue:** the two Smoldering Ruins steps, Kharan's prison/conversation steps, the Ironforge return, Emperor kill, and Moira's hand-in. **The Royal Rescue (4003) and The Princess Saved? (4004)** are Horde variants despite broad public-page labels: the primary race mask is Horde and their route begins with Thrall. They are excluded. The Alliance route requires sparing Moira.
- **Keys, access, and professions:** both Dark Iron Legacy steps, Attunement to the Core (7848), Spectral Chalice/Smelt Dark Iron, five repeatable Thorium Brotherhood material hand-ins, and A Binding Contract. Franclorn is outside the instance and must be addressed while dead/in ghost form. The Spectral Chalice requires Mining 230.
- **Boss and bar tasks:** Incendius and the Pyron introduction; Bael'Gar; Hurley, Ribbly, the Love Potion, Rocknot's door event, Heart of the Mountain, and the Good Stuff.
- **Summoned encounters:** The Challenge and its explicit Dungeon Set 2 preparation chain, plus Three Kings of Flame. These are available to a Rogue but require progression/summoning conditions; their presence does not mean the summoned arena party appears on an ordinary run.
- **Seasonal:** Morndeep the Elder is included with a Lunar Festival label and an event-specific map reference.
- **Current Forever delivery:** In Demand - Blackrock Legal Records (96075), started by Pix Xizzix in Booty Bay. Its current tooltip and primary offer/completion traces corroborate the BRD/Blackrock Spire objectives and Alliance restriction despite the public quest page returning 404.

The 37 explicit prerequisite references retain primary Classic provenance. Optional introductions such as Ragnar Thunderbrew and Yuka Screwspigot are earlier-chain links rather than invented completion requirements. **A Taste of Flame (4022 and 4023) are alternative introductions** in the same exclusive group; the Bael'Gar step does not demand completing both. The Kalaran/Trinkets preparation is labeled optional and belongs to the existing-molt route.

The old unassigned Last Element (3911) and Attunement (7487) variants are excluded; supported versions are not merged by name. **Ever After (82062)** has no supported starter/offer or public quest page, and its only known turn-in NPC is outside BRD. It is excluded rather than promoted from a broad generated category. Known Horde-only quests and non-Rogue class restrictions remain excluded.

Pickup areas retain their actual zones. Ironforge NPCs use city-map references rather than broad Dun Morogh positions. Dungeon pickups, ghost pickups, and item-started quests have no invented outdoor coordinates. All previous quest records and saved IDs are unchanged.

## Equipment and source corrections

The loot list includes the six normal arena bosses, Theldren's summoned encounter, Panzor, Verek, the main bosses, the bar encounters, and the vault/Seven encounter containers. Only boss- or encounter-specific equipment is selected. Ribbly's unique bags and ammunition containers, Fineous's unique shirt, and class relics are retained; recipes, ammunition, keys, materials, quest items/rewards, generic world greens/blues, and shared holiday items are excluded.

Current sources correct several stale addon associations:

- Hand of Justice → **Emperor Dagran Thaurissan**.
- Firemoss Boots → **Hurley Blackbreath**; Golem Skull Helm → **Magmus**.
- Deathdealer Breastplate, Haunting Specter Leggings, The Hammer of Grace, and Wraith Scythe belong to **The Seven's chest**, not the old Secret Safe assignment.
- High Priestess Boots and Swiftwalker Boots retain the **Princess** source, not Emperor duplicates.
- **Lightforge Gauntlets** now name Timmy the Cruel and are excluded from BRD.

There are **67 Seen in Forever, 47 Wowhead ref., and 17 Classic ref.** item/source records. Classic fallbacks are backed by the primary loot pools and current addon when the inspected tooltip lacks a boss line. Doom'rel/Anger'rel sources are grouped under The Seven; Volida belongs to Theldren's summoned party. The Vault's two cards identify Relic Coffers and Secret Safe separately.

All item levels, requirements, quality, damage, armor, stats, procs, and conditional set effects use current Forever tooltips, preserved in [item-tooltips.json](item-tooltips.json). Random enchantments remain unspecified. Spell proc metadata that conflicts with the rewritten effect text is not substituted for that text. The Rogue filter includes Forever's one-handed axes and equipable caster gear/bags, while excluding mail, plate, shields, relics, staves, polearms, two-handed weapons, and wands. It describes equipability, not recommended gear.

## Maps

Four unmodified client minimaps are stored locally: **Main dungeon & lava route**, **Arena & Forgewright monument**, **Grim Guzzler & Flamelash**, and **Vault & upper walkways**. [Client maps and encounter reference](https://foreverdb.net/dungeon/230-blackrock-depths)

The views mark main bosses, all arena variants at the shared encounter center, Panzor/Verek, Windsor/Kharan, bar quest NPCs, Gloom'rel, the Monument, Shadowforge Lock, Core Fragment, Black Forge, vault containers, and the entrance arrival. Hurley's marker uses the three source keg positions as an approximate event center. Theldren requires the Banner of Provocation; arena references do not assert seven simultaneous bosses.

**Chest spawns is off by default.** Relic Coffers require keys; opening all 12 triggers the vault encounter and access to the Heart of the Mountain. These are encounter containers, not generic random-treasure guarantees. The Secret Safe, Dark Coffer, and Chest of The Seven remain separate. Outside quest givers and speculative item-drop clouds are not drawn into the instance.

Each view uses its client transform: `pixelX = (floor.y - worldY) × scale`, `pixelY = (floor.x - worldX) × scale`, then divides by image width/height for percentage coordinates. Original Classic world coordinates are retained. These are reference locations, not newly measured Forever spawns. Source labels remain optional and cannot block quests, drops, or maps.

## Sources and preservation

Research uses ForeverDB build **1.60.1.71091**, the exact build recorded by its dungeon registry, Questie revision `498734b13f1ed25931566298f6ca119ad058c17f`, [All The Things](addon.lua) revision `832410d86fdf3902d0804d8f84056a119a0c0292`, current Forever quest/item tooltips, and the read-only Classic snapshot identified in [sources.json](sources.json). The registry's own recorded build takes precedence if it differs from a current site's header. [primary-records.json](primary-records.json) preserves inspected quest conditions; the source ledger records fetched pages, failures, hashes, and removed loot associations.

Existing quests, dungeon drops, maps, professions, and both progress-storage keys are preserved. The tracker totals are **1,414 list entries / 1,331 unique quest IDs** and **530 equipment entries**. Map artwork retains Blizzard's copyright; Classic-derived positions retain their [GPL-3.0 data license](../desolace-map/LICENSE-GPL-3.0.txt). Hosting remains static with no runtime or build installation.
