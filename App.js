import React, { useEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Router from "./src/navigation/Router";
import { persistor, store } from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

  
  }, [])
  
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <StatusBar hidden />  */}
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <Router />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

// console.disableYellowBox = true;
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'RNDeviceInfo', 'Warning: An update']);

LogBox.ignoreLogs([
  "Warning: VirtualizedList should",
  "Warning: Each child",
  "Warning: Each child in a",
  "Warning: Failed prop type",
  'Remote debugger',
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
  'VirtualizedLists should never be nested'
]);
