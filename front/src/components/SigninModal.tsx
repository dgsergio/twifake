import classes from './SigninModal.module.css';
import logo from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function SigninModal({
  onSetShowSignin,
}: {
  onSetShowSignin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <div className={classes.header}>
          <button onClick={() => onSetShowSignin(false)}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <img src={logo} alt="logo icon" />
        </div>
        <div className={classes.body}>
          <h2>Sign in to Z</h2>
          <form>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="******" />
            <button>Sign in</button>
          </form>
        </div>
        <div className={classes.footer}>
          Don't have an account? <button>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default SigninModal;
