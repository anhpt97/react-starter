import { useEffect, useState } from 'react';

const useInterval = (onTick: () => void, delay: number) => {
  useEffect(() => {
    const id = setInterval(onTick, delay);
    return () => clearInterval(id);
  }, [onTick, delay]);
};

const useCounter = (delay: number) => {
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount((c) => c + 1);
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, []);
  useInterval(() => {
    setCount((c) => c + 1);
  }, delay);

  return count;
};

export const Counter = () => {
  // const count = useCounter();
  const count = useCounter(1000);

  return <h1>Seconds passed: {count}</h1>;
};
