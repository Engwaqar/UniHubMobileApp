import { StyleSheet, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";

import Dots from "../../components/Dots";
import PackageTabs from "../Home/PackageTabs";
import RnButton from "../../components/RnButton";
import { ScrollView } from "react-native-gesture-handler";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { currency } from "../../constants/constantVeriable";

const BookCleaner1 = ({ navigation, route }) => {
  const { itemDetail } = route.params;
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  console.log('MyProfile', MyProfile)
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPakage, setSelectedPakage] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const url=MyProfile.user_type != "Guest"
    ? urls.ALL_SERVICES+'/'
    : urls.guest_all_services_of_provider+itemDetail.id
    try {
      setLoading(true);
      const res = await Api.get(url);
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

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Book a Service"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Book A Cleaner{" "}
          </ResponsiveText>
          {data.length > 0
            ? data.map((item, index) => {
                return (
                  <>
                    {index == 0 ? (
                      <Image
                        style={styles.ImgStyle}
                        source={{ uri: urls.IMG_BASE_URL + item.cover_img }}
                      />
                    ) : null}
                    <ResponsiveText
                      margin={[hp(2), 0, 0, 0]}
                      weight={"bold"}
                      size={3.5}
                      color={colors.black}
                    >
                      {item.category.title}
                    </ResponsiveText>
                    <ResponsiveText
                      margin={[hp(1), 0, 0, 0]}
                      size={3}
                      color={colors.grey1}
                    >
                      {item.descreption}
                    </ResponsiveText>
                    <ResponsiveText
                      margin={[10, 0, 0, 0]}
                      weight={"bold"}
                      size={3.5}
                      color={colors.black}
                    >
                      Select Package
                    </ResponsiveText>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      {item?.prices.length > 0
                        ? item.prices.map((item1) => (
                            <View
                              style={{
                                flex: 1,
                                marginVertical: hp(2),
                                alignItems: "center",
                              }}
                            >
                              <PackageTabs
                                onPress={() => setSelectedPakage(item1)}
                                title={item1?.title}
                                price={currency + item1?.price}
                                isSelected={
                                  selectedPakage?.id == item1?.id ? true : false
                                }
                              />
                            </View>
                          ))
                        : null}
                    </View>

                    <RnButton
                      width={wp(80)}
                      title={"Next"}
                      onPress={() => {
                        if (selectedPakage==null) {
                          _toast("Select Package");
                        } else if (
                          item.prices[0].service_id != selectedPakage.service_id
                        ) {
                          _toast("Select Related Package");
                        } else {
                          navigation.navigate(routeName.BOOK_CLEANER2, {
                            itemDetail: item,
                            selectedPakage: selectedPakage,
                          });
                        }
                      }}
                    />
                  </>
                );
              })
            : null}
        </View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default BookCleaner1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
  },
  box: {
    width: wp(15),
    alignItems: "center",
    paddingVertical: hp(2),
  },
  ImgStyle: {
    marginTop: hp(1),
    height: hp(18),
    width: wp(88),
    resizeMode: "cover",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
