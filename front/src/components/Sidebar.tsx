import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import classes from './Sidebar.module.css';
import TopSidebarSection from './sections/TopSidebarSection';
import LatestUsersSection from './sections/LatestUsersSection';
import { useDispatch } from 'react-redux';
import { clearSearchPosts, searchPosts } from '../store/postsSlice';
import { useState } from 'react';
import { setShowMembers } from '../store/usersSlice';

function Sidebar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowMembers(false));

    dispatch(searchPosts(e.target.value));
    setQuery(e.target.value);
  };

  const deleteQueryHandler = () => {
    dispatch(clearSearchPosts());
    setQuery('');
  };

  return (
    <aside className={classes.sidebar}>
      <div className={classes.search}>
        <input
          type="text"
          placeholder="Search"
          onChange={changeHandler}
          value={query}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={classes['zoom-icon']}
        />
        {query !== '' && (
          <FontAwesomeIcon
            onClick={deleteQueryHandler}
            icon={faCircleXmark}
            className={classes['x-icon']}
            style={{ color: '#1d9bf0' }}
          />
        )}
      </div>
      <TopSidebarSection />
      <LatestUsersSection />
    </aside>
  );
}

export default Sidebar;
