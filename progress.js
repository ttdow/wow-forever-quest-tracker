(() => {
  'use strict';
  // Separate projects on the same GitHub Pages domain keep separate saves.
  const directory = location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1);
  const key = `wow-forever:completed:v1:${directory}`;
  globalThis.QuestProgress = Object.freeze({
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
    save(completed) {
      localStorage.setItem(key, JSON.stringify([...completed].sort()));
    },
  });
})();
