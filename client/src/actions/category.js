import api from '../utils/api';
import {
  GET_CATEGORY,
  CREATE_OFFER,
  INITIALMSG,
  OFFER_SEARCH,
  GET_OFFER,
  UPDATE_OFFER,
  DELETE_OFFER
} from './types';

export const getCategory = () => async (dispatch) => {
  try {
    let res = await api.post('/category/getdata');
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
  }
};

export const createOffer = (values) => async (dispatch) => {
  try {
    let res = await api.post('/category/createOffer', values);
    dispatch({
      type: CREATE_OFFER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
  }
};

export const initialMsg = () => ({ type: INITIALMSG });

export const getOneOffer = (id) => async (dispatch) => {
  try {
    let res = await api.post('/category/getoffer', { id });
    dispatch({
      type: GET_OFFER,
      payload: res.data.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
  }
};
export const getOffer =
  (country, subcategory, page, current, dir, role) => async (dispatch) => {
    try {
      let res = await api.post('/category/search', {
        country,
        subcategory,
        page,
        current,
        dir,
        role
      });
      dispatch({
        type: OFFER_SEARCH,
        payload: res.data
      });
    } catch (err) {
      const errors = err.response.data.errors;
    }
  };

export const updateOffer = (values) => async (dispatch) => {
  try {
    let res = await api.post('/category/update', values);
    dispatch({
      type: UPDATE_OFFER,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
  }
};

export const deleteaction = (id) => async (dispatch) => {
  try {
    const res = await api.post('/category/delete', { id });
    dispatch({
      type: DELETE_OFFER,
      payload: res.data
    });
  } catch (err) {}
};
