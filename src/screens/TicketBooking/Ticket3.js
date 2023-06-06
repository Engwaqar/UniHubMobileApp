import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import RnButton from "../../components/RnButton";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useSelector } from "react-redux";
import { routeName } from "../../constants/routeName";
import { currency } from "../../constants/constantVeriable";

const Ticket3 = ({ navigation,route }) => {
  const { itemDetail, selectedPakage } = route.params;
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Events"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Booking Summary
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            size={2.8}
            color={colors.grey1}
          >
            Confirm your booking details
          </ResponsiveText>

          <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            size={3.5}
            color={colors.black}
          >
            {itemDetail.title} {`\n`}Package {selectedPakage.title} {`\n\n`}{moment(itemDetail.date_time).format('DD MMM YYYY hh:mm:ss')} {`\n`}{itemDetail.address} {`\n\n`}Your Booking Number #1{" "}
            {`\n`}Event Duration 2 hours
          </ResponsiveText>

          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Price: {"  "}
            <ResponsiveText size={3} color={colors.primary}>
              {selectedPakage.price}{currency}
            </ResponsiveText>
          </ResponsiveText>
          <RnButton
            width={wp(90)}
            margin={[hp(3), 0, 0, 0]}
            title={"Next"}
              onPress={() => navigation.navigate(MyProfile.user_type !='Guest'?'Ticket4':routeName.CHECK_OUT_1, {
                itemDetail: itemDetail,
                selectedPakage: selectedPakage,
                type:'event'
              })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket3;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
  },
  box: {
    width: wp(15),
    alignItems: "center",
    paddingVertical: hp(2),
  },
  ImgStyle: {
    marginTop: hp(1),
    height: hp(18),
    width: wp(88),
    resizeMode: "contain",
    // marginBottom: 20,
    // alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 6,
  },
});
