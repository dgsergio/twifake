import { useNavigate } from 'react-router-dom';
import { User } from '../store/usersSlice';
import classes from './UserCard.module.css';
import UserDetail from './UserDetail';

function UserCard({
  user,
  onToggleUserCard,
}: {
  user: User;
  onToggleUserCard: () => void;
}) {
  const navigator = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigator('/signin');
  };

  return (
    <>
      <div className={`${classes.backdrop}`} onClick={onToggleUserCard} />
      <div className={classes['user-card']}>
        <div className={classes['user-card-header']}>
          <UserDetail user={user} />
        </div>
        <div className={classes['user-card-body']}>
          <button>Manage your account</button>
          <button onClick={logoutHandler}>Log out</button>
        </div>
      </div>
    </>
  );
}

export default UserCard;
