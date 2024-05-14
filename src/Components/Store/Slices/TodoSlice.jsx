import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo(state, action) {
      state.push(action.payload); // Add new todo to the state
    },
    removeTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload); // Remove todo by id
    },
    updateTodo(state, action) {
      const { id, updatedTask } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.task = updatedTask;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
