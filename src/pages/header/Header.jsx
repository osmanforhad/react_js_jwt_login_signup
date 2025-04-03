import React from 'react';
import {Navbar, Container, Nav} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  //get the logged in user token from local storage
  const token = localStorage.getItem("token");
  //initialize the navigation hook
  const navigate = useNavigate();
  //method for working with logged out functionality
  const handleLogout =() => {
    //remove token from local storage
    localStorage.removeItem("token");
    //navigate to login component
    navigate("/login");
  }
  return (
    <>
    <Navbar bg={token ? "primary" : "dark"} variant="dark">
        <Container>
          <Navbar.Brand>
            <strong>{token ? "Logged-In" : "Not-LoggedIn"}</strong>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {token ? (<>
              <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>
              <Nav.Link className="nav-link" onClick={handleLogout}>logout</Nav.Link>
            </>) :(<>
              <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="nav-link">Signup</Nav.Link>
            </>)}
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;