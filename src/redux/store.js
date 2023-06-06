import AsyncStorage from "@react-native-community/async-storage";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";

//Local imports
// Imports: Redux
import rootReducer from "./reducers";
// Imports: Redux Root Saga
import { rootSaga } from "./sagas";

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",

  // Storage Method (React Native)
  storage: AsyncStorage,

  // Whitelist (Save Specific Reducers)
  whitelist: [],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//persistReducer keep the function and data save

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, createLogger())
);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export { store, persistor };
