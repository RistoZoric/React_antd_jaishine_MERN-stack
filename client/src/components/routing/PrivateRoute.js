import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading ,user}
}) => {
var userData=localStorage.getItem('user');
if(userData){
  userData=jwt_decode(userData);
  return <Component />;
}
  // if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
