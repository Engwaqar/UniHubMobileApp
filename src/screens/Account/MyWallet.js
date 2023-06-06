import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import { hp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import AllCards from "./AllCards";
import { useSelector } from "react-redux";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";

const MyWallet = ({ navigation }) => {
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
 
  const Withdraw = async () => {
    try {
      const res = await Api.get(urls.WITHDRAW);
      if (res && res.status == 200) {
        _toast(res.message)
      } else {
        _toast(res.message)

      }
    } catch (error) {
      _toast(res.message)

    }
  };
  return (
    <View>
      {MyProfile.is_seller == 0 ? null : (
        <>
          <ResponsiveText color={colors.primary} size={4} weight="bold">
            My Wallet
          </ResponsiveText>
          <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
            Save your credit and debit card details for faster checkout.
          </ResponsiveText>
          <ResponsiveText
            margin={[5, 0, 5, 0]}
            color={colors.primary}
            size={2.8}
          >
            Your Wallet balance is
          </ResponsiveText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ResponsiveText margin={[5, 10, 5, 0]} weight="bold" size={5}>
              00.00 EUR
            </ResponsiveText>
            <TouchableOpacity>
              <Icon size={18} source={globalPath.CloseEye} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <ResponsiveText
              margin={[hp(2), 0, 5, 0]}
              color={colors.primary}
              size={2.8}
            >
              View All Sales
            </ResponsiveText>
          </TouchableOpacity>
          <RnButton
            onPress={Withdraw}
            margin={[hp(3), 0, 0, 0]}
            title={"Withdraw"}
          />
        </>
      )}

      <AllCards />
      <RnButton
        onPress={() => navigation.navigate(routeName.ADD_CARD)}
        margin={[hp(5), 0, 0, 0]}
        title={"Add New Card"}
      />
      <View style={{ height: hp(10) }}></View>
    </View>
  );
};

export default MyWallet;

const styles = StyleSheet.create({});
