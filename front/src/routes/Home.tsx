import { useEffect } from 'react';
import { AppDispatch } from '../store';
import classes from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/postsSlice';
import { RootState } from '../store';
import MainHeader, { Item } from '../components/MainHeader';
import Posts from '../components/Posts';
import Members from './Members';
import { setShowMembers } from '../store/usersSlice';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, searchedPosts } = useSelector(
    (state: RootState) => state.posts
  );
  const { showMembers } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getPosts('http://localhost:3000/api/v1/posts'));
  }, []);

  const items: Item[] = [
    {
      name: 'For you',
      isActive: !showMembers,
      onClick: () => dispatch(setShowMembers(false)),
    },
    {
      name: 'Members',
      isActive: showMembers,
      onClick: () => dispatch(setShowMembers(true)),
    },
  ];

  return (
    <>
      <MainHeader items={items} />
      {showMembers ? (
        <Members />
      ) : (
        <Posts
          posts={searchedPosts ? searchedPosts : posts}
          className={classes.body}
        />
      )}
    </>
  );
};

export default Home;
