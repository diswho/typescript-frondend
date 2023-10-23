import { createContext, useCallback, useEffect, useReducer } from "react";
import { AuthState, authReducer, defaultAuthState } from "./authReducer";
import { useNavigate } from "react-router-dom";
import { AuthActionEnum } from "./authActions";

type AuthProvideProps = {
    // ReactElement is the type for elements in React
    children: React.ReactElement;
};

export type UserData = {
    authToken: string;
    userId: string;
    full_name: string;
    email: string;
};

export interface AuthContext {
    authState: AuthState;
    globalLogInDispatch: (props: UserData) => void;
    globalLogOutDispatch: () => void;
}
// createContext lets components pass information deep down without explicitly passing props.
const authCtx = createContext<AuthContext>({
    authState: defaultAuthState,
    globalLogInDispatch: () => { },
    globalLogOutDispatch: () => { },
})
export const AuthContextProvider = (props: AuthProvideProps) => {
    const { children } = props;
    const [authState, authDispatch] = useReducer(authReducer, defaultAuthState);
    const navigate = useNavigate();

    // Check if user detail is persisted, mostly catering for refreshing of the browser
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            const userData: UserData = JSON.parse(user);
            authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData })
        }
    }, [])
    // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed
    const globalLogInDispatch = useCallback((props: UserData) => {
        const { authToken, email, full_name, userId } = props;
        authDispatch({
            type: AuthActionEnum.LOG_IN,
            payload: {
                authToken,
                userId,
                full_name,
                email,
            },
        });
        navigate("/resource");
    }, [navigate])

    const globalLogOutDispatch = useCallback(() => {
        authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null })
        navigate("/login")
    }, [navigate])

    // context values to be passed down to children
    const ctx = {
        authState,
        globalLogInDispatch,
        globalLogOutDispatch,
    }
    // Provider is the container for all React Spectrum applications
    return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>
}

export default authCtx;