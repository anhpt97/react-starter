import { useState } from 'react';

export const TodoList1 = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  // const [activeTodos, setActiveTodos] = useState([]);
  // const [visibleTodos, setVisibleTodos] = useState([]);
  // const [footer, setFooter] = useState(null);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  // useEffect(() => {
  //   setActiveTodos(todos.filter((todo) => !todo.completed));
  // }, [todos]);

  // useEffect(() => {
  //   setVisibleTodos(showActive ? activeTodos : todos);
  // }, [showActive, todos, activeTodos]);

  // useEffect(() => {
  //   setFooter(<footer>{activeTodos.length} todos left</footer>);
  // }, [activeTodos]);

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
      <NewTodo onAdd={(newTodo: any) => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      {/* {footer} */}
      <footer>{activeTodos.length} todos left</footer>
    </>
  );
};

const NewTodo = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleAddClick = () => {
    setText('');
    onAdd(createTodo(text));
  };

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</button>
    </>
  );
};

let nextId = 0;

const createTodo = (text: string, completed = false) => {
  return {
    id: nextId++,
    text,
    completed,
  };
};

const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
