import classes from './Buttons.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

function ButtonSecondary({ children, className, onClick }: Props) {
  const allClasses = className
    ? `${className} ${classes.secondary}`
    : classes.secondary;

  return (
    <button className={allClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonSecondary;
