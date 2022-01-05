import React, { useContext, useMemo } from 'react'
import { TodosContext } from '../context/TodosContext';

function TodoItemsRemaining() {

  const { todos } = useContext(TodosContext);

  function remainingCalculation() {
    return todos.filter(todo => !todo.is_complete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);


  return (
    <span>{remaining} items remaining</span>
  )
}

export default TodoItemsRemaining
