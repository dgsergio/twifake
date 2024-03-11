import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import noAvatar from '../assets/no-avatar.jpg';
import { jwtDecode } from 'jwt-decode';

export type User = {
  _id: string;
  name: string;
  email: string;
  perfilUrl: string;
};

export interface UserState {
  loggedUser: User;
  users: User[];
  loadingStatus: { loading: boolean; error: string };
}

const initialState: UserState = {
  loggedUser: {
    _id: '...',
    email: '...',
    name: '...',
    perfilUrl: noAvatar,
  },
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
    setCurrentUser: (
      state,
      action: PayloadAction<{ id: string; userName: string }>
    ) => {
      const findUser = state.users.find(
        (user) => user._id === action.payload.id
      );
      if (findUser) state.loggedUser = findUser;
    },
  },
});

export const { populate, setStatus, setCurrentUser } = usersSlice.actions;

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

export const getLoggedUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setStatus({ loading: true, error: '' }));
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      type UserToken = { name: string; id: string; iat: number; exp: number };
      const decoded: UserToken = jwtDecode(storedToken);
      dispatch(setCurrentUser({ id: decoded.id, userName: decoded.name }));
    }
    dispatch(setStatus({ loading: true, error: '' }));
  };
};

export default usersSlice.reducer;
