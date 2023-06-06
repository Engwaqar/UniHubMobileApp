import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";

const BookTabsView = ({ title, source, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}
                style={styles.IconStyle}>
                <ResponsiveText margin={[0, 0, 0, 0]} size={4}  color={colors.black} >{title}</ResponsiveText>
                <Icon
                margin={[0, 0, 0, 10]}
                    size={20}
                    source={globalPath.ForwardArrow}
                    tintColor={colors.black}
                />
            </TouchableOpacity>
        </View>
    );
};

export default BookTabsView;

const styles = StyleSheet.create({
    container: {
        marginTop:hp(2),
        width: wp(45),
        height: hp(15),
        alignItems: "center",
        justifyContent: 'center',
        alignSelf:'center'   
    },
    IconStyle: {
        flexDirection: 'row',
        backgroundColor: colors.lightgreen,
        width: wp(80),
        height: hp(15),
        borderRadius: wp(5),
        justifyContent: "center",
        alignItems: "center",
    },
});
