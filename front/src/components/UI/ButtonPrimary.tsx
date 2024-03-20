import classes from './Buttons.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

function ButtonPrimary({ children, className, onClick }: Props) {
  const allClasses = className
    ? `${classes.primary} ${className}`
    : classes.primary;

  return (
    <button className={allClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonPrimary;
