import ModalSmall from './UI/ModalSmall';
import classes from './PostOptionModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { deletePost, setPostManager } from '../store/postsSlice';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';

type Props = {
  onToogleShowPostOption: () => void;
  postID: string;
  postDate: string;
};

function PostOptionModal({ onToogleShowPostOption, postID, postDate }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const passedDate = new Date(postDate);
  const currentDate = new Date();
  const minutesDifference =
    (currentDate.getTime() - passedDate.getTime()) / (1000 * 60);

  const hiddeModal = () => {
    setShowConfirmation(false);
  };

  const deleteHandler = async () => {
    dispatch(deletePost('http://localhost:3000/api/v1/posts/' + postID));
    setShowConfirmation(false);
    onToogleShowPostOption();
  };

  const editHandler = () => {
    onToogleShowPostOption();
    dispatch(setPostManager({ show: true, postId: postID }));
  };

  return (
    <ModalSmall onClick={onToogleShowPostOption} className={classes.option}>
      {showConfirmation && (
        <ConfirmationModal
          onHiddeModal={hiddeModal}
          onDelete={deleteHandler}
          msg="This can’t be undone, the post will be removed from your profile and the
        main timeline."
        />
      )}
      <button
        className={classes.danger}
        onClick={() => setShowConfirmation(true)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
        Delete Post
      </button>
      {minutesDifference < 24 * 60 && (
        <button onClick={editHandler}>
          <FontAwesomeIcon icon={faFileLines} />
          Editar Post
        </button>
      )}
    </ModalSmall>
  );
}

export default PostOptionModal;
