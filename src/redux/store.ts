import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import locationReducer from "./features/locationSlice";
import { shazamCoreApi } from "./services/shazanCore/shazamCore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    location: locationReducer,
  },
  //@ts-expect-error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
