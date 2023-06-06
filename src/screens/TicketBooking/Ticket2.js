import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import PackageTabs from "../Home/PackageTabs";
import RnButton from "../../components/RnButton";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { currency } from "../../constants/constantVeriable";

const Ticket2 = ({ navigation, route }) => {
  const { itemDetail, selectedPakage } = route.params;

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
            {itemDetail.title}
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            size={2.8}
            color={colors.grey1}
          >
            {itemDetail.descreption}
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Event Date & Time:{"  "}
            <ResponsiveText size={3} color={colors.primary}>
            {moment(itemDetail.date_time).format('DD MMM YYYY hh:mm:ss')}
            </ResponsiveText>
          </ResponsiveText>
          {/* <ResponsiveText margin={[hp(1), 0, 0, 0]} size={3}>
            Timezone:
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.primary}>
            Greenwich Mean Time (GMT)
          </ResponsiveText> */}
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Event Location: {"  "}
            <ResponsiveText size={3} color={colors.primary}>
              {itemDetail.address}
            </ResponsiveText>
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Package Selected
          </ResponsiveText>
          <View style={{ marginVertical: hp(2) }}>
            <PackageTabs
              title={selectedPakage.title}
              price={currency+ selectedPakage.price}
              isSelected={true}
            />
          </View>
          <RnButton
            width={wp(90)}
            margin={[hp(3), 0, 0, 0]}
            title={"Next"}
            onPress={() =>
              navigation.navigate("Ticket3", {
                itemDetail: itemDetail,
                selectedPakage: selectedPakage,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket2;

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
