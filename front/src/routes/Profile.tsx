import classes from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import MainHeader from '../components/UI/MainHeader';
import { AppDispatch, RootState } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getPosts } from '../store/postsSlice';

function Profile() {
  const { users } = useSelector((state: RootState) => state.users);
  const { posts, loadingStatus } = useSelector(
    (state: RootState) => state.posts
  );
  const { userName } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const selectedUser = users.find((user) => user.name === userName);
  const postsSelected = posts.filter(
    (post) => post.createdBy === selectedUser?._id
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts('http://localhost:3000/api/v1/posts'));
  }, []);

  const SelectedUserName = selectedUser
    ? userName![0].toUpperCase() + userName!.slice(1)
    : 'Profile';

  return (
    <MainHeader className={classes.content}>
      <button onClick={() => navigate('/')} className={classes.back}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className={classes.info}>
        <span>{SelectedUserName}</span>
        {selectedUser && !loadingStatus.loading && (
          <span className={classes['info-sub']}>
            {postsSelected.length} posts
          </span>
        )}
      </button>
    </MainHeader>
  );
}

export default Profile;
