import { useState, useEffect } from "react";
import "../../css/app.css";
import NoTodos from "./NoTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useQuery } from "react-query";

function App() {


  const [todos, setTodos] = useState([]);

  const [filter, setFilter] = useState("all");

  function todosFiltered() {
    if (filter === "all") {
      return todos;
    } else if (filter === "active") {
      return todos.filter((todo) => !todo.is_complete);
    } else if (filter === "completed") {
      return todos.filter((todo) => todo.is_complete);
    }
  }

  const {
    data: todosAPI,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery("todosAPI", fetchTodos);

  function fetchTodos(params) {

    return fetch("/api/todos").then((response) =>
      response.json()
    ).then((data) => setTodos(data));
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        todosFiltered,
        filter,
        setFilter,
      }}
    >
      <div className="todo-app">
        <h2>Todo List Application</h2>
        <TodoForm />

        {isLoading && <div>Loading...</div>}

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={todos.length > 0}
            timeout={300}
            classNames="slide-vertical"
            unmountOnExit
          >
            {todos.length > 0 ? <TodoList /> : <NoTodos />}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
