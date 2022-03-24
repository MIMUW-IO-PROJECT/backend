class InMemoryFormRepo {

    constructor() {
        this.nextId = 0;
        this.storage = {};
    }

    get(id) {
        return this.storage[id];
    }

    save(form) {
        this.storage[this.nextId] = form;
        ++this.nextId;
        console.log(this.storage);
        return this.nextId - 1;
    }

    isEmpty() {
        return (this.nextId === 0);
    }

    

}
module.exports = InMemoryFormRepo;