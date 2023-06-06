import { StyleSheet, Text, TouchableOpacity, View,Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { hp, screenHeight, screenWidth, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import { colors, } from "../../constants/colorsPallet";
import { _exit_and_go_to_login } from '../../constants/Index'
import TabsView from "./TabsView";
import { routeName } from "../../constants/routeName";
import Dots from "../../components/Dots";
import { SigInAsGuest, getCartList, getMyProfile, logoutUser } from "../../redux/actions/user.actions";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import ReviewsSlider from "./ReviewsSlider";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import Fonts from "../../helpers/Fonts";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  console.log(' === at home screen ====', MyProfile)
  const [Reviewsdata, setReviewsdata] = useState([]);
  const [guestModal, setGuestModal] = useState(false);

  let user_type;

  React.useEffect(()=>{
    fetchUserType()
  },[])

  const fetchUserType = async () => {
    user_type = await AsyncStorage.getItem("user_type")
    console.log('==== user_type ==== ', user_type)
    if(user_type === "Guest" ){
    let data = { user_type: "Guest" }
      dispatch(
        SigInAsGuest({
          ...data,
        })
      );
    }
  }
  useEffect(() => {
    console.log('=== inside 2nd effect', user_type)
    if (MyProfile.user_type != "Guest") {
      console.log(' when MyProfile.user_type != "Guest')
      dispatch(getMyProfile());
      dispatch(getCartList());
      getReviews();
    }
  }, []);
  const getReviews = async () => {
    try {
      const res = await Api.get(urls.ORDER_REVIEW);
      setReviewsdata(res);
      if (res && res.status == 200) {
      } else {
      }
    } catch (error) {
    }
  };

  const onTabPress = (tab) => {
    // if (MyProfile.user_type != "Guest" && tab === 'MarketPlace') {
    //   navigation.navigate(routeName.MARKET_PRODUCT)
    // } else
     if(MyProfile.user_type != "Guest" && tab === 'HUB'){
      navigation.navigate(routeName.HUB_SERVICE_LIST)
    } 
    // else if(MyProfile.user_type != "Guest" && tab === "Events"){
    //   navigation.navigate('EventsList')
    // }
    else if(MyProfile.user_type != "Guest" && tab === "CartList"){
      navigation.navigate(routeName.CART_LIST)
    }  else {
      setGuestModal(true)
      // _exit_and_go_to_login(navigation, useDispatch)
    }
  }
  
  const onClose = () => {
    setGuestModal(false)
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
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <Image style={styles.Rectangle} source={globalPath.Rectangle} />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={()=> navigation.navigate(routeName.ACCOUNT_STACK)}
        >
          <Icon
            size={30}
            backgroundColor={colors.white}
            defaultSource={globalPath.ProfileIcon}
            borderRadius={wp(20)}
            // source={{ uri: urls.IMG_BASE_URL + MyProfile?.profile_img }}
            source={
              MyProfile.profile_img
                ? { uri: urls.IMG_BASE_URL + MyProfile.profile_img }
                : globalPath.ProfileIcon
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>onTabPress('CartList')} >
          <Icon size={30} source={globalPath.Cart} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: hp(3), marginBottom: wp(15) }}>
        <ResponsiveText size={5} color={colors.black}>
          Welcome{" "}
        </ResponsiveText>
        <ResponsiveText size={3.5} color={colors.grey1}>
          What do you need to do?
        </ResponsiveText>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1, marginTop: screenHeight * 0.03 }}>
        <TabsView
          onPress={() => navigation.navigate(routeName.BOOK_SERVICE)}
          source={globalPath.Service}
          title={"Book A Service"}
        />
          <TabsView
          onPress={() => navigation.navigate(routeName.MARKET_PRODUCT)}
          source={globalPath.MarketPlace}
            title={"Marketplace"}
          />
        <TabsView
          onPress={() =>  onTabPress('HUB')}
          source={globalPath.Hub}
          title={"HUB"}
        />
        <TabsView
          onPress={() => navigation.navigate('EventsList')}
          source={globalPath.Event}
          title={"Events"}
        />
         <TabsView
          onPress={() => navigation.navigate(routeName.MALL_SCREEN)}
          source={globalPath.mall}
          title={"Mall"}
        />
        <TabsView
          onPress={() => navigation.navigate(routeName.BACK_TO_SCHOOL)}
          source={globalPath.backtoschool}
          title={"Back to School"}
        />
      </View>
      <Dots style={{ marginBottom: hp(2) }} />
      {Reviewsdata.length > 0 ? (
        <View style={styles.reviewContainer}>
          <Icon source={globalPath.Rectangle} size={30} />
          <View style={{ width: wp(50), marginHorizontal: wp(6) }}>
            <ReviewsSlider data={Reviewsdata} />
          </View>
          <Icon source={globalPath.ForwardArrow} />
        </View>
      ) : null}
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

export default Home;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(5) },
  header: { flexDirection: "row", justifyContent: "space-between" },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:colors.grey,
    height: hp(8),
    shadowColor: "#EBE7E5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  Rectangle: {
    height: wp(150),
    width: wp(160),
    top: wp(-83),
    left: wp(-40),
    position: "absolute",
    transform: [{rotate: '8deg'}],

    // resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
