import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import classes from './Root.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getLoggedUser } from '../store/usersSlice';
import Loading from '../components/Loading';
import PostModal from '../components/PostModal';

const Root = () => {
  const navigator = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const users = useSelector((state: RootState) => state.users.users);
  const loggedUser = useSelector((state: RootState) => state.users.loggedUser);
  const dispatch: AppDispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getLoggedUser());
    } else navigator('/signin');
  }, [users, token]);

  if (!token) return <Loading />;
  return (
    <>
      {showCreatePost && (
        <PostModal
          onShowCreatePost={setShowCreatePost}
          profileUrl={loggedUser.perfilUrl}
        />
      )}
      <div className={classes.root}>
        <Header user={loggedUser} onShowCreatePost={setShowCreatePost} />
        <Main currentUserID={loggedUser._id} />
        <Sidebar />
      </div>
    </>
  );
};

export default Root;
