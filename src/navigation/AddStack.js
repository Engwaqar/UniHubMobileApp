import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import SellHubService from "../screens/Hub/SellHubService";
import EventService from "../screens/EventScreen/EventService";
const Stack = createNativeStackNavigator();
function AddStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    //   initialRouteName={routeName.SELL_HUB_SERVICE}
    >
      <Stack.Screen name={routeName.SELL_HUB_SERVICE} component={SellHubService} />
      <Stack.Screen name={routeName.EVENT_SERVICE} component={EventService} />
      

    </Stack.Navigator>
  );
}

export default AddStack;
