import { useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators';
import './Login.css';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formState, inputHandler, setFormData } = useForm({
    email: { value: '', isValid: false },
    password: { value: '', isValid: false },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const toggleModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: '', isValid: false } },
        false
      );
    }
    setIsLoginMode((mode) => !mode);
  };

  return (
    <Card className="authentication">
      <h2>Account Login</h2>
      <hr />
      <form onSubmit={submitHandler}>
        {!isLoginMode && (
          <Input
            elementOption="input"
            id="name"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            placeholder="Name"
            errorText="Please provide a valid Name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          elementOption="input"
          type="email"
          label=""
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
          placeholder="Email address"
          errorText="Please provide a vaild email address"
        />
        <Input
          elementOption="input"
          type="password"
          id="password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please provide a password"
          placeholder="Password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
      <Button inverse onClick={toggleModeHandler}>
        Switch to {isLoginMode ? 'Sign Up' : 'Log In'}
      </Button>
    </Card>
  );
};

export default Login;
