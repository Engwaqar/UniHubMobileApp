import types from "../actions/types";

//Get site data from url reducer
const initialState = {
  status: null,
  message: null,
  error: false,
  loginScreen: {
    refreshing: false,
    data: {
      loggedInUserId: null,
      loggedInUserName: "",
      loggedInUserTypeId: "",
      message: null,
    },
  },
  sellerProducts: {
    refreshing: false,
    data: [],
  },
  getAllEvents: {
    refreshing: false,
    data: [],
  },
  getAllHubServices: {
    refreshing: false,
    data: [],
  },
  getMyProfile: {
    refreshing: false,
    data: {},
  },
  getMyOrder: {
    refreshing: false,
    data: [],
  },
  getMyTickets: {
    refreshing: false,
    data: [],
  },
  getAllProducts: {
    refreshing: false,
    data: [],
  },
  getAllCards: {
    refreshing: false,
    data: [],
  },
  EventsList: {
    refreshing: false,
    data: [],
  },
  ServicesList: {
    refreshing: false,
    data: [],
  },
  AppointmentsList: {
    refreshing: false,
    data: [],
  },
  cartList: {
    refreshing: false,
    data: [],
  },
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: true,
        },
      };

      case types.LOGOUT_USER:
      return {
        getMyProfile: {
          refreshing: false,
          data: {},
        },
      };

      case types.SIGN_IN_AS_GUEST:
        return {
        ...state,
          getMyProfile: {
            refreshing: false,
            data: {user_type: "Guest"},
          },
        };

    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //Get All Seller
    case types.GET_SELLER_PRODUCTS_REQUEST:
      return {
        ...state,
        sellerProducts: {
          ...state.sellerProducts,
          refreshing: true,
        },
      };

    case types.GET_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        sellerProducts: {
          ...state.sellerProducts,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_SELLER_PRODUCTS_FAILURE:
      return {
        ...state,
        sellerProducts: {
          ...state.sellerProducts,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //Get All Events
    case types.GET_ALL_ENVENTS_REQUEST:
      return {
        ...state,
        getAllEvents: {
          ...state.getAllEvents,
          refreshing: true,
        },
      };

    case types.GET_ALL_ENVENTS_SUCCESS:
      return {
        ...state,
        getAllEvents: {
          ...state.getAllEvents,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_ENVENTS_FAILURE:
      return {
        ...state,
        getAllEvents: {
          ...state.getAllEvents,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //GET All Hub Services
    case types.GET_ALL_HUB_SERVICES_REQUEST:
      return {
        ...state,
        getAllHubServices: {
          ...state.getAllHubServices,
          refreshing: true,
        },
      };

    case types.GET_ALL_HUB_SERVICES_SUCCESS:
      return {
        ...state,
        getAllHubServices: {
          ...state.getAllHubServices,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_HUB_SERVICES_FAILURE:
      return {
        ...state,
        getAllHubServices: {
          ...state.getAllHubServices,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //GET My Profile
    case types.GET_MY_PROFILE_REQUEST:
      return {
        ...state,
        getMyProfile: {
          ...state.getMyProfile,
          refreshing: true,
        },
      };

    case types.GET_MY_PROFILE_SUCCESS:
      return {
        ...state,
        getMyProfile: {
          ...state.getMyProfile,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_MY_PROFILE_FAILURE:
      return {
        ...state,
        getMyProfile: {
          ...state.getMyProfile,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //GET My Order
    case types.GET_MY_ORDER_REQUEST:
      return {
        ...state,
        getMyOrder: {
          ...state.getMyOrder,
          refreshing: true,
        },
      };

    case types.GET_MY_ORDER_SUCCESS:
      return {
        ...state,
        getMyOrder: {
          ...state.getMyOrder,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_MY_ORDER_FAILURE:
      return {
        ...state,
        getMyOrder: {
          ...state.getMyOrder,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //GET MY TICKETS
    case types.GET_MY_TICKETS_REQUEST:
      return {
        ...state,
        getMyTickets: {
          ...state.getMyTickets,
          refreshing: true,
        },
      };

    case types.GET_MY_TICKETS_SUCCESS:
      return {
        ...state,
        getMyTickets: {
          ...state.getMyTickets,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_MY_TICKETS_FAILURE:
      return {
        ...state,
        getMyTickets: {
          ...state.getMyTickets,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //GET ALL PRODUCTS
    case types.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        getAllProducts: {
          ...state.getAllProducts,
          refreshing: true,
        },
      };

    case types.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        getAllProducts: {
          ...state.getAllProducts,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        getAllProducts: {
          ...state.getAllProducts,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };

    //GET ALL CARDS
    case types.GET_ALL_CARDS_REQUEST:
      return {
        ...state,
        getAllCards: {
          ...state.getAllCards,
          refreshing: true,
        },
      };

    case types.GET_ALL_CARDS_SUCCESS:
      return {
        ...state,
        getAllCards: {
          ...state.getAllCards,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_CARDS_FAILURE:
      return {
        ...state,
        getAllCards: {
          ...state.getAllCards,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //GET ALL EVENTS
    case types.GET_ALL_EVENTS_REQUEST:
      return {
        ...state,
        EventsList: {
          ...state.EventsList,
          refreshing: true,
        },
      };

    case types.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        EventsList: {
          ...state.EventsList,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_EVENTS_FAILURE:
      return {
        ...state,
        EventsList: {
          ...state.EventsList,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
    //GET ALL SERVICES
    case types.GET_ALL_SERVICES_REQUEST:
      return {
        ...state,
        ServicesList: {
          ...state.ServicesList,
          refreshing: true,
        },
      };

    case types.GET_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        ServicesList: {
          ...state.ServicesList,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_SERVICES_FAILURE:
      return {
        ...state,
        ServicesList: {
          ...state.ServicesList,
          refreshing: false,
          errorMsg: action.error,
        },
      };
    //GET APPOINTMENTS
    case types.GET_MY_APPOINTMENTS_REQUEST:
      return {
        ...state,
        AppointmentsList: {
          ...state.AppointmentsList,
          refreshing: true,
        },
      };

    case types.GET_MY_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        AppointmentsList: {
          ...state.AppointmentsList,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_MY_APPOINTMENTS_FAILURE:
      return {
        ...state,
        AppointmentsList: {
          ...state.AppointmentsList,
          refreshing: false,
          errorMsg: action.error,
        },
      };
    //GET CART LIST
    case types.GET_CART_LIST_REQUEST:
      return {
        ...state,
        cartList: {
          ...state.cartList,
          refreshing: true,
        },
      };

    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_CART_LIST_FAILURE:
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: [],
          refreshing: false,
          errorMsg: action.error,
        },
      };
    default:
      return state;
  }
};
