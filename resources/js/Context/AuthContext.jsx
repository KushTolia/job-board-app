import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext.jsx";

// --- THIS IS THE FIX ---
// OLD, BROKEN PATH: import api, { getCsrfCookie } from '../api/api';
// NEW, CORRECT PATH:
import api, { getCsrfCookie } from "@/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    useEffect(() => {
        api.get("/api/user")
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email, password, redirectTo = "/") => {
        setLoading(true);
        setErrors(null);
        try {
            await getCsrfCookie();
            const response = await api.post("/api/login", { email, password });
            setUser(response.data);
            navigate(redirectTo);
            showNotification("Logged in successfully!");
            return true;
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.message);
            } else {
                setErrors("An unknown error occurred. Please try again.");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        setLoading(true);
        setErrors(null);
        try {
            await getCsrfCookie();
            const response = await api.post("/api/register", {
                name,
                email,
                password,
                password_confirmation,
            });
            setUser(response.data);
            navigate("/");
            showNotification("Account created successfully!");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(
                    Object.values(error.response.data.errors).flat().join(" ")
                );
            } else {
                setErrors("An unknown error occurred during registration.");
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(async () => {
        setLoading(true);
        setUser(null);
        navigate("/");
        try {
            await getCsrfCookie();
            await api.post("/api/logout");
            showNotification("Logged out successfully!");
        } catch (error) {
            showNotification(
                "Could not sync with server, but you are logged out on this device.",
                "warning"
            );
        } finally {
            setLoading(false);
        }
    }, [navigate, showNotification]);

    return (
        <AuthContext.Provider
            value={{ user, loading, errors, login, register, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
