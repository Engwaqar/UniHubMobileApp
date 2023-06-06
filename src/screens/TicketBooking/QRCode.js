import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colorsPallet";
import QRCode from "react-native-qrcode-svg";
import { wp } from "../../helpers/Responsiveness";

const QRCodeScreen = () => {
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <QRCode
        color={colors.white}
        backgroundColor={colors.grey6}
        size={wp(60)}
        value="Altaf is here"
      />
    </SafeAreaView>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.grey6,
    justifyContent: "center",
    alignItems: "center",
  },
});
