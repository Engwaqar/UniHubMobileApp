import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import { ScrollView } from "react-native-gesture-handler";
import RnButton from "../../components/RnButton";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { useDispatch, useSelector } from "react-redux";
import { routeName } from "../../constants/routeName";
import { getCartList, getMyOrder } from "../../redux/actions/user.actions";
import { currency } from "../../constants/constantVeriable";
const BuyerCheckout = ({ navigation }) => {
  const dispatch = useDispatch();
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const cartList = useSelector((state) => state.userReducers.cartList.data);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setName(MyProfile.name);
    setAddress(MyProfile.address);
    setPhone(MyProfile.phone);
  }, []);

  const Submit = async () => {
    // const formdata = new FormData();
    // formdata.append("product_id", cartList.map((item)=>item.id));
    // formdata.append("currency", "usd");
    // formdata.append("quantity", cartList.map((item)=>item.pivot.quantity));
    // // formdata.append('price', price)

    try {
      setLoading(true);
      const res = await Api.get(urls.CHECKOUT);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        // dispatch(getCartList());
        navigation.navigate(routeName.BUYER_PAYMENT, {
          // itemDetail: itemDetail,
          // ProductQty: ProductQty,
          intent: res.intent,
          address:address,
          phone:phone
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Checkout"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Fill out your details
          </ResponsiveText>
          <ResponsiveText margin={[5, 0, 0, 0]} size={3} color={colors.grey1}>
            Tell us a bit about yourself
          </ResponsiveText>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <ResponsiveText size={3} color={colors.black}>
              Not {MyProfile.name}
            </ResponsiveText>
            <TouchableOpacity>
              <ResponsiveText size={3} color={colors.primary}>
                : Switch Account
              </ResponsiveText>
            </TouchableOpacity>
          </View>
          <ResponsiveText size={3} color={colors.grey1}>
            Your Login email can’t be changed
          </ResponsiveText>
        </View>
        <InputText
          Text={"Name"}
          value={name}
          placeholder={"name"}
          onChnageText={(text) => setName(text)}
        />

        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Email Address"}
            editable={false}
            value={MyProfile.email}
            placeholder={"email address"}
            onChnageText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Phone"}
            value={phone}
            placeholder={"phone"}
            onChnageText={(text) => setPhone(text)}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Address"}
            value={address}
            placeholder={"Address"}
            onChnageText={(text) => setAddress(text)}
          />
        </View>
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Order Summary{" "}
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.grey1}>
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
          {/* <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: wp(0),
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: colors.lighterGrey,
                marginVertical: hp(1),
              }}
            >
              <Icon
                margin={[hp(1), 0, hp(1), 0]}
                tintColor={colors.primary}
                source={globalPath.Tag}
              />
              <ResponsiveText
                size={3.4}
                margin={[hp(1), 0, hp(1), 5]}
                weight={"bold"}
                color={colors.primary}
              >
                Add Promo Code
              </ResponsiveText>
            </View>
          </TouchableOpacity> */}
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
              //   weight={"bold"}
              color={colors.black}
            >
              Total:
            </ResponsiveText>
            <ResponsiveText
              margin={[hp(2), 0, 0, 0]}
              size={4}
              //  weight={"bold"}
              color={colors.primary}
            >
              {currency}{100}
            </ResponsiveText>
          </View>
        </View>
        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Pay Now"}
          onPress={() => Submit()}
        />

        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuyerCheckout;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const BuyerCheckout = () => {
//   return (
//     <View>
//       <Text>BuyerCheckout</Text>
//     </View>
//   )
// }

// export default BuyerCheckout

// const styles = StyleSheet.create({})
