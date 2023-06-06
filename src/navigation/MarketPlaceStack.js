import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import BuyerCheckout from "../screens/BuyerMarket/BuyerCheckout";
import BuyerOrderPlaced from "../screens/BuyerMarket/BuyerOrderPlaced";
import BuyerPayment from "../screens/BuyerMarket/BuyerPayment";
import MarketProduct from "../screens/BuyerMarket/MarketProduct";
import OrderDetail from "../screens/BuyerMarket/OrderDetail";
import ProductDetail from "../screens/BuyerMarket/ProductDetail";
import CheckOut1 from "../screens/CheckOut/CheckOut1";
import CheckOut2 from "../screens/CheckOut/CheckOut2";
import CheckOut3 from "../screens/CheckOut/CheckOut3";
import EditProduct from "../screens/MarketPlace/EditProduct";
import SellProduct from "../screens/MarketPlace/SellProduct";
import YourProducts from "../screens/MarketPlace/YourProducts";
// import MarketProduct from "./BuyerMarket.js/MarketProduct";
const Stack = createNativeStackNavigator();
function MarketplaceStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.YOUR_PRODUCTS}
    >
      <Stack.Screen name={routeName.MARKET_PRODUCT} component={MarketProduct} />
      <Stack.Screen
        name={routeName.PRODUCT_DETAILS}
        component={ProductDetail}
      />
      <Stack.Screen name={routeName.ORDER_DETAILS} component={OrderDetail} />
      {/* <Stack.Screen name={routeName.BUYER_CHECKOUT} component={BuyerCheckout} />
      <Stack.Screen name={routeName.BUYER_PAYMENT} component={BuyerPayment} />
      <Stack.Screen name={routeName.BUYER_ORDER_PLACED} component={BuyerOrderPlaced} /> */}
      <Stack.Screen name={routeName.CHECK_OUT_1} component={CheckOut1} />
      <Stack.Screen name={routeName.CHECK_OUT_2} component={CheckOut2} />
      <Stack.Screen name={routeName.CHECK_OUT_3} component={CheckOut3} />


      <Stack.Screen name={routeName.YOUR_PRODUCTS} component={YourProducts} />
      <Stack.Screen name={routeName.SELL_PRODUCTS} component={SellProduct} />
      <Stack.Screen name={routeName.EDIT_PRODUCTS} component={EditProduct} />

    </Stack.Navigator>
  );
}

export default MarketplaceStack;
