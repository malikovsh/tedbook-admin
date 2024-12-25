import { RootState } from '../store';

export const selectAuth = (state: RootState) => state.auth;

export const selectUser = (state: RootState) => state.auth.auth.user;

export const userRole = (state: RootState) => state.auth.auth.user.role;
