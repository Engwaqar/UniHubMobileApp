//Dependencies imports Redux Sagas
import { all, fork } from "redux-saga/effects";

//Saga file imports
import * as userSaga from "./user.sagas";
// import * as siteSagas from "./site.sagas";
import * as notificationSagas from "./notification.sagas";

const combinedSagas = {
  ...userSaga,
  // ...siteSagas,
  // ...notificationSagas,
};

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all(
    Object.keys(combinedSagas).map((saga) => fork(combinedSagas[saga]))
  );
}
