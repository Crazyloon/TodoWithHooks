import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";


function Navigation({isAuthenticated}) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="/">MERN Tutorial</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            { !isAuthenticated ?  
              <li className="nav-item">
                <Link className='nav-link' to="/login">
                  Login
                </Link>
              </li> :
              <li className="nav-item">
                <button className="btn btn-outline-primary">
                  <FontAwesomeIcon icon="faLock" />  Log Out
                </button>
              </li>
            }
            <li className="nav-item">
              <Link className='nav-link' to="/dashboard">
                Dashboard
              </Link>
            </li>

          </ul>
          <form className="form-inline my-2 my-md-0">
            <input className="form-control" type="text" placeholder="Search" />
          </form>
        </div>
      </nav>
    </div>
  )
}

export const ConnectedNavigation = connect(state => state)(Navigation);