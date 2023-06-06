import React from "react";
import { View } from "react-native";
import { globalPath } from "../constants/globalPath";
import { hp, screenHeight, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import ResponsiveText from "./RnText";

export default function RecordNotFound(props) {
  return (
    <View
      style={{
        width: wp(80),
        alignItems: "center",
        justifyContent: 'center',
        alignSelf:'center',
        paddingTop: props.paddingTop ? props.paddingTop : 0,
        marginTop: props.marginTop ? props.marginTop : hp(5)
      }}
    >
      <Icon size={hp(10)} source={globalPath.RecordNotFound} />
      <ResponsiveText margin={[10, 0, 0, 0]} textAlign={"center"}>
       {props.verbiage? props.verbiage : "Record not found"}
      </ResponsiveText>
    </View>
  );
}
