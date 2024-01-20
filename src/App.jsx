import { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Login from './user/pages/Login';
import { AuthContext } from './shared/context/authContext';

let authTimer;
const tokenRefreshDurationMilliseconds = 1000 * 60 * 60;

const App = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(null);
  const [expirationTimestamp, setExpirationTimestamp] = useState();

  const login = useCallback((userId, token, expiryTimestamp) => {
    console.log(`[login] expiryTimestamp: ${expiryTimestamp}`);
    setToken(token);
    setUserId(userId);
    const tokenExpiration =
      expiryTimestamp ||
      new Date().getTime() + tokenRefreshDurationMilliseconds;
    setExpirationTimestamp(tokenExpiration);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,
        token: token,
        expiryTimestamp: tokenExpiration,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setExpirationTimestamp(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiryTimestamp) > new Date()
    ) {
      login(storedData.userId, storedData.token, storedData.expiryTimestamp);
    }
  }, [login]);

  useEffect(() => {
    if (token && expirationTimestamp) {
      const timeDelta = expirationTimestamp - new Date().getTime();
      console.log(
        `setting timeout on logout function, delta: ${timeDelta}, ${
          timeDelta / 1000
        }s`
      );
      authTimer = setTimeout(logout, timeDelta);
    } else {
      clearTimeout(authTimer);
    }
  }, [token, logout, expirationTimestamp]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route index element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route index element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        userId: userId,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
