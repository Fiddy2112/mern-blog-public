import React, { useContext } from "react";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { AuthContext } from "../../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Auth({ authRoute }) {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  let body;

  if (isAuthenticated) {
    return <Navigate to="/stored" />;
  }
  body = (
    <>
      {authRoute === "login" && <Login />}
      {authRoute === "signup" && <Signup />}
    </>
  );

  return <>{body}</>;
}

export default Auth;
