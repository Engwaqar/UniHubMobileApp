import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import { ScrollView } from "react-native-gesture-handler";
import RnButton from "../../components/RnButton";

import { _toast } from "../../constants/Index";
import { routeName } from "../../constants/routeName";

const CheckOut1 = ({ navigation, route }) => {
  const data = route.params;

  const [errorString, setErrorString] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");

  const validations=()=>{
    if (name=='') {
        setErrorString('The name field is required.')
        return false
    } else if(email==''){
        setErrorString('The email field is required.')
        return false
    } else if(address==''){
        setErrorString('The address field is required.')
        return false
    } else if(phone==''){
        setErrorString('The phone number field is required.')
        return false
    } else if(code==''){
        setErrorString('The Postal code field is required.')
        return false
    } else if(city==''){
        setErrorString('The city field is required.')
        return false
    } else {
        navigation.navigate(routeName.CHECK_OUT_2,{
            name:name,
            email:email,
            address:address,
            phone:phone,
            code:code,
            city:city,
            data:data
        })
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"CheckOut"} />
        {/* <View
                    style={{
                        marginTop: hp(3),
                        marginBottom: hp(3),
                        alignSelf: 'center'
                    }}
                >
                    <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
                        Enter Your Details
                    </ResponsiveText>
                    <ResponsiveText size={3} color={colors.grey1}>
                        Confirm your booking details
                    </ResponsiveText>
                </View> */}
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(2),
            marginHorizontal: wp(6),
          }}
        >
          <ResponsiveText weight={"bold"} size={4} color={colors.primary}>
            Fill out your details
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Tell us a bit about yourself
          </ResponsiveText>

          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"Name"}
            value={name}
            onChnageText={(text) => setName(text)}
          />
          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"Email Address*"}
            value={email}
            onChnageText={(text) => setEmail(text)}
          />
          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"Enter Your Address"}
            value={address}
            onChnageText={(text) => setAddress(text)}
          />
          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"Phone Number"}
            value={phone}
            onChnageText={(text) => setPhone(text)}
          />
          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"Postal Code"}
            value={code}
            onChnageText={(text) => setCode(text)}
          />
          <InputText
            margin={[hp(3), 0, 0, 0]}
            marginHorizontal={1}
            Text={"City"}
            value={city}
            onChnageText={(text) => setCity(text)}
          />

          {errorString ? (
            <ResponsiveText margin={[wp(6)]} color={colors.red}>
              {errorString}
            </ResponsiveText>
          ) : null}
          <RnButton
            margin={[20, 0, 0, 0]}
            title={"Pay Now"}
            onPress={validations}
          />
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckOut1;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
