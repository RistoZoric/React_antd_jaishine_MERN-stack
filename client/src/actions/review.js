import api from '../utils/api';
import { setAlert } from './alert';
import { getUser, loadUser } from './auth';
import {
    REVIEW_SET,REGISTER_FAIL
} from './types';


export const reviewAction = (review) => async (dispatch) => {
    try {
        const res = await api.post('/review/', review);
        dispatch({
            type: REVIEW_SET,
            payload: res.data
        });
        dispatch(getUser());
        dispatch(loadUser());
        dispatch(
            setAlert("You have set review", 'success')
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
