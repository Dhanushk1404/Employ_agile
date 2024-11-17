// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  organization: {
    logo: '',
    name: '',
    website: '',
    type: '',
    contactNumber: '',
    contactEmail: '',
    primaryAddress: '',
    password:''
  },
  location: {
    name: '',
    mailAlias: '',
    description: '',
    address: '',
    country: '',
    state: '',
  },
  departments: [],
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrganizationDetails: (state, action) => {
      state.organization = action.payload;
    },
    setLocationDetails: (state, action) => {
      state.location = action.payload;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    removeDepartment: (state, action) => {
      state.departments = state.departments.filter((_, index) => index !== action.payload);
    },
  },
});

export const {
  setOrganizationDetails,
  setLocationDetails,
  addDepartment,
  removeDepartment,
} = organizationSlice.actions;

const store = configureStore({
  reducer: {
    organization: organizationSlice.reducer,
  },
});

export default store;
