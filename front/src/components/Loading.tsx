import logo from '../assets/logo-white.png';
import classes from './Loading.module.css';

function Loading() {
  return (
    <div className={classes.content}>
      <img src={logo} alt="logo image" />
    </div>
  );
}

export default Loading;
