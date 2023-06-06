import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ResponsiveText from "../../components/RnText";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import { wp } from "../../helpers/Responsiveness";
import moment from "moment";

const SalesCard = ({title,date,type,price,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.imgContainer,{backgroundColor:type?colors.green10:colors.lightRed}]}>
        <Icon size={20} tintColor={type?colors.green9: colors.red} source={globalPath.Wallet} />
      </View>
      <View style={{ flex: 1, marginHorizontal: wp(3) }}>
        <ResponsiveText size={3}>{title}</ResponsiveText>
        <ResponsiveText margin={[5, 0, 0, 0]} size={2.6} color={colors.grey1}>
          {moment(date).format('DD MMM YYYY')}
        </ResponsiveText>
      </View>
      <ResponsiveText>{price}</ResponsiveText>
    </TouchableOpacity>
  );
};

export default SalesCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    padding: wp(2),
    borderRadius: 8,
    marginTop:3
  },
  imgContainer: {
    backgroundColor: colors.red4,
    height: wp(8),
    width: wp(8),
    justifyContent: "center",
    alignItems: "center",
    borderRadius:15
  },
});
