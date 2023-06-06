import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import ChatHeader from "../../components/ChatHeader";
import ChatInput from "../../components/ChatInput";
import ImagePicker from "react-native-image-crop-picker";
import { useFocusEffect } from "@react-navigation/native";
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import moment from 'moment';
import { _get_chat_id, _encode, _permissions, _toast } from '../../constants/Index'
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";

const ChatInbox = ({ navigation, route }) => {
  const MyProfile = useSelector(state => state.userReducers.getMyProfile.data);
  const scrollViewRef = useRef();

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingChat, setLoadingChat] = useState(true);
  const [file, setFile] = useState("");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('==== route.params =====', MyProfile.email, route)
      loadChat()
      setTimeout(() => {
        setLoadingChat(false)
      }, 500);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const loadChat = () => {
    let from = _encode(MyProfile.email)
    let to = _encode(route.params.to)
    firebase.database().ref('one_to_messages/' + _get_chat_id(from, to)).on('value', function (snap) {
      let temp = []
      snap.forEach(function (item) {
        var itemVal = item.val();
        temp.push(itemVal);
      });
      console.log('==== collection =====', temp)
      setChat(temp)
    });
    setLoadingChat(false)
  };

  const send = () => {
    let from = _encode(MyProfile.email);
    let to = _encode(route.params.to);
    let id = _get_chat_id(from, to);
    let msg = message;
    setMessage('')
    if (msg != '') {
      // this.senNot();
      database()
        .ref('one_to_messages/' + id)
        .push({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          text: msg,
          type: 'text',
          sender: from,
          receiver: to,
        })
        .then(() => 
        console.log('added')
        // loadChat()
        );

      database().ref('chatlist').child(from).child(to).set({
        id: to,
        text: msg,
        type: 'text',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });

      database().ref('chatlist').child(to).child(from).set({
        id: from,
        text: msg,
        type: 'text',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }

  };

  const pickImage = async () => {
    console.log('==== called ====')
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

  const openCamera = () => {
    try{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log('===== image from camera ====', image);
    });
  } catch (error) {
    console.log('==== error while take image from cam ====', error)
  }
  };

  const takephotofromgallary = () => {
    try {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log('===== image from gallary ====', image);
      uploadImage(image)
    });
  } catch (error) {
    console.log('==== error while take image from gallery ====', error)
  }
  };

  const uploadImage = async (image) => {
    try {
      setLoadingChat(true)
      const formdata = new FormData();
      const uriParts = image.path.split('/');
      const name = uriParts[uriParts.length - 1];
      console.log('==== image name ===', name)

      formdata.append('img', {
        uri: image.path,
        type: "image/jpeg",
        name: 'name',
      });

      console.log('===== form data ===== ', 'uri:', image.path, "type:", image.mime, 'name:', name)

      const res = await Api.post(urls.UPLOAD_IMAGE, formdata);
      console.log('==== res upload image =====', res)

      if (res.status == 200) {
        sendImage(res.path)
      } else {
        setLoadingChat(false)
        Alert.alert('Error while upload image', res.message)
        console.log('==== error ==== ', res.message)
      }
    } catch (error) {
      setLoadingChat(false)
      console.log('==== error while upload image to server ====', error)
    }
  }


  const sendImage = (image_path) => {
    let from = _encode(MyProfile.email);
    let to = _encode(route.params.to);
    let id = _get_chat_id(from, to);
    setMessage('')
    // this.senImageNot();
    database()
      .ref('one_to_messages/' + id)
      .push({
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        text: 'image',
        type: 'image',
        path: urls.IMG_BASE_URL + image_path,
        sender: from,
        receiver: to,
      })
      .then(() =>
      console.log('added')
      // loadChat()
      );
    database().ref('chatlist').child(from).child(to).set({
      id: to,
      path: urls.IMG_BASE_URL + image_path,
      text: 'image',
      type: 'image',
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
    database().ref('chatlist').child(to).child(from).set({
      id: from,
      text: 'image',
      type: 'image',
      path: urls.IMG_BASE_URL + image_path,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });

  };

  const senderView = (item) => {
    return (
      <View style={{ alignItems: "flex-end", marginTop: 10 }}>
        {
          item.type == 'text' ?
            <>
              <View
                style={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  backgroundColor: colors.primary,
                  padding: 10,
                  maxWidth: wp(70),
                }}
              >
                <ResponsiveText color={colors.white}>{item.text}</ResponsiveText>
              </View>
              <ResponsiveText size={2} margin={[5, 0, 0, 0]} color={colors.grey1}>
                {moment(item.createdAt).format('hh:mm a')}
              </ResponsiveText>
            </>
            :
            <>
              <View
                style={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  // padding: 10,
                }}>
                <Image
                  style={{ height: hp(20), width: wp(40), }}
                  source={{
                    uri: item.path //'https://st2.depositphotos.com/1518767/11369/i/600/depositphotos_113690042-stock-photo-man-giving-pretty-girlfriend-piggy.jpg',
                  }}
                />
              </View>
              <ResponsiveText size={2} margin={[5, 0, 0, 0]} color={colors.grey1}>
                {moment(item.createdAt).format('hh:mm a')}
              </ResponsiveText>
            </>
        }
      </View>
    );
  };

  const reciverView = (item) => {
    return (
      <View style={{ alignItems: "flex-start", marginTop: 10 }}>
    {
          item.type == 'text' ?
            <>
              <View
                style={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  backgroundColor: colors.primary,
                  padding: 10,
                  maxWidth: wp(70),
                }}
              >
                <ResponsiveText color={colors.white}>{item.text}</ResponsiveText>
              </View>
              <ResponsiveText size={2} margin={[5, 0, 0, 0]} color={colors.grey1}>
                {moment(item.createdAt).format('hh:mm a')}
              </ResponsiveText>
            </>
            :
            <>
              <View
                style={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  // padding: 10,
                }}>
                <Image
                  style={{ height: hp(20), width: wp(40), }}
                  source={{
                    uri: item.path //'https://st2.depositphotos.com/1518767/11369/i/600/depositphotos_113690042-stock-photo-man-giving-pretty-girlfriend-piggy.jpg',
                  }}
                />
              </View>
              <ResponsiveText size={2} margin={[5, 0, 0, 0]} color={colors.grey1}>
                {moment(item.createdAt).format('hh:mm a')}
              </ResponsiveText>
            </>
        }
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ChatHeader
        navigation={navigation}
        title={route.params.name}
      // status={route.params.to}
      />
      <KeyboardAvoidingView
        style={styles.footer} // adjust the value here if you need more padding
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: false })
          }
        >
          {chat.map((item) => {
            if (item.sender == _encode(MyProfile.email)) {
              return senderView(item);
            } else {
              return reciverView(item);
            }
          })}

        </ScrollView>
        <ChatInput
          onChangeText={(text) => setMessage(text)}
          value={message}
          Send={() => send()}
          pickImage={() => pickImage()}
        />
      </KeyboardAvoidingView>
      {loadingChat && <Loader />}
    </SafeAreaView>
  );
}

export default ChatInbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  footer: {
    flex: 2,
    backgroundColor: colors.grey,
    paddingTop: hp(2),
    paddingBottom: wp(1),
    // paddingHorizontal: 30,
    justifyContent: "space-between",
  },
  chatContainer: {
    paddingHorizontal: wp(5),
    // marginBottom:wp(15),
    marginBottom: wp(2),
  },
});
