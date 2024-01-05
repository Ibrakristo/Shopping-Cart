import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import cartReducer from './cartSlice'
import userReducer from './userSlice'
import apiSlice from './apiSlice'


import storage from 'redux-persist/lib/storage';
import {
    persistReducer, persistStore,

} from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    // cart: cartReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk).concat(apiSlice.middleware)

})
export const persistor = persistStore(store)

