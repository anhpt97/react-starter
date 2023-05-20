/* eslint-disable no-console */
import { useEffect, useState } from 'react';

export const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(
    () => {
      console.log('✅ Creating an interval');
      const id = setInterval(() => {
        console.log('⏰ Interval tick');
        // setCount(count + 1);
        setCount((c) => c + 1);
      }, 1000);
      return () => {
        console.log('❌ Clearing an interval');
        clearInterval(id);
      };
    },
    [] /* [count] */
  );

  return <h1>Counter: {count}</h1>;
};
