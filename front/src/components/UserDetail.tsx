import { User } from '../store/usersSlice';
import classes from './UserDetail.module.css';

const UserDetail = ({ user }: { user: User }) => {
  return (
    <>
      <div className={classes['user-content']}>
        <img src={user.perfilUrl} alt="user picture" />
        <div className={classes['user-text']}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
