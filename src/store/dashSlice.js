import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
    displayContacts: []
}

const dashSlice = createSlice({
    name: 'dash',
    initialState,
    reducers: {
        storeContacts(state, action) {
            state.contacts = action.payload
        },
        storeDisplayContacts(state, action) {
            state.displayContacts = action.payload
        }
    }
});

export const { storeContacts, storeDisplayContacts } = dashSlice.actions;
export default dashSlice.reducer;