class InMemoryRepo {
  constructor() {
    this.nextId = 0;
    this.storage = new Map();
  }

  get(id) {
    return this.storage.get(id);
  }

  save(val) {
    this.storage.set(this.nextId, val);
    ++this.nextId;
    return this.nextId - 1;
  }

  update(key, val) {
    this.storage[key] = val;
    return;
  }

  isEmpty() {
    return this.storage.size === 0;
  }

  contains(key) {
    return this.storage.has(key);
  }

  clear() {
    this.stotrage.clear();
  }
}

module.exports = InMemoryRepo;
