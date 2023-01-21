import api from '../utils/api';
import { setAlert } from './alert';
import { getUser } from './auth';
import {
    CREATE_ORDER,
    CANCEL_ORDER,
    PAY_ORDER,
    ACCEPT_ORDER,
    REFUSE_ORDER,
    PROFILE_ERROR,
} from './types';

export const createOrder =
    (formData, reqData, edit) =>
        async (dispatch) => {
            try {
                let res;
                if (edit)
                    res = await api.post(`/order/update/`, { formData, reqData });

                else
                    res = await api.post(`/order/create/`, { formData, reqData });

                dispatch({
                    type: CREATE_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                if (edit)
                    dispatch(
                        setAlert('Order Updated', 'success')
                    );
                else
                    dispatch(
                        setAlert('Order Created', 'success')
                    );
            } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };

export const cancelOrder =
    (reqId, walkerName) =>
        async (dispatch) => {
            try {
                const res = await api.post(`/order/cancel/`, { reqId, walkerName });
                dispatch({
                    type: CANCEL_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order Canceled', 'success')
                );
            } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
export const acceptOrder =
    (walkerName, ownerName, timestamp, dogName) =>
        async (dispatch) => {
            try {
                const res = await api.post(`/order/accept/`, { walkerName, ownerName, timestamp, dogName });

                dispatch({
                    type: ACCEPT_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order Accepted', 'success')
                );
            } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
export const refuseOrder =
    (walkerName, ownerName, timestamp, dogName) =>
        async (dispatch) => {
            try {
                const res = await api.post(`/order/refuse/`, { walkerName, ownerName, timestamp, dogName });

                dispatch({
                    type: REFUSE_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order Refused', 'success')
                );
            } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
export const payOrder =
    (walkerName, ownerName, timestamp, budget) =>
        async (dispatch) => {
            try {
                const res = await api.post(`/order/pay/`, { walkerName, ownerName, timestamp, budget });

                dispatch({
                    type: PAY_ORDER,
                    payload: res.data
                });
                dispatch(getUser());
                dispatch(
                    setAlert('Order paid successfully', 'success')
                );
            } catch (err) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: { msg: err.response.statusText, status: err.response.status }
                });
            }
        };
