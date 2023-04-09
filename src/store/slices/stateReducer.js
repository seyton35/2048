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
            const score = await getData('score')
            const bestCell = await getData('bestCell')
            const allCells = await getData('allCells')
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
        fieldGrid: 3,
        allCells: {
            3: [],
            4: [],
            5: [],
            6: [],
            8: [],
        },
        bestScore: {
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            8: 0,
        },
        score: {
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            8: 0,
        },
        bestCell: {
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            8: 0,
        },
    },
    reducers: {
        setFieldGrid: (state, action) => {
            state.fieldGrid = action.payload
        },
        setCellsArr: (state, action) => {
            state.allCells[action.payload.grid] = action.payload.cells
        },
        setBestScore: (state, action) => {
            state.bestScore[action.payload.grid] = action.payload.score
        },
        setScore: (state, action) => {
            state.score[action.payload.grid] = action.payload.score
        },
        setBestCell: (state, action) => {
            state.bestCell[action.payload.grid] = action.payload.weight
        },
        setToastAndroidMessage: (state, action) => {
            state.toastAndroidMessage = action.payload
        },
        storeProgress: (state, action) => {
            storeData('bestScore', state.bestScore)
            storeData('score', state.score)
            storeData('bestCell', state.bestCell)
            storeData('allCells', state.allCells)
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
    setCellsArr,
    setBestScore,
    setScore,
    setBestCell,
    storeProgress,
    setFieldGrid,
    setToastAndroidMessage,
} = stateSlice.actions


export default stateSlice.reducer