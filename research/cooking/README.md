# Cooking: fish and shellfish

Added November 16, 2026. The user selected **fish and shellfish recipes**, excluding unrelated dishes whose herbs or other ingredients might happen to occur in fishing containers. The maintained [cooking.json](../../data/professions/cooking.json) contains **39 recipe records**, selected from all **132** entries in the current [ForeverDB Cooking catalog](https://foreverdb.net/data/professions/cooking.json). The [coverage ledger](coverage.json) records every inclusion/exclusion. No hosting runtime, build step, or CSV conversion is required.

## Coverage and verification

The selection includes every catalog recipe using one of the established raw fish, Raw Spinefin Halibut, or the clam/crawler/crab raw materials. It includes **Pincer Bites**, **Briny Seafood Stew**, **Plated Armorfish**, **Clam Linguine**, **Savory Whimsyfin Delight**, the two feast records, and the older fish dishes. Ingredient-based coverage catches seafood dishes whose names do not contain “fish” or “crab.” Recipes without a fish/shellfish ingredient, including camp objects and unrelated food, remain excluded. Mixed recipes such as Briny Seafood Stew qualify because they use crab meat, even though other ingredients come from creatures.

Current item and spell tooltips independently cross-check all 39 recipes' reagent identities and their cooked products. Every recipe-book Cooking requirement available in the inspected records agrees with the current catalog. Counts, output quantities, and station requirements come from that client catalog; recipe-book and spell tooltips corroborate the listed quantities. The inspected current profession pages report client build **1.60.1.70938**. Cooking trainer requirements remain Classic references where the source labels them that way.

Sources:

- [ForeverDB Cooking records](https://foreverdb.net/data/professions/cooking.json): spell IDs, products, quantities, ingredients, Cooking skill, station, recipe books, and available acquisition categories.
- [ForeverChanges Cooking](https://foreverchanges.pro/professions/cooking): current food/recipe context, the kill-XP food change, and the distinction between client values and in-game verification.
- Wowhead **Forever** public tooltips for every included spell, product, ingredient, and known recipe book. Each maintained recipe links its exact endpoints. Their complete inspected text is preserved in [tooltips.json](tooltips.json).
- [Savory Whimsyfin Delight community guide](https://foreverchanges.pro/savory-whimsyfin-delight) for its transformation effect. The item tooltip itself only says “Eat me.” Savory Deviate Delight's transformation retains Classic-reference provenance.

The raw selected catalog records are preserved in [recipe-records.json](recipe-records.json). [coverage.json](coverage.json) records inspected-file hashes, all 132 decisions, and uncertain records. A client record is not proof that a recipe has been learned or observed on the live server.

## Availability limits

Five records carry an inline **Unverified** availability label:

| Recipe | Limit |
| --- | --- |
| Spinefin Halibut (1247741) | Cooking skill and learning method are unrecorded; both show Unverified. No skill is inferred from its yellow/green skill thresholds. |
| Grand Lobster Banquet (1225763) | Recipe tooltip explicitly warns it was added in Season of Discovery and may not be in Forever. |
| Specklefin Feast (1225762) | Same explicit tooltip warning. |
| Darkclaw Bisque (470359) | Legacy client recipe with no established acquisition/in-game availability record in the inspected sources. |
| Smoked Redgill (470370) | Same legacy-record limitation. |

They remain visible to satisfy the requested full recipe scope, with their uncertainty shown. Other recipes whose book source is unrecorded link the known **Recipe** item without claiming a vendor or drop source. Recipe books and food effects are not hidden just because acquisition metadata is absent. Source/acquisition/availability labels are optional and never part of core loading validation.

## Food effects and requirements

The table shows the primary food buff and duration, plus the current **+5% kill XP** where explicitly present. Foods without a stat buff show their health restoration instead. Full restoration and tooltip text remain in the data/research; the recipe name links the cooked item. The XP bonus is not applied to Goblin Deviled Clams, either transformation food, either feast, Darkclaw Bisque, or Smoked Redgill when their current tooltip does not state it.

Examples verified against current Forever tooltips:

- Brilliant Smallfish: +2 Attack Power; Slitherskin Mackerel: +6; Longjaw Mud Snapper: +10.
- Loch Frenzy Delight: +3 Fishing; Bristle Whisker Catfish: +8; Rockscale Cod: +12; Filet of Redgill: +18.
- Smoked Sagefish: +4 Spell Damage; Sagefish Delight: +7; Spotted Yellowtail/Nightfin Soup: +22; Baked Salmon/Lobster Stew: +28.
- Grilled Squid and Hot Smoked Bass: +1% Critical Strike, not their older Classic Agility/Spirit bonuses.
- Plated Armorfish: +150 Armor.
- Goblin Deviled Clams: +6 Stamina and Spirit, 15 minutes, with no asserted kill-XP bonus.
- Darkclaw Bisque: +12 Spell Damage for 10 minutes; Smoked Redgill: +22 Healing for 10 minutes. Their weaker/different legacy effects are not replaced with the ordinary lobster/redgill dish effects.
- The two unverified feasts: +20 Attack Power, +23 Spell Damage, +44 Healing Power, +10 Stamina for 45 minutes; serve up to 40 players over three minutes.

**Undermine Clam Chowder makes two per craft** and is labeled ×2. All ingredient quantities are per craft, not per output item. Food-level requirements are shown beneath the recipe name; they are not confused with Cooking skill.

Seven current client records require an **Iron Oven**: Grilled Squid, Hot Smoked Bass, Poached Sunscale Salmon, Clam Linguine, Baked Salmon, Lobster Stew, and Mightfish Steak. Their Cooking cells show that requirement. Other listed records use a Cooking Fire. No oven requirement is guessed solely from a high Cooking skill.

## Fishing links and interface

Open **Professions → Cooking**, or [the direct Cooking view](https://ttdow.github.io/wow-forever-quest-tracker/#profession=Cooking). Search names, ingredients, effects, IDs, and station; optionally enter a Cooking skill to show known requirements at or below it. An unknown skill is excluded while that numeric filter is active, because eligibility cannot be established. Clear the field to restore all records.

The cross-links are derived from stable item IDs. Cooking ingredients present in the existing Fishing dataset open their catch groups; Fishing rows with matching recipes show a Cooking link. **23 fish species** have such links. Multiple recipes for the same raw fish remain together. Links include an `item` fragment parameter, e.g. `#profession=Cooking&item=13758`; browser Back/Forward restores the linked profession and filter. Ordinary manual searches and Fishing's By fish/By area selection remain usable.

Fishing's maintained catches are unchanged: 30 species, 73 catch groups, 298 area references, 53 listed areas. Clam/crab materials and Raw Spinefin Halibut are not assigned invented Fishing locations. Ingredients outside that dataset link their item reference instead. A Cooking recipe alone still does not establish that its ingredient can be caught in a given water.

Each profession loads and retries independently. A failed Cooking request does not block Fishing, and missing Fishing data does not prevent Cooking rows from loading. Link indexes load in the background and do not become prerequisites for either table. Late requests cannot reveal a panel after switching away. Both the desktop table and narrow-screen labeled rows retain all five columns' information.

Quest/drop records, catch data, completion IDs, and the local-storage key are preserved. This feature does not write to saved quest progress.
