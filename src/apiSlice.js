import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        mode: "cors",
    }),
    endpoints: (builder) => ({
        getBestSellers: builder.query({
            query: () => ("games/bestsellers")
        }),
        getItem: builder.query({
            query: (itemId) => (`game?id=${itemId}`)
        }),

        getFeatured: builder.query({
            query: () => ("games/featured")
        }),
        getSearchedItems: builder.query({
            query: (name) => (`search?name=${name}`)
        })
    })
})

export default apiSlice;
export const { useGetBestSellersQuery, useGetItemQuery, useGetFeaturedQuery, useGetSearchedItemsQuery } = apiSlice;


