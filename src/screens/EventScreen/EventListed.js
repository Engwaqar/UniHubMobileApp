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
import { getAllEvents } from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import moment from "moment";
import Loader from "../../components/Loader";
import RecordNotFound from "../../components/RecordnotFound";
const EventListed = ({ navigation }) => {
    const dispatch = useDispatch();
    const GetAllEvents = useSelector((state) => state.userReducers.getAllEvents?.data);
    const loading = useSelector((state) => state.userReducers.getAllEvents?.refreshing);

    console.log('GetAllEvents', GetAllEvents)
    useEffect(() => {
        dispatch(getAllEvents());
    }, []);
    return (
        <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
            <MainHeader navigation={navigation} title={"Advertise Events"} />
            <View style={{ marginTop: hp(3), marginBottom: hp(4), marginLeft: 15 }}>
                <Dots style={{ marginVertical: hp(3) }} />
                <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
                    Your Events{" "}
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
                    Events List
                </ResponsiveText>
                <SmallButton
                    btnStyle={{ height: hp(4), width: wp(40) }}
                    // margin={[0, 0, 10, 0]}
                    title={"Add New Event"}
                    onPress={() => navigation.navigate(routeName.EVENT_SERVICE)}
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
            {GetAllEvents?.length > 0 ?
                GetAllEvents.map((item) => {
                    return (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                paddingHorizontal: wp(3),
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
                            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate(routeName.EDIT_EVENT, { item: item })}>
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

export default EventListed;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: wp(1) },
    box: { width: wp(20), alignItems: "center", paddingVertical: hp(2) },
});
