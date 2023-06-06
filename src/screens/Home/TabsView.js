import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";

const TabsView = ({title,source,onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}
       style={styles.IconStyle}>
        <Icon
          size={30}
          source={source}
          tintColor={colors.black}
        />
      </TouchableOpacity>
      <ResponsiveText margin={[15,0,0,0]} color={colors.black} >{title}</ResponsiveText>
    </View>
  );
};

export default TabsView;

const styles = StyleSheet.create({
  container: {
    width: wp(42),
    height:hp(17),
    alignItems: "center",
    justifyContent:'center'
  },
  IconStyle: {
    backgroundColor: colors.lightgreen,
    width: wp(20),
    height: wp(20),
    borderRadius: wp(7),
    justifyContent: "center",
    alignItems: "center",
  },
});
