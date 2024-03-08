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

const Root = () => {
  const navigator = useNavigate();
  const [token, setToken] = useState<string | undefined>();

  const initialState: User = {
    _id: '...',
    name: '...',
    email: '...',
    perfilUrl: noAvatar,
  };
  const [loggedUser, setLoggedUser] = useState<User>(initialState);
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      type UserToken = { name: string; id: string; iat: number; exp: number };
      const decoded: UserToken = jwtDecode(storedToken);
      const findUser =
        users.find((user) => user._id === decoded.id) || initialState;
      setLoggedUser(findUser);
    } else navigator('/signin');
  }, [users]);

  if (!token) return;
  return (
    <div className={classes.root}>
      <Header user={loggedUser} />
      <Main />
      <Sidebar />
    </div>
  );
};

export default Root;
