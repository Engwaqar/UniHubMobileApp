import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import DropDown from "../../components/DropDown";
import { ScrollView } from "react-native-gesture-handler";
import { globalPath } from "../../constants/globalPath";
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
import { _toast } from "../../constants/Index";

const EditEvent = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [singleFile1, setSingleFile1] = useState(null);
  const [EventName, setEventtName] = useState("");
  const [EventDesc, setEventDesc] = useState("");
  const [Location, setLocation] = useState("");
  const [Pkgs, setPkgs] = useState([]);

  const [ShowDate, setShowDate] = useState(false);
  const [ShowTime, setShowTime] = useState(false);
  const [errorString, setErrorString] = useState("");

  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    getEventDetail();
  }, []);
  useEffect(() => {
  }, [rendering]);
  const getEventDetail = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.EVENTS + "/" + item.id);
      console.log("res", res);
      if (res && res.status == 200) {
        setEventtName(res.data.title);
        setEventDesc(res.data.descreption);
        setLocation(res.data.address);
        setEventtName(res.data.title);
        setPkgs(res.data.prices);
        setDate(res.data.date_time)
        setTime(res.data.date_time)

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const deleteEvent = async () => {
    try {
      setLoading(true);
      const res = await Api.delete(urls.EVENTS + "/" + item.id);
      console.log("res", res);
      if (res && res.status == 200) {
        dispatch(getAllEvents());
        _toast(res.message);
        navigation.goBack();
        setLoading(false);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const EventActivate = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.ACTIVE_DEACTIVATE_EVENT + "/" + item.id);
      console.log("res", res);
      if (res && res.status == 200) {
        dispatch(getAllEvents());
        navigation.goBack();
        _toast(res.message);
        setLoading(false);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
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
    setTime(Time);
    console.log("selectedTime", selectedTime);
  };
  const checkPkgs = () => {
    return Pkgs.some((v) => v.title == "" || v.price == "");
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
    } else if (checkPkgs()) {
      setErrorString("All packages must be filled");
      return false;
    } 
    const formdata = new FormData();
    formdata.append("title", EventName);
    formdata.append("date_time", moment(date).format('YYYY-MM-DD')+' '+moment(time).format('hh:mm:ss'));
    formdata.append("lat", "72.232332");
    formdata.append("lng", "46.23323");
    formdata.append("address", Location);
    formdata.append("descreption", EventDesc);
    formdata.append(
      "packages",
      JSON.stringify({
        prices: Pkgs,
      })
    );
    formdata.append(
      "image",
      singleFile1 != null
        ? {
            uri: singleFile1.path,
            type: "image/jpeg",
            name: 'name',
          }
        : null
    );
// console.log('formData', formdata)
    try {
      setLoading(true);
      const res = await Api.put(urls.ADD_EVENT+'/'+item.id, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        _toast(res.message);
        dispatch(getAllEvents());
        navigation.goBack()
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
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

const UpdatePkgs=(text,index,type)=>{
  if (type=='name') {
    Pkgs[index].title=text
  } else {
    Pkgs[index].price=text
    
  }
    setPkgs(Pkgs)
    setRendering(!rendering)
    console.log('Pkgs', Pkgs)
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
            Edit Event
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
        {Pkgs.map((item, index) => {
          return (
            <>
              <ResponsiveText
                margin={[20, 0, 0, 20]}
                size={3.3}
                weight={"bold"}
                color={colors.black}
              >
                Package {index + 1}
              </ResponsiveText>
              <View style={{ marginTop: 10 }}>
                <InputText
                  Text={"Package Name"}
                  value={item.title}
                  onChnageText={(text) => UpdatePkgs(text,index,'name')}
                />
              </View>
              <View style={{ marginTop: 25 }}>
                <InputText
                  Text={"Price"}
                  value={item.price.toString()}
                  keyboardType={"numeric"}
                onChnageText={(text) =>
                  UpdatePkgs(text.replace(/[^0-9]/g, ""), index, "price")
                }
                />
              </View>
            </>
          );
        })}

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
        <TouchableOpacity>
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
              {singleFile1 != null ? singleFile1.size+"."+singleFile1.mime : "None"}
            </ResponsiveText>
          </View>
        </TouchableOpacity>
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
        <View style={{ alignItems: "center", marginTop: hp(3) }}>
          <TouchableOpacity onPress={() => deleteEvent()}>
            <ResponsiveText margin={[0, 0, 0, 0]} size={3.3} color={colors.red}>
              Delete Event
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={item.status_id == 2}
            onPress={() => EventActivate()}
          >
            <ResponsiveText
              margin={[hp(1.5), 0, 0, 0]}
              size={3.3}
              color={colors.grey1}
            >
              Deactivate Event
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={item.status_id == 1}
            onPress={() => EventActivate()}
          >
            <ResponsiveText
              margin={[hp(1.5), 0, 0, 0]}
              size={3.3}
              color={colors.primary}
            >
              Activate Event
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEvent;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
