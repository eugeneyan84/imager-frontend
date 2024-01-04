import { useReducer } from 'react';

import './Input.css';
import { validate } from '../../util/Validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    case 'TOUCH':
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const INITIAL_STATE = { value: '', isValid: false, isTouched: false };

const Input = ({
  elementOption,
  className,
  id,
  label,
  type,
  placeholder,
  rows,
  errorText,
  validators,
}) => {
  const [state, dispatch] = useReducer(inputReducer, INITIAL_STATE);
  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      payload: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {};

  const element =
    elementOption === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={state.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={state.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`form-control ${className} ${
        !state.isValid && state.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!state.isValid && state.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
