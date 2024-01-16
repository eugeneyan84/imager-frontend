import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useApi } from '../../shared/hooks/useApi';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useApi();

  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest('/api/users');

        setUsers(response.users);
      } catch (error) {
        console.error(error);
      }
    };
    request();
  }, [sendRequest]);

  /*   useEffect(() => {
    const sendRequest2 = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_HOSTNAME}/api/users`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    sendRequest2();
  }, []);

  const errorHandler = () => {
    setError(null);
  }; */

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </>
  );
};

export default Users;
