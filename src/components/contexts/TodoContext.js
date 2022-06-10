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
        title: "Mua trứng, thịt, cá cho cả tuần",
        completed: true,
        id: 1,
    },
    {
        title: "Mua rau củ quả cho 4 ngày",
        completed: true,
        id: 2,
    },
    {
        title: "Đổ xăng trước 15h cả tăng giá",
        completed: true,
        id: 3,
    },
    {
        title: "Thay nhớt cho xe",
        completed: false,
        id: 4,
    },
    {
        title: "Mua 10 gói mì tôm (Kool, Hảo Hảo)",
        completed: true,
        id: 5,
    },
    {
        title: "Quét nhà, lau nhà",
        completed: false,
        id: 6,
    },
    {
        title: "Thay ga và vỏ gối, giặt chăn",
        completed: true,
        id: 7,
    },
    {
        title: "Giặt áo quần, khăn tắm",
        completed: true,
        id: 8,
    },
    {
        title: "Ôn thi Kiểm thử phần mềm",
        completed: false,
        id: 9,
    },
    {
        title: "Hoàn thành chức năng Gửi thông báo cho Đồ án CNPM",
        completed: true,
        id: 10,
    },
    {
        title: "Build resume web bỏ vào CV đi thực tập",
        completed: true,
        id: 11,
    },
    {
        title: "Thanh toán tiền điện",
        completed: false,
        id: 12,
    },
    {
        title: "Nhận đơn sữa tắm mới trên Shopee",
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
