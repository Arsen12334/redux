import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Текущий вошедший пользователь
    user: JSON.parse(localStorage.getItem("bmw_user")) || null,
    isAuth: !!localStorage.getItem("bmw_user"),
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // КАСТОМНАЯ РЕГИСТРАЦИЯ (сохранение в список)
        register: (state, action) => {
            const { login, password } = action.payload;
            
            // 1. Получаем текущий список пользователей из "БД" или пустой массив
            const allUsers = JSON.parse(localStorage.getItem("users_list")) || [];
            
            // 2. Проверяем, не занят ли логин
            const isUserExists = allUsers.find(u => u.login === login);
            
            if (isUserExists) {
                state.error = "Этот логин уже занят";
                alert(state.error);
                return;
            }

            // 3. Добавляем нового пользователя в массив
            allUsers.push({ login, password });
            
            // 4. Сохраняем обновленный список обратно в localStorage
            localStorage.setItem("users_list", JSON.stringify(allUsers));
            
            state.error = null;
            alert("Регистрация успешна! Теперь вы можете войти под своим аккаунтом.");
        },

        // АВТОРИЗАЦИЯ (поиск по списку)
        login: (state, action) => {
            const { login, password } = action.payload;
            
            // 1. Достаем список всех зарегистрированных пользователей
            const allUsers = JSON.parse(localStorage.getItem("users_list")) || [];

            // 2. Ищем пользователя, у которого совпадает И логин, И пароль
            const foundUser = allUsers.find(
                (u) => u.login === login && u.password === password
            );

            if (foundUser) {
                state.user = { login: foundUser.login };
                state.isAuth = true;
                state.error = null;
                // Сохраняем только текущую сессию
                localStorage.setItem("bmw_user", JSON.stringify({ login: foundUser.login }));
            } else {
                state.error = "Неверный логин или пароль";
                alert(state.error);
            }
        },

        // ВЫХОД
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            state.error = null;
            localStorage.removeItem("bmw_user");
        }
    }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;