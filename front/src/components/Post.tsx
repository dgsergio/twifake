import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import classes from './Post.module.css';

function Post({ post }: { post: string }) {
  return (
    <div className={classes.post}>
      <div>
        <img src="https://i.ibb.co/9thsY3m/no-avatar.jpg" alt="user picture" />
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <p>
            Xxxxx <span>xxx@xxxx.xxx - 1h</span>
          </p>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <p>{post}</p>
      </div>
    </div>
  );
}

export default Post;
