import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: []
}

const dashSlice = createSlice({
    name: 'dash',
    initialState,
    reducers: {
        storeContacts(state, action) {
            state.contacts = action.payload
        }
    }
});

export const { storeContacts } = dashSlice.actions;
export default dashSlice.reducer;