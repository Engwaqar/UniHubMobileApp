import { Platform, ToastAndroid, PermissionsAndroid, Alert } from "react-native";
import { StackActions } from "@react-navigation/native";
import { logoutUser } from "../redux/actions/user.actions";
import { routeName } from "../constants/routeName";
import AsyncStorage from "@react-native-community/async-storage";

const _permissions = async () => {
    if (Platform.OS == 'ios') {
        return true;
    }
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      console.log('=== grandted ==== ', granted)
}

function _toast(string) {
    if (Platform.OS == 'ios') {
        alert(string);
    } else {
        ToastAndroid.showWithGravity(
            string,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  function _encode(value) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = value;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
        str?.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str?.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.');
        }

        block = block << 8 | charCode;
    }

    return output;
}

function _get_chat_id(from_user, to_user) {
   
    let chat_id = (from_user < to_user) ? from_user + '_' + to_user : to_user + '_' + from_user;
    console.log('====== chat_id ==== ', chat_id)
    return chat_id;
}

function _exit_and_go_to_login(navigation, dispatch) {
    Alert.alert("Login", "Do you want to login?", [
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
            await navigation.dispatch(StackActions.replace(routeName.AUTH_STACK, { screen: routeName.LOGIN }));
            dispatch(
              logoutUser({ data })
            );
          },
        },
      ]);
}

module.exports={
    _toast:_toast,
    isImage:isImage,
    _encode:_encode,
    _get_chat_id:_get_chat_id,
    _permissions:_permissions,
    _exit_and_go_to_login: _exit_and_go_to_login,
}
