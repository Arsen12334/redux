import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import instrumentsReducer from '../features/instruments/instrumentsSlice';
import authReducer from '../features/auth/authSlice'; 

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        instruments: instrumentsReducer,
        // 2. Подключаем auth к глобальному состоянию
        auth: authReducer 
    }
})