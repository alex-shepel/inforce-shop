import { useState } from 'react';

const useFormState = keys => {
  const initialState = keys.reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});

  const [state, setState] = useState(initialState);

  const set = (key, value) => setState({ ...state, [key]: value });
  const clear = keys => {
    const cleanedProps = keys.reduce((acc, key) => {
      if (state.hasOwnProperty(key)) {
        acc[key] = '';
      }
      return acc;
    }, {});
    setState({ ...state, ...cleanedProps });
  };

  return [state, set, clear];
};

export default useFormState;

