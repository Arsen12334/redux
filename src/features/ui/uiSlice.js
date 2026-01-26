import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        theme: "light",
        // Данные о машинах BMW
        cars: [
            { id: 1, model: "BMW M5 CS", year: 2023, specs: "635 л.с., 4.4L V8" },
            { id: 2, model: "BMW M4 Competition", year: 2024, specs: "510 л.с., 3.0L L6" },
        ]
    },

    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark": "light"
        }
    }
})

export const { toggleTheme } = uiSlice.actions
export default uiSlice.reducer