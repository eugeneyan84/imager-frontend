import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { TEST_PLACES } from '../../shared/util/Data';
import { useApi } from '../../shared/hooks/useApi';
import { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const [places, setPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useApi();
  const userId = useParams().userId;

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await sendRequest(`/api/places/user/${userId}`);
        setPlaces(response.places);
      } catch (error) {
        console.error(error);
      }
    };
    getPlaces();
  }, [sendRequest, userId]);

  const deletePlaceHandler = (placeId) => {
    setPlaces((places) => places.filter((p) => p.id !== placeId));
  };

  /*   const filteredPlaces = TEST_PLACES.filter(
    (place) => place.creator === userId
  ); */

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && places && (
        <PlaceList items={places} onDeletePlace={deletePlaceHandler} />
      )}
    </>
  );
};

export default UserPlaces;
