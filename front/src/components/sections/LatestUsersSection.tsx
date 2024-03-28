import { useDispatch, useSelector } from 'react-redux';
import Member from '../Member';
import classes from './SidebarSections.module.css';
import { RootState } from '../../store';
import ButtonSecondary from '../UI/ButtonSecondary';
import { setShowMembers } from '../../store/usersSlice';

const LatestUsersSection = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const newUsers = [...users].reverse().slice(0, 3);
  const dispatch = useDispatch();

  return (
    <section id={classes['latest-members']} className={classes.section}>
      <h3 className={classes.latest}>Latest Members</h3>
      <div className={classes.follow}>
        {newUsers.map((user) => (
          <Member key={user._id} user={user} />
        ))}
      </div>
      <ButtonSecondary
        className={classes.more}
        onClick={() => dispatch(setShowMembers(true))}
      >
        Show More
      </ButtonSecondary>
    </section>
  );
};

export default LatestUsersSection;
