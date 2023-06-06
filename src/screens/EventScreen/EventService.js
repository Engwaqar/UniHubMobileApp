import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, screenHeight, screenWidth, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import DropDown from "../../components/DropDown";
import { ScrollView } from "react-native-gesture-handler";
import { globalPath } from "../../constants/globalPath";
import { _toast } from "../../constants/Index";
import Loader from "../../components/Loader";

import Icon from "../../components/Icon";
import RnButton from "../../components/RnButton";
import ImagePicker from "react-native-image-crop-picker";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { useDispatch } from "react-redux";
import DateTimePickr from "../../components/DateTimePickr";
import { getAllEvents } from "../../redux/actions/user.actions";
import moment from "moment";
import Modal from "react-native-modal";
import SmallButton from "../../components/SmallButton";

const EventService = ({ navigation }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [singleFile1, setSingleFile1] = useState(null);
  const [EventName, setEventtName] = useState("");
  const [EventDesc, setEventDesc] = useState("");
  const [SeatLimit, setSeatLimit] = useState(1);
  const [EachPerUser, setEachPerUser] = useState(1);
  const [IsAddEventModal, setIsAddEventModal] = useState(false);
  const [Pkgs, setPkgs] = useState([]);

  const [Package, SetPakage] = useState([
    { title: "", price: "" },
  ]);
  const [rendering, setRendering] = useState(false);

  const [Location, setLocation] = useState("");
  const [ShowDate, setShowDate] = useState(false);
  const [ShowTime, setShowTime] = useState(false);
  const [errorString, setErrorString] = useState("");

  const [loading, setLoading] = useState(false);
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setShowDate(false);
    setDate(currentDate);
    console.log("selectedDate", currentDate);
  };
  const onTimeChange = (event, selectedTime) => {
    const Time = selectedTime || time;
    // setShow(Platform.OS === 'ios');
    setShowTime(false);
    setTime(time);
    console.log("selectedTime", selectedTime);
  };

  const Submit = async () => {
    setErrorString("");
    if (EventName == "") {
      setErrorString("Event name is required!");
      return false;
    } else if (EventDesc == "") {
      setErrorString("Event description is required!");
      return false;
    } else if (Location == "") {
      setErrorString("Location is required!");
      return false;
    } else if (Pkgs.length < 1) {
      // setErrorString("All packages must be filled");
      setErrorString("Please add atleast 1 pakage");
      return false;
    } else if (SeatLimit <= 0 || EachPerUser <= 0) {
      // setErrorString("All packages must be filled");
      setErrorString("Total seats and Seats avail per user required!");
      return false;
    } else if (singleFile1 == null) {
      setErrorString("Image is required!");
      return false;
    }
    const formdata = new FormData();
    formdata.append("title", EventName);
    formdata.append(
      "date_time",
      moment(date).format("YYYY-MM-DD") + " " + moment(time).format("hh:mm:ss")
    );
    formdata.append("lat", "72.232332");
    formdata.append("lng", "46.23323");
    formdata.append("address", Location);
    formdata.append("descreption", EventDesc);
    formdata.append("seat_limit", SeatLimit);
    formdata.append("each_person_buying_capacity", EachPerUser);
    formdata.append("packages",JSON.stringify({ prices: Pkgs}));
    formdata.append(
      "image",
      singleFile1 != null
        ? {
          uri: singleFile1.path,
          type: "image/jpeg",
          name: "name",
        }
        : null
    );

    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_EVENT, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        _toast(res.message);
        dispatch(getAllEvents());
        navigation.goBack();
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setLoading(false);
      // setErrorString(error);
    }
  };

  const toggel = (file) => {
    Alert.alert("Profile Image", "change profile Image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "open Camera",
        onPress: async () => {
          openCamera(file);
        },
      },
      {
        text: "Select from gallary",
        onPress: async () => {
          takephotofromgallary(file);
        },
      },
    ]);
  };
  const takephotofromgallary = (setFile) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      setFile(image);
      console.log(image, "image working");
    });
  };

  const openCamera = (setFile) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      setFile(image);
      console.log(image, "image working");
    });
  };
  const UpdatePkgs = (text, type) => {
    if (type == "PakageName") {
      Package[0].title = text;
    } else {
      Package[0].price = text;
    }
    setRendering(!rendering);
  };
  const checkPkgs = () => {
    return Pkgs.some((v) => v.title == "" || v.price == "");
  };
  const addEvents = () => {
    SetPakage([{ title: "", price: "" }])
    setIsAddEventModal(true)
  }

  const AddEvents = async () => {
    if (Package.some((v) => v.title == "" || v.price == "")) {
      _toast('All fields required')
    } else {
      setIsAddEventModal(false)
      Pkgs.push(Package[0])
      SetPakage([{ title: "", price: "" }])
    }
  }

  const onClose = () => {
    setIsAddEventModal(false)
  }

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Advertise Events"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Post Event
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Sell your services and get the customers to get benefits of
            services.
          </ResponsiveText>
        </View>
        <InputText
          Text={"Event name"}
          value={EventName}
          onChnageText={(text) => setEventtName(text)}
        />
        <InputText
          Text={"Event Description"}
          style={styles.box}
          multiline
          value={EventDesc}
          onChnageText={(text) => setEventDesc(text)}
        />
        <DateTimePickr
          onPress={() => setShowDate(true)}
          visible={ShowDate}
          mode={"date"}
          title={"Event Date"}
          value={date}
          onChange={onDateChange}
        />
        <DateTimePickr
          onPress={() => setShowTime(true)}
          visible={ShowTime}
          mode={"time"}
          title={"Event Time"}
          value={time}
          onChange={onTimeChange}
        />
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Event Location"}
            value={Location}
            onChnageText={(text) => setLocation(text)}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Total Tickets"}
            value={SeatLimit}
            onChnageText={(text) => setSeatLimit(SeatLimit > 0 ? text.replace(/[^0-9]/g, "") : text.replace(/[^1-9]/g, ""))}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Seats Per User"}
            value={EachPerUser}
            onChnageText={(text) => setEachPerUser(EachPerUser > 0 ? text.replace(/[^0-9]/g, "") : text.replace(/[^1-9]/g, ""))}
          />
        </View>
        <View style={{
          flex: 1,
          marginTop: screenHeight * 0.02,
          justifyContent: 'flex-end',
          marginHorizontal: wp(5),
          flexDirection: 'row',
        }}>

          <ResponsiveText
            fontFamily="Bold"
            // color={colors.primary}
            color={colors.grey1}
          // onPress={() => SignInAsGuest()}
          >
            Create Package
          </ResponsiveText>
          <View style={{ marginHorizontal: 10 }} />
          <TouchableOpacity
            onPress={() => addEvents()}
          >
            <Icon
              margin={[0, 0, 0, 0]}
              size={22}
              source={globalPath.plusU}
              tintColor={colors.primary}
            />
          </TouchableOpacity>
        </View>
        {Pkgs.map((item, index) => (
          <ResponsiveText
            margin={[10, 0, 0, 20]}
            size={3.3}
            weight={"bold"}
            color={colors.black}
          >
            {item.title}
          </ResponsiveText>
        ))}
        <ResponsiveText
          margin={[10, 0, 0, 20]}
          size={3.3}
          weight={"bold"}
          color={colors.black}
        >
          Upload Image
        </ResponsiveText>
        <TouchableOpacity onPress={() => toggel(setSingleFile1)}>
          <View
            style={{
              // backgroundColor: colors.lighterGrey,
              alignItems: "center",
              paddingVertical: wp(5),
              marginHorizontal: wp(5),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.lighterGrey,
              marginTop: 10,
            }}
          >
            <Icon
              margin={[0, 0, 0, 0]}
              size={25}
              source={globalPath.Camera}
              tintColor={colors.grey1}
            ></Icon>
            <ResponsiveText size={3.3} color={colors.grey1}>
              Upload Event Image
            </ResponsiveText>
          </View>
        </TouchableOpacity>
        <ResponsiveText
          margin={[10, 0, 0, 20]}
          size={3.3}
          weight={"bold"}
          color={colors.black}
        >
          Upload Files
        </ResponsiveText>
        <View
          style={{
            // backgroundColor: colors.lighterGrey,

            paddingVertical: wp(5),
            marginHorizontal: wp(5),
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.lighterGrey,
            marginTop: 10,
          }}
        >
          <ResponsiveText
            margin={[0, 0, 0, 10]}
            size={3.3}
            color={colors.grey1}
          >
            {singleFile1 != null ? singleFile1.size + "." + singleFile1.mime : "None"}
          </ResponsiveText>
        </View>
        {errorString ? (
          <ResponsiveText margin={[wp(6)]} color={colors.red}>
            {errorString}
          </ResponsiveText>
        ) : null}
        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Post Service"}
          onPress={() => Submit()}
        />

        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : null}
      <Modal
        isVisible={IsAddEventModal}
        onModalHide={() => setIsAddEventModal(false)}
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
                }}
              >
                ✖
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                marginBottom: screenHeight * 0.0125,
                color: colors.black,
                fontWeight: 'bold'
              }}
            >
              Want to add more Packages
            </Text>
            <>
              <View style={{ marginTop: screenHeight * 0.010 }}>
                <InputText
                  Text={"Package Name"}
                  value={Package[0].title}
                  onChnageText={(text) => UpdatePkgs(text, 'PakageName')}
                />
              </View>

              <View style={{ marginTop: screenHeight * 0.025 }}>
                <InputText
                  Text={"Price"}
                  value={Package[0].price}
                  keyboardType={"numeric"}
                  onChnageText={(text) =>
                    UpdatePkgs(text.replace(/[^0-9]/g, ""), "price")
                  }
                />
              </View>
            </>
            <SmallButton
              btnStyle={{ height: hp(5), width: wp(45), marginVertical: screenHeight * 0.025 }}
              title={"Confrim"}
              onPress={() => {
                AddEvents()
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EventService;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
