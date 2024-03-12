import classes from './SignModal.module.css';
import { useNavigate } from 'react-router-dom';
import { validate } from '../utils/validate';
import { useEffect, useState } from 'react';
import Modal from './UI/Modal';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/usersSlice';

function SigninModal({
  onSetShowSignin,
  onSetShowSignup,
}: {
  onSetShowSignin: React.Dispatch<React.SetStateAction<boolean>>;
  onSetShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const loadingStatus = useSelector(
    (state: RootState) => state.users.loadingStatus
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const showSignUpHandler = () => {
    onSetShowSignin(false);
    onSetShowSignup(true);
  };

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

    if (validate(username.value, password.value) !== 'ok') {
      setErrorMsg(validate(username.value, password.value));
      return;
    }

    const req = {
      url: 'http://localhost:3000/api/v1/login',
      body: JSON.stringify({
        name: username.value,
        password: password.value,
      }),
    };
    dispatch(signIn(req));

    if (loadingStatus.error === '') {
      navigate('/');
      return;
    } else setErrorMsg(loadingStatus.error);
  };

  return (
    <>
      <Modal onShowModal={onSetShowSignin} showIcon={true}>
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
      {errorMsg && (
        <div className="message error">
          <p>We could not access your account.</p>
        </div>
      )}
    </>
  );
}

export default SigninModal;
