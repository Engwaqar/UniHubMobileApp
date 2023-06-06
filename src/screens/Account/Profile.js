import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../../components/MainHeader";
import { globalPath } from "../../constants/globalPath";
import { hp, screenWidth, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "../../components/Icon";
import Dots from "../../components/Dots";
import SmallButton from "../../components/SmallButton";
import { _toast } from "../../constants/Index";

import MyDetails from "./MyDetails";
import MyOrders from "./MyOrders";
import MyWallet from "./MyWallet";
import Appointments from "./Appointments";
import MyTickets from "./MyTickets";
import ImagePicker from "react-native-image-crop-picker";

import { useDispatch, useSelector } from "react-redux";
import {getMyProfile, logoutUser } from '../../redux/actions/user.actions'
import urls from "../../redux/lib/urls";
import Loader from "../../components/Loader";
import Modal from "react-native-modal";
import Fonts from "../../helpers/Fonts";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";
import UserID from "./UserID";
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const profileRef = useRef();
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState();
  const [guestModal, setGuestModal] = useState(false);

  const MyProfile = useSelector(state => state.userReducers.getMyProfile.data,);
  const MyProfileloading = useSelector(state => state.userReducers.getMyProfile.refreshing);
  const MyOrderloading = useSelector((state) => state.userReducers.getMyOrder?.refreshing);
  const Ticketloading = useSelector((state) => state.userReducers.getMyTickets?.refreshing);
  console.log('MyProfile', MyProfile)
  useEffect(() => {
    if(MyProfile.user_type != "Guest"){
      dispatch(getMyProfile());
    }
}, [])

  useLayoutEffect(() => {
    // Perform layout updates here, using the latest DOM layout
    const unsubscribe = navigation.addListener('focus', () => {
      if(MyProfile.user_type === "Guest"){
        setGuestModal(true)
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]); 


  const tabsData = [
    { id: 1, title: "My details", iconSource: globalPath.HeartE },
    { id: 2, title: "My Orders", iconSource: globalPath.Wallet },
    { id: 3, title: "My Wallets", iconSource: globalPath.Wallet },
    { id: 4, title: "Appointments", iconSource: globalPath.Wallet },
    { id: 5, title: "My Tickets", iconSource: globalPath.Ticket },
    { id: 6, title: "ID", iconSource: globalPath.user },
  ];
  // const Submit = () => {
  //   console.log('first', profileRef.current)
  //   profileRef.current?.Submit();
  // };
  const switchProfile = async () => {
    var urlencoded = new URLSearchParams({
      is_seller: MyProfile.is_seller == 0 ? "1" : "0",
    });
    try {
      setLoading(true);
      const res = await Api.put(urls.SWITCH_PROFILE, urlencoded, true);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        _toast(res.message);
        dispatch(getMyProfile());
        // if (res.accountLink) {
          //   // Linking.openURL(res.accountLink.url);
          // }
        } else {
        navigation.navigate(routeName.BANK_DETAILS)
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const toggel = () => {
    Alert.alert("Profile Image", "Change profile image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "open Camera",
        onPress: async () => {
          openCamera();
        },
      },
      {
        text: "Select from gallary",
        onPress: async () => {
          takephotofromgallary();
        },
      },
    ]);
  };
  const takephotofromgallary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      profileRef.current?.Submit(image);

      console.log(image, "image working");
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      profileRef.current?.Submit(image);

      // addPhoto(image);
      console.log(image, "image working");
    });
  };

  const onClose = () => {
    setGuestModal(false)
    navigation.goBack()
  }

  const onConfirm = async () => {
    let data = {}
    await AsyncStorage.clear()
    await navigation.dispatch(StackActions.replace(routeName.AUTH_STACK, { screen: routeName.LOGIN }));
    dispatch(
      logoutUser({ data })
    );
  }

  return (
    <SafeAreaView>
      <MainHeader logout navigation={navigation} title={"My Account"} />
      <ScrollView>
        <TouchableOpacity onPress={toggel}>
          <Image
            style={styles.Img}
            defaultSource={globalPath.ProfileIcon}
            source={
              MyProfile.profile_img
                ? { uri: urls.IMG_BASE_URL + MyProfile.profile_img }
                : globalPath.ProfileIcon
            }
          />
        </TouchableOpacity>
        <ResponsiveText
          size={4}
          textAlign="center"
          margin={[5, 0, 0, 0]}
          weight="bold"
        >
          {MyProfile.name}
        </ResponsiveText>
        <SmallButton
          btnStyle={{ height: hp(4), width: wp(40) }}
          margin={[10, 0, 10, 0]}
          title={ MyProfile.is_seller == 0 ? "Switch to Seller" : "Switch to Buyer" }
           onPress={switchProfile}

        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ marginLeft: wp(5), marginTop: hp(3) }}
        >
          {tabsData.map((item) => (
            <TouchableOpacity
              style={[
                styles.Tab,
                {
                  backgroundColor:
                    item.id == activeTab ? colors.lightgreen : colors.white,
                },
              ]}
              onPress={() => setActiveTab(item.id)}
            >
              <Icon size={30} tintColor={colors.black} source={item.iconSource} />
              <ResponsiveText size={2.5} margin={[8, 0, 0, 0]}>
                {item.title}
              </ResponsiveText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ margin: wp(8) }}>
          <Dots style={{ marginBottom: hp(3) }} />
          {activeTab === 1 && (
            <MyDetails setLoading={setLoading} ref={profileRef} />
          )}
          {activeTab === 2 && <MyOrders navigation={navigation} />}
          {activeTab === 3 && <MyWallet navigation={navigation} />}
          {activeTab === 4 && <Appointments navigation={navigation} />}
          {activeTab === 5 && <MyTickets navigation={navigation} />}
          {activeTab === 6 && <UserID navigation={navigation} />}
        </View>
      </ScrollView>
      {MyProfileloading || MyOrderloading ||Ticketloading ||loading? <Loader/> : undefined}
      <Modal
        isVisible={guestModal}
        onModalHide={() => setGuestModal(false)}
        onBackdropPress={() => onClose()}
        animationOutTiming={500}
        backdropOpacity={0.76}
      >
        <View style={styles.centeredView}>
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
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Img: {
    alignSelf: "center",
    height: wp(25),
    width: wp(25),
    borderWidth: 5,
    borderRadius: wp(15),
    borderColor: colors.primary,
    resizeMode: "cover",
    marginTop: hp(3),
  },
  Tab: {
    backgroundColor: colors.white,
    width: wp(20),
    height: wp(20),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
