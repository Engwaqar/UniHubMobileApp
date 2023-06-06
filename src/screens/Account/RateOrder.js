import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import RnButton from "../../components/RnButton";
import Dots from "../../components/Dots";
import { _toast } from "../../constants/Index";

import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { Rating } from "react-native-ratings";
import InputText from "../../components/InputText";
import Loader from "../../components/Loader";
import { currency } from "../../constants/constantVeriable";

const RateOrder = ({ navigation, route }) => {
  const itemDetail = route.params;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(2.5);
  const Submit = async () => {
    if (message == "") {
      _toast("Feedback is required!");
      return false;
    }
    const body = {
      message: message,
      rating: count,
      order_type: "product",
      order_id: itemDetail.id,
    };
    try {
      setLoading(true);
      const res = await Api.post(urls.ORDER_REVIEW, body);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        _toast(res.message);
        navigation.goBack();
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} cartIcon title={"Rate Order"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(8),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Rate Your Order
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Order details
          </ResponsiveText>
          <FlatList
            data={itemDetail.products}
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
          <ResponsiveText margin={[hp(2), 0, 0, 0]} size={4}>
            Rating
          </ResponsiveText>
          <Rating
            type="custom"
            ratingColor={colors.primary}
            ratingBackgroundColor={colors.lightgreen}
            ratingCount={5}
            tintColor={colors.background}
            onFinishRating={(count) => setCount(count)}
            style={{ paddingVertical: hp(3) }}
          />
          <ResponsiveText size={4}>Feedback</ResponsiveText>
          <InputText
            Text={"Feedback"}
            marginHorizontal={1}
            style={{ height: hp(15), marginTop: hp(2) }}
            value={message}
            multiline
            onChnageText={(text) => setMessage(text)}
          />
          <RnButton
            width={"100%"}
            margin={[hp(3), 0, 0, 0]}
            title={"Submit"}
            onPress={Submit}
          />
        </View>

        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default RateOrder;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
    backgroundColor: colors.background,
  },
  box: { height: hp(20), marginTop: 15 },
});
