import { useEffect } from 'react';
import logo from '../assets/logo-white.png';
import classes from './Loading.module.css';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { getUsers } from '../store/usersSlice';

function Loading() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ url: 'http://localhost:3000/api/v1/users' }));
  }, []);

  return (
    <div className={classes.content}>
      <img src={logo} alt="logo image" />
    </div>
  );
}

export default Loading;
