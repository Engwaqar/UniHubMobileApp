import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import RnButton from "../../components/RnButton";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards, getCartList, getMyOrder } from "../../redux/actions/user.actions";
import AllCards from "../Account/AllCards";
import { routeName } from "../../constants/routeName";
import { currency } from "../../constants/constantVeriable";
const BuyerPayment = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.userReducers.cartList.data);

  const [loading, setLoading] = useState(false);
  const { itemDetail, ProductQty, intent, phone, address } = route.params;
  const toggel = (url) => {
    Alert.alert("Confirm Payment", "Do you want to pay?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          confirmPay(url);
        },
      },
    ]);
  };
  const confirmPay = async (url) => {
    console.log("url", url);
    var requestOptions = {
      method: "GET",
      // headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log("-----------Payment--------", result))
      .catch((error) => {
        console.log("error", error);
        dispatch(getMyOrder());
        dispatch(getCartList());
        navigation.replace(routeName.BUYER_ORDER_PLACED)
      });
  };
  const Submit = async () => {
    const formdata = new FormData();
    formdata.append("payment_intent", intent);
    formdata.append("address", address);
    formdata.append("phone", phone);

    try {
      setLoading(true);
      const res = await Api.post(urls.CONFIRM_PAYEMENT, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        toggel(res.payment.next_action.use_stripe_sdk.stripe_js);
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"UNIHUB Checkout"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Payment{" "}
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.grey1}>
            Select your payment method
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

          <ResponsiveText
            size={3.4}
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            color={colors.black}
          >
            Payment Details
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: wp(0),
            }}
          >
            <ResponsiveText
              margin={[hp(2), 0, 0, 0]}
              size={4}
              color={colors.primary}
            >
              Total:
            </ResponsiveText>
            <ResponsiveText
              margin={[hp(2), 0, 0, 0]}
              size={4}
              color={colors.primary}
            >
              {currency}{100}
            </ResponsiveText>
          </View>
          <AllCards />
        </View>

        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Pay"}
          onPress={() => Submit()}
        />

        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuyerPayment;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
