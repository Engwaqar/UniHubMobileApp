import { StyleSheet, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import { globalPath } from "../../constants/globalPath";
import PackageTabs from "../Home/PackageTabs";
import RnButton from "../../components/RnButton";
import { ScrollView } from "react-native-gesture-handler";
import urls from "../../redux/lib/urls";
import moment from "moment";
import { currency } from "../../constants/constantVeriable";

const Ticket1 = ({ navigation, route }) => {
  const { itemDetail } = route.params;
  const [selectedPakage, setSelectedPakage] = useState(itemDetail.prices[0]);

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Events"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Book An Event Ticket
          </ResponsiveText>
          <Image
            style={styles.ImgStyle}
            source={{ uri: urls.IMG_BASE_URL + itemDetail.cover_img }}
          />
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            {itemDetail.title}
          </ResponsiveText>
          <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            size={2.8}
            color={colors.grey1}
          >
            {itemDetail.descreption}
          </ResponsiveText>

          <ResponsiveText
            margin={[10, 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Book Ticket
          </ResponsiveText>

          <FlatList
            scrollEnabled={false}
            data={itemDetail.prices}
            numColumns={3}
            renderItem={({ item }) => (
              <View
                style={{ flex: 1, marginVertical: hp(2), alignItems: "center" }}
              >
                <PackageTabs
                  onPress={() => setSelectedPakage(item)}
                  title={item.title}
                  price={currency + item.price}
                  isSelected={selectedPakage?.id == item.id}
                />
              </View>
            )}
          />

          <ResponsiveText
            margin={[hp(3), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Event Date & Time:{"  "}
            <ResponsiveText size={3} color={colors.primary}>
              {moment(itemDetail.date_time).format("DD MMM YYYY hh:mm:ss")}
            </ResponsiveText>
          </ResponsiveText>
          {/* <ResponsiveText
            margin={[hp(1), 0, 0, 0]}
            size={3}
            // color={colors.grey1}
          >
            Timezone:
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.primary}>
            Greenwich Mean Time (GMT)
          </ResponsiveText> */}
          <ResponsiveText
            margin={[hp(2), 0, 0, 0]}
            weight={"bold"}
            size={3.5}
            color={colors.black}
          >
            Event Location: {"  "}
            <ResponsiveText size={3} color={colors.primary}>
              {itemDetail.address}
            </ResponsiveText>
          </ResponsiveText>

          <RnButton
            width={wp(90)}
            margin={[hp(3), 0, 0, 0]}
            title={"Next"}
            onPress={() =>
              navigation.navigate("Ticket2", {
                itemDetail: itemDetail,
                selectedPakage: selectedPakage,
              })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket1;

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
    // marginBottom: 20,
    // alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
