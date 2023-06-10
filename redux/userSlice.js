import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  name: null,
  email: null,
  uid: null,
  photoUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoUrl = action.payload.photoUrl;
    },

    signOutUser: (state) => {
      state.username = null;
      state.name = null;
      state.email = null;
      state.uid = null;
      state.photoUrl = null;
    },
  },
});

export const {setUser, signOutUser} = userSlice.actions;

export default userSlice.reducer;
