import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import logo from '../../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

type Props = {
  children: React.ReactNode;
  showIcon: boolean;
  onHiddeModal: () => void;
  className?: string;
};

function ModalOverlay({
  children,
  showIcon = false,
  onHiddeModal,
  className,
}: Props) {
  const allClasses = `${className} ${classes.modal}`;
  return (
    <>
      <div
        className={classes.backdrop}
        onClick={() => !showIcon && onHiddeModal()}
      />
      <div className={allClasses}>
        <div className={classes.content}>
          <div className={classes.header}>
            <button onClick={onHiddeModal}>
              <FontAwesomeIcon icon={faX} />
            </button>
            {showIcon && <img src={logo} alt="logo icon" />}
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

const Modal = ({
  children,
  showIcon = false,
  onHiddeModal,
  className,
}: Props) => {
  const portalModal = document.getElementById('modal-overlay') as HTMLElement;

  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          onHiddeModal={onHiddeModal}
          showIcon={showIcon}
          className={className}
        >
          {children}
        </ModalOverlay>,
        portalModal
      )}
    </>
  );
};

export default Modal;
