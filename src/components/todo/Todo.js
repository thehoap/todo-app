import React from "react";

const Todo = ({ theTodo }) => {
    const todoDelete = async () => {
        let requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        let result = await fetch(
            `http://localhost:3000/todos/${theTodo.id}`,
            requestOptions
        );
        result = await result.json();
    };

    return (
        <li className="todo-item" key={theTodo.id}>
            <input
                type="checkbox"
                name={theTodo.title}
                id={theTodo.id}
                className="todo-checkbox"
                checked={theTodo.completed}
            />
            <p className="todo-title">{theTodo.title}</p>
            <ion-icon
                name="trash"
                className="todo-icon"
                onClick={todoDelete}
            ></ion-icon>
        </li>
    );
};

export default Todo;
