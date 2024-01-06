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
  const { formState, inputHandler } = useForm({
    email: { value: '', isValid: false },
    password: { value: '', isValid: false },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
      <h2>Account Login</h2>
      <hr />
      <form onSubmit={submitHandler}>
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
          type="passowrd"
          id="password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please provide a password"
          placeholder="Password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
