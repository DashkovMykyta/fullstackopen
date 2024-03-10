import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => action.payload,
    removeNotification: (state, action) => "",
  },
});

export const { setNotification, removeNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
