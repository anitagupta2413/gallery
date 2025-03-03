import { apiSlice } from "./ApiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/user-logout",
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: "/api/auth/delete-user",
        method: "DELETE",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/api/auth/get-user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} = authApi;
