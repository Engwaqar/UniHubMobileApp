import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";

const PaymentCard = ({source,active,title,onPress,Number}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor:active?colors.white:colors.white}]}>
      <Icon size={30} source={source?source:globalPath.VisaCard} />
      <View style={{ padding: 2,flex:1,marginLeft:8 }}>
        <ResponsiveText color={colors.black} >{title}</ResponsiveText>
        <ResponsiveText size={3} color={colors.grey1}margin={[8,0,0,0]} >*****{Number}</ResponsiveText>
      </View>
      <View style={{
            backgroundColor:active ? colors.primary: undefined, 
            borderRadius:50, 
            borderColor:active ? colors.grey1:colors.primary, 
            borderWidth:2 , height:20, width:20,alignItems:'center', justifyContent:'center',padding:5,marginHorizontal:5
        
        }}
           >
                {active ? <Icon source={globalPath.radioIcon} size={10} tintColor={colors.primary}/> :<View/>}
            </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: colors.PaymentColor,
    padding: 10,
    borderRadius: 10,
    alignItems:'center',
    margin:5,
    borderWidth:1,
    borderColor:colors.primary
  },
});