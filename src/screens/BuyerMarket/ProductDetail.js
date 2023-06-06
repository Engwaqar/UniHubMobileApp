import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, screenWidth, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import Dots from "../../components/Dots";
import { globalPath } from "../../constants/globalPath";
import { currency } from "../../constants/constantVeriable";
import RnButton from "../../components/RnButton";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import { getCartList } from "../../redux/actions/user.actions";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import Fonts from "../../helpers/Fonts";

const ProductDetail = ({ navigation, route }) => {
  const dispatch=useDispatch()
  const cartList = useSelector((state) => state.userReducers.cartList.data);
  const MyProfile = useSelector(
    (state) => state.userReducers.getMyProfile.data
  );
  const [ProductQty, setProductQty] = useState("1");
  const [errorString, setErrorString] = useState("");
  const [loading, setLoading] = useState(false);
  const { itemDetail } = route.params;
  const [guestModal, setGuestModal] = useState(false);

  const addToCart = async () => {
    if (MyProfile.user_type=='Guest') {
      navigation.navigate(routeName.ORDER_DETAILS,{itemDetail:itemDetail,ProductQty:ProductQty})
      return false
    }
    var formdata = new FormData();
    formdata.append("id", itemDetail.id);
    formdata.append("quantity", ProductQty);
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_TO_CART, formdata);
      console.log("res", res);
      if (res && res.status == 200) {
        setLoading(false);
        _toast(res.message);
        dispatch(getCartList());
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const onClose = () => {
    setGuestModal(false)
  }
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} cartIcon title={"Product Detail"} />
      <View style={{ marginTop: hp(3), marginHorizontal: wp(5) }}>
        <Dots style={{ marginVertical: hp(3) }} />
        <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
          {itemDetail.name}{" "}
        </ResponsiveText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 0,
          }}
        >
          <ResponsiveText size={3.5} weight={"bold"} color={colors.black}>
            Price
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.primary}>
          {currency}{itemDetail.price}
          </ResponsiveText>
        </View>
        <Image
          style={styles.ImgStyle}
          source={
            itemDetail.cover_img
              ? { uri: urls.IMG_BASE_URL + itemDetail.cover_img }
              : globalPath.CleaningImage
          }
        />
        <ResponsiveText
          weight={"bold"}
          margin={[10, 20, 0, 0]}
          size={3.5}
          color={colors.black}
        >
          Enter Quantity
        </ResponsiveText>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={ProductQty}
              keyboardType="numeric"
              onChangeText={(text) => setProductQty(text)}
            />
          </View>
          <ResponsiveText
            margin={[0, 0, 0, wp(4)]}
            size={2.5}
            color={colors.grey1}
          >
            Available {itemDetail.stock} in stock
          </ResponsiveText>
        </View>
        {errorString ? (
          <ResponsiveText margin={[wp(5), 0, 0, 0]} color={colors.red}>
            {errorString}
          </ResponsiveText>
        ) : null}
        <RnButton
          width={"100%"}
          margin={[hp(3), 0, 0, 0]}
          title={MyProfile.user_type!='Guest'? cartList.some(e=>e.id==itemDetail.id)?'Remove from Cart': "Add to Cart":'Next'}
          onPress={() => {
            if (ProductQty == "") {
              setErrorString("Quantity is required!");
            } else if (ProductQty == "0" || ProductQty > 200) {
              setErrorString(`Quantity must be 1 to ${itemDetail.stock} `);
            } else {
              addToCart();
              
            }
          }}
        />
        <View style={styles.sellerChat}>
          <ResponsiveText size={3.5} weight={"bold"} color={colors.black}>
            Seller
          </ResponsiveText>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              if (MyProfile.user_type != "Guest") {
                navigation.navigate(routeName.CHAT_STACK, {
                  screen: routeName.CHATBOX,
                  params: { to: itemDetail?.user?.email, name: itemDetail?.user?.name },
                })
              }else{
                setGuestModal(true)
              }
            }
            }
          >
            <ResponsiveText
              margin={[0, 10, 0, 0]}
              weight={"bold"}
              size={3}
              color={colors.grey1}
            >
              Chat with seller
            </ResponsiveText>
            <Icon
              size={20}
              source={globalPath.Chat}
              tintColor={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.sellerProf}
          onPress={() => {
            if (MyProfile.user_type != "Guest") {
              navigation.navigate(routeName.CHAT_STACK, {
                screen: routeName.CHATBOX,
                params: { to: itemDetail?.user?.email, name: itemDetail?.user?.name },
              })
            } else {
              setGuestModal(true)
            }
          }
          }
        >
          <Icon
            borderRadius={wp(25)}
            size={45}
            defaultSource={globalPath.ProfileIcon}
            backgroundColor={colors.grey1}
            source={{ uri: urls.IMG_BASE_URL + itemDetail?.user?.profile_img }}
          />
          <ResponsiveText
            weight={"bold"}
            margin={[hp(2), 0, 0, 5]}
            flex={1}
            size={3.5}
            color={colors.black}
          >
            {itemDetail?.user?.name}
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.lighterGrey,
              width: wp(22),
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              height: wp(6),
              marginTop: 5,
            }}
          >
            <Icon
              size={13}
              source={globalPath.Star}
              tintColor={colors.primary}
            />
            <ResponsiveText weight={"bold"} size={3} color={colors.black}>
              {itemDetail.rating_count
                ? parseFloat(
                    itemDetail.rating_count / itemDetail.reviews_count
                  ).toFixed(1)
                : 0}{" "}
              |
            </ResponsiveText>
            <ResponsiveText size={3} color={colors.grey1}>
              {" "}
              {itemDetail.reviews_count}
            </ResponsiveText>
          </View>
        </TouchableOpacity>
      </View>
      {loading ? <Loader /> : null}
      <Modal
        isVisible={guestModal}
        onModalHide={() => setGuestModal(false)}
        onBackdropPress={() => onClose()}
        animationOutTiming={500}
        backdropOpacity={0.76}
      >
        <View style={styles.centeredView}>
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: 0.84 * screenWidth,
            }}
          >
            <TouchableOpacity onPress={() => onClose()}>
              <Text
                style={{
                  padding: 10,
                  right: screenWidth * 0.02,
                  flexDirection: "row",
                  textAlign: "right",
                  color: colors.black,
                  // fontFamily: fontFamily.pt_sans,
                  // fontSize: fontSize.verbiage
                }}
              >
                ✖
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: colors.black,
                // fontFamily: fontFamily.pt_sans,
                // fontWeight: fontWeight[700],
                // fontSize: fontSize.screen_title,
              }}
            >
              Want to login
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: colors.black,
                // fontFamily: fontFamily.pt_sans,
                // fontWeight: fontWeight[400],
                // fontSize: fontSize.verbiage,
                alignSelf: "center",
                width: 0.7 * screenWidth,
                paddingVertical: 20,
              }}
            >
              To access more features you need to login first
            </Text>
            <TouchableOpacity onPress={() => onConfirm()}>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingBottom: 15,
                  // right: screenWidth * 0.02,
                  flexDirection: "row",
                  textAlign: 'center',
                  color: colors.black,
                  fontWeight: 'bold',
                  fontSize: 16,
                  fontFamily: Fonts.Bold,
                  // backgroundColor:'red'

                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
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
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  sellerChat: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    // borderTopWidth:1
  },
  sellerProf: {
    flexDirection: "row",
    marginTop: 10,
    // borderTopWidth:1
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    marginTop: hp(1.5),
  },
  input: { height: wp(15), width: wp(15), fontSize: 16, padding: wp(3) },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
