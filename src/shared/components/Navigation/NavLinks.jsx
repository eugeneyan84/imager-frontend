import { useContext } from 'react';
import './NavLinks.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const NavLinks = () => {
  const { isLoggedIn } = useContext(AuthContext);

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
    </ul>
  );
};

export default NavLinks;
