import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { screenWidth, wp } from "../helpers/Responsiveness";
import AsyncStorage from "@react-native-community/async-storage";
import { routeName } from "../constants/routeName";
import { StackActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/user.actions";
import Modal from "react-native-modal";
import Fonts from "../helpers/Fonts";

export default function MainHeader({ navigation, title, cartIcon ,logout}) {
  const dispatch = useDispatch();
  const [guestModal, setGuestModal] = useState(false);

  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const toggel = (url) => {
    Alert.alert("Log Out", "Do you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          let data = {}
          await AsyncStorage.clear()
          await navigation.dispatch(StackActions.replace(routeName.AUTH_STACK,{screen:routeName.LOGIN}));
          dispatch(
            logoutUser({data})
          );
        },
      },
    ]);
  };
  const onClose = () => {
    setGuestModal(false)
  }
  return (
    <>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 12,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon size={25} source={globalPath.backarrow} />
      </TouchableOpacity>
      <ResponsiveText color={colors.black} size={5}>
        {title}
      </ResponsiveText>
      {cartIcon ? (
        <TouchableOpacity onPress={()=>{
          if (MyProfile.user_type != "Guest") {
            navigation.navigate(routeName.CART_LIST)
          }else{
            setGuestModal(true)
          }
        }} >
          <Icon size={35} source={globalPath.Cart} />
        </TouchableOpacity>
      ) :logout? (
        <TouchableOpacity onPress={toggel}>
        <ResponsiveText weight={'bold'} color={colors.red} >Log Out</ResponsiveText>
      </TouchableOpacity>
      ): <Icon size={35}  />}
    </View>
    <Modal
        isVisible={guestModal}
        onModalHide={() => setGuestModal(false)}
        onBackdropPress={() => onClose()}
        animationOutTiming={500}
        backdropOpacity={0.76}
      >
        <View style={{flex: 1,
    justifyContent: "center",
    alignItems: "center",}}>
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: 0.84 * screenWidth,
            }}
          >
            <TouchableOpacity onPress={() => onClose()}>
              <Text
                style={{
                  padding: 10,
                  right: screenWidth * 0.02,
                  flexDirection: "row",
                  textAlign: "right",
                  color: colors.black,
                  // fontFamily: fontFamily.pt_sans,
                  // fontSize: fontSize.verbiage
                }}
              >
                ✖
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: colors.black,
                // fontFamily: fontFamily.pt_sans,
                // fontWeight: fontWeight[700],
                // fontSize: fontSize.screen_title,
              }}
            >
              Want to login
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: colors.black,
                // fontFamily: fontFamily.pt_sans,
                // fontWeight: fontWeight[400],
                // fontSize: fontSize.verbiage,
                alignSelf: "center",
                width: 0.7 * screenWidth,
                paddingVertical: 20,
              }}
            >
              To access more features you need to login first
            </Text>
            <TouchableOpacity onPress={() => onConfirm()}>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingBottom: 15,
                  // right: screenWidth * 0.02,
                  flexDirection: "row",
                  textAlign: 'center',
                  color: colors.black,
                  fontWeight: 'bold',
                  fontSize: 16,
                  fontFamily: Fonts.Bold,
                  // backgroundColor:'red'

                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({});
