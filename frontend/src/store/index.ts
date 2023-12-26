import { configureStore } from "@reduxjs/toolkit";
import orderReducer  from "./reducers/orders";

const store = configureStore({
    reducer:{
        orderReducer
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;