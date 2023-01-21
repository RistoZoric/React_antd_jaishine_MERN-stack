import {
  GET_CATEGORY,
  CREATE_OFFER,
  INITIALMSG,
  OFFER_SEARCH,
  GET_OFFER,
  UPDATE_OFFER,
  DELETE_OFFER
} from '../actions/types';
const initialState = {
  country_category: [],
  sub_category: [],
  msg: '',
  offerdata: null,
  oneofferdata:{}
};
function cateReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY: {
      return {
        ...state,
        ...payload
      };
    }
    case CREATE_OFFER: {
      return {
        ...state,
        msg: payload.msg
      };
    }
    case INITIALMSG: {
      return {
        ...state,
        msg: ''
      };
    }
    case OFFER_SEARCH: {
      return {
        ...state,
        offerdata: payload
      };
    }
    case GET_OFFER:{
      return{
        ...state,
        oneofferdata:payload[0]
      }
    }
    case UPDATE_OFFER:{
      return{
        ...state,
        msg: payload.msg
      }
    }
    case DELETE_OFFER:{
      return{
        ...state,
        msg: payload.msg
      }
    }
    default:
      return state;
  }
}
export default cateReducer;
