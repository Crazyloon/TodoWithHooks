import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faHamburger } from "@fortawesome/free-solid-svg-icons";
import * as mutations from '../../store/mutations';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../logo.svg';

function Navigation({isAuthenticated, logOut}) {
  return (
    <div>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img src={logo} alt="spinner" className="nav-logo d-inline-block align-top" />
            Task Master
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav as='ul' className="mr-auto">
            { !isAuthenticated  ?
              <Nav.Item as='li'>
                <Link className='nav-link' to="/login">
                  Login
                </Link>
              </Nav.Item> :
              <Nav.Item as='li' className='nav-button'>
                <button className="btn btn-outline-danger" onClick={logOut}>
                  <FontAwesomeIcon icon={faLock} />  Log Out
                </button>
              </Nav.Item>
            }
            <Nav.Item as='li'>
            <Link className='nav-link' to="/dashboard">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item as='li'>
            <Link className='nav-link' to='/test'>
                Component Tests
              </Link>
            </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
  )
}

const mapStateToProps = ({session}) => ({
  isAuthenticated: session.isAuthenticated === mutations.AUTHENTICATED
});
const mapDispatchToProps = dispatch => ({
  logOut(e){
    e.preventDefault();
    dispatch(mutations.requestDeauthenticateUser());
  }
});

export const ConnectedNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation);