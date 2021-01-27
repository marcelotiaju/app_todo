import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import todoapi from '../services/todo';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  useEffect(() => {
    listTodos();
}, [todos])

  async function listTodos(){
    await todoapi.get("/todo")
     .then((response) => {
       setTodos(response.data);
     })
     .catch((e) => {
         console.log(e);
     }) 
    }

  const addTodo = todo => {
    if (todo.name === null) {
      return;
    }
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.name || /^\s*$/.test(newValue.name)) {
      return;
    }
  };

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} id={edit.id} onSubmit={submitUpdate} />;
  }

  const removeTodo = id => {
    todoapi.delete(`/todo/${id}`)
    .then((response) => {
    })
    .catch((e) => {
        console.log(e);
    }) 
  };

  const completeTodo = (id,complete) => {
    complete = !complete;
    todoapi.put(`/todo/${id}`,{complete})
    .then((response) => {
    })
    .catch((e) => {
        console.log(e);
    }) 
  };

  return (
    <>
      <h1>Lista de Tarefas</h1>
      <TodoForm onSubmit={addTodo} />
      {todos.map((todo, index) => 
      <div
        className={todo.complete ? 'todo-row complete' : 'todo-row'}
        key={index}
      >
      <div key={todo.id} onClick={() => completeTodo(todo.id,todo.complete)}>
        {todo.name}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.name })}
          className='edit-icon'
        />
      </div>
     </div>
  )};

    </>
  );
}

export default TodoList;
