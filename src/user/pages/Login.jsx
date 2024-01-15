import { useContext, useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators';
import './Login.css';
import { AuthContext } from '../../shared/context/authContext';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useApi } from '../../shared/hooks/useApi';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState();

  const { isLoading, error, sendRequest, clearError } = useApi();

  const { formState, inputHandler, setFormData } = useForm({
    email: { value: '', isValid: false },
    password: { value: '', isValid: false },
  });
  const authContext = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const response = await sendRequest(
          `${import.meta.env.VITE_BACKEND_HOSTNAME}/api/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        console.log(response.user);
        authContext.login(response.user.id);
      } catch (error) {
        // do not process further, as error handling is done in useApi
        console.error(error.message);
      }
    } else {
      try {
        const response = await sendRequest(
          `${import.meta.env.VITE_BACKEND_HOSTNAME}/api/users/signup`,
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        authContext.login(response.user.id);
      } catch (error) {
        console.error(error);
      }
    }
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
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};

export default Login;
