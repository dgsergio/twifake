import classes from './Modal.module.css';
import logo from '../../assets/logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

type Props = {
  children: React.ReactNode;
  showIcon: boolean;
  onShowModal: (show: boolean) => void;
  className?: string;
};

function Modal({ children, showIcon = false, onShowModal, className }: Props) {
  const allClasses = `${className} ${classes.content}`;
  return (
    <>
      <div
        className={classes.backdrop}
        onClick={() => !showIcon && onShowModal(false)}
      />
      <div className={classes.modal}>
        <div className={allClasses}>
          <div className={classes.header}>
            <button onClick={() => onShowModal(false)}>
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

export default Modal;
