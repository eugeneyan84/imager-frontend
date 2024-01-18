import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators';
import Button from '../../shared/components/FormElements/Button';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/useForm';
import { useApi } from '../../shared/hooks/useApi';
import { AuthContext } from '../../shared/context/authContext';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const NewPlace = () => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useApi();

  const { formState, inputHandler } = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    //console.log(formState.inputs);
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('/api/places', 'POST', formData);
      // redirect to another page
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          center
          id="image"
          onFileInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
