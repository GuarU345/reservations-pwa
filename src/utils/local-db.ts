import Dexie, { Table } from "dexie";
import { Business } from "../types/business";
import { Reservation } from "../types/reservation";

class AppLocalDatabase extends Dexie {
    businesses!: Table<Business>
    reservations!: Table<Reservation>

    constructor() {
        super('local-db')
        this.version(2).stores({
            businesses: '&id,name',
            reservations: '&id,business_id,user_id,status'
        })
    }
}

export const db = new AppLocalDatabase()

// Error personalizado para modo offline
export class OfflineError extends Error {
    constructor(message = 'No hay conexión a internet') {
        super(message)
        this.name = 'OfflineError'
    }
}