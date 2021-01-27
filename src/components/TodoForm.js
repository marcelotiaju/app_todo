import React, { useState, useEffect, useRef } from 'react';
import todoapi from '../services/todo';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      id: props.id,
      name: input
    });
    if(input === '')
      return;
    if(!props.edit) {
    todoapi.post(`/todo/`, {name: input})
    .then((response) => {
      //console.log(response.data);
    })
    .catch((e) => {
        console.log(e);
    }) 
  } else {
    //setInput(e.target.value);
    todoapi.put(`/todo/${props.id}`, {name: input})
    .then((response) => {
      //console.log(response.data);
    })
    .catch((e) => {
        console.log(e);
    }) 
  }
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Altere sua tarefa'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Alterar
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Adicione uma Tarefa'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Adicionar
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
