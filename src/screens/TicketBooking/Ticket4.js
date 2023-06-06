import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import RnButton from "../../components/RnButton";
import { ScrollView } from "react-native-gesture-handler";
import InputText from "../../components/InputText";
import { useSelector } from "react-redux";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import moment from "moment";
import Loader from "../../components/Loader";
import { currency } from "../../constants/constantVeriable";

const Ticket4 = ({ navigation ,route}) => {
  const { itemDetail, selectedPakage } = route.params;

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
    setAddress(MyProfile.address);
    setPhone(MyProfile.phone);
  }, []);

  const Submit = async () => {
    const formdata = new FormData();
    formdata.append("event_id", itemDetail.id);
    formdata.append("price_id", selectedPakage.id);
    formdata.append("currency", 'USD');
    // formdata.append('price', price)

    try {
      setLoading(true);
      const res = await Api.post(urls.BOOK_TICKET, formdata);
      console.log("=============book ticket============", res);
      if (res && res.status == 200) {
        setLoading(false);
        navigation.navigate('Ticket5', {
          itemDetail: itemDetail,
          selectedPakage: selectedPakage,
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
        <MainHeader navigation={navigation} title={"Event Booking"} />
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

        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
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
              size={4}
              color={colors.black}
            >
              Total:
            </ResponsiveText>
            <ResponsiveText
              margin={[hp(2), 0, 0, 0]}
              size={4}
              color={colors.primary}
            >
              {currency}{"40"}
            </ResponsiveText>
          </View>
          <RnButton
            width={wp(90)}
            margin={[hp(3), 0, 0, 0]}
            title={"Pay Now"}
              onPress={Submit}
          />
        </View>
      </ScrollView>
      {loading?<Loader/>:null}

    </SafeAreaView>
  );
};

export default Ticket4;

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
