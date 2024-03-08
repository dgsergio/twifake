import { useState } from 'react';
import logo from '../assets/logo-white.png';
import classes from './Signin.module.css';
import SigninModal from './SigninModal';

function Signin() {
  const [showSignin, setShowSignin] = useState<boolean>(false);
  const year = new Date().getFullYear();
  const footerTxt = [
    'Twifake',
    'Pixel40.com.ar',
    '@estudiopixel40',
    'Sergo',
    `© ${year} Z Corp.`,
  ];

  return (
    <>
      {showSignin && <SigninModal onSetShowSignin={setShowSignin} />}
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
            <button className={classes['btn-secondary']}>Create account</button>
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
