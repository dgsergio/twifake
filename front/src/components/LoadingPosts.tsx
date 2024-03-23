import classes from './LoadingPosts.module.css';
import Spinner from './UI/Spinner';

function LoadingPosts({ msg = 'loading' }: { msg: string }) {
  let loaderContainer = <p>{msg}</p>;
  if (msg.toLowerCase() === 'loading') loaderContainer = <Spinner />;

  return (
    <>
      <div className={classes.container}>{loaderContainer}</div>
    </>
  );
}

export default LoadingPosts;
