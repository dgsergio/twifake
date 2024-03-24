import classes from './Profile.module.css';
import HeaderProfile from '../components/profile/HeaderProfile';

function ProfileNotFound({ userName }: { userName: string }) {
  return (
    <>
      <HeaderProfile userName="Profile" nPost={0} />
      <div className={classes.content}>
        <div className={classes.banner} />
        <div className={classes.body}>
          <div className={classes.row}>
            <div className={classes.profile}>
              <div className={classes['profile-img']} />
            </div>
          </div>
          <div className={classes.column}>
            <h3>@{userName}</h3>
            <div className={classes['not-exist']}>
              <p>This account doesn’t exist</p>
              <span>Try searching for another.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileNotFound;
