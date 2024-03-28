import { useNavigate } from 'react-router-dom';
import { User } from '../store/usersSlice';
import classes from './Member.module.css';
import UserDetail from './UserDetail';
import ButtonSecondary from './UI/ButtonSecondary';

type Props = { user: User; className?: string };

const Member = ({ user, className }: Props) => {
  const navigate = useNavigate();
  const allClasses = className
    ? `${classes.container} ${className}`
    : classes.container;

  return (
    <ButtonSecondary
      onClick={() => navigate('/' + user.name)}
      className={allClasses}
    >
      <div className={classes.member}>
        <UserDetail user={user} />
      </div>
      <div className={classes.profile}>Profil</div>
    </ButtonSecondary>
  );
};

export default Member;
