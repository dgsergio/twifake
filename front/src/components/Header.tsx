import logo from '../assets/logo-white.png';
import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimneyWindow,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import UserMenu from './UserMenu';
import { User } from '../store/usersSlice';

const Header = ({ user }: { user: User }) => {
  return (
    <header className={classes.header}>
      <nav>
        <img src={logo} alt="logo image" />
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faHouseChimneyWindow}
              className={classes.icon}
            />
            <span>Home</span>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={classes.icon}
            />
            <span>Explore</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} className={classes.icon} />
            <span>Profile</span>
          </li>
        </ul>
        <button>Post</button>
      </nav>
      <UserMenu user={user} />
    </header>
  );
};

export default Header;
