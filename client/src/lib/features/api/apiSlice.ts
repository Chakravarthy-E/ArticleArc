import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateProfile } from "../../slices/auth";

export interface BlogBanner {
  public_id: string;
  url: string;
}

export interface BlogResponse {
  success: boolean;
  blog: BlogData;
}

export interface BlogData {
  banner: BlogBanner;
  _id: string;
  title: string;
  description: string;
  owner: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogTypes {
  id: string;
  banner: string;
  title: string;
  description: string;
  tag: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "create",
        method: "POST",
        body: {
          name,
          email,
          password,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "sign-in",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateProfile(result.data.user));
        } catch (error) {
          console.log("login error", error);
        }
      },
    }),
    getAllBlogs: builder.query<any, void>({
      query: () => ({
        url: "get-all-blogs",
      }),
    }),
    getBlog: builder.query<BlogResponse, string>({
      query: (id) => ({
        url: `get-blog/${id}`,
      }),
    }),
    getOwner: builder.query<any, string>({
      query: (id) => ({
        url: `get-user/${id}`,
      }),
    }),
    getBlogsByOwner: builder.query<any, void>({
      query: (id) => ({
        url: `get-blogs-by-owner/${id}`,
      }),
    }),
    deleteBlog: builder.mutation<any, void>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    createBlog: builder.mutation<any, CreateBlogTypes>({
      query: ({ id, banner, title, description, tag }) => ({
        url: `create-blog/${id}`,
        method: "POST",
        body: {
          banner,
          title,
          description,
          tag,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllBlogsQuery,
  useGetOwnerQuery,
  useGetBlogQuery,
  useGetBlogsByOwnerQuery,
  useDeleteBlogMutation,
  useCreateBlogMutation,
} = apiSlice;
