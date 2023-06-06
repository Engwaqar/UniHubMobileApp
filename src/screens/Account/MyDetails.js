import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import InputText from "../../components/InputText";
import { hp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../redux/actions/user.actions";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { _toast } from "../../constants/Index";

const MyDetails =  React.forwardRef((props,ref) => {
  const {setLoading}=props
  const dispatch = useDispatch();
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const refreshing = useSelector(
    (state) => state.userReducers.getMyProfile.refreshing
  );
  console.log("MyProfile", MyProfile);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  // const [loading, setLoading] = useState(false);
  // React.useEffect(() => {
  //   ref.current = Submit
  // }, [])
  React.useImperativeHandle(ref, () => ({ Submit }));
  useEffect(() => {
    setName(MyProfile.name);
    setAddress(MyProfile.address);
    setPhone(MyProfile.phone);
  }, []);
  const Submit = async (imgFile) => {
    console.log('imgFile', imgFile)
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("address", address);
    formdata.append("phone", phone);
    formdata.append(
      "profile_img",
      imgFile!=undefined
        ? {
            uri: imgFile.path,
            type: "image/jpeg",
            name: "name",
          }
        : null
    );
    console.log("formdata", formdata);
    try {
      setLoading(true);
      const res = await Api.post(urls.UPDATE_PROFILE, formdata);
      // console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getMyProfile());
        _toast(res.message);
        // navigation.goBack();
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  return (
    <KeyboardAvoidingView>
    <View>
      <ResponsiveText color={colors.primary} size={4} weight="bold">
        My Details
      </ResponsiveText>
      <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
        View and edit your personal info below.
      </ResponsiveText>
      <ResponsiveText margin={[5, 0, 5, 0]} color={colors.black} size={2.8}>
        Login email : {MyProfile.email}
      </ResponsiveText>
      <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
        Your Login email can’t be changed
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
        value={MyProfile.email}
        editable={false}
      />
      <InputText
        margin={[hp(3), 0, 0, 0]}
        marginHorizontal={1}
        Text={"Address"}
        value={address}
        onChnageText={(text) => setAddress(text)}
      />
      <InputText
        keyboardType='numeric'
        margin={[hp(3), 0, 0, 0]}
        marginHorizontal={1}
        Text={"Phone"}
        value={phone}
        onChnageText={(text) => setPhone(text)}
      />
      <RnButton
        margin={[hp(3), 0, hp(3), 0]}
        title={"Update Info"}
        onPress={()=>Submit(undefined)}
      />
      {/* <ResponsiveText textAlign={"center"} color={colors.grey1} size={4}>
        Discard
      </ResponsiveText> */}
    </View>
    </KeyboardAvoidingView>
  );
});

export default MyDetails;

const styles = StyleSheet.create({});
