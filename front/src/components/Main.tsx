import { useEffect } from 'react';
import { AppDispatch } from '../store';
import classes from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callApi as callPostsApi } from '../store/postsSlice';
import { callApi as callUsersApi } from '../store/usersSlice';
import { RootState } from '../store';
import Post from './Post';
import { User } from '../store/usersSlice';

const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const users = useSelector((state: RootState) => state.users.users);

  const loadingStatus = useSelector(
    (state: RootState) => state.posts.loadingStatus
  );

  useEffect(() => {
    dispatch(callPostsApi({ url: 'http://localhost:3000/api/v1/posts' }));
    dispatch(callUsersApi({ url: 'http://localhost:3000/api/v1/users' }));
  }, []);

  const findUser = (id: string) => {
    return users.find((e) => e._id === id) as User;
  };

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
        posts.map((post) => (
          <Post
            key={post._id}
            post={post.post}
            date={post.createdAt}
            user={findUser(post.createdBy)}
          />
        ))}
    </main>
  );
};

export default Main;
