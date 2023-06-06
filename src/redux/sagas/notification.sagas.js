import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, put, select } from "redux-saga/effects";
// import { parseCats } from "../../helpers/cat.helpers";
import types from "../actions/types";
import Api from "../lib/api";
import urls from "../lib/urls";
//Save site data for user saga
// export function* getNotificationsSaga() {
//   yield takeLatest(types.GET_NOTIFICATION_REQUEST, getNotificationsSagaApi);
// }
// function* getNotificationsSagaApi() {
//     try {
//         const response = yield Api.get(urls.Get_Notification);
//         console.log(response, "notifications");

//         if (response && response.success == true) {
//           yield put({
//             type: types.GET_NOTIFICATION_SUCCESS,
//             payload: response.data,
//           });
//         } else {
//           yield put({ type: types.GET_NOTIFICATION_FAILURE, payload: [] });
//         }
    
//         // dispatch a success action to the store with the new data object
//       } catch (error) {
//         yield put({ type: types.GET_NOTIFICATION_FAILURE, payload: [] });
//         yield put({ type: types.GET_NOTIFICATION_FAILURE, payload: [] });
//       }
//     }
