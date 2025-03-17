"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, persistor } from "@/lib/store";

const StoreProvider = ({ children }) => {
    const storeRef = useRef(null);
    if (!storeRef.current) {
        // Create store for first time
        storeRef.current = makeStore();
    }
    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default StoreProvider;