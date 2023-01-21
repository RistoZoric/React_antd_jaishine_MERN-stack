import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//common component
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

//component
import Landing from './components/landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MangeArticle from './components/manage-article';
import EditArticle from './components/manage-article/edit';
import CurrentOffers from './components/current-offers';
import DetailedCard from './components/current-offers/component/detailedCard';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import User from './components/user';
import View from './components/user/view';
import Setting from './components/setting/setting';

import { Provider } from 'react-redux';
import store from './store';
//css
import './App.css';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="manage-articles" element={<MangeArticle />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="manage-articles" element={ <AdminRoute component={MangeArticle}  />} />
          <Route  path="current-offers/edit/:id" element={ <AdminRoute component={EditArticle}  />} />
          <Route
            path="current-offers"
            element={<PrivateRoute component={CurrentOffers} />}
          />
          <Route
            path="current-offers/view/:id"
            element={<PrivateRoute component={DetailedCard} />}
          />
            <Route
            path="settings"
            element={<PrivateRoute component={Setting} />}
          />
          <Route path="user"  element={ <AdminRoute component={User}  />} />
          <Route path="user/view/:id" element={ <AdminRoute component={View}  />}  />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
