import { useCallback, useReducer } from 'react';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators';
import Button from '../../shared/components/FormElements/Button';
import './NewPlace.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      var formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  inputs: {
    title: { value: '', isValid: false },
    description: { value: '', isValid: false },
  },
  isValid: true,
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        elementOption="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please input a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        type="text"
        label="Description"
        elementOption="textarea"
        validators={[VALIDATOR_MINLENGTH(20)]}
        errorText="Please input a valid description (at least 20 characters)"
        onInput={inputHandler}
      />
      <Input
        id="address"
        type="text"
        label="Address"
        elementOption="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please input a valid address"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
