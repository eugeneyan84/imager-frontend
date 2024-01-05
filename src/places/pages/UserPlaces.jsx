import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import { TEST_PLACES } from '../../shared/util/Data';

const UserPlaces = () => {
  const userId = useParams().userId;
  const filteredPlaces = TEST_PLACES.filter(
    (place) => place.creator === userId
  );

  return <PlaceList items={filteredPlaces} />;
};

export default UserPlaces;
