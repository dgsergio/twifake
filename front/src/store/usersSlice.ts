import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import noAvatar from '../assets/no-avatar.jpg';
import { jwtDecode } from 'jwt-decode';

export type User = {
  _id: string;
  name: string;
  email: string;
  profileUrl: string;
};

export interface UserState {
  loggedUser: User;
  users: User[];
  loadingStatus: { loading: boolean; error: string };
}

const initialLoggedUserState: User = {
  _id: '...',
  email: '...',
  name: '...',
  profileUrl: noAvatar,
};

const initialState: UserState = {
  loggedUser: initialLoggedUserState,
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
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setStatus: (
      state,
      action: PayloadAction<{ loading: boolean; error: string }>
    ) => {
      state.loadingStatus = action.payload;
    },
    setAuthUser: (
      state,
      action: PayloadAction<{ id: string; userName: string }>
    ) => {
      const foundUser = state.users.find(
        (user) => user._id === action.payload.id
      );

      if (foundUser) state.loggedUser = foundUser;
    },
    logout: (state) => {
      localStorage.clear();
      state.loggedUser = initialLoggedUserState;
    },
    getLoggedUser: (state) => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        type UserToken = {
          name: string;
          id: string;
          iat: number;
          exp: number;
        };
        const decoded: UserToken = jwtDecode(storedToken);
        const foundUser = state.users.find((user) => user._id === decoded.id);
        if (foundUser) state.loggedUser = foundUser;
      }
    },
  },
});

export const {
  populate,
  setStatus,
  setAuthUser,
  getLoggedUser,
  logout,
  addUser,
} = usersSlice.actions;

type RequestApi = {
  url: string;
};

export const getUsers = (req: RequestApi) => {
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

type SignReq = {
  url: string;
  body: { name: string; password: string; email?: string; profileUrl?: string };
};

export const signApi = (req: SignReq) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus({ loading: true, error: '' }));
    try {
      const response = await fetch(req.url, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Something is not ok');

      const data = await response.json();
      localStorage.setItem('token', JSON.stringify(data.token));

      if (req.body.email) {
        const newUser: User = {
          _id: data.user._id,
          name: req.body.name,
          email: req.body.email,
          profileUrl: req.body.profileUrl || noAvatar,
        };
        dispatch(addUser(newUser));
      }

      dispatch(setAuthUser({ id: data.user._id, userName: req.body.name }));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      const { message } = err as typeof err & {
        message: string;
      };
      dispatch(setStatus({ loading: false, error: message }));
    }
  };
};

export default usersSlice.reducer;
