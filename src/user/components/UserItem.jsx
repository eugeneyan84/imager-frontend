import Avatar from '../../shared/UIElements/Avatar';
import './UserItem.css';

const UserItem = ({ item }) => {
  const { image, name, placeCount } = item;

  return (
    <li className="user-item">
      <div className="user-item__content">
        <div className="user-item__image">
          <Avatar image={image} alt={name} />
        </div>
        <div className="user-item__info">
          <h2>{name}</h2>
          <h3>
            {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
          </h3>
        </div>
      </div>
    </li>
  );
};

export default UserItem;