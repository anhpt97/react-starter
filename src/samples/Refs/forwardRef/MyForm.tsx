import { forwardRef, useRef } from 'react';

// const MyInput = (props: any) => {
//   return <input {...props} />;
// };

const MyInput = forwardRef((props: any, ref: any) => {
  return <input {...props} ref={ref} />;
});

export const MyForm = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
};
