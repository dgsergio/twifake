import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { jwtDecode } from 'jwt-decode';

export type PostItem = {
  _id: string;
  post: string;
  createdAt: string;
  createdBy: string;
};

export interface PostState {
  posts: PostItem[];
  loadingStatus: { loading: boolean; error: string };
}

const initialState: PostState = {
  posts: [],
  loadingStatus: { loading: false, error: '' },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    populate: (state, action: PayloadAction<PostItem[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<PostItem>) => {
      state.posts.push(action.payload);
    },
    setStatus: (
      state,
      action: PayloadAction<{ loading: boolean; error: string }>
    ) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const { populate, setStatus, addPost } = postsSlice.actions;

export const getPosts = (url: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      const response = await fetch(url);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      dispatch(populate(data.posts));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Error: ' + err }));
    }
  };
};

export type RequestApi = {
  url: string;
  method: string;
  body: string;
};

export const postPost = (req: RequestApi) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      let token = localStorage.getItem('token') as string;

      const response = await fetch(req.url, {
        method: req.method,
        body: req.body ? req.body : null,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.slice(1, -1)!}`,
        },
      });
      if (!response.ok) throw new Error('Something went wrong');

      const data = await response.json();
      const decoded = jwtDecode(token) as { id: string };
      const post: PostItem = {
        _id: data.id,
        createdAt: new Date().toISOString(),
        createdBy: decoded.id,
        post: JSON.parse(req.body).post,
      };
      dispatch(addPost(post));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Error: ' + err }));
    }
  };
};

export default postsSlice.reducer;
