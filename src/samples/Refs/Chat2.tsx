import { useRef, useState } from 'react';

export const Chat = () => {
  const [text, setText] = useState('');
  // Add
  const textRef = useRef(text);

  // Add
  const handleChange = (e: any) => {
    setText(e.target.value);
    textRef.current = e.target.value;
  };

  const handleSend = () => {
    setTimeout(() => {
      // alert('Sending: ' + text);
      alert('Sending: ' + textRef.current);
    }, 3000);
  };

  return (
    <>
      <input
        value={text}
        // onChange={(e) => setText(e.target.value)}
        onChange={handleChange}
      />
      <button onClick={handleSend}>Send</button>
    </>
  );
};
