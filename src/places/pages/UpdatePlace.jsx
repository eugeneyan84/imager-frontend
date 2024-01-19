import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from '../../shared/hooks/useForm';
import { useEffect, useState, useContext } from 'react';

import './PlaceForm.css';
import { TEST_PLACES } from '../../shared/util/Data';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useApi } from '../../shared/hooks/useApi';
import { AuthContext } from '../../shared/context/authContext';

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useApi();
  const navigate = useNavigate();
  const { userId, token } = useContext(AuthContext);
  const [place, setPlace] = useState();
  //const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const { formState, inputHandler, setFormData } = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await sendRequest(`/api/places/${placeId}`);

      setPlace(response.place);
      setFormData({
        title: { value: response.place.title, isValid: true },
        description: { value: response.place.description, isValid: true },
        address: { value: response.place.address, isValid: true },
      });
    };

    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    //console.log(formState.inputs);
    await sendRequest(
      `/api/places/${placeId}`,
      'PATCH',
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
      { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    );
    navigate(`/${userId}/places`);
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!place && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  /* useEffect(() => {
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
  }, [placeId, setFormData]); */

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && place && (
        <form className="place-form" onSubmit={submitHandler}>
          <Input
            id="title"
            elementOption="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={place.title}
            valid={true}
          />
          <Input
            id="description"
            elementOption="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(20)]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
            initialValue={place.description}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
