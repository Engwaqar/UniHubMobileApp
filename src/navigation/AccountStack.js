import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import AddCard from "../screens/Account/AddCard";
import OrderSummery from "../screens/Account/OrderSummery";
import Profile from "../screens/Account/Profile";
import RateOrder from "../screens/Account/RateOrder";
import AuthStack from "./AuthStack";
import BankDetails from "../screens/Account/BankDetails";
const Stack = createNativeStackNavigator();
function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.PROFILE}
    >
      <Stack.Screen name={routeName.PROFILE} component={Profile} />
      <Stack.Screen name={routeName.ADD_CARD} component={AddCard} />
      <Stack.Screen name={routeName.ORDER_SUMMARY} component={OrderSummery} />
      <Stack.Screen name={routeName.RATE_ORDER} component={RateOrder} />
      <Stack.Screen name={routeName.BANK_DETAILS} component={BankDetails} />


    </Stack.Navigator>
  );
}

export default AccountStack;
