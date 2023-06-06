import React from 'react';
import AuthStack from './AuthStack';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import { routeName } from '../constants/routeName';

const Router = () => {

    const Stack=createNativeStackNavigator();
  
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={routeName.AUTH_STACK}component={AuthStack} />
        <Stack.Screen name={routeName.BOTTOM_TABS} component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
