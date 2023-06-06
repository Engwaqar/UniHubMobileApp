import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { routeName } from "../../constants/routeName";
import Dots from "../../components/Dots";
import RnButton from "../../components/RnButton";
import { useSelector } from "react-redux";
import { currency } from "../../constants/constantVeriable";

const BookCleaner3 = ({ navigation, route }) => {
  const { itemDetail, selectedPakage, date_time } = route.params;
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Book a Cleaner"} />
      <View
        style={{
          marginTop: hp(3),
          marginBottom: hp(4),
          marginHorizontal: wp(10),
        }}
      >
        <Dots style={{ marginVertical: hp(3) }} />
        <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
          Booking Summary
        </ResponsiveText>
        <ResponsiveText size={3.5} color={colors.grey1}>
          Confirm your booking details
        </ResponsiveText>
        <ResponsiveText margin={[hp(2), 0, 0, 0]} size={3} color={colors.black}>
          {selectedPakage.title}
        </ResponsiveText>
        <ResponsiveText margin={[hp(2), 0, 0, 0]} size={3} color={colors.black}>
          {date_time}
        </ResponsiveText>
        <ResponsiveText margin={[2, 0, 0, 0]} size={3} color={colors.black}>
          {itemDetail.university.name}
        </ResponsiveText>
        <ResponsiveText margin={[hp(2), 0, 0, 0]} size={3} color={colors.black}>
          Staff Member #1
        </ResponsiveText>
        {/* <ResponsiveText
          size={3}
          color={colors.black}
        >
          2 hours
        </ResponsiveText> */}
        <ResponsiveText
          margin={[hp(2), 0, 0, 0]}
          size={3}
          color={colors.primary}
        >
          {currency}{selectedPakage.price}
        </ResponsiveText>
        <RnButton
          width={wp(80)}
          margin={[hp(4), 0, 0, 0]}
          title={"Next"}
          // onPress={() => Validation()}
          onPress={() =>
            navigation.navigate(
              MyProfile.user_type != "Guest"
                ? routeName.CHECKOUT
                : routeName.CHECK_OUT_1,
              {
                itemDetail: itemDetail,
                selectedPakage: selectedPakage,
                date_time: date_time,
                type: "service",
              }
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default BookCleaner3;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { width: wp(15), alignItems: "center", paddingVertical: hp(2) },
});
