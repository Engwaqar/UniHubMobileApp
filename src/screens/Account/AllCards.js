import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import { hp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards } from "../../redux/actions/user.actions";
import PaymentCard from "../../components/PaymentCard";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";

const AllCards = ({ navigation }) => {
  const dispatch = useDispatch();
  const AllCards = useSelector((state) => state.userReducers.getAllCards?.data);

  const [isloading, setLoading] = useState(false);
  console.log("getAllCards", AllCards);
  const data=[{
    "id": 34,
    "user_id": 45,
    "payment_method": "pm_1N71rkEgzv86ZanEshBVijfT",
    "last_digit": "4242",
    "type": "card",
    "brand": "Apple Pay",
    "is_primary": 0,
    "url": globalPath.Apple,
    "updated_at": "2023-05-12T19:43:01.000000Z"
},
{
  "id": 34,
  "user_id": 45,
  "payment_method": "pm_1N71rkEgzv86ZanEshBVijfT",
  "last_digit": "4242",
  "type": "card",
  "brand": "Google Pay",
  "is_primary": 0,
  "url": require('../../assets/icons/GooglePay.png'),
  "updated_at": "2023-05-12T19:43:01.000000Z"
},
{
  "id": 34,
  "user_id": 45,
  "payment_method": "pm_1N71rkEgzv86ZanEshBVijfT",
  "last_digit": "",
  "type": "card",
  "brand": "PayPal",
  "is_primary": 0,
  "url": require('../../assets/icons/Paypal.png'),
  "updated_at": "2023-05-12T19:43:01.000000Z"
},
{
  "id": 34,
  "user_id": 45,
  "payment_method": "pm_1N71rkEgzv86ZanEshBVijfT",
  "last_digit": "3456",
  "type": "card",
  "brand": "Visa",
  "is_primary": 0,
  "updated_at": "2023-05-12T19:43:01.000000Z"
}
]

  useEffect(() => {
    dispatch(getAllCards());
  }, []);
  const setPrimary = async (item) => {
    const formdata = new FormData();
    formdata.append("payment_id", item.id);
    console.log("formdata", formdata);
    // return false;
    try {
      setLoading(true);
      const res = await Api.post(urls.MAKE_PAYMENT_PRIMARY, formdata);
      console.log("MAKE_PAYMENT_PRIMARY", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getAllCards());
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
    <View>
      {AllCards?.length > 0 ? (
        <View>
          <ResponsiveText margin={[hp(2), 0, hp(1), 0]}>Cards</ResponsiveText>
          {AllCards.map((item, index) => (
            <PaymentCard
              title={item.brand}
              active={item.is_primary == 1}
              source={item.url}
              Number={item.last_digit}
              onPress={() => setPrimary(item)}
            />
          ))}
        </View>
      ) : (
        <>
          {/* <ResponsiveText
            margin={[hp(5), 0, 0, 0]}
            color={colors.black}
            size={3}
          >
            You Haven’t Saved Any Cards Yet
          </ResponsiveText>
          <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
            Securely save your payment details when you place an order at
            checkout.
          </ResponsiveText> */}
        </>
      )}
       {data.map((item, index) => (
            <PaymentCard
              title={item.brand}
              active={item.is_primary == 1}
              source={item.url}
              Number={item.last_digit}
              onPress={() => setPrimary(item)}
            />
          ))}
    </View>
  );
};

export default AllCards;

const styles = StyleSheet.create({});
