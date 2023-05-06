import { configureStore, combineReducers } from '@reduxjs/toolkit'
import dataReducer from './slice'
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    data: dataReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunk],
})

export const persistor = persistStore(store);