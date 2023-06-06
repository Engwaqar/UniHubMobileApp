import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ResponsiveText from "./RnText";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";

const RoundButton = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <ResponsiveText size={10} color={colors.white}>
        +
      </ResponsiveText>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue1,
    width: wp(16),
    height: wp(16),
    bottom: hp(15),
    right: wp(8),
    position: "absolute",
    alignSelf: "flex-end",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 5,
    shadowColor: colors.blue1,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
  },
});
