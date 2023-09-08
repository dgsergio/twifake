import classes from './UserMenu.module.css';

function UserMenu() {
  return (
    <div className={classes.user}>
      <img src="https://i.ibb.co/9thsY3m/no-avatar.jpg" alt="user picture" />
      <div className={classes['user-text']}>
        <p>Sergio</p>
        <p>sergio@gmail.com</p>
      </div>
    </div>
  );
}

export default UserMenu;
