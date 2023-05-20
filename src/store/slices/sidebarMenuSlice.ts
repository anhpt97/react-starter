import { createSlice } from '@reduxjs/toolkit';

export const sidebarMenuSlice = createSlice({
  name: 'sidebarMenu',
  initialState: {
    selectedKeys: [],
  },
  reducers: {
    setSelectedKeys: (state, action) => {
      state.selectedKeys = action.payload;
    },
  },
});

export const { setSelectedKeys } = sidebarMenuSlice.actions;
export const sidebarMenuReducer = sidebarMenuSlice.reducer;
