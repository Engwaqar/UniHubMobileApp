import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../../components/MainHeader";
import Dots from "../../components/Dots";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import InputText from "../../components/InputText";
import RnButton from "../../components/RnButton";
import { globalPath } from "../../constants/globalPath";
import { _toast } from "../../constants/Index";

import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import Loader from "../../components/Loader";
import { routeName } from "../../constants/routeName";
import moment from "moment";

const CheckOut2 = ({ navigation, route }) => {
  const { name, email, address, phone, code, city, data } = route.params;
  console.log("data", data);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  // const [expMonth, setExpMonth] = useState("");
  // const [expYear, setExpYear] = useState("");
  const [expDate, setExpDate] = useState("");
  // const [name, setName] = useState('')
  const [errorString, setErrorString] = useState("");

  const [cvc, setCvc] = useState("");
  const handleCardNumberChange = (text) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/\D/g, "");
    // Format the input with 4-digit groups separated by spaces
    const formattedText = cleanedText.replace(/(\d{4})/g, "$1 ").trim();
    setNumber(formattedText);
  };
  const handleExpiryDateChange = (text) => {
    // Remove all non-digit characters
    const cleanedText = text.replace(/\D/g, "");
    // Format the input with a forward slash after the second digit
    let formattedText = "";
    if (cleanedText.length > 0) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    }
    setExpDate(formattedText);
  };
  const Submit = async () => {
    setErrorString("");
    if (number == "") {
      setErrorString("Card number is required!");
      return false;
    } else if (expDate == "") {
      setErrorString("Expiry date is required!");
      return false;
    } else if (cvc == "") {
      setErrorString("CVV is required!");
      return false;
    }
    const parts = expDate.split("/");

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);

    if (data.type == "event") {
      formdata.append("event_id", data.itemDetail.id);
      formdata.append("price_id", data.selectedPakage.id);
    } else if (data.type == "product") {
      formdata.append("product_id", data.itemDetail.id);
      formdata.append("quantity", data.ProductQty);
    } else {
      formdata.append("service_id", data.itemDetail.id);
      formdata.append("price_id", data.selectedPakage.id);
      formdata.append(
        "date_time",
        moment(data.date_time).format("YYYY-MM-DD hh:mm:ss")
      );
    }
    formdata.append("currency", "USD");

    formdata.append("address", address);
    formdata.append("phone", phone);
    formdata.append("city", city);
    formdata.append("zip", code);

    formdata.append("card_number", number.replace(/\s/g, ""));
    formdata.append("month", parts[0]);
    formdata.append("year", "20" + parts[1]);
    formdata.append("cvc", cvc);
    console.log("formdata", formdata);
    // return false;
    try {
      setLoading(true);
      const url =
        data.type == "product"
          ? urls.guest_book_product
          : data.type == "event"
          ? urls.guest_book_event
          : urls.guest_book_service;
      const res = await Api.post(url, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        navigation.replace(routeName.CHECK_OUT_3);
        _toast(res.message);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader navigation={navigation} title="Card" cartIcon={false} />
      <View style={{ margin: wp(10) }}>
        {/* <ResponsiveText
                    margin={[hp(3), 0, hp(0), 0]}
                    color={colors.primary}
                    textAlign={'center'}
                    size={7}
                    weight="bold"
                >
                    Pay Now
                </ResponsiveText>
                <ResponsiveText
                    margin={[hp(0), 0, hp(1), 0]}
                    color={colors.primary}
                    textAlign={'center'}
                    size={6}
                    weight="bold"
                >
                    Add new card
                </ResponsiveText> */}
        <InputText
          marginHorizontal={1}
          Text={"Name of Card Holder"}
          // value={name}
          // onChnageText={(text) => setName(text)}
        />
        <InputText
          margin={[hp(3), 0, 0, 0]}
          marginHorizontal={1}
          Text={"Card Number"}
          keyboardType="numeric"
          value={number}
          onChnageText={(text) => handleCardNumberChange(text)}
          cardIcon={globalPath.mastercard}
          maxLength={19}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: hp(3),
          }}
        >
          <InputText
            width={wp(38)}
            marginHorizontal={1}
            Text={"Expiry Date"}
            keyboardType="numeric"
            placeholder="MM/YY"
            maxLength={5} // MM/YY format
            value={expDate}
            onChnageText={handleExpiryDateChange}
          />
          <InputText
            width={wp(38)}
            marginHorizontal={1}
            Text={"CVV"}
            value={cvc}
            maxLength={3}
            secureTextEntry
            onChnageText={(text) => setCvc(text)}
          />
        </View>
        {errorString ? (
          <ResponsiveText margin={[wp(2), 0, 0, 0]} color={colors.red}>
            {errorString}
          </ResponsiveText>
        ) : null}
        <RnButton margin={[20, 0, 0, 0]} title={"Pay Now"} onPress={Submit} />
      </View>
      {loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default CheckOut2;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
