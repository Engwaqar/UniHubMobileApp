import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";

export default function ChatHeader(props) {

  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: wp(4) }}>
      <TouchableOpacity
          onPress={() => props.navigation.goBack()}
      >
        <Icon  size={25}
        tintColor={colors.white}
          source={globalPath.backarrow}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Icon
          style={{ marginTop: 4 }}
          borderRadius={30}
          size={50}
          resizeMode={"contain"}
          source={globalPath.ProfileIcon}
        />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <ResponsiveText color={colors.white} size={4.8}>
            {props.title}
          </ResponsiveText>
          {/* <ResponsiveText color={colors.black} size={2.7}>
            {'props.status'}
          </ResponsiveText> */}
        </View>
      </View>
      {/* <TouchableOpacity style={styles.btnBack}>
        <Icon size={15} source={globalPath.video} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnBack}>
        <Icon size={15} source={globalPath.audio} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({

    btnBack:{
        backgroundColor:colors.green5,padding:12,borderRadius:45,marginRight:5
    }
});
