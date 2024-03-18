import classes from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getPosts } from '../store/postsSlice';
import HeaderProfile from '../components/profile/HeaderProfile';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNav from '../components/UI/MainNav';
import { Item } from '../components/MainHeader';
import Posts from '../components/Posts';
import Navegation from '../components/UI/Navegation';

function Profile() {
  const { users } = useSelector((state: RootState) => state.users);
  const { posts } = useSelector((state: RootState) => state.posts);
  const { userName } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const selectedUser = users.find((user) => user.name === userName);
  const postsSelected = posts.filter(
    (post) => post.createdBy === selectedUser?._id
  );
  useEffect(() => {
    dispatch(getPosts('http://localhost:3000/api/v1/posts'));
  }, []);

  const SelectedUserName = selectedUser
    ? userName![0].toUpperCase() + userName!.slice(1)
    : 'Profile';

  const items: Item[] = [{ name: 'Posts', link: '#', isActive: true }];

  return (
    <>
      <HeaderProfile userName={SelectedUserName} nPost={postsSelected.length} />
      <div className={classes.content}>
        <div className={classes.banner}>
          <img src={selectedUser?.profileUrl} alt="profile banner" />
        </div>
        <div className={classes.body}>
          <div className={classes.row}>
            <div className={classes.profile}>
              <img src={selectedUser?.profileUrl} alt="profile image" />
            </div>
            <div>
              <button>
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
          </div>
          <div className={classes.column}>
            <h3>{SelectedUserName}</h3>
            {selectedUser && <p>{selectedUser.email}</p>}
          </div>
        </div>
        <MainNav className={classes['nav-Posts']}>
          {items.map((item) => (
            <Navegation item={item} key={item.name} />
          ))}
        </MainNav>
        <Posts posts={postsSelected} />
      </div>
    </>
  );
}

export default Profile;
