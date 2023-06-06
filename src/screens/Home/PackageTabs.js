import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import RadioButton from "../../components/RadioButton";

const PackageTabs = ({ title, source, onPress, price, isSelected }) => {
    return (
        <View
            style={styles.IconStyle}>
            <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} size={2.3} color={colors.black} >{title}</ResponsiveText>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 5 }} >
                <ResponsiveText margin={[0, 0, 0, 0]} size={2.5} color={colors.grey1} >{price}</ResponsiveText>
                <RadioButton onPress={onPress} checked={isSelected} />
            </View>
        </View>
    );
};

export default PackageTabs;

const styles = StyleSheet.create({
    container: {
        marginTop: hp(2),
        width: wp(45),
        height: hp(15),
        // alignItems: "center",
        justifyContent: 'center',
        // alignSelf:'center'   
    },
    IconStyle: {

        backgroundColor: colors.background,
        width: wp(25),
        height: hp(9),
        borderRadius: wp(3),
        padding: wp(3),
        borderColor: colors.primary,
        borderWidth: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
});
