import { useNavigate } from 'react-router-dom';
import { User } from '../store/usersSlice';
import classes from './Member.module.css';
import UserDetail from './UserDetail';

const Member = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.member}>
        <UserDetail user={user} />
      </div>
      <div>
        <button onClick={() => navigate('/' + user.name)}>Profil</button>
      </div>
    </div>
  );
};

export default Member;
