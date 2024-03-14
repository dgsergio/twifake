import { useSelector } from 'react-redux';
import Member from '../Member';
import classes from './SidebarSections.module.css';
import { RootState } from '../../store';

const FollowSidebarSection = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const newUsers = [...users].reverse().slice(3);

  return (
    <section className={classes.section}>
      <h3>Latest Members</h3>
      <div className={classes.follow}>
        {newUsers.map((user) => (
          <Member key={user._id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default FollowSidebarSection;
