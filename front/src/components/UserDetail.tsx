import { User } from '../store/usersSlice';
import classes from './UserDetail.module.css';
import noAvatar from '../assets/no-avatar.jpg';

type Props = { user: User; className?: string };

const UserDetail = ({ user, className }: Props) => {
  const allClasses = className
    ? `${className} ${classes['user-content']}`
    : classes['user-content'];

  return (
    <>
      <div className={allClasses}>
        <img src={user.profileUrl || noAvatar} alt="user picture" />
        <div className={classes['user-text']}>
          <p>{user.displayName}</p>
          <p>@{user.name}</p>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
