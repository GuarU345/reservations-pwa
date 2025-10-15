import ax from "axios";

export const axios = ax.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:54321/api",
})