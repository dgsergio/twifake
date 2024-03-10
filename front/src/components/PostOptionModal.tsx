import ModalSmall from './UI/ModalSmall';
import classes from './PostOptionModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

type Props = {
  onToogleShowPostOption: () => void;
  postID: string;
};

function PostOptionModal({ onToogleShowPostOption, postID }: Props) {
  const deleteHandler = () => {
    alert('delete: ' + postID);
    onToogleShowPostOption();
  };

  const editHandler = () => {
    alert('edit me' + postID);
    onToogleShowPostOption();
  };

  return (
    <ModalSmall onClick={onToogleShowPostOption} className={classes.option}>
      <button onClick={editHandler}>
        <FontAwesomeIcon icon={faBan} />
        Editar Post
      </button>
      <button onClick={deleteHandler}>
        <FontAwesomeIcon icon={faFileLines} />
        Delete Post
      </button>
    </ModalSmall>
  );
}

export default PostOptionModal;
