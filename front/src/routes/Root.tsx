import Header from '../components/Header';
import Main from '../components/Main';
import classes from './Root.module.css';

const Root = () => {
  return (
    <div className={classes.root}>
      <Header />
      <Main />
    </div>
  );
};

export default Root;
