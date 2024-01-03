import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Jackie Welles',
      image: 'https://i.imgur.com/zxlrGXD.png',
      placeCount: 1,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
