import React from 'react';
import { connect } from 'react-redux';

function Login() {
  return (
    <div>
      Login
    </div>
  )
};

const mapStateToProps = state => state;

export const ConnectedLogin = connect(mapStateToProps)(Login);