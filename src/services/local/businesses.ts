import { Business } from "../../types/business"
import { db } from "../../utils/local-db"

export const saveLocalBusinesses = async (list: Business[]) => {
    await db.businesses.clear()
    await db.businesses.bulkPut(list)
}

export const getLocalBusinesses = async (): Promise<Business[]> => {
    return await db.businesses.toArray()
}