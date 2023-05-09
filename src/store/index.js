import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    summonerData: null,
    matchHistory: [],
    region: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setSummonerData(state, action) {
            state.summonerData = action.payload;
        },
        setRegion(state, action) {
            state.region = action.payload;
        },
        emptySummonerData(state) {
            state.summonerData = null;
            state.region = null;
            state.matchHistory = [];
        },
        setSummonerName(state, action) {
            state.summonerName = action.payload;
        },
        setMatchHistory(state, action) {
            state.matchHistory = action.payload;
        },
    },
});

const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
    },
});

export const profileActions = profileSlice.actions;

export default store;
