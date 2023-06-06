import React from "react";
import { colors } from "../../constants/colorsPallet";
import InputText from "../../components/InputText";
import { hp } from "../../helpers/Responsiveness";
import { useSelector } from "react-redux";
import { _toast } from "../../constants/Index";
import ResponsiveText from "../../components/RnText";
import { View } from "react-native";
import { globalPath } from "../../constants/globalPath";

const UserID = React.forwardRef((props, ref) => {
    const MyProfile = useSelector(
        (state) => state.userReducers.getMyProfile.data
    );
    console.log("---------------MyProfile", MyProfile);

    return (
        <>
            {/* <ResponsiveText color={colors.primary} size={4} weight="bold">
            ID
        </ResponsiveText>
        <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
            See Your Verification Status.
        </ResponsiveText> */}
            <InputText
                margin={[hp(3), 0, 0, 0]}
                marginHorizontal={1}
                // Text={"Name"}
                value={MyProfile.name}
                editable={false
                }
            />
                <InputText
                    margin={[hp(3), 0, 0, 0]}
                    marginHorizontal={1}
                    // Text={"Name"}
                    value={MyProfile.uni_name}
                    editable={false
                    }
                    BadgeIcon={globalPath.IconMetrial}
                />
                 
            
        </>
    );
})
export default UserID