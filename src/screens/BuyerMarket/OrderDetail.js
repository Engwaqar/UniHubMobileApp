import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import RnButton from "../../components/RnButton";
import Dots from "../../components/Dots";
import { routeName } from "../../constants/routeName";
import { currency } from "../../constants/constantVeriable";
const OrderDetail = ({ navigation, route }) => {
  const { itemDetail, ProductQty } = route.params;

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} cartIcon title={"Checkout"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(8),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Order Summary{" "}
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Confirm your booking details
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(3), 0, 0, 0]}
            fontFamily={"bold"}
            size={3}
            color={colors.black}
          >
            {itemDetail.name}
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(3), 0, 0, 0]}
            size={3}
            color={colors.black}
          >
            Quantity {ProductQty}
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(3), 0, 0, 0]}
            size={3}
            color={colors.primary}
          >
            {currency}{itemDetail.price}
          </ResponsiveText>
          <RnButton
            width={"100%"}
            margin={[hp(3), 0, 0, 0]}
            title={"Next"}
            onPress={() =>
              navigation.navigate(routeName.CHECK_OUT_1, {
                itemDetail: itemDetail,
                ProductQty: ProductQty,
                type:'product'
              })
            }
          />
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
