import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Responsiveness, { hp, wp } from "../helpers/Responsiveness";
import { colors } from "../constants/colorsPallet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
export default function HomeCards(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 5,
      }}
    >
      <View style={styles.Boxes}>
        <Icon source={props.source} style={styles.boxImages} />
        <ResponsiveText
          margin={[5, 0, 0, 0]}
          textAlign={"center"}
          color={colors.black}
        >
          {props.title}
        </ResponsiveText>

        {props.count ? (
          <ResponsiveText textAlign={"center"} color={colors.green}>
            ({props.count})
          </ResponsiveText>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  footer: {
    flex: 1.6,
    backgroundColor: colors.white,
  },
  Boxes: {
    // height: hp(22),
    paddingVertical:wp(5),
    width: wp(45),
    backgroundColor: colors.white,
    elevation: 4,
    justifyContent: "center",
    borderRadius: 10,
    shadowColor:colors.black,
    
  },
  boxImages: {
    height: wp(20),
    width: wp(20),
    alignSelf: "center",
  },
  boxText: {
    fontSize: hp(1.7),
    alignSelf: "center",
    marginTop: 5,
  },
  
});
