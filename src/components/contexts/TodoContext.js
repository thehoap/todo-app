import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

const TodoContextProvider = (prop) => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        getTodoList();
    }, []);

    const requestOptions = {
        method: "",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };

    const getTodoList = async () => {
        requestOptions.method = "GET";

        let result = await fetch(
            `http://localhost:3000/todos?_sort=id&_order=desc`,
            requestOptions
        );
        result = await result.json();
        setTodoList(result);
    };

    const todoDelete = async (id) => {
        requestOptions.method = "DELETE";

        let result = await fetch(
            `http://localhost:3000/todos/${id}`,
            requestOptions
        );
        console.log(result);
        getTodoList();
    };

    const todoAdd = async (title, completed) => {
        const raw = JSON.stringify({ title, completed });

        requestOptions.method = "POST";
        requestOptions.body = raw;

        let result = await fetch(`http://localhost:3000/todos`, requestOptions);
        result = result.json();
        console.log(result);
        delete requestOptions.body;
        getTodoList();
    };

    const todoUpdate = async (id, updatedTodo) => {
        const raw = JSON.stringify(updatedTodo);

        requestOptions.method = "PUT";
        requestOptions.body = raw;

        let result = await fetch(
            `http://localhost:3000/todos/${id}`,
            requestOptions
        );
        result = result.json();
        console.log(result);
        delete requestOptions.body;
        getTodoList();
    };

    return (
        <TodoContext.Provider
            value={{ todoList, todoDelete, todoAdd, todoUpdate }}
        >
            {prop.children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
