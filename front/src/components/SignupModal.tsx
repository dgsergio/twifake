import classes from './SignModal.module.css';
import { validateSignup } from '../utils/validate';
import { useEffect } from 'react';
import Modal from './UI/Modal';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, signApi } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './UI/Spinner';

function SignupModal({
  onSetShowSignup,
}: {
  onSetShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loadingStatus } = useSelector((state: RootState) => state.users);
  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(setStatus({ ...loadingStatus, error: '' }));
  }, []);

  useEffect(() => {
    if (token && loadingStatus.error === '') navigate('/');
  }, [token]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setStatus({ ...loadingStatus, error: '' }));
    }, 5000);
    return () => clearTimeout(timeout);
  }, [loadingStatus.error]);

  const hiddeModal = () => {
    onSetShowSignup(false);
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, password, password2, email, profileUrl } =
      e.target as typeof e.target & {
        username: { value: string };
        password: { value: string };
        password2: { value: string };
        email: { value: string };
        profileUrl: { value: string };
      };

    const response = validateSignup(
      username.value,
      password.value,
      password2.value,
      email.value,
      profileUrl.value
    );

    if (response.length !== 0) {
      const fullMsg =
        response[0].slice(0, 1).toLocaleUpperCase() +
        response.join(', ').slice(1) +
        '.';
      dispatch(setStatus({ ...loadingStatus, error: fullMsg }));
      return;
    }

    const req = {
      url: 'http://localhost:3000/api/v1/signup',
      body: {
        name: username.value,
        password: password.value,
        email: email.value,
        profileUrl: profileUrl.value,
      },
    };

    dispatch(signApi(req));
  };

  return (
    <>
      <Modal onHiddeModal={hiddeModal} showIcon={true}>
        <div className={classes.body}>
          <h2>Create your account</h2>
          <form className={classes.form} onSubmit={submitHandler}>
            <input type="text" name="username" placeholder="Username*" />
            <input type="email" name="email" placeholder="Email*" />
            <input type="password" name="password" placeholder="password*" />
            <input
              type="password"
              name="password2"
              placeholder="repeat password*"
            />
            <input
              type="url"
              name="profileUrl"
              placeholder="Profile image URL"
            />
            <button disabled={loadingStatus.loading}>
              {loadingStatus.loading ? (
                <Spinner className={classes.spinner} />
              ) : (
                'Sign up'
              )}
            </button>
          </form>
        </div>
      </Modal>
      {loadingStatus.error && (
        <div className="message">
          <p className="error">{loadingStatus.error}</p>
        </div>
      )}
    </>
  );
}

export default SignupModal;
