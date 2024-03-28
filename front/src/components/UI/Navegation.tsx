import classes from './Navegation.module.css';
import { Item } from '../MainHeader';
import ButtonSecondary from './ButtonSecondary';

type Props = {
  item: Item;
};

function Navegation({ item }: Props) {
  return (
    <ButtonSecondary className={classes.navegation} onClick={item.onClick}>
      <span>{item.name}</span>
      {item.isActive && <div className={classes.line}></div>}
    </ButtonSecondary>
  );
}

export default Navegation;
