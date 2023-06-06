import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { useDispatch, useSelector } from "react-redux";
import { getAppoinments } from "../../redux/actions/user.actions";
import { routeName } from "../../constants/routeName";

const Appointments = ({ navigation }) => {
  const dispatch = useDispatch();
  const MyAppointments = useSelector(
    (state) => state.userReducers.AppointmentsList?.data
  );
  const loading = useSelector(
    (state) => state.userReducers.AppointmentsList?.refreshing
  );

  console.log("MyAppointments", MyAppointments);
  useEffect(() => {
    dispatch(getAppoinments());
  }, []);
  return (
    <View>
      <ResponsiveText color={colors.primary} size={4} weight="bold">
        Manage Your Appointments
      </ResponsiveText>
      <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
        View, reschedule or cancel your bookings and easily book again.
      </ResponsiveText>

      {MyAppointments?.length > 0 ? (
        MyAppointments.map((item) => (
          <View style={styles.listView}>
            <ResponsiveText size={3.5}>
              {item.service.title}({item.date_time})
            </ResponsiveText>
          </View>
        ))
      ) : (
        <>
          <ResponsiveText
            margin={[hp(5), 0, 5, 0]}
            color={colors.grey1}
            size={2.8}
          >
            You’ve got nothing booked at the moment.
          </ResponsiveText>
        </>
      )}
      <RnButton
        onPress={() =>
          navigation.navigate(routeName.HOME_STACK, {
            screen: routeName.ServiceProvider,
          })
        }
        margin={[hp(5), 0, 0, 0]}
        title={"Check Out Our Services"}
      />
    </View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  listView: {
    backgroundColor: colors.lightgreen,
    width: wp(80),
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    marginTop: hp(2),
  },
});
