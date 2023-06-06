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
import { getAllHubServices } from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import moment from "moment";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/Loader";

const HubServiceList = ({ navigation }) => {
    const dispatch = useDispatch();
    const HubServices = useSelector((state) => state.userReducers.getAllHubServices?.data);
    const loading = useSelector((state) => state.userReducers.getAllHubServices?.refreshing);

    console.log('getAllHubServices', HubServices)
    useEffect(() => {
        dispatch(getAllHubServices());
    }, []);
    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <MainHeader navigation={navigation} title={"Advertise Hub Service"} />
            <View style={{ marginTop: hp(3), marginBottom: hp(4), marginLeft: 15 }}>
                <Dots style={{ marginVertical: hp(3) }} />
                <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
                    Your Hub Service{" "}
                </ResponsiveText>
                <ResponsiveText size={3.5} color={colors.grey1}>
                    Checkout our products provided by one expert vendors and select the
                    needed one.
                </ResponsiveText>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    borderBottomColor: colors.lighterGrey,
                }}
            >
                <ResponsiveText weight={"bold"} size={4} color={colors.black}>
                    Hub Service
                </ResponsiveText>
                <SmallButton
                    btnStyle={{ height: hp(4), width: wp(40) }}
                    // margin={[0, 0, 10, 0]}
                    title={"Add Hub Service"}
                    onPress={() => navigation.navigate(routeName.SELL_HUB_SERVICE)}
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderColor: colors.lighterGrey,
                    padding: 15,
                    marginTop: hp(1),
                }}
            >
                <ResponsiveText size={3.7} color={colors.black}>
                    Name
                </ResponsiveText>
                <ResponsiveText size={3.7} color={colors.black}>
                    Event Date
                </ResponsiveText>
                <ResponsiveText size={3.7} color={colors.black}>
                    Status
                </ResponsiveText>
                {/* <ResponsiveText size={3.7} color={colors.black}>
          Status
        </ResponsiveText> */}
                <ResponsiveText size={3.7} color={colors.black}>
                    Action
                </ResponsiveText>
            </View>
            {HubServices?.length > 0 ?
                HubServices.map((item) => {
                    return (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                paddingHorizontal: wp(2),
                            }}
                        >
                            <View style={styles.box}>
                                <ResponsiveText fontFamily={"bold"} size={3.2} color={colors.black}>
                                    {item.title}
                                </ResponsiveText>
                            </View>
                            <View style={styles.box}>
                                <ResponsiveText fontFamily={"bold"} size={2.8} color={colors.black}>
                                    {moment(item.date_time).format("DD MMM YYYY")}
                                </ResponsiveText>
                            </View>

                            <View style={styles.box}>
                                <ResponsiveText fontFamily={"bold"} size={3.2} color={colors.black}>
                                    {item.status_id == 1 ? 'Active' : 'InActive'}
                                </ResponsiveText>
                            </View>
                            <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate(routeName.EDIT_HUB_SERVICE,{item:item})}>
                                <ResponsiveText weight={"bold"} size={3.5} color={colors.primary}>
                                    Edit
                                </ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    )
                }) : (loading == false ?
                    <RecordNotFound /> : null)}
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
};

export default HubServiceList;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    box: { width: wp(20), alignItems: "center", paddingVertical: hp(2) },
});

