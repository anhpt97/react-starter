import { createContext, useContext, useReducer, useState } from 'react';

enum ACTION_TYPE {
  ADDED = 'ADDED',
  CHANGED = 'CHANGED',
  DELETED = 'DELETED',
}

interface Action {
  type: ACTION_TYPE;
  [key: string]: any;
}

interface Task {
  id: number;
  text: string;
  done: boolean;
}

const TaskContext = createContext(null);
const TaskDispatchContext = createContext(null);
let nextTaskId = 3;

const AddTask = () => {
  const [text, setText] = useState('');
  const dispatch = useContext(TaskDispatchContext);

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          dispatch({
            type: ACTION_TYPE.ADDED,
            id: nextTaskId++,
            text,
          });
        }}
      >
        Add
      </button>
    </>
  );
};

const TaskList = () => {
  const tasks = useContext(TaskContext);

  return (
    <ul>
      {tasks.map((task: Task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(TaskDispatchContext);

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: ACTION_TYPE.CHANGED,
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {isEditing ? (
        <>
          <input
            value={task.text}
            onChange={(e) => {
              dispatch({
                type: ACTION_TYPE.CHANGED,
                task: {
                  ...task,
                  text: e.target.value,
                },
              });
            }}
          />
          <button onClick={() => setIsEditing(false)}>Save</button>
        </>
      ) : (
        <>
          {task.text}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button
        onClick={() => {
          dispatch({
            type: ACTION_TYPE.DELETED,
            taskId: task.id,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
};

export const TaskApp = () => {
  const initialTasks: Task[] = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
  ];

  const tasksReducer = (tasks: Task[], action: Action) => {
    switch (action.type) {
      case ACTION_TYPE.ADDED:
        return [
          ...tasks,
          {
            id: action.id,
            text: action.text,
            done: false,
          },
        ];
      case ACTION_TYPE.CHANGED:
        return tasks.map((task) =>
          task.id === action.task.id ? action.task : task
        );
      case ACTION_TYPE.DELETED:
        return tasks.filter((task) => task.id !== action.taskId);
      default:
        throw Error('Unknown action: ' + String(action.type));
    }
  };

  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatchContext.Provider value={dispatch}>
        <h1>Prague itinerary</h1>
        <AddTask />
        <TaskList />
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
};
