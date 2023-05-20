import { useEffect, useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onTick = () => {
      setCount((c) => c + 1);
    };

    // setInterval(onTick, 1000);
    const intervalId = setInterval(onTick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <h1>{count}</h1>;
};
