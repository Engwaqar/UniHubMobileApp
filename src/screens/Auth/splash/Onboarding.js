import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import RnButton from "../../../components/RnButton";
import { globalPath } from "../../../constants/globalPath";
import { colors } from "../../../constants/colorsPallet";
import { hp, wp } from "../../../helpers/Responsiveness";
import ResponsiveText from "../../../components/RnText";
import Fonts from "../../../helpers/Fonts";
import { routeName } from "../../../constants/routeName";
import Dots from "../../../components/Dots";
const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.Rectangle} source={globalPath.Rectangle} >
      </ImageBackground>
        <Image style={styles.logo} source={globalPath.logo} />
      <View
        style={{ marginHorizontal: wp(8), justifyContent: "flex-end", flex: 1,marginBottom:hp(5) }}
      >
      <Dots style={{marginBottom:hp(1)}} />

        <ResponsiveText
          margin={[20, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          // weight={'bold'}
          size={6}
          color={colors.black}
        >
          Welcome to {"\n"}UNIHUB Store
        </ResponsiveText>
        <ResponsiveText
          margin={[10, 0, 0, 0]}
          fontFamily={Fonts.Bold}
          size={3}
          color={colors.grey1}
        >
          Solve the problems of your hub, creating special services and
          marketplace
        </ResponsiveText>
        <RnButton
          margin={[50, 0, 30, 0]}
          title={"Begin"}
          onPress={() => navigation.navigate(routeName.LOGIN)}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Rectangle: {
    height: hp(90),
    width: wp(130),
    top: hp(-25),
    left: wp(-5),
    position: "absolute",
    // resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
    justifyContent:'center',
  },
  logo: {
    height: hp(20), width: wp(40), resizeMode: 'contain',alignSelf:'center',marginTop:hp(12)
  }
});
