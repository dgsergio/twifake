import classes from './ModalSmall.module.css';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

function ModalSmall({ children, onClick, className }: Props) {
  const allClasses = className
    ? `${className} ${classes.modal}`
    : classes.modal;
  return (
    <>
      <div className={`${classes.backdrop}`} onClick={onClick} />
      <div className={allClasses}>{children}</div>
    </>
  );
}

export default ModalSmall;
