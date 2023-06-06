import types from "../actions/types";
import * as State from "../lib/states";

//Get site data from url reducer
export const notifications = (state = State.initial, action) => {
  switch (action.type) {
    // case types.GET_NOTIFICATIONS_RESET:
    //   return State.initial;
    // case types.GET_NOTIFICATIONS_REQUEST:
    //   return {
    //     ...state,
    //     ...State.request,
    //     data: state.data,
    //   };
    // case types.GET_NOTIFICATIONS_SUCCESS:
    //   return {
    //     ...state,
    //     status: action.payload.status,
    //     message: action.payload.message,
    //     error: false,
    //     data: action.payload.data.data,
    //     loading: false,
    //     timeStamp: new Date(),
    //   };
    // case types.GET_NOTIFICATIONS_FAILURE:
    //   return {
    //     ...state,
    //     status: action.error.status,
    //     message: action.error.message,
    //     error: true,
    //     data: null,
    //     loading: false,
    //     timeStamp: new Date(),
    //   };
    default:
      return state;
  }
};
