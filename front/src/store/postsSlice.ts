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
  postManager: { show: boolean; postId: string };
  loadingStatus: { loading: boolean; error: string };
}

const initialState: PostState = {
  posts: [],
  postManager: { show: false, postId: '' },
  loadingStatus: { loading: false, error: '' },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    populate: (state, action: PayloadAction<PostItem[]>) => {
      state.posts = action.payload;
    },
    setPostManager: (
      state,
      action: PayloadAction<{ show: boolean; postId: string }>
    ) => {
      state.postManager = action.payload;
    },
    addPost: (state, action: PayloadAction<PostItem>) => {
      state.posts.push(action.payload);
    },
    updatePost: (
      state,
      action: PayloadAction<{ postId: string; postContent: string }>
    ) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.postId
          ? { ...post, post: action.payload.postContent }
          : post
      );
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    setStatus: (
      state,
      action: PayloadAction<{ loading: boolean; error: string }>
    ) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const {
  populate,
  setStatus,
  addPost,
  removePost,
  setPostManager,
  updatePost,
} = postsSlice.actions;

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
  body: { post: string };
  id: string;
};

export const submitPost = (req: RequestApi) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));

      let token = localStorage.getItem('token')!.slice(1, -1);
      const url = req.id === '' ? req.url : req.url + '/' + req.id;

      const response = await fetch(url, {
        method: req.id === '' ? 'POST' : 'PATCH',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Something went wrong');

      const data = await response.json();
      if (req.id === '') {
        const decoded = jwtDecode(token) as { id: string };
        const post: PostItem = {
          _id: data.id,
          createdAt: new Date().toISOString(),
          createdBy: decoded.id,
          post: req.body.post,
        };
        dispatch(addPost(post));
      } else {
        dispatch(updatePost({ postId: req.id, postContent: req.body.post }));
      }
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Error: ' + err }));
    }
  };
};

export const deletePost = (url: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      let token = localStorage.getItem('token')!.slice(1, -1);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Something went wrong');

      const data = await response.json();
      dispatch(removePost(data.post._id));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Error: ' + err }));
    }
  };
};

export default postsSlice.reducer;
