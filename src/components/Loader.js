import React from "react";
import { View } from "react-native";
import { BarIndicator } from "react-native-indicators";
import { colors } from "../constants/colorsPallet";
import { hp } from "../helpers/Responsiveness";
export default function Loader(props) {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(65, 65, 65, 0.5)",
        height: hp(100),
      }}
    >
      <BarIndicator size={40} color={colors.primary} />
    </View>
  );
}
