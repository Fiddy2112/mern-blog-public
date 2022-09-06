import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log({
      name,
      password,
      confirmPassword,
    });
    //signup the user
  };
  return (
    <Container>
      <Row>
        <Col md="5">
          <img
            src="https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
            className="img"
          />
        </Col>
        <Col
          md="7"
          className="d-flex flex-column align-items-center
          justify-content-center"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className="text-center">Create account</h1>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name..."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {/* {user ? "Signing you up..." : "Create account"} */}
              Create account
            </Button>
            <div className="py-4">
              <p className="text-center">
                Already have an account?
                <Link className="bg__link" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
