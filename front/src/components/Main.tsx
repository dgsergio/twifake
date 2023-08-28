import { useEffect } from 'react';
import { AppDispatch } from '../store';
import classes from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callApi } from '../store/postsSlice';
import { RootState } from '../store';
import Post from './Post';

const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const loadingStatus = useSelector(
    (state: RootState) => state.posts.loadingStatus
  );

  useEffect(() => {
    dispatch(callApi({ url: 'http://localhost:3000/api/v1/posts' }));
  }, []);

  return (
    <main className={classes.main}>
      <div className={classes.header}>
        <h2>Home</h2>
        <div className={classes.nav}>
          <span>For you</span>
          <span>Your posts</span>
        </div>
      </div>
      {loadingStatus.loading && <div>Loading...</div>}
      {loadingStatus.error && <div>{loadingStatus.error}</div>}
      {!loadingStatus.error &&
        !loadingStatus.loading &&
        posts.map((post) => <Post key={post._id} post={post.post} />)}
    </main>
  );
};

export default Main;
