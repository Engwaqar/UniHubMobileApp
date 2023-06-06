import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { handleMargin, handlePadding } from "../constants/theme";
import Fonts from "../helpers/Fonts";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
const InputText = ({
  iconSize,
  height,
  margin,
  backgroundColor,
  padding,
  zIndex,
  fontFamily,
  tintColor,
  placeholder,
  iconMargin,
  maxLength,
  rightIconMargin,
  placeholderTextColor,
  keyboardType,
  width,
  containerStyle,
  secureTextEntry,
  onChnageText,
  fontSize,
  multiline,
  value,
  onSubmitEditing,
  cardIcon,
  Text,
  inputHeight,
  marginHorizontal,
  editable,
  BadgeIcon,
  ...props
}) => {
  return (
    <KeyboardAvoidingView behavior='padding' enabled>
      <TouchableOpacity
        style={[
          styles.container,

          margin ? handleMargin(margin) : undefined,
          padding ? handlePadding(padding) : undefined,
          props.style,
          height && { height },
          width && { width },
          {
            zIndex: zIndex,
            backgroundColor: backgroundColor ? backgroundColor : colors.grey,
            marginHorizontal:marginHorizontal?marginHorizontal:wp(5)
          },
          containerStyle,
        ]}
      >
        {props.leftIcon && (
          <Icon
            tintColor={tintColor ? tintColor : colors.yellow}
            margin={iconMargin ? iconMargin : [0, 10, 0, -4]}
            source={props.leftIcon}
            size={iconSize}
          />
        )}
        <View style={{flex:1}} >
        <ResponsiveText margin={[6, 0, 0, 10]} color={colors.grey1} size={3}>
          {Text}
        </ResponsiveText>

        <TextInput
          value={value}
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable={editable}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          maxLength={maxLength}
          style={[
            fontSize && { fontSize },
            inputHeight && { height: inputHeight },
            styles.Input,
            fontFamily && { fontFamily: Fonts[fontFamily] },
            (onSubmitEditing = props.onSubmitEditing),
            props.textStyle,
            {
              color: colors.black,
              textAlignVertical: "top",
              bottom: 7,
            },
          ]}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.black
          }
          placeholder={placeholder ? placeholder : undefined}
          keyboardType={keyboardType}
          onChangeText={onChnageText ? (txt) => onChnageText(txt) : null}
        />
        </View>
          {cardIcon && (
          <Icon
            // tintColor={tintColor ? tintColor : colors.yellow}
            margin={iconMargin ? iconMargin : [0, wp(3), 0, 5]}
            source={cardIcon}
            size={40}
          />
        )}
        {BadgeIcon && (
          <Icon
            // tintColor={tintColor ? tintColor : colors.yellow}
            margin={iconMargin ? iconMargin : [0, wp(3), 0, 5]}
            source={BadgeIcon}
            size={25}
          />
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default InputText;

const styles = StyleSheet.create({
  container: {
    //  height: wp(5),
    // flexDirection: 'row',
    height: 68,
    // marginHorizontal: wp(5),
    display: "flex",
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: colors.grey1,
    borderRadius: wp(1.5),
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 0,
  },
  Input: {
    borderRadius: wp(1.5),
    flex: 1,
    paddingLeft: 10,
    marginTop: 5,
    fontFamily: Fonts.Regular,
    color: colors.primary,
    // height: hp(0),
    // marginLeft:7
  },
});
