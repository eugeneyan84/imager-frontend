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
import { useEffect, useState } from 'react';
import Card from '../../shared/components/UIElements/Card';

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const { formState, inputHandler, setFormData } = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  //let targetPlace;
  useEffect(() => {
    const targetPlace = TEST_PLACES.find((place) => {
      return place.id === Number(placeId);
    });

    if (!targetPlace) {
      return (
        <div className="center">
          <Card>
            <h2>Could not find place!</h2>
          </Card>
        </div>
      );
    } else {
      console.log(targetPlace);
      setFormData({
        title: { value: targetPlace.title, isValid: true },
        description: { value: targetPlace.description, isValid: true },
        address: { value: targetPlace.address, isValid: true },
      });
    }
    setIsLoading(false);
  }, [placeId, setFormData]);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
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
        valid={formState.inputs.title.isValid}
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
