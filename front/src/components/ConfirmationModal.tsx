import Modal from './UI/Modal';
import classes from './ConfirmationModal.module.css';
import Spinner from './UI/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type Props = {
  onHiddeModal: () => void;
  onDelete: () => void;
  msg: string;
};

function ConfirmationModal({ onHiddeModal, onDelete, msg }: Props) {
  const { loadingStatus } = useSelector((state: RootState) => state.users);
  const loadingPostStatus = useSelector(
    (state: RootState) => state.posts.loadingStatus
  );

  return (
    <Modal
      onHiddeModal={onHiddeModal}
      showIcon={false}
      className={classes.modal}
    >
      <div className={classes.container}>
        <h3>Delete confirmation</h3>
        <p>{msg}</p>
        <button
          disabled={loadingPostStatus.loading || loadingStatus.loading}
          className={classes.danger}
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          disabled={loadingPostStatus.loading || loadingStatus.loading}
          onClick={onHiddeModal}
        >
          Cancel
        </button>
      </div>
      {loadingStatus.loading ||
        (loadingPostStatus.loading && <Spinner className={classes.spinner} />)}
      {!loadingStatus.loading && loadingStatus.error !== '' && (
        <p className={classes.error}>{loadingStatus.error}</p>
      )}
      {!loadingPostStatus.loading && loadingPostStatus.error !== '' && (
        <p className={classes.error}>{loadingPostStatus.error}</p>
      )}
    </Modal>
  );
}

export default ConfirmationModal;
