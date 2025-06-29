// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import studentReducer from './slices/studentSlice';
import teachersReducer from './slices/teachersSlice'; // ✅ ADD this

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
    teachers: teachersReducer, // ✅ REGISTER it here
  },
});
