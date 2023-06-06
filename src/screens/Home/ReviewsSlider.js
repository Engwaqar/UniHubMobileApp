import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import Swiper from "react-native-swiper";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";

const ReviewsSlider = ({ data }) => {
  return (
    <>
      {data.length === undefined ? undefined : (
        <Swiper
          style={{}}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={2.5}
          autoplayDirection={true}
          removeClippedSubviews={true}
          showsPagination={false}
          key={data.length} //For fix auto play issue
        >
          {data.map((item, index) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ResponsiveText size={2.5} color={colors.grey1}>
                    Reviews
                  </ResponsiveText>
                  <Rating
                    type="custom"
                    ratingColor={colors.primary}
                    ratingBackgroundColor={colors.lightgreen}
                    ratingCount={5}
                    tintColor={colors.background}
                    imageSize={13}
                    startingValue={item.rating}
                    readonly
                  />
                </View>
                <ResponsiveText
                  numberOfLines={3}
                  size={2.8}
                  margin={[5, 0, 0, 0]}
                >
                  {item.message}
                </ResponsiveText>
              </>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default ReviewsSlider;

const styles = StyleSheet.create({
  advertisementBannerImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  advertisementBannerTitleOverlay: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,

    // backgroundColor:  'rgba(52, 52, 52, 0.7)',
    opacity: 1,
    padding: 10,
  },
});
