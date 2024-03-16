import { useEffect } from 'react';
import { AppDispatch } from '../store';
import classes from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/postsSlice';
import { RootState } from '../store';
import Post from '../components/Post';
import { User } from '../store/usersSlice';
import LoadingPosts from '../components/LoadingPosts';
import MainHeader from '../components/UI/MainHeader';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const { users, loggedUser } = useSelector((state: RootState) => state.users);

  const loadingStatus = useSelector(
    (state: RootState) => state.posts.loadingStatus
  );

  useEffect(() => {
    dispatch(getPosts('http://localhost:3000/api/v1/posts'));
  }, []);

  const findUser = (id: string) => {
    return users.find((e) => e._id === id) as User;
  };

  return (
    <>
      <MainHeader>
        <div className={classes.nav}>
          <span>For you</span>
          <span>Your posts</span>
        </div>
      </MainHeader>
      <div className={classes.body}>
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
                currentUserID={loggedUser._id}
              />
            ))
            .reverse()}
      </div>
    </>
  );
};

export default Home;
