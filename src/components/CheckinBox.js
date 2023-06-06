import React, { version } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import moment from "moment";
import Icon from "./Icon";
const CheckinBox = (props) => {
  return (
    <TouchableOpacity
      disabled={!props.disabled ? props.disabled : true}
      style={styles.container1}
      onPress={props.onPress}
    >
      {props.source ? (
        <Icon
          size={30}
          tintColor={props.tintColor ? props.tintColor : colors.red}
          source={props.source}
        />
      ) : null}
      <ResponsiveText margin={[0,0,0,5]} color={props.titleColor} weight={"bold"} size={3.8}>
        {props.subTitle}
        {/* {moment(new Date(props.title)).format(" MMMM Do YYYY") } */}
      </ResponsiveText>
      {/* <View
        style={{
          width: 0,
          flexGrow: 1,
          // flex: 1,
        }}
      >
        <ResponsiveText weight={"bold"} size={3.8}>
          {" "}
          {props.subTitle}
        </ResponsiveText>
      </View> */}
    </TouchableOpacity>
  );
};
export { CheckinBox };
const styles = StyleSheet.create({
  container1: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    flexDirection: "row",
    height: hp(9),
    // width:wp(40),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: colors.white,
    // marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
