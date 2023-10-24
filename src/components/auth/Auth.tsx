import { useLocation } from "react-router-dom";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { AuthData } from "../hooks/api/apiData";
import AuthContext from "../../store/auth/AuthContextProvider";
import { validateEmailFormat, validatePasswordLength } from "./validations";
import { LoginService } from "../../client";

const Auth = () => {
  const [authData, setAuthData] = useState<AuthData>();
  const { globalLogInDispatch } = useContext(AuthContext);

  const location = useLocation();
  const currentPathArray = location.pathname.split("/");
  const isLogin = currentPathArray[currentPathArray.length - 1] === "login";

  useEffect(() => {
    if (authData && "success" in authData) {
      globalLogInDispatch({
        authToken: authData.user.auth_token,
        userId: authData.user.user_id,
        full_name: authData.user.full_name,
        email: authData.user.email,
      });
    }
  }, [authData, globalLogInDispatch]);

  const authHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Validations first!
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    const userName = data.get("name");
    try {
      if (
        !validateEmailFormat(userEmail?.toString() || "") ||
        !validatePasswordLength(userPassword?.toString() || "")
      ) {
        throw new Error("Incorrect credential format!");
      }
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          name: userName,
        }),
      };
      const endpoint = `/user/${isLogin ? "login" : "register"}`;
      // await request(endpoint, params, setAuthData);

      LoginService.loginAccessTokenPost({
        username: userEmail?.toString() || "",
        password: userPassword?.toString() || "",
      });
      //   LoginService()
    } catch (error: any) {
      // setError(error.message || error);
      throw new Error(error.message || error);
    }
  };

  return (
    <>
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      {/* {isLogin ? <LogInForm onSubmit={authHandler} /> : <RegisterForm onSubmit={authHandler} />} */}
      {isLogin ? (
        <LogInForm onSubmit={authHandler} />
      ) : (
        <RegisterForm onSubmit={authHandler} />
      )}
    </>
  );
};
export default Auth;
