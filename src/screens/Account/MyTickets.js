import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import SmallButton from "../../components/SmallButton";
import { useDispatch, useSelector } from "react-redux";
import { getMyTickets } from "../../redux/actions/user.actions";
import RecordNotFound from "../../components/RecordnotFound";
import moment from "moment";
import { routeName } from "../../constants/routeName";

const MyTickets = ({ navigation }) => {
  const dispatch = useDispatch();
  const MyTickets = useSelector(
    (state) => state.userReducers.getMyTickets?.data
  );
  const loading = useSelector(
    (state) => state.userReducers.getMyTickets?.refreshing
  );

  console.log("getMyTickets", MyTickets);
  useEffect(() => {
    dispatch(getMyTickets());
  }, []);
  return (
    <View>
      <View style={{ marginBottom: hp(4) }}>
        <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
          My tickets
        </ResponsiveText>
        <ResponsiveText size={3.5} color={colors.grey1}>
          See your active tickets and generate your QR
        </ResponsiveText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: colors.lighterGrey,
        }}
      >
        <ResponsiveText weight={"bold"} size={3.5} color={colors.black}>
          Tickets List
        </ResponsiveText>
        <SmallButton
          btnStyle={{ height: hp(4), width: wp(40) }}
          // margin={[0, 0, 10, 0]}
          title={"Browse Events"}
          onPress={() => navigation.navigate(routeName.EVENT_STACK,{screen:routeName.EVENT_LISTED})}
          />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderColor: colors.lighterGrey,
          padding: 15,
          marginTop: hp(1),
        }}
      >
        <ResponsiveText size={3.3} color={colors.black}>
          Event
        </ResponsiveText>
        <ResponsiveText size={3.3} color={colors.black}>
          Date
        </ResponsiveText>
        <ResponsiveText size={3.3} color={colors.black}>
          Time
        </ResponsiveText>
        <ResponsiveText size={3.3} color={colors.black}>
          Action
        </ResponsiveText>
      </View>
      {MyTickets?.length > 0 ? (
        MyTickets?.map((item) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.box}>
                <ResponsiveText
                  fontFamily={"bold"}
                  size={3}
                  color={colors.black}
                >
                  {item?.event?.title}
                </ResponsiveText>
              </View>
              <View style={styles.box}>
                <ResponsiveText size={2.5} color={colors.black}>
                  {moment(item?.event?.date_time).format("DD MMM YYYY")}
                </ResponsiveText>
              </View>
              <View style={styles.box}>
                <ResponsiveText size={2.7} color={colors.primary}>
                  {moment(item?.event?.date_time).format("hh:mm A")}
                </ResponsiveText>
              </View>
              <TouchableOpacity
                style={styles.box}
                // onPress={() =>
                //   navigation.navigate(routeName.EDIT_PRODUCTS, { item: item })
                // }
              >
                <ResponsiveText size={2.5} color={colors.primary}>
                  Generate QR
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          );
        })
      ) : loading == false ? (
        <RecordNotFound />
      ) : null}
      {/* {loading ? <Loader /> : null} */}
    </View>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { width: wp(15), alignItems: "center", paddingVertical: hp(2) },
});
