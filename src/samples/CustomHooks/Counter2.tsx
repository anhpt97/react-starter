import { useEffect, useState } from 'react';

const useCounter = (delay: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
};

export const Counter = () => {
  const [delay, setDelay] = useState(1000);
  const count = useCounter(delay);

  return (
    <>
      <label>
        Tick duration: {delay} ms
        <br />
        <input
          type="range"
          value={delay}
          min="10"
          max="2000"
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </label>
      <hr />
      <h1>Ticks: {count}</h1>
    </>
  );
};
