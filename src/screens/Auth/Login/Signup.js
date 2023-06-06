import React, { useEffect, useState } from "react";
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
import { routeName } from "../../../constants/routeName";
import { _toast, _encode } from "../../../constants/Index";
import DropDown from "../../../components/DropDown";
import { ScrollView } from "react-native-gesture-handler";
import Dots from "../../../components/Dots";
import AuthHeader from "../../../components/AuthHeader";
import database from '@react-native-firebase/database';


const Signup = ({ navigation }) => {
  const [errorString, setErrorString] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUniy, setselectedUniy] = useState(null);
  const [Universities, setUniversities] = useState([]);

  useEffect(() => {
    getUniversities();
  }, []);


  const getUniversities = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_ALL_UNIES);
      console.log('res', res)
      if (res && res.status == 200) {
        setUniversities(res.universities);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };

  const userRegister = async () => {
    
    var formdata = new FormData();
    formdata.append("name", userName);
    formdata.append("email", email);
    formdata.append("university", selectedUniy);

    formdata.append("password", password);
    formdata.append("confirmPassword", confirmPassword);

    try {
      setLoading(true);
      const res = await Api.post(urls.REGISTER, formdata);
      console.log("res", res);
      if (res && res.status == 200) {

        await database().ref('users').child(_encode(email)).set({
          id: _encode(email),
          name: userName,
          email: email,
          // deviceToken: deviceToken,
        }).catch(() => {
          _toast('Something went wrong with firebase');
        });

        setLoading(false);
        _toast(res.message);
        navigation.goBack();
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      setErrorString(error);
    }
  };

  const Validation = (item) => {
    // navigation.navigate(routeName.OTP,{email:email});
    // return false
    setErrorString("");
    if (
      userName === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === ""&&
      selectedUniy==null
    ) {
      setErrorString("All fields are required");
    } else if (userName === "") {
      setErrorString("Full name field is required.");
    } else if (selectedUniy === null) {
      setErrorString("The university field is required.");
    } else if (email === "") {
      setErrorString("Email field is required.");
    } else if (password === "") {
      setErrorString("Password field is required.");
    } else if (confirmPassword === "") {
      setErrorString("Confirm password field is required.");
    } else if (confirmPassword != password) {
      setErrorString("Password and confirm password must be same");
    } else {
      userRegister();
      setErrorString("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.Rectangle} source={globalPath.Rectangle} />
        <AuthHeader
          navigation={navigation} title={"Sign up"}
        />
        <View style={{ marginTop: hp(35), marginHorizontal: wp(5) }}>
          <Dots style={{ marginLeft: hp(2) }} />
          <ResponsiveText
            margin={[20, 0, 0, 20]}
            fontFamily={Fonts.Bold}
            weight={"bold"}
            size={5}
            color={colors.primary}
          >
            Hello, Welcome to UNIHUB!
          </ResponsiveText>
          <ResponsiveText
            margin={[10, 0, 0, 20]}
            fontFamily={Fonts.Bold}
            size={3}
            color={colors.black}
          >
            Create your UNIHUB store account
          </ResponsiveText>
          <Input
            placeholder={"Full Name"}
            onChnageText={(text) => setUserName(text)}
            leftIcon={globalPath.EmailIcon}
            value={userName}
          />
          <View style={{ marginTop: hp(2) }}>
            <DropDown
            backgroundColor={colors.white}
            borderColor={colors.white}
            width ={wp(86)}
            // height={hp(5)}
              title={"Select University"}
              // defaultButtonText={
              //   Universities.find((v) => v.id == selectedUniy)?.title
              // }
              data={Universities.map((v) => v.name)}
              onSelect={(item) => {
                var id = Universities.find((v) => v.name == item)?.id;
                setselectedUniy(id);
              }}
            />
          </View>
          <Input
            placeholder={"Email Address"}
            onChnageText={(text) => setEmail(text)}
            leftIcon={globalPath.EmailIcon}
            value={email}
          />

          <Input
            placeholder={"Password"}
            value={password}
            onChnageText={(text) => setPassword(text)}
            leftIcon={globalPath.LockIcon}
            secureTextEntry
          />
          <Input
            placeholder={"Confirm Password"}
            value={confirmPassword}
            onChnageText={(text) => setConfirmPassword(text)}
            leftIcon={globalPath.LockIcon}
            secureTextEntry
          />
          <ResponsiveText
            size={2.5}
            color={colors.grey1}
            margin={[20, 0, 0, 10]}
          >
            {
              "Password must be eight characters long including one uppercase letter, one special character and alphanumeric characters"
            }
          </ResponsiveText>
          <ResponsiveText color={colors.red} margin={[10, 0, 10, 10]}>
            {errorString}
          </ResponsiveText>
          <RnButton
            margin={[10, 0, 0, 0]}
            title={"Sign up"}
            onPress={() => Validation()}
          />
          {/* <ResponsiveText
            margin={[20, 0, 20, 0]}
            size={3}
            color={colors.grey1}
            textAlign={"center"}
          >
            Or continue with
          </ResponsiveText> */}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: wp(70),
              alignSelf: "center",
            }}
          >
            <Icon size={30} source={globalPath.Facebook} />
            <Icon size={30} source={globalPath.Google} />
            <Icon size={30} source={globalPath.Apple} />
          </View> */}
          <View style={styles.footer}>
            <ResponsiveText margin={[0, 10]} color={colors.black}>
              Already have an account?{" "}
              <ResponsiveText
                fontFamily="Bold"
                color={colors.primary}
                onPress={() => navigation.navigate(routeName.LOGIN)}
              >
                Sign in
              </ResponsiveText>
            </ResponsiveText>
          </View>
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </View>
  );
};
export default Signup;
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
    marginVertical: hp(5),
  },
});
