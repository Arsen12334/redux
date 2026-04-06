import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import instrumentsReducer from '../features/instruments/instrumentsSlice';
import authReducer from '../features/auth/authSlice'; 
// 1. Импортируем наш новый слайс для задач
import todoReducer from '../features/todos/todoSlice'; 

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        instruments: instrumentsReducer,
        auth: authReducer,
        // 2. Подключаем todo к глобальному состоянию. 
        // Имя ключа должно быть "todos", так как мы его используем в useSelector
        todos: todoReducer 
    }
});