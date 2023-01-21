import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Popover, Popconfirm } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { logout } from '../../actions/auth';
import jwt_decode from "jwt-decode";

const Header = ({ logout, auth: auth }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(0);
  React.useEffect(() => {
    // if (auth.isAuthenticated) {
    //   setIsAuth(true);
    // } else {
    //   setIsAuth(false);
    // }
    // if (auth.user&&auth.user.role&&auth.user.role===0) {
    //   setIsAdmin(0);
    // }else if(auth.user&&auth.user.role&&auth.user.role===1){
    //   setIsAdmin(1);
    // }else{
    //   setIsAdmin(0);
    // }
    var userData = localStorage.getItem('user');
    if(userData){
      setIsAuth(true);
      userData=jwt_decode(userData);
      if(userData.role===1){
        setIsAdmin(1)
      }
    }else{
      setIsAuth(false);
      setIsAdmin(0)
    }
  }, [auth]);

  const logout_fn = () => {
    logout();
  };
  const content = (
    <div>
      <div style={{ cursor: 'pointer' }} onClick={logout_fn}>
        Log out
      </div>
    </div>
  );
  return (
    <nav
      id="menu"
      className="navbar navbar-default navbar-fixed-top"
      style={{ zIndex: 10 }}
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand page-scroll" to="/">
            NALUNY
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/" className="page-scroll">
                Home
              </Link>
            </li>
            {isAdmin === 1 ? (
              <>
                <li>
                  <Link to="/manage-articles" className="page-scroll">
                    Manage Articles
                  </Link>
                </li>
                <li>
                  <Link to="/user" className="page-scroll">
                    User
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {isAuth ? (
              <>
                <li>
                  <Link to="/current-offers" className="page-scroll">
                    Current Offers
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="page-scroll">
                    Settings
                  </Link>
                </li>
                <li>
                  <Popover content={content} placement="bottom">
                    <Avatar
                      size={40}
                      style={{
                        marginTop: 5,
                        cursor: 'pointer',
                        marginLeft: 22
                      }}
                      icon={<UserOutlined />}
                    />
                  </Popover>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="page-scroll">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="page-scroll">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
