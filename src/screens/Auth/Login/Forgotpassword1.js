import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import Fonts from "../../../helpers/Fonts";
import Loader from "../../../components/Loader";
import Dots from "../../../components/Dots";
import AuthHeader from "../../../components/AuthHeader";
import { routeName } from "../../../constants/routeName";
const ForgotPassword1 = ({ navigation }) => {
  const [password, setPassword] = React.useState("");
  const [ConfirmPassword, setConfirmPassword] = React.useState("");

  const [errorString, setErrorString] = React.useState("");
  const Submit = async () => {
    if (password=='') {
        setErrorString('Please enter password')
        return false
    }
    else if (ConfirmPassword=='') {
        setErrorString('Confirm Passwors is Required')
        return false
    }
    else if (ConfirmPassword!=password) {
      setErrorString('Password and confirm password must be same')
      return false
  }
    var formdata = new FormData();
    formdata.append("password", password);
    formdata.append("confirm_password", ConfirmPassword);

    try {
      const res = await Api.post(urls.CHANGE_PASSWORD, formdata);
      console.log("CHANGE_PASSWORD res", res);
      if (res.status=='200') {
        setErrorString(res.message)
        navigation.replace(routeName.BOTTOM_TABS)
      } else {
        setErrorString(res.message)

      }
    } catch (error) {
      setErrorString(error)
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.Rectangle} source={globalPath.Rectangle} />
      <AuthHeader
        navigation={navigation} title={"Reset Password"} 
        />
      <View style={{ marginTop: hp(35), marginHorizontal: wp(10), flex: 1 }}>
      <Dots  />

        <ResponsiveText
          margin={[20, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          weight={"bold"}
          size={5}
          color={colors.primary}
        >
          Forgot your password
        </ResponsiveText>
        <ResponsiveText
          margin={[10, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          size={3.5}
          color={colors.black}
        >
          Enter your new password below
        </ResponsiveText>
        <Input
          placeholder={"Password"}
          value={password}
          onChnageText={(text) => setPassword(text)}
          leftIcon={globalPath.LockIcon}
          secureTextEntry
        />
        <ResponsiveText size={2.5} color={colors.grey1} margin={[10, 0, 0, 0]}>
          {
            "Password must be eight characters long including one uppercase letter, one special character and alphanumeric characters."
          }
        </ResponsiveText>
        <Input
          placeholder={"Re-enter Password"}
          value={ConfirmPassword}
          onChnageText={(text) => setConfirmPassword(text)}
          leftIcon={globalPath.LockIcon}
          secureTextEntry
        />

        <ResponsiveText color={colors.red} margin={[0, 0, 0, 10]}>
          {errorString}
        </ResponsiveText>
        <RnButton
          margin={[50, 0, 0, 0]}
          title={"Send Password Reset Link"}
          onPress={() => Submit()}
        />
      </View>
    </View>
  );
};
export default ForgotPassword1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6F5",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Rectangle: {
    height: hp(68),
    width: wp(140),
    top: hp(-33),
    left: wp(-20),
    position: "absolute",
    // resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    bottom: hp(5),
  },
});
