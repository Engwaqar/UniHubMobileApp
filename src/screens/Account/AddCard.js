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
import { useDispatch } from "react-redux";
import { getAllCards } from "../../redux/actions/user.actions";
import Loader from "../../components/Loader";

const AddCard = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [expDate, setExpDate] = useState("");
  const [name, setName] = useState('')
  const [errorString, setErrorString] = useState('')

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
    const cleanedText = text.replace(/\D/g, '');
    // Format the input with a forward slash after the second digit
    let formattedText = '';
    if (cleanedText.length > 0) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2)}`;
    }
    setExpDate(formattedText);
  };
  const Submit = async () => {
    setErrorString('')
    if (number=='') {
      setErrorString('Card number is required!')
      return false
    }else if (expDate=='') {
      setErrorString('Expiry date is required!')
      return false
    }else if (cvc=='') {
      setErrorString('CVV is required!')
      return false
    }
    const parts = expDate.split('/');

    const formdata = new FormData();
    formdata.append("number", number.replace(/\s/g, ''));
    formdata.append("exp_month", parts[0]);
    formdata.append("exp_year",'20'+parts[1]);
    formdata.append("cvc", cvc);
    console.log("formdata", formdata);
    // return false;
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_CARD, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getAllCards());
        _toast(res.message);
        navigation.goBack();
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
      <MainHeader navigation={navigation} title="Add Card" cartIcon={false} />
      <View style={{ margin: wp(10) }}>
        <Dots />
        <ResponsiveText
          margin={[hp(3), 0, hp(3), 0]}
          color={colors.primary}
          size={4}
          weight="bold"
        >
          Add new card
        </ResponsiveText>
        <InputText
          marginHorizontal={1}
          Text={"Name of Card Holder"}
          value={name}
          onChnageText={(text) => setName(text)}

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
          <ResponsiveText margin={[wp(2),0,0,0]} color={colors.red}>
            {errorString}
          </ResponsiveText>
        ) : null}
        <RnButton
          width={wp(80)}
          margin={[hp(3), 0, 0, 0]}
          title={"Add card"}
          onPress={() => Submit()}
        />
      </View>
      {loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
