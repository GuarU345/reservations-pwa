/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preferences } from "@capacitor/preferences";

export const saveSession = async (session: any) => {
    await Preferences.set({
        key: "session",
        value: JSON.stringify(session)
    });
};

export const loadSession = async () => {
    const { value } = await Preferences.get({ key: "session" });
    if (!value) return null
    return JSON.parse(value)
};

export const getToken = async () => {
    const { value } = await Preferences.get({ key: "session" })
    if (!value) return null
    const session = JSON.parse(value)
    return session.token
}

export const clearSession = async () => {
    await Preferences.remove({ key: "session" })
};
