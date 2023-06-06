import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MainHeader from "../../components/MainHeader";
import { hp, wp } from "../../helpers/Responsiveness";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import ResponsiveText from "../../components/RnText";
import Loader from "../../components/Loader";
import { colors } from "../../constants/colorsPallet";
import { Rating } from "react-native-ratings";
import { routeName } from "../../constants/routeName";
import { useSelector } from "react-redux";

const ServiceProvider = ({ navigation }) => {
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDate();
  }, []);
  const getDate = async () => {
    try {
      setLoading(true);
      const res = await Api.get(
        MyProfile.user_type != "Guest"
          ? urls.ALL_SERVICE_PROVIDERS
          : urls.guest_all_service_providers
      );
      console.log("res", res);
      if (res && res.status == 200) {
        setData(res.providers);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Book a Cleaner"} />
      <View
        style={{
          marginTop: hp(3),
          marginBottom: hp(4),
          alignItems: "center",
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.listView}
                onPress={() =>
                  navigation.navigate(routeName.BOOK_CLEANER1, {
                    itemDetail: item,
                  })
                }
              >
                <ResponsiveText size={4}>{item.name}</ResponsiveText>
                <Rating
                  type="custom"
                  ratingColor={colors.yellow}
                  ratingBackgroundColor={colors.white}
                  ratingCount={5}
                  tintColor={colors.lightgreen}
                  imageSize={25}
                  startingValue={
                    item.service_rating_count
                      ? parseFloat(
                          item.service_rating_count / item.service_reviews_count
                        ).toFixed(1)
                      : 0
                  }
                  readonly
                  style={{ alignSelf: "flex-end" }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default ServiceProvider;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  listView: {
    backgroundColor: colors.lightgreen,
    width: wp(80),
    // alignItems: "center",
    padding: 10,
    paddingHorizontal: wp(5),
    borderRadius: 15,
    marginTop: hp(2),
  },
});
