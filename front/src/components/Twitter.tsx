import classes from './Twitter.module.css';

const Twitter = () => {
  return (
    <div className={classes.container}>
      <div className={classes.twitter}>
        <div>
          <img
            src="https://i.ibb.co/9thsY3m/no-avatar.jpg"
            alt="user picture"
          />
        </div>
        <div>
          <p>Sergio - Pixel40</p>
          <p>@EstudioPixel40</p>
        </div>
      </div>
      <div>
        <button>Follow</button>
      </div>
    </div>
  );
};

export default Twitter;
