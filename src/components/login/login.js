import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faLockOpen } from "@fortawesome/free-solid-svg-icons";

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <form className="container">

        <div className="form-row row form-group">
          <div className="offset-md-2 col-md-4">
            <label className="col-form-label text-left d-block" for="username">
              <FontAwesomeIcon icon={faUser} /> Username
              </label>
            <input className="form-control" type="text" placeholder="Username" name="username" defaultValue="Dev" />
          </div>
          
          <div className="col-md-4">
            <label className="col-form-label text-left d-block" for="password">
              <FontAwesomeIcon icon={faKey} /> Password
            </label>
            <input className="form-control" type="password" placeholder="Password" name="password" />
          </div>
        </div>

        <div className="form-row row">
          <div className="col-12 offset-md-2 col-md-8">
            <div className="form-group">
              <button className="btn btn-primary form-control" type="submit">
                <FontAwesomeIcon icon={faLockOpen} /> Login
            </button>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
};




const mapStateToProps = state => state;

export const ConnectedLogin = connect(mapStateToProps)(Login);