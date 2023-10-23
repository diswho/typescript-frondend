import { Reducer } from "react";
import { AuthAction } from "./authActions";

export interface AuthState {
    isLoggedIn: boolean;
    authToken?: string;
    userId?: string;
    full_name?: string;
    email?: string;
}

export const defaultAuthState: AuthState = {
    isLoggedIn: false,
};
// Reducer: It takes the result so far and the current item, then it returns the next result
export const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
    // user successfully authenticated
    if (action.type === "LOG_IN") {
        localStorage.setItem("user", JSON.stringify(action.payload));
        return {
            ...state,
            isLoggedIn: true,
            authToken: action.payload.authToken,
            userId: action.payload.userId,
            full_name: action.payload.full_name,
            email: action.payload.email,
        };
    }
    // log out user
    if (action.type === "LOG_OUT") {
        localStorage.removeItem("user");
        // return defaultAuthState;
    }
    return defaultAuthState;
}