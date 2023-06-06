import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, put, select } from "redux-saga/effects";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import types from "../actions/types";
import Api from "../lib/api";
import urls from "../lib/urls";
//LOGIN
export function* loginUserSaga() {
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserApi);
}
function* loginUserApi(data, response) {
  let { params, navigation } = data.data;
  try {
    const response = yield Api.post(urls.LOGIN, params);
    if (response && response.status == 200) {
      params =  {...params._parts[0]}
      let email = params['1']
      // yield AsyncStorage.setItem("@token", response.token);
      // yield AsyncStorage.setItem("@userId", JSON.stringify(response.user.id));
      // yield put({ type: types.LOGIN_USER_SUCCESS, payload: response });
      // navigation.replace(routeName.BOTTOM_TABS);
      _toast(response.message);
      navigation.navigate(routeName.OTP,{email: email, navigateTo: 'BottomTabs'});

    } else {
      _toast("Invalid Credentials");
      yield put({ type: types.LOGIN_USER_FAILURE, payload: response });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.LOGIN_USER_FAILURE, error: error });
  }
}

//GET SELLER PRODUCTS
export function* getSellerProductsSaga() {
  yield takeLatest(types.GET_SELLER_PRODUCTS_REQUEST, getSellerProductsApi);
}
function* getSellerProductsApi() {
  try {
    const response = yield Api.get(urls.GET_SELLER_PRODUCTS);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_SELLER_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({ type: types.GET_SELLER_PRODUCTS_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_SELLER_PRODUCTS_FAILURE, error: error });
  }
}
//GET All Events
export function* getAllEventsSaga() {
  yield takeLatest(types.GET_ALL_ENVENTS_REQUEST, getAllEventsApi);
}
function* getAllEventsApi() {
  try {
    const response = yield Api.get(urls.EVENTS);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_ALL_ENVENTS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({ type: types.GET_ALL_ENVENTS_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_ALL_ENVENTS_FAILURE, error: error });
  }
}
//GET All Hub Services
export function* getAllHubServicesSaga() {
  yield takeLatest(types.GET_ALL_HUB_SERVICES_REQUEST, getAllHubServicesApi);
}
function* getAllHubServicesApi() {
  try {
    const response = yield Api.get(urls.HUB_SERVICES);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_ALL_HUB_SERVICES_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({ type: types.GET_ALL_HUB_SERVICES_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_ALL_HUB_SERVICES_FAILURE, error: error });
  }
}
//GET My Profile
export function* getMyProfileSaga() {
  yield takeLatest(types.GET_MY_PROFILE_REQUEST, getMyProfileSagaApi);
}
function* getMyProfileSagaApi() {
  try {
    const response = yield Api.get(urls.MY_PROFILE);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_MY_PROFILE_SUCCESS,
        payload: {...response.profile, uni_name: response.university.name}

      });
    } else {
      yield put({ type: types.GET_MY_PROFILE_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_MY_PROFILE_FAILURE, error: error });
  }
}
//GET My Order
export function* getMyOrderSaga() {
  yield takeLatest(types.GET_MY_ORDER_REQUEST, getMyOrderApi);
}
function* getMyOrderApi() {
  try {
    const response = yield Api.get(urls.MY_ORDER);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_MY_ORDER_SUCCESS,
        payload: response.book_products,
      });
    } else {
      yield put({ type: types.GET_MY_ORDER_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_MY_ORDER_FAILURE, error: error });
  }
}
//GET MY TICKETS
export function* getMyTicketsSaga() {
  yield takeLatest(types.GET_MY_TICKETS_REQUEST, getMyTicketsApi);
}
function* getMyTicketsApi() {
  try {
    const response = yield Api.get(urls.MY_TICKETS);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_MY_TICKETS_SUCCESS,
        payload: response.events,
      });
    } else {
      yield put({ type: types.GET_MY_TICKETS_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_MY_TICKETS_FAILURE, error: error });
  }
}
//GET ALL PRODUCTS
export function* getAllProductsSaga() {
  yield takeLatest(types.GET_ALL_PRODUCTS_REQUEST, getAllProductsApi);
}
function* getAllProductsApi(data) {
  const url =
    data.data != "Guest" ? urls.GET_ALL_PRODUCTS : urls.guest_all_products;
  try {
    const response = yield Api.get(url);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_ALL_PRODUCTS_SUCCESS,
        payload: response.products,
      });
    } else {
      yield put({ type: types.GET_ALL_PRODUCTS_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_ALL_PRODUCTS_FAILURE, error: error });
  }
}

//GET ALL CARDS
export function* getAllCardsSaga() {
  yield takeLatest(types.GET_ALL_CARDS_REQUEST, getAllCardsApi);
}
function* getAllCardsApi() {
  try {
    const response = yield Api.get(urls.GET_CARDS);
    if (response && response.status == 200) {
      yield put({ type: types.GET_ALL_CARDS_SUCCESS, payload: response.cards });
    } else {
      yield put({ type: types.GET_ALL_CARDS_FAILURE, payload: [] });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_ALL_CARDS_FAILURE, error: error });
  }
}

//GET ALL EVENTS
export function* getEventslistSaga() {
  yield takeLatest(types.GET_ALL_EVENTS_REQUEST, getEventslistApi);
}
function* getEventslistApi(data) {
  const url =
    data.data.userType != "Guest" ? urls.GET_EVENT_LIST : urls.guest_all_events;
  var formdata = new FormData();
  formdata.append("filter", data.data.filter);
  try {
    const response = yield data.data.userType != "Guest"
      ? Api.post(url, formdata)
      : Api.get(url);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_ALL_EVENTS_SUCCESS,
        payload: response.events,
      });
    } else {
      yield put({ type: types.GET_ALL_EVENTS_FAILURE, payload: [] });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_EVENTS_FAILURE, error: error });
  }
}

//GET ALL EVENTS
export function* getServiceslistSaga() {
  yield takeLatest(types.GET_ALL_SERVICES_REQUEST, getServiceslistApi);
}
function* getServiceslistApi() {
  try {
    const response = yield Api.get(urls.ALL_SERVICES);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_ALL_SERVICES_SUCCESS,
        payload: response.services,
      });
    } else {
      yield put({ type: types.GET_ALL_SERVICES_FAILURE, payload: [] });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_SERVICES_FAILURE, error: error });
  }
}
//GET APPOINTMENTS
export function* getAppointmentslistSaga() {
  yield takeLatest(types.GET_MY_APPOINTMENTS_REQUEST, getAppointmentslistApi);
}
function* getAppointmentslistApi() {
  try {
    const response = yield Api.get(urls.BOOKED_SERVICE);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_MY_APPOINTMENTS_SUCCESS,
        payload: response.services,
      });
    } else {
      yield put({ type: types.GET_MY_APPOINTMENTS_FAILURE, payload: [] });
    }
  } catch (error) {
    yield put({ type: types.GET_MY_APPOINTMENTS_FAILURE, error: error });
  }
}
//GET CART LIST
export function* getCartlistSaga() {
  yield takeLatest(types.GET_CART_LIST_REQUEST, getCartlistApi);
}
function* getCartlistApi() {
  try {
    const response = yield Api.get(urls.CART_LIST);
    console.log("response cart list", response);
    if (response && response.status == 200) {
      yield put({
        type: types.GET_CART_LIST_SUCCESS,
        payload: response.products,
      });
    } else {
      yield put({ type: types.GET_CART_LIST_FAILURE, payload: [] });
    }
  } catch (error) {
    yield put({ type: types.GET_CART_LIST_FAILURE, error: error });
  }
}
