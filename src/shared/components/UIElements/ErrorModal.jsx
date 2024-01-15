import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      header="Error Encountered"
      show={!!error}
      footer={<Button onClick={onClear}>OK</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
