import logo from '../assets/logo-white.png';
import classes from './Signin.module.css';

function Signin() {
  const year = new Date().getFullYear();
  const footerTxt = [
    'Twifake',
    'Pixel40',
    'estudiopixel40',
    `© ${year} Z Corp.`,
  ];

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <div className={classes.image}>
          <img src={logo} alt="logo twifake" />
        </div>
        <div className={classes.options}>
          <h2>Happening now</h2>
          <h3>Join today.</h3>
          <button className={classes['btn-primary']}>Sign in</button>
          <div className={classes.or}>
            <div className={classes.line} />
            <p>or</p>
            <div className={classes.line} />
          </div>
          <button className={classes['btn-secondary']}>Create account</button>
          <p className={classes.terms}>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
        </div>
      </div>
      <ul className={classes.footer}>
        {footerTxt.map((txt) => (
          <li>{txt}</li>
        ))}
      </ul>
    </main>
  );
}

export default Signin;
