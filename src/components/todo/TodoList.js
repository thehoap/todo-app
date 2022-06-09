import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const TodoList = () => {
    const { todoList } = useContext(TodoContext);
    const { todoAdd } = useContext(TodoContext);
    const { todoUpdate } = useContext(TodoContext);
    const { todoDelete } = useContext(TodoContext);

    const [newTodo, setNewTodo] = useState({
        title: "",
        completed: false,
    });

    const { title, completed } = newTodo;

    const handleTodoAdd = (e) => {
        setNewTodo({ ...newTodo, title: "" });
        e.preventDefault();
        todoAdd(title, completed);
    };

    const handleTodoUpdate = (e) => {
        e.preventDefault();
        todoUpdate(e.target.id, {
            title: e.target.name,
            completed: e.target.checked,
        });
    };

    return (
        <div className="todo">
            <h1 className="heading todo-heading">Công việc cần làm</h1>
            <div className="todo-add">
                <input
                    type="text"
                    placeholder="Công việc mới"
                    className="todo-input"
                    value={title}
                    onChange={(e) => {
                        setNewTodo({ ...newTodo, title: e.target.value });
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleTodoAdd(e);
                        }
                    }}
                />
                <button className="todo-button" onClick={handleTodoAdd}>
                    Thêm
                </button>
            </div>
            <ul className="todo-list">
                {todoList.length > 0 &&
                    todoList.map((todo) => (
                        <li className="todo-item" key={todo.id}>
                            <input
                                type="checkbox"
                                name={todo.title}
                                id={todo.id}
                                className="todo-checkbox"
                                checked={todo.completed}
                                onChange={handleTodoUpdate}
                            />
                            <label className="todo-title" for={todo.id}>
                                {todo.title}
                            </label>
                            <ion-icon
                                name="trash"
                                className="todo-icon"
                                onClick={() => todoDelete(todo.id)}
                            ></ion-icon>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TodoList;
