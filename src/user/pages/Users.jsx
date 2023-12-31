import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'a1',
      name: 'Jackie Welles',
      image: 'https://i.imgur.com/zxlrGXD.png',
      placeCount: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
