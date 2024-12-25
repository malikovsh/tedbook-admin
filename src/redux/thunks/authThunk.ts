import authApi from '@/api/requests/authApi';
import { LoginBodyType } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body: LoginBodyType) => {
    const response = await authApi.login(body);
    return response;
  },
);
