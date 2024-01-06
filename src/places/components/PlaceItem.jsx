import { useState } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import './PlaceItem.css';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

const PlaceItem = ({ place }) => {
  const { id, imageUrl, title, address, description, location } = place;

  const [showMap, setShowMap] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const openMap = () => {
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
  };

  const showDeleteConfirmationHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const cancelDeleteHandler = () => {
    setShowDeleteConfirmation(false);
  };

  const deleteHandler = () => {
    console.log('Deleting!');
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={location} zoom={15} />
        </div>
      </Modal>
      <Modal
        header="Delete Place"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={deleteHandler}>
              Delete
            </Button>
          </>
        }
        show={showDeleteConfirmation}
        onCancel={cancelDeleteHandler}
      >
        <p>
          Confirm to proceed with deletion of <strong>{title}</strong>?
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger onClick={showDeleteConfirmationHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
