import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./rootReducer";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            immutableCheck: false,
            serializableCheck: false
        })
});

export const persistor = persistStore(store);