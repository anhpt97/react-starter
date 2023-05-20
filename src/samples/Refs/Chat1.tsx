import { useRef, useState } from 'react';

export const Chat = () => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  // let timeoutID = null;
  const timeoutRef = useRef(null);

  const handleSend = () => {
    setIsSending(true);
    // timeoutID = setTimeout(() => {
    //   alert('Sent!');
    //   setIsSending(false);
    // }, 3000);
    timeoutRef.current = setTimeout(() => {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  };

  const handleUndo = () => {
    setIsSending(false);
    // clearTimeout(timeoutID);
    clearTimeout(timeoutRef.current);
  };

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button disabled={isSending} onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending && <button onClick={handleUndo}>Undo</button>}
    </>
  );
};
