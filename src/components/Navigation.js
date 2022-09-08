import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import "./Navigation.css";
import { AuthContext } from "../contexts/AuthContext";

function Navigation() {
  // user & logout
  const {
    authState: { user },
    LogoutUser,
  } = useContext(AuthContext);

  const logout = () => {
    LogoutUser();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="" style={{ width: 50, height: 50 }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            {/* <NavDropdown
              title={
                <>
                  <img
                    src={logo}
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 10,
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  kai
                </>
              }
              id="basic-nav-dropdown"
            > */}
            <NavDropdown
              title={
                <div className="d-flex justify-content-center align-items-center">
                  {user ? " Hi:" : ""}
                  <p
                    style={{
                      paddingLeft: 10,
                      marginBottom: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {user?.username}
                  </p>
                </div>
              }
            >
              <NavDropdown.Item href="#action/3.1">
                Create course
              </NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href="me/stored-course">
                My Courses
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                My News Pages
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
