import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import issuesReducer from "./slices/issuesSlice";
import ticketsReducer from "./slices/ticketSlice";
export const makeStore = () => {
    return configureStore({
        reducer:{
            auth: authReducer,
            issues: issuesReducer,
            tickets: ticketsReducer,
        }
    })

}