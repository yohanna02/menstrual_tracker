import axios from "axios";

const BASE_URL = "https://menstrual-tracker-latest.onrender.com";
// const BASE_URL = "http://192.168.43.80:3000";

export const standardFetch = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

export const authFetch = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

export function setAuthFetchToken(token: string | undefined) {
    if (!token) return;
    authFetch.defaults.headers["Authorization"] = `Bearer ${token}`;
}
