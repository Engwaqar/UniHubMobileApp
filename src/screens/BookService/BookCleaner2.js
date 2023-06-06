import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { hp, wp } from "../../helpers/Responsiveness";
import MainHeader from "../../components/MainHeader";
import { colors } from "../../constants/colorsPallet";
import ResponsiveText from "../../components/RnText";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import Dots from "../../components/Dots";
import RnButton from "../../components/RnButton";
import { Calendar } from "react-native-calendars";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import TimeSlotView from "../../components/TimeSlotView";
import { ScrollView } from "react-native-gesture-handler";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import moment from "moment";
const BookCleaner2 = ({ navigation, route }) => {
  const { itemDetail, selectedPakage } = route.params;
  const [slotsdata, setSlotsdata] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [markedDates, setmarkedDates] = useState(null)
  const [selectedDate, setselectedDate] = useState('')

  useEffect(() => {
    // getSlots();
  }, []);
  const getSlots = async () => {
    try {
      const res = await Api.get(urls.TIME_SLOTS + "/" + itemDetail.id);
      console.log("res", res);
      if (res && res.status == 200) {
        setSlotsdata(res.bookings);
      } else {
      }
    } catch (error) {}
  };
 const getSelectedDayEvents = date => {
    let markedDates = {};
    markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");
    setselectedDate(date)
    setmarkedDates(markedDates)
    console.log('mar', date)
};
  return (
    <SafeAreaView style={styles.mainContainer} edges={["top", "left", "right"]}>
      <MainHeader navigation={navigation} title={"Book a Cleaner"} />
      <ScrollView>
        <View
          style={{
            marginTop: hp(3),
            marginBottom: hp(4),
            marginHorizontal: wp(10),
          }}
        >
          <Dots style={{ marginVertical: hp(3) }} />
          <ResponsiveText weight={"bold"} size={5} color={colors.primary}>
            {selectedPakage.title}
          </ResponsiveText>
          <ResponsiveText size={3.5} color={colors.grey1}>
            Check out our availability and book the date and time that works for
            you
          </ResponsiveText>
          <ResponsiveText
            margin={[10, 0, 0, 0]}
            size={3.3}
            weight={"bold"}
            color={colors.black}
          >
            Select a Date and Time
          </ResponsiveText>
          {/* <ResponsiveText
            margin={[10, 0, 0, 0]}
            color={colors.primary}
            size={3}
          >
            Timezone: Greenwich Mean Time (GMT)
          </ResponsiveText> */}
          <ResponsiveText
            margin={[10, 0, 10, 0]}
            size={3.3}
            weight={"bold"}
            color={colors.black}
          >
            Preferred Date
          </ResponsiveText>
          <Calendar
            hideExtraDays={true}
            // selected={selectedDate}
            // Collection of dates that have to be marked. Default = {}
            markedDates={markedDates}
            onDayPress={day => {
              console.log('selected day', day);
              getSelectedDayEvents(day.dateString);
                        }}
            style={{
              // borderWidth: 1,
              // borderColor: 'gray',
              height: hp(42),
              backgroundColor: colors.background,
            }}
            theme={{
              backgroundColor: colors.background,
              calendarBackground: colors.background,
              textSectionTitleColor: "#b6c1cd",
              textSectionTitleDisabledColor: "#d9e1e8",
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#00adf5",
              selectedDotColor: "#ffffff",
              arrowColor: colors.black,
              disabledArrowColor: "#d9e1e8",
              monthTextColor: colors.black,
              indicatorColor: "blue",
              // textDayFontFamily: 'monospace',
              // textMonthFontFamily: 'monospace',
              // textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: "300",
              textMonthFontWeight: "700",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
          <ResponsiveText
            margin={[15, 0, 0, 0]}
            size={3.3}
            weight={"bold"}
            color={colors.black}
          >
            Select Time Slot
          </ResponsiveText>
          <ResponsiveText
            margin={[10, 0, 5, 0]}
            size={2.8}
            color={colors.grey1}
          >
            Available time Slots on your Preferred date
          </ResponsiveText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon source={globalPath.DateIcon} />
            <ResponsiveText
              margin={[0, 0, 0, 5]}
              size={2.8}
              color={colors.primary}
            >
              {selectedDate?moment(selectedDate).format('DD MMM YYYY'):'Select Date'}
            </ResponsiveText>
          </View>
          {itemDetail.availability.map((item, index) => {
            return (
              <TimeSlotView
                onPress={() => setSelectedSlot(index)}
                title={"time slot 0" + item.pivot.slot_id}
                Time={item.start_time}
                active={index == selectedSlot}
              />
            );
          })}
          <RnButton
            width={wp(80)}
            margin={[hp(5), 0, 0, 0]}
            title={"Next"}
            // onPress={() => Validation()}
            onPress={() =>{
              if (selectedDate=='') {
                _toast('Select Date')
              } else {
                
                navigation.navigate(routeName.BOOK_CLEANER3, {
                  itemDetail: itemDetail,
                  selectedPakage: selectedPakage,
                  date_time: selectedDate+' '+itemDetail.availability[selectedSlot].start_time,
                })
              }
            }
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookCleaner2;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(1),
    backgroundColor: colors.background,
  },
  box: { width: wp(15), alignItems: "center", paddingVertical: hp(2) },
});
