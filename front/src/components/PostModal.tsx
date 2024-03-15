import Modal from './UI/Modal';
import classes from './PostModal.module.css';
import { useRef, useState } from 'react';
import useAutosizeTextArea from './hooks/useAutosizeTextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { RequestApi, postPost, setPostManager } from '../store/postsSlice';

function PostModal() {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const { profileUrl } = useSelector(
    (state: RootState) => state.users.loggedUser
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
      body: JSON.stringify({ post: value }),
    };
    dispatch(postPost(req));
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
              Post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default PostModal;
