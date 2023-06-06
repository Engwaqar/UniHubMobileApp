// Importing: Dependencies
import { combineReducers } from "redux";

// Importing: Reducers
import * as userReducers from "./user.reducers";
import * as notificationReducers from "./notification.reducres";

// Redux: Root Reducer
const rootReducer = combineReducers(
  Object.assign(userReducers, notificationReducers)
);
// Exports
export default rootReducer;
