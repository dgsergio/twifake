import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import classes from './Post.module.css';
import { User } from '../store/usersSlice';
import { timePassed } from '../utils/utils';

function Post({
  post,
  user,
  date,
}: {
  post: string;
  user: User;
  date: string;
}) {
  if (!user) return;
  return (
    <div className={classes.post}>
      <div>
        <img src={user.perfilUrl} alt="user picture" />
      </div>
      <div className={classes.content}>
        <div className={classes.container}>
          <div className={classes.title}>
            <p>
              {user.name}{' '}
              <span>
                {user.email} - {timePassed(date)}
              </span>
            </p>
          </div>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <p>{post}</p>
      </div>
    </div>
  );
}

export default Post;
