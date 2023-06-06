//Node Imports
import React from 'react'
import { View, Text } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';

//Local Imports
import { globalPath } from '../constants/globalPath';
import { colors } from '../constants/colorsPallet';
import { hp } from '../helpers/Responsiveness';
import { wp } from '../helpers/Responsiveness';
import Icon from './Icon';
import ResponsiveText from './RnText';


export default function DropDown(props) {


    return (
        <View style={{
            backgroundColor: colors.white,
            height: props.height ? props.height : hp(6),
            width: props.width ? props.width : wp(85),
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: hp(4),
        }}>
            <SelectDropdown
                statusBarTranslucent={true}
                dropdownStyle={{ borderRadius: 7, borderBottomWidth: 0 }}
                dropdown1RowTxtStyle={{ color: colors.white, textAlign: "left", marginStart: 20, fontSize: 14, }}
                defaultValueByIndex={0}
                rowTextStyle={{ color: colors.green, alignSelf: 'center', fontSize: 14 }}
                rowStyle={{ backgroundColor: colors.white, borderBottomColor: colors.grey, borderBottomWidth: 0.9 }}
                buttonStyle={{
                    backgroundColor: colors.white,
                    height: props.height ? props.height : hp(6),
                    width: props.width ? props.width : wp(81),
                    borderRadius:hp(8),
                }}
                buttonTextStyle={{ color: colors.white, fontSize: 14, textAlign: 'left',marginTop:7 }}
                renderDropdownIcon={() => {
                    return (
                    <Icon source={globalPath.droparrowgray} size={15} margin={[0,10,0,0]} />
                    );
                }}
                dropdownIconPosition={"right"}
                data={props.data ? props.data : undefined}
                onSelect={props.onSelect}
                buttonTextAfterSelection={(selectedItem, index) => {
                    console.log("selectedddd:", selectedItem.lable)
                    return (
                        <View style={{ flexDirection: "row" }}>
                            {/* <Icon source={selectedItem.icon} margin={[0, 0, 0, 10]} size={20} /> */}
                            <Text style={{color:colors.grey6,marginTop:1,bottom:7}}>{selectedItem.lable}</Text>
                        </View>
                    );
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                renderCustomizedRowChild={(item, index) => {
                    return (

                        <View style={{ flexDirection: "row" }}>

                            {/* <Icon source={item.icon} margin={[0, 0, 0, 15]} size={20} /> */}
                            <Text style={{color:colors.grey6,marginLeft:10}}>{item.lable}</Text>
                        </View>
                    );
                }}

            />
        </View>
    )
}
