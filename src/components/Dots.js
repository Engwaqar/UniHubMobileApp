import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colorsPallet";

const Dots = ({style}) => {
  return (
    <View style={[styles.container,style]}>
      <View style={styles.hole} />
      <View style={styles.hole} />
      <View style={[styles.hole,{width:15,backgroundColor:colors.primary}]} />

    </View>
  );
};

export default Dots;

const styles = StyleSheet.create({
    container:{flexDirection:'row'},
  hole: {
    height: 5,
    width: 5,
    backgroundColor: colors.lightgreen,
    margin:3,
    borderRadius:5
  },
});
