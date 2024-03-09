import Modal from './UI/Modal';
import classes from './PostModal.module.css';
import { useRef, useState } from 'react';
import useAutosizeTextArea from './hooks/useAutosizeTextArea';

type Props = {
  onShowCreatePost: (show: boolean) => void;
  profileUrl: string;
};

function PostModal({ onShowCreatePost, profileUrl }: Props) {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  return (
    <Modal
      onShowModal={onShowCreatePost}
      showIcon={false}
      className={classes.modal}
    >
      <div className={classes.body}>
        <form className={classes.form}>
          <img src={profileUrl} alt="your profile image" />
          <textarea
            placeholder="What's happening?!"
            id="review-text"
            onChange={handleChange}
            ref={textAreaRef}
            rows={1}
            value={value}
          ></textarea>
        </form>
      </div>
    </Modal>
  );
}

export default PostModal;
