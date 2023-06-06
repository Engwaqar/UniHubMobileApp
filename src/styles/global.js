import {StyleSheet} from 'react-native';
export const gStyles = StyleSheet.create({
  selfcenter: {alignSelf: 'center'},
  row: {flexDirection: 'row'},
  row_jCenter_alC: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row_alC: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row_alSCenter: {flexDirection: 'row', alignSelf: 'center'},
  alSstart: {alignSelf: 'flex-start'},
  alS_End: {alignSelf: 'flex-end'},
  row_Jaround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  row_jBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alI_center: {alignItems: 'center'},
  row_jBetween_alICenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center_text: {textAlign: 'center'},
  jcCenter: {justifyContent: 'space-between'},

  row_wrap: {flexDirection: 'row', flexWrap: 'wrap'},
  row_aiCenter: {flexDirection: 'row', alignItems: 'center'},
  text_align: {textAlign: 'center'},
});
