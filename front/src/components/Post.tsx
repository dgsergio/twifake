import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faHeart as faHeartFull,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import classes from './Post.module.css';
import { User } from '../store/usersSlice';
import { timePassed } from '../utils/utils';
import PostOptionModal from './PostOptionModal';
import { useState } from 'react';
import { PostItem } from '../store/postsSlice';
import { useNavigate } from 'react-router-dom';
import ButtonSecondary from './UI/ButtonSecondary';

type Props = {
  post: PostItem;
  user: User;
  currentUserID: string;
};

function Post({ post, user, currentUserID }: Props) {
  const navigator = useNavigate();
  const [showPostOption, setShowPostOption] = useState<boolean>(false);
  const [showLike, setShowLike] = useState<boolean>(false);

  const toogleShowPostOption = () => {
    setShowPostOption((pV) => !pV);
  };

  const toggleLike = () => {
    setShowLike((pV) => !pV);
  };

  if (!user) return;
  return (
    <>
      <div className={classes.post}>
        <div>
          <img
            src={user.profileUrl}
            alt="user picture"
            onClick={() => navigator('/' + user.name)}
          />
        </div>
        <div className={classes.content}>
          <div className={classes.container}>
            <div className={classes.title}>
              <p>
                {user.displayName}{' '}
                <span>
                  @{user.name} · {timePassed(post.createdAt)}
                </span>
              </p>
            </div>
            {showPostOption && (
              <PostOptionModal
                onToogleShowPostOption={toogleShowPostOption}
                postID={post._id}
                postDate={post.createdAt}
              />
            )}
            {post.createdBy === currentUserID && (
              <button onClick={toogleShowPostOption}>
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            )}
          </div>
          <p className={classes.thepost}>{post.post}</p>
          {!showLike ? (
            <ButtonSecondary className={classes.nolike} onClick={toggleLike}>
              <FontAwesomeIcon icon={faHeart} />
            </ButtonSecondary>
          ) : (
            <div className={classes.like}>
              <ButtonSecondary onClick={toggleLike}>
                <FontAwesomeIcon icon={faHeartFull} />
              </ButtonSecondary>
              <span>Love you too!</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
