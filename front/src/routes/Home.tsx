import { useEffect } from 'react';
import { AppDispatch } from '../store';
import classes from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/postsSlice';
import { RootState } from '../store';
import MainHeader, { Item } from '../components/MainHeader';
import Posts from '../components/Posts';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts('http://localhost:3000/api/v1/posts'));
  }, []);

  const items: Item[] = [{ name: 'For you', link: '#', isActive: true }];

  return (
    <>
      <MainHeader items={items} />
      <Posts posts={posts} className={classes.body} />
    </>
  );
};

export default Home;
