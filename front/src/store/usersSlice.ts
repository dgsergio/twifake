import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';

export type User = {
  _id: string;
  name: string;
  email: string;
  perfilUrl: string;
};

export interface UserState {
  users: User[];
  loadingStatus: { loading: boolean; error: string };
}

const initialState: UserState = {
  users: [],
  loadingStatus: { loading: false, error: '' },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    populate: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<{ loading: boolean; error: string }>
    ) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const { populate, setStatus } = usersSlice.actions;

type RequestApi = {
  url: string;
};

export const callApi = (req: RequestApi) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      const response = await fetch(req.url);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      dispatch(populate(data));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Error: ' + err }));
    }
  };
};

export default usersSlice.reducer;
