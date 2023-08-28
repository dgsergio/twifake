import classes from './SidebarSections.module.css';

const TopSidebarSection = () => {
  return (
    <section className={classes.section}>
      <h3>Subscribe to Premium</h3>
      <p>
        Subscribe to unlock new features and if eligible, receive a share of ads
        revenue.
      </p>
      <button>Subscribe</button>
    </section>
  );
};

export default TopSidebarSection;
