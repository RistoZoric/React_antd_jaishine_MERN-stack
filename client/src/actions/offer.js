import api from '../utils/api';
import { CREATE_OFFER } from './types';

export const create_offer = (data) => async (dispatch) => {
  try {
    let res = await api.post('/offer/create',data);
    dispatch({
      type: CREATE_OFFER,
      payload: res.data
    });
   
  } catch (err) {
    const errors = err.response.data.errors;
    
  }
};
