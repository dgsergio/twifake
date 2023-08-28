import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import classes from './Root.module.css';

const Root = () => {
  return (
    <div className={classes.root}>
      <Header />
      <Main />
      <Sidebar />
    </div>
  );
};

export default Root;
