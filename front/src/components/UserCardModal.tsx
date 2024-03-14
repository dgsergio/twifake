import { useNavigate } from 'react-router-dom';
import { User, logout } from '../store/usersSlice';
import classes from './UserCardModal.module.css';
import UserDetail from './UserDetail';
import ModalSmall from './UI/ModalSmall';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

function UserCardModal({
  user,
  onToggleUserCard,
}: {
  user: User;
  onToggleUserCard: () => void;
}) {
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigator('/signin');
  };

  return (
    <ModalSmall onClick={onToggleUserCard} className={classes['user-card']}>
      <div className={classes['user-card-header']}>
        <UserDetail user={user} />
      </div>
      <div className={classes['user-card-body']}>
        <button>Manage your account</button>
        <button onClick={logoutHandler}>Log out</button>
      </div>
    </ModalSmall>
  );
}

export default UserCardModal;
