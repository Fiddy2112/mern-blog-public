import React, { useContext } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Auth({ authRoute }) {
  let body;
  body = (
    <>
      {authRoute === "login" && <Login />}
      {authRoute === "register" && <Register />}
    </>
  );

  return <>{body}</>;
}

export default Auth;
