import { useState } from 'react';

export const SyncedInputs = () => {
  const [text, setText] = useState('');

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  return (
    <>
      <Input label="First input" value={text} onChange={handleChange} />
      <Input label="Second input" value={text} onChange={handleChange} />
    </>
  );
};

const Input = ({ label, value, onChange }) => {
  return (
    <label>
      {label} <input value={value} onChange={onChange} />
    </label>
  );
};
