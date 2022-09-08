import React, { useState, useContext } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  // context
  const { LoginUser } = useContext(AuthContext);

  // local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  //alert
  const toastEmiter = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  // router useNavigate
  let navigate = useNavigate();

  // get value in loginForm
  const { username, password } = loginForm;

  const onChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    //login logic
    try {
      const loginData = await LoginUser(loginForm);
      console.log(loginData);
      if (loginData.success) {
        // navigate("/me/stored-course");
      } else {
        toast.error(loginData.message, toastEmiter);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Row>
        <Col
          md="7"
          className="d-flex flex-column align-items-center
          justify-content-center"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
            <h1 className="text-center text-truncate">Welcome Back</h1>
            <p className="text-center">Glad to see you again!</p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name..."
                name="username"
                value={username}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account?
                <Link className="bg__link" to="/signup">
                  Signup
                </Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md="5">
          <img
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80"
            alt=""
            className="img"
          />
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Login;
