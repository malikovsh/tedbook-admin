import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from '../thunks/authThunk';
import { getMeThunk } from '../thunks/userThunk';

export type AuthState = {
  auth: {
    user: {
      id: string;
      username: string;
      role: string;
      name: string;
      profilePic?: string;
    };
    status: 'loading' | 'idle' | 'failed' | 'success';
  };
};

const defaultState: AuthState = {
  auth: {
    user: {
      id: '',
      username: '',
      role: '',
      name: '',
      profilePic: '',
    },
    status: 'idle',
  },
};

const slice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {
    logoutAction: (state) => {
      state.auth = { ...defaultState.auth };
    },
    setProfilPic: (state, actions) => {
      state.auth.user = {
        ...state.auth.user,
        profilePic: actions.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.auth.status = 'loading';
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.auth.user = action.payload.user;
      state.auth.status = 'success';
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.auth.status = 'failed';
    });
    builder.addCase(getMeThunk.pending, (state) => {
      state.auth.status = 'loading';
    });
    builder.addCase(getMeThunk.fulfilled, (state, action) => {
      state.auth.user = action.payload;
      state.auth.status = 'success';
    });
    builder.addCase(getMeThunk.rejected, (state) => {
      state.auth.status = 'failed';
    });
  },
});

const { actions, reducer } = slice;
export const { logoutAction, setProfilPic } = actions;
export default reducer;
