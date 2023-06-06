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
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import urls from "../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/Loader";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";

const AllServices = ({ navigation,route }) => {
    const {itemDetail}=route.params
  // const dispatch = useDispatch();
  // const Services = useSelector((state) => state.userReducers.ServicesList.data);
  // const loading = useSelector(
  //   (state) => state.userReducers.ServicesList.refreshing
  // );
  // useEffect(() => {
  //   dispatch(getAllServices());
  // }, []);


  ////
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.ALL_SERVICES+'/'+itemDetail.id);
      console.log("res", res);
      if (res && res.status == 200) {
        setData(res.services);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const headerComponent = () => {
    return (
      <>
        <View style={{ marginVertical: hp(1) }}>
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            {itemDetail.name+`'s  `+"Services"}
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.grey1}>
            Checkout all the latest Services available aroud you.
          </ResponsiveText>
        </View>

        <ResponsiveText
          margin={[hp(2), 0, 0, 0]}
          weight={"bold"}
          size={4}
          color={colors.black}
        >
          Service Details
        </ResponsiveText>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Services"} />

      <FlatList
        style={{ marginHorizontal: wp(5) }}
        data={data}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ width: wp(30) }}
              onPress={() =>
                navigation.navigate(routeName.BOOK_CLEANER1, {
                  itemDetail: item,
                })
              }
            >
              <View style={styles.productCard}>
                <Icon
                  size={50}
                  source={
                    item.cover_img
                      ? { uri: urls.IMG_BASE_URL + item.cover_img }
                      : globalPath.MarketPlace
                  }
                />
              </View>
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
        ListFooterComponent={data.length == 0 ? <RecordNotFound /> : null}
      />
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default AllServices;

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
    backgroundColor: colors.lighterGrey,
    alignItems: "center",
    justifyContent: "center",
    height: wp(22),
    width: wp(22),
    borderRadius: 15,
    margin: 10,
  },
});
