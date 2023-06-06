import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colorsPallet";

const Card = (props) => {
  return (
    <View style={[styles.container, { flexDirection: props.flexDirection }]}>
      {props.children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    padding: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
  },
});
