import { useState } from 'react';

const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e: any) => {
      setValue(e.target.value);
    },
  };
};

export const Form = () => {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p>
        <b>
          Good morning, {firstNameProps.value} {lastNameProps.value}.
        </b>
      </p>
    </>
  );
};
