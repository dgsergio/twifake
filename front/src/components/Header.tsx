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
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setPostManager } from '../store/postsSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
  user: User;
};

const Header = ({ user }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedUser } = useSelector((state: RootState) => state.users);

  const createPostHandler = () => {
    dispatch(setPostManager({ show: true, postId: '' }));
  };

  return (
    <header className={classes.header}>
      <nav>
        <img src={logo} alt="logo image" />
        <ul>
          <li onClick={() => navigate('/')}>
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
          <li onClick={() => navigate('/' + loggedUser.name)}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span>Profile</span>
          </li>
        </ul>
        <button onClick={createPostHandler}>Post</button>
      </nav>
      <UserMenu user={user} />
    </header>
  );
};

export default Header;
