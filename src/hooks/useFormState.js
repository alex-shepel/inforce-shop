import { useState } from 'react';

const useFormState = inputs => {
  const initialState = inputs.reduce((acc, input) => {
    acc[input.key] = input.value;
    return acc;
  }, {});

  const [state, setState] = useState(initialState);

  const set = (key, value) => setState({ ...state, [key]: value });
  const clear = () => setState({ ...initialState });

  return [state, set, clear];
};

export default useFormState;
