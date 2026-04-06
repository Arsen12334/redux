import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: JSON.parse(localStorage.getItem("bmw_todos")) || [],
  },
  reducers: {
    // CREATE
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
      localStorage.setItem("bmw_todos", JSON.stringify(state.items));
    },
    // DELETE
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
      localStorage.setItem("bmw_todos", JSON.stringify(state.items));
    },
    // UPDATE (Toggle status)
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem("bmw_todos", JSON.stringify(state.items));
    },
    // UPDATE (Edit text)
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.items.find(item => item.id === id);
      if (todo) {
        todo.text = newText;
      }
      localStorage.setItem("bmw_todos", JSON.stringify(state.items));
    }
  }
});

export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;