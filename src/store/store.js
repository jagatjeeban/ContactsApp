import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./rootReducer";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            immutableCheck: false,
            serializableCheck: false
        })
});

export const persistor = persistStore(store);