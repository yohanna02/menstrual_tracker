import axios from "axios";

const BASE_URL = "http://192.168.43.79:3000";

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