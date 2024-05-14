import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../Store/Slices/TodoSlice";
import { MdDeleteForever } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";

function TodoList() {
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null); // Track the ID of the task being edited
  const [editedTask, setEditedTask] = useState(""); // Track the edited task
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() === "") return;
    dispatch(addTodo({ id: Math.random(), task: task }));
    setTask("");
  };

  const handleEdit = (id, currentTask) => {
    setEditingId(id);
    setEditedTask(currentTask);
  };

  const handleUpdate = (id) => {
    dispatch(updateTodo({ id: id, updatedTask: editedTask }));
    setEditingId(null); // Reset editing state
    setEditedTask("");
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div
      id="main"
      className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500"
    >
      <div className="border-cyan-800 w-96 flex flex-col items-center bg-cyan-800 py-4 rounded-md h-96 hover:drop-shadow-2xl">
        <p className="text-4xl font-medium text-cyan-600" id="head-text">
          Todo List
        </p>
        <form
          className="mt-6 w-11/12 flex justify-between items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-9/12 focus:outline-none px-2 py-1 rounded-sm text-xl placeholder:text-xl"
            placeholder="Enter Your Tasks"
            value={task}
            onChange={handleInputChange}
            required
            id="task-input"
          />
          <button
            className="font-normal text-xl hover:bg-transparent text-white hover:border border-pink-700 py-1 w-1/5 rounded-sm bg-pink-700"
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="w-full flex flex-col items-center overflow-y-auto">
          <p className="border w-3/5 mt-4"></p>
          {/* Displaying todos */}
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex mt-3 items-center w-11/12 justify-between"
            >
              {editingId === todo.id ? (
                <input
                  className="w-9/12 focus:outline-none px-2 py-1 rounded-sm text-xl placeholder:text-xl"
                  type="text"
                  id="update-input"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <p className="text-xl text-amber-500 w-4/6" id="task-text">
                  {todo.task}
                </p>
              )}
              <div className="flex w-12 justify-between">
                {editingId === todo.id ? (
                  <button
                    className="text-xl text-white"
                    onClick={() => handleUpdate(todo.id)}
                  >
                    <MdOutlineDone />
                  </button>
                ) : (
                  <button
                    className="text-xl text-white"
                    onClick={() => handleEdit(todo.id, todo.task)}
                  >
                    <RiPencilFill />
                  </button>
                )}
                <button
                  className="text-xl text-white"
                  onClick={() => handleDelete(todo.id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
