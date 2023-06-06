import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { routeName } from '../constants/routeName';
import ForgotPassword from '../screens/Auth/Login/ForgotPassword';
import ForgotPassword1 from '../screens/Auth/Login/Forgotpassword1';
import Login from '../screens/Auth/Login/Login';
import OTP from '../screens/Auth/Login/OTP';
import Signup from '../screens/Auth/Login/Signup';
import Onboarding from '../screens/Auth/splash/Onboarding';
import Splash from '../screens/Auth/splash/Splash';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
     initialRouteName={routeName.SPLASH}
    >
      <Stack.Screen name={routeName.SPLASH} component={Splash} /> 
      <Stack.Screen name={routeName.ON_BORDING} component={Onboarding} />  
      <Stack.Screen name={routeName.LOGIN} component={Login} /> 
      <Stack.Screen name={routeName.SIGN_UP} component={Signup} /> 
      <Stack.Screen name={routeName.FORGOT_PASSWORD} component={ForgotPassword} /> 
      <Stack.Screen name={routeName.FORGOT_PASSWORD1} component={ForgotPassword1} /> 
      <Stack.Screen name={routeName.OTP} component={OTP} /> 
      {/* <Stack.Screen name={routeName.BOTTOM_TABS} component={BottomTabs} />  */}

     


    </Stack.Navigator>
  )
}
export default AuthStack
