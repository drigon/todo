import React, { useContext } from "react";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";
import useToggle from "./hooks/useToggle";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList() {

  const { todos, setTodos } = useContext(TodosContext);

  const { filter, todosFiltered } = useContext(TodosContext);

  const [isVisibleOne, setIsVisibleOne] = useToggle();
  const [isVisibleTwo, setIsVisibleTwo] = useToggle();

  function deleteTodo(id) {

    fetch("/api/delete-todo", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      method: "post",
      credentials: "same-origin",
      body: JSON.stringify({
        id: id
      })
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      setTodos([...todos].filter((todo) => todo.id !== id));
    });
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.is_complete = !todo.is_complete;
      }
      return todo;
    });

    fetch("/api/update-todo", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')

      },
      method: "put",
      credentials: "same-origin",
      body: JSON.stringify({
        id: id,
        is_complete: 'single'
      })
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function uppdateTodo(event, id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }

        fetch("/api/update-todo", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    
          },
          method: "put",
          credentials: "same-origin",
          body: JSON.stringify({
            id: id,
            title: event.target.value
          })
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          
        });
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <>
      <TransitionGroup component="ul" className="todo-list">
        {todosFiltered(filter).map((todo, index) => (
          <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
            <li className="todo-item-container">
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.is_complete ? true : false}
                />
                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${todo.is_complete ? "line-through" : ""
                      }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={(event) => uppdateTodo(event, todo.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        uppdateTodo(event, todo.id);
                      } else if (event.key === "Escape") {
                        cancelEdit(todo.id);
                      }
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="toggles-container">
        <button className="button" onClick={setIsVisibleOne}>
          Status
        </button>
        <button className="button" onClick={setIsVisibleTwo}>
          Filters
        </button>
      </div>
      <CSSTransition
        in={isVisibleOne}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="check-all-container">
          <TodoCompleteAll />

          <TodoItemsRemaining />
        </div>
      </CSSTransition>
      <CSSTransition
        in={isVisibleTwo}
        timeout={300}
        classNames="slide-vertical"
        unmountOnExit
      >
        <div className="other-buttons-container">
          <TodoFilters />
          <div>
            <TodoClearCompleted />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default TodoList;
