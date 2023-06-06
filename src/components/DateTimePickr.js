import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import ResponsiveText from "./RnText";
import { wp } from "../helpers/Responsiveness";
import { colors } from "../constants/colorsPallet";
import moment from 'moment';
const DateTimePickr = ({ title, onPress, value, mode, onChange, visible }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.DateStyle}>
      <ResponsiveText margin={[10, 0, 0, 10]}>{title}</ResponsiveText>
     {mode=='date'?
      <ResponsiveText
        margin={[10, 0, 0, 10]}
        color={colors.black1}
      >{moment(value).format("DD MMM YYYY")}
      </ResponsiveText>
      :
      <ResponsiveText
        margin={[10, 0, 0, 10]}
        color={colors.black1}
      >{moment(value).format(" hh:mm:ss")}
      </ResponsiveText>
      }
      {visible ?
        <DateTimePicker
          // testID="dateTimePicker"
          value={new Date(value) }
          // minimumDate={new Date(2009, 0, 1)}
          mode={mode}
          // is24Hour={true}
          display="default"
          onChange={onChange}
        /> : null}
      {/* ) : (
        <DateTimePicker
          // testID="dateTimePicker"
          value={value}
          style={{backgroundColor:colors.background,alignSelf:"flex-start"}}
          // minimumDate={new Date(2009, 0, 1)}
          mode={mode}
          // is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}
    </TouchableOpacity>
  );
};

export default DateTimePickr;

const styles = StyleSheet.create({
  DateStyle: {
    marginTop: 25,
    height: wp(20),
    marginHorizontal: wp(5),
    display: "flex",
    borderRadius: wp(1.5),
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 0,
  },
});
