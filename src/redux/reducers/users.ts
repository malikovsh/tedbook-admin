import { UserType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UsersState = {
  users: {
    data: UserType[];
    status: 'loading' | 'idle' | 'failed' | 'success';
  };
  selectedUser: UserType | null;
};

const defaultState: UsersState = {
  users: {
    data: [],
    status: 'idle',
  },
  selectedUser: null,
};

const slice = createSlice({
  name: 'users',
  initialState: defaultState,
  reducers: {
    selectUserAction: (state, action: PayloadAction<UserType>) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUserAction: (state) => {
      state.selectedUser = null;
    },
    setUserProfilePic: (state, action) => {
      if (state.selectedUser) {
        state.selectedUser.profilePic = action.payload;
      }
    },
  },
});

const { actions, reducer } = slice;
export const { selectUserAction, clearSelectedUserAction, setUserProfilePic } =
  actions;
export default reducer;
