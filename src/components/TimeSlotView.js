import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { hp } from "../helpers/Responsiveness";

const TimeSlotView = ({ active, title, onPress, Time }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors.lightGrey,borderWidth:active?1:0},
      ]}
    >
      <View style={{ padding: 2, flex: 1, marginLeft: 8 }}>
        <ResponsiveText size={3} color={ colors.grey1}>
          {title}
        </ResponsiveText>
        <ResponsiveText
          color={colors.black}
          margin={[5, 0, 0, 0]}
          size={3.3}
        >
          {Time}
        </ResponsiveText>
      </View>
      <View
        style={{
          backgroundColor: active ? colors.primary : undefined,
          borderRadius: 50,
          borderColor: active ? colors.primary : colors.grey1,
          borderWidth: 1,
          height: 20,
          width: 20,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          marginHorizontal: 5,
        }}
      >
        {active ? (
          <Icon
            source={globalPath.Tick}
            size={18}
          />
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TimeSlotView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: colors.PaymentColor,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
