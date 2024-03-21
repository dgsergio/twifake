import { useNavigate } from 'react-router-dom';
import { User } from '../store/usersSlice';
import classes from './Member.module.css';
import UserDetail from './UserDetail';
import ButtonSecondary from './UI/ButtonSecondary';

const Member = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  return (
    <ButtonSecondary
      onClick={() => navigate('/' + user.name)}
      className={classes.container}
    >
      <div className={classes.member}>
        <UserDetail user={user} />
      </div>
      <div className={classes.profile}>Profil</div>
    </ButtonSecondary>
  );
};

export default Member;
