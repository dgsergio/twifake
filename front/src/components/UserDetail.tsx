import classes from './UserDetail.module.css';

export type UserDetailProps = {
  name: string;
  userName: string;
};

const UserDetail = (props: UserDetailProps) => {
  return (
    <>
      <div className={classes['user-content']}>
        <img src="https://i.ibb.co/9thsY3m/no-avatar.jpg" alt="user picture" />
        <div className={classes['user-text']}>
          <p>{props.name}</p>
          <p>{props.userName}</p>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
