import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumApi";
import { photosApi } from "./apis/photosApi";
import { usersReducer } from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    },

});

setupListeners(store.dispatch);

export * from './thunks/addUser';
export * from './thunks/fetchUsers';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlumMutation } from './apis/albumApi';
export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } from './apis/photosApi'
