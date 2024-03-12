import { useEffect } from 'react';
import { AppDispatch } from '../store';
import classes from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/postsSlice';
import { getUsers } from '../store/usersSlice';
import { RootState } from '../store';
import Post from './Post';
import { User } from '../store/usersSlice';
import LoadingPosts from './LoadingPosts';

const Main = ({ currentUserID }: { currentUserID: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const users = useSelector((state: RootState) => state.users.users);

  const loadingStatus = useSelector(
    (state: RootState) => state.posts.loadingStatus
  );

  useEffect(() => {
    dispatch(getPosts('http://localhost:3000/api/v1/posts'));
    dispatch(getUsers({ url: 'http://localhost:3000/api/v1/users' }));
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
      {loadingStatus.loading && <LoadingPosts msg="Loading" />}
      {loadingStatus.error && <LoadingPosts msg={loadingStatus.error} />}
      {!loadingStatus.error &&
        !loadingStatus.loading &&
        posts
          .map((post) => (
            <Post
              key={post._id}
              post={post}
              user={findUser(post.createdBy)}
              currentUserID={currentUserID}
            />
          ))
          .reverse()}
    </main>
  );
};

export default Main;
