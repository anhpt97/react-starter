import { useRef } from 'react';

// let timeoutID: string | number | NodeJS.Timeout;

const DebouncedButton = ({ onClick, children }) => {
  const timeoutRef = useRef(null);

  return (
    <button
      onClick={() => {
        // clearTimeout(timeoutID);
        clearTimeout(timeoutRef.current);
        // timeoutID = setTimeout(() => {
        //   onClick();
        // }, 1000);
        timeoutRef.current = setTimeout(() => {
          onClick();
        }, 1000);
      }}
    >
      {children}
    </button>
  );
};

export const Dashboard = () => {
  return (
    <>
      <DebouncedButton onClick={() => alert('Spaceship launched!')}>
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton onClick={() => alert('Soup boiled!')}>
        Boil the soup
      </DebouncedButton>
      <DebouncedButton onClick={() => alert('Lullaby sung!')}>
        Sing a lullaby
      </DebouncedButton>
    </>
  );
};
