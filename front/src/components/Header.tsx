import logo from '../assets/logo-white.png';
import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faHouse,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import UserMenu from './UserMenu';
import { User } from '../store/usersSlice';

type Props = {
  user: User;
  onShowCreatePost: (show: boolean) => void;
};

const Header = ({ user, onShowCreatePost }: Props) => {
  return (
    <header className={classes.header}>
      <nav>
        <img src={logo} alt="logo image" />
        <ul>
          <li>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faHouse} />
            </div>
            <span>Home</span>
          </li>
          <li>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <span>Explore</span>
          </li>
          <li>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faUserGroup} />
            </div>
            <span>Community</span>
          </li>
          <li>
            <div className={classes.icon}>
              <img src={logo} alt="twifake icon" />
            </div>
            <span>Author</span>
          </li>
          <li>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span>Profile</span>
          </li>
        </ul>
        <button onClick={() => onShowCreatePost(true)}>Post</button>
      </nav>
      <UserMenu user={user} />
    </header>
  );
};

export default Header;
