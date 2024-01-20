import { useCallback, useEffect, useState } from 'react';

let authTimer;
const tokenRefreshDurationMilliseconds = 1000 * 60 * 60;

export const useAuth = () => {
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

  return { token, userId, login, logout };
};
