import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name : 'movies',
    initialState : {movies : [] , watchList : [] , mode : false},
    reducers : {
        fetchMovies :  (state , action) => {
            state.movies.push(action.payload)
        },
        addToWatchList : (state , action) => {
            state.watchList.push(action.payload)
        },
        removFromWatchList : (state , action) => {
            state.watchList = state.watchList.filter(el => el.id !== action.payload)
        },
        toggleDarkMode : (state) => {
            
            state.mode = !state.mode
        }
    }
})

export const {fetchMovies , addToWatchList , removFromWatchList , toggleDarkMode} = moviesSlice.actions

export default moviesSlice.reducer;
