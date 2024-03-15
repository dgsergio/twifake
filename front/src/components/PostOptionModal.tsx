import ModalSmall from './UI/ModalSmall';
import classes from './PostOptionModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/postsSlice';
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

  const showConfirmationHandler = (show: boolean) => {
    setShowConfirmation(show);
  };

  const deleteHandler = async () => {
    dispatch(deletePost('http://localhost:3000/api/v1/posts/' + postID));
    setShowConfirmation(false);
    onToogleShowPostOption();
  };

  const editHandler = () => {
    alert('edit me' + postID);
    onToogleShowPostOption();
  };

  return (
    <ModalSmall onClick={onToogleShowPostOption} className={classes.option}>
      {showConfirmation && (
        <ConfirmationModal
          onShowConfirmation={showConfirmationHandler}
          onDelete={deleteHandler}
        />
      )}
      <button
        className={classes.danger}
        onClick={() => showConfirmationHandler(true)}
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
