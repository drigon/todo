import React, { useContext } from 'react'
import { TodosContext } from '../context/TodosContext';

function TodoClearCompleted() {

  const { todos, setTodos } = useContext(TodosContext);

  function clearCompleted() {

    //setTodos([...todos].filter(todo => !todo.is_complete));

    const updatedTodos = todos.map(todo => {

      if (todo.is_complete == true) {
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
            id: todo.id
          })
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          
        });
      }      
    });

    setTodos([...todos].filter(todo => !todo.is_complete));
  }

  return (
    <button className="button" onClick={clearCompleted}>Clear completed</button>
  )
}

export default TodoClearCompleted
