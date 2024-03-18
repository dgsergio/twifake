import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LoadingPosts from './LoadingPosts';
import { PostItem } from '../store/postsSlice';
import Post from './Post';
import { User } from '../store/usersSlice';

type Props = {
  posts: PostItem[];
  className?: string;
};

function Posts({ posts, className }: Props) {
  const loadingStatus = useSelector(
    (state: RootState) => state.posts.loadingStatus
  );
  const { users, loggedUser } = useSelector((state: RootState) => state.users);
  const findUser = (id: string) => {
    return users.find((e) => e._id === id) as User;
  };

  const allClasses = className ? className : '';

  return (
    <div className={allClasses}>
      {loadingStatus.loading && <LoadingPosts msg="Loading" />}
      {loadingStatus.error && <LoadingPosts msg={loadingStatus.error} />}
      {!loadingStatus.error &&
        !loadingStatus.loading &&
        posts
          .map((post) => (
            <Post
              key={post._id}
              post={post}
              user={findUser(post.createdBy)}
              currentUserID={loggedUser._id}
            />
          ))
          .reverse()}
    </div>
  );
}

export default Posts;
