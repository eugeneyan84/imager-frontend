import { useReducer } from 'react';

import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return { ...state, value: action.payload, isValid: true };
    default:
      return state;
  }
};

const Input = ({
  elementOption,
  className,
  id,
  label,
  type,
  placeholder,
  rows,
  errorText,
}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
  });
  const changeHandler = (event) => {
    dispatch({ type: 'CHANGE', payload: event.target.value });
  };

  const element =
    elementOption === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={state.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={state.value}
      />
    );

  return (
    <div
      className={`form-control ${className} ${
        !state.isValid && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!state.isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
