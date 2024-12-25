import usersApi from '@/api/requests/usersApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMeThunk = createAsyncThunk(
  'users/getUserById',
  async (id: string) => {
    const response = await usersApi.getUserById(id);
    return response;
  },
);
