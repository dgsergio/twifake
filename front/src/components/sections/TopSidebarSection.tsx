import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SidebarSections.module.css';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const TopSidebarSection = () => {
  return (
    <section className={classes.section}>
      <h3>About this Proyect</h3>
      <p>
        This is a Twitter simulator app with limited features aimed at
        demonstrating and practicing the author's skills.
      </p>
      <p>Visit Pixel40's website to view the full portfolio. </p>
      <button>
        <a href="https://pixel40.com.ar" target="_blank">
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Visit full
          portfolio
        </a>
      </button>
    </section>
  );
};

export default TopSidebarSection;
