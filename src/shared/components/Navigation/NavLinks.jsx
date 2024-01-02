import './NavLinks.css';
import { NavLink } from 'react-router-dom';

const NavLinks = ({}) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/a1/places">My Places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add New Place</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
