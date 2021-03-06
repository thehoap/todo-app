import { createContext, useState } from "react";

export const TodoContext = createContext();

// const TodoContextProvider = (prop) => {
//     const [todoList, setTodoList] = useState([]);

//     useEffect(() => {
//         getTodoList();
//     }, []);

//     const requestOptions = {
//         method: "",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         redirect: "follow",
//     };

//     const getTodoList = async () => {
//         requestOptions.method = "GET";

//         let result = await fetch(
//             `http://localhost:3000/todos?_sort=id&_order=desc`,
//             requestOptions
//         );
//         result = await result.json();
//         setTodoList(result);
//     };

//     const todoDelete = async (id) => {
//         requestOptions.method = "DELETE";

//         let result = await fetch(
//             `http://localhost:3000/todos/${id}`,
//             requestOptions
//         );
//         console.log(result);
//         getTodoList();
//     };

//     const todoAdd = async (title, completed) => {
//         const raw = JSON.stringify({ title, completed });

//         requestOptions.method = "POST";
//         requestOptions.body = raw;

//         let result = await fetch(`http://localhost:3000/todos`, requestOptions);
//         result = result.json();
//         console.log(result);
//         delete requestOptions.body;
//         getTodoList();
//     };

//     const todoUpdate = async (id, updatedTodo) => {
//         const raw = JSON.stringify(updatedTodo);

//         requestOptions.method = "PUT";
//         requestOptions.body = raw;

//         let result = await fetch(
//             `http://localhost:3000/todos/${id}`,
//             requestOptions
//         );
//         result = result.json();
//         console.log(result);
//         delete requestOptions.body;
//         getTodoList();
//     };

//     return (
//         <TodoContext.Provider
//             value={{ todoList, todoDelete, todoAdd, todoUpdate }}
//         >
//             {prop.children}
//         </TodoContext.Provider>
//     );
// };
const initTodoList = [
    {
        title: "Mua tr???ng, th???t, c?? cho c??? tu???n",
        completed: true,
        id: 1,
    },
    {
        title: "Mua rau c??? qu??? cho 4 ng??y",
        completed: true,
        id: 2,
    },
    {
        title: "????? x??ng tr?????c 15h c??? t??ng gi??",
        completed: true,
        id: 3,
    },
    {
        title: "Thay nh???t cho xe",
        completed: false,
        id: 4,
    },
    {
        title: "Mua 10 g??i m?? t??m (Kool, H???o H???o)",
        completed: true,
        id: 5,
    },
    {
        title: "Qu??t nh??, lau nh??",
        completed: false,
        id: 6,
    },
    {
        title: "Thay ga v?? v??? g???i, gi???t ch??n",
        completed: true,
        id: 7,
    },
    {
        title: "Gi???t ??o qu???n, kh??n t???m",
        completed: true,
        id: 8,
    },
    {
        title: "??n thi Ki???m th??? ph???n m???m",
        completed: false,
        id: 9,
    },
    {
        title: "Ho??n th??nh ch???c n??ng G???i th??ng b??o cho ????? ??n CNPM",
        completed: true,
        id: 10,
    },
    {
        title: "Build resume web b??? v??o CV ??i th???c t???p",
        completed: true,
        id: 11,
    },
    {
        title: "Thanh to??n ti???n ??i???n",
        completed: false,
        id: 12,
    },
    {
        title: "Nh???n ????n s???a t???m m???i tr??n Shopee",
        completed: true,
        id: 13,
    },
];

const TodoContextProvider = (prop) => {
    localStorage.setItem("todoList", JSON.stringify(initTodoList));
    const [todoList, setTodoList] = useState(
        JSON.parse(localStorage.getItem("todoList"))
    );

    const todoDelete = (id) => {
        setTodoList((prev) => prev.filter((item) => item.id !== id));
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    const todoAdd = (title, completed) => {
        setTodoList((prev) => [
            ...prev,
            { id: prev.length + 1, title, completed },
        ]);
        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    const todoUpdate = (id, updatedTodo) => {
        const index = id - 1;
        setTodoList((prev) => [
            ...prev.slice(0, index),
            { id: id, title: updatedTodo.title, completed: updatedTodo.completed },
            ...prev.slice(index + 1),
        ]);
        localStorage.setItem("todoList", JSON.stringify(todoList));
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
