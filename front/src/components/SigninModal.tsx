import classes from './SignModal.module.css';
import { validateSignin } from '../utils/validate';
import { useEffect, useState } from 'react';
import Modal from './UI/Modal';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { signApi } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';

function SigninModal({
  onSetShowSignup,
  onSetShowSignin,
}: {
  onSetShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
  onSetShowSignin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const loadingStatus = useSelector(
    (state: RootState) => state.users.loadingStatus
  );
  const token = localStorage.getItem('token');

  const showSignUpHandler = () => {
    onSetShowSignin(false);
    onSetShowSignup(true);
  };

  const hiddeModal = () => {
    onSetShowSignin(false);
  };

  useEffect(() => {
    if (token && loadingStatus.error === '') navigate('/');
  }, [token]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMsg(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [errorMsg]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, password } = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const response = validateSignin(username.value, password.value);

    if (response.length !== 0) {
      const fullMsg =
        response[0].slice(0, 1).toLocaleUpperCase() +
        response.join(', ').slice(1) +
        '.';
      setErrorMsg(fullMsg);
      return;
    }

    const req = {
      url: 'http://localhost:3000/api/v1/login',
      body: {
        name: username.value,
        password: password.value,
      },
    };
    dispatch(signApi(req));
  };

  return (
    <>
      <Modal onHiddeModal={hiddeModal} showIcon={true}>
        <div className={classes.body}>
          <h2>Sign in to Z</h2>
          <form onSubmit={submitHandler}>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="******" />
            <button>Sign in</button>
          </form>
        </div>
        <div className={classes.footer}>
          Don't have an account?{' '}
          <button onClick={showSignUpHandler}>Sign up</button>
        </div>
      </Modal>
      {(errorMsg || loadingStatus.error !== '') && (
        <div className="message">
          <p>We could not access your account.</p>
        </div>
      )}
    </>
  );
}

export default SigninModal;
