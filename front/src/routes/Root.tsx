import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import classes from './Root.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getLoggedUser } from '../store/usersSlice';
import PostModal from '../components/PostModal';
import Loading from '../components/Loading';

const Root = () => {
  const { users, loggedUser } = useSelector((state: RootState) => state.users);
  const { show } = useSelector((state: RootState) => state.posts.postManager);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedUser());
  }, [users]);

  if (users.length === 0) return <Loading />;
  return (
    <>
      {show && <PostModal />}
      <div className={classes.root}>
        <Header user={loggedUser} />
        <Main currentUserID={loggedUser._id} />
        <Sidebar />
      </div>
    </>
  );
};

export default Root;
