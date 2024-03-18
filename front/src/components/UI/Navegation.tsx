import classes from './Navegation.module.css';
import { Item } from '../MainHeader';

type Props = {
  item: Item;
};

function Navegation({ item }: Props) {
  return (
    <div className={classes.navegation}>
      <span>{item.name}</span>
      {item.isActive && <div className={classes.line}></div>}
    </div>
  );
}

export default Navegation;
