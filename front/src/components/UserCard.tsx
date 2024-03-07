import classes from './UserCard.module.css';
import UserDetail from './UserDetail';
import { UserDetailProps } from './UserDetail';

function UserCard(props: UserDetailProps) {
  return (
    <>
      <div className={`${classes.backdrop} hide`} />
      <div className={classes['user-card']}>
        <div className={classes['user-card-header']}>
          <UserDetail name={props.name} userName={props.userName} />
        </div>
        <div className={classes['user-card-body']}>
          <button>Manage your account</button>
          <button>Log out</button>
        </div>
      </div>
    </>
  );
}

export default UserCard;
