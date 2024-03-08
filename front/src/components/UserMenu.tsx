import classes from './UserMenu.module.css';
import UserDetail from './UserDetail';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function UserMenu() {
  const [showUserCard, setShowUserCard] = useState<boolean>(false);
  const showUserCardHandler = (): void => {
    setShowUserCard((pV) => !pV);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
    }
  }, []);

  return (
    <div className={classes.user}>
      {showUserCard && <UserCard name="Sergio" userName="sergio@gmail.com" />}
      <button className={classes['user-btn']} onClick={showUserCardHandler}>
        <UserDetail name="Sergio" userName="sergio@gmail.com" />
        <div className={classes['user-option']}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </button>
    </div>
  );
}

export default UserMenu;
