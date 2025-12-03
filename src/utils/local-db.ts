import Dexie, { Table } from "dexie";
import { Business } from "../types/business";
import { Reservation } from "../types/reservation";
import { Pending } from "../types/pendings";

class AppLocalDatabase extends Dexie {
    businesses!: Table<Business>
    reservations!: Table<Reservation>
    pendings!: Table<Pending>;

    constructor() {
        super('local-db')
        this.version(3).stores({
            businesses: '&id,name',
            reservations: '&id,business_id,user_id,status',
            pendings: '&id,businessId,numberOfPeople,startTime,endTime'
        })
    }
}

export const db = new AppLocalDatabase()

export class OfflineError extends Error {
    constructor(message = 'No hay conexión a internet') {
        super(message)
        this.name = 'OfflineError'
    }
}