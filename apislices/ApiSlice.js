import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery : fetchBaseQuery({
    baseUrl : process.env.NEXT_PUBLIC_APP_API_URL,
    credentials : "include"
  }),
  endpoints : () => ({})
})