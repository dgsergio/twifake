import Modal from './UI/Modal';
import classes from './PostModal.module.css';
import { useRef, useState } from 'react';
import useAutosizeTextArea from './hooks/useAutosizeTextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { RequestApi, submitPost, setPostManager } from '../store/postsSlice';

function PostModal() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const { postId } = useSelector((state: RootState) => state.posts.postManager);
  const { posts } = useSelector((state: RootState) => state.posts);
  const { profileUrl } = useSelector(
    (state: RootState) => state.users.loggedUser
  );
  const currentPost = posts.find((post) => post._id === postId);
  const [value, setValue] = useState<string>(
    currentPost ? currentPost.post : ''
  );

  useAutosizeTextArea(textAreaRef.current, value);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target?.value;
    setValue(val);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim().length < 1) return;

    const req: RequestApi = {
      url: 'http://localhost:3000/api/v1/posts',
      body: { post: value },
      id: postId,
    };
    dispatch(submitPost(req));
    dispatch(setPostManager({ show: false, postId: '' }));
  };

  const hiddeCreatePost = () => {
    dispatch(setPostManager({ show: false, postId: '' }));
  };

  return (
    <Modal
      onHiddeModal={hiddeCreatePost}
      showIcon={false}
      className={classes.modal}
    >
      <div className={classes.body}>
        <form className={classes.form} onSubmit={submitHandler}>
          <fieldset>
            <img src={profileUrl} alt="your profile image" />
            <textarea
              placeholder="What's happening?!"
              id="post-area"
              onChange={changeHandler}
              ref={textAreaRef}
              rows={1}
              value={value}
            ></textarea>
          </fieldset>
          <p className={classes.disclaimer}>
            <FontAwesomeIcon icon={faEarthAmericas} />
            <span>Anyone will be able to see this post</span>
          </p>
          <div className={classes.footer}>
            <button disabled={value.trim().length < 1 ? true : false}>
              {postId ? 'Update' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default PostModal;
