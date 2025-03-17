import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import issuesReducer from "./slices/issuesSlice";
import ticketsReducer from "./slices/ticketSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    issues: issuesReducer,
    tickets: ticketsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        'persist/PERSIST',
                        'persist/REHYDRATE',
                        'persist/PAUSE',
                        'persist/PURGE',
                        'persist/FLUSH',
                        'persist/REGISTER',
                    ],
                },
            }),
    });
};

export const store = makeStore();
export const persistor = persistStore(store);
