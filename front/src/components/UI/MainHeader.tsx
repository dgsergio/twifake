import classes from './MainHeader.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function MainHeader({ children, className }: Props) {
  const allClasses = className
    ? `${className} ${classes.header}`
    : classes.header;
  return <div className={allClasses}>{children}</div>;
}

export default MainHeader;
