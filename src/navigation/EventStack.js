import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import CheckOut1 from "../screens/CheckOut/CheckOut1";
import CheckOut2 from "../screens/CheckOut/CheckOut2";
import CheckOut3 from "../screens/CheckOut/CheckOut3";
import EditEvent from "../screens/EventScreen/EditEvent";
import EventListed from "../screens/EventScreen/EventListed";
import EventService from "../screens/EventScreen/EventService";
import EventsList from "../screens/TicketBooking/EventsList";
import QRCode from "../screens/TicketBooking/QRCode";
import Ticket1 from "../screens/TicketBooking/Ticket1";
import Ticket2 from "../screens/TicketBooking/Ticket2";
import Ticket3 from "../screens/TicketBooking/Ticket3";
import Ticket4 from "../screens/TicketBooking/Ticket4";
import Ticket5 from "../screens/TicketBooking/Ticket5";
import Ticket6 from "../screens/TicketBooking/Ticket6";
const Stack = createNativeStackNavigator();
function EventStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.EVENT_LISTED}
    >
      {/* <Stack.Screen name={'EventsList'} component={EventsList} />
      <Stack.Screen name={'Ticket1'} component={Ticket1} />
      <Stack.Screen name={'Ticket2'} component={Ticket2} />
      <Stack.Screen name={'Ticket3'} component={Ticket3} />
      <Stack.Screen name={'Ticket4'} component={Ticket4} />
      <Stack.Screen name={'Ticket5'} component={Ticket5} />
      <Stack.Screen name={'Ticket6'} component={Ticket6} />
      <Stack.Screen name={'QRCode'} component={QRCode} />
      <Stack.Screen name={routeName.CHECK_OUT_1} component={CheckOut1} />
      <Stack.Screen name={routeName.CHECK_OUT_2} component={CheckOut2} />
      <Stack.Screen name={routeName.CHECK_OUT_3} component={CheckOut3} /> */}


      <Stack.Screen name={routeName.EVENT_LISTED} component={EventListed} />
      <Stack.Screen name={routeName.EVENT_SERVICE} component={EventService} />
      <Stack.Screen name={routeName.EDIT_EVENT} component={EditEvent} />


    </Stack.Navigator>
  );
}

export default EventStack;
