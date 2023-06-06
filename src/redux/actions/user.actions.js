import types from "./types";
//LOGIN
export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER_REQUEST,
    data: data,
  };
};

export const logoutUser = () => {
  return {
    type: types.LOGOUT_USER,
    data: {},
  };
};

export const SigInAsGuest = (data) => {
  return {
    type: types.SIGN_IN_AS_GUEST,
    data: data,
  };
};

export const getSellerProducts = (data) => {
  return {
    type: types.GET_SELLER_PRODUCTS_REQUEST,
    data: data,
  };
};
 //GET All EVENTS
export const getAllEvents = (data) => {
  return {
    type: types.GET_ALL_ENVENTS_REQUEST,
    data: data,
  };
};
//GET All Hub Services
 export const getAllHubServices = (data) => {
  return {
    type: types.GET_ALL_HUB_SERVICES_REQUEST,
    data: data,
  };
};
//GET My Profile
export const getMyProfile = (data) => {
  return {
    type: types.GET_MY_PROFILE_REQUEST,
    data: data,
  };
};
//GET My Order
export const getMyOrder = (data) => {
  return {
    type: types.GET_MY_ORDER_REQUEST,
    data: data,
  };
};
//GET MY TICKETS
export const getMyTickets = (data) => {
  return {
    type: types.GET_MY_TICKETS_REQUEST,
    data: data,
  };
};
//GET ALL PRODUCTS
export const getAllProducts = (data) => {
  return {
    type: types.GET_ALL_PRODUCTS_REQUEST,
    data: data,
  };
};

//GET ALL CARDS
export const getAllCards = (data) => {
  return {
    type: types.GET_ALL_CARDS_REQUEST,
    data: data,
  };
};
//GET ALL EVENTS
export const getEventsList = (userType,filter) => {
  return {
    type: types.GET_ALL_EVENTS_REQUEST,
    data: {
      userType:userType,
      filter:filter
    },
  };
};
//GET ALL SERVICES
export const getAllServices = (data) => {
  return {
    type: types.GET_ALL_SERVICES_REQUEST,
    data: data,
  };
};
//GET APPOINMENTS
export const getAppoinments = (data) => {
  return {
    type: types.GET_MY_APPOINTMENTS_REQUEST,
    data: data,
  };
};
//GET CART LIST
export const getCartList = (data) => {
  return {
    type: types.GET_CART_LIST_REQUEST,
    data: data,
  };
};
