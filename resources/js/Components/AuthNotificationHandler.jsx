import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNotification } from "@/Context/NotificationContext.jsx";

// A simple custom hook to get the previous value of a variable.
// This helps us detect when a value has changed from one render to the next.
const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }); // No dependency array, so it runs after every render
    return ref.current;
};

/**
 * This is a "listener" component. It renders nothing. Its only job is to
 * watch for changes in the Redux authentication state and trigger global
 * notifications as a side effect.
 */
const AuthNotificationHandler = () => {
    // Get the tools we need: the notification function and the Redux state.
    const { showNotification } = useNotification();
    // Select all the state we need, including our new 'lastAction'.
    const { user, error, lastAction } = useSelector((state) => state.auth);

    // Get the *previous* state of the user and error.
    const prevUser = usePrevious(user);
    const prevError = usePrevious(error);

    // This effect runs every time our auth state changes.
    useEffect(() => {
        // --- THIS IS THE CORRECTED LOGIC ---

        // Case 1: A user just appeared (login or registration success)
        if (!prevUser && user) {
            if (lastAction === "login") {
                showNotification("Logged in successfully!");
            } else if (lastAction === "register") {
                showNotification("Account created successfully!");
            }
        }

        // Case 2: A user just disappeared (logout success)
        if (prevUser && !user) {
            // --- THIS IS THE CORRECTED LOGOUT MESSAGE ---
            // showNotification("Logged out successfully!", "info");
            showNotification("Logged out successfully!");
        }

        // Case 3: An error just appeared (login or registration failure)
        if (!prevError && error) {
            showNotification(error, "error");
        }
    }, [user, error, lastAction, prevUser, prevError, showNotification]);

    // This component renders nothing to the DOM.
    return null;
};

export default AuthNotificationHandler;
