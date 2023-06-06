import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";

export default function AuthHeader(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp(5),
        marginTop: hp(5),
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon
          size={25}
          tintColor={colors.white}
          source={globalPath.backarrow}
        />
      </TouchableOpacity>

      <ResponsiveText color={colors.white} size={5}>
        {props.title}
      </ResponsiveText>
      <Icon size={25} tintColor={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({});
