import { User } from '../store/usersSlice';
import classes from './Member.module.css';
import UserDetail from './UserDetail';

const Member = ({ user }: { user: User }) => {
  return (
    <div className={classes.container}>
      <div className={classes.member}>
        <UserDetail user={user} />
      </div>
      <div>
        <button>Profil</button>
      </div>
    </div>
  );
};

export default Member;
