import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import RnButton from "../../components/RnButton";
import Dots from "../../components/Dots";
import { routeName } from "../../constants/routeName";
import { useSelector } from "react-redux";
import RecordNotFound from "../../components/RecordnotFound";
import { currency } from "../../constants/constantVeriable";
const CartList = ({ navigation }) => {
  const cartList = useSelector((state) => state.userReducers.cartList.data);
  console.log("cartList", cartList);
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Checkout"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(8),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          {cartList.length>0?
          <>
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Order Summary{" "}
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Confirm your booking details
          </ResponsiveText>
            <FlatList
              data={cartList}
              renderItem={({ item }) => {
                return (
                  <>
                    <ResponsiveText
                      margin={[hp(3), 0, 0, 0]}
                      fontFamily={"bold"}
                      size={3}
                      color={colors.black}
                    >
                      {item.name}
                    </ResponsiveText>
                    <ResponsiveText
                      margin={[hp(2), 0, 0, 0]}
                      size={3}
                      color={colors.black}
                    >
                      Quantity {item.pivot.quantity}
                    </ResponsiveText>
                    <ResponsiveText
                      margin={[hp(2), 0, 0, 0]}
                      size={3}
                      color={colors.primary}
                    >
                      {currency}{item.price}
                    </ResponsiveText>
                  </>
                );
              }}
            />
            <RnButton
              width={"100%"}
              margin={[hp(3), 0, 0, 0]}
              title={"Next"}
              onPress={() =>
                navigation.navigate(routeName.BUYER_CHECKOUT, {
                  // itemDetail: itemDetail,
                  // ProductQty: ProductQty,
                })
              }
            />
          </>
            
            :
            <RecordNotFound verbiage='Your cart is Empty!' />
          }
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartList;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
