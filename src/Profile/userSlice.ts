import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./userType";

type userState = {
  currentUser: User | null;
  users: User[];
};

const initialState: userState = {
  currentUser: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.firstName = action.payload;
      }
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.lastName = action.payload;
      }
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    deleteUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter(
        (user) => user.userId !== action.payload.userId
      );
    },
  },
});
export const {
  setCurrentUser,
  updateFirstName,
  updateLastName,
  setUsers,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;
