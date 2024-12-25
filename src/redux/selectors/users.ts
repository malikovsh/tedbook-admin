import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.users;

export const selectUserData = (state: RootState) => state.users.selectedUser;
