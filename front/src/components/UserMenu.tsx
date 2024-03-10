import classes from './UserMenu.module.css';
import UserDetail from './UserDetail';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserCardModal from './UserCardModal';
import { useState } from 'react';
import { User } from '../store/usersSlice';

function UserMenu({ user }: { user: User }) {
  const [showUserCard, setShowUserCard] = useState<boolean>(false);

  const showUserCardHandler = (): void => {
    setShowUserCard((pV) => !pV);
  };

  return (
    <div className={classes.user}>
      {showUserCard && (
        <UserCardModal user={user} onToggleUserCard={showUserCardHandler} />
      )}
      <button className={classes['user-btn']} onClick={showUserCardHandler}>
        <UserDetail user={user} />
        <div className={classes['user-option']}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </button>
    </div>
  );
}

export default UserMenu;
