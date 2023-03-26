import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { storeData, getData, removeData } from "../asyncStorage";

export const thunk = createAsyncThunk(
    'state/thunk',
    async () => {
        try {

        } catch (e) {
            console.log(e.message);
        }
    }
)

const stateSlice = createSlice({
    name: 'state',
    initialState: {
        version: '1.0.0',
        toastAndroidMessage: null,
    },
    reducers: {
        setToastAndroidMessage: (state, action) => {
            state.toastAndroidMessage = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunk.fulfilled, (state, action) => {
                //foo
            })
            .addCase(thunk.pending, (state, action) => {
                //foo
            })
            .addCase(thunk.rejected, (state, action) => {
                //foo
            })
    }
})

export const {
    setToastAndroidMessage,
} = stateSlice.actions


export default stateSlice.reducer