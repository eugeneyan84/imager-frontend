import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  const renderedItems = items.map((item) => {
    return <UserItem key={item.id} item={item} />;
  });

  return <ul className="users-list">{renderedItems}</ul>;
};

export default UsersList;
