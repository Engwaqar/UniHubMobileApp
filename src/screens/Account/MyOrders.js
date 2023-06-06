import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import { hp } from "../../helpers/Responsiveness";
import SalesCard from "./SalesCard";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrder } from "../../redux/actions/user.actions";
import { routeName } from "../../constants/routeName";
const MyOrders = ({navigation}) => {
  const dispatch = useDispatch();
  const MyOrder = useSelector((state) => state.userReducers.getMyOrder?.data);
  // const loading = useSelector((state) => state.userReducers.getMyOrder.refreshing);
  console.log("MyOrder", MyOrder);
  useEffect(() => {
    dispatch(getMyOrder());
  }, []);
  return (
    <View>
      <ResponsiveText color={colors.primary} size={4} weight="bold">
        My Orders
      </ResponsiveText>
      <ResponsiveText margin={[5, 0, 5, 0]} color={colors.grey1} size={2.8}>
        View your order history or check the status of a recent order.
      </ResponsiveText>
      {MyOrder?.length > 0 ? (
        <View style={{ marginTop: hp(3) }}>
          <ResponsiveText>All Sales</ResponsiveText>
          {MyOrder.map((item) => (
            <SalesCard
              onPress={() =>navigation.navigate(routeName.ORDER_SUMMARY,item) }
              type={item.paid == 1}
              title={"Order #" + item.id}
              date={item.created_at}
              price={item.total + " " + item.currency}
            />
          ))}
        </View>
      ) : (
        <ResponsiveText margin={[hp(5), 0, 0, 0]} color={colors.black} size={3}>
          You haven’t placed any orders yet.
        </ResponsiveText>
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
