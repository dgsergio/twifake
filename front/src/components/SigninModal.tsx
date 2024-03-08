import classes from './SigninModal.module.css';
import logo from '../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SigninModal({
  onSetShowSignin,
}: {
  onSetShowSignin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, password } = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    console.log(username.value, password.value);
    // please validate in a different file
    // ****************
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        body: JSON.stringify({
          name: username.value,
          password: password.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Something is not ok');
      const data = await response.json();
      localStorage.setItem('token', JSON.stringify(data.token));
      navigate('/');
    } catch (err) {
      const { message } = err as typeof err & {
        message: string;
      };
      console.log(message);
    }
  };

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
          <form onSubmit={submitHandler}>
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
