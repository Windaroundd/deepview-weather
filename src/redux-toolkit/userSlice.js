import { createSlice } from "@reduxjs/toolkit";
import { userDataLocal } from "../services/localService";

const initialState = {
  user: userDataLocal.get(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
