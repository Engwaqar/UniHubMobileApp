import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import InputText from "../../components/InputText";
import DropDown from "../../components/DropDown";
import { ScrollView } from "react-native-gesture-handler";
import { globalPath } from "../../constants/globalPath";
import { _toast } from "../../constants/Index";

import Icon from "../../components/Icon";
import RnButton from "../../components/RnButton";
import ImagePicker from "react-native-image-crop-picker";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Dots from "../../components/Dots";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { getSellerProducts } from "../../redux/actions/user.actions";
const SellProduct = ({ navigation }) => {
  const dispatch = useDispatch();

  const [categories, setcategory] = useState([]);
  const [singleFile1, setSingleFile1] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorString, setErrorString] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.PRODUCT_CATEGORIES);
      if (res && res.status == 200) {
        setcategory(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const Submit = async () => {
    setErrorString("");

    if (productName == "") {
      setErrorString("Product name is required!");
      return false;
    } else if(productDesc==''){
      setErrorString("Product description is required!");
      return false;
    } else if(selectedCategory==null){
      setErrorString("Category is required!");
      return false;
    }
    else if(price==''){
      setErrorString("Price is required!");
      return false;
    }else if(stock==''){
      setErrorString("Quantity is required!");
      return false;
    }else if(singleFile1==null){
      setErrorString("Image is required!");
      return false;
    }

    const formdata = new FormData();
    formdata.append("name", productName);
    formdata.append("category_id", selectedCategory);
    formdata.append("descreption", productDesc);
    formdata.append("price", price);
    formdata.append("stock", stock);
    formdata.append(
      "image",
      singleFile1 != null
        ? {
            uri: singleFile1.path,
            type: "image/jpeg",
            name: singleFile1.filename ? singleFile1.filename : "name",
          }
        : null
    );

    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_PRODUCTS, formdata);
      console.log("==== res =====", res);
      if (res && res.status == 200) {
        setLoading(false);
        dispatch(getSellerProducts());
        _toast(res.message)
        navigation.goBack();
      } else {
        setLoading(false);
        _toast(res.message)
      }
    } catch (error) {
      setLoading(false);
      console.log("error while add products", error);
      //   setErrorString(error);
    }
  };

  const toggel = (file) => {
    Alert.alert("Profile Image", "change profile Image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "open Camera",
        onPress: async () => {
          openCamera(file);
        },
      },
      {
        text: "Select from gallary",
        onPress: async () => {
          takephotofromgallary(file);
        },
      },
    ]);
  };
  const takephotofromgallary = (setFile) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      setFile(image);
      console.log(image, "image working");
    });
  };

  const openCamera = (setFile) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // addPhoto(image);
      setFile(image);
      console.log(image, "image working");
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <ScrollView>
        <MainHeader navigation={navigation} title={"Marketplace"} />
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(5),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            Sell Products
          </ResponsiveText>
          <ResponsiveText size={3} color={colors.grey1}>
            Checkout our products provided by one expert vendors and select the
            needed one.
          </ResponsiveText>
        </View>
        <InputText
          Text={"Product Name"}
          placeholder={'name your product'}
          placeholderTextColor={colors.grey1}
          value={productName}
          onChnageText={(text) => setProductName(text)}
        />
        <InputText
          Text={"Product Description"}
          placeholder={'write something about your product'}
          placeholderTextColor={colors.grey1}
          multiline
          style={styles.box}
          value={productDesc}
          onChnageText={(text) => setProductDesc(text)}
        />
        <View style={{ marginTop: 25 }}>
          <DropDown
            title={"Category*"}
            data={categories.map((v) => v.title)}
            onSelect={(item) => {
              var id = categories.find((v) => v.title == item)?.id;
              setSelectedCategory(id);
            }}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <InputText
            Text={"Price"}
            placeholder={'£20'}
            placeholderTextColor={colors.grey1}
            value={price}
            onChnageText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
            keyboardType={'numeric'}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <InputText
            Text={"Quantity"}
            placeholder={'1'}
            placeholderTextColor={colors.grey1}
            keyboardType={'numeric'}
            value={stock}
            onChnageText={(text) => setStock(text.replace(/[^0-9]/g, ""))}
          />
        </View>
        <TouchableOpacity onPress={() => toggel(setSingleFile1)}>
          <View
            style={{
              // backgroundColor: colors.lighterGrey,
              alignItems: "center",
              paddingVertical: wp(5),
              marginHorizontal: wp(5),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.lighterGrey,
              marginTop: 20,
            }}
          >
            <Icon
              margin={[0, 0, 0, 0]}
              size={25}
              source={globalPath.Camera}
              tintColor={colors.grey1}
            ></Icon>
            <ResponsiveText size={3.3} color={colors.grey1}>
              Upload Product Image
            </ResponsiveText>
          </View>
        </TouchableOpacity>
        <ResponsiveText
          margin={[10, 0, 0, 20]}
          size={3.3}
          weight={"bold"}
          color={colors.black}
        >
          Upload Files
        </ResponsiveText>
        <View
          style={{
            paddingVertical: wp(5),
            marginHorizontal: wp(5),
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.lighterGrey,
            marginTop: 10,
          }}
        >
          <ResponsiveText
            margin={[0, 0, 0, 10]}
            size={3.3}
            color={colors.grey1}
          >
           { singleFile1 != null ? singleFile1.size + "." + singleFile1.mime : 'seleced image path'}
          </ResponsiveText>
        </View>
        {errorString ? (
          <ResponsiveText margin={[wp(6)]} color={colors.red}>{errorString}</ResponsiveText>
        ) : null}
        <RnButton
          margin={[20, 0, 0, 0]}
          title={"Post Product"}
          onPress={() => Submit()}
        />
        {/* <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity>
            <ResponsiveText margin={[0, 0, 0, 0]} size={3.3} color={colors.red}>
              Delete Product
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity>
            <ResponsiveText
              margin={[5, 0, 0, 0]}
              size={3.3}
              color={colors.grey1}
            >
              Deactivate Product
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity>
            <ResponsiveText
              margin={[5, 0, 0, 0]}
              size={3.3}
              color={colors.primary}
            >
              Activate Product
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        */}
        <View style={{ height: hp(10) }}></View>
      </ScrollView>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default SellProduct;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, padding: wp(1) },
  box: { height: hp(20), marginTop: 15 },
});
