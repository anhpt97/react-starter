/* eslint-disable no-console */
import { useState } from 'react';

export const Form = () => {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   if (!showForm) {
  //     sendMessage(message);
  //   }
  // }, [showForm, message]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowForm(false);

    // Add
    sendMessage(message);
  };

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <button
          onClick={() => {
            setMessage('');
            setShowForm(true);
          }}
        >
          Open chat
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ''}>
        Send
      </button>
    </form>
  );
};

const sendMessage = (message: string) => {
  console.log('Sending message: ' + message);
};
