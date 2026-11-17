(() => {
'use strict';
const $ = selector => document.querySelector(selector);
const panel = $('#cooking-panel');
const state = { data: null, pending: null, active: false, version: 0, itemId: '' };
const id = value => typeof value === 'string' && /^\d+$/.test(value);

async function load() {
  if (state.data) return state.data;
  if (!state.pending) state.pending = (async () => {
    const response = await fetch('./data/professions/cooking.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Cooking unavailable');
    const data = await response.json();
    if (data?.profession !== 'Cooking' || !Array.isArray(data.recipes) || !data.recipes.every(recipe => recipe &&
      id(recipe.id) && id(recipe.itemId) && typeof recipe.name === 'string' && typeof recipe.effect === 'string' &&
      (recipe.cookingSkill === null || (Number.isInteger(recipe.cookingSkill) && recipe.cookingSkill > 0)) &&
      Number.isInteger(recipe.yieldCount) && recipe.yieldCount > 0 &&
      Array.isArray(recipe.ingredients) && recipe.ingredients.length && recipe.ingredients.every(ingredient => ingredient &&
        id(ingredient.itemId) && typeof ingredient.name === 'string' && Number.isInteger(ingredient.quantity) && ingredient.quantity > 0)) ||
      new Set(data.recipes.map(recipe => recipe.id)).size !== data.recipes.length) throw new Error('Invalid Cooking data');
    // Acquisition, availability, and source metadata are optional and never block loading.
    state.data = data;
    return data;
  })().finally(() => { state.pending = null; });
  return state.pending;
}

function cell(className, label) {
  const node = document.createElement('td');
  node.className = className; node.dataset.label = label;
  return node;
}

function itemLink(name, itemId) {
  const link = document.createElement('a');
  link.textContent = name; link.href = `https://www.wowhead.com/forever/item=${itemId}`;
  link.target = '_blank'; link.rel = 'noopener noreferrer';
  return link;
}

function detail(text) {
  const node = document.createElement('span');
  node.className = 'cooking-detail'; node.textContent = text;
  return node;
}

function row(recipe) {
  const row = document.createElement('tr'); row.className = 'cooking-row'; row.dataset.recipeId = recipe.id;
  const name = cell('cooking-name', 'Recipe');
  name.append(itemLink(recipe.name, recipe.itemId));
  if (recipe.yieldCount > 1) name.append(` ×${recipe.yieldCount}`);
  if (recipe.availability === 'unverified') {
    const label = document.createElement('span'); label.className = 'fish-unverified'; label.textContent = ' (Unverified)';
    label.title = 'Recipe availability in Forever is unverified.';
    name.append(label);
  }
  if (Number.isInteger(recipe.requiredLevel) && recipe.requiredLevel > 0) name.append(detail(`Food level ${recipe.requiredLevel}`));
  const skill = cell('cooking-skill', 'Cooking');
  skill.textContent = recipe.cookingSkill === null ? 'Unverified' : String(recipe.cookingSkill);
  if (typeof recipe.station === 'string' && recipe.station !== 'Cooking Fire') skill.append(detail(recipe.station));
  const ingredients = cell('cooking-ingredients', 'Ingredients');
  const list = document.createElement('ul');
  for (const ingredient of recipe.ingredients) {
    const line = document.createElement('li');
    const link = itemLink(ingredient.name, ingredient.itemId);
    if (globalThis.ProfessionGuide?.hasFishingItem(ingredient.itemId)) {
      link.href = `#${new URLSearchParams({ profession: 'Fishing', item: ingredient.itemId })}`;
      link.removeAttribute('target'); link.removeAttribute('rel');
      link.title = 'Show Fishing catch locations';
    }
    line.append(`${ingredient.quantity} × `, link); list.append(line);
  }
  ingredients.append(list);
  const effect = cell('cooking-effect', 'Food effect'); effect.textContent = recipe.effect;
  if (Array.isArray(recipe.extraEffects)) for (const text of recipe.extraEffects) if (typeof text === 'string') effect.append(detail(text));
  const learn = cell('cooking-learn', 'Learn from');
  const acquisition = recipe.acquisition && typeof recipe.acquisition === 'object' ? recipe.acquisition : {};
  const books = Array.isArray(acquisition.items) ? acquisition.items.filter(book => book && id(book.itemId)) : [];
  const kind = typeof acquisition.kind === 'string' && acquisition.kind.trim() ? acquisition.kind : 'Unverified';
  if (books.length) {
    books.forEach((book, index) => {
      if (index) learn.append(' · ');
      const link = itemLink(books.length === 1 ? kind : typeof book.name === 'string' ? book.name : 'Recipe', book.itemId);
      if (typeof book.name === 'string') link.title = book.name;
      learn.append(link);
    });
  } else learn.textContent = kind;
  row.append(name, skill, ingredients, effect, learn);
  return row;
}

function applyItemName() {
  if (!state.itemId || !state.data) return;
  const ingredient = state.data.recipes.flatMap(recipe => recipe.ingredients).find(ingredient => ingredient.itemId === state.itemId);
  $('#cooking-search').value = ingredient?.name || state.itemId;
}

function render() {
  if (!state.active || panel.hidden || !state.data) return;
  const query = $('#cooking-search').value.trim().toLocaleLowerCase();
  const skillText = $('#cooking-skill').value.trim();
  const skill = skillText ? Number(skillText) : Infinity;
  const recipes = state.data.recipes.filter(recipe =>
    (!state.itemId || recipe.ingredients.some(ingredient => ingredient.itemId === state.itemId)) &&
    (!Number.isFinite(skill) || (recipe.cookingSkill !== null && recipe.cookingSkill <= skill)) &&
    (!query || [recipe.name, recipe.id, recipe.itemId, recipe.effect, ...(Array.isArray(recipe.extraEffects) ? recipe.extraEffects.filter(text => typeof text === 'string') : []), recipe.station,
      recipe.cookingSkill === null ? 'unverified' : recipe.cookingSkill,
      recipe.availability === 'unverified' ? 'unverified' : '',
      ...recipe.ingredients.flatMap(ingredient => [ingredient.name, ingredient.itemId]), recipe.acquisition?.kind]
      .join(' ').toLocaleLowerCase().includes(query)));
  $('#cooking-rows').replaceChildren(...recipes.map(row));
  $('#cooking-empty').hidden = recipes.length > 0;
  $('#cooking-result-count').textContent = `${recipes.length} of ${state.data.recipes.length} recipes`;
}

async function show() {
  state.active = true; panel.hidden = false;
  const version = ++state.version;
  $('#cooking-error').hidden = true; $('#cooking-empty').hidden = true;
  $('#cooking-result-count').textContent = 'Loading Cooking…';
  globalThis.ProfessionGuide?.prepareFishingLinks().then(() => {
    if (state.active && version === state.version) render();
  }).catch(() => {});
  try {
    await load();
    if (!state.active || version !== state.version || panel.hidden) return;
    applyItemName(); render();
  } catch {
    if (!state.active || version !== state.version || panel.hidden) return;
    $('#cooking-error').hidden = false; $('#cooking-rows').replaceChildren();
    $('#cooking-result-count').textContent = 'Cooking unavailable';
  }
}

$('#cooking-search').addEventListener('input', () => { state.itemId = ''; render(); });
$('#cooking-skill').addEventListener('input', render);
$('#cooking-retry').addEventListener('click', () => { state.data = null; show(); });

globalThis.CookingGuide = Object.freeze({
  show,
  hide: () => { state.active = false; ++state.version; panel.hidden = true; },
  prepareLinks: load,
  hasRecipesFor: itemId => Boolean(state.data?.recipes.some(recipe => recipe.ingredients.some(ingredient => ingredient.itemId === itemId))),
  filterItem: itemId => {
    if (!id(itemId)) return;
    state.itemId = itemId; $('#cooking-search').value = itemId; $('#cooking-skill').value = '';
    applyItemName(); render();
  },
});
})();
