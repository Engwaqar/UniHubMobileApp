import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import SmallButton from "../../components/SmallButton";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import { getSellerProducts } from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import BookTabsView from "../Home/BookTabsView";
import { globalPath } from "../../constants/globalPath";

const BookService = ({ navigation }) => {
    const dispatch = useDispatch();
    const sellerProducts = useSelector(
        (state) => state.userReducers.sellerProducts?.data
    );
    console.log('sellerProducts', sellerProducts)
    useEffect(() => {
        dispatch(getSellerProducts());
    }, []);
    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <MainHeader navigation={navigation} title={"Book a Service"} />
            <View style={{ marginTop: hp(3), marginBottom: hp(4), marginHorizontal:wp(10) }}>
                <Dots style={{ marginVertical: hp(3) }} />
                <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
                    Services{" "}
                </ResponsiveText>
                <ResponsiveText size={3.5} color={colors.grey1}>
                    Checkout our products provided by one expert vendors and select the
                    needed one.
                </ResponsiveText>
                <BookTabsView
                    onPress={() => navigation.navigate(routeName.ServiceProvider)}
                    title={"Book A cleaner"} />
                    <BookTabsView
                    onPress={() => navigation.navigate(routeName.BOOK_STROAGE)}
                    title={"Book A Storage"} />
                    <BookTabsView
                    onPress={() => navigation.navigate(routeName.BOOK_MOVE_OUT)}
                    title={"Book Move Out"} />
            </View>
        </SafeAreaView>
    );
};

export default BookService;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    box: { width: wp(15), alignItems: "center", paddingVertical: hp(2) },
});

