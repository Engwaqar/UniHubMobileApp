import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import { getSellerProducts } from "../../redux/actions/user.actions";
import Dots from "../../components/Dots";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/Loader";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";

const BacktoSchool = ({ navigation }) => {
  // const dispatch = useDispatch();
  // const sellerProducts = useSelector((state) => state.userReducers.sellerProducts.data);
  // const loading = useSelector((state) => state.userReducers.sellerProducts.refreshing);

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   getAllStores();
  // }, []);
  // const getAllStores = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await Api.get(urls.GET_ALL_STORES);
  //     console.log("res", res);
  //     if (res && res.status == 200) {
  //       setData(res.Store);
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };
  const Data = [
    // {
    //   id: 1,
    //   url: require('../../assets/icons/Image131.png'),
    // },
    // {
    //   id: 2,
    //   url: require('../../assets/icons/Image132png.png'),
    // },
    // {
    //   id: 3,
    //   url: require('../../assets/icons/Image133.png'),
    // },
    {
      id: 1,
      url: require('../../assets/icons/Image134.png'),
    },
    {
      id: 2,
      url: require('../../assets/icons/Image135.png'),
    },
    {
      id: 3,
      url: require('../../assets/icons/Image136.png'),
    },
    {
      id: 4,
      url: require('../../assets/icons/Image137.png'),
    },
    {
      id: 5,
      url: require('../../assets/icons/Image134.png'),
    },
    {
      id: 6,
      url: require('../../assets/icons/Image135.png'),
    },
    {
      id: 7,
      url: require('../../assets/icons/Image136.png'),
    },
    {
      id: 8,
      url: require('../../assets/icons/Image137.png'),
    },
  ];
  const headerComponent = () => {
    return (
      <>
        <Dots style={{ marginVertical: hp(3) }} />
        <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
          Your Favourite Brands{" "}
        </ResponsiveText>
        <ResponsiveText size={3.3} color={colors.grey1}>
          Buy great products at great discounts by your favourite brands.
        </ResponsiveText>
        <ResponsiveText margin={[50, 0, 0]} size={3.5} color={colors.black}>
          Brands{" "}
        </ResponsiveText>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Back to School"} />
      <View style={{ marginTop: hp(3), marginBottom: hp(4), marginLeft: 15 }}>
        <FlatList
          style={{ marginHorizontal: wp(4) }}
          data={Data}
          numColumns={4}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate(routeName.B_TO_S_PRODUCTS)
                }
              >
                <Icon
                  size={wp(10)}
                  defaultSource={globalPath.mall}
                  // source={{ uri: item.logo }}
                  source={item.url}

                  //   tintColor={colors.black}
                />
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={headerComponent}
          // ListFooterComponent={
          //   data.length == 0 && !loading ? <RecordNotFound /> : null
          // }
        />
      </View>
      {/* {loading ? <Loader /> : null} */}
    </SafeAreaView>
  );
};

export default BacktoSchool;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
  },

  container: {
    width: wp(16),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(2),

    margin: 10,
    backgroundColor: colors.lightgreen,
  },
});
