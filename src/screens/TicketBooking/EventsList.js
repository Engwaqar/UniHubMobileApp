import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, screenWidth, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import urls from "../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getEventsList,
} from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/Loader";
import DropDown from "../../components/DropDown";

const EventsList = ({ navigation }) => {
  const dispatch = useDispatch();
  const EventList = useSelector((state) => state.userReducers.EventsList?.data);
  const loading = useSelector(
    (state) => state.userReducers.EventsList?.refreshing
  );
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const [selectedFilter, setselectedFilter] = useState('Univeristy Matched')
  const data = ["Univeristy Matched", "Recently Added"];
  useEffect(() => {
    dispatch(getEventsList(MyProfile.user_type, "uni_id_match"));
  }, []);

  const headerComponent = () => {
    return (
      <>
        <View style={{ marginVertical: hp(1) }}>
          <Dots style={{ marginVertical: hp(3) }} />
          {MyProfile.user_type !=='Guest'?
          <View style={{ marginBottom: 25 }}>
            <DropDown
              title={"Filter"}
              defaultButtonText={selectedFilter}
              data={data}
              onSelect={(item) => {
                setselectedFilter(item)
                if (item == "Univeristy Matched") {
                  dispatch(getEventsList(MyProfile.user_type, "uni_id_match"));
                } else {
                  dispatch(getEventsList(MyProfile.user_type, "newest"));
                }
              }}
            />
          </View>:null

          }
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Events List
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.grey1}>
            Checkout all the latest events happenings aroud you.
          </ResponsiveText>
        </View>

        <ResponsiveText
          margin={[hp(2), 0, 0, 0]}
          weight={"bold"}
          size={4}
          color={colors.black}
        >
          Event Details
        </ResponsiveText>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Events"} />

      <FlatList
        style={{ marginHorizontal: wp(5) }}
        data={EventList}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ width: wp(30), right: 0.015 * screenWidth }}
              onPress={() =>
                navigation.navigate("Ticket1", {
                  itemDetail: item,
                })
              }
            >
                <Image 
                  style={[styles.image]}
                  // source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_xIT_DmJQpiH3Q77g7CtUfWCJG-Q7Zz2OQ&usqp=CAU' }}
                  source={
                    item.cover_img
                      ? { uri: urls.IMG_BASE_URL + item.cover_img }
                      : globalPath.MarketPlace
                  }
                />
              <ResponsiveText
                textAlign={"center"}
                margin={[0, 0, 0, 0]}
                color={colors.black}
              >
                {item.title}
              </ResponsiveText>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={EventList?.length == 0 ? <RecordNotFound /> : null}
      />
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default EventsList;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { width: wp(15), alignItems: "center", paddingVertical: hp(2) },
  catCard: {
    backgroundColor: colors.lightgreen,
    padding: 10,
    alignItems: "center",
    width: wp(25),
    borderRadius: 10,
    marginTop: 10,
    marginRight: 5,
  },
  productCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: screenWidth * 0.5,
    margin: 10,
  },
  image: {
    resizeMode:'contain',
    alignSelf:'center',
    marginVertical: 7,
    borderRadius: screenWidth * 0.05,
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
  },
});
