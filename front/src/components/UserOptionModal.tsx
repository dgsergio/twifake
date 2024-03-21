import classes from './UserOptionModal.module.css';
import ModalSmall from './UI/ModalSmall';

type Props = {
  onSetShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onSetShowOpt: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserOptionModal({ onSetShowOpt, onSetShowEdit }: Props) {
  const editHandler = () => {
    onSetShowEdit(true);
    onSetShowOpt(false);
  };

  const closeModal = () => {
    onSetShowOpt(false);
  };

  return (
    <ModalSmall className={classes.option} onClick={closeModal}>
      <button onClick={editHandler}>Edit display name</button>
      <button className={classes.danger}>Delete Account</button>
    </ModalSmall>
  );
}

export default UserOptionModal;
