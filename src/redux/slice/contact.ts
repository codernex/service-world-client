import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  contacts: IContactForm[];
  isLoading: boolean;
} = {
  contacts: [],
  isLoading: false,
};

const contactSlice = createSlice({
  initialState,
  name: "contact",
  reducers: {
    startLoading: (state) => {
      state.isLoading = false;
    },
    getContact: (state, action) => {
      state.contacts = action.payload;
      state.isLoading = false;
    },
    getContactErr: (state) => {
      state.isLoading = false;
    },
    createContact: (state, action) => {
      state.isLoading = false;
      state.contacts.push(action.payload);
    },
    createContactErr: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  createContact,
  createContactErr,
  getContact,
  getContactErr,
  startLoading,
} = contactSlice.actions;
export default contactSlice.reducer;
