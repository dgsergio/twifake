import classes from './UserOptionModal.module.css';
import ModalSmall from './UI/ModalSmall';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { deleteAllPostsByUser } from '../store/postsSlice';
import { deleteApi } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
  onSetShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onSetShowOpt: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserOptionModal({ onSetShowOpt, onSetShowEdit }: Props) {
  const [showCopnfirmation, setShowCopnfirmation] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  const editHandler = () => {
    onSetShowEdit(true);
    onSetShowOpt(false);
  };

  const closeModal = () => {
    onSetShowOpt(false);
  };

  const deleteHandler = () => {
    setShowCopnfirmation(false);
    onSetShowOpt(false);
    dispatch(
      deleteAllPostsByUser('http://localhost:3000/api/v1/posts/delete/all')
    );
    dispatch(deleteApi('http://localhost:3000/api/v1/delete/user'));
    localStorage.clear();
    navigator('/signin');
  };

  return (
    <>
      {showCopnfirmation && (
        <ConfirmationModal
          onDelete={deleteHandler}
          onHiddeModal={() => setShowCopnfirmation(false)}
          msg="This can’t be undone, your account will be deleted from our database,
      along with all the posts you’ve created."
        />
      )}
      <ModalSmall className={classes.option} onClick={closeModal}>
        <button onClick={editHandler}>Edit display name</button>
        <button
          onClick={() => setShowCopnfirmation(true)}
          className={classes.danger}
        >
          Delete Account
        </button>
      </ModalSmall>
    </>
  );
}

export default UserOptionModal;
