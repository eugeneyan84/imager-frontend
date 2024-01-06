import { useContext } from 'react';
import './NavLinks.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Button from '../FormElements/Button';

const NavLinks = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          All Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/a1/places">My Places</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add New Place</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button onClick={logout}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
