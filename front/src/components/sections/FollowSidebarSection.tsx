import Twitter from '../Twitter';
import classes from './SidebarSections.module.css';

const FollowSidebarSection = () => {
  return (
    <section className={classes.section}>
      <h3>Who to follow</h3>
      <div className={classes.follow}>
        <Twitter />
        <Twitter />
        <Twitter />
      </div>
    </section>
  );
};

export default FollowSidebarSection;
