import Avatar from '../../shared/components/UIElements/Avatar';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import './UserItem.css';

const UserItem = ({ item }) => {
  console.log(item);
  const { id, imageUrl, name, places } = item;
  const placeCount = places.length;
  const finalImageUrl = imageUrl.startsWith('http')
    ? imageUrl
    : import.meta.env.VITE_BACKEND_HOSTNAME + '/' + imageUrl;

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={finalImageUrl} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
