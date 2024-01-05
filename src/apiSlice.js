import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { changeProfile } from './userSlice';

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        mode: "cors",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                headers.set('Authorization', `${token}`)
            }
            return headers;
        }
    }),
    tagTypes: ['Cart', 'Order', 'Picture'],
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
        }),
        getGames: builder.query({
            query: () => ("cart/getgames"),
            providesTags: ['Cart']
        }),
        addGame: builder.mutation({
            query: (id) => ({
                url: 'cart/addtocart',
                method: 'POST',
                body: { "gameId": id }
            }),
            invalidatesTags: ["Cart"]
        }),
        removeGames: builder.mutation({
            query: (ids) => {
                return ({
                    url: "cart/removegames",
                    method: "POST",
                    body: { gameIds: ids }
                })
            },
            invalidatesTags: ["Cart"]
        }),
        emptyCart: builder.mutation({
            query: () => {
                return ({
                    url: "cart/emptycart",
                    method: "GET",

                })
            },
            invalidatesTags: ["Cart"]
        }),
        payment: builder.mutation({
            query: (data) => {
                return ({
                    url: "order/confirmorder",
                    method: "POST",
                    body: data
                })
            },
            invalidatesTags: ["Cart", "Order"]
        }),
        getorders: builder.query({
            query: () => {
                return ({
                    url: "order/getorders"
                })
            },
            providesTags: ["Order"]
        }),
        editProfile: builder.mutation({
            query: (formData) => {
                return ({
                    url: "user/editprofile",
                    method: "POST",
                    body: formData
                })
            },

            onQueryStarted: async (formData, { dispatch, queryFulfilled, getState }) => {
                const data = getState().user;
                dispatch(changeProfile({ name: formData.get("name"), email: formData.get("email") }));
                try {
                    await queryFulfilled;
                    dispatch(changeProfile({ profile: formData.get("profilePicture") ? !data.profile : data.profile }))
                } catch (ex) {
                    dispatch(changeProfile(data));
                }
            },
        })
    })
})


export default apiSlice;
export const { useEditProfileMutation, useGetpicturesQuery, useGetordersQuery, usePaymentMutation, useEmptyCartMutation, useGetBestSellersQuery, useGetItemQuery, useGetFeaturedQuery, useGetSearchedItemsQuery, useGetGamesQuery, useAddGameMutation, useRemoveGamesMutation } = apiSlice;


