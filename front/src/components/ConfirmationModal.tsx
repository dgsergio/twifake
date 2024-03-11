import Modal from './UI/Modal';
import classes from './ConfirmationModal.module.css';

type Props = {
  onShowConfirmation: (show: boolean) => void;
  onDelete: () => void;
};

function ConfirmationModal({ onShowConfirmation, onDelete }: Props) {
  return (
    <Modal
      onShowModal={onShowConfirmation}
      showIcon={false}
      className={classes.modal}
    >
      <div className={classes.container}>
        <h3>Delete post?</h3>
        <p>
          This can’t be undone and it will be removed from your profile, the
          timeline of any accounts that follow you, and from search results.
        </p>
        <button className={classes.danger} onClick={onDelete}>
          Delete
        </button>
        <button onClick={() => onShowConfirmation(false)}>Cancel</button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
