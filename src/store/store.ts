import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { languageReducer } from './slices/languageSlice';
import { paginationReducer } from './slices/paginationSlice';
import { sidebarMenuReducer } from './slices/sidebarMenuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    pagination: paginationReducer,
    sidebarMenu: sidebarMenuReducer,
  },
});
