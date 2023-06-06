import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "./Icon";
import { globalPath } from "../constants/globalPath";
import ResponsiveText from "./RnText";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";

const TabIcon = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : colors.white,
        justifyContent: "center",
        elevation: 10,
        shadowColor: colors.black,
        shadowOpacity: 0.1,
        alignItems: "center",
        // padding: 10,
        borderRadius: 10,
        width: wp(21.5),
        height: wp(23),
        margin: 2,
      }}
    >
      {props.source ? (
        <Icon size={45} source={props.source} />
      ) : (
        <View
          style={{
            backgroundColor: props.CircleColor
              ? props.CircleColor
              : colors.blue,
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
        >
          <ResponsiveText
            color={colors.white}
            size={4}
            weight={"bold"}
            textAlign={"center"}
            margin={[7, 0, 0, 0]}
          >
            {props.CircleText}
          </ResponsiveText>
        </View>
      )}
      <ResponsiveText
        weight={"bold"}
        size={props.titleSize ? props.titleSize : 2.5}
        color={props.titleColor ? props.titleColor : colors.black}
      >
        {props.title}
      </ResponsiveText>
    </TouchableOpacity>
  );
};

export default TabIcon;

const styles = StyleSheet.create({});
