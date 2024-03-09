import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import classes from './Root.module.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../store/usersSlice';
import noAvatar from '../assets/no-avatar.jpg';
import Loading from '../components/Loading';
import PostModal from '../components/PostModal';

const Root = () => {
  const navigator = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);

  const initialState: User = {
    _id: '...',
    name: '...',
    email: '...',
    perfilUrl: noAvatar,
  };
  const [loggedUser, setLoggedUser] = useState<User>(initialState);
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    setLoadingProfile(true);
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      type UserToken = { name: string; id: string; iat: number; exp: number };
      const decoded: UserToken = jwtDecode(storedToken);
      const findUser =
        users.find((user) => user._id === decoded.id) || initialState;
      setLoggedUser(findUser);
      setLoadingProfile(false);
    } else navigator('/signin');
  }, [users]);

  if (loadingProfile) return <Loading />;
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
        <Main />
        <Sidebar />
      </div>
    </>
  );
};

export default Root;
