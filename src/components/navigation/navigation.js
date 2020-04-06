import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

function Navigation() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand" href="/">MERN Tutorial</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
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