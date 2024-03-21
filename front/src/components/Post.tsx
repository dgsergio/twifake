import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import classes from './Post.module.css';
import { User } from '../store/usersSlice';
import { timePassed } from '../utils/utils';
import PostOptionModal from './PostOptionModal';
import { useState } from 'react';
import { PostItem } from '../store/postsSlice';

type Props = {
  post: PostItem;
  user: User;
  currentUserID: string;
};

function Post({ post, user, currentUserID }: Props) {
  const [showPostOption, setShowPostOption] = useState<boolean>(false);
  const toogleShowPostOption = () => {
    setShowPostOption((pV) => !pV);
  };

  if (!user) return;
  return (
    <>
      <div className={classes.post}>
        <div>
          <img src={user.profileUrl} alt="user picture" />
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
          <p>{post.post}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
