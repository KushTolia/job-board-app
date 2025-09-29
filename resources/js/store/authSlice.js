import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { getCsrfCookie } from "@/api.js";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
    const response = await api.get("/api/user");
    return response.data;
});

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            await getCsrfCookie();
            const response = await api.post("/api/login", { email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            await getCsrfCookie();
            const response = await api.post("/api/register", userData);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.errors) {
                return rejectWithValue(
                    Object.values(error.response.data.errors).flat().join(" ")
                );
            }
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await getCsrfCookie();
    await api.post("/api/logout");
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true,
        error: null,
        // --- THIS IS THE NEW STATE PROPERTY ---
        // It will track the last successful action ('login' or 'register').
        lastAction: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch User Cases
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null;
                state.loading = false;
            })
            // Login Cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                // --- THIS IS THE FIX ---
                state.lastAction = "login"; // We record that a login just happened.
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
            })
            // Register Cases
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.lastAction = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                // --- THIS IS THE FIX ---
                state.lastAction = "register"; // We record that a registration just happened.
            })
            .addCase(register.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
            })
            // Logout Case
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.lastAction = "logout";
            });
    },
});

export default authSlice.reducer;
