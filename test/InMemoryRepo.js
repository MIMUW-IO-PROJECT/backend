class InMemoryRepo {

    constructor() {
        this.nextId = 0;
        this.storage = new Map();
    }

    get(id) {
        return this.storage.get(id);
    }

    save(form) {
        this.storage.set(this.nextId, form);
        ++this.nextId;
        return this.nextId - 1;
    }

    isEmpty() {
        return this.storage.size === 0;
    }

    contains(id) {
        return this.storage.has(id);
    }

    clear() {
        this.stotrage.clear();
    }

}

module.exports = InMemoryRepo;