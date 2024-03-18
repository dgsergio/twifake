import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import classes from './Sidebar.module.css';
import TopSidebarSection from './sections/TopSidebarSection';
import LatestUsersSection from './sections/LatestUsersSection';

function Sidebar() {
  return (
    <aside className={classes.sidebar}>
      <div className={classes.search}>
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={classes['zoom-icon']}
        />
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={classes['x-icon']}
          style={{ color: '#1d9bf0' }}
        />
      </div>
      <TopSidebarSection />
      <LatestUsersSection />
    </aside>
  );
}

export default Sidebar;
