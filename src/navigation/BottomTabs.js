import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../components/Icon";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { routeName } from "../constants/routeName";
import HomeStack from "./HomeStack";
import ChatStack from "../navigation/ChatStack";
import MarketplaceStack from "./MarketPlaceStack";
import AccountStack from "./AccountStack";
import EventStack from "./EventStack";
import Modal from "react-native-modal";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ResponsiveText from "../components/RnText";
import { hp, screenHeight, screenWidth, wp } from "../helpers/Responsiveness";
import { logoutUser } from "../redux/actions/user.actions";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Fonts from "../helpers/Fonts";
import SmallButton from "../components/SmallButton";
import AddStack from "./AddStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs(props) {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [guestModal, setGuestModal] = React.useState(false);
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );

  const [navi, setNavi] = React.useState(null);
  const styles = StyleSheet.create({
    textButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const dispatch = useDispatch();

  function TabScreen({ navigation }) {
    return (
      <View>
        <Text>Tab Screen</Text>
      </View>
    );
  }

  const onClose = () => {
    setGuestModal(false);
  };

  const onConfirm = async () => {
    let data = {};
    await AsyncStorage.clear();
    await props.navigation.dispatch(
      StackActions.replace(routeName.AUTH_STACK, { screen: routeName.LOGIN })
    );
    dispatch(logoutUser({ data }));
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onModalHide={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        animationOutTiming={500}
        backdropOpacity={0.76}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            <TouchableOpacity onPress={() => setModalVisible(false)}>
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
            <SmallButton
              btnStyle={{ height: hp(5), width: wp(45) }}
              title={"List a Service"}
              onPress={() => {
                navi.navigate(routeName.ADD_STACK, {
                  screen: routeName.SELL_HUB_SERVICE,
                });
                setModalVisible(false);
              }}
            />

            <SmallButton
              margin={[hp(2)]}
              btnStyle={{ height: hp(5), width: wp(45) }}
              title={"List an event"}
              onPress={() => {
                navi.navigate(routeName.ADD_STACK, {
                  screen: routeName.EVENT_SERVICE,
                });
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={guestModal}
        onModalHide={() => setGuestModal(false)}
        onBackdropPress={() => onClose()}
        animationOutTiming={500}
        backdropOpacity={0.76}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                  textAlign: "center",
                  color: colors.black,
                  fontWeight: "bold",
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#CFD5DE",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === routeName.HOME_STACK) {
              iconName = globalPath.home;
            } else if (route.name === routeName.CHAT_STACK) {
              iconName = globalPath.Chat;
            } else if (route.name === routeName.MARKETPLACE_STACK) {
              iconName = globalPath.BuyerTabIcon;
            } else if (route.name === routeName.ACCOUNT_STACK) {
              iconName = globalPath.user;
            } else if (route.name === routeName.EVENT_STACK) {
              iconName = globalPath.Event;
            } else if (route.name === routeName.ADD_STACK) {
              iconName = globalPath.plusU;
            }
            // You can return any component that you like here!
            return <Icon source={iconName} size={size} tintColor={color} />;
          },
        })}
      >
        <Tab.Screen
          name={routeName.HOME_STACK}
          component={HomeStack}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name={routeName.MARKETPLACE_STACK}
          component={MarketplaceStack}
          options={{ title: "Product" }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (MyProfile.user_type === "Guest") {
                e.preventDefault(); // prevent default behavior
                setGuestModal(true);
              }
            },
          })}
        />
        <Tab.Screen
          name={routeName.EVENT_STACK}
          component={EventStack}
          options={{ title: "Events" }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (MyProfile.user_type === "Guest") {
                e.preventDefault(); // prevent default behavior
                setGuestModal(true);
              }
            },
          })}
        />
        <Tab.Screen
          name={routeName.ADD_STACK}
          component={AddStack}
          options={{ title: "Add New" }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault(); // prevent default behavior
              // navigation.navigate('ModalStack', { screen: 'ModalScreen' });
              // console.log("plus click", navigation);
              setNavi(navigation);
              if (MyProfile.user_type != "Guest") {
                setModalVisible(true);
              } else if (MyProfile.user_type === "Guest") {
                setGuestModal(true);
              }
            },
          })}
        />
        <Tab.Screen
          name={routeName.CHAT_STACK}
          component={ChatStack}
          options={{ title: "Chat" }}
        />
        <Tab.Screen
          name={routeName.ACCOUNT_STACK}
          component={AccountStack}
          options={{ title: "Account" }}
        />
      </Tab.Navigator>
    </>
  );
}
