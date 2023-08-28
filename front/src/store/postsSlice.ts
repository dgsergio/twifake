import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '.';

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
    setStatus: (
      state,
      action: PayloadAction<{ loading: boolean; error: string }>
    ) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const { populate, setStatus } = postsSlice.actions;

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
      dispatch(populate(data.posts));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Error: ' + err }));
    }
  };
};

export default postsSlice.reducer;
