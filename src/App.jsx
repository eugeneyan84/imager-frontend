import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';

//import Users from './user/pages/Users';
//import NewPlace from './places/pages/NewPlace';
//import UserPlaces from './places/pages/UserPlaces';
//import UpdatePlace from './places/pages/UpdatePlace';
//import Login from './user/pages/Login';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/authContext';
import { useAuth } from './shared/hooks/useAuth';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = lazy(() => {
  return import('./user/pages/Users');
});

const NewPlace = lazy(() => {
  return import('./places/pages/NewPlace');
});

const UserPlaces = lazy(() => {
  return import('./places/pages/UserPlaces');
});

const UpdatePlace = lazy(() => {
  return import('./places/pages/UpdatePlace');
});

const Login = lazy(() => {
  return import('./user/pages/Login');
});

const App = () => {
  const { token, userId, login, logout } = useAuth();

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
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
