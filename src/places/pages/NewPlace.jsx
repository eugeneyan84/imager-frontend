import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/Validators';
import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        elementOption="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please input a valid title"
      />
    </form>
  );
};

export default NewPlace;
