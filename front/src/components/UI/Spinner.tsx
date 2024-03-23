import classes from './Spinner.module.css';

type Props = {
  className?: string;
};

function Spinner({ className }: Props) {
  const allClasses = className
    ? `${className} ${classes.spinner}`
    : classes.spinner;

  return (
    <div className={allClasses}>
      <div className={classes.loader}></div>
    </div>
  );
}

export default Spinner;
