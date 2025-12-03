import { db } from "../../utils/local-db"

export const saveLocalBusinesses = async (list) => {
    await db.businesses.clear()
    await db.businesses.bulkPut(list)
}

export const getLocalBusinesses = async () => {
    return await db.businesses.toArray()
}