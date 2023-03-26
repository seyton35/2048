import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./slices/stateReducer";

export default configureStore({
    reducer: {
        state: stateReducer
    },
})