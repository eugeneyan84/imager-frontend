import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input type="text" label="Title" elementOption="input" />
    </form>
  );
};

export default NewPlace;
