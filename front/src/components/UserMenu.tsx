import classes from './UserMenu.module.css';
import UserDetail from './UserDetail';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserCard from './UserCard';

function UserMenu() {
  return (
    <div className={classes.user}>
      <UserCard name="Sergio" userName="sergio@gmail.com" />
      <button className={classes['user-btn']}>
        <UserDetail name="Sergio" userName="sergio@gmail.com" />
        <div className={classes['user-option']}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </button>
    </div>
  );
}

export default UserMenu;
