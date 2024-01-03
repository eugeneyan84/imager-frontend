import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

const FAKE_PLACES = [
  {
    id: 29420,
    title: 'Tokyo Tower',
    description:
      'The Tokyo Tower is a communications and observation tower in the Shiba-koen district of Minato, Tokyo, Japan, built in 1958.',
    imageUrl: 'https://i.imgur.com/44PDKWt.jpg',
    address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011, Japan',
    location: {
      lat: 35.65861,
      lng: 139.74556,
    },
    creator: 'u1',
  },
  {
    id: 79306,
    title: 'Metropol',
    description:
      'The Metropol, formerly Neues Schauspielhaus, at 5 Nollendorfplatz in the Schöneberg district of Berlin was built in 1905 as a theatre, with a separate concert hall above, in the then-fashionable Art Nouveau style.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Metropol_Berlin.jpg/1024px-Metropol_Berlin.jpg',
    address: 'Nollendorfpl. 5, 10777 Berlin, Germany',
    location: {
      lat: 52.498889,
      lng: 13.352778,
    },
    creator: 'u2',
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const filteredPlaces = FAKE_PLACES.filter(
    (place) => place.creator === userId
  );

  return <PlaceList items={filteredPlaces} />;
};

export default UserPlaces;
