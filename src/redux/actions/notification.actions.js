import types from "./types";
//GET NOTIFICATION
export const getNotification = (data) => {
  return {
    type: types.GET_NOTIFICATION_REQUEST,
    data: data,
  };
}
