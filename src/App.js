import "./App.scss";
import TodoContextProvider from "./components/contexts/TodoContext";
import TodoList from "./components/todo/TodoList";

function App() {
    return (
        <div className="App">
            <TodoContextProvider>
                <TodoList></TodoList>
            </TodoContextProvider>
        </div>
    );
}

export default App;
