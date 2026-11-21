(() => {
  'use strict';
  // Separate projects on the same GitHub Pages domain keep separate saves.
  const directory = location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1);

  function progressStore(key) {
    return Object.freeze({
      key,
      load() {
        const raw = localStorage.getItem(key);
        if (raw === null) return new Set();
        const saved = JSON.parse(raw);
        if (!Array.isArray(saved) || !saved.every(id => typeof id === 'string' && /^\d+$/.test(id))) {
          throw new Error('Invalid saved progress.');
        }
        return new Set(saved);
      },
      save(ids) {
        localStorage.setItem(key, JSON.stringify([...ids].sort()));
      },
    });
  }

  globalThis.QuestProgress = progressStore(`wow-forever:completed:v1:${directory}`);
  globalThis.LeatherworkingProgress = progressStore(`wow-forever:known-leatherworking:v1:${directory}`);
})();
