import { useState } from 'react';

export const Counter = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          // + 1
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);

          /* + 3
            setNumber((n) => n + 1);
            setNumber((n) => n + 1);
            setNumber((n) => n + 1);
          */

          /* + 2
            setNumber((n) => n + 1);
            setNumber(number + 1);
            setNumber((n) => n + 1);
          */

          /* + 1
            setNumber((n) => n + 1);
            setNumber((n) => n + 1);
            setNumber(number + 1);
          */

          /* 42
            setNumber((n) => n + 1);
            setNumber((n) => n + 1);
            setNumber(42);
          */
        }}
      >
        +3
      </button>
    </>
  );
};
