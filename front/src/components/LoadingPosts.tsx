import classes from './LoadingPosts.module.css';

function LoadingPosts({ msg = 'loading' }: { msg: string }) {
  let loaderContainer = <p>{msg}</p>;
  if (msg.toLowerCase() === 'loading')
    loaderContainer = (
      <div className={classes['loader-container']}>
        <div className={classes.loader}></div>
      </div>
    );

  return (
    <>
      <div className={classes.container}>{loaderContainer}</div>
    </>
  );
}

export default LoadingPosts;
