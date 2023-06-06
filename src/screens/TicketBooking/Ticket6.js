import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import Dots from "../../components/Dots";
const Ticket6 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Ticket Confirmed
          </ResponsiveText>
          <TouchableOpacity onPress={()=>navigation.navigate('QRCode')} >
            <ResponsiveText
              margin={[hp(3), 0, 0, 0]}
              weight={"bold"}
              size={3.5}
              color={colors.primary}
            >
              Generate Ticket QR Code
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket6;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
