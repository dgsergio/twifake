import logo from '../assets/logo-white.png';
import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimneyWindow,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const Header = () => {
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
      <div className={classes.footer}>
        <img src="https://i.ibb.co/9thsY3m/no-avatar.jpg" alt="user picture" />
        <div className={classes['footer-text']}>
          <p>Sergio</p>
          <p>sergio@gmail.com</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
