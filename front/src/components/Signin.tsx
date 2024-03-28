import { useEffect, useState } from 'react';
import logo from '../assets/logo-white.png';
import classes from './Signin.module.css';
import SigninModal from './SigninModal';
import SignupModal from './SignupModal';
import { getUsers, setShowMembers } from '../store/usersSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { clearSearchPosts } from '../store/postsSlice';

function Signin() {
  const [showSignin, setShowSignin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const year = new Date().getFullYear();
  const footerTxt = [
    'Twifake',
    'Pixel40.com.ar',
    '@estudiopixel40',
    'Sergo',
    `© ${year} Z Corp.`,
  ];

  useEffect(() => {
    dispatch(clearSearchPosts());
    dispatch(setShowMembers(false));
    dispatch(getUsers({ url: 'http://localhost:3000/api/v1/users' }));
  }, []);

  return (
    <>
      {showSignin && (
        <SigninModal
          onSetShowSignup={setShowSignup}
          onSetShowSignin={setShowSignin}
        />
      )}
      {showSignup && <SignupModal onSetShowSignup={setShowSignup} />}
      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.image}>
            <img src={logo} alt="logo twifake" />
          </div>
          <div className={classes.options}>
            <h2>Happening now</h2>
            <h3>Join today.</h3>
            <button
              className={classes['btn-primary']}
              onClick={() => setShowSignin(true)}
            >
              Sign in
            </button>
            <div className={classes.or}>
              <div className={classes.line} />
              <p>or</p>
              <div className={classes.line} />
            </div>
            <button
              className={classes['btn-secondary']}
              onClick={() => setShowSignup(true)}
            >
              Create account
            </button>
            <p className={classes.terms}>
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </p>
          </div>
        </div>
        <ul className={classes.footer}>
          {footerTxt.map((txt) => (
            <li key={txt}>{txt}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Signin;
