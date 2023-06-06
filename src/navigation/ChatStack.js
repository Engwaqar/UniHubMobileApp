import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
// const ChatInbox =  require("../screens/Chat/ChatInbox");
import Messages from "../screens/Chat/Messages";
import ChatInbox from "../screens/Chat/ChatInbox";
const Stack = createNativeStackNavigator();
function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.HOME}
    >
      <Stack.Screen name={routeName.HOME} component={Messages} />
      <Stack.Screen name={routeName.CHATBOX} component={ChatInbox} />

    </Stack.Navigator>
  );
}

export default ChatStack;
