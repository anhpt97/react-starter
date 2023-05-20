/* eslint-disable no-console */
import { useMemo, useState } from 'react';

export const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');
  // const [visibleTodos, setVisibleTodos] = useState([]);

  // useEffect(() => {
  //   setVisibleTodos(getVisibleTodos(todos, showActive));
  // }, [todos, showActive]);

  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, showActive),
    [todos, showActive]
  );

  const handleAddClick = () => {
    setText('');
    setTodos([...todos, createTodo(text)]);
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</button>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
};

let nextId = 0;
let calls = 0;

const getVisibleTodos = (todos: any, showActive: boolean) => {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter((todo: any) => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
};

const createTodo = (text: string, completed = false) => {
  return {
    id: nextId++,
    text,
    completed,
  };
};

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
