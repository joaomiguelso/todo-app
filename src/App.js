import React, { useState } from 'react';
import logo from './yoda.png';
import './App.css';

const ENTER_KEY = 'Enter';
const BACKSPACE_KEY = 'Backspace';

function App() {

  /**
   * When you initialize state using the useState Hook, you define two values: the getter and the setter. 
   * Todos is the state value itself, and setTodos is the function that updates the state value.
   */

  const [todos, setTodos] = useState([
    {
      content: 'Build a todo app in React',
      isCompleted: true,
    },
    {
      content: 'Practice Guitar',
      isCompleted: false,
    },
    {
      content: 'Get haircut',
      isCompleted: false,
    },
    {
      content: 'Cycle',
      isCompleted: false,
    },
  ]);

  /**
   * onKeyDown calls a function called handleKeyDown. 
   * It passes in the input’s event and the index of the todo. 
   * Inside of handleKeyDown, we detect if the return key is pressed. 
   * If it is, we call createTodoAtIndex.
   */

  function handleKeyDown(e, i) {
    if (e.key === ENTER_KEY) {
      createTodoAtIndex(e, i);
    }

    if (e.key === BACKSPACE_KEY && todos[i].content === '') {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }

  /**
   * We begin by detecting if the Return key is pressed by checking the value of event.key.
    * Next, we create a copy of the todos state array. We do this because state should never be directly mutated (modified).
    * Using the copy of todos, we insert a new empty todo after the currently selected todo. That’s why we needed to pass in the current todo index into this function.
    * After inserting the new todo into our todos copy, we update the original todos array with the copy.
    * Finally, we set the focus to the new input field.
   */

  function createTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function updateTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }

  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="yoda" alt="yoda" />
      </div>
      <form className="todo-list">
        <h1>Do or do not... There is no try.</h1>
        <h3> - Master Yoda</h3>
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
              <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;