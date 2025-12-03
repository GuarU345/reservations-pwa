import Dexie, { Table } from "dexie";

class AppLocalDatabase extends Dexie {
    businesses!: Table

    constructor() {
        super('local-db')
        this.version(1).stores({
            businesses: '&id,name'
        })
    }
}

export const db = new AppLocalDatabase()