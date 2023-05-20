import { useState } from 'react';

export const Scoreboard = () => {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {/* {isPlayerA ? <Counter person="Taylor" /> : <Counter person="Sarah" />} */}
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button
        onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}
      >
        Next player!
      </button>
    </div>
  );
};

const Counter = ({ person }) => {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  const className = hover ? 'counter' : 'counter hover';

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person}'s score: {score}
      </h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
};
