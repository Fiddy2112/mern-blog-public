import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { LOCAL_STORAGE_TOKEN } from "../contexts/constants";
import logo from "../assets/logo.png";
import "./Navigation.css";

function Navigation() {
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

            <NavDropdown
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
            >
              <NavDropdown.Item href="#action/3.1">
                Create course
              </NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href="#action/3.2">My Courses</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                My News Pages
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/login"
                onClick={localStorage.removeItem(LOCAL_STORAGE_TOKEN)}
              >
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
