import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ResponsiveText from "../../components/RnText";
import { hp, screenHeight, screenWidth, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
// import All_header from "../../constants/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/user.actions";
// import Loader from "../../components/loader";

import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { fee } from "../../constants/mock";
import { routeName } from "../../constants/routeName";
import AsyncStorage from "@react-native-community/async-storage";
import RecordNotFound from "../../components/RecordnotFound";
import ChatHeader from "../../components/ChatHeader";
import MainHeader from "../../components/MainHeader";
import Input from "../../components/Input";
import database from '@react-native-firebase/database';
import { _encode } from "../../constants/Index";
import { StackActions } from "@react-navigation/native";
import moment from "moment";
import Loader from "../../components/Loader";
import Modal from "react-native-modal";
import Fonts from "../../helpers/Fonts";

const Messages = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const MyProfile = useSelector(state => state.userReducers.getMyProfile.data);
  const [guestModal, setGuestModal] = useState(false);

  console.log(' ====== MyProfile =====', MyProfile.email)
  const [UserChats, setUserChats] = useState([])
  const [loadingUserConnections, setLoadingUserConnections] = useState(true)

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (MyProfile.user_type != "Guest") {
        loadUserChats();
        setLoadingUserConnections(true)
        setTimeout(() => {
          setLoadingUserConnections(false)
        }, 500);
      }else{
        if(MyProfile.user_type === "Guest"){
          setGuestModal(true)
        }
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  
  const loadUserChats = async () => {
    console.log('==== inside load user chats =======')
    setUserChats([])
    // setLoadingChats(true)
    await database().ref('chatlist/' + _encode(MyProfile.email))
      .on('child_added', snapshot => {
        console.log('snapshot.val()', snapshot.val());
        let item1 = snapshot.val();
        database()
          .ref('users/' + item1.id)
          .once('value', snapshot => {
            let new_ob = snapshot.val();
            let userChats = [...UserChats, {
              ...item1,
              name: new_ob.name,
              email: new_ob.email,
              avatar: new_ob.avatar,
            }];
            let dd = userChats.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0));
            console.log('============= user chats =============', dd)
            setUserChats(dd)
            // setLoadingChats(false)
          });
      });
    // setLoadingChats(false)
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

  const renderView = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate(routeName.CHATBOX, { to: item.email, name: item.name, profilePicture: MyProfile  })}
      >
        <Icon
          borderRadius={30}
          size={50}
          resizeMode={"cover"}
          source={globalPath.ProfileIcon}
        />
        <View style={{ flex: 1, margin: 5, paddingHorizontal: 10 }}>
          <ResponsiveText size={3.8} weight={"bold"} color={colors.black}>
            {item.name}
          </ResponsiveText>
          <ResponsiveText numberOfLines={1} size={2.5} color={colors.grey1}>
            {item.text}
          </ResponsiveText>
        </View>
        <View>
          <ResponsiveText size={2.3} color={colors.grey1}>
          {moment(item.createdAt).format('hh:mm a')}
          </ResponsiveText>
          {/* {item.messages ?
                        <View style={{ height: wp(5), width: wp(5), backgroundColor: colors.green, borderRadius: 10, alignItems: 'center', marginLeft: wp(4) }}>
                            <ResponsiveText textAlign={'center'} size={3} color={colors.white}>{item.messages}</ResponsiveText>
                        </View>

                        : undefined} */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            size={25}
            margin={[10, wp(3), 0, 0]}
            tintColor={colors.white}
            source={globalPath.backarrow}
          />
        </TouchableOpacity>
        {/* {UserChats.length > 0 ?  */}
        <Input
          style={{ width: wp(80), borderRadius: wp(5), height: hp(5) }}
          placeholder="Search..."
          searchBox
        />
        {/* : <View style={{ width: wp(80), borderRadius: wp(5)}}  />
        } */}
      </View>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {UserChats.length > 0 && <View style={{ margin: wp(5) }}>
          <ResponsiveText color={colors.black} weight={"bold"} size={6}>
            {"Messages"}
          </ResponsiveText>
          {/* <ResponsiveText color={colors.grey1} size={2.5}>
            You have 2 new messages
          </ResponsiveText> */}
        </View>}
        <ScrollView showsVerticalScrollIndicator={false}>
          {UserChats.length > 0 ? (
            UserChats.map((item, index) => renderView(item, index))
          ) : (
           !loadingUserConnections && 
           <RecordNotFound 
              verbiage = {"Looks like you haven't made any connection yet"}
              paddingTop = { 0.32 * screenHeight }
              marginTop = {0}
           />
          )}
        </ScrollView>

      </View>
        { loadingUserConnections && <Loader />}
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
export default Messages;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    backgroundColor: colors.primary,
    padding: wp(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  badge: {
    backgroundColor: colors.green3,
    padding: 3,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderColor: colors.green4,
    borderWidth: 0.4,
  },
  cardContainer: {
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4),
    backgroundColor: colors.background,
    shadowColor: colors.grey1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
