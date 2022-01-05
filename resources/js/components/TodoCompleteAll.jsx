import React, { useContext } from 'react'
import { TodosContext } from '../context/TodosContext';

function TodoCompleteAll() {

  const { todos, setTodos } = useContext(TodosContext);

  function completeAllTodos() {
    const updatedTodos = todos.map(todo => { 
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
          id: todo.id,
          is_complete: 'all'
        })
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
      });
      todo.is_complete = true;
    return todo;
  });

  setTodos(updatedTodos);
  }

  return (
    <div>
      <div className="button" onClick={completeAllTodos}>Check All</div>
    </div>
  )
}

export default TodoCompleteAll
