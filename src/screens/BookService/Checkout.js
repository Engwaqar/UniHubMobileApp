import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import { ScrollView } from "react-native-gesture-handler";
import { globalPath } from "../../constants/globalPath";
import { _toast } from "../../constants/Index";
import Icon from "../../components/Icon";
import RnButton from "../../components/RnButton";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { useDispatch, useSelector } from "react-redux";
import { routeName } from "../../constants/routeName";
import Loader from "../../components/Loader";
import moment from "moment";
import { currency } from "../../constants/constantVeriable";
const Checkout = ({ navigation, route }) => {
  const { itemDetail, selectedPakage ,date_time} = route.params;

  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setName(MyProfile.name);
    setEmail(MyProfile.email);
    setPhone(MyProfile.phone);
    setAddress(MyProfile.address);
  }, []);

  const Submit = async () => {
    const formdata = new FormData();
    formdata.append("service_id", itemDetail.id);
    formdata.append("price_id", selectedPakage.id);
    formdata.append("currency", "USD");
    formdata.append("date_time", moment(date_time).format('YYYY-MM-DD hh:mm'));

    try {
      setLoading(true);
      const res = await Api.post(urls.BOOK_SERVICE, formdata);
      console.log("=============book service============", res);
      if (res && res.status == 200) {
        setLoading(false);
        navigation.navigate(routeName.PAYMENT_CONFIRMATION, {
          itemDetail: itemDetail,
          selectedPakage: selectedPakage,
          date_time:date_time,
          intent: res.intent,
          address: address,
          phone: phone,
        });
      } else {
        _toast(res.message)
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
        <MainHeader navigation={navigation} title={"Book a Cleaner"} />
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
          <ResponsiveText size={3} color={colors.grey1}>
            Tell us a bit about yourself
          </ResponsiveText>
          <View style={{ flexDirection: "row" }}>
            <ResponsiveText
              margin={[hp(0.5), 0, 0, 0]}
              size={3}
              // weight={"bold"}
              color={colors.black}
            >
              Not {MyProfile.name}
            </ResponsiveText>
            <TouchableOpacity>
              <ResponsiveText
                margin={[hp(0.5), 0, 0, 0]}
                size={3}
                // weight={"bold"}
                color={colors.primary}
              >
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
            value={email}
            placeholder={"email address"}
            onChnageText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Phone"}
            value={phone}
            // placeholder={"phone"}
            onChnageText={(text) => setPhone(text)}
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
            Booking Summary{" "}
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.grey1}>
            Confirm your booking details
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            size={3}
            // weight={"bold"}
            color={colors.black}
          >
            {selectedPakage.title}
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            size={3}
            // weight={"bold"}
            color={colors.black}
          >
            {date_time}
          </ResponsiveText>
          <ResponsiveText
            margin={[2, 0, 0, 0]}
            size={3}
            // weight={"bold"}
            color={colors.black}
          >
            {itemDetail.university.name}
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            size={3}
            // weight={"bold"}
            color={colors.black}
          >
            Staff Member #1
          </ResponsiveText>
         
          <TouchableOpacity>
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
          </TouchableOpacity>
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
              size={5}
              //  weight={"bold"}
              color={colors.primary}
            >
              Total:
            </ResponsiveText>
            <ResponsiveText
              margin={[hp(2), 0, 0, 0]}
              size={5}
              //  weight={"bold"}
              color={colors.primary}
            >
              {currency}{selectedPakage.price}
            </ResponsiveText>
          </View>
        </View>
        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Pay Now"}
          onPress={() => Submit()}
          // onPress={()=>navigation.navigate(routeName.PAYMENT_CONFIRMATION)}
        />

        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
