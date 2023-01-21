import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading ,user}
}) => {
  // if (user.role===1) return <Component />;
var userData=localStorage.getItem('user');

  if(userData){
    userData=jwt_decode(userData);
    if(userData.role===1){
      return <Component />;
    }
  }

  return <Navigate to="/login" />;
};

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
