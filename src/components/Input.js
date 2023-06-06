import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { handleMargin, handlePadding } from "../constants/theme";
import Fonts from "../helpers/Fonts";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import Feather from "react-native-vector-icons/Feather";
import { globalPath } from "../constants/globalPath";
const Input = ({
  iconSize,
  height,
  color,
  margin,
  backgroundColor,
  padding,
  zIndex,
  fontFamily,
  tintColor,
  placeholder,
  iconMargin,
  rightIconMargin,
  placeholderTextColor,
  width,
  containerStyle,
  secureTextEntry,
  onChnageText,
  fontSize,
  value,
  onSubmitEditing,
  searchBox,
  shadowColor,
  inputHeight,
  maxLength,
  leftIcon,
  keyboardType,
  ...props
}) => {
  const updateSecureTextEntry = () => {
    setVisible(!visible);
  };
  const [visible, setVisible] = React.useState(true);
  function removeEmojis(string) {
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, "");
  }
  return (
    <KeyboardAvoidingView>
      <View
        style={[
          styles.container,

          margin ? handleMargin(margin) : undefined,
          padding ? handlePadding(padding) : undefined,
          props.style,
          height && { height },
          width && { width },
          {
            zIndex: zIndex,
            backgroundColor: backgroundColor ? backgroundColor : colors.white,
            shadowColor: shadowColor ? shadowColor : colors.white,
          },
          containerStyle,
        ]}
      >
        {leftIcon && (
          <Icon
            tintColor={tintColor ? tintColor : colors.primary}
            margin={iconMargin ? iconMargin : [0, 10, 0, 7]}
            source={leftIcon}
            size={iconSize ? iconSize : 20}
          />
        )}

        <TextInput
          value={value && value}
          maxLength={maxLength && maxLength}
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable={props.editable}
          keyboardType={keyboardType}
          style={[
            fontSize && { fontSize },
            inputHeight && { height: inputHeight },

            styles.Input,
            fontFamily && { fontFamily: Fonts[fontFamily] },
            (onSubmitEditing = props.onSubmitEditing),
            props.centerText
              ? { textAlign: "center", paddingLeft: 0 }
              : undefined,
            props.textStyle,
            ,
            {
              color: color ? color : colors.black,
            },
          ]}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.grey1
          }
          placeholder={placeholder ? placeholder : undefined}
          secureTextEntry={secureTextEntry ? visible : false}
          onChangeText={onChnageText ? (txt) => onChnageText(txt) : null}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.showPasswordBtn}
            onPress={updateSecureTextEntry}
          >
            {visible ? (
              <Icon
                size={20}
                tintColor={colors.grey1}
                margin={[0, 10, 0, 0]}
                source={globalPath.CloseEye}
              />
            ) : (
              <Icon
                size={20}
                tintColor={colors.grey1}
                margin={[0, 10, 0, 0]}
                source={globalPath.Eye}
              />
            )}
          </TouchableOpacity>
        )}
        {searchBox && (
          <TouchableOpacity
            style={styles.showPasswordBtn}
            // onPress={updateSecureTextEntry}
          >
            <Icon
              size={25}
              tintColor={colors.grey1}
              margin={[0, 25, 0, 0]}
              source={globalPath.Search}
            />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    height: hp(6.6),
    width: wp(85),
    flexDirection: "row",
    // display: "flex",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.green2,
    borderRadius: 8,
    paddingLeft: 10,
    marginTop: hp(2),
  },
  Input: {
    borderRadius: 5,
    flex: 1,
    // paddingRight: 15,
    fontFamily: Fonts.Regular,
    color: colors.black,
    // height:wp(30),
    textAlignVertical: "top",
  },
  Feather: {
    marginRight: 5,

    color: colors.black,
  },
  showPasswordBtn: {
    height: "80%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
