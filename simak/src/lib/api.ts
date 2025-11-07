import {AuthError} from "./errors";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    const optionsHeaders = new Headers(options.headers);
    optionsHeaders.forEach((value, key) => {
        headers.set(key, value);
    });

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new AuthError("Unauthorized");
        }
        const errorData = await response.json().catch(() => (null));
        throw new Error(errorData?.message || "An error occurred");
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export default apiFetch;