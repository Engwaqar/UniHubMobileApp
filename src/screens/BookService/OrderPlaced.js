import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import DropDown from "../../components/DropDown";
import { ScrollView } from "react-native-gesture-handler";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import RnButton from "../../components/RnButton";
import ImagePicker from "react-native-image-crop-picker";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { useDispatch } from "react-redux";
import { routeName } from "../../constants/routeName";
const OrderPlaced = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <ScrollView>
                {/* <MainHeader navigation={navigation} title={"Order Placed"} /> */}
                <View
                    style={{
                        marginTop: hp(3),
                        marginBottom: hp(4),
                        marginHorizontal: wp(5),
                    }}
                >
                    <Dots style={{ marginVertical: hp(3) }} />
                    <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
                        Order Placed{" "}
                    </ResponsiveText>
                </View>
                <View style={{ height: hp(10) }}></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderPlaced;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    box: { height: hp(20), marginTop: 15 },
});

