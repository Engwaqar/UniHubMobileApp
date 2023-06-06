import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { check } from "yargs";
import { hp } from "../helpers/Responsiveness";
// import Randomiser from '../screens/Home/BottomTabs/Randomiser/Randomiserrr'

export default function RadioButton(props) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.checked ? colors.white : undefined,
        borderRadius: 50,
        borderColor: props.checked ? colors.primary : colors.grey1,
        borderWidth: 2,
        height: 18,
        width: 18,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        alignItems:"center",
        alignSelf:'center',
        // marginVertical:hp(1)
      }}
      onPress={
        props.onPress
      }
    >
      {props.checked ? (
        <Icon source={globalPath.radioIcon} size={13} tintColor={colors.primary} />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
}