import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Blog {
  id: string;
  title: string;
  banner: string;
  description: string;
}

export interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
};

const slice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs(state, { payload }: PayloadAction<Blog[]>) {
      state.blogs = payload;
    },
  },
});

export const { getBlogs } = slice.actions;

export const getBlogState = createSelector(
  (state: RootState) => state.blogs,
  (blogs) => blogs
);

export default slice.reducer;
