export const Button = () => {
  // const handleClick = () => {
  //   alert('You clicked me!');
  // };

  // return <button onClick={handleClick}>Click me</button>;
  return (
    <button
      onClick={() => {
        alert('You clicked me!');
      }}
    >
      Click me!
    </button>
  );
};
