import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from '../components/Icon'
import { colors } from '../constants/colorsPallet'
import { globalPath } from '../constants/globalPath'
import ResponsiveText from './RnText'
export default function CheckBox({ text, onPress, value, additem, checkedd, index }) {
    const [checked, setChecked] = React.useState(checkedd ? checkedd : false);
    return (
        <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => { setChecked(!checked); if (additem) { additem(value, index); if (onPress) { onPress } } }}
        >
            <View style={{
                height: 20, width: 20, borderRadius: 3,
                backgroundColor: checked ? colors.green : colors.grey,
                borderWidth: checked ? undefined : 2,
                borderColor: checked ? undefined : colors.grey1,
                justifyContent: 'center', alignItems: 'center'
            }} >

                {checked ? <Icon source={globalPath.Check} size={12} tintColor={colors.white} /> : <View />}
            </View>
            <View>

            </View>
            {
                text ? <ResponsiveText color={colors.grey1} margin={[0, 0, 0, 10]}>{text}</ResponsiveText> : null
            }
        </TouchableOpacity>
    )
}
