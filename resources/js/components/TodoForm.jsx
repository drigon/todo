import React, { useContext, useState, useRef, useEffect } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoForm() {
  const nameInputEl = useRef(null);

  const { todos, setTodos } = useContext(TodosContext);

  const [todoInput, setTodoInput] = useState("");

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    if (todoInput.trim().length <= 60) {
      const isUnique = todos.some((el) => el.title === todoInput);

      if (isUnique === false) {
        fetch("/api/new-todo", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          },
          method: "post",
          credentials: "same-origin",
          body: JSON.stringify({
            title: todoInput
          })
        }).then(function(response){
          return response.json();
        }).then(function(json){
          setTodos(
            [
              ...todos,
              json
            ].sort((a, b) => b.id - a.id)
          );
      });
        setTodoInput("");
      }
    }
  }

  useEffect(() => {
    nameInputEl.current.focus();
  }, []);

  return (
    <>
      <form action="#" onSubmit={addTodo}>
        <input
          type="text"
          value={todoInput}
          onChange={handleInput}
          className="todo-input"
          placeholder="What do you need to do?"
          ref={nameInputEl}
          maxLength={60}
        />
      </form>
      <div className="input-counter-words">{todoInput.length} / 60</div>
    </>
  );
}

export default TodoForm;
