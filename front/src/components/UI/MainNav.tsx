import classes from './MainNav.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function MainNav({ children, className }: Props) {
  const allClasses = className ? `${className} ${classes.nav}` : classes.nav;

  return <div className={allClasses}>{children}</div>;
}

export default MainNav;
