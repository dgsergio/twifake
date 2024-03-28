import { useSelector } from 'react-redux';
import Member from '../components/Member';
import { RootState } from '../store';
import classes from './Members.module.css';

function Members() {
  const { users } = useSelector((state: RootState) => state.users);
  return (
    <div className={classes.members}>
      {users.map((user) => (
        <Member key={user._id} user={user} className={classes.member} />
      ))}
    </div>
  );
}

export default Members;
