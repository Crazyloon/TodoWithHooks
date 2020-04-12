import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";
import * as mutations from "../../store/mutations";


function Login({authenticateUser, isAuthenticated}) {
  return (
    <div>
      <h2 className='text-center'>Login</h2>
      <form onSubmit={authenticateUser} className="container">

        <div className="form-row row form-group">
          <div className="offset-md-2 col-md-4">
            <label className="col-form-label text-left d-block" htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> Username
              </label>
            <input className="form-control" type="text" placeholder="Username" name="username" defaultValue="Dev" />
          </div>
          
          <div className="col-md-4">
            <label className="col-form-label text-left d-block" htmlFor="password">
              <FontAwesomeIcon icon={faKey} /> Password
            </label>
            <input className="form-control" type="password" placeholder="Password" name="password" defaultValue="TUPLES" />
          </div>
        </div>
        { isAuthenticated === mutations.NOT_AUTHENTICATED ?
          <div className="form-group text-center">
            <label className="font-weight-light small text-danger">
              <FontAwesomeIcon icon={faLock} /> Invalid Username or Password combination.
            </label>
          </div>
          : null
        }

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




const mapStateToProps = ({session}) => ({
  isAuthenticated: session.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  authenticateUser(e){
    e.preventDefault();
    let username = e.target['username'].value;
    let password = e.target['password'].value;
    e.target['password'].value = '';
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);