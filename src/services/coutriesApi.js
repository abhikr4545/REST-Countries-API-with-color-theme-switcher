import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = "https://restcountries.com/v3.1";

const createRequest = (url) => {
  return {
    url
  }
}

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => createRequest('/all')
    })
  })
})

export const { useGetCountriesQuery } = countriesApi;