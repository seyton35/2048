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

export const initialization = createAsyncThunk(
    'state/initialization',
    async (_, { dispatch }) => {
        try {
            const bestScore = await getData('bestScore')
            if (bestScore !== null) {
                dispatch(setBestScore(bestScore))
            }
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
        bestScore: 0,
        fieldGrid: 3
    },
    reducers: {
        setBestScore: (state, action) => {
            state.bestScore = action.payload
        },
        setFieldGrid: (state, action) => {
            state.fieldGrid = action.payload
        },
        setToastAndroidMessage: (state, action) => {
            state.toastAndroidMessage = action.payload
        },
        storeBestScore: (state, action) => {
            storeData('bestScore', state.bestScore)
        }
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
    setBestScore,
    setFieldGrid,
    setToastAndroidMessage,
} = stateSlice.actions


export default stateSlice.reducer