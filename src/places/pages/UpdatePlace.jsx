import { useParams } from 'react-router-dom';
import './PlaceForm.css';
import { TEST_PLACES } from '../../shared/util/Data';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/useForm';

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const targetPlace = TEST_PLACES.find((place) => {
    return place.id === Number(placeId);
  });

  const { formState, inputHandler } = useForm(
    {
      title: { value: targetPlace.title, isValid: true },
      description: { value: targetPlace.description, isValid: true },
      address: { value: targetPlace.address, isValid: true },
    },
    false
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!targetPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  } else {
    console.log(targetPlace);
  }

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <Input
        id="title"
        elementOption="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        valid={true}
      />
      <Input
        id="description"
        elementOption="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(20)]}
        errorText="Please enter a valid description."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
