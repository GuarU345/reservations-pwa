import { Pending } from "../../types/pendings";
import { db } from "../../utils/local-db";

export const putLocalPendings = async (pending: Pending) => {
    await db.pendings.add(pending);
}

export const getLocalPendings = async (): Promise<Pending[]> => {
    return await db.pendings.toArray();
}

export const removeLocalPending = async (uid: string) => {
    await db.pendings.delete(uid);
}