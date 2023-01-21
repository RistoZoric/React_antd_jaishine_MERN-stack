import api from '../utils/api';
import { server_url } from '../config/config';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  DELETE_USER,
  USER_LOADED,
  USER_UPDATED,
  ALL_USER_LOADED,
  APPROVE_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  INITIALMSG,
  ONE_USER_LOADED,
  Active_USER
} from './types';
const sign = require('jwt-encode');
const secret = 'secret';

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    const jwt = sign( res.data, secret);
    localStorage.setItem('user',jwt)
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
export const getUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/getUser');
    dispatch({
      type: ALL_USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const getUserData=(id)=>async(dispatch)=>{
  try {
    const res = await api.post('/auth/getUser',{id});
    dispatch({
      type: ONE_USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    // }
    dispatch({
      type: REGISTER_FAIL,
      payload:errors[0].msg
    });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/auth/update', formData);
    dispatch({
      type: USER_UPDATED,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(
      setAlert('Update Succeed', 'success')
    )
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (value) => async (dispatch) => {

  try {
    const res = await api.post('auth', value);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload:errors[0].msg
    });
  }
};

export const forgot = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/auth/resign', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(getUser());
    dispatch(
      setAlert('Password Changed', 'success')
    )
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
export const logout = () =>async(dispatch)=>{
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT })
} ;
export const initialMsg=()=>({type:INITIALMSG})
export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/auth/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const approveUser = (id, status) => async (dispatch) => {
  try {
    const res = await api.get(`/auth/approve/${id}`);
    dispatch({
      type: APPROVE_USER,
      payload: res.data
    });
    dispatch(
      setAlert('User Approved', 'success')
    )
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const activeUser=(id,status)=>async (dispatch) => {
  try {
    const res = await api.post(`/auth/active`,{id,status});
    dispatch({
      type: Active_USER,
      payload: res.data.data
    });

  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
