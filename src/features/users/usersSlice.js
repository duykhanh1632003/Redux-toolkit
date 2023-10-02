import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Dube Lebowski' },
    { id: '1', name: 'hell word' },
    { id: '2', name: 'Dave gray'}
]

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export const selectAllPosts = (state) => state.user

export default usersSlice.reducer