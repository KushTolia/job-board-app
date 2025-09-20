import axios from "axios";

const api = axios.create({
    // This MUST be a relative path. In production, it will correctly point to
    // http://job-board.test, allowing the Apache proxy to work.
    baseURL: "/",
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

export const getCsrfCookie = () => api.get("/sanctum/csrf-cookie");

export default api;
